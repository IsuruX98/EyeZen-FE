import React, { useEffect, useState } from "react";
import axios from "../../../apis/axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import Speaker from "../../../assets/sigthted-test/speaker1.png";

function VoiceToText() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState({ success: 0, failure: 0 });
  const [currentWordIndex, setCurrentWordIndex] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [fontSizes] = useState([24, 18, 16, 12, 8]);
  const [currentFontSizeIndex, setCurrentFontSizeIndex] = useState(0);

  const { speak } = useSpeechSynthesis();

  const predefinedText =
    "Please make sure to cover your one eye before starting the test by clicking the blue button below and do the test by say the word";

  useEffect(() => {
    axios
      .get("word")
      .then((res) => {
        setWords(res.data);
        setLoading(false);
        // Initialize the current word and font size index
        setCurrentWordIndex(Math.floor(Math.random() * res.data.length));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const { transcript, listening } = useSpeechRecognition();

  const handleSuccessfulAttempt = () => {
    if (attempts.success < 4) {
      setAttempts({ ...attempts, success: attempts.success + 1 });
      setCurrentFontSizeIndex((prevIndex) =>
        prevIndex < fontSizes.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else {
      window.location.href = "/eye-sight-pass";
    }
  };

  const handleFailedAttempt = () => {
    window.location.href = "/eye-sight-fail";
  };

  const handleSpeechRecognitionResult = () => {
    if (currentWordIndex !== null) {
      if (
        transcript.toLowerCase() === words[currentWordIndex].word.toLowerCase()
      ) {
        handleSuccessfulAttempt();
        // Check if the user has passed all 5 attempts
        if (attempts.success + 1 === 5) {
          window.location.href = "/eye-sight-pass";
        } else {
          // Generate a new random word and continue the test
          const newWordIndex = Math.floor(Math.random() * words.length);
          setCurrentWordIndex(newWordIndex);
        }
      } else {
        // If the user fails once, immediately navigate to the fail page
        handleFailedAttempt();
      }
    }
  };

  const startListeningAndUpdateData = () => {
    SpeechRecognition.startListening();

    // Moved handleSpeechRecognitionResult to the onEnd callback
    // This ensures it only executes after the user has finished speaking
    setIsHidden(true);
  };

  const handleSpeak = () => {
    speak({ text: predefinedText, rate: 0.7 });
  };

  // Handle the case when the transcript is empty
  useEffect(() => {
    if (transcript.trim() === "") {
      // Handle the empty transcript, for example, display a message to the user
      // For this example, we're just logging it
      console.log("Transcript is empty");
    } else {
      // Handle the non-empty transcript, such as checking the result
      handleSpeechRecognitionResult();
    }
  }, [transcript]);

  return (
    <div className="flex justify-center items-center h-screen w-screen relative">
      <div className="max-w-lg lg:items-center justify-between">
        <div
          className="flex items-center gap-5 bg-[#004AAD] justify-center p-2 rounded-md cursor-pointer hover:bg-blue-600 mb-24 animate-pulse"
          style={{ visibility: isHidden ? "hidden" : "visible" }}
          onClick={handleSpeak}
        >
          <img src={Speaker} alt="speaker" className="w-[50px] " />
          <h1
            className="font-semibold  text-white "
            style={{ fontSize: `${fontSizes[currentFontSizeIndex]}px` }}
          >
            Click here for Instructions
          </h1>
        </div>

        <div className="">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <div>
              {currentWordIndex !== null && (
                <div className="mb-24 flex justify-center items-center">
                  <span
                    style={{
                      visibility: isHidden ? "visible" : "hidden",
                      fontSize: `${fontSizes[currentFontSizeIndex]}px`,
                    }}
                  >
                    {words[currentWordIndex].word}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="position-absolute">
          <div className="mb-4">
            <div
              className="bg-gray-100  rounded-md h-16 lg:w-[500px] overflow-y-auto"
              style={{ visibility: isHidden ? "visible" : "hidden" }}
            >
              {transcript}
            </div>
          </div>
          <div className="flex justify-between items-center flex-col">
            <button
              onClick={startListeningAndUpdateData}
              disabled={listening}
              className={`bg-[#004AAD] text-white px-4 py-2 hover:bg-blue-600 rounded-md mb-4 lg:w-full ${
                listening && "opacity-50 cursor-not-allowed"
              }`}
            >
              Start Listening
            </button>
            <button
              style={{ visibility: isHidden ? "visible" : "hidden" }}
              onClick={SpeechRecognition.stopListening}
              disabled={!listening}
              className={`bg-red-500 text-white px-4 py-2 rounded-md lg:w-full ${
                !listening && "opacity-50 cursor-not-allowed"
              }`}
            >
              Stop Listening
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceToText;
