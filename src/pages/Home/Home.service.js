export const getReplaysData = ({
  data,
  setIsFirstLoading,
  getReplayData,
  DBSet,
  DBSave,
  limiter,
}) => {
  const games = data?.list.splice(0, 20);
  const ids = games.map((game) => game.id);
  DBSet("gamesId", ids);
  DBSave();
  setIsFirstLoading(false);
  ids.forEach((id) => {
    limiter.schedule(() => getReplayData(`/replays/${id}`));
  });
};

export const UpdateReplaysData = ({
  replaysData,
  replayData,
  DBSet,
  DBSave,
  comparedReplays,
  gamesId,
}) => {
  if (replaysData.length === 10) {
    const indexOfComparedReplay = comparedReplays.findIndex(
      (replay) => replay.id === replayData.id
    );
    const notInReplay = replaysData.findIndex(
      (replay) => replay.id === replayData.id
    );
    if (indexOfComparedReplay === -1 && notInReplay === -1) {
      comparedReplays.push(replayData);
    }
    DBSet("comparedReplays", comparedReplays);
  } else {
    const indexOfReplay = replaysData.findIndex(
      (replay) => replay.id === replayData.id
    );
    if (indexOfReplay === -1) {
      replaysData.push(replayData);
    }
    DBSet("lastReplays", replaysData);
  }
  DBSave();
};
