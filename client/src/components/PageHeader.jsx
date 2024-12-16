import React from "react";

const PageHeader = ({title}) => {
  return (
    <div>
      <div className="flex justify-center items-center p-8 bg-pink-500 h-[60vh] pt-[100px]">
        <h1 className="max-w-[1200px] font-platypi text-3xl md:text-6xl  text-white font-bold pb-4 2xl:pb-8 text-center relative before:content-[''] before:absolute before:bg-pink-300 before:w-[200px] before:h-1  before:-bottom-4 before:left-1/2 before:transform before:-translate-x-1/2">
         {title}
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;
