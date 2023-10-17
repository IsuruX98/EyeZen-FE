import React from "react";
import StepperComponent from "./StepperComponent";

const Faq = () => {
  // State to track the expanded state of each question

  const faqs = [
    {
      id: "questionOne",
      question: "What is Ayurvedic eye care?",
      answer:
        "Ayurvedic eye care is a holistic approach to maintaining and improving eye health using principles from Ayurveda, an ancient Indian system of medicine. It involves natural remedies, dietary recommendations, eye exercises, and lifestyle practices to promote healthy vision.",
    },
    {
      id: "questionTwo",
      question: "Can Ayurveda help with common eye issues?",
      answer:
        "Yes, Ayurveda offers solutions for common eye issues such as dry eyes, eye strain, and redness. Ayurvedic treatments may include herbal eye drops, eye exercises, and dietary changes to alleviate these problems.",
    },
    {
      id: "questionThree",
      question: "Are there Ayurvedic remedies for improving eyesight?",
      answer:
        "Ayurveda provides techniques to improve eyesight naturally. These may include the use of herbal formulations, regular eye exercises, and maintaining a balanced diet rich in eye-friendly nutrients.",
    },
    {
      id: "questionFour",
      question: "How can I reduce eye strain with Ayurvedic practices?",
      answer:
        "Ayurveda recommends practices like Palming exercises, Trataka meditation, and using herbal eye drops to reduce eye strain caused by prolonged screen time or reading. These techniques help relax the eye muscles and relieve strain.",
    },
    {
      id: "questionFive",
      question:
        "What dietary recommendations does Ayurveda suggest for eye health?",
      answer:
        "Ayurveda emphasizes a diet rich in vitamin A, vitamin C, and antioxidants to support eye health. Foods like carrots, Indian gooseberries (Amla), spinach, and almonds are considered beneficial for the eyes.",
    },
    {
      id: "questionSix",
      question: "Is it necessary to consult an Ayurvedic eye doctor?",
      answer:
        "While Ayurvedic remedies can be helpful, it's essential to consult with a qualified Ayurvedic eye doctor or practitioner before starting any treatment, especially for serious eye conditions. They can provide personalized guidance based on your specific needs.",
    },
  ];

  return (
    <div>
      <div className="container my-10 mx-auto md:px-6 xl:px-24">
        <section className="mb-14">
          <h2 className="mb-6 pl-6 text-3xl font-bold">
            Frequently asked questions
          </h2>

          <div>
            <StepperComponent data={faqs} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Faq;
