import { useMemo } from "react";
import StormDB from "stormdb";

const useDB = () => {
  const engine = useMemo(() => new StormDB.browserEngine("up"), []);
  const db = useMemo(() => new StormDB(engine), [engine]);
  return {
    DBSet: (key, value) => db.set(key, value),
    DBSetValue: (value, pointers, setRecursively) =>
      db.setValue(value, pointers, setRecursively),
    DBSave: () => db.save(),
    DBGet: (value) => db.get(value),
    DBDelete: (reindexLists) => db.delete(reindexLists),
  };
};

export { useDB };
