import React, { use, useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from './StarRating';

function Test(){
  const [movieRating, setMovieRating] = useState(0);
  return(
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={ setMovieRating }/>
      <p>This is was rated {movieRating} starts</p>
    </div>

  );

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} messages = {["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
    <StarRating 
      maxRating={5} 
      color="red"
      size={28}
      defaultRaiting={3}
    />
    <Test/>
  </React.StrictMode>
);

