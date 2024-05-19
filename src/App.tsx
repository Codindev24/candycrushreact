import React, { useState, useEffect } from "react";
import "./sass/app.scss";

const width = 8
const candyColors = [
  'blue',
  'red',
  'green',
  'yellow',
  'orange',
  'purple'
]

const App = () => {
 const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

 const checkForColumnOfFour = () => {
  for (let i= 0; i < 39; i++ ) {
   const columnOfFour = [i, i +width, i + width * 2, i + width * 3]
   const desidedColor = currentColorArrangement[i]

   if ( columnOfFour.every(square => currentColorArrangement[square] === desidedColor)) {
    columnOfFour.forEach(square => currentColorArrangement[square] = '')
   }
  }
 }

 const checkForRowOfFour = () => {
  for (let i= 0; i < 64; i++ ) {
   const rowOfFour = [i, i +1, i +2, i +3]
   const desidedColor = currentColorArrangement[i]
   const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 21, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

   if(notValid.includes(i)) continue

   if ( rowOfFour.every(square => currentColorArrangement[square] === desidedColor)) {
    rowOfFour.forEach(square => currentColorArrangement[square] = '')
   }
  }
 }

  const checkForColumnOfThree = () => {
   for (let i= 0; i < 47; i++ ) {
    const columnOfThree = [i, i +width, i + width * 2]
    const desidedColor = currentColorArrangement[i]

    if ( columnOfThree.every(square => currentColorArrangement[square] === desidedColor)) {
     columnOfThree.forEach(square => currentColorArrangement[square] = '')
    }
   }
  }

  const checkForRowOfThree = () => {
    for (let i= 0; i < 64; i++ ) {
     const rowOfThree = [i, i +1, i +2]
     const desidedColor = currentColorArrangement[i]
     const notValid = [6, 7, 14, 15, 22, 23, 30, 21, 38, 39, 46, 47, 54, 55, 63, 64]

     if(notValid.includes(i)) continue
 
     if ( rowOfThree.every(square => currentColorArrangement[square] === desidedColor)) {
      rowOfThree.forEach(square => currentColorArrangement[square] = '')
     }
    }
   }

   const moveIntoSquareBelow = () => {
    for(let i = 0; i < 64 - width; i++) {

      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      if ((currentColorArrangement[i + width]) === '') {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = ''
      }
    }
   }

   const dragStart = () => {
    console.log('drag start')
   }

   const dragDrop = () => {
    console.log('drag drop')
   }

   const dragEnd = () => {
    console.log('drag end')
   }

  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
     const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
     randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
    
  }


  useEffect(() => {
   createBoard()
  }, [])

  useEffect(() => {
   const timer = setInterval(() => {
    checkForColumnOfFour()
    checkForRowOfFour()
    checkForColumnOfThree()
    checkForRowOfThree()
    moveIntoSquareBelow()
    setCurrentColorArrangement([...currentColorArrangement])
   }, 100)

   return () => clearInterval(timer)

  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

  return (
    <>
      <div className="app">
      
      <div className="candycrush">
       {currentColorArrangement.map((candyColor, index :number) => (
        <img
        key={index}
        style={{backgroundColor: candyColor}}
        alt={candyColor}
        data-id={index}
        draggable={true}
        onDragStart={dragStart}
        onDragOver={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
        onDragEnter={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
        onDragLeave={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
        onDrop={dragDrop}
        onDragEnd={dragEnd}

        />
       ))}
      </div>{/* .candycrush */}

      </div>
    </>
  );
}

export default App;
