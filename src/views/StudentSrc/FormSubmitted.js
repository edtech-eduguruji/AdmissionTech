import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import CardContainer from '../../common/CardContainer'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'

const styles = {}

class FormSubmitted extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { classes } = this.props
    return (
      <CardContainer heading="Payment Success !">
        <Grid container spacing={2}>
          <Grid container item xs={12} justify="center">
            <Typography variant="subtitle1">
              <Success>
                Your payment of <b>₹252</b> is successfull.
              </Success>
            </Typography>
          </Grid>
          <Grid container item xs={6} justify="flex-end">
            <RegularButton color="primary">Download Form</RegularButton>
          </Grid>
          <Grid container item xs={6} justify="flex-start">
            <RegularButton color="primary">Download Receipt</RegularButton>
          </Grid>
        </Grid>
      </CardContainer>
    )
  }
}

export default withStyles(styles)(FormSubmitted)
