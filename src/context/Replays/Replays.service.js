export const getReplaysData = ({
  data,
  setIsFirstLoading,
  getReplayData,
  setGamesIds,
  limiter,
}) => {
  const games = data?.list.splice(0, 20);
  const ids = games.map((game) => game.id);
  setGamesIds(ids);
  setIsFirstLoading(false);
  ids.forEach((id) => {
    limiter.schedule(() => getReplayData(`/replays/${id}`));
  });
};

export const UpdateReplaysData = ({ replayData, replays, comparedReplays }) => {
  if (replays.length === 10) {
    const indexOfComparedReplay = comparedReplays.findIndex(
      (replay) => replay.id === replayData.id
    );
    const notInReplay = replays.findIndex(
      (replay) => replay.id === replayData.id
    );
    if (indexOfComparedReplay === -1 && notInReplay === -1) {
      comparedReplays.push(replayData);
    }
  } else {
    const indexOfReplay = replays.findIndex(
      (replay) => replay.id === replayData.id
    );
    if (indexOfReplay === -1) {
      replays.push(replayData);
    }
  }
};
