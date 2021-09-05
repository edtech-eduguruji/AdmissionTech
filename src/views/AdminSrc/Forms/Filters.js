import {
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { Component } from 'react'
import DateBuilder from '../../../common/DateBuilder'
import RegularButton from '../../../components/CustomButtons/Button'
import facultyData from '../../StudentSrc/StaticData/faculty.json'

class Filters extends Component {
  constructor() {
    super()
    this.state = {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      regNo: '',
      fromDate: '',
      toDate: '',
      status: '',
      faculty: '',
    }
  }

  handleClearFilters = () => {
    this.setState(
      {
        regNo: '',
        fromDate: '',
        toDate: '',
        status: '',
        faculty: '',
      },
      () => {
        this.props.handleUpdate()
      }
    )
  }

  handleChangeFields = (value) => (event) => {
    if (value === 0) {
      this.setState({
        [event.target.name]: event.target.value,
      })
    } else {
      const { year, month } = this.state
      var date = new Date(event.target.value).getDate()
      this.setState({
        [event.target.name]: event.target.value.getTime(),
        toDate: new Date(year, month, date).getTime(),
      })
    }
  }

  handleSearch = () => {
    const { regNo, fromDate, toDate, status, faculty } = this.state
    this.props.handleUpdate(regNo, fromDate, toDate, status, faculty)
  }

  render() {
    const { year, month, date, regNo, fromDate, toDate, status, faculty } =
      this.state
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Select the below options to get filtered data according to the
            selected options and Press <b>"CLEAR"</b> button to remove all
            applied filters.
          </Typography>
          <Divider />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Typography variant="overline">From Date</Typography>
          <DateBuilder
            name="fromDate"
            selected={fromDate}
            showMonthDropdown
            showYearDropdown
            dateFormat="dd/MM/yyyy"
            handleChange={this.handleChangeFields(1)}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Typography variant="overline">To Date</Typography>
          <DateBuilder
            name="toDate"
            minDate={new Date(year, month, new Date(fromDate).getDate())}
            selected={toDate}
            showMonthDropdown
            showYearDropdown
            dateFormat="dd/MM/yyyy"
            handleChange={this.handleChangeFields(1)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by Registration No."
            name="regNo"
            value={regNo}
            onChange={this.handleChangeFields(0)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Form Status"
            variant="outlined"
            name="status"
            value={status}
            onChange={this.handleChangeFields(0)}
          >
            <MenuItem value="submittedForms">Submitted Forms</MenuItem>
            <MenuItem value="paymentDone">Payment Done</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Select Faculty"
            variant="outlined"
            name="faculty"
            value={faculty}
            onChange={this.handleChangeFields(0)}
          >
            {facultyData.map((item, key) => (
              <MenuItem key={key} value={item.facultyId}>
                {item.faculty}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid container item xs={6} justifyContent="flex-end">
          <RegularButton color="primary" onClick={this.handleSearch}>
            SEARCH
          </RegularButton>
        </Grid>
        <Grid item xs={6}>
          <RegularButton color="danger" onClick={this.handleClearFilters}>
            CLEAR
          </RegularButton>
        </Grid>
      </Grid>
    )
  }
}

export default Filters
