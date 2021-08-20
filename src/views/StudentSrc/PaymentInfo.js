import { Box, Button, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import LocalStorage from '../../common/LocalStorage'
import CustomTable from '../../components/Table/Table'
import { redirectUrl } from '../../utils/Utils'

const PaymentInfo = ({ paymentDetails }) => {
  const formatPaymentData = (data) => {
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

  const [pInfo, setPInfo] = useState(paymentDetails)

  if (paymentDetails && paymentDetails.length > 0) {
  } else {
    useEffect(() => {
      FormApi.fetchPaymentDetails(data).then((res) => {
        if (res.data && res.data.length > 0) {
          const pInfo = res.data
          if (pInfo.AuthStatusCode == '0300') {
            setPInfo(res.data)
            const user = LocalStorage.getUser()
            user.payment = 1
            LocalStorage.setUser(user)
          } else {
          }
        }
      })
    }, [])
  }

  const handleNext = () => {
    redirectUrl('sSummary')
  }

  return (
    <Grid container item xs={12} justifyContent="center">
      <Grid container item xs={12} justifyContent="center">
        <Box p={4}>
          <Typography variant="h6">PAYMENT RECEIPT</Typography>
        </Box>
      </Grid>
      {pInfo && pInfo.length > 0 ? (
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
            tableData={formatPaymentData(pInfo)}
          />
          <Button onClick={handleNext}>Next</Button>
        </Grid>
      ) : (
        <div>Payment is not process completely. Try again after sometime.</div>
      )}
    </Grid>
  )
}

export default PaymentInfo
