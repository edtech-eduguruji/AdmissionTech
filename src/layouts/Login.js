import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { FingerprintOutlined } from '@material-ui/icons'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import LoginApi from 'apis/LoginApi'
import LocalStorage from 'common/LocalStorage'
import { ROLES_KEY } from 'constants/Constants'
import config from 'myconfig'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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
  }
})

class Login extends Component {
  handleSubmit = () => {
    this.handleLogin()
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleLogin()
    }
  }

  handleLogin = () => {
    const {username, password}=this.state
    const data = {
      username: username,
      password: password,
    }
    LoginApi.userLogin(data)
      .then((response) => {
        if (response && response.status === 200 && response.data.length > 0) {
          let user = response.data[0]
          if (config.ROLES.includes(user.role)) {
            return user
          } else {
            throw new Error('Login details are invalid.')
          }
        }
      })
      .then((user) => {
        if (user) {
          LocalStorage.setUser(user)
          if (user.role === ROLES_KEY.STUDENT) {
            this.props.history.push('/student')
          } else {
            this.props.history.push('/admin')
          }
        }
      })
      .catch((err) => {
        addErrorMsg(err.message)
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
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="center">
              <img
                alt="logo"
                src='agracollege.png'
                className={classes.logo}
              />
            </div>
            <Card>
              <CardBody elevation={2} className={classes.paper}>
                <Typography component="h1" variant="h5">
                  LOGIN
                </Typography>
                <div className={classes.form} noValidate>
                  <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={2}>
                      <EmailOutlinedIcon />
                    </Grid>
                    <Grid item xs={10}>
                      <CustomInput
                        labelText="Username / Mobile"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'username',
                          onKeyDown: this.handleKeyDown,
                        }}
                        handleChange={this.handleChangeFields}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <FingerprintOutlined />
                    </Grid>
                    <Grid item xs={10}>
                      <CustomInput
                        labelText="Password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'password',
                          name: 'password',
                          onKeyDown: this.handleKeyDown,
                        }}
                        handleChange={this.handleChangeFields}
                      />
                    </Grid>
                    <Grid container item xs={8} justify='flex-end'>
                    <RegularButton
                      color="primary"
                      variant="contained"
                      className="sub"
                      onClick={this.handleSubmit}
                    >
                      SIGN IN
                    </RegularButton>
                    </Grid>
                  <Grid container item xs={4} justify='flex-end'>
                   <RegularButton color='transparent' size='sm'    
                   onClick={()=> this.props.history.push('/Register')}>Register ?</RegularButton>
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

export default withRouter(withStyles(useStyles)(Login))
