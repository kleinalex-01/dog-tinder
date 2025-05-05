import React, {useState, useEffect} from "react"
import axios from "axios";
import './App.css';
import Header from './Components/Header';
function App() {
  const [data, setData] = useState([])
  const [dataIndex, setDataIndex] = useState(0)

  function swipe() {
    setDataIndex(prev => prev + 1)
  }

  useEffect(() => {
    axios.get("/data.json")
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error(`An error occured getting the JSON: ${err}`)
      })
  }, [])

  const dog = data[dataIndex];

  if (!dog) return <p>Loading...</p>

  return (
    <>
      <Header />
      <div className='content-container'>
          <div className='card-container' style={{ backgroundImage: `url(${dog.picture})`,
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center",
                                                  backgroundRepeat: "no-repeat"
                                                    }}>
              <h1 className="username">{dog.name}, {dog.age}</h1>
              <p className="userBio">{dog.bio}</p>
          </div>
        <div className='hit-or-miss-container'>
          <button className='hit-or-miss-btn' onClick={swipe}><img src='../Images/miss.png' alt='miss button' className='hit-or-miss-icon'/></button>
          <button className='hit-or-miss-btn' onClick={swipe}><img src='../Images/hit.png' alt='hit button' className='hit-or-miss-icon'/></button>
        </div>
      </div>
    </>
  )
}

export default App;
