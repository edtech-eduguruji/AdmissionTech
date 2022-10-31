import { Box, Grid } from '@material-ui/core'
import React from 'react'
import CardContainer from '../../common/CardContainer'
import RegularButton from '../../components/CustomButtons/Button'
import CustomTable from '../../components/Table/Table'
import Danger from '../../components/Typography/Danger'
import Success from '../../components/Typography/Success'
import { downloadPdf } from '../../utils/Utils'
import categoryData from '../StudentSrc/StaticData/category.json'

const successCode = '0300'
class PaymentInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLogo: false,
      paymentDetails: props.paymentDetails,
      id: props.id,
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      paymentDetails: props.paymentDetails,
    })
  }

  successPaymentData = (data) => {
    var formatted = data.map((item) => {
      return [
        item.name,
        item.fatherName,
        item.motherName,
        item.gender.toUpperCase(),
        item.dob,
        categoryData.find((itm) => itm.categoryId === item.category).category,
        item.aadharNo,
        item.registrationNo ? item.registrationNo : '',
        item.admissionYear,
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

  handleDownload = () => {
    this.setState({ showLogo: true }, () =>
      downloadPdf(this.state.id, 'Receipt', true)
    )
    setTimeout(() => {
      this.setState({ showLogo: false })
    }, 1000)
  }

  render() {
    const { showLogo, paymentDetails, id } = this.state
    return (
      <div>
        <div className="childContainer" id={id}>
          {showLogo && (
            <Box pb="10px">
              <div className="alignCenter">
                <img
                  alt="logo"
                  src="agracollege.png"
                  width="100px"
                  height="100px"
                />
                <b>AGRA COLLEGE</b>
              </div>
            </Box>
          )}
          <CardContainer heading={'PAYMENT RECEIPT'} buttons={[]}>
            <Grid container item xs={12} justifyContent="center">
              <Box p={1}></Box>
              <React.Fragment>
                {paymentDetails && (
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
                        'Name',
                        'Father Name',
                        'Mother Name',
                        'Gender',
                        'DOB',
                        'Category',
                        'Aadhar No.',
                        'Registration No',
                        'Course Year',
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
                  </Grid>
                )}
              </React.Fragment>
            </Grid>
          </CardContainer>
        </div>
        <Grid container item xs={12} justifyContent="center">
          <Box p={2}>
            <RegularButton color="primary" onClick={this.handleDownload}>
              Download Receipt
            </RegularButton>
          </Box>
        </Grid>
      </div>
    )
  }
}

export default PaymentInfo
