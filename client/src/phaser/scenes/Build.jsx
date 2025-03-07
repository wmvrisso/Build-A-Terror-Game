// TODO: import files here. what are those files? uncomment once files have been created/figured out
// import Phaser from "phaser";
// import React, { useState } from 'react';


const Build = () => {
    const [revealedText, setRevealedText] = useState([]);

    const cards = [
        { id: 1, text: 'Card 1: this is the first card.' },
        { id: 1, text: 'Card 1: this is the first card.' },
        { id: 1, text: 'Card 1: this is the first card.' },
        { id: 1, text: 'Card 1: this is the first card.' },
    ];

    const handleCardClick = (text) => {
        setRevealedText((prev) => [...prev, text]);
    };

    return (
        <div className="Build">
            <h1>Interactive Card Stack</h1>
            <div className="card-container">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="card"
                        onClick={() => handleCardClick(card.text)}
                    >
                        {`Card ${card.id}`}
                    </div>
                ))}
            </div>
            <div className="revealed-text">
                {revealedText.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        </div>
    );
};

export default Build;
    )
}
