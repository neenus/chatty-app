import React, {Component} from 'react';

export default class ChatBar extends Component {
  render(){
    
    
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.user} placeholder="Your Name (Optional)" />
        <input onKeyPress={this.props.addNewMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}