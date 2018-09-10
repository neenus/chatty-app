import React, {Component} from 'react';
import { IncomingMessage } from 'http';

export default class Message extends Component {
  render(){
     if (this.props.type === "incomingMessage") {
      return(
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
      );  
    } else {
      return(
        <div className="message system">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
      )
    }
  }
}