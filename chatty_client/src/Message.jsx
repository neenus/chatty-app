import React, {Component} from 'react';
import propTypes from 'prop-types';

export default class Message extends Component {
  render(){
     if (this.props.type === 'incomingMessage') {
      return(
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
      );  
    } else if (this.props.type === 'incomingNotification') {
      return(
        <div className="message system">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
      )
    }
  }
}
Message.propTypes = {
  type: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  message: propTypes.string.isRequired
}