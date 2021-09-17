import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReplays } from "../../context/Replays/ReplaysContext";
import { useQueue } from "../../hooks/useQueue";
import { useFetch } from "../../hooks/useFetch";
import { Modal } from "../Modal/Modal";
import { UploadList } from "./UploadList";
import { useNotification } from "../../context/Notification/NotificationContext";


const UploadForm = ({ modalOpen, toggleModal, file }) => {
  const [visibility, setVisibility] = useState("public");
  const { post, isResolved, data, resetFetchState: resetPost, hasError, httpCode } = useFetch();
  const ThirtySeconds = 30000;
  let retries = useRef({ id: "", retryCount: 0 });
  const {
    get,
    isResolved: retrieveReplayData,
    isLoading: loadingReplayData,
    data: replayData,
    resetFetchState,
  } = useFetch();
  const { lastGames, setLastGames, comparedGames, setComparedGames } = useReplays();
  const { enqueue, dequeue, peek, isEmpty, elements } = useQueue();
  const { addNewAlert } = useNotification();

  let getTimeout = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getWithTimeout = (id) => {
    resetFetchState();
    getTimeout.current = setTimeout(() => {
      get(`/replays/${id}`);
      retries.current.retryCount += 1;
    }, ThirtySeconds)
  };

  const updateReplaysData = useCallback(() => {
    const replaysData = lastGames;
    const comparedReplays = comparedGames;
    const lastReplay = replaysData.shift();
    comparedReplays.shift();
    comparedReplays.push(lastReplay);
    replaysData.push(replayData);
    setLastGames([...replaysData]);
    setComparedGames([...comparedReplays]);
    dequeue();
    clearTimeout(getTimeout.current);
    getTimeout.current = null;
    if (elements.length >= 1) {
      const { id: newReplayId } = peek() || "";
      retries.current.retryCount = 0;
      retries.current.id = newReplayId;
      getWithTimeout(newReplayId)
    } else {
      resetFetchState();
    }
  }, [comparedGames, dequeue, elements.length, getWithTimeout, lastGames, peek, replayData, resetFetchState, setComparedGames, setLastGames])

  const sendFile = () => {
    const formData = new FormData();
    formData.append("file", file);
    post(`/v2/upload?visibility=${visibility}`, {
      body: formData,
    });
  };

  useEffect(() => {
    if (isResolved) {
      addNewAlert({ type: "success", message: `Upload complete : ${file.name}` });
      const id = data?.id;
      enqueue({ name: file.name, id });
      if (getTimeout.current === null) {
        retries.current.id = id;
        getWithTimeout(id);
      }
      resetPost();
    }

    if (hasError) {
      if (httpCode === 409) {
        addNewAlert({ type: "error", message: `Replay already exist : ${file.name}`, title: "Upload in error" });
      } else if (httpCode === 400) {
        addNewAlert({ type: "error", message: `Please check if it's a replay file : ${file.name}`, title: "Upload in error" });
      } else {
        addNewAlert({ type: "error", message: `Something went wrong with ballchasing`, title: "Upload in error" });
      }
      resetPost();
    }
  }, [addNewAlert, data?.id, enqueue, file?.name, get, getWithTimeout, hasError, httpCode, isResolved, loadingReplayData, resetPost]);

  useEffect(() => {
    if (!isEmpty() || retrieveReplayData) {
      const { id: currentId } = peek() || "";
      if (retrieveReplayData && replayData.status === "ok") {
        updateReplaysData();
      } else if (retrieveReplayData && retries.current.retryCount <= 9) {
        clearTimeout(getTimeout.current);
        getWithTimeout(currentId);
      } else if (retrieveReplayData && retries.current.retryCount > 9) {
        const failedReplay = peek();
        if (elements.length > 1) {
          dequeue();
          enqueue({ name: failedReplay.name, id: failedReplay.id });
          const { id: newCurrentId } = peek();
          retries.current.retryCount = 0;
          retries.current.id = newCurrentId;
          clearTimeout(getTimeout.current);
          getWithTimeout(newCurrentId);
        }
        retries.current.retryCount = 0;
        clearTimeout(getTimeout.current);
        getWithTimeout(failedReplay.id);
      }
    }
  }, [dequeue, elements.length, enqueue, get, getWithTimeout, isEmpty, peek, replayData?.status, resetFetchState, retrieveReplayData, updateReplaysData])

  return (
    <>
      <UploadList retries={retries.current} elements={elements} />
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
              value="public"
              onChange={(e) => setVisibility(e.target.value)}
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
              value="unlisted"
              onChange={(e) => setVisibility(e.target.value)}
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
              value="private"
              onChange={(e) => setVisibility(e.target.value)}
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
    </>
  );
};

export { UploadForm };
