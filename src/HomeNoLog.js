import React from "react";
import { Link } from "react-router-dom";
import fire from "./firebase.js";

const Home = () => {
  return (
    <div>
      <h1>Perfect Sense Blog</h1>
      <Link to="/loginex" onClick={() => fire.auth().signOut()}>
        Log In
      </Link>
      <h2>This is a non private page</h2>
    </div>
  );
};

export default Home;
