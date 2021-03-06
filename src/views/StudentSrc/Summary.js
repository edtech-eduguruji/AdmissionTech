import { Divider, Grid, Hidden, Typography } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'
import React from 'react'
import { withRouter } from 'react-router-dom'
import CardContainer from '../../common/CardContainer'
import RegularButton from '../../components/CustomButtons/Button'
import { ASSETS } from '../../constants/Constants'
import { redirectUrl } from '../../utils/Utils'
class Summary extends React.Component {
  handleNext = (value) => () => {
    redirectUrl(value, 1)
  }

  render() {
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
                href={`./${ASSETS.PROSPECTUS}`}
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
                  href={`./${ASSETS.PROSPECTUS}`}
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
              <Typography component="div" variant="body1">
                <ul>
                  <li>Download prospectus before proceeding further.</li>
                  <li>
                    Read all the guidelines carefully from the prospectus.
                  </li>
                  <li>
                    Any form related issue kindly email at
                    admissionagracollege@gmail.com
                  </li>
                </ul>
              </Typography>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <RegularButton onClick={this.handleNext('sForm')} color="primary">
                Next
              </RegularButton>
              <br />
              <br />
              <RegularButton
                color="primary"
                onClick={this.handleNext('sPaymentHistory')}
              >
                Payment History
              </RegularButton>
            </Grid>
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default withRouter(Summary)
