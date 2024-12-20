import React, { useState } from 'react'
import { useEffect } from 'react';
import consumer from './channel/cable'

function Chat() {
    const [message, setMessage] = useState('')

    useEffect(() => {
        const subscription = consumer.subscriptions.create(
            { channel: "ChatChannel", room: "public" },
            {
                connected() {
                    console.log("Connected to ChatChannel");
                },
                disconnected() {
                    console.log("Disconnected from ChatChannel");
                },
                received(data) {
                    console.log("Received data:", data);
                    // Update the messages when data is received
                    // setMessages((prevMessages) => [...prevMessages, data.message]);
                },
            }
        );

        return () => {
            subscription.unsubscribe();
            console.log("Unsubscribed from ChatChannel");
        };
    }, []);
    const sendMessage = () => {
        consumer.subscriptions.subscriptions[0].perform("button_clicked", {
            message: "Hello from React!",
          });
    }
    return (
        <>
            <input type="text" placeholder='message'
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>submit</button>
        </>
    )
}

export default Chat