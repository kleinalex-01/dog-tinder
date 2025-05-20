import React, {useState, useEffect} from "react"
import axios from "axios";
import './App.css';
import Header from './Components/Header';
import Swipe from './Components/Swipe';
function App() {
  const [dogPics, setDogPics] = useState([])
  const baseURL = "https://dog.ceo/api/breeds/image/random"

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

  if (!dogPics) return <p>Loading...</p>

  return (
    <>
      <Header />
      <Swipe dogPics={dogPics} swipePic={swipePic}/>
    </>
  )
}

export default App;
