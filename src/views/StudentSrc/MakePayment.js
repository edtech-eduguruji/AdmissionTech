import { Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'
import { PAYMENT } from '../../constants/Constants'
import { addSuccessMsg } from '../../utils/Utils'

class MakePayment extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    if (LocalStorage.getUser().payment === PAYMENT.DONE) {
      this.props.history.push('/student')
    }
  }

  handleMakePayment = () => {
    const data = new FormData()
    data.append('registrationNo', LocalStorage.getUser().user_id)
    FormApi.makePayment(data).then((res) => {
      if (res.status === 200) {
        addSuccessMsg('Payment is Successfully done.')
        let user = { ...LocalStorage.getUser(), payment: '1' }
        LocalStorage.setUser(user)
        this.props.history.push('/student')
      }
    })
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
                <li>
                  You can save in draft mode or submit application form anytime.
                </li>
                <li>Once application form is submit, it cannot be changed.</li>
              </ul>
            </Typography>
          </Grid>
          <Grid container item xs={12} direction="column" alignContent="center">
            <Typography variant="h6" component="div">
              Online application form fees is Rs. 252 only.
            </Typography>
          </Grid>
          <Grid container item xs={12} justifyContent="center">
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
