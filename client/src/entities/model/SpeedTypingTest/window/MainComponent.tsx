import { useState, type ChangeEvent } from "react";
import { TypingText } from "../TextData";

const MainComponent = () => {
  const [randomText] = useState(() => {
    const index = Math.floor(Math.random() * TypingText.length);
    return TypingText[index];
  });

  const [userInput, setUserInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const isFinished = userInput.length >= randomText.length;

  return (
    <div>
      <h3>check your speed</h3>
      <div>
        <h3>{randomText}</h3>
      </div>
      <div>
        <textarea
          value={userInput}
          onChange={handleChange}
          placeholder="Start typing here!!!!!"
          disabled={isFinished}
        ></textarea>
      </div>
      <div>
        {isFinished && (
          <div>
            <h3>result</h3>
            {userInput === randomText ? (
              <h3>Everything is correct!</h3>
            ) : (
              <h3>There are errors in the text.</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
