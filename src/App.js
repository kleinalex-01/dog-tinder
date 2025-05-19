import React, {useState, useEffect} from "react"
import axios from "axios";
import './App.css';
import Header from './Components/Header';
import { motion, useAnimation, useMotionValue, useTransform } from "motion/react";
function App() {
  const [dogPics, setDogPics] = useState([])
  const baseURL = "https://dog.ceo/api/breeds/image/random"
  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotate = useTransform(x, [-200, 200], [-15, 15]);


  const getPics = async () => {
    const res = await axios.get(baseURL);
    return res.data.message;
  }

  const refillPics = async () => {
    const needed = 5 - dogPics.length;
    if (needed <= 0) return;
    const newPics = await Promise.all(Array.from({length: needed}, getPics))
    setDogPics(prev => [...prev, ...newPics])
  }
  const swipePic = async () => {
    setDogPics(prev => {
      const newStack = prev.slice(1)
      if (newStack.length < 5) {
        refillPics();
      }
      return newStack;
    })
  }

  useEffect(() => {
  (async () => {
    const initialPics = await Promise.all(Array.from({ length: 5 }, getPics));
    setDogPics(initialPics);
  })();}, []);

  function handleDragEnd(event, info) {
    if (info.offset.x > 100 || info.offset.x < -100) {
      swipePic()
  } else {
    controls.start({x:0})
  }}


  if (!dogPics) return <p>Loading...</p>

  return (
    <>
      <Header />
      <div className='content-container'>
        {dogPics.slice(0, 3).reverse().map((pic, index, arr) => {
          const isTop = index === arr.length - 1;
          const scale = 1 - (arr.length - 1 - index) * 0.05;
          const yOffset = (arr.length - 1 - index) * 10;

          return (
            <motion.div
              key={pic}
              className="card-container"
              style={{
                backgroundImage: `url(${pic})`,
                zIndex: index,
                transform: `translate(-50%, -50%) scale(${scale}) translateY(${yOffset}px)`,
              }}
              animate={{ scale }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              whileTap={isTop ? { scale: 0.95 } : {}}
              onDragEnd={isTop ? handleDragEnd : undefined}
            >
              <div className="card-overlay">
                <h1 className="username">chad, 30</h1>
                <p className="userBio">hot dog</p>
              </div>
            </motion.div>
          );
        })}
        <div className='hit-or-miss-container'>
          <button onClick={swipePic} className='hit-or-miss-btn'><img src='../Images/miss.png' alt='miss button' className='hit-or-miss-icon'/></button>
          <button onClick={swipePic} className='hit-or-miss-btn'><img src='../Images/hit.png' alt='hit button' className='hit-or-miss-icon'/></button>
        </div>
      </div>
    </>
  )
}

export default App;
