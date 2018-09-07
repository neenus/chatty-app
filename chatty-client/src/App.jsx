import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  componentDidMount(){
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    console.log('connected to server');    
    // setTimeout(() => {

    // console.log("simulating incoming message");
    // Add a new message to the list of messages in the data store
    // const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    // const messages = this.state.messages.concat(newMessage);

    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    // this.setState({messages: messages});
    // }, 3000);
  }
  render() {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          < MessageList messages={this.state.messages}/> 
          <br />
          < ChatBar user={this.state.currentUser.name} addNewMessage={this.__addNewMessage}/>
        </div>
      );
      console.log(messages)
    }

    __addNewMessage = (event) => {
      if(event.key === 'Enter') {
        console.log(`this was pressed ${event.target.className}`)
        let enteredMessage = {
          username: this.state.currentUser.name, 
          content: event.target.value,
          type: event.target.type
        }
        this.socket.send(JSON.stringify(enteredMessage))
        event.target.value = '';
        
      }
      this.socket.onmessage = (event) => {
        let json = JSON.parse(event.data);
        const oldMessages = this.state.messages;
        console.log("original state", this.state.messages)
        let receivedMessage = {
          id: json.id,
          username: json.username,
          content: json.content
        }
        const newMessages = [
          ...oldMessages, receivedMessage
        ] 
        console.log(newMessages);
  
        this.setState({messages: newMessages})
        // console.log(json);
        // console.log(receivedMessage);
      }
    };
}
export default App;
