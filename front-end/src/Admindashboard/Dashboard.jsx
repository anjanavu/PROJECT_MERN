import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/Dashboard.css'
const Dashboard = ({ onSidebarItemClick  }) => {

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'> <Link to='/students'  style={{ textDecoration: 'none'}}>
          <div className='card'>
            <img
              src='https://t3.ftcdn.net/jpg/02/55/22/68/360_F_255226859_Rhqr5hflr2esVXHQE1sS1bWxmZxs0gWI.jpg'
              alt='student'
            />
            <div className='card-inner'>
              <h4>Students</h4>
            </div>
          </div></Link> <Link to='/batches' style={{ textDecoration: 'none'}} >
            <div className='card'>
            <img src='https://media.istockphoto.com/id/1216824129/photo/distance-learning-online-education.jpg?s=170667a&w=0&k=20&c=6vUI8aPdnwq0p2Nlt9tXwyeEpReSOzvEMP99jouW34I=' alt='batches'/>
                <div className='card-inner'>
                <h4>Batches</h4>
                   
                </div>
            </div></Link> <Link to='/results' style={{ textDecoration: 'none'}} >
            <div className='card'>
            <img src='https://static.toiimg.com/thumb/msid-103029883,width-400,resizemode-4/103029883.jpg' alt='email'/>
                <div className='card-inner'>
                <h4>Result</h4>
                   
                </div>
            </div>
            </Link>
        </div>


    </main>
  )
}


export default Dashboard
