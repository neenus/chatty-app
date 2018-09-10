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

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};


wss.on('connection', (ws) => {
  console.log('Client connected');
  let connectedClients = wss.clients.size;
  let sentToClient = { 
    type: "userConnection",
    id: null,
    username: null,
    content: null,
    size: connectedClients, 
  };

  wss.broadcast(sentToClient);
  
  // receive message from react client, 
  // determine how to broadcast it back to everyone based on its type
  // a unique message id is added to each message before it's broadcasted back
  
  ws.on('message', function incoming(data) {
    let receivedMsg = JSON.parse(data);
    let sentToClient = {
      type: (receivedMsg.type === 'postMessage' ? 'incomingMessage' : 'incomingNotification'),
      id: randomId(),
      username: (receivedMsg.type === 'postMessage' ? receivedMsg.username : null),
      content: receivedMsg.content,
      size: receivedMsg.data
    };

    wss.broadcast(sentToClient);
  });
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser
  ws.on('close', () => {
    console.log('Client disconnected');   
    let connectedClients = wss.clients.size;
    let sentToClient = { 
      type: "userConnection",
      id: null,
      username: null,
      content: null,
      size: connectedClients, 
    };

    wss.broadcast(sentToClient);
  });
});