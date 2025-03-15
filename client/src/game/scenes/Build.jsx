// TODO: import files here. what are those files? uncomment once files have been created/figured out
// import Phaser from "phaser";???
import React, { useState } from 'react';
import '../../../public/assets/Build.css'


const Build = () => {
    const [revealedText, setRevealedText] = useState([]);
  
    const cards = [
        { id: 1, text: 'this is the first card.' },
        { id: 2, text: 'this is the second card.' },
        { id: 3, text: 'this is the third card.' },
        { id: 4, text: 'this is the fourth card.' },
    ];
  
    const handleCardClick = (text) => {
        setRevealedText((prev) => [...prev, text]);
    };
  
    return (
        <div className="Build">
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
                {revealedText.map((text) => (
                    <p className="card bottom">{text}</p>
                ))}
            </div>
        </div>
    );
  };
  
  export default Build;
