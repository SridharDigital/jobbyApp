import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', displayErrorMsg: false, errorMsg: ''}

  onChangeUpdateUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeUpdatePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitValidateUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    console.log(response)
    console.log(fetchedData)

    if (response.ok) {
      const {history} = this.props
      const jwtToken = fetchedData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      const errorMsg = fetchedData.error_msg
      this.setState({displayErrorMsg: true, errorMsg})
    }
  }

  render() {
    const {username, password, displayErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form
            className="login-form"
            onSubmit={this.onSubmitValidateUserDetails}
          >
            <label htmlFor="inputUsername" className="login-form-label">
              USERNAME
            </label>
            <input
              id="inputUsername"
              className="login-form-input"
              type="text"
              placeholder="Username"
              onChange={this.onChangeUpdateUsername}
              value={username}
            />
            <label htmlFor="inputPassword" className="login-form-label">
              PASSWORD
            </label>
            <input
              id="inputPassword"
              className="login-form-input"
              type="password"
              placeholder="Password"
              onChange={this.onChangeUpdatePassword}
              value={password}
            />
            <button type="submit" className="button login-form-btn">
              Login
            </button>
            {displayErrorMsg && (
              <p className="login-error-message">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
