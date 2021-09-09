import StormDB from "stormdb";

const useDB = () => {
  const engine = new StormDB.browserEngine("up");
  const db = new StormDB(engine);

  return {
    db,
  };
};

export { useDB };
