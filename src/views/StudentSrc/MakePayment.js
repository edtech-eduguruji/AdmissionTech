import { Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'

class MakePayment extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  handleMakePayment = () => {
    //API call for Payment
    let user = { ...LocalStorage.getUser(), payment: '1' }
    LocalStorage.setUser(user)
    this.props.history.push('/student')
  }

  render() {
    return (
      <CardContainer heading="Payment">
        <Grid container spacing={2}>
          <Grid container item xs={12} direction="column" alignContent="center">
            <Typography variant="h6" component="div" className="center">
              Your Registration ID
              <Success>{LocalStorage.getUser().user_id}</Success>
              <Typography variant="body1" component="div">
                Please note down your registration id before make payment.
              </Typography>
            </Typography>
          </Grid>
          <Grid container item xs={12} direction="column" alignContent="center">
            <Typography variant="h6">
              Before make any payment read instructions carefully
            </Typography>
            <Divider />
            <Typography variant="body1">
              <ul>
                <li>
                  You can login by entering registration id and date of birth on
                  home page.
                </li>
                <li>
                  Application form fees is Rs. 252 which is non-refundable.
                </li>
                <li>
                  After completing payment transaction you can download
                  prospectus form.
                </li>
                <li>
                  Read prospectus form before submitting application form
                  online.
                </li>
                <li>You can save draft or submit application form anytime.</li>
              </ul>
            </Typography>
          </Grid>
          <Grid container item xs={12} direction="column" alignContent="center">
            <Typography variant="h6" component="div">
              Online application form fees is Rs. 252 only.
            </Typography>
          </Grid>
          <Grid container item xs={12} justify="center">
            <RegularButton color="primary" onClick={this.handleMakePayment}>
              Make Payment
            </RegularButton>
          </Grid>
        </Grid>
      </CardContainer>
    )
  }
}

export default withRouter(MakePayment)
