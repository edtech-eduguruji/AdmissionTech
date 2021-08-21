import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import FormApi from '../../apis/FormApi'
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
      const data = {
        registrationNo: LocalStorage.getUser().user_id,
      }
      FormApi.fetchPaymentDetails(data).then((res) => {
        if (res.data && res.data.length > 0) {
          const pInfo = res.data
          if (pInfo[0].AuthStatusCode == '300') {
            this.setState({ paymentDetails: res.data, isLoading: false })
            const user = LocalStorage.getUser()
            user.payment = '1'
            LocalStorage.setUser(user)
            setTimeout(() => {
              this.handleNext()
            }, 10000)
          }
        }
      })
    }
  }

  handleNext = () => {
    redirectUrl('sSummary', 1)
  }

  formatPaymentData = (data) => {
    var formatted = data.map((item) => {
      return [
        item.paymentId,
        item.TxnDate,
        '',
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
