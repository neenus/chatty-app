const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// UUID generation 
const uuidv1 = require('uuid/v1');
const randomId =  () => {return uuidv1();};

// Create a new express server
const server = express()
  // make the express server serve static assets (html, javascrip, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  // receive message from react client
  ws.on('message', function incoming(data) {
    let incomingMessage = JSON.parse(data);
    console.log(incomingMessage);
    let outgoingMessage = {
      id: randomId(),
      username: incomingMessage.username,
      content: incomingMessage.content,
      messageType: incomingMessage.type
    };
    console.log("incoming:", incomingMessage);
    console.log("outgoing", outgoingMessage);

    wss.clients.forEach(function each(client) {
      console.log("broadcast", outgoingMessage);
      if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(outgoingMessage));
      }
    });
  });
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser
  ws.on('close', () => console.log('Client disconnected'));
});



