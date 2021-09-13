import { Grid } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import RegularButton from '../../components/CustomButtons/Button'
import { createdDateTime } from '../../utils/Utils'
class QueryApi extends React.Component {
  constructor() {
    super()
    this.state = {
      checksumVal: null,
      tId: null,
    }
  }

  componentDidMount() {}

  handleSubmit = () => {
    // const str = `0122|${config.MERCHANTID}|${this.state.tId}|${createdDateTime(
    //   new Date().getTime(),
    //   1,
    //   'yyyymmddhhmmss'
    // )}`
    const f = new FormData()
    f.append('requestType', '0122')
    f.append('transactionId', this.state.tId)
    f.append('time', createdDateTime(new Date().getTime(), 1, 'yyyymmddhhmmss'))
    FormApi.queryPayment(f)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleChange = (event) => {
    this.setState({ tId: event.target.value })
  }

  render() {
    const { tId } = this.state
    return (
      <div className="childContainer">
        <CardContainer heading="Payment">
          <Grid container spacing={2}>
            <input name="tId" value={tId} onChange={this.handleChange} />
            <Grid container item xs={12} justifyContent="center">
              <RegularButton color="primary" onClick={this.handleSubmit}>
                Make Payment
              </RegularButton>
            </Grid>
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default withRouter(QueryApi)
