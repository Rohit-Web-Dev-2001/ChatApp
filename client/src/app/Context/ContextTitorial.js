import { createContext, useReducer } from "react";

instialState = {};
if (typeof window !== "undefined" && window) {
  initialState = JSON.parse(localStorage.getItem("chat-user"));
} else {
  initialState = {};
}
export const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "LOGOUT":
      localStorage.removeItem("chat-user");
      return {};
    case "LOGIN":
      const initialState2 = { ...action.payload };

      localStorage.setItem("chat-user", JSON.stringify(initialState2));

      return initialState2;

    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, instialState); // dispatch and state
  return (
    <AuthContext.Provider value={{ AuthData: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
