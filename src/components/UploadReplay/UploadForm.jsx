import React from "react";
import { useEffect } from "react/cjs/react.development";
import { useReplays } from "../../context/Replays/ReplaysContext";
import { useFetch } from "../../hooks/useFetch";
import { Modal } from "../Modal/Modal";

const UploadForm = ({ modalOpen, toggleModal, file }) => {
  const { post, isResolved, data } = useFetch();
  const {
    get,
    isResolved: retrieveReplayData,
    data: replayData,
    resetFetchState,
  } = useFetch();
  const { lastGames, setLastGames, comparedGames, setComparedGames } =
    useReplays();

  const sendFile = () => {
    const formData = new FormData();
    formData.append("file", file);
    post("/v2/upload", {
      body: formData,
    });
  };

  useEffect(() => {
    if (isResolved) {
      const id = data.id;
      setTimeout(() => {
        get(`/replays/${id}`);
      }, 5000);
    }
  }, [data?.id, get, isResolved]);

  useEffect(() => {
    if (retrieveReplayData) {
      const replaysData = lastGames;
      const comparedReplays = comparedGames;
      const lastReplay = replaysData.shift();
      comparedReplays.shift();
      comparedReplays.push(lastReplay);
      replaysData.push(replayData);
      setLastGames([...replaysData]);
      setComparedGames([...comparedReplays]);
      resetFetchState();
    }
  }, [
    comparedGames,
    lastGames,
    replayData,
    resetFetchState,
    retrieveReplayData,
    setComparedGames,
    setLastGames,
  ]);

  return (
    <Modal modalOpen={modalOpen} toggleModal={toggleModal}>
      <div className="p-2 bg-white border-b border-gray-200 rounded-bl-lg rounded-br-lg">
        {file?.name}
      </div>
      <div className="flex flex-col py-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-gray-600"
            defaultChecked
            name="visibility"
          />
          <span className="ml-2 text-gray-700">
            <b>Public</b>: visible to everyone, even not logged-in users
          </span>
        </label>
        <label className="inline-flex items-center mt-3">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-orange-600"
            name="visibility"
          />
          <span className="ml-2 text-gray-700">
            <b>Unlisted</b>: only you and the people with the link to the replay
            can view it. Doesn't appear in the replays list page (except for
            you)
          </span>
        </label>
        <label className="inline-flex items-center mt-3">
          <input
            type="radio"
            name="visibility"
            className="form-radio h-5 w-5 text-orange-600"
          />
          <span className="ml-2 text-gray-700">
            <b>Private</b>: only you can view the replay. Doesn't appear in the
            replays list page or anywhere else (except for you)
          </span>
        </label>
      </div>
      <div className="flex justify-end flex-row gap-2 items-center p-2 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
        <button
          className="font-semibold text-gray-60 px-4 py-2 hover:underline"
          onClick={toggleModal}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
          onClick={() => {
            sendFile();
            toggleModal();
          }}
        >
          Upload
        </button>
      </div>
    </Modal>
  );
};

export { UploadForm };
