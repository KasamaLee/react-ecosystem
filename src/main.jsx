import React, { createContext, useContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


const AuthContext = createContext();

function AuthContextProvider({children}) {

  const [isAuth, setIsAuth] = useState(true);
  const handleAuth = () => setIsAuth(!isAuth);

  const sharedObj = {
    handleAuth,
    isAuth,
  }

  return <AuthContext.Provider value={sharedObj}>{children}</AuthContext.Provider>
}


function App() {

  const {handleAuth, isAuth} = useContext(AuthContext);

  return (
    <div className='App'>
      <h1>Welcome.. {!isAuth ? "Guest" : "User"}</h1>
      <button onClick={handleAuth}>{!isAuth ? "Login" : "Logout"}</button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)
