import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
  const [response, setResponse] = useState('');
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    processCommand(transcript);
    resetTranscript();
  };

  const processCommand = (command) => {
    const commandLower = command.toLowerCase();

    if (commandLower.includes('hello')) {
      speak('Hello, how can I assist you today?');
      setResponse('Hello, how can I assist you today?');
    } else if (commandLower.includes('time')) {
      const time = new Date().toLocaleTimeString();
      speak(`The current time is ${time}`);
      setResponse(`The current time is ${time}`);
    } else if (commandLower.includes('open') && commandLower.includes('website')) {
      const website = commandLower.split('website ')[1];
      if (website) {
        window.open(`https://${website}`, '_blank');
        speak(`Opening ${website}`);
        setResponse(`Opening ${website}`);
      }
    } else {
      speak('Sorry, I did not understand that.');
      setResponse('Sorry, I did not understand that.');
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Sorry, your browser does not support speech recognition.</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Jarvis Bot</h1>
      <div>
        <button onClick={handleStart}>Start Listening</button>
        <button onClick={handleStop}>Stop Listening</button>
      </div>
      <p><strong>Transcript: </strong>{transcript}</p>
      <p><strong>Response: </strong>{response}</p>
    </div>
  );
};

export default App;
