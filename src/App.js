import React, {useState, useEffect, useRef} from "react"
import axios from "axios";
import './App.css';
import Header from './Components/Header';
import { motion, useAnimation, useMotionValue, useScroll, useTransform } from "motion/react";
function App() {
  const [dogPics, setDogPics] = useState([])
  const [nextPic, setNextPic] = useState(false)
  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  useEffect(() => {
    axios.get("https://dog.ceo/api/breeds/image/random")
      .then(res => {
        setDogPics(res.data);
      })
      .catch(err => {
        console.error(`An error occured getting the JSON: ${err}`)
      })
  }, [])

  function swipePic() {
    axios.get("https://dog.ceo/api/breeds/image/random")
      .then(res => {
        setDogPics(res.data);
      })
      .catch(err => {
        console.error(`An error occured getting the JSON: ${err}`)
      })
  }

  function handleDragEnd(event, info) {
    if (info.offset.x > 100) {
      swipePic()
      setNextPic(true)
      controls.start({
        x: 1000,
        opacity: 0,
        transition: { duration: 0.5 }
      });
    }
    if (info.offset.x < -100) {
      swipePic()
    }
  }


  if (!dogPics) return <p>Loading...</p>

  return (
    <>
      <Header />
      <div className='content-container'>
        <motion.div
            className="card-container"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            drag="x"
            style={{
              x,
              rotate,
              backgroundImage: `url(${dogPics.message})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
            dragConstraints={{ left: 0, right: 0 }}
            whileTap={{ scale: 0.9 }}
            onDragEnd={(event, info) => {
              if (info.offset.x > 100) {
                swipePic()
              }
              if (info.offset.x < -100) {
                swipePic()
              }
            }}
          >
            <div className="card-overlay">
            <h1 className="username">chad, 30</h1>
            <p className="userBio">hot dog</p>
            </div>
          </motion.div>
        <div className='hit-or-miss-container'>
          <button onClick={swipePic} className='hit-or-miss-btn'><img src='../Images/miss.png' alt='miss button' className='hit-or-miss-icon'/></button>
          <button onClick={swipePic} className='hit-or-miss-btn'><img src='../Images/hit.png' alt='hit button' className='hit-or-miss-icon'/></button>
        </div>
      </div>
    </>
  )
}

export default App;
