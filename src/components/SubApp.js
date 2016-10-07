import React from 'react'

class SubApp extends React.Component {

  render() {
    const {
      pathname,
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
          <SidebarComponent pathname={pathname} />
        </div>
        <div className="SubApp">
          <SubAppComponent pathname={pathname} />
        </div>
      </div>
    )
  }
}

export default SubApp
