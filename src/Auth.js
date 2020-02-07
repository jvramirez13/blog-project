import React, { useEffect, useState } from "react";
import fire from "./firebase.js";

//This allows us to propagate data throughout
//the whole React component tree
export const AuthContext = React.createContext();

//Provider component that will hold the authentication   state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  //We pass an empty array so that it will run only once
  //when AuthProvider is mounted to the React tree
  useEffect(() => {
    fire.auth().onAuthStateChanged(setCurrentUser);
  }, []);
 
  return (
      //we pass current user to firebase
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
 