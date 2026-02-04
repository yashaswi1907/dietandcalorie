import { useState, useRef, useEffect } from 'react';
import styles from './AIChatbot.module.css';
import { processMessage } from '../utils/chatbotLogic';

function AIChatbot({ userProfile }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm FitBot 🤖. Ask me for a workout plan!", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Process bot response
        setTimeout(() => {
            const botResponseText = processMessage(userMsg.text, userProfile);
            const botMsg = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000); // Simulate network delay
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✕' : '🤖'}
            </button>

            {/* Chat Window */}
            <div className={`${styles.chatWindow} ${isOpen ? styles.windowOpen : ''}`}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>
                        <span className={styles.robotIcon}>🤖</span>
                        <h3>FitBot AI</h3>
                    </div>
                    <span className={styles.status}>Online</span>
                </div>

                <div className={styles.messagesContainer}>
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.botMessage}`}
                        >
                            {msg.text.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    ))}
                    {isTyping && (
                        <div className={`${styles.message} ${styles.botMessage} ${styles.typing}`}>
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className={styles.inputArea} onSubmit={handleSend}>
                    <input
                        type="text"
                        placeholder="Ask for a workout..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" disabled={!inputValue.trim()}>
                        ➤
                    </button>
                </form>
            </div>
        </>
    );
}

export default AIChatbot;
