import React, { useRef, useState, useEffect } from "react";
import { UploadForm } from "./UploadForm";
import { UploadModal } from "./UploadModal";

const UploadReplay = ({ children }) => {
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [file, setFile] = useState();

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
      if (e.dataTransfer.files.length === 1) {
        setFile(e.dataTransfer.files[0]);
        setShowFormModal(true);
        setShowModalUpload(false);
      }
    });
  }, []);

  return (
    <>
      <UploadModal modalOpen={showModalUpload} />
      <UploadForm
        modalOpen={showFormModal}
        toggleModal={() => setShowFormModal(false)}
        file={file}
      />
      {children}
    </>
  );
};

export { UploadReplay };
