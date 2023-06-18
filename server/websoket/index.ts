import WebSocket from 'ws';
import { port, server } from '../index';

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  //connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
    //log the received message and send it back to the client
    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection
  ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(port, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});