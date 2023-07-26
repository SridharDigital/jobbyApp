import { Component } from 'react'
import { BiSearch } from 'react-icons/bi'
import { default as Cookies } from 'js-cookie'
import { MagnifyingGlass as Loader } from 'react-loader-spinner'

import Header from '../Header'
import UserProfile from '../UserProfile'
import JobItem from '../JobItem'
import FilterJobs from '../FilterJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  in_Progress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    minimumPackage: '',
    search: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  ongetJobsListApiSuccess = (fetchedJobs) => {
    const jobsList = fetchedJobs.map((job) => ({
      id: job.id,
      title: job.title,
      companyLogoUrl: job.company_logo_url,
      employmentType: job.employment_type,
      jobDescription: job.job_description,
      location: job.location,
      packagePerAnnum: job.package_per_annum,
      rating: job.rating,
    }))
    this.setState({ jobsList: jobsList, apiStatus: apiStatusConstants.success })
  }

  getJobsList = async () => {
    this.setState({ apiStatus: apiStatusConstants.in_Progress })

    const { employmentType, minimumPackage, search } = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${search}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok) {
      this.ongetJobsListApiSuccess(fetchedData.jobs)
    } else {
      this.setState({ apiStatus: apiStatusConstants.fail })
    }
  }

  onChangeUpdateSearch = (event) => {
    this.setState({ search: event.target.value })
    this.getJobsList()
  }

  onClickRetryButton = () => {
    this.getJobsList()
  }

  updateEmploymentType = (target) => {
    const { employmentType } = this.state
    if (target.checked) {
      this.setState(
        { employmentType: [...employmentType, target.id] },
        this.getJobsList
      )
    } else {
      const updatedEmploymentType = employmentType.filter(
        (each) => target.id !== each
      )
      this.setState({ employmentType: updatedEmploymentType }, this.getJobsList)
    }
  }

  updateMinimumPackage = (id) =>
    this.setState({ minimumPackage: id }, this.getJobsList)

  renderLoadingView() {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    )
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

  renderNoJobsView() {
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-view-image"
        />
        <h1 className="failure-view-heading">No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  renderDisplayJobsView() {
    const { jobsList } = this.state
    const noOfJobs = jobsList.length
    return (
      <>
        {noOfJobs !== 0 ? (
          <ul className="jobs-list-ul-container">
            {jobsList.map((eachJob) => (
              <JobItem jobItemDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  renderJobs() {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.in_Progress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderDisplayJobsView()
      case apiStatusConstants.fail:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    console.log(this.state.employmentType)
    const { search, minimumPackage } = this.state

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-content-container">
            <div className="userprofile-and-filter-container">
              <UserProfile />
              <hr className="horizontal-line" />
              <FilterJobs
                updateEmploymentType={this.updateEmploymentType}
                updateMinimumPackage={this.updateMinimumPackage}
                currentMinimumPackage={minimumPackage}
              />
            </div>
            <div className="jobsheader-and-jobslist-container">
              <div className="jobs-search-container">
                <input
                  type="search"
                  className="jobs-search-bar"
                  placeholder="Search"
                  value={search}
                  onChange={this.onChangeUpdateSearch}
                />
                <div className="search-icon-container">
                  <BiSearch className="search-icon" />
                </div>
              </div>
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
