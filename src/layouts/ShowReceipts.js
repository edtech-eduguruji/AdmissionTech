import {
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import LoginApi from '../apis/LoginApi'
import Card from '../components/Card/Card'
import CardBody from '../components/Card/CardBody'
import RegularButton from '../components/CustomButtons/Button'
import CustomInput from '../components/CustomInput/CustomInput'
import { addErrorMsg, NoDataFound } from '../utils/Utils'
import PaymentInfo2 from '../views/StudentSrc/PaymentInfo2'

const styles = () => ({
  logo: {
    marginTop: 30,
    width: '100px',
    height: '100px',
  },
})

const useStyles = makeStyles(styles)

function ShowReceipts() {
  const [fields, setFields] = useState({
    registrationNo: null,
    receiptsData: null,
  })

  const fetchPaymentReceipts = () => {
    if (registrationNo) {
      const data = {
        registrationNo: registrationNo,
      }
      LoginApi.fetchReceipts(data).then((response) => {
        setFields({
          receiptsData: response.data,
        })
      })
    } else {
      addErrorMsg('Please fill empty fields')
    }
  }

  const handleChangeFields = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    })
  }

  const classes = useStyles()
  const { registrationNo, receiptsData } = fields
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className="center">
        <img alt="logo" src="agracollege.png" className={classes.logo} />
      </div>
      <Card cardFullHeight>
        <CardBody elevation={2}>
          <Typography component="h1" variant="h6">
            Search and Download the Payment Receipts
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <CustomInput
                labelText="Registration No"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'registrationNo',
                }}
                handleChange={handleChangeFields}
              />
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <RegularButton
                color="primary"
                variant="contained"
                className="sub"
                onClick={fetchPaymentReceipts}
              >
                SEARCH
              </RegularButton>
            </Grid>
          </Grid>
        </CardBody>
      </Card>
      {receiptsData ? (
        <Card cardFullHeight>
          <CardBody elevation={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <PaymentInfo2 paymentDetails={receiptsData.payment} />
              </Grid>
              <Grid item xs={12} md={6}>
                {receiptsData.courseFee && (
                  <PaymentInfo2 paymentDetails={receiptsData.courseFee} />
                )}
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      ) : (
        NoDataFound()
      )}
    </Container>
  )
}

export default ShowReceipts
