import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import React from 'react'
import RegularButton from '../components/CustomButtons/Button'

class ClassDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: props.hidden,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      hidden: props.hidden,
    })
  }

  render() {
    const { hidden } = this.state
    return (
      <div>
        {hidden ? (
          <RegularButton
            size="sm"
            color="transparent"
            onClick={this.props.handleViewPassword}
          >
            <VisibilityOffIcon />
          </RegularButton>
        ) : (
          <RegularButton
            size="sm"
            color="transparent"
            onClick={this.props.handleViewPassword}
          >
            <VisibilityIcon />
          </RegularButton>
        )}
      </div>
    )
  }
}

export default ClassDropDown
