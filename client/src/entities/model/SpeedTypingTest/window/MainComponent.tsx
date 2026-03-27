import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { TypingText } from "../TextData";

const MainComponent = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const [userInput, setUserInput] = useState<string>("");

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

  return (
    <div>
      <h3>Check your speed</h3>
      <div>Timer: {(time / 1000).toFixed(1)} s.</div>
      <div>Status: {auditMessage}</div>
      <div>
        <h3>{randomText}</h3>
      </div>
      <div>
        <button onClick={reset}>Reset</button>
      </div>
      <textarea
        value={userInput}
        onChange={handleChange}
        placeholder="Start typing here (Please dont use Enter!!!)"
        disabled={isFinished}
        rows={5}
        cols={50}
      />

      {isFinished && (
        <div>
          <hr />
          <h3>Result:</h3>
          {userInput === randomText ? (
            <h3>Everything is correct!!!!!!!!</h3>
          ) : (
            <h3>There are errors in the text!!!!</h3>
          )}
          <p>Final Time is: {(time / 1000).toFixed(2)} seconds</p>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
