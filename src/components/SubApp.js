import React from 'react'

class SubApp extends React.Component {

  render() {
    const {
      sidebar: SidebarComponent,
      subapp: SubAppComponent,
      title
    } = this.props

    return (
      <div className="App--Container">
        <div className="Sidebar">
          <div className="Sidebar--Header">
            <h2 className="Sidebar--Header--Title">
              {title}
            </h2>
          </div>
          <SidebarComponent />
        </div>
        <div className="SubApp">
          <SubAppComponent />
        </div>
      </div>
    )
  }
}

export default SubApp
