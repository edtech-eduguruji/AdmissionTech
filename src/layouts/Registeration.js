import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CallIcon from '@material-ui/icons/Call'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import FingerprintOutlined from '@material-ui/icons/FingerprintOutlined'
import PersonIcon from '@material-ui/icons/Person'
import RegisterApi from 'apis/RegisterApi'
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
  },
})

class Registeration extends Component {
  constructor(){
    super()
    this.state = {
     name: '',
     email: '',
     mobileNo: '',
     password: '',
     confirmPassword: ''
    }
  }
  handleSubmit = () => {
    const { name, email, mobileNo, password, confirmPassword } = this.state
      if (name !== '' && email !== '' && mobileNo !== '' && password !== '' && confirmPassword !== '') {
        if (password === confirmPassword) {
        const data = new FormData()
        data.append('name', name)
        data.append('email', email)
        data.append('mobile', mobileNo)
        data.append('password', password)
        RegisterApi.StudentRegister(data).then((res)=>{
        if(!res.data.error) {
          this.props.history.push('/login')
        }
        })
      } else {
        addErrorMsg('Entered passwords does not match')
      }
    } else{
      addErrorMsg('Please enter all fields')
    }
  }

  handleChangeFields = (event) => {
    this.setState({
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
                Registeration
              </Typography>
              <div className={classes.form} noValidate>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={2}>
                    <PersonIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <CustomInput
                      labelText="Name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'name',
                      }}
                      handleChange={this.handleChangeFields}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <EmailOutlinedIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <CustomInput
                      labelText="Email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'email',
                      }}
                      handleChange={this.handleChangeFields}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <CallIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <CustomInput
                      labelText="Mobile No."
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'mobileNo',
                        type: 'number',
                      }}
                      handleChange={this.handleChangeFields}
                    />
                  </Grid>
                  <Grid item xs={2}>
                      <FingerprintOutlined />
                    </Grid>
                    <Grid item xs={10}>
                      <CustomInput
                        labelText="Enter Password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'password',
                          name: 'password',
                        }}
                        handleChange={this.handleChangeFields}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <FingerprintOutlined />
                    </Grid>
                    <Grid item xs={10}>
                      <CustomInput
                        labelText="Confirm Password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'password',
                          name: 'confirmPassword',
                        }}
                        handleChange={this.handleChangeFields}
                      />
                    </Grid>
                    <Grid container item xs={12} justify='center'>
                    <RegularButton
                    color="primary"
                    variant="contained"
                    className="sub"
                    onClick={this.handleSubmit}
                  >
                    REGISTER
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

export default withRouter(withStyles(useStyles)(Registeration))
