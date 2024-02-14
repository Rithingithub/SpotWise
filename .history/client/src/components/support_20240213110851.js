


  import React, { useState, useEffect } from 'react';
  import { IoChevronBackCircleOutline } from 'react-icons/io5';
  
  import prjLogo from '../images/icon_car.png';
  import sendicon from '../images/Send.png';
  import '../components/style.css';
  import styles from '../components/support.css';

const Support = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [scrollContainerRef, setScrollContainerRef] = useState(null);
    const [initialBotResponseDisplayed, setInitialBotResponseDisplayed] = useState(false);
  
    useEffect(() => {
      // Set the scroll container reference when component mounts
      setScrollContainerRef(document.getElementById('chat-container'));
      // Start the chat with a greeting message
      receiveMessage('Hi there! How can I assist you today?');
    }, []);
  
    const sendMessage = () => {
      if (input.trim() === '') return;
  
      // Add user input to messages
      const newUserMessage = { text: input, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
  
      setInput('');
  
      // Process the user's message
      processUserMessage(input);
    };
  
    const processUserMessage = (text) => {
      let response;
      switch (text.toLowerCase()) {
        case 'hello':
          response = 'Hi there! How can I assist you today?';
          break;
        case 'how are you?':
          response = 'I\'m just a chatbot, but thanks for asking!';
          break;
        case 'goodbye':
          response = 'Goodbye! Have a great day!';
          break;
        default:
          response = 'Sorry, I didn\'t understand that.';
          break;
      }
  
      receiveMessage(response);
    };
  
    const receiveMessage = (message) => {
      // Add bot response to messages only if initial bot response is already displayed
      if (initialBotResponseDisplayed) {
        const newBotMessage = { text: message, isUser: false };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      } else {
        // Display initial bot response and set the flag to true
        setMessages([{ text: message, isUser: false }]);
        setInitialBotResponseDisplayed(true);
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    };
  
    const goBack = () => {
      window.location.href = '/';
    };
  
    return (
      <div>
        <div className='Header'>
                <img src={prjLogo} alt='Logo' width={55} height={35} />
                <h2>SpotWise</h2>
            </div>
            <button className='back-button' onClick={goBack}>
                <IoChevronBackCircleOutline className='icon' />
            </button>

            <div className={styles['bot-heading']}>
                <h1>ChatBot AI</h1>
            </div>
  
        <div
          id="chat-container"
          className={styles['chat-container']}
          ref={scrollContainerRef}
        >
          {messages.map((message, index) => (
            <div key={index} className={message.isUser ? styles['user-message'] : styles['bot-message']}>
              {message.isUser ? (
                <textarea value={message.text} readOnly className={styles['user-response']} />
              ) : (
                <div className={styles['bot-response']}>
                  <span>{message.text}</span>
                </div>
              )}
            </div>
          ))}
        </div>
  
        <div className={styles['input-container']}>
                <input
                    className={styles['text-input']}
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Type a message...'
                />
                
                <a className={styles['custom-anchor']} onClick={sendMessage} ><img className='image-button' src={sendicon} width='54px' height='50px' ></img></a>
            </div>
      </div>
    );
  };
  
  export default Support;
  