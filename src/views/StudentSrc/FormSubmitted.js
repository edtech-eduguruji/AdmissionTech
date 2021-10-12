import { Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import CardContainer from '../../common/CardContainer'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'
import { redirectUrl } from '../../utils/Utils'
class FormSubmitted extends React.Component {
  render() {
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
              <Typography variant="h6">General instruction</Typography>
              <Divider />
              <Typography component="span" variant="body1">
                <ul>
                  <li>
                    Download submitted form along with payment reciept and
                    produce at the time of counselling.
                  </li>
                  <li>
                    You can login to our portal using your registration id and
                    date of birth on login page.
                  </li>
                  <li>
                    You can download application form with payment receipt using
                    below button.
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

export default withRouter(FormSubmitted)
