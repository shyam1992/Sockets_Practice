let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let jsonParser = bodyParser.json();

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) =>{
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});

app.post('/newuser', jsonParser,(req,res,next) => {
    io.emit('new_user_pushed', req.body.api_params);
    res.send({});
});

http.listen(2567, () => {
    console.log('listening on port 2567')
});