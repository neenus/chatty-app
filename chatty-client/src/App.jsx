import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    // Set the initial state
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      size: 0
    };
  }
  
  componentDidMount(){
    console.log("componentDidMount <App />");
    // initialize socket server
    this.socket = new WebSocket("ws://localhost:3001");
    console.log('connected to server');    
    
    // listener to messages from server to handle render on react app
    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      if (data.type === "userConnection") {
        this.setState({size: data.size});
      } else {
      const oldMessages = this.state.messages;
      let receivedMessage = {
        type: data.type,
        id: data.id,
        username: data.username,
        content: data.content,
        size: data.size
      };
      const newMessages = [
        ...oldMessages, receivedMessage
      ];
      this.setState({messages: newMessages});
    }
    };
  }
  render() {
    return (
      <div>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <div className="users-count">Connected Users: {this.state.size} </div>
      </nav>
      < MessageList messages={this.state.messages}/> 
      <br />
      < ChatBar user={this.state.currentUser.name} chatBarListner={this.__chatBarListner}/>
      </div>
      );
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
    