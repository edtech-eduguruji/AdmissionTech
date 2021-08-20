import { Divider, Grid, Typography } from '@material-ui/core'
import config from 'myconfig'
import React from 'react'
import { withRouter } from 'react-router-dom'
import uuid from 'react-uuid'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import RegularButton from '../../components/CustomButtons/Button'
import Success from '../../components/Typography/Success'
class MakePayment extends React.Component {
  constructor() {
    super()
    this.state = {
      checksumVal: null,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      //downloadPdf('p1234', 'RID')
    }, 3000)

    const userId = LocalStorage.getUser().user_id
    const na = 'NA'
    const str = `${
      config.MERCHANTID
    }|${uuid()}|${na}|252.00|${na}|${na}|${na}|INR|NA|R|${
      config.SECURITYID
    }|${na}|${na}|F|F1SCIENCE|${userId}|${na}|${na}|${na}|${na}|${na}|${
      config.RESPONSEURL
    }`
    const f = new FormData()
    f.append('str', str)
    FormApi.createCheckSum(f).then((res) => {
      if (res.status === 200 && res.data) {
        const checksumVal = `${str}|${res.data}`
        this.setState({ checksumVal })
      }
    })
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
    // config
    //     MerchantID|UniqueTxnID|NA|TxnAmount|NA|NA|NA|CurrencyType|NA|TypeField1|SecurityID|NA|N
    // A|TypeField2|txtadditional1|txtadditional2|txtadditional3|txtadditional4|txtadditional5|txtadditional6
    // |txtadditional7|RU
    // errorDialog(
    //   'Due to technical failure, payment process cannot be completed at this moment. Try again later'
    // )
    //     f.delete('str')
    //         f.append('msg', checksumVal)
    //         FormApi.doPayment(f).then((res)=>{
    // console.log(res);
    //         })
  }

  render() {
    const { checksumVal } = this.state
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
              <form
                method="post"
                action={config.PAYMENTAPI}
                encType="application/x-www-form-urlencoded"
              >
                <input hidden name="msg" value={checksumVal} />
                <RegularButton
                  type="submit"
                  color="primary"
                  disabled={checksumVal ? false : true}
                >
                  Make Payment
                </RegularButton>
              </form>
            </Grid>
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default withRouter(MakePayment)
