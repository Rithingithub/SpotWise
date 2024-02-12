import React, { useState, useEffect } from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5';

import prjLogo from '../images/icon_car.png';
import '../components/style.css';

const Support = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Start the chat with a greeting message
        receiveMessage('Hi there! How can I assist you today?');
    }, []);

    const sendMessage = () => {
        if (input.trim() === '') return;

        const newMessages = [...messages, { text: input, isUser: true }];
        setMessages(newMessages);
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
        const newMessages = [...messages, { text: message, isUser: false }];
        setMessages(newMessages);
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

            <div className='chat-container'>
                {messages.map((message, index) => (
                    <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
                        {message.isUser ? (
                            <input type="text" value={message.text} readOnly className="user-response" />
                        ) : (
                            <textarea readOnly value={message.text} className="bot-response" />
                        )}
                    </div>
                ))}
            </div>

            <div className='input-container'>
                <input
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Type a message...'
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Support;
