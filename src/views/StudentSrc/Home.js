import { withStyles } from '@material-ui/core/styles'
import React from 'react'

const styles = {}

class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { classes } = this.props
    return <div>This is Home Page.</div>
  }
}

export default withStyles(styles)(Home)
