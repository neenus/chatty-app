import React, {Component} from 'react';
import Message from './Message.jsx';
import propTypes from 'prop-types';

export default class MessageList extends Component{
  render() {
    const message = this.props.messages.map((message, i) => 
      {return (<Message key={i} message={message.content} username={message.username} type={message.type}/>);}
    )
    return(
      <main className="messages">
        {message}
      </main>
    );
  }
}

MessageList.propTypes = {
  messages: propTypes.string.isRequired
}