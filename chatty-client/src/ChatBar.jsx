import React, {Component} from 'react';
// import UserNameFeild from './UserNameFeild';

export default class ChatBar extends Component {
  render(){
    
    
    return (
      <footer className="chatbar">
        <input onKeyPress="" className="chatbar-username" defaultValue={this.props.user} placeholder="Your Name (Optional)" type="system"/>
        <input onKeyPress={this.props.addNewMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" type="userInput"/>
      </footer>
    );
  }
}