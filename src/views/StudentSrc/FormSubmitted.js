import { Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import CardContainer from '../../common/CardContainer'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'
class FormSubmitted extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <CardContainer heading="Registration">
        <Grid container spacing={2}>
          <Grid container item xs={12} direction="column" alignContent="center">
            <Typography variant="h6">
              <Success>Your form is submitted successfully.</Success>
            </Typography>
          </Grid>
          <Grid container item xs={12} direction="column" alignContent="center">
            <Typography variant="h6">General instruction</Typography>
            <Divider />
            <Typography variant="body1">
              <ul>
                <li>
                  You can login to our portal using your registration id and
                  date of birth on login page
                </li>
                <li>You can download application form below</li>
                <li>
                  If 'Make payment' button appear below which means your
                  application is submitted but payment is not yet done
                </li>
                <li>
                  Once you done with payment process then only your application
                  form will accepted further
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid container item xs={6} justify="flex-end">
            <RegularButton
              color="primary"
              onClick={() =>
                this.props.history.push('/preview')
              }
            >
              Download Application Form
            </RegularButton>
          </Grid>
          <Grid container item xs={6} justify="flex-start">
            <RegularButton color="primary">Make Payment</RegularButton>
          </Grid>
        </Grid>
      </CardContainer>
    )
  }
}

export default withRouter(FormSubmitted)