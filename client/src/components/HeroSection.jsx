import React from "react";
import Button from "./button/Button";

const HeroSection = () => {
  return (
    <div className="">
      <div className="h-[100vh] flex items-center justify-center overflow-hidden">
        <img
          src="assets/images/bg/hero-bg.jpg"
          alt="webEase-hero-image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="h-full pt-16 flex flex-col-reverse xl:flex-row items-center justify-start xl:max-w-[1140px] 2xl:max-w-[1440px] z-10">
          <div className="w-3/4 md:w-2/3 flex flex-col items-start">
            <h1 className="font-platypi text-3xl md:text-8xl 2xl:text-[8rem] text-white font-bold pb-4 2xl:pb-8">
              Unveil Your Unique Beauty
            </h1>
            <h1 className="md:text-lg 2xl:text-2xl text-white font-base pb-8 pr-8 2xl:pb-8">
              Explore our vibrant collection of artisanal beauty products and
              find the perfect touch of elegance for your routine.
            </h1>
            <Button
              btnText="Get Started"
              border="2px solid"
              borderColor="#ffffff"
              backgroundColor="transparent"
              fontColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
