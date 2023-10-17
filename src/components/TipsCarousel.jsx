import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const cardData = [
  {
    title: "Palming Exercise",
    content:
      "To relax your eyes, rub your palms together to generate heat, and then gently cup your palms over your closed eyes without putting pressure on them. Keep your eyes closed and take a few deep breaths. This practice can relieve eye strain.",
  },
  {
    title: "Triphala Eye Wash",
    content:
      "Triphala is an Ayurvedic herbal mixture that can be used as an eye wash. Dissolve Triphala powder in warm water and use it to rinse your eyes. It can help reduce irritation and promote eye health.",
  },
  {
    title: "Blink Regularly",
    content:
      "While working on screens or reading for extended periods, make a conscious effort to blink frequently. Blinking helps moisten the eyes and prevents dryness.",
  },
  {
    title: "Amla (Indian Gooseberry) Diet",
    content:
      "Include Amla in your diet. It is rich in vitamin C and antioxidants, which can benefit eye health. You can eat it fresh or consume Amla juice.",
  },
  {
    title: "Trataka Meditation",
    content:
      "Trataka is a meditation technique where you focus your gaze on a candle flame or a specific point. This practice can improve concentration and enhance eye muscle strength.",
  },
  {
    title: "Stay Hydrated",
    content:
      "Drink an adequate amount of water to keep your body and eyes hydrated. Dehydration can lead to dry eyes and discomfort.",
  },
  {
    title: "Rose Water Compress",
    content:
      "Apply a cotton ball soaked in rose water on your closed eyelids for a soothing and refreshing effect. Rose water can help reduce puffiness and refresh tired eyes.",
  },
  {
    title: "Limit Screen Time",
    content:
      "Reduce prolonged screen time, and take regular breaks to rest your eyes. The 20-20-20 rule is helpful: every 20 minutes, look at something 20 feet away for at least 20 seconds.",
  },
  {
    title: "Avoid Rubbing Eyes",
    content:
      "Avoid rubbing your eyes, as it can irritate them and potentially lead to infections. Instead, use artificial tears to relieve irritation.",
  },
];

const TipsCarousel = () => {
  return (
    <>
      <div className="lg:px-28 px-12 py-3">
        <span className="text-xl font-bold">Eye care </span>
        <span className="text-xl font-bold text-[#004AAD]">Tips</span>
      </div>
      <div className="lg:px-28 px-12">
        <Carousel
          showArrows={false}
          showThumbs={false}
          infiniteLoop={true}
          showStatus={false}
          autoPlay={true} // Enable auto-play
          interval={4000} // Set the interval to 4 seconds
          // Add a custom style to adjust the dots position
          style={{ marginBottom: "20px" }} // Adjust the margin-bottom as needed
        >
          {/* Card Carousel */}
          {cardData.map((card, index) => (
            <div key={index} className="bg-white rounded-lg py-6">
              <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-5">
                <h3 className="text-xl text-[#004AAD] font-semibold">
                  {card.title}
                </h3>
                <p className="mt-2">{card.content}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default TipsCarousel;
