import {
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { Component } from 'react'
import DateBuilder from '../../common/DateBuilder'
import RegularButton from '../../components/CustomButtons/Button'
import { addErrorMsg, checkFaculty } from '../../utils/Utils'
import yearsStatic from '../StudentSrc/StaticData/admissionYears.json'
import categoryData from '../StudentSrc/StaticData/category.json'
import courseTypeData from '../StudentSrc/StaticData/courseType.json'
import facultyData from '../StudentSrc/StaticData/faculty.json'
import majorSubjectsData from '../StudentSrc/StaticData/majorSubjects.json'
import statusStatic from './status.json'

class Filters extends Component {
  constructor() {
    super()
    this.state = {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      courseType: '',
      admissionYear: '',
      selection: '',
      category: '',
      regNo: '',
      fromDate: '',
      toDate: '',
      status: '',
      faculty: '',
      major1: [],
    }
  }

  handleClearFilters = () => {
    this.setState(
      {
        courseType: '',
        admissionYear: '',
        selection: '',
        category: '',
        regNo: '',
        fromDate: '',
        toDate: '',
        status: '',
        faculty: '',
        major1: [],
      },
      () => {
        this.props.handleUpdate()
      }
    )
  }

  handleChangeFields = (value) => (event) => {
    if (value === 0) {
      if (event.target.name === 'faculty') {
        this.setState({
          [event.target.name]: event.target.value,
          major1: [],
        })
      } else {
        this.setState({
          [event.target.name]: event.target.value,
        })
      }
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
    const {
      courseType,
      admissionYear,
      selection,
      category,
      regNo,
      fromDate,
      toDate,
      status,
      faculty,
      major1,
    } = this.state
    if (
      !this.props.excel ||
      (courseType &&
        ((admissionYear === '1' && selection) || admissionYear !== '1') &&
        faculty &&
        status &&
        category &&
        ((checkFaculty(faculty) === 1 && major1.length > 0) ||
          (checkFaculty(faculty) !== 1 && major1.length === 0)))
    ) {
      this.props.handleUpdate(
        courseType,
        admissionYear,
        selection === 'all' ? null : selection,
        category === 'all' ? null : category,
        status === 'all' ? null : status,
        faculty,
        major1.length > 0 ? major1[0].subjectId : null,
        regNo,
        fromDate,
        toDate
      )
    } else {
      addErrorMsg(
        'Please Select Course Type, Admission Year, Selection Type, Faculty/Course, Form Status and Category'
      )
    }
  }

  filterMajorSubjects = () => {
    const { faculty, major1, admissionYear } = this.state

    let subjects = majorSubjectsData.filter(
      (item) => item.year.includes(admissionYear) && item.facultyId === faculty
    )
    major1.map((item) => {
      let index = subjects.findIndex((itm) => item.subjectId === itm.subjectId)
      subjects.splice(index, 1)
    })
    if (major1.length > 0 && faculty === 'f2Arts') {
      if (major1[0].subjectId === '$s7dss') {
        let i = subjects.findIndex(
          (item) => item.subjectId === '$s10Phylosophy'
        )
        subjects.splice(i, 1)
        return subjects
      } else if (major1[0].subjectId === '$s10Phylosophy') {
        let i = subjects.findIndex((item) => item.subjectId === '$s7dss')
        subjects.splice(i, 1)
        return subjects
      } else {
        return subjects
      }
    } else {
      return subjects
    }
  }

  handleMultiDropDownData = (event, value) => {
    let { faculty } = this.state
    if (value.length === 0) {
      this.setState({
        major1: [],
      })
    } else {
      if (checkFaculty(faculty) > 0) {
        if (value.length <= 1) {
          this.setState({
            major1: value,
          })
        } else {
          addErrorMsg('You can select only 1 subjects.')
        }
      } else if (checkFaculty(faculty) === -1) {
        if (value.length <= 3) {
          let combination = ['s43HindiLit', 's44SanskritLit', 's45EnglishLit']
          value.map((item) => {
            if (combination.includes(item.subjectId)) {
              combination.splice(combination.indexOf(item.subjectId), 1)
            }
          })
          if (combination.length === 0) {
            addErrorMsg('This Combination is Not Allowed')
          } else {
            this.setState({
              major1: value,
            })
          }
        } else {
          addErrorMsg('You can select only 3 subjects.')
        }
      } else {
        if (value.length <= 2) {
          this.setState({
            major1: value,
          })
        } else {
          addErrorMsg('You can select only 2 subjects.')
        }
      }
    }
  }

  render() {
    const {
      year,
      month,
      courseType,
      admissionYear,
      selection,
      category,
      regNo,
      fromDate,
      toDate,
      status,
      faculty,
      major1,
    } = this.state
    const { excel } = this.props
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Select the below options to get filtered data according to the
            selected options. Press <b>"CLEAR"</b> button to remove all applied
            filters.
          </Typography>
          <Divider />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            select
            label="Course Type"
            value={courseType}
            onChange={this.handleChangeFields(0)}
            variant="outlined"
            name="courseType"
          >
            {courseTypeData.map((item, key) => (
              <MenuItem key={key} value={item.courseTypeId}>
                {item.courseType}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            select
            fullWidth
            variant="outlined"
            name="admissionYear"
            label="Admission Year"
            value={admissionYear}
            onChange={this.handleChangeFields(0)}
          >
            {courseType &&
              yearsStatic.map(
                (item, i) =>
                  item.courseType.includes(courseType) && (
                    <MenuItem key={i} value={item.yearId}>
                      {item.year}
                    </MenuItem>
                  )
              )}
          </TextField>
        </Grid>
        <Grid item xs={checkFaculty(faculty) === 1 ? 6 : 12}>
          <TextField
            select
            fullWidth
            label="Select Faculty"
            variant="outlined"
            name="faculty"
            value={faculty}
            onChange={this.handleChangeFields(0)}
          >
            {facultyData.map(
              (item, key) =>
                item.year.includes(admissionYear) &&
                item.courseType === courseType && (
                  <MenuItem key={key} value={item.facultyId}>
                    {item.faculty}
                  </MenuItem>
                )
            )}
          </TextField>
        </Grid>
        {faculty && checkFaculty(faculty) === 1 && (
          <Grid item xs={6}>
            <Autocomplete
              value={major1}
              onChange={this.handleMultiDropDownData}
              multiple
              name="major1"
              options={this.filterMajorSubjects(faculty)}
              getOptionLabel={(option) => option.subjectName}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  label="Select Subject / Course"
                  {...params}
                  variant="outlined"
                />
              )}
            />
          </Grid>
        )}
        {admissionYear === '1' && (
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              variant="outlined"
              name="selection"
              label="Select Student Selection Type"
              value={selection}
              onChange={this.handleChangeFields(0)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="selectedWithPayment">
                Selected students those done the course payment
              </MenuItem>
              <MenuItem value="selectedWithoutPayment">
                Selected students those not done the course payment
              </MenuItem>
              <MenuItem value="nonSelected">Non-selected students</MenuItem>
            </TextField>
          </Grid>
        )}
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
            <MenuItem value="all">All</MenuItem>
            {admissionYear &&
              statusStatic.map(
                (item, i) =>
                  item.year.includes(admissionYear) && (
                    <MenuItem key={i} value={item.value}>
                      {item.status}
                    </MenuItem>
                  )
              )}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            variant="outlined"
            name="category"
            label="Category"
            value={category}
            onChange={this.handleChangeFields(0)}
          >
            <MenuItem key="all" value="all">
              All
            </MenuItem>
            {categoryData.map((item, key) => (
              <MenuItem key={key} value={item.categoryId}>
                {item.category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {!excel && (
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
        )}
        {!excel && (
          <Grid item sm={6} xs={12}>
            <Typography variant="overline">To Date</Typography>
            <DateBuilder
              name="toDate"
              minDate={
                new Date(
                  year,
                  new Date(fromDate).getMonth(),
                  new Date(fromDate).getDate()
                )
              }
              selected={toDate}
              showMonthDropdown
              showYearDropdown
              dateFormat="dd/MM/yyyy"
              handleChange={this.handleChangeFields(1)}
            />
          </Grid>
        )}
        {!excel && (
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
        )}
        <Grid container item xs={6} justifyContent="flex-end">
          <RegularButton color="primary" onClick={this.handleSearch}>
            {excel ? 'SUBMIT' : 'SEARCH'}
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
