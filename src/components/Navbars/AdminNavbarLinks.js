import { Typography } from '@material-ui/core'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Divider from '@material-ui/core/Divider'
import Grow from '@material-ui/core/Grow'
import Hidden from '@material-ui/core/Hidden'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Poppers from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'
import Person from '@material-ui/icons/Person'
import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js'
import classNames from 'classnames'
import LocalStorage from 'common/LocalStorage'
import Button from 'components/CustomButtons/Button.js'
import { isMobile } from 'mobile-device-detect'
import React from 'react'
import routes from '../../routes'
import { redirectUrl } from '../../utils/Utils'

const useStyles = makeStyles(styles)

export default function AdminNavbarLinks(props) {
  const classes = useStyles()
  const [openProfile, setOpenProfile] = React.useState(null)

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null)
    } else {
      setOpenProfile(event.currentTarget)
    }
  }
  const handleCloseProfile = () => {
    setOpenProfile(null)
  }

  const handleLogout = () => {
    LocalStorage.getLogout()
    window.location.reload()
  }

  const handleMenuItemClick = (id) => () => {
    redirectUrl(id)
    if (isMobile) {
      props.handleDrawerToggle()
    } else {
      handleCloseProfile()
    }
  }

  return (
    <div className={classes.manager}>
      <Typography variant="h6" component="span">
        {props.userName}
      </Typography>
      <Button
        color={window.innerWidth > 959 ? 'transparent' : 'white'}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-owns={openProfile ? 'profile-menu-list-grow' : null}
        aria-haspopup="true"
        onClick={handleClickProfile}
        className={classes.buttonLink}
      >
        <Person className={classes.icons} />
        <Hidden mdUp>
          <p className={classes.linkText}>Profile</p>
        </Hidden>
      </Button>
      <Poppers
        open={Boolean(openProfile)}
        anchorEl={openProfile}
        transition
        disablePortal
        className={
          classNames({ [classes.popperClose]: !openProfile }) +
          ' ' +
          classes.popperNav
        }
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="profile-menu-list-grow"
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseProfile}>
                <MenuList role="menu">
                  {routes.map((item, key) => {
                    if (item.isNavbar) {
                      return (
                        <div key={key}>
                          <MenuItem
                            onClick={handleMenuItemClick(
                              item.layout + item.path
                            )}
                            className={classes.dropdownItem}
                          >
                            {item.name}
                          </MenuItem>
                          <Divider light />
                        </div>
                      )
                    } else {
                      null
                    }
                  })}
                  <MenuItem
                    onClick={handleLogout}
                    className={classes.dropdownItem}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </div>
  )
}
