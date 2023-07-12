import { Component } from "react"
import { default as Cookies } from "js-cookie"
import "./index.css"

class UserProfile extends Component {
  state = { userProfileDetails: {} }

  componentDidMount() {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    const jwtToken = Cookies.get("jwt_token")

    const url = "https://apis.ccbp.in/profile"
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    console.log(response)
    console.log(fetchedData)

    if (response.ok) {
      const fetchedUserProfile = fetchedData.profile_details
      const userProfileDetails = {
        name: fetchedUserProfile.name,
        profileImageUrl: fetchedUserProfile.profile_image_url,
        shortBio: fetchedUserProfile.short_bio,
      }
      this.setState({ userProfileDetails: userProfileDetails })
    }
  }

  render() {
    const { userProfileDetails } = this.state
    const { name, shortBio, profileImageUrl } = userProfileDetails

    return (
      <div className="userprofile-bg-container">
        <img
          src={profileImageUrl}
          alt="profile image"
          className="profile-image"
        />
        <h2 className="profile-name-text">{name}</h2>
        <p className="profile-bio-text">{shortBio}</p>
      </div>
    )
  }
}

export default UserProfile
