import React from "react";
import fire from "./firebase.js";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Perfect Sense Blog</h1>
      <h2>Current User: {fire.auth().currentUser.uid}</h2>
      <Link to="/" onClick={() => fire.auth().signOut()}>
        Sign out
      </Link>
      <h2>This is the private one</h2>
    </div>
  );
};

export default Home;
