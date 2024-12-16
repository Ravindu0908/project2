import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Aboutus = () => {
  return (
    <div>
        <Navbar />
      <div className="flex flex-col items-center justify-center h-[100vh] bg-pink-700 pt-[100px]">
        <h1 className="text-6xl font-bold text-white">Who We Are?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1140px] m-8">
          <div>
            <img
              src="/assets/images/bg/bg.png"
              alt=""
              className="rounded-l-xl"
            />
          </div>
          <div>
            <p className="text-base text-pink-100 text-justify">
              At Unveil Your Unique Beauty, we believe that everyone deserves to
              feel elegant and confident. Our curated collection of artisanal
              beauty products is crafted with care and passion, ensuring each
              item is a perfect blend of quality and artistry. From luxurious
              skincare to exquisite makeup, our offerings are designed to
              enhance your natural beauty and bring a touch of sophistication to
              your daily routine. Join us in celebrating individuality and
              elegance with products that are as unique as you are. At Unveil
              Your Unique Beauty, we believe that everyone deserves to feel
              elegant and confident. Our curated collection of artisanal beauty
              products is crafted with care and passion, ensuring each item is a
              perfect blend of quality and artistry. From luxurious skincare to
              exquisite makeup, our offerings are designed to enhance your
              natural beauty and bring a touch of sophistication to your daily
              routine. Join us in celebrating individuality and elegance with
              products that are as unique as you are.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
