import { Link } from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="home-content-container">
          <div className="content-box">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits you abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button className="find-jobs-btn button">Find Jobs</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
