import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }
  
  componentDidMount(){
    console.log("componentDidMount <App />");
    // initialize socket server
    this.socket = new WebSocket("ws://localhost:3001");
    console.log('connected to server');    
    
    // listener to messages from server to handle render on react app
    this.socket.onmessage = (event) => {
      console.log('event recived from server is:', event);
      let data = JSON.parse(event.data);
      console.log('Message received from server: ', data);
      const oldMessages = this.state.messages;
      // console.log("original state", this.state.messages);
      let receivedMessage = {
        type: data.type,
        id: data.id,
        username: data.username,
        content: data.content
      };
      const newMessages = [
        ...oldMessages, receivedMessage
      ];
      console.log("messages log before set state: ", newMessages);
      this.setState({messages: newMessages});
      console.log('this.state.messages ', this.state.messages);
    };
  }
  render() {
    return (
      <div>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      < MessageList messages={this.state.messages}/> 
      <br />
      < ChatBar user={this.state.currentUser.name} chatBarListner={this.__chatBarListner}/>
      </div>
      );
      console.log(messages)
    }
    
    // new messages handler to listen to new user messages and send to server
    // messages received from the server will be handled in componentDidMount
    __chatBarListner = (event) => {
      if(event.key === 'Enter') {
        if(event.target.name === "content") {
          let enteredMessage = {
            type: "postMessage",
            username: this.state.currentUser.name, 
            content: event.target.value,
          }
          this.socket.send(JSON.stringify(enteredMessage))
          event.target.value = '';
        } else {
          this.setState({ currentUser: {name: event.target.value }}) 
          let currentUserName = this.state.currentUser.name;
          let newUserName = event.target.value;
          this.socket.send(JSON.stringify(
            { type: 'postNotification',
            content: `${currentUserName} has changed their name to ${newUserName}`}
            ))
          }
        }
      }
    };
    export default App;
    