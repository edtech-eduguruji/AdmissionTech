import { Grid } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import CustomTable from '../../components/Table/Table'

class PaymentHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      paymentSummary: [],
    }
  }

  componentDidMount() {
    const data = {
      registrationNo: LocalStorage.getUser() && LocalStorage.getUser().user_id,
      receipt: '0',
    }
    FormApi.fetchPaymentDetails(data).then((payResponse) => {
      if (payResponse.data) {
        this.setState({
          paymentSummary: payResponse.data,
        })
      }
    })
  }

  formatData = (data) => {
    var formatted = data.map((item) => {
      return [
        item.paymentId,
        item.TxnReferenceNo,
        item.BankReferenceNo,
        item.BankID,
        item.TxnAmount,
        item.TxnType,
        item.TxnDate,
        item.AuthMsg,
        // item.RefundStatus,
        // item.TotalRefundAmount,
        // item.LastRefundDate,
        // item.LastRefundRefNo,
      ]
    })
    return formatted
  }

  render() {
    const { paymentSummary } = this.state
    return (
      <div className="childContainer">
        {paymentSummary && paymentSummary.length > 0 && (
          <CardContainer heading="Payment Summary">
            <Grid container spacing={2}>
              <Grid
                container
                item
                xs={12}
                direction="column"
                alignContent="center"
              >
                <CustomTable
                  boldHeading
                  tableHead={[
                    'Payment Id',
                    'TxnReferenceNo',
                    'BankReferenceNo',
                    'BankID',
                    'Amount',
                    'TxnType',
                    'TxnDate',
                    'Status',
                  ]}
                  tableData={this.formatData(paymentSummary)}
                />
              </Grid>
            </Grid>
          </CardContainer>
        )}
      </div>
    )
  }
}

export default withRouter(PaymentHistory)
