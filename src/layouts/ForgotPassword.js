import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CakeIcon from '@material-ui/icons/Cake'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ForgotApi from '../apis/ForgotApi'
import Card from '../components/Card/Card'
import CardBody from '../components/Card/CardBody'
import RegularButton from '../components/CustomButtons/Button'
import CustomInput from '../components/CustomInput/CustomInput'
import { addErrorMsg } from '../utils/Utils'

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(5),
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

class ForgotPassword extends Component {
  constructor() {
    super()
    this.state = {
      phone: '',
      dob: '',
    }
  }
  handleSubmit = () => {
    this.handleSubmitDetails()
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmitDetails()
    }
  }

  handleSubmitDetails = () => {
    const { phone, dob } = this.state
    const data = {
      phone: phone,
      dob: dob,
    }
    if (phone !== '' && dob !== '') {
      ForgotApi.forgotRegistration(data)
    } else {
      addErrorMsg('Fields cannot be empty')
    }
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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="center">
            <img alt="logo" src="agracollege.png" className={classes.logo} />
          </div>
          <Card cardFullHeight>
            <CardBody elevation={2} className={classes.paper}>
              <Typography component="h1" variant="h6">
                Enter the Details Below
              </Typography>
              <div className={classes.form} noValidate>
                <Grid container spacing={2} alignItems="center">
                  <Grid container item xs={2} justifyContent="center">
                    <ConfirmationNumberIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <CustomInput
                      labelText="Mobile No"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'phone',
                        type: 'number',
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
                      Submit
                    </RegularButton>
                  </Grid>
                </Grid>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    )
  }
}

export default withRouter(withStyles(useStyles)(ForgotPassword))
