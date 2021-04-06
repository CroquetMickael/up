import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import StormDb from "stormdb";

function App() {
  const { get, data, hasError, httpCode, isResolved } = useFetch();

  useEffect(() => {
    get("/api/");
  }, [get]);

  useEffect(() => {
    const engine = new StormDb.browserEngine("up");
    const db = new StormDb(engine);
    if (isResolved) {
      if (!db.get("user").value()) {
        db.set("user", {
          name: data.name,
          id: data.steam_id,
        }).save();
        console.log("saved");
      }
      console.log(data);
      console.log(httpCode);
    }
    if (hasError) {
      console.log("error", httpCode);
    }
  }, [data, hasError, httpCode, isResolved]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Toto <code>src/App.jsx</code> and save to reload with viteJS.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
