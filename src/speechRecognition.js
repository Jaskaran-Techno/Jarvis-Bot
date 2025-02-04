import React, { useState } from "react";
import './App.css';

const App = () => {
  const [transcript, setTranscript] = useState(""); // Store the recognized text
  const [isListening, setIsListening] = useState(false); // Track the listening status

  // Initialize speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Set up speech recognition properties
  recognition.continuous = true; // Keeps the recognition going
  recognition.interimResults = true; // Get results as they are being recognized
  recognition.lang = "en-US"; // Set the language to English (US)

  // Start listening function
  const startListening = () => {
    recognition.start();
    setIsListening(true);
  };

  // Stop listening function
  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  // Handle the recognition results
  recognition.onresult = (event) => {
    const currentTranscript = event.results[event.resultIndex][0].transcript;
    setTranscript(currentTranscript);
  };

  // Handle the recognition error
  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  return (
    <div className="App">
      <h1>Speech Recognition in React</h1>
      <p>Press "Start" to begin listening.</p>

      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>

      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>

      <div>
        <h3>Transcript:</h3>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default App;
