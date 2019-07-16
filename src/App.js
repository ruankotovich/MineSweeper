import React from 'react';
import './App.css';

import Square from './components/square';

function App() {
  const width = 20;
  const height = 20;
  const mineCount = (width*height)*0.3;

  let rows = [];
  let neighborhood = [];
  let mines;

  // shuffle
  {
    let array = Array.apply(null, { length: width * height }).map(Number.call, Number);
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    mines = new Set(array.slice(0, mineCount));
  }

  for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j) {
      let index = width * i + j;
      let square = <Square config={{width, height, neighborhood, mines}} i={i} j={j} hasBomb={mines.has(index)} index={index} />;
      neighborhood.push(square);
      rows.push(square);
    }
    rows.push(<br />);
  }
  return rows;
}

export default App;
