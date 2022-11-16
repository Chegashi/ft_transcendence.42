import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

/*

{
  sender : sring,
  text : string
}

*/

const socket = io('http://localhost:3001');

function App() {
  interface msgType {
    name : string,
    text : string
  };

  const [messages , setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);



  useEffect(()=> {
    
    

    socket.emit('findAllMessages', {}, (response: any) => { // while i dnt have a payload use object {},  3th parm for response callback
      setMessages(response);
    });

    socket.on('message', (message: msgType) => {
      var setMessages = ((prev : msgType[])  => {
        prev.push(message);
        return prev;
      })
    });

    return () => {
      
    };

  }, [messages]);

  const sendMessage = () => {
    console.log(`${userName} want to say : ${userMessage}`);

    if (userMessage) {   
      socket.emit('createMessage', {text: userMessage, name : userName }, () => {
        console.log("message sent succuessfuly");
        setUserMessage("");
      })
    }
  };

  const joinRoom = (e: any) => {
    e.preventDefault();
    console.log(`${userName} wants to join`);
    socket.emit('join', {name: userName}, () => { // name for a payload && retuen names on 3th param for everyone jioned
      console.log(`${userName} joined successfuly`);
      setJoined(true);
    })
  }

  return (
  <div className="chat">
      <div >
      <form onSubmit={joinRoom}>
        <label>
          set your Name:
          <input type="text" value={userName} onChange={(e)=> { console.log(userName); setUserName(e.target.value)}} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>

      <div className="chat-container">
        <div className="messages-container">
          <ul>
            <span>messages : </span>
            {
              messages.map((message : any, idx) => {
                return <li key={idx}> {`${message.name} : ${message.text}` } </li>
              })
            }
          </ul>
        </div>
    
        <br />
        <hr />
    
{
  joined ? 
  <div className="message-input">
          <form  onSubmit={(e) => { 
              e.preventDefault();
              sendMessage();
            }
          }>
            <label>Message:</label>
            <input type="text" onChange={(e) => {setUserMessage(e.target.value)}} value={userMessage} />
            <button type="submit">Send</button>
          </form>
        </div> : <></>
}
      </div>
    </div>
  );
}

export default App;
