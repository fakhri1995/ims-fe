import React from "react";

const WelcomeSection = () => {
  return (
    <div className="hidden md:block md:relative md:h-full md:w-1/2">
      <img
        className="w-full h-full object-cover"
        src={`/image/cover.png`}
        alt=""
      ></img>
      <div
        className="absolute top-0 left-0 w-full h-full bg-[#1C3B67CC] 
            flex flex-col items-center justify-center opacity-80 text-white"
      >
        <div className="p-10 md:p-20 ">
          <h1 className="text-3xl text-white font-medium pb-3 mb-4 border-b-2">
            Welcome to <strong>MIG</strong>
          </h1>
          <p>
            Bringing the advantages to you! At MIG, we’re all about doing
            awesome things together and taking on any challenge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
