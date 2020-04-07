const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let PORT = 3000;

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.redirect('/prezentace/');
});

process.argv.forEach((val, index) => {
  if (val.startsWith('--port='))
    PORT = parseInt(val.split('=')[1]);
});

http.listen(PORT, function () {
   let host = http.address().address
   let port = http.address().port

   console.log("listening at http://%s:%s", host, port)
});

io.on('connection', (socket) => {
  socket.on('role', (role) => {
    console.log(`new ${role} just joined`);
    switch (role) {
      case 'host':
        socket.join('hosts');
        socket.emit('clientNumberChanged', clientsNum);
        socket.on("questionsInformation", (info) => io.sockets.in('remotes').emit('questionsInformation', info))
        break;
      case 'client':
        socket.on('login', () => {
          clientsNum ++;
          io.sockets.in('hosts').emit('clientNumberChanged', clientsNum);
        });
        socket.on('reaction', (reaction) => io.sockets.in('hosts').emit('reaction', reaction));
        socket.on('question', (question) => io.sockets.in('hosts').emit('question', question));
        socket.on('removeQuestion', (id) => io.sockets.in('hosts').emit('removeQuestion', id));
        break;
      case 'rc':
        socket.join("remotes");
        socket.on('move', (move) => io.sockets.in('hosts').emit('move', move));
        socket.on('showQuestions', (x) => io.sockets.in('hosts').emit('showQuestions', x));
        socket.on('hideQuestions', (x) => io.sockets.in('hosts').emit('hideQuestions', x));
        socket.on('removeQuestion', (id) => io.sockets.in('hosts').emit('removeQuestion', id));
      default:
        break;
    }
  });
});
