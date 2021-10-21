import { Box, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import LoginApi from '../../../apis/LoginApi'
import CardContainer from '../../../common/CardContainer'
import PasswordVisibility from '../../../common/PasswordVisibility'
import RegularButton from '../../../components/CustomButtons/Button'
import CustomInput from '../../../components/CustomInput/CustomInput'
import { addErrorMsg } from '../../../utils/Utils'

function ChangePassword(props) {
  const [fields, setFields] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    hidden1: false,
    hidden2: false,
    hidden3: false,
  })

  const handleChangeFields = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = fields
    if (oldPassword !== '' && newPassword !== '' && confirmPassword !== '') {
      if (newPassword === confirmPassword) {
        const data = new FormData()
        data.append('oldPassword', oldPassword)
        data.append('password', confirmPassword)
        LoginApi.changePassword(data).then((response) => {
          if (!response.data.isError) {
            setFields({
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
              hidden1: false,
              hidden2: false,
              hidden3: false,
            })
          }
        })
      } else {
        addErrorMsg('Entered passwords does not match')
      }
    } else {
      addErrorMsg('Please fill empty fields')
    }
  }

  const handleViewPassword = (value) => {
    setFields({ ...fields, [value]: !fields[value] })
  }

  const {
    hidden1,
    hidden2,
    hidden3,
    oldPassword,
    newPassword,
    confirmPassword,
  } = fields
  return (
    <CardContainer heading={props.currentRoute.name}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <div className="alignCenter">
            <CustomInput
              labelText="Old Password"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: hidden1 ? 'text' : 'password',
                name: 'oldPassword',
                value: oldPassword,
              }}
              isMandatory
              handleChange={handleChangeFields}
            />
            <PasswordVisibility
              hidden={hidden1}
              handleViewPassword={() => handleViewPassword('hidden1')}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="alignCenter">
            <CustomInput
              labelText="New Password"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: hidden2 ? 'text' : 'password',
                name: 'newPassword',
                value: newPassword,
              }}
              handleChange={handleChangeFields}
            />
            <PasswordVisibility
              hidden={hidden2}
              handleViewPassword={() => handleViewPassword('hidden2')}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="alignCenter">
            <CustomInput
              labelText="Confirm Password"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: hidden3 ? 'text' : 'password',
                name: 'confirmPassword',
                value: confirmPassword,
              }}
              handleChange={handleChangeFields}
            />
            <PasswordVisibility
              hidden={hidden3}
              handleViewPassword={() => handleViewPassword('hidden3')}
            />
          </div>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Box pt="20px">
            <RegularButton color="primary" onClick={handleSubmit}>
              Save
            </RegularButton>
          </Box>
        </Grid>
      </Grid>
    </CardContainer>
  )
}

export default ChangePassword
