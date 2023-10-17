import React, { useState } from 'react';
import Button from "../../components/Button";

const InfantQuiz = () => {
    const faqData = [
      {
        question: "What is the Infant Development Quiz?",
        answer: "The Infant Development Quiz is an assessment designed to help parents and caregivers track and understand their infant's developmental milestones, behaviors, and abilities during the first year of life."
      },
      {
        question: "How do I perform the Infant Development Quiz?",
        answer: "To perform the quiz, simply observe your infant's behaviors and interactions with their surroundings. Read each question carefully and mark the option that best describes your baby's behavior."
      },
      {
        question: "Can I perform this quiz at any age of my baby?",
        answer: "Yes, you can perform the Infant Development Quiz at any age during your baby's first year. However, some questions may be more relevant to certain developmental stages, so it's best to perform it periodically to track progress."
      },
      {
        question: "Is the quiz a substitute for professional medical assessments?",
        answer: "No, the quiz is not a substitute for professional medical assessments. It's a tool to help parents become more aware of their infant's development. If you have concerns about your baby's development, consult with a pediatrician or child development specialist."
      },
      {
        question: "How accurate is the quiz in assessing infant development?",
        answer: "The quiz provides a general guideline for assessing infant development based on observable behaviors. Its accuracy depends on the quality of your observations. While it can help you identify potential areas of concern, it is not a diagnostic tool."
      },
      {
        question: "What should I do if I have concerns about my infant's development based on the quiz results?",
        answer: "If you have concerns about your infant's development, especially if you marked 'Rarely or never' for multiple questions, it's important to discuss your observations with a healthcare professional. Early intervention can be crucial for addressing developmental delays."
      },
      {
        question: "How often should I perform the Infant Development Quiz?",
        answer: "Performing the quiz periodically, such as once a month, can help you track changes in your baby's development. However, consult with your pediatrician for a recommended schedule based on your baby's specific needs."
      },
      {
        question: "Are the quiz results confidential?",
        answer: "The quiz results are for your personal use and are not shared with anyone unless you choose to share them. They are not stored or used for any other purposes."
      }, 
      {
        question: "Is the quiz suitable for premature infants or babies with special needs?",
        answer: "The quiz can be used for premature infants and babies with special needs, but it's essential to consider their unique circumstances and developmental trajectories. Consult with a healthcare professional for tailored guidance."
      },
      {
        question: "Can I use the quiz to celebrate my baby's milestones?",
        answer: "Absolutely! The quiz can be a great way to celebrate your baby's progress and achievements. It can help you appreciate the amazing journey of infant development."
      }
    ];
  
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleAnswer = (index) => {
      setActiveIndex(index === activeIndex ? null : index);
    };
  
    const handleButtonClick = () => {
      window.location.href = '/infant_questionnaire'; // Change the URL to navigate to the '/quiz' route
    };

    return (
      <div>
        <section className="pt-20 pb-5 px-8 mx-auto mb-2" style={{width: "80%"}}>
        <div>
        <div className="text-5xl font-bold text-center mb-10">
          Infant Vision
          <span className="text-[#004AAD]"> Test Quiz</span>
        </div>
      </div>
      <div className="text-2xl test-bold text-center mb-4">
          About the Test
        </div>
        <p className="text-lg text-gray-600 text-center">
        Welcome to the Infant Vision Development Quiz! This quiz is designed to help parents and caregivers assess their infant's vision abilities and milestones. Vision development is a crucial aspect of a baby's early growth, and this quiz will guide you in observing and understanding your infant's visual development. Please note that every baby is unique, and development can vary, so use this quiz as a general guideline.
        </p>
      </section>
        <section className="bg-white-100 py-8 px-8 mx-auto mb-10 shadow-2xl shadow-gray-400" style={{width: "80%"}}>
          {/* <h2 className="text-2xl font-semibold text-black mb-4">Frequently Asked Questions</h2> */}
          <ul className="mx-auto"> {/* Center the FAQ section */}
            {faqData.map((faq, index) => (
              <li key={index} className="border-t border-blue-800 py-4">
                <button
                  className="flex items-center justify-between w-full"
                  onClick={() => toggleAnswer(index)}
                >
                  <span className="text-lg font-medium text-gray-700">{faq.question}</span>
                  <span className={`transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}>&#9660;</span>
                </button>
                {activeIndex === index && (
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
        <div className="flex justify-center mt-1 mb-10">
        <Button btnName="Start Quiz" onClick={handleButtonClick}/>
      </div>
      </div>
    );
};

export default InfantQuiz;
