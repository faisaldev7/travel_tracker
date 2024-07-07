import {createContext, useContext, useReducer} from "react"

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticate: false
}

function reducer(state, action){
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticate: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticate: false
      };
    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({children}){
  const [{user, isAuthenticate}, dispatch] = useReducer(reducer, initialState)


  function login(email, password){
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({type: 'login', payload: FAKE_USER})
  }

  function logout(){
    dispatch({type: 'logout'})
  }

  return <AuthContext.Provider value={{user, isAuthenticate, login, logout}}>{children}</AuthContext.Provider>
}

function useAuth(){
  const context = useContext(AuthContext)
  return context;
}
export {AuthProvider, useAuth}
