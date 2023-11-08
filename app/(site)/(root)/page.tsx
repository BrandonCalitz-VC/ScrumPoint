/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import imgLogo from "@/public/logo.png";
import imgProfile from "@/public/profileImg.png";
import imgRugbyPlayer from "@/public/RugbyPlayer2.png";
import backgroundImage from "@/public/bg.png";
import HomeMatch from "@/app/components/auth/HomeMatch";
import SAFlag from "@/public/SAFlag.png";
import EngFlag from "@/public/ENGFlag.png";
import { Sacramento } from "next/font/google";

const App = () => {
  const [activeButton, setActiveButton] = useState("");

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
  };

  const linkStyle = {
    flex: 1,
    textAlign: "center" as const,
    cursor: "pointer",
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const buttonStyle = (name: string) => {
    return {
      ...linkStyle,
      color: activeButton === name ? "white" : "black",
      backgroundColor: activeButton === name ? "#2A87F5" : "white",
      height: "100%",
      fontWeight: "bold", // Make the text bold
    };
  };

  return (
    <div
      className="app-container"
      style={{
        ...backgroundStyle,
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingTop: "10vh",
      }}
    >
      {/* Top Bar */}
      <div
        className="top-bar"
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          borderRadius: "15px",
        }}
      >
        <div className="left-image">
          <Image className="ml-10 mr-10" src={imgLogo} alt="logo" height={80} />
        </div>
        <div
          className="tabs w-full h-full"
          style={{ display: "flex", gap: "20px", flex: 1 }}
        >
          {/* Insert your tab components here */}
          <div
            className="w-full h-full hover:bg-blue-400 p-20 text-center font-bold"
            onClick={() => handleButtonClick("Matches")}
          >
            Matches
          </div>
          <div
            className="w-full h-full hover:bg-blue-400 p-20 text-center font-bold"
            onClick={() => handleButtonClick("Pools")}
          >
            Pools
          </div>
          <div
            className="w-full h-full hover:bg-blue-400 p-20 text-center font-bold"
            onClick={() => handleButtonClick("Knockout")}
          >
            Knockout
          </div>
          <div
            className="w-full h-full hover:bg-blue-400 p-20 text-center font-bold"
            onClick={() => handleButtonClick("Predictions")}
          >
            Predictions
          </div>
        </div>
        <div className="right-image">
          <button>
            <Image
              className="ml-10 mr-10"
              src={imgProfile}
              alt="profilePic"
              height={60}
            />
          </button>
        </div>
      </div>

      {/* Second Box */}
      <div
        className="second-box"
        style={{
          backgroundColor: "white",
          marginTop: "20px",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
        }}
      >
        <div className="player-image" style={{ flex: 1 }}>
          <img
            src={imgRugbyPlayer.src}
            alt="rugbyPlayer2"
            className="main-image"
            style={{ width: "100%" }}
          />
        </div>
        <div
          className="matches-section"
          style={{
            flex: 2,
            paddingLeft: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Place to insert upcoming and upcoming matches */}
          <div className="Upcoming Matches" style={{ textAlign: "center" }}>
            <h2 className="text-4xl"> Upcoming Matches</h2>
            <HomeMatch
              homeTeam="RSA"
              homeScore={0}
              homeFlag={SAFlag.src}
              awayFlag={EngFlag.src}
              awayScore={0}
              awayTeam=""
            />
          </div>
          <div className="Previous Matches" style={{ textAlign: "center" }}>
            <h2 className="text-4xl"> Previous Matches</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
