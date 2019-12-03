const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const session = require ('express-session');
const async = require('async');
const MongoClient = require ('mongodb').MongoClient;
const mongoose = require ('mongoose');
const Student = require ('./models/student');
const Questions = require ('./models/question');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');
const axios = require('axios');
const server = http.createServer(app);
const io = socketio(server);


app.use(router);
app.use(cors());

io.on('connection', (socket) => {
    console.log("we have a new connection");
    socket.on('join', (joinObj, callback) => {
        socket.emit('message', {user: 'admin', text: 'welcome to room ' + joinObj.username});
        socket.broadcast.to(joinObj.room).emit('message', {user: 'admin', text: joinObj.username + ' has joined'});
        socket.join(joinObj.room);
        try {
            axios.post('/api/usersInRoom', {room : joinObj.room})
            .then(res => {
                io.to(joinObj.room).emit('roomData', {room: joinObj.room, users: res.data});
                callback();
            }).catch(error => {throw error});
        } catch (e) {
            console.log("Failure");
        }   
    })

    socket.on('sendMessage', (msgObject, callback) => {  
        io.to(msgObject.room).emit('message', { user: msgObject.username, text: msgObject.message}); 
        try {
            axios.post('/api/usersInRoom', {room : msgObject.room})
            .then(res => {
                io.to(msgObject.room).emit('roomData', { room: msgObject.room, users: res.data}); 
                callback();
            }).catch(error => {throw error});
        }catch (e) {
            console.log("Failure");
        }   
    })

    socket.on('disconnect', (disconnObject) => {
        let username = disconnObject.username;
        let room = disconnObject.room;
        try {
        axios.post('/api/usersInRoom', {room : room, username: username})
        .then(res => {
            console.log(res.data);
            io.to(room).emit('message', {user: 'admin', text: username + 'has left'});
        }).catch(error => {throw error});
        }catch (e) {
            console.log("Failure");
        }   
    })
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



app.use(session({
	'secret' : 'nets212!'
}));

mongoose.connect('mongodb+srv://test:test@cluster0-yh4za.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

app.get('/api/users', (req, res) => {
    res.json(Student.find({}).toArray());
})

app.post('/api/getquestions', (req, res) => {
    let room = req.body.room;
    Questions.find({room : room}).limit(100).sort({likes:1}).then(data => {
        res.send(data);
    })
})

app.post('/api/update', (req, res) => {
    let questionText = req.body.question;
    let likes = req.body.likes;
    let room = req.body.room;
    let isClicked = req.body.isClicked;
    Questions.updateOne({question : questionText}, {likes: likes, isClicked:isClicked}).then(resp => {
        res.json({success : true});
    }); 
})


app.post('/api/addquestion', (req, res) => {
    let qtext = req.body.questionText;
    let room = req.body.room;
    console.log(room);
    let newQuestion = new Questions({
        question: qtext,
        likes: 0,
        room: room,
        isClicked: false
    })
    newQuestion.save().then(data => {
        console.log(data),
        res.json({success: true})
    })
})
 
app.post('/api/adduser',  (req, res) => {
    const varData = req.body.formData;
    Student.findOne({username: varData.username}, function(err, student) {
        if (err) {
            res.json({err: err});
        } else {
            if (student || varData.username == null) {
                console.log("this is run");
                res.json({success: false});
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    if (err) {
                        res.json({err: err});
                    } else {
                        bcrypt.hash(varData.password, salt, function(err, hash) {
                            if (err) {
                                console.log(err);
                                res.json({err: err});
                            } else {
                                let newStudent = new Student({
                                    username: varData.username,
                                    password: hash,
                                    email: varData.email, 
                                    firstName: varData.firstName,
                                    lastName: varData.lastName,
                                    room: varData.room   
                                });
                                newStudent.save().then(result => 
                                    console.log(result),
                                    res.json({success: true})
                                );
                                req.session.user = varData.username;
                                req.session.room = varData.room;                
                            }
                        });
                    }
                }); 
            }
        }
    }) 
})

   
app.post('/api/checkuser', (req, res) => {
    const formData = req.body.formData;
    console.log("this is formData", formData);
    Student.findOne({username: formData.username}, function(err, student) {
        if (student == null) {
            res.json({success: false});   
        } else {
            bcrypt.compare(formData.password, student.password, function(err, match) {
                if (err) {
                    console.log(err);
                    res.json({err: err});   
                } else {
                    if (match) {
                        Student.updateOne({username: formData.username}, {room: formData.room}).then(response => {
                           currRoom = formData.room;
                            req.session.user = student.username;
                            req.session.room = formData.room;                      
                            res.json({success: true});
                        });                         
                    } else {
                        res.json({success: false});                        
                    }
                }
            })  
        }  
    });
})

app.get('/api/usersInRoom', (req, res) => {
    let room = req.body.room;
    res.json(Student.find({room : room}).toArray());
});

app.get('/api/updateRoom', (req, res) => {
    let room = req.body.room;
    let username = req.body.username;
    Student.updateOne({username: username}, {room: room}).then(response => {
        
    });   
});


app.get('/checkLoggedIn', (req, res) => {
    res.json({user: req.session.user, room: req.session.room});
});

app.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if (err) {
           console.log(err);
           res.send({success: false});
        } else {
           res.send({success: true});
        }      
    });	
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))