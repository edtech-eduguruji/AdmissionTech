import { Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'
import { downloadPdf, errorDialog } from '../../utils/Utils'

class MakePayment extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      downloadPdf('p1234', 'RID')
    }, 3000)
  }

  handleMakePayment = () => {
    /* const data = new FormData()
    data.append('registrationNo', LocalStorage.getUser().user_id)
    FormApi.makePayment(data).then((res) => {
      if (res.status === 200) {
        addSuccessMsg('Payment is Successfully done.')
        let user = { ...LocalStorage.getUser(), payment: '1' }
        LocalStorage.setUser(user)
        this.props.history.push('/student')
      }
    }) */
    errorDialog(
      'Due to technical failure, payment process cannot be completed at this moment. Try again later'
    )
  }

  render() {
    return (
      <div className="childContainer">
        <CardContainer heading="Payment">
          <Grid container spacing={2}>
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignContent="center"
            >
              <div id="p1234">
                <Typography variant="h6" component="div" className="center">
                  Your Registration ID
                  <Success>{LocalStorage.getUser().user_id}</Success>
                  <Typography variant="body1" component="div">
                    Please note down your registration id before making payment.
                  </Typography>
                </Typography>
              </div>
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignContent="center"
            >
              <Typography variant="h6">
                Read instructions carefully before making any payment
              </Typography>
              <Divider />
              <Typography variant="body1">
                <ul>
                  <li>
                    You can login by entering registration id and date of birth
                    on home page.
                  </li>
                  <li>
                    Application form fees is Rs. 250 and registration fees is
                    Rs. 2 which is non-refundable.
                  </li>
                  <li>Download prospectus form after making payment</li>
                  <li>
                    Read prospectus form before submitting application form
                    online.
                  </li>
                  <li>
                    Follow admission guidelines before submitting application
                    form
                  </li>
                  <li>
                    Once form is submitted, it cannot be edited or changed
                  </li>
                </ul>
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignContent="center"
            >
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
      </div>
    )
  }
}

export default withRouter(MakePayment)
