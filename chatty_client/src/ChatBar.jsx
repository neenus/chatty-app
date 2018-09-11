import React, {Component} from 'react';
import propTypes from 'prop-types';

export default class ChatBar extends Component {
  render(){
    
    
    return (
      <footer className="chatbar">
        <input onKeyPress={this.props.chatBarListner} name="username" className="chatbar-username" defaultValue={this.props.user} placeholder="Your Name (Optional)" type="system"/>
        <input onKeyPress={this.props.chatBarListner} name="content" className="chatbar-message" placeholder="Type a message and hit ENTER" type="userInput"/>
      </footer>
    );
  }
}

ChatBar.propTypes = {
  chatBarListner: propTypes.func,
  user: propTypes.string.isRequired
}