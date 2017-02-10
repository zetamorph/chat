var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    log('A user connected');
    
    socket.on('message', (msg) => {
        io.emit('message', msg);
        log('message: '+msg);
    });
    
    socket.on('disconnect', () => {
        log("A user disconnected");
    });
});

server.listen(process.env.PORT, () => {
    console.log('running on port '+process.env.PORT);
});

function log(msg) {
    var date = new Date();
    var time = '[' + date.getHours() +  ':' + date.getMinutes() + ':' + date.getSeconds() + ']';
    console.log(time+" "+msg);
}