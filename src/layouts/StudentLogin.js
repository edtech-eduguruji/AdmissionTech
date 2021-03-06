import { Divider } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CakeIcon from '@material-ui/icons/Cake'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'
import { saveAs } from 'file-saver'
import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoginApi from '../apis/LoginApi'
import LocalStorage from '../common/LocalStorage'
import Card from '../components/Card/Card'
import CardBody from '../components/Card/CardBody'
import RegularButton from '../components/CustomButtons/Button'
import CustomInput from '../components/CustomInput/CustomInput'
import { ASSETS } from '../constants/Constants'
import React from 'react'

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
    marginTop: 20,
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
    LoginApi.userLogin(data)
      .then((response) => {
        if (response.data) {
          LocalStorage.setUser(response.data)
          this.props.history.push('/student')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleChangeFields = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  }

  handleDownload = () => {
    saveAs(`./${ASSETS.STUDENTPERFORMA}`, 'STUDENTPERFORMA')
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className="center">
            <img alt="logo" src="agracollege.png" className={classes.logo} />
            <Typography variant="h4">
              SESSION <b>2021-22</b>
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card cardFullHeight>
                <CardBody>
                  <Typography variant="h6">Important Instructions</Typography>
                  <Typography>
                    <ul>
                      <li>
                        If you don't remember your 'REGISTERED ID' then click
                        the button 'FORGOT REGISTRATION'
                      </li>
                      <li>
                        Candidate has to register on university website
                        (mandatory)
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
            <Grid item xs={12}>
              <Card cardFullHeight>
                <CardBody>
                  <Typography variant="h6">Announcement</Typography>
                  <Typography>
                    <ul>
                      <li>
                        <a href="#">
                          <Typography
                            color="primary"
                            onClick={this.handleDownload}
                          >
                            Student Proforma for UP Govt. Tablet/smart phone
                            distribution scheme (NEW - 1 Nov, 2021)
                          </Typography>
                        </a>
                      </li>
                      <li>
                        PLEASE DO NOT EMAIL US, IF YOU DON'T HAVE FORM RELATED
                        ISSUE
                      </li>
                      <li>
                        1st, 2nd and 3rd Year Admission for courses{' '}
                        <b>
                          B.Sc, BA, BCOM, BBA, BCA, Bsc(BioTech) and
                          Post-Graduation
                        </b>{' '}
                        are closed now.
                      </li>
                      <li>
                        1st Year Admission for courses{' '}
                        <b>B.A.LLB, LLB and LLM</b> are closed now.
                      </li>
                      <li>
                        All students who submitted online application form
                        please download the form and take print out.
                      </li>
                      <li>
                        For any other general enquiry like merit issue, last
                        date or any other problem. Kindly check with college
                        department
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
                    For Registered Users
                  </Typography>
                  <div className={classes.form} noValidate>
                    <Grid container spacing={2} alignItems="center">
                      <Grid container item xs={2} justifyContent="center">
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
                      <Grid container item xs={2} justifyContent="center">
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
                      <Grid container item xs={12} justifyContent="center">
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
                    <Grid container item xs={12} justifyContent="center">
                      <Typography component="h1" variant="h6">
                        New User Registration for Admission
                      </Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                      <RegularButton
                        color="primary"
                        variant="contained"
                        className="sub"
                        onClick={() => this.props.history.push('/register')}
                      >
                        Registration
                      </RegularButton>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                      <Typography component="h1" variant="h6">
                        Forgot Registration Details ?
                      </Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
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
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                      <Typography component="h1" variant="h6">
                        View and Download Payment Receipts
                      </Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                      <RegularButton
                        color="primary"
                        variant="contained"
                        className="sub"
                        onClick={() =>
                          this.props.history.push('/searchreceipts')
                        }
                      >
                        Click Here
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
