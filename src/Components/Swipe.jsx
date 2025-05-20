import React from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "motion/react";

export default function Swipe( {dogPics, swipePic} ) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const controls = useAnimation();

    async function handleDragEnd(event, info) {
        if (info.offset.x > 100) {
            await controls.start({ x: window.innerWidth * 1.5 })
            swipePic()
            controls.start({ x: 0 })
        } else if (info.offset.x < -100) {
            await controls.start({ x: -window.innerWidth * 1.5 })
            swipePic()
            controls.start({ x: 0 })
        }
    }

    return (
        <>
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
                y: yOffset,
                rotate: isTop ? rotate : 0,
                scale: scale,
                x: isTop ? x : 0
              }}
              animate={isTop ? controls : undefined}
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