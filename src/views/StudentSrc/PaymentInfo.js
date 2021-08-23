import { Box, Grid, Typography } from '@material-ui/core'
import jwtDecode from 'jwt-decode'
import queryString from 'query-string'
import React from 'react'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import CustomTable from '../../components/Table/Table'
import { redirectUrl } from '../../utils/Utils'

class PaymentInfo extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isPreview:
        props.paymentDetails && props.paymentDetails.length > 0 ? false : true,
      paymentDetails: props.paymentDetails,
      isLoading: true,
    }
  }

  componentDidMount() {
    if (this.props.paymentDetails && this.props.paymentDetails.length > 0) {
      this.setState({ isLoading: false })
    } else {
      if (window.location.search) {
        const parsed = queryString.parse(window.location.search)
        if (parsed.token) {
          const data = jwtDecode(parsed.token).data

          if (data.AuthStatusCode == '300') {
            this.setState({ paymentDetails: data, isLoading: false })
            LocalStorage.setUser(parsed.token)
            setTimeout(() => {
              this.handleNext()
            }, 10000)
          } else {
            this.setState({ isLoading: false })
          }
        }
      }
    }
  }

  handleNext = () => {
    redirectUrl('sSummary', 2)
  }

  formatPaymentData = (data) => {
    var formatted = data.map((item) => {
      return [
        item.paymentId,
        item.TxnReferenceNo,
        item.BankReferenceNo,
        item.TxnDate,
        item.TxnType,
        '₹' + item.TxnAmount,
        item.AuthMsg,
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
                {paymentDetails && paymentDetails.length > 0 ? (
                  <Grid item xs={12}>
                    <CustomTable
                      boldHeading
                      isColumn={true}
                      tableHead={[
                        'Payment ID',
                        'Txn Reference No',
                        'Bank Reference No',
                        'Payment Date',
                        'Payment Mode',
                        'Amount Paid',
                        'Status',
                      ]}
                      tableData={this.formatPaymentData(paymentDetails)}
                    />
                    <br />
                    <br />
                    {isPreview && (
                      <Typography component="div" variant="body1">
                        You will be redirecting to form within 10 seconds
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
