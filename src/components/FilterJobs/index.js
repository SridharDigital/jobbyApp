import "./index.css"
// import { Component } from "react"

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
]

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
]

const FilterJobs = (props) => {
  const renderEmploymentTypesList = () => {
    return employmentTypesList.map((eachEmployment) => {
      const { updateEmploymentType } = props
      const onChangeUpdateEmploymentType = (event) =>
        updateEmploymentType(event.target)
      return (
        <li>
          <input
            type="checkbox"
            className="checkbox"
            id={eachEmployment.employmentTypeId}
            onChange={onChangeUpdateEmploymentType}
          />
          <label for={eachEmployment.employmentTypeId}>
            {eachEmployment.label}
          </label>
        </li>
      )
    })
  }

  const rendersalaryRangesList = () => {
    return salaryRangesList.map((eachSalary) => {
      const { updateMinimumPackage, currentMinimumPackage } = props
      const isChecked = currentMinimumPackage === eachSalary.salaryRangeId
      const onChangeUpdateupdateMinimumPackage = (event) =>
        updateMinimumPackage(event.target.id)
      return (
        <li>
          <input
            type="checkbox"
            className="checkbox"
            id={eachSalary.salaryRangeId}
            checked={isChecked}
            onChange={onChangeUpdateupdateMinimumPackage}
          />
          <label for={eachSalary.salaryRangeId}>{eachSalary.label}</label>
        </li>
      )
    })
  }

  return (
    <div className="filter-list-container">
      <h3 className="filter-heading">Types of Employment</h3>
      <ul className="filter-type-card">{renderEmploymentTypesList()}</ul>

      <h3 className="filter-heading">Salary Range</h3>
      <ul className="filter-type-card">
        {/* <li>
          <input type="checkbox" className="checkbox" id="10lpa" />
          <label for="10lpa">10 LPA and above</label>
        </li>
        <li>
          <input type="checkbox" className="checkbox" id="20lpa" />
          <label for="20lpa">20 LPA and above</label>
        </li>
        <li>
          <input type="checkbox" className="checkbox" id="30lpa" />
          <label for="30lpa">30 LPA and above</label>
        </li>
        <li>
          <input type="checkbox" className="checkbox" id="40lpa" />
          <label for="40lpa">40 LPA and above</label>
        </li> */}
        {rendersalaryRangesList()}
      </ul>
    </div>
  )
}

export default FilterJobs
