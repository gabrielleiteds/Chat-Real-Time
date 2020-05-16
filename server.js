const express = require('express');
const path = require('path');

const app = express(); 

//server
const server = require('http').createServer(app); 
//config protocol WSS(web socket)
const io = require('socket.io')(server); 

//configuration for archives css, js, images and files .html(views) 
app.use(express.static(path.join(__dirname, 'public'))); 
app.set('views', path.join(__dirname, 'public'));

//config archives using .html with ejs  
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html'); 

app.use('/', (req, res) => {
    res.render('index.html'); 
})

let messages = []; 

io.on('connection', socket => {
    console.log(`socket conectado: ${socket.id}`);
    
    socket.on('sendMessage', data => {
        messages.push(data); 
        socket.broadcast.emit('receivedMessage', data); 
    })
}) 


server.listen(3000); 