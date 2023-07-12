import { Component } from "react"
import { default as Cookies } from "js-cookie"
import { AiFillStar } from "react-icons/ai"
import { MdLocationOn } from "react-icons/md"
import { BsFillBriefcaseFill } from "react-icons/bs"
import { MagnifyingGlass as Loader } from "react-loader-spinner"

import Header from "../Header"
import SimilarJobItem from "../SimilarJobItem"

import "./index.css"

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  fail: "FAIL",
  in_Progress: "IN_PROGRESS",
}

class jobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  ongetJobDetailsApiSuccess = (fetchedData) => {
    const fetchedJobDetails = fetchedData.job_details

    const jobDetails = {
      id: fetchedJobDetails.id,
      title: fetchedJobDetails.title,
      companyLogoUrl: fetchedJobDetails.company_logo_url,
      companyWebsiteUrl: fetchedJobDetails.company_website_url,
      employmentType: fetchedJobDetails.employment_type,
      jobDescription: fetchedJobDetails.job_description,
      lifeAtCompany: {
        description: fetchedJobDetails.life_at_company.description,
        imageUrl: fetchedJobDetails.life_at_company.image_url,
      },
      location: fetchedJobDetails.location,
      packagePerAnnum: fetchedJobDetails.package_per_annum,
      rating: fetchedJobDetails.rating,
      skills: fetchedJobDetails.skills.map((eachSkill) => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      })),
    }

    const fetchedSimilarJobDetails = fetchedData.similar_jobs
    const similarJobDetails = fetchedSimilarJobDetails.map(
      (eachSimilarJob) => ({
        id: eachSimilarJob.id,
        title: eachSimilarJob.title,
        location: eachSimilarJob.location,
        jobDescription: eachSimilarJob.job_description,
        rating: eachSimilarJob.rating,
        employmentType: eachSimilarJob.employment_type,
        companyLogoUrl: eachSimilarJob.company_logo_url,
      })
    )

    this.setState({
      jobDetails,
      similarJobDetails,
      apiStatus: apiStatusConstants.success,
    })
  }

  getJobDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.in_Progress })
    const { history } = this.props
    console.log(history)
    const path = history.location.pathname
    const jwtToken = Cookies.get("jwt_token")

    const url = `https://apis.ccbp.in${path}`
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok) {
      this.ongetJobDetailsApiSuccess(fetchedData)
    } else {
      this.setState({ apiStatus: apiStatusConstants.fail })
    }
  }

  onClickRetryButton = () => {
    this.getJobDetails()
  }

  renderFailureView() {
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button onClick={this.onClickRetryButton} className="button">
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView() {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    )
  }

  renderSkills() {
    const { jobDetails } = this.state
    const { skills } = jobDetails

    return skills?.map((eachSkill) => (
      <li className="jobdetails-skill-li-container">
        <img
          src={eachSkill.imageUrl}
          alt={eachSkill.name}
          className="skill-logo"
        />
        <p>{eachSkill.name}</p>
      </li>
    ))
  }

  renderJobDetailsView() {
    const { jobDetails } = this.state
    const {
      title,
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-item-li-container">
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
        <div className="job-meta-container">
          <div className="location-and-type-container">
            <MdLocationOn className="job-meta-icons" />
            <p className="job-meta-text">{location}</p>
            <BsFillBriefcaseFill className="job-meta-icons" />
            <p className="job-meta-text">{employmentType}</p>
          </div>
          <p className="job-salary">{packagePerAnnum}</p>
        </div>
        <h2>Description</h2>
        <p className="job-description">{jobDescription}</p>
        <h2>Skills</h2>
        <ul className="jobdetails-skills-ul-container">
          {this.renderSkills()}
        </ul>
        <h2>Life at Company</h2>
        <div className="life-at-company-container">
          <p className="life-at-company-description">
            {lifeAtCompany?.description}
          </p>
          <img
            src={lifeAtCompany?.imageUrl}
            alt="Life at Company"
            className="life-at-company-image"
          />
        </div>
      </div>
    )
  }

  renderJobDetails() {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.in_Progress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    console.log(this.state)
    const { similarJobDetails } = this.state
    return (
      <>
        <Header />
        <div className="jobdetails-bg-container">
          <div className="jobdetails-content-container">
            {this.renderJobDetails()}
            <h2 className="similarjobs-heading">Similar Jobs</h2>
            <ul className="similar-job-ul-container">
              {similarJobDetails.map((eachJobDetails) => (
                <SimilarJobItem
                  jobItemDetails={eachJobDetails}
                  key={eachJobDetails.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default jobDetails
