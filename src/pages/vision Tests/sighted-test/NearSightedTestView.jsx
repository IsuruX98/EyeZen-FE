import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NearSightedTestView = () => {
  const [characters, setCharacters] = useState(['E', 'F P', 'T  O  Z', 'L P E D', 'P E C F D', 'E D F C Z P', 'F E L O P Z D ', 'D E F P O T E C']);
  const [fontSizes, setFontSizes] = useState([400, 200, 150, 130, 100, 80, 60, 40]);
  const[result, setResult] = useState(['6/60', '6/30','6/20','6/15','6/12','6/9','6/8','6/6']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const startSpeechRecognition = () => {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new SpeechRecognition();
        recognition.continuous = true;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onresult = (event) => {
          const last = event.results.length - 1;
          const spokenWord = event.results[last][0].transcript.toLowerCase().trim();
          var visionLevel; //c

          if (spokenWord === 'ok' || spokenWord === 'okay' || spokenWord === 'years' || spokenWord === 'ears') {
            if (currentIndex < characters.length - 1) {
              setCurrentIndex(currentIndex + 1);
            }
            else{
              visionLevel = result[currentIndex]
              navigate('/near-sighted-result', {state: {visionLevel}});  //c
            }
          } else if (spokenWord === 'not clear') {
            // Navigate to 'near-sighted-result' path
            visionLevel = result[currentIndex] //c
            navigate('/near-sighted-result', {state: {visionLevel}} );
          } else {
            // Reset the transcript for any other spoken words
            setTranscript('');
          }
        };

        recognition.start();

        return () => {
          recognition.stop();
        };
      } else {
        // Fallback for unsupported browsers (inform the user that speech recognition is not available)
        console.log('Speech recognition is not supported in this browser.');
      }
    };

    startSpeechRecognition();
  }, [currentIndex, characters, navigate]);

  return (
    <div className='h-screen flex justify-center items-center'>
     <div>

       <div className='flex flex-col'>
         <h1 className='font-bold' style={{ fontSize: `${fontSizes[currentIndex]}px`, fontFamily:'courier' }}>
           {characters[currentIndex]}
         </h1>
         {isListening}
         {/* <button className="bg-[#004AAD] text-white rounded-md font-medium py-2 w-full  items-center lg:mt-0" >
                        Next
            </button> */}
       </div>
      
     </div>
    </div>
  );
};

export default NearSightedTestView;
