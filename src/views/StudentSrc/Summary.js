import { Divider, Grid, Hidden, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import GetAppIcon from '@material-ui/icons/GetApp'
import React from 'react'
import { withRouter } from 'react-router-dom'
import CardContainer from '../../common/CardContainer'
import LocalStorage from '../../common/LocalStorage'
import RegularButton from '../../components/CustomButtons/Button'
import { PAYMENT } from '../../constants/Constants'
import { redirectUrl } from '../../utils/Utils'

const styles = {}

class Summary extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    if (LocalStorage.getUser().payment === PAYMENT.NOT_DONE) {
      redirectUrl('sPayment', 1)
    }
  }

  handleChangeFields = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className="childContainer">
        <CardContainer
          heading={'Read the Instructions Below'}
          buttons={[
            <Hidden xsDown>
              <RegularButton
                size="sm"
                color="danger"
                target="_blank"
                href="./Prospectus.pdf"
              >
                Download Prospectus &nbsp;&nbsp; <GetAppIcon />
              </RegularButton>
            </Hidden>,
          ]}
        >
          <Grid container spacing={2} alignItems="center" id="form1234">
            <Hidden smUp>
              <Grid container item xs={12} justifyContent="center">
                <RegularButton
                  size="sm"
                  color="danger"
                  target="_blank"
                  href="./Prospectus.pdf"
                >
                  Download Prospectus &nbsp;&nbsp; <GetAppIcon />
                </RegularButton>
              </Grid>
            </Hidden>
            <Grid item xs={12}>
              <Typography variant="h6">
                Please read all the instructions
              </Typography>
              <Divider />
              <Typography variant="caption">
                <ul>
                  <li>Download prospectus form before proceed further.</li>
                  <li>
                    Read all the guidelines carefully from the prospectus form.
                  </li>
                </ul>
              </Typography>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <RegularButton
                onClick={() => redirectUrl('sForm', 1)}
                color="primary"
              >
                Next
              </RegularButton>
            </Grid>
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Summary))
