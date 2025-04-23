import React, { useState } from "react";
import "../css/HowTo.css";

const HowTo = () => {
console.log("reached HowTo")
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  let howToInfo = `In this single player game, race against the clock to name as many films as you can that each link to another.
  
Once you press ‘play’, a timer will begin to countdown from 30 seconds (easy mode) or 20 seconds (hard mode), and you will be presented with a random film to start.

In the given textbox, you’ll need to then start typing the title of a film that links to the original. Select your film from the dropdown that appears to submit your answer.

We’ll then look to check for any links between these two films (actor, director, composer, etc.), and if successful, you’ll move on to your next guess! This time, you’ll need to think of a film that links to your previous guess, and so on and so forth, until the timer runs out! 

Remember though, you can only use a film once, and for each person that links a film will have a 3-strike scoring system - this means that once you’ve made 3x links that include this person, you’ll no longer be able to guess films that link them again.

The aim is to guess as many films you can before time runs out.

But what if I guess it wrong / time runs out?
Then it’s game over! But don’t worry, you can play again, and try to beat your score!


"You know what your problem is, it's that you haven't seen enough movies - all of life's riddles are answered in the movies."
Steve Martin
`

  return (
    <div>
      <button className="modal-howto-btn" onClick={openModal}>
        how to play
      </button>

      {isModalOpen && (
        <div className="modal-howto-overlay open-modal-howto">
          <div className="modal-howto-container">
            <h1 className="howto-h1">How to Play Double Feature</h1>
            <h2 className="howto-h2">🎥 How well do you know your films? 🎥</h2>
            {/* <p>In this single player game, race against the clock to name as many films as you can that each link to another...</p> */}
            {/* <p>{howToInfo}</p> */}
            <p className="howto-text">
              {howToInfo.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <button className="close-howto-btn" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HowTo;
