export const getReplaysData = ({
  data,
  setIsFirstLoading,
  getReplayData,
  DBSet,
  DBSave,
  limiter,
}) => {
  const games = data?.list.splice(0, 10);
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
}) => {
  const indexOfReplay = replaysData.findIndex(
    (replay) => replay.id === replayData.id
  );
  if (indexOfReplay === -1) {
    replaysData.push(replayData);
  }
  DBSet("replaysDatas", replaysData);
  DBSave();
};
