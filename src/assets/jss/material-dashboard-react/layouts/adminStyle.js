import {
  container,
  drawerWidth,
  transition,
} from 'assets/jss/material-dashboard-react.js'

const appStyle = (theme) => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  studentPanel: {
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  adminPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    width: 'auto',
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    minHeight: 'calc(100vh - 123px)',
  },
  container: {
    ...container,
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
      paddingLeft: '0',
    },
  },
  map: {
    marginTop: '70px',
  },
})

export default appStyle
