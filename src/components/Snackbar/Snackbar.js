import IconButton from '@material-ui/core/IconButton'
import Snack from '@material-ui/core/Snackbar'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// @material-ui/icons
import Close from '@material-ui/icons/Close'
// core components
import styles from 'assets/jss/material-dashboard-react/components/snackbarContentStyle.js'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'

const useStyles = makeStyles(styles)

export default function Snackbar(props) {
  const classes = useStyles()
  const { message, color, close, icon, place, rtlActive, renderElement } = props
  var action = []
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined,
  })

  const [open, setClose] = React.useState(true)

  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>,
    ]
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    ReactDOM.unmountComponentAtNode(renderElement)
    setClose(false)
  }

  return (
    <Snack
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
        horizontal:
          place.indexOf('l') !== -1
            ? 'left'
            : place.indexOf('c') !== -1
            ? 'center'
            : 'right',
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: classes.root + ' ' + classes[color],
          message: classes.message,
          action: classNames({ [classes.actionRTL]: rtlActive }),
        },
      }}
      onClose={handleClose}
    />
  )
}

Snackbar.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'primary',
    'black',
  ]),
  close: PropTypes.bool,
  icon: PropTypes.object,
  place: PropTypes.oneOf(['tl', 'tr', 'tc', 'br', 'bl', 'bc']),
  rtlActive: PropTypes.bool,
  closeNotification: PropTypes.func,
}
