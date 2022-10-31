import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../components/Card/Card'
import CardBody from '../components/Card/CardBody'
import RegularButton from '../components/CustomButtons/Button'
import { SESSION } from '../constants/Constants'
import { redirectUrl } from '../utils/Utils'

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    width: '100px',
    height: '100px',
  },
})

class SelectSession extends Component {
  handleRedirect = (value) => {
    if (value === SESSION['2021']) {
      redirectUrl('/login')
    } else {
      window.open('https://admission.agracollegeagra.org.in/2022/', '_self')
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className="center">
            <img alt="logo" src="agracollege.png" className={classes.logo} />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card cardFullHeight>
                <CardBody>
                  <Typography variant="h6">Instructions</Typography>
                  <Typography>
                    <ul>
                      <li>
                        Candidate has to register on university website
                        (MANDATORY)
                      </li>
                      <li>A Unique Registration Number will be Provided</li>
                      <li>
                        Here registration fees Rs. 252/- will be submitted
                        online and which is not refundable (in any case)
                      </li>
                      <li>
                        <Typography color="textPrimary">
                          Any form related issue kindly email at
                          admissionagracollege@gmail.com with your registration
                          no and dob
                        </Typography>
                      </li>
                    </ul>
                  </Typography>
                </CardBody>
              </Card>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Select Session :</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <RegularButton
                  disabled
                  fullWidth
                  color="primary"
                  size="lg"
                  round
                  onClick={() => this.handleRedirect(SESSION['2021'])}
                >
                  2021 - 22 (CLOSED)
                </RegularButton>
              </Grid>
              <Grid item md={6} xs={12}>
                <RegularButton
                  fullWidth
                  color="primary"
                  size="lg"
                  round
                  onClick={() => this.handleRedirect(SESSION['2022'])}
                >
                  2022 - 23
                </RegularButton>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default withRouter(withStyles(useStyles)(SelectSession))
