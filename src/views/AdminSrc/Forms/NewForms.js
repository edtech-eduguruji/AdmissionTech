import { withStyles } from '@material-ui/core/styles'
import React from 'react'

const styles = {}

class NewForms extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { classes } = this.props
    return <div>This is Registrations Forms Page.</div>
  }
}

export default withStyles(styles)(NewForms)
