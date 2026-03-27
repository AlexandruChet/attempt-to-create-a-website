import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { TypingText } from "../TextData";
import { useCalculateWPM } from "../../tasks-hooks/useCalculateTime";
import Rocket from "../../../../shared/img/rocket.png";

const MainComponent = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const WPM = useCalculateWPM(userInput.length, time);
  let speedMessage;

  const [randomText] = useState(() => {
    const index = Math.floor(Math.random() * TypingText.length);
    return TypingText[index];
  });

  const partToCompare = randomText.slice(0, userInput.length);
  const isError = userInput !== partToCompare;
  const isFinished = userInput.length === randomText.length;
  let auditMessage = "Start typing";
  if (userInput.length > 0) auditMessage = isError ? "Error found!!!!!" : "OK";

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setUserInput("");
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= randomText.length) setUserInput(value);
    if (value.length === 1 && !isRunning) setIsRunning(true);
    if (value.length === randomText.length) setIsRunning(false);
  };

  if (WPM < 100) {
    speedMessage = "Your score is below average";
  } else if (WPM >= 100 && WPM <= 200) {
    speedMessage = "Your result is average";
  } else {
    speedMessage = "Your result is good";
  }

  return (
    <div className="speed-test">
      <div className="speed-test__header">
        <h1 className="speed-test__title">Check your speed</h1>
        <div className="speed-test__stats-body">
          <h3 className="speed-test__timer">
            Timer: {(time / 1000).toFixed(1)} s.
          </h3>
          <h3
            className={`speed-test__status speed-test__status--${isFinished ? "done" : "active"}`}
          >
            Status: {auditMessage}
          </h3>
        </div>
      </div>

      <div className="speed-test__display">
        <h3 className="speed-test__random-list">{randomText}</h3>
      </div>

      <div className="speed-test__controls_buttons">
        <button className="speed-test__reset-btn" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="speed-test__input-area">
        <textarea
          className={`speed-test__textarea ${isFinished ? "speed-test__textarea--disabled" : ""}`}
          value={userInput}
          onChange={handleChange}
          placeholder="Start typing here (Please don't use Enter!!!)"
          disabled={isFinished}
          rows={5}
          cols={50}
        />
      </div>

      <div className="speed-test__live-results">
        <p className="speed-test__wpm">
          Speed: <strong>WPM: {WPM}</strong> (words per minute)
        </p>
      </div>

      <div className="speed-test__visual-rocket">
        <div className="speed-test__rocket-container">
          <img className="speed-test__rocket-img" src={Rocket} alt="Rocket" />
        </div>
      </div>

      {isFinished && (
        <div className="speed-test__result-card">
          <hr className="speed-test__divider" />
          <h2 className="speed-test__result-title">Result:</h2>
          <p className="speed-test__final-wpm-headline-result">
            Speed: <strong>WPM: {WPM}</strong> (words per minute)
          </p>

          <div
            className={`speed-test__outcome ${userInput === randomText ? "speed-test__outcome--success" : "speed-test__outcome--error"}`}
          >
            {userInput === randomText ? (
              <h3 className="correct-text">Everything is correct!!!!!!!!</h3>
            ) : (
              <div>
                <h3 className="err-text">There are errors in the text!!!!</h3>
                <h3 className="result-speed-text">{speedMessage}</h3>
              </div>
            )}
          </div>
          <p className="speed-test__final-time">
            Final Time is: {(time / 1000).toFixed(5)} seconds
          </p>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
