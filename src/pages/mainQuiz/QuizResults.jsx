import React from "react";
import ResultsShow from "../../assets/mainquiz/Quizresults.png";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import Pass from "../../assets/sigthted-test/pass.png";
import Fail from "../../assets/sigthted-test/fail.png";

const QuizResults = () => {
  const { finalPercentage } = useParams();

  const generatePDF = () => {
    const doc = new jsPDF();

    // Define styles
    // const titleStyle = { fontSize: 24, textColor: [0, 0, 255] }; // Blue color
    const subtitleStyle = { fontSize: 18 };
    const scoreStyle = { fontSize: 18, textColor: [255, 0, 0] }; // Red color
    const suggestionStyle = { fontSize: 12 };
    const footerStyle = { fontSize: 10, textColor: [128, 128, 128] }; // Gray color

    // Measure the width of the subtitle text
    const subtitleText = "Eyezen Vision Test Results";
    const subtitleWidth =
      (doc.getStringUnitWidth(subtitleText) * subtitleStyle.fontSize) /
      doc.internal.scaleFactor;

    // Calculate the X position to center the subtitle
    const pageWidth = doc.internal.pageSize.width;
    const subtitleX = (pageWidth - subtitleWidth) / 2;

    // Add subtitle centered horizontally
    doc.setTextColor(0); // Reset text color to black
    doc.setFontSize(subtitleStyle.fontSize);
    doc.text(subtitleText, subtitleX, 20);

    // Add score
    doc.setTextColor.apply(doc, scoreStyle.textColor);
    doc.setFontSize(scoreStyle.fontSize);
    doc.text(`Score Obtained: ${finalPercentage}%`, 20, 30);

    // Add suggestions
    doc.setFontSize(suggestionStyle.fontSize);
    doc.text("Vision Condition:", 50, 40);
    if (finalPercentage <= 50) {
      doc.text("Vision seems to be a bit weak", 50, 50);
      doc.text("Recommendation: Meet an ophthalmologist", 50, 60);
    } else {
      // Add other conditions and recommendations as needed
    }

    // Add Disease
    doc.setTextColor.apply(doc, scoreStyle.textColor);
    doc.setFontSize(scoreStyle.fontSize);
    doc.text(`Posiibble Diseases`, 20, 80);

    // Add suggestions
    doc.setFontSize(suggestionStyle.fontSize);
    doc.text("Color Blindness: 85%", 50, 90);
    doc.text("Myopia : 55%", 50, 100);
    doc.text("Macular Degeneration : 25%", 50, 110);
    doc.text("Contrast Sensitivity : 10%", 50, 120);

    // Add footer
    doc.setTextColor.apply(doc, footerStyle.textColor);
    doc.setFontSize(footerStyle.fontSize);
    doc.text("EyeZen Vision Test", 10, 280);

    // Save the PDF or open it in a new tab
    doc.save("Eyezen_vision_test_results.pdf");
  };

  return (
    <div className="mx-auto max-w-2xl mt-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* left pane */}
        <div className="grid grid-rows-4 sm:flex sm:flex-col  xs:flex xs:flex-col">
          <div className="text-5xl font-bold ">Your Results</div>
          <div>
            <h1 className="text-xl text-[#004AAD] mt-5 font-bold">
              Score Obtained : {finalPercentage}%
            </h1>
            <div className="ml-16">
              <h1 className="text-xl mt-5  font-bold">Vision Condition</h1>
              <div className="text-xl mt-5 ml-16 ">
                {finalPercentage <= 100 && finalPercentage >= 90 ? (
                  <ul className="list-disc">
                    <li>
                      Vison is seems
                      <span className="text-green-600 font-bold"> GREAT!</span>
                    </li>
                    <li>
                      Use our eye care section to keep your eyes more healthy
                    </li>
                  </ul>
                ) : finalPercentage < 90 && finalPercentage >= 80 ? (
                  <ul className="list-disc">
                    <li>
                      Vison is seems
                      <span className="text-green-600 font-bold"> GOOD!</span>
                    </li>
                    <li>
                      Use our eyecare section to keep your eyes more healthy.
                    </li>
                    <li>Checkout the possible diseases with tests</li>
                  </ul>
                ) : finalPercentage < 80 && finalPercentage >= 60 ? (
                  <ul className="list-disc">
                    <li>
                      Vison is seems
                      <span className="text-green-600 font-bold"> GOOD!</span>
                    </li>
                    <li>Use our advice section to keep your eye healthy</li>
                    <li> Checkout the possible diseases with tests</li>
                  </ul>
                ) : finalPercentage < 60 && finalPercentage >= 50 ? (
                  <ul className="list-disc">
                    <li>
                      Vison is seems a
                      <span className="text-red-600 font-bold">
                        {" "}
                        bit WORSE!
                      </span>
                    </li>
                    <li>Recommend to meet a Ophthalmologist</li>
                    <li> Checkout the possible diseases with tests</li>
                  </ul>
                ) : (
                  <ul className="list-disc">
                    <li>
                      Vison is seems
                      <span className="text-red-600 font-bold"> WORSE!</span>
                    </li>
                    <li>Highly Recommend to meet a Ophthalmologist</li>
                    <li> Checkout the possible diseases with tests</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl mt-5  font-bold">Possible 4 Diseases</h1>
            <div className="text-red-600 ml-32 mt-5 font-bold">
              <ul>
                <Link to={"/color-blind"}>
                  <li>Color Blind : 85%</li>
                </Link>
                <Link to={"/near-sighted"}>
                  <li>Myopia : 55%</li>
                </Link>
                <Link to={"/macular-degeneration"}>
                  <li>Maculart Degeneration : 25%</li>
                </Link>
                <Link to={"/contrast-sensitvity"}>
                  <li>Contrast Sensitivity : 10%</li>
                </Link>
              </ul>
              <p className="mt-5 text-black">
                Click on the disease to confirm with a test
              </p>
            </div>
          </div>
          <div className="grid grid-rows-2 mt-10">
            <div className="flex justify-center space-x-8 mb-10">
              <Link to="/">
                <Button btnName="Back To Home" />
              </Link>
              <Button
                btnName="Print Results"
                color="black"
                onClick={generatePDF}
              />
            </div>
            <div className="flex justify-center">
              <Link to={"/doctorContact/doctorList"}>
                <Button btnName="Book an Appoinment" />
              </Link>
            </div>
          </div>
        </div>
        {/* right pane */}
        <div className="flex justify-center ">
          {finalPercentage > 50 ? (
            <img src={Pass} alt="passed test" className="lg:max-h-[672px]" />
          ) : (
            <img src={Fail} alt="failed test" className="lg:max-h-[672px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
