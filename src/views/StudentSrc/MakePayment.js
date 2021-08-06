import { Grid, Typography } from '@material-ui/core'
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
            <Typography variant="h6">
              <Success>
                Your Registration ID is : {LocalStorage.getUser().user_id}
              </Success>
            </Typography>
          </Grid>
          {/* <Grid container item xs={12} direction="column" alignContent="center">
            <Typography variant="h6">General instruction</Typography>
            <Divider />
            <Typography variant="body1">
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </Typography>
          </Grid> */}
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
