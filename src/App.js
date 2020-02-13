import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeNoLog from "./HomeNoLog.js";
import HomeLog from "./HomeLog.js";
import SignUp from "./SignUp.js";
import "./App.css";
import { AuthProvider } from "./Auth.js";
import LoginEx from "./LoginEx.js";

function App() {
  return (
    //AuthProvider component so that everything below it
    //will have access to current user through context API

    //This sets up the page router so we can
    //determine what path calls what component
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={HomeNoLog} />
          <Route exact path="/HomeLog" component={HomeLog} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/loginex" component={LoginEx} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
