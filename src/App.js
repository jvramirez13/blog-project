import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeNoLog from "./HomeNoLog.js";
import HomeLog from "./HomeLog.js";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import "./App.css";
import { AuthProvider } from "./Auth.js";
import LoginEx from "./LoginEx.js";
import About from "./About.js";
import fire from "./firebase.js";

fire
  .firestore()
  .collection("blogs")
  .doc("Sample Blog Post")
  .set({
    title: "Sample blog post",
    post:
      "This blog post shows a few different types of content that are supported and styled with Material styles. Basic typography, images, and code are all supported. You can extend these by modifying Markdown.js. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
    comments: {}
  });

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
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/loginex" component={LoginEx} />
          <Route exact path="/about" component={About} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
