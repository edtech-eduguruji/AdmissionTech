import { Divider, Grid, Typography } from '@material-ui/core'
import config from 'myconfig'
import React from 'react'
import { withRouter } from 'react-router-dom'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'
import {
  errorDialog,
  handleCalculateFees,
  redirectUrl,
  validateUser,
} from '../../utils/Utils'

class CourseFee extends React.Component {
  constructor() {
    super()
    this.state = {
      admissionYear: null,
      faculty: null,
      gender: null,
      major1: null,
      courseFee: null,
      parameterId: null,
      checksumVal: null,
    }
  }

  componentDidMount() {
    if (validateUser()) {
      const data = {
        registrationNo:
          LocalStorage.getUser() && LocalStorage.getUser().user_id,
      }
      FormApi.getForm(data).then((response) => {
        if (response.data) {
          response.data.major1 = response.data.major1
            ? JSON.parse(response.data.major1)
            : []

          let payment = handleCalculateFees(
            response.data.admissionYear,
            response.data.faculty,
            response.data.gender,
            response.data.major1
          )
          if (payment != null) {
            this.setState({
              ...response,
              courseFee: payment.amount,
              parameterId: payment.parameterId,
            })
          }
        }
      })
    }
  }

  handleCourseFee = () => {
    if (validateUser()) {
      const userId = LocalStorage.getUser().user_id
      const { parameterId, courseFee } = this.state
      const f = new FormData()
      // f.append('str', str)
      f.append('userId', userId)
      f.append('account', parameterId)
      f.append('amount', `${courseFee}`)
      f.append('responseUrl', config.RESPONSEURL)
      f.append('courseFee', '1')

      FormApi.createCheckSum(f)
        .then((res) => {
          if (res.status === 200 && res.data) {
            const checksumVal = res.data
            console.log('checksumVal', checksumVal)
            this.setState({ checksumVal }, () => {
              document.getElementById('paymentform').submit()
            })
          } else {
            errorDialog('Please try after sometime.')
          }
        })
        .catch(() => {
          errorDialog('Please try after sometime.')
        })
    }
  }

  render() {
    const {
      admissionYear,
      faculty,
      gender,
      parameterId,
      courseFee,
      checksumVal,
    } = this.state
    return (
      <div className="childContainer">
        <CardContainer heading="Thank You">
          <Grid container spacing={2}>
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignContent="center"
            >
              <Typography variant="h6">
                <Success>Your form is submitted successfully.</Success>
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignContent="center"
            >
              <Typography variant="h6" gutterBottom>
                Course Fee
              </Typography>
              <Divider />
              <br />
              <Typography component="span" variant="body1">
                Now you have to pay the course fees of Rs. {courseFee} to
                complete your registration.
              </Typography>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <form
                id="paymentform"
                method="post"
                action={config.PAYMENTAPI}
                encType="application/x-www-form-urlencoded"
              >
                <input hidden name="msg" value={checksumVal} />
              </form>
              <RegularButton
                color="primary"
                onClick={this.handleCourseFee}
                disabled={!admissionYear && !faculty && !gender && !courseFee}
              >
                Pay Course Fee
              </RegularButton>
              <br />
              <br />
              <RegularButton
                color="primary"
                onClick={() => redirectUrl('sPaymentHistory', 1)}
              >
                Payment History
              </RegularButton>
            </Grid>
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default withRouter(CourseFee)
