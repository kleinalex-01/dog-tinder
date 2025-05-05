import React, {useState, useEffect} from "react"
import './App.css';
import Header from './Components/Header';
function App() {
  const [data, setData] = useState([]);
  return (
    <>
      <Header />
      <div className='content-container'>
        <div className='card-container'>
          <h1 className="username">name, age</h1>
          <p className="userBio">bio</p>
        </div>
          <div className='hit-or-miss-container'>
            <button className='hit-or-miss-btn'><img src='../Images/miss.png' alt='miss button' className='hit-or-miss-icon'/></button>
            <button className='hit-or-miss-btn'><img src='../Images/hit.png' alt='hit button' className='hit-or-miss-icon'/></button>
          </div>
      </div>
    </>
  )
}

export default App;
