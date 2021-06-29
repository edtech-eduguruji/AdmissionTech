import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
// @material-ui/icons
import Clear from '@material-ui/icons/Clear'
// core components
import styles from 'assets/jss/material-dashboard-react/components/customInputStyle.js'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Danger from './../Typography/Danger'

const useStyles = makeStyles(styles)

export default function CustomInput(props) {
  const classes = useStyles()
  const [isError, setError] = React.useState(false)
  const [emptyMesaage, setMessage] = React.useState()
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    errorMsg,
    maxLength,
    minLength,
    isHttp,
    isMandatory,
    handleChange,
    isNumber,
  } = props

  const labelClasses = classNames({
    [' ' + classes.labelRootError]: error || isError,
    [' ' + classes.labelRootSuccess]: success && (!error || !isError),
  })
  const underlineClasses = classNames({
    [classes.underlineError]: error || isError,
    [classes.underlineSuccess]: success && (!error || !isError),
    [classes.underline]: true,
  })
  const marginTop = classNames({
    [classes.marginTop]: labelText,
  })

  const formControlClasses = classNames({
    [' ' + classes.formControl]: formControlProps.isForm,
  })

  const onChange = (event) => {
    if (isNumber) {
      if (isNaN(event.target.value)) {
        return
      }
    }
    if (maxLength) {
      if (event.target.value.length > maxLength) {
        setError(true)
        setMessage(errorMsg)
        handleChange(event, true)
      } else {
        handleInput(event)
      }
    } else if (minLength) {
      if (event.target.value.length < minLength) {
        setError(true)
        setMessage(errorMsg)
        handleChange(event, true)
      } else {
        handleInput(event)
      }
    } else {
      if (handleChange) {
        handleChange(event, false)
      }
    }
    if (isHttp) {
      var link = event.target.value
      var check = link.substring(0, 4)
      if (check === 'http' || check === 'HTTP') {
      } else {
        setError(true)
        setMessage(
          'Please Add (http) else (https) before the URL, For Ex:- http://google.com'
        )
      }
    }
  }

  const handleInput = (event) => {
    if (isMandatory && event.target.value.length === 0) {
      setError(true)
      setMessage('This field cannot be blank')
      handleChange(event, true)
    } else {
      setError(false)
      handleChange(event, false)
    }
  }

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + formControlClasses}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
        onChange={onChange}
      />
      {error || isError ? (
        <React.Fragment>
          <Clear className={classes.feedback + ' ' + classes.labelRootError} />
          <Danger>{emptyMesaage}</Danger>
        </React.Fragment>
      ) : success ? (
        <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  )
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object.isRequired,
  error: PropTypes.bool,
  success: PropTypes.bool,
  errorMsg: PropTypes.string,
  isMandatory: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  handleChange: PropTypes.func,
  isNumber: PropTypes.bool,
}
