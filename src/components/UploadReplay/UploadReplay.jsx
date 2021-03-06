import React, { useRef, useState, useEffect } from "react";
import { UploadForm } from "./UploadForm";
import { UploadModal } from "./UploadModal";

const UploadReplay = ({ children }) => {
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [currentFile, setCurrentFile] = useState();
  const [isFromAutoUpload, setIsFromAutoUpload] = useState(false);

  var lastTarget = useRef(null);

  function isFile(evt) {
    var dt = evt.dataTransfer;

    for (var i = 0; i < dt.types.length; i++) {
      if (dt.types[i] === "Files") {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    window.addEventListener("dragenter", function (e) {
      if (isFile(e)) {
        lastTarget.current = e.target;
        setShowModalUpload(true);
      }
    });

    window.addEventListener("dragleave", function (e) {
      e.preventDefault();
      if (e.target === document || e.target === lastTarget.current) {
        setShowModalUpload(false);
      }
    });

    window.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    window.addEventListener("drop", function (e) {
      e.preventDefault();
      setIsFromAutoUpload(false);
      if (e.dataTransfer.files.length === 1) {
        setCurrentFile(e.dataTransfer.files[0]);
        setShowFormModal(true);
        setShowModalUpload(false);
      }
    });

    window.electron.on("fileFound", (event, arg) => {
      const { file, fileName } = arg;
      const fileToPost = new File([new Blob([new Uint8Array(file)])], fileName);
      if (currentFile?.name !== fileName) {
        setCurrentFile(fileToPost);
        setIsFromAutoUpload(true);
      }
    });
  }, [currentFile?.name]);

  return (
    <>
      <UploadModal modalOpen={showModalUpload} />
      <UploadForm
        modalOpen={showFormModal}
        toggleModal={() => setShowFormModal(false)}
        file={currentFile}
        isFromAutoUpload={isFromAutoUpload}
        setIsFromAutoUpload={setIsFromAutoUpload}
      />
      {children}
    </>
  );
};

export { UploadReplay };
