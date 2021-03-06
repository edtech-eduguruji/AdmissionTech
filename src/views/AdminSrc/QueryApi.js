import { FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import RegularButton from '../../components/CustomButtons/Button'
import { createdDateTime } from '../../utils/Utils'
import PaymentHistory from '../StudentSrc/PaymentHistory'
class QueryApi extends React.Component {
  constructor() {
    super()
    this.state = {
      checksumVal: null,
      tId: null,
      uRId: null,
      registrationNo: null,
      queryOutput: null,
      formDetails: null,
      formSelectionGroup: 'submitted',
    }
  }

  componentDidMount() {}

  handleSubmit = (inputVal) => (event) => {
    debugger
    const { registrationNo, formDetails, formSelectionGroup } = this.state
    if (inputVal == 0) {
      FormApi.queryPayment({ registrationNo }, 'GET')
        .then((res) => {
          this.setState({ queryOutput: res.data })
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (inputVal == 1) {
      const f = new FormData()
      f.append('requestType', '0122')
      f.append('transactionId', this.state.tId)
      f.append(
        'time',
        createdDateTime(new Date().getTime(), 1, 'yyyymmddhhmmss')
      )
      f.append('updateForm', '1')
      FormApi.queryPayment(f)
        .then((res) => {
          this.setState({ queryOutput: res.data })
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (inputVal == 2) {
      let fdata = new FormData()
      fdata.append('updateForm', '2')
      fdata.append('formSelectionGroup', formSelectionGroup)
      fdata.append(
        'time',
        createdDateTime(new Date().getTime(), 1, 'yyyymmddhhmmss')
      )

      if (formSelectionGroup == 'Academic') {
        if (JSON.parse(formDetails)) {
          const formInput = JSON.parse(formDetails)
          for (var i in formInput) {
            fdata.append(`${i}`, this.verifyString(formInput[i]))
          }
        }
      } else if (formSelectionGroup == 'Major1') {
        if (JSON.parse(formDetails)) {
          const formInput = JSON.parse(formDetails)
          for (var i in formInput) {
            fdata.append(`${i}`, this.verifyString(formInput[i]))
          }
        }
      } else if (formSelectionGroup == 'Major2') {
        if (JSON.parse(formDetails)) {
          const formInput = JSON.parse(formDetails)
          for (var i in formInput) {
            fdata.append(`${i}`, this.verifyString(formInput[i]))
          }
        }
      } else if (formSelectionGroup == 'Signature') {
        if (JSON.parse(formDetails)) {
          const formInput = JSON.parse(formDetails)
          for (var i in formInput) {
            fdata.append(`${i}`, this.verifyString(formInput[i]))
          }
        }
      } else if (formSelectionGroup == 'Category') {
        if (JSON.parse(formDetails)) {
          const formInput = JSON.parse(formDetails)
          for (var i in formInput) {
            fdata.append(`${i}`, this.verifyString(formInput[i]))
          }
        }
      } else if (formSelectionGroup == 'PaymentTable') {
        fdata.append('PaymentTable', formDetails)
      } else if (formSelectionGroup == 'Submitted') {
        if (JSON.parse(formDetails)) {
          const formInput = JSON.parse(formDetails)
          for (var i in formInput) {
            fdata.append(`${i}`, this.verifyString(formInput[i]))
          }
        }
      }

      FormApi.queryPayment(fdata)
        .then((res) => {
          // this.setState({ queryOutput: res.data })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  verifyString = (text) => {
    return text.replace(/[\n\r\s\t']+/g, ' ')
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { tId, uRId, queryOutput, registrationNo, formDetails } = this.state
    return (
      <div className="childContainer">
        <CardContainer heading="Payment">
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <label>Enter registrationNo to check all payment details</label>
              <input
                name="registrationNo"
                value={registrationNo}
                placeholder="Enter registrationNo"
                onChange={this.handleChange}
              />
              <PaymentHistory userId={registrationNo} />
              <Grid container item xs={12} justifyContent="center">
                <RegularButton color="primary" onClick={this.handleSubmit(0)}>
                  Update transaction via QueryApi
                </RegularButton>
              </Grid>
            </Grid>
            <Grid item lg={6}>
              <label>Enter transaction id to check details</label>
              <input
                name="tId"
                value={tId}
                placeholder="Enter transaction id"
                onChange={this.handleChange}
              />
              <Grid container item xs={12} justifyContent="center">
                <RegularButton color="primary" onClick={this.handleSubmit(1)}>
                  Submit
                </RegularButton>
              </Grid>
              <br />
            </Grid>
          </Grid>
          <label>Output</label> <br />
          {queryOutput}
        </CardContainer>
        <br />
        <CardContainer heading="Payment">
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <label>Enter Registration no to check details</label>
              <RadioGroup
                defaultValue="Submitted"
                name="formSelectionGroup"
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="Submitted"
                  control={<Radio />}
                  label="Submitted"
                />
                <FormControlLabel
                  value="Major1"
                  control={<Radio />}
                  label="Major1"
                />
                <FormControlLabel
                  value="Major2"
                  control={<Radio />}
                  label="Major2"
                />
                <FormControlLabel
                  value="Signature"
                  control={<Radio />}
                  label="Signature"
                />
                <FormControlLabel
                  value="Category"
                  control={<Radio />}
                  label="Category"
                />
                <FormControlLabel
                  value="PaymentTable"
                  control={<Radio />}
                  label="PaymentTable"
                />
                <FormControlLabel
                  value="Academic"
                  control={<Radio />}
                  label="Academic"
                />
              </RadioGroup>
              <input
                name="tId"
                value={uRId}
                placeholder="Enter user reg id"
                onChange={this.handleChange}
              />
              <textarea
                rows={6}
                name="formDetails"
                value={formDetails}
                placeholder="Enter form details"
                onChange={this.handleChange}
              />
              <Grid container item xs={12} justifyContent="center">
                <RegularButton color="primary" onClick={this.handleSubmit(2)}>
                  Submit
                </RegularButton>
              </Grid>
              <br />
            </Grid>
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default withRouter(QueryApi)
