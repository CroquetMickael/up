import React from "react";

const Modal = ({ children, modalOpen, toggleModal }) => (
  <div
    className={`fixed transition-all duration-100 ${
      modalOpen ? "opacity-100 z-40" : "opacity-0 -z-1"
    } w-full h-full pin flex items-center`}
  >
    <div
      className={`absolute h-full w-full pin bg-black ease-out transition-all duration-500 ${
        modalOpen ? "opacity-75" : "opacity-0 "
      }`}
      onClick={toggleModal}
    />
    <div
      className={`relative ease-out transition-all duration-500 ${
        modalOpen ? "top-0" : "top-full"
      } mx-6 md:mx-auto w-full md:w-1/2 lg:w-1/3 z-20 m-8`}
    >
      <div className="extraOutline p-4 bg-white  m-auto rounded-lg">
        {children}
      </div>
    </div>
  </div>
);

export { Modal };
