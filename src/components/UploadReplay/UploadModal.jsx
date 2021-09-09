import React from "react";
import { Modal } from "../Modal/Modal";

const UploadModal = ({ modalOpen, toggleModal }) => {
  return (
    <Modal modalOpen={modalOpen} toggleModal={toggleModal}>
      <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg w-full">
        <svg
          className="text-indigo-500 w-24 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <div className="input_field flex flex-col w-max mx-auto text-center">
          <div className="title text-indigo-500 uppercase">
            Upload to ballchasing
          </div>
          You will be able to add the file change the visibility of the replay
        </div>
      </div>
    </Modal>
  );
};

export { UploadModal };
