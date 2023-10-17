import React from "react";
import Kids from "../../assets/games/kids with computer.jpg";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import ColorBlind from "../../assets/eyetests/Ishihara_09.png";
import ColorMatch from "../../assets/eyetests/color match.png";
import Contrast from "../../assets/eyetests/contrast .png";

const games = [
  {
    imageSource: ColorBlind,
    altText: "color blind",
    title: "Color Vision Game",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.....",
    highestScore: 4200,
    path: "/color-vision-game",
  },
  {
    imageSource: ColorMatch,
    altText: "Color Match",
    title: "Color Match Game",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.....",
    highestScore: 4200,
    path: "/color",
  },
  {
    imageSource: Contrast,
    altText: "Color Cubes",
    title: "Color Cubes Game",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.....",
    highestScore: 4200,
    path: "/color",
  },
];

const GameHome = () => {
  return (
    <div className="mx-auto max-w-2xl mt-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
      <div className="grid lg:grid-cols-2 mb-20">
        <div>
          <div className="grid grid-rows-2">
            <div className="font-bold text-5xl">
              Games for <span className="text-[#004AAD]">Kids</span>
            </div>
            <div>
              <h1 className="text-lg font-bold mt-5">In this section...</h1>
            </div>
            <div className="mt-2 text-lg max-w-[550px] ">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has
              </p>
            </div>
            <Link to={"/color-vision-game"}>
              <div className="mt-5 flex justify-center">
                <Button btnName="Explore" className="rounded-lg" />
              </div>
            </Link>
          </div>
        </div>
        <div>
          <img
            src={Kids}
            alt="Kids working on one computer"
            className="max-h-[300px] mt-5"
          />
        </div>
      </div>
      <div className="grid grid-rows-3 gap-8 max-w-[66rem] mb-16">
        {games.map((value, index) => (
          <Link to={value.path}>
            <div
              key={index}
              className="grid grid-cols-6 bg-[#EAEAEA] shadow-lg rounded-lg"
            >
              <div className="w-[250px] h-auto flex items-center justify-center">
                <img src={value.imageSource} alt={value.altText} />
              </div>
              <div></div>
              <div className="grid grid-rows-3 col-span-4">
                <div className="flex justify-start items-center text-2xl font-bold">
                  {value.title}
                </div>
                <div className="flex justify-center ">{value.description}</div>
                <div className="flex justify-end p-5 font-bold font-xl">
                  Highest Score: {value.highestScore}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameHome;
