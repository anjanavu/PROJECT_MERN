import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosintercepter';
import { RingLoader } from 'react-spinners';
import '../Css/Dashboard.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Batches = () => {
  const [loading, setLoading] = useState(true);
  const [batchData, setData] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    axiosInstance.get('http://localhost:3033/exam/batch')
      .then((res) => {
        setData(res.data);
        setLoading(false);
        console.log(res.data);
      });
  }, []);

  const handleBatchClick = (_id) => {
    console.log('Clicked batch _id:', _id);
    navigate(`/detail/${_id}`);
  };
  

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        {loading ? (
          <div className="spinner-container">
            <RingLoader color={'#123abc'} loading={loading} size={50} />
          </div>
        ) : (
          batchData.map((batch, index) => (
            <div className='card' key={index} onClick={() => handleBatchClick(batch._id)}>
              <img src={batch.image} alt='batch' />
              <div className='card-inner'>
                <div>{batch.batchName}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Batches;
