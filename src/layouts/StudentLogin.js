import { Divider } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CakeIcon from '@material-ui/icons/Cake'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoginApi from '../apis/LoginApi'
import LocalStorage from '../common/LocalStorage'
import Card from '../components/Card/Card'
import CardBody from '../components/Card/CardBody'
import RegularButton from '../components/CustomButtons/Button'
import CustomInput from '../components/CustomInput/CustomInput'

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  logo: {
    marginTop: 50,
    width: '100px',
    height: '100px',
  },
})

class Login extends Component {
  constructor() {
    super()
    this.state = {
      registrationNo: null,
      dob: null,
    }
  }
  handleSubmit = () => {
    this.handleLogin()
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleLogin()
    }
  }

  handleLogin = () => {
    const { registrationNo, dob } = this.state
    const data = {
      username: registrationNo,
      password: dob,
    }
    LoginApi.userLogin(data).then((response) => {
      if (response.data && response.data.length > 0) {
        LocalStorage.setUser(response.data[0])
        this.props.history.push('/form')
      }
    })
  }

  handleChangeFields = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
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
                  <Typography variant="h6">Important Instructions</Typography>
                  <Typography>
                    <ul>
                      <li>
                        If you didn't remember your 'REGISTERED ID' then click
                        the button 'FORGET REGISTRATION'
                      </li>
                      <li>
                        Candidate has to First Register with University Website,
                        Univerirty Web Registration is Compulsary
                      </li>
                      <li>A Unique Registration Number will be Provided</li>
                      <li>For Registration Adhar Number is Compulsary</li>
                      <li>Disable Popup blocker</li>
                      <li>
                        Here registration fees Rs. 252/- will be submitted
                        online
                      </li>
                    </ul>
                  </Typography>
                </CardBody>
              </Card>
            </Grid>
            <Grid item md={6} lg={6}>
              <Card cardFullHeight>
                <CardBody className={classes.paper}>
                  <Typography component="h1" variant="h6">
                    For already registered users
                  </Typography>
                  <div className={classes.form} noValidate>
                    <Grid container spacing={2} alignItems="center">
                      <Grid container item xs={2} justify="center">
                        <ConfirmationNumberIcon />
                      </Grid>
                      <Grid item xs={10}>
                        <CustomInput
                          labelText="Registration No"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'registrationNo',
                            onKeyDown: this.handleKeyDown,
                          }}
                          handleChange={this.handleChangeFields}
                        />
                      </Grid>
                      <Grid container item xs={2} justify="center">
                        <CakeIcon />
                      </Grid>
                      <Grid item xs={10}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: 'date',
                            name: 'dob',
                            onKeyDown: this.handleKeyDown,
                            helperText: 'Date of Birth',
                          }}
                          handleChange={this.handleChangeFields}
                        />
                      </Grid>
                      <Grid container item xs={12} justify="center">
                        <RegularButton
                          color="primary"
                          variant="contained"
                          className="sub"
                          onClick={this.handleSubmit}
                        >
                          SIGN IN
                        </RegularButton>
                      </Grid>
                    </Grid>
                  </div>
                </CardBody>
              </Card>
            </Grid>
            <Grid item md={6} lg={6}>
              <Card cardFullHeight>
                <CardBody className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid container item xs={12} justify="center">
                      <Typography component="h1" variant="h6">
                        New User Registration for Admission
                      </Typography>
                    </Grid>
                    <Grid container item xs={12} justify="center">
                      <RegularButton
                        color="primary"
                        variant="contained"
                        className="sub"
                        onClick={() => this.props.history.push('/form')}
                      >
                        Registration
                      </RegularButton>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid container item xs={12} justify="center">
                      <Typography component="h1" variant="h6">
                        Forgot Registration Details ?
                      </Typography>
                    </Grid>
                    <Grid container item xs={12} justify="center">
                      <RegularButton
                        color="primary"
                        variant="contained"
                        className="sub"
                        onClick={() =>
                          this.props.history.push('/forgotpassword')
                        }
                      >
                        Forgot Registration No.
                      </RegularButton>
                    </Grid>
                  </Grid>
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default withRouter(withStyles(useStyles)(Login))
