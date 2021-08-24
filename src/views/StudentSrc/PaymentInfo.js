import { Box, Grid, Typography } from '@material-ui/core'
import jwtDecode from 'jwt-decode'
import queryString from 'query-string'
import React from 'react'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import CustomTable from '../../components/Table/Table'
import Danger from '../../components/Typography/Danger'
import Success from '../../components/Typography/Success'
import { redirectUrl } from '../../utils/Utils'

const successCode = '0300'
class PaymentInfo extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isPreview: props.paymentDetails ? false : true,
      paymentDetails: props.paymentDetails,
      isLoading: true,
    }
  }

  componentDidMount() {
    if (this.props.paymentDetails) {
      this.setState({ isLoading: false })
    } else {
      if (window.location.search) {
        const parsed = queryString.parse(window.location.search)
        if (parsed.token) {
          const data = jwtDecode(parsed.token).data
          this.setState({ paymentDetails: data, isLoading: false })
          if (data.AuthStatusCode == successCode) {
            LocalStorage.setUser(parsed.token)
          } else {
            this.setState({ isLoading: false })
          }
          setTimeout(() => {
            this.handleNext(data)
          }, 10000)
        }
      }
    }
  }

  handleNext = (data) => {
    redirectUrl(data.AuthStatusCode == successCode ? 'sSummary' : 'sPayment', 2)
  }

  successPaymentData = (data) => {
    var formatted = data.map((item) => {
      return [
        'Online PG',
        item.TxnReferenceNo,
        '₹' + item.TxnAmount,
        item.AuthMsg,
        'Admission Fees',
        item.TxnDate,
        item.AuthStatusCode != successCode ? item.errorDescription : '',
      ]
    })
    return formatted
  }

  render() {
    const { paymentDetails, isLoading, isPreview } = this.state
    return (
      <div className="childContainer">
        <CardContainer heading={'PAYMENT RECEIPT'} buttons={[]}>
          <Grid container item xs={12} justifyContent="center">
            <Box p={1}></Box>
            {isLoading ? (
              <div>Please wait.....</div>
            ) : (
              <React.Fragment>
                {paymentDetails ? (
                  <Grid item xs={12}>
                    {paymentDetails.AuthStatusCode != successCode ? (
                      <Danger>Failure</Danger>
                    ) : (
                      <Success>Success</Success>
                    )}
                    <br />
                    <CustomTable
                      boldHeading
                      isColumn={true}
                      tableHead={[
                        'Payment Mode',
                        'Transaction Reference No',
                        'Transaction Amount',
                        'Payment Status',
                        'Purpose of Payment',
                        'Payment Date',
                        paymentDetails.AuthStatusCode != successCode
                          ? 'Failure Description'
                          : '',
                      ]}
                      tableData={this.successPaymentData([paymentDetails])}
                    />

                    <br />
                    <br />
                    {isPreview && (
                      <Typography component="div" variant="body1">
                        You will be redirecting back to the site within 10
                        seconds
                      </Typography>
                    )}
                  </Grid>
                ) : (
                  <div>
                    Payment process is not complete. Try again after sometime.
                  </div>
                )}
              </React.Fragment>
            )}
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default PaymentInfo
