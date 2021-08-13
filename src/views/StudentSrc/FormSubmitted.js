import { Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'
import { PAYMENT } from '../../constants/Constants'
import { redirectUrl } from '../../utils/Utils'
class FormSubmitted extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    if (LocalStorage.getUser().payment === PAYMENT.NOT_DONE) {
      redirectUrl('sPayment', 1)
    }
  }

  render() {
    return (
      <CardContainer heading="Thank You">
        <Grid container spacing={2}>
          <Grid container item xs={12} direction="column" alignContent="center">
            <Typography variant="h6">
              <Success>Your form is submitted successfully.</Success>
            </Typography>
          </Grid>
          <Grid container item xs={12} direction="column" alignContent="center">
            <Typography variant="h6">General instruction</Typography>
            <Divider />
            <Typography component="span" variant="body1">
              <ul>
                <li>
                  You can login to our portal using your registration id and
                  date of birth on login page
                </li>
                <li>
                  You can download application form and payment receipt below
                </li>
                <li>
                  Once you done with payment process then only your application
                  form will accepted further
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <RegularButton
              color="primary"
              onClick={() => this.props.history.push('/preview')}
            >
              Download Application Form
            </RegularButton>
          </Grid>
        </Grid>
      </CardContainer>
    )
  }
}

export default withRouter(FormSubmitted)
