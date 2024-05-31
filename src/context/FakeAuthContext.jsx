import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext(null);

const init = {
  user: null,
  isAuther: false,
};
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function reduce(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuther: true };
    case "logout":
      return { ...state, user: null, isAuther: false };
    default:
      throw new Error("error");
  }
}
function FakeAuthContext({ children }) {
  const [state, dispatch] = useReducer(reduce, init);
  const { user, isAuther } = state;
  function login(email, password) {
    // console.log(email, password);
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function loginout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuther, loginout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  //   console.log(context);
  if (context === undefined) throw new Error("no to find anth");
  return context;
}

export { FakeAuthContext, useAuth };
