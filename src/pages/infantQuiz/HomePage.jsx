import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import axios from "../../apis/axios";
import babyVisionImage1 from "../../assets/infantVisionImg/baby-vision1.jpg";
import babyVisionImage2 from "../../assets/infantVisionImg/baby-vision2.jpg";
import babyVisionImage3 from "../../assets/infantVisionImg/baby-vision3.jpg";

const InfantQuizHome = () => {
  const navigate = useNavigate();
  const [facts, setFacts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [babyVisionImage1, babyVisionImage2, babyVisionImage3];
  const faqData = [
    {
      question: "What is infant eye care?",
      answer:
        "Infant eye care involves taking care of your baby's eyes from birth to ensure their vision develops properly. Regular check-ups with a pediatric eye specialist can help detect and address any eye issues early on.",
    },
    {
      question: "When should I schedule my baby's first eye exam?",
      answer:
        "A baby's first eye exam is typically scheduled at around 6 months of age. However, if you notice any eye-related concerns earlier, it's important to consult with a pediatric eye doctor.",
    },
    {
      question: "How can I protect my baby's eyes?",
      answer:
        "To protect your baby's eyes, ensure they are shielded from direct sunlight, use baby-safe products for cleaning, and maintain proper hygiene. Regular check-ups and following your doctor's advice are also crucial.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => {
      clearInterval(imageInterval);
    };
  }, [images.length]);

  useEffect(() => {
    // Fetch all facts from the backend
    axios
      .get("infantFact")
      .then((response) => {
        setFacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching facts:", error);
      });
  }, []);

  const handleButtonClick = () => {
    navigate("/infant_questionnaire");
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 px-12 pt-10 lg:py-40 lg:px-24 gap-10">
        <div className="flex justify-center items-center h-full">
          <div>
            <h2 className="text-[56px] font-extrabold">Infant</h2>
            <span className="text-[46px] font-extrabold text-[#004AAD]">
              Eye care
            </span>
            <h2 className="pt-8 text-lg font-semibold">
              Keeping Your Baby's Eyes Bright and Healthy
            </h2>
            <div className="pt-10">
              <button
                onClick={handleButtonClick}
                className="bg-[#004AAD] text-white font-bold px-6 py-3 rounded-md mr-4 hover:bg-blue-800"
              >
                Take the Quiz
              </button>
            </div>
          </div>
        </div>

        <div>
          <img
            src={images[currentImageIndex]}
            alt="Animated"
            style={{ height: "300px" }}
            className="rounded-3xl lg:h-[635px] h-full w-full object-cover transform rotate-0 transition-transform duration-300"
          />
        </div>
      </div>

      <section className="bg-white">
        <div className="lg:px-28 px-12 py-3">
          <span className="text-xl font-bold">Infant Vision </span>
          <span className="text-xl font-bold text-[#004AAD]">
            Birth to One Year
          </span>
        </div>
        <div className="lg:px-28 px-12 flex">
          <Carousel
            showArrows={false}
            showThumbs={false}
            infiniteLoop={true}
            showStatus={false}
            autoPlay={true}
            interval={10000}
            style={{ marginBottom: "20px" }}
            className="shadow-xl shadow-gray-400"
          >
            {/* Display fetched facts in the carousel */}
            {facts.map((fact, index) => (
              <div key={index} className="bg-white rounded-lg py-6 flex">
                {" "}
                {/* Align items to the start (left corner) */}
                {/* Title and description on the left */}
                <div className="w-1/2 p-6 pl-12">
                  {" "}
                  {/* Add left padding to separate from small circle */}
                  <h3 className="text-2xl text-[#004AAD] font-semibold mb-4">
                    {fact.title}
                  </h3>
                  <ul className="list-disc list-inside mt-2 ml-6 text-gray-800">
                    {/* Render description as bullet points */}
                    {fact.description.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
                {/* Image on the right */}
                <div className="w-1/2 p-4">
                  {fact.imageURL ? (
                    <img
                      src={fact.imageURL}
                      alt={fact.title}
                      style={{
                        height: "200px",
                        width: "100%",
                        maxWidth: "400px",
                      }}
                    />
                  ) : (
                    <img
                      src={babyVisionImage1}
                      alt={fact.title}
                      style={{
                        height: "200px",
                        width: "100%",
                        maxWidth: "400px",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section
        className="bg-white-100 py-8 px-8 mx-auto mb-10 shadow-2xl shadow-gray-400"
        style={{ width: "80%" }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <ul className="mx-auto">
          {" "}
          {/* Center the FAQ section */}
          {faqData.map((faq, index) => (
            <li key={index} className="border-b border-gray-300 py-4">
              <button
                className="flex items-center justify-between w-full"
                onClick={() => toggleAnswer(index)}
              >
                <span className="text-lg font-medium text-gray-600">
                  {faq.question}
                </span>
                <span
                  className={`transform ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  } transition-transform duration-300`}
                >
                  &#9660;
                </span>
              </button>
              {activeIndex === index && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default InfantQuizHome;
