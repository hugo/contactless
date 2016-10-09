import React from 'react'

import './Settings.css'

class SettingsItem extends React.Component {
  handleChange = (evt) => {
    evt.preventDefault()
    const { didChangeInput, field } = this.props
    didChangeInput(field, evt.target.value)
  }

  render() {
    const { disabled, label, value } = this.props

    return (
      <div className="Settings--Item">
        <label className="Settings--Item--Label">
          {label}
          <input
            disabled={disabled}
            className="Settings--Item--Input"
            onChange={this.handleChange}
            value={value}
          />
        </label>
      </div>
    )
  }
}

class Settings extends React.Component {
  state = { apiEndpoint: '', access_token: '', saving: false }

  componentWillMount() {
    if (localStorage['apiEndpoint']) {
      this.setState({ apiEndpoint: localStorage['apiEndpoint'] })
    }
  }

  saveSettings = () => {
    this.setState({ saving: true })
    localStorage['apiEndpoint'] = this.state.apiEndpoint
    setTimeout(() => {
      this.setState({ saving: false })
    }, 1000)
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.saveSettings()
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value })
  }

  render() {
    return (
      <div className="Settings">
        <div className="Settings--Header">
          <h2 className="Settings--Title">Settings</h2>
        </div>
        <div className="Settings--Items">
          <form onSubmit={this.handleSubmit}>
            <SettingsItem
              disabled={this.state.saving}
              field="apiEndpoint"
              label="API endpoint"
              didChangeInput={this.handleChange}
              value={this.state.apiEndpoint}
            />

            <button
              disabled={this.state.saving}
              className="Button Button--success"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Settings
