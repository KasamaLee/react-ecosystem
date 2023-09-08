import React, { createContext, useContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Context 
// 1. createContext [Provider, Consumer] => ชื่อ Context
const ThemeContext = createContext();

// A1. สร้าง HOC : Higher Order Component [Provider]
// HOC คือ FC ที่รับ Component เข้าไปและ return Component ใหม่ออกมา

// function ThemeContextProvider(props) {
//   return <div>Hi {props.children}</div>
// }
// function ThemeContextProvider(props) {
//   return <ThemeContext.Provider>Hi {props.children}</ThemeContext.Provider>
// }

/*
A2. Share 
==> Data (state, boolean, string, object, array, etc.)
==> Logic (Fn ที่มช้ handle ต่างๆ)
*/

// Data : isDarkMode, styleObj
// Logic : setIsDrakMode, handleToggleTheme
function ThemeContextProvider(props) {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const stylesObj = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    color: isDarkMode ? 'white' : 'black',
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // ของที่จะแชร์ (ของกลาง)
  const sharedObj = {
    theme: stylesObj,
    toggleTheme: handleToggleTheme
  };
  return <ThemeContext.Provider value={sharedObj}> {props.children} </ThemeContext.Provider>
}

// A3. นำ Provider ไปครอบ children [Provider]
// <ThemeContextProvider>
//   <App />
// </ThemeContextProvider>

/*
#### B1 : @Children Component ดึงค่า Shared Object ผ่านตัว useContext
SYNTAX : useContext(ContextName)

ex.
const sharedObj = {}
*/


// UI
function App() {
  // รับของกลางมา
  const s = useContext(ThemeContext);

  return (
    <div className='App' style={s.theme} >
      <h1>Theme App</h1>
      <button onClick={s.toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// 3. นำ Provider ไปครอบ children
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
);
