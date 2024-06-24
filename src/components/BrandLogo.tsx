import React from "react";

const BrandLogo = ({ isUseText = true }) => {
  return (
    <div className="logo flex items-center justify-center">
      <img
        src="/image/Brand.png"
        alt="brand"
        className={`object-contain w-12 h-12 ${isUseText && "mr-0"}`}
      />
      {isUseText && (
        <h1 className="text-2xl mb-0 w-24 text-center text-mono30">
          <span className="font-black mb-0">MIG</span>hty
        </h1>
      )}
    </div>
  );
};

export default BrandLogo;
