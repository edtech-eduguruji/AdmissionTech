import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CakeIcon from '@material-ui/icons/Cake'
import CallIcon from '@material-ui/icons/Call'
import PersonIcon from '@material-ui/icons/Person'
import RegisterApi from 'apis/RegisterApi'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LocalStorage from '../common/LocalStorage'
import Card from '../components/Card/Card'
import CardBody from '../components/Card/CardBody'
import RegularButton from '../components/CustomButtons/Button'
import CustomInput from '../components/CustomInput/CustomInput'
import { addErrorMsg, setErrorFields } from '../utils/Utils'

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
  constructor() {
    super()
    this.state = {
      name: '',
      mobileNo: '',
      dob: '',
      errorList: [],
    }
  }
  handleSubmit = () => {
    const { name, mobileNo, dob, errorList } = this.state
    if (!errorList.length) {
      if (name !== '' && mobileNo !== '' && dob !== '') {
        const data = new FormData()
        data.append('name', name)
        data.append('mobile', mobileNo)
        data.append('dob', dob)
        RegisterApi.StudentRegister(data).then((res) => {
          if (res.status === 200 && res.data && !res.data.error) {
            LocalStorage.setUser(res.data)
            this.props.history.push('/student')
          }
        })
      } else {
        addErrorMsg('Please fill all the fields')
      }
    } else {
      addErrorMsg('Please remove errors from all the fields')
    }
  }

  handleChangeFields = (event, isError) => {
    const { errorList } = this.state

    setErrorFields(isError, errorList, event.target.name)
    this.setState({
      errorList,
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className="center">
            <img alt="logo" src="agracollege.png" className={classes.logo} />
          </div>
          <Card>
            <CardBody elevation={2} className={classes.paper}>
              <Typography component="h1" variant="h5">
                Registration
              </Typography>
              <div className={classes.form} noValidate>
                <Grid container spacing={2} alignItems="center">
                  <Grid container item xs={2} justifyContent="center">
                    <PersonIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <CustomInput
                      isMandatory={true}
                      minLength={5}
                      maxLength={20}
                      labelText="Name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'name',
                        helperText:
                          'Name (as per highschool/secondary certificate)',
                      }}
                      handleChange={this.handleChangeFields}
                      errorMsg={'Name must be min. of 5 and max. 20 character'}
                    />
                  </Grid>
                  <Grid container item xs={2} justifyContent="center">
                    <CallIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <CustomInput
                      isMandatory={true}
                      minLength={10}
                      maxLength={10}
                      isNumber={true}
                      labelText="Mobile No."
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: 'mobileNo',
                        type: 'number',
                      }}
                      handleChange={this.handleChangeFields}
                      errorMsg={'Mobile no must be of 10 digit'}
                    />
                  </Grid>
                  <Grid container item xs={2} justifyContent="center">
                    <CakeIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <CustomInput
                      isMandatory={true}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'date',
                        name: 'dob',
                        helperText: 'Date of Birth',
                      }}
                      handleChange={this.handleChangeFields}
                      errorMsg={'Please select your dob'}
                    />
                  </Grid>
                  <Grid container item xs={12} justifyContent="center">
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
