import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component{
  render() {
    // console.log(this.props.messages)
    const message = this.props.messages.map((message, i) => 
      {return (<Message key={i} message={message.content} username={message.username} />);}
    )
    return(
      <main className="messages">
        {message}
      </main>
    );
  }
}