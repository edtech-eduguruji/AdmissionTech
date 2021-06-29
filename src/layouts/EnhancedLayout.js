import React from 'react'

function withRouteLayout(
  WrappedComponent,
  currentRoute,
  currentRole,
  config,
  routes
) {
  // ...and returns another component...
  return class extends React.Component {
    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          currentRoute={currentRoute}
          currentRole={currentRole}
          config={config}
          routes={routes}
        />
      )
    }
  }
}

export default withRouteLayout
