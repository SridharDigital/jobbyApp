import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const SimilarJobItem = props => {
  const {jobItemDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
  } = jobItemDetails
  return (
    <Link to={`/jobs/${id}`} style={{textDecoration: 'none'}}>
      <li className="similar-job-item-li-container">
        <div className="logo-and-title-rating-container">
          <img src={companyLogoUrl} alt={title} className="company-logo" />
          <div className="title-and-rating-container">
            <h3 className="job-title">{title}</h3>
            <div className="rating-icon-and-count-container">
              <AiFillStar className="rating-icon" />
              <p className="rating-count">{rating}</p>
            </div>
          </div>
        </div>

        <h3>Description</h3>
        <p className="job-description">{jobDescription}</p>
        <div className="job-meta-container">
          <div className="location-and-type-container">
            <MdLocationOn className="job-meta-icons" />
            <p className="job-meta-text">{location}</p>
            <BsFillBriefcaseFill className="job-meta-icons" />
            <p className="job-meta-text">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobItem
