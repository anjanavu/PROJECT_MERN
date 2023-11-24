import React from 'react';
import BackgroundImage from '../background.png';
import '../Style.css';

const Home = () => {
  return (
    <div className="container">
    <div
      className="leftSide"
    
    >
      <img className='background-image'alt='background'src={BackgroundImage}/>
    </div>
    <div className="rightSide">
      <h1> Exam Portal</h1>
    </div>
    </div>

  );
};

export default Home;
