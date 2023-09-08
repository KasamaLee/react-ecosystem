import React, { createContext, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios';
import './index.css'


const AuthContext = createContext();

function AuthContextProvider({ children }) {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ name: 'Guest' });

  // isAuth : false => true ให้ delay 1 วินาที


  // const handleAuth = () => {
  //   // เมื่อ Login เข้ามา : isAuth : false => true

  //   if (!isAuth) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000)

  //   } else {
  //     setIsAuth(false);
  //   }
  // }

  const handleAuth = async () => {
    // Login => Logout
    if (isAuth) {
      setIsAuth(false);
      setUser({ name: 'Guest' })
      return;
    }

    // Logout => Login
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
      console.log(response.data);
      setUser(response.data);
      setIsAuth(true)
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    }
  };

  const sharedObj = {
    handleAuth,
    isAuth,
    isLoading,
    user,
  }
  return <AuthContext.Provider value={sharedObj}>{children}</AuthContext.Provider>
}


function App() {

  const { handleAuth, isAuth, isLoading, user } = useContext(AuthContext);

  return (
    <div className='App'>
      {isLoading ? <h1>Loading...</h1> : <h1>Welcome.. {!isAuth ? "Guest" : user?.name}</h1>}
      <button onClick={handleAuth} disabled={isLoading}>
        {!isAuth ? "Login" : "Logout"}
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)
