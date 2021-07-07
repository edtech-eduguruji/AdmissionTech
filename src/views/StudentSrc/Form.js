import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import React from 'react'
import { withRouter } from 'react-router-dom'
import CardContainer from '../../common/CardContainer'
import FileUploader from '../../common/FileUploader/FileUploader'
import RegularButton from '../../components/CustomButtons/Button'
import CustomInput from '../../components/CustomInput/CustomInput'
import { mandatoryField } from '../../utils/Utils'
import PGMerit from './PGMerit'
import academicDetailsStatic from './StaticData/academic.json'
import academicData from './StaticData/academicData.json'
import categoryData from './StaticData/category.json'
import citiesData from './StaticData/cities.json'
import coursesData from './StaticData/courses.json'
import courseTypeData from './StaticData/courseType.json'
import documentsStatic from './StaticData/documents.json'
import facultyData from './StaticData/faculty.json'
import religionData from './StaticData/religion.json'
import statesData from './StaticData/states.json'
import subCategoryData from './StaticData/subCategory.json'
import UGMerit from './UGMerit'

const styles = {
  profilePhoto: {
    width: '120px',
    height: '140px',
  },
  photo: {
    width: '50px',
    height: '50px',
  },
  underline: {
    textDecoration: 'underline',
  },
}

class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      faculty: '',
      courseType: '',
      course: '',
      vaccinated: false,
      nameTitle: '',
      name: '',
      dob: '',
      gender: '',
      caste: '',
      religion: '',
      personalMobile: '',
      parentMobile: '',
      fatherName: '',
      motherName: '',
      parentsOccupation: '',
      wrn: '',
      form: '',
      photo: '',
      houseNo: '',
      street: '',
      pincode: '',
      postOffice: '',
      state: '',
      city: '',
      cHouseNo: '',
      cStreet: '',
      cPincode: '',
      cPostOffice: '',
      cState: '',
      cCity: '',
      aadharNo: '',
      email: '',
      category: '',
      subCategory: '',
      categoryCertificate: '',
      subCategoryCertificate: '',
      academicDetails: [],
      guardianName: '',
      relationOfApplicant: '',
      documents: [],
      nationalCompetition: '',
      nationalCertificate: '',
      ncc: '',
      nccCertificate: '',
      freedomFighter: false,
      ffDocument: '',
      nationalSevaScheme: false,
      nssDocument: '',
      bcom: false,
      other: '',
      totalMeritCount: 0,
      mediumOfInstitution: '',
      signature: '',
    }
  }

  handleUploadPhoto = (file) => {
    this.setState({
      photo: file,
    })
  }

  handleUploadSignature = (file) => {
    this.setState({
      signature: file,
    })
  }

  handleUploadCertificate = (file) => {
    this.setState({
      categoryCertificate: file,
    })
  }

  handleUploadSubCertificate = (file) => {
    this.setState({
      subCategoryCertificate: file,
    })
  }

  handleUploadForm = (file) => {
    this.setState({
      form: file,
    })
  }

  handleChangeFields = (event) => {
    const name = event.target.name
    if (name === 'courseType') {
      if (event.target.value === 'Under Graduate') {
        this.setState({
          academicDetails: academicDetailsStatic.UG,
          documents: documentsStatic.UG,
        })
      } else if (
        event.target.value === 'Post Graduate' ||
        event.target.value === 'LLB'
      ) {
        this.setState({
          academicDetails: academicDetailsStatic.PG,
          documents: documentsStatic.PG,
        })
      } else if (event.target.value === 'LLM') {
        this.setState({
          academicDetails: academicDetailsStatic.LLM,
          documents: documentsStatic.LLM,
        })
      }
    }
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleFieldChecked = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    })
  }

  handleInputChange = (e, index) => {
    const { name, value } = e.target
    const { academicDetails } = this.state
    const list = [...academicDetails]
    list[index][name] = value
    if (name === 'totalMarks' || name === 'marksObtained') {
      if (
        list[index]['totalMarks'] !== '' &&
        list[index]['marksObtained'] !== ''
      ) {
        var totalMarks = list[index]['totalMarks']
        var marksObtained = list[index]['marksObtained']
        var p = (marksObtained / totalMarks) * 100
        list[index]['percentage'] = p + '%'
      }
    }
    this.setState({
      academicDetails: list,
    })
  }

  handleRemoveClick = (index) => {
    const { academicDetails } = this.state
    const list = [...academicDetails]
    list.splice(index, 1)
    this.setState({
      academicDetails: list,
    })
  }

  handleAddClick = () => {
    const { academicDetails } = this.state
    this.setState({
      academicDetails: [...academicDetails, ...academicData.academic],
    })
  }

  handleAddEnclosure = () => {
    const { documents } = this.state
    this.setState({
      documents: [...documents, ...academicData.documents],
    })
  }

  handleRemoveEnclosure = (index) => {
    const { documents } = this.state
    const list = [...documents]
    list.splice(index, 1)
    this.setState({
      documents: list,
    })
  }

  handleInputEnclosure = (e, index) => {
    const { name, value } = e.target
    const { documents } = this.state
    const list = [...documents]
    list[index][name] = value
    this.setState({
      documents: list,
    })
  }

  handleUploadEnclosure = (file, index) => {
    const { documents } = this.state
    const list = [...documents]
    list[index]['document'] = file
    this.setState({
      documents: list,
    })
  }

  render() {
    const { classes } = this.props
    const {
      faculty,
      courseType,
      course,
      photo,
      form,
      vaccinated,
      nameTitle,
      dob,
      gender,
      caste,
      religion,
      category,
      subCategory,
      categoryCertificate,
      subCategoryCertificate,
      state,
      city,
      cState,
      cCity,
      academicDetails,
      documents,
      mediumOfInstitution,
      nationalCompetition,
      nationalCertificate,
      ncc,
      nccCertificate,
      freedomFighter,
      ffDocument,
      nationalSevaScheme,
      nssDocument,
      bcom,
      other,
      totalMeritCount,
      signature,
    } = this.state
    return (
      <CardContainer
        heading={'Admission Form'}
        subTitle="Fill Up the Form"
        buttons={[
          <RegularButton size="sm" color="danger" key="dp">
            Download Prospectus &nbsp;&nbsp; <GetAppIcon />
          </RegularButton>,
        ]}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} className="headBg">
            <Typography variant="subtitle1">
              Faculty & Courses Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                },
              }}
              fullWidth
              select
              label={mandatoryField('Select Faculty')}
              value={faculty}
              onChange={this.handleChangeFields}
              variant="outlined"
              name="faculty"
            >
              {facultyData.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                },
              }}
              fullWidth
              select
              label={mandatoryField('Select Course Type')}
              value={courseType}
              onChange={this.handleChangeFields}
              variant="outlined"
              name="courseType"
            >
              {courseTypeData.map(
                (item) =>
                  item.faculty.includes(faculty) && (
                    <MenuItem value={item.courseType}>
                      {item.courseType}
                    </MenuItem>
                  )
              )}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                },
              }}
              fullWidth
              select
              label={mandatoryField('Select Course')}
              value={course}
              onChange={this.handleChangeFields}
              variant="outlined"
              name="course"
            >
              {coursesData.map(
                (item) =>
                  faculty === item.faculty &&
                  courseType === item.courseType && (
                    <MenuItem value={item.course}>{item.course}</MenuItem>
                  )
              )}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              variant="outlined"
              name="mediumOfInstitution"
              label={mandatoryField('Medium of Teaching')}
              value={mediumOfInstitution}
              onChange={this.handleChangeFields}
            >
              <MenuItem value="hindi">Hindi</MenuItem>
              <MenuItem value="english">English</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} className="headBg">
            <Typography variant="subtitle1">Basic Details</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container alignItems="center">
              <Grid item md={2} xs={5}>
                <img
                  className={classes.profilePhoto}
                  src={photo !== '' ? URL.createObjectURL(photo) : 'user.png'}
                />
              </Grid>
              <Grid item md={10} xs={7}>
                <FileUploader
                  buttonLabel="Upload Photo"
                  accept="image/jpg,image/jpeg,image/png"
                  maxSize={2}
                  handleChange={this.handleUploadPhoto}
                  id="profile"
                />
                <Box paddingTop="10px">
                  <Typography variant="caption">
                    Upload Passport size photo with white background.
                  </Typography>
                  <br />
                  <Typography variant="caption">
                    <b>Note:-</b> Allowed JPG, JPEG or PNG image only. Max size
                    of 2MB.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <CustomInput
                  labelText={mandatoryField('Web Registration No.')}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    name: 'wrn',
                  }}
                  handleChange={this.handleChangeFields}
                />
              </Grid>
              <Grid container item xs={12} justify="center">
                <div className="alignCenter">
                  <Typography>
                    Upload University Web Registration PDF. &nbsp;
                  </Typography>
                  <FileUploader
                    buttonLabel="Upload Form"
                    accept="image/jpg,image/jpeg,image/png,application/pdf"
                    maxSize={2}
                    handleChange={this.handleUploadForm}
                    id="uploadForm"
                  />
                </div>
              </Grid>
              <Grid container item xs={12} justify="center">
                {form !== '' && <Typography>{form.name}</Typography>}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  name="vaccinated"
                  checked={vaccinated}
                  color="primary"
                  onChange={this.handleFieldChecked}
                />
              }
              label="Vaccinated ?"
              labelPlacement="start"
            />
          </Grid>
          <Grid item md={1} xs={4}>
            <TextField
              fullWidth
              select
              margin="dense"
              label={mandatoryField('Title')}
              value={nameTitle}
              onClick={this.handleChangeFields}
              variant="outlined"
              name="nameTitle"
            >
              <MenuItem value="Mr.">Mr.</MenuItem>
              <MenuItem value="Ms.">Ms.</MenuItem>
              <MenuItem value="Km.">Km.</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={11} xs={8}>
            <CustomInput
              labelText={mandatoryField('Full Name')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'name',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              value={dob}
              onChange={this.handleChangeFields}
              variant="outlined"
              name="dob"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label={mandatoryField('Gender')}
              value={gender}
              onClick={this.handleChangeFields}
              variant="outlined"
              name="gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="transgender">Transgender</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label={mandatoryField('Religion')}
              value={religion}
              onClick={this.handleChangeFields}
              variant="outlined"
              name="religion"
            >
              {religionData.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={mandatoryField('Caste')}
              value={caste}
              onChange={this.handleChangeFields}
              variant="outlined"
              name="caste"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              variant="outlined"
              name="category"
              label={mandatoryField('Category')}
              value={category}
              onChange={this.handleChangeFields}
            >
              {categoryData.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              variant="outlined"
              name="subCategory"
              label={mandatoryField('Sub-Category')}
              value={subCategory}
              onChange={this.handleChangeFields}
            >
              {subCategoryData.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid container item md={6} xs={12} justify="center">
            <FileUploader
              buttonLabel="Upload Category Certificate"
              accept="image/jpg,image/jpeg,image/png,application/pdf"
              maxSize={2}
              handleChange={this.handleUploadCertificate}
              id="categoryCertificate"
              name="categoryCertificate"
            />
          </Grid>
          <Grid container item md={6} xs={12} justify="center">
            <FileUploader
              buttonLabel="Upload Sub-Category Certificate"
              accept="image/jpg,image/jpeg,image/png,application/pdf"
              maxSize={2}
              handleChange={this.handleUploadSubCertificate}
              id="subCategoryCertificate"
              name="subCategoryCertificate"
            />
          </Grid>
          <Grid container item md={6} xs={12} justify="center">
            <Typography>
              {categoryCertificate !== '' && categoryCertificate.name}
            </Typography>
          </Grid>
          <Grid container item md={6} xs={12} justify="center">
            <Typography>
              {subCategoryCertificate !== '' && subCategoryCertificate.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={mandatoryField('Mobile No. of Student')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'personalMobile',
                type: 'number',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={mandatoryField('Mobile No. of Parent')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'parentMobile',
                type: 'number',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={mandatoryField('Aadhar No.')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'aadharNo',
                type: 'number',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={'Email'}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'email',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={12} className="headBg">
            <Typography variant="subtitle1">
              Parent & Guardian Details
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={mandatoryField("Father's / Husband Name")}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'fatherName',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={mandatoryField("Mother's Name")}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'motherName',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              labelText={mandatoryField('Parents Occupation')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'parentsOccupation',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={mandatoryField('Guardian Name')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'guardianName',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={mandatoryField('Relation with Student')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'relationOfApplicant',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={12} className="headBg">
            <Typography variant="subtitle1">Permanent Address</Typography>
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={mandatoryField('House/Flat No.')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'houseNo',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={mandatoryField('Colony/Street/Mohalla/Village')}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'street',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={'Pincode'}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'pincode',
                type: 'number',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText={'Post Office'}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'postOffice',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              variant="outlined"
              label={mandatoryField('Select State')}
              name="state"
              value={state}
              onChange={this.handleChangeFields}
            >
              {statesData.map((item) => (
                <MenuItem value={item.code}>{item.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label={mandatoryField('Select City')}
              variant="outlined"
              name="city"
              value={city}
              onChange={this.handleChangeFields}
            >
              {citiesData.map(
                (item) =>
                  state === item.state && (
                    <MenuItem value={item.name}>{item.name}</MenuItem>
                  )
              )}
            </TextField>
          </Grid>
          <Grid item xs={12} className="headBg">
            <Typography variant="subtitle1">Correspondence Address</Typography>
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText="House/Flat No."
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'cHouseNo',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText="Colony/Street/Mohalla/Village"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'cStreet',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText="Pincode"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'cPincode',
                type: 'number',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              labelText="Post Office"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'cPostOffice',
              }}
              handleChange={this.handleChangeFields}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              variant="outlined"
              label="Select State"
              name="cState"
              value={cState}
              onChange={this.handleChangeFields}
            >
              {statesData.map((item) => (
                <MenuItem value={item.code}>{item.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Select City"
              variant="outlined"
              name="cCity"
              value={cCity}
              onChange={this.handleChangeFields}
            >
              {citiesData.map(
                (item) =>
                  cState === item.state && (
                    <MenuItem value={item.name}>{item.name}</MenuItem>
                  )
              )}
            </TextField>
          </Grid>
          <Grid item xs={12} className="headBg">
            <Typography variant="subtitle1">Academic Details</Typography>
          </Grid>
          {courseType !== '' ? (
            <Grid item xs={12}>
              {academicDetails.map((item, i) => (
                <Box p={1} key={i}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item md={2} xs={12}>
                      <CustomInput
                        smallLabel
                        labelText={mandatoryField('Name of Exam')}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'nameOfExam',
                          value: item.nameOfExam,
                          disabled: i < 2,
                        }}
                        handleChange={(e) => this.handleInputChange(e, i)}
                      />
                    </Grid>
                    <Grid item md={1} xs={12}>
                      <CustomInput
                        smallLabel
                        labelText={mandatoryField('Name of Board')}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'board',
                          value: item.board,
                        }}
                        handleChange={(e) => this.handleInputChange(e, i)}
                      />
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <CustomInput
                        smallLabel
                        labelText={mandatoryField('Name of Institution')}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'institution',
                          value: item.institution,
                        }}
                        handleChange={(e) => this.handleInputChange(e, i)}
                      />
                    </Grid>
                    <Grid item md={1} xs={6}>
                      <CustomInput
                        smallLabel
                        labelText={mandatoryField('Year')}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'year',
                          value: item.year,
                        }}
                        handleChange={(e) => this.handleInputChange(e, i)}
                      />
                    </Grid>
                    <Grid item md={1} xs={6}>
                      <CustomInput
                        smallLabel
                        labelText={mandatoryField('Roll No.')}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'rollNo',
                          value: item.rollNo,
                        }}
                        handleChange={(e) => this.handleInputChange(e, i)}
                      />
                    </Grid>
                    <Grid item md={1} xs={4}>
                      <CustomInput
                        smallLabel
                        labelText={mandatoryField('Total Marks')}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'totalMarks',
                          value: item.totalMarks,
                          type: 'number',
                        }}
                        handleChange={(e) => this.handleInputChange(e, i)}
                      />
                    </Grid>
                    <Grid item md={1} xs={4}>
                      <CustomInput
                        smallLabel
                        labelText={mandatoryField('Marks Obtained')}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'marksObtained',
                          value: item.marksObtained,
                          type: 'number',
                        }}
                        handleChange={(e) => this.handleInputChange(e, i)}
                      />
                    </Grid>
                    <Grid item md={1} xs={4}>
                      <CustomInput
                        smallLabel
                        labelText={mandatoryField('Percentage')}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'percentage',
                          value: item.percentage,
                        }}
                        handleChange={(e) => this.handleInputChange(e, i)}
                      />
                    </Grid>
                    <Grid item md={1} xs={12}>
                      <CustomInput
                        smallLabel
                        labelText="Subjects"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          name: 'subjects',
                          value: item.subjects,
                        }}
                        handleChange={(e) => this.handleInputChange(e, i)}
                      />
                    </Grid>
                    <Grid item md={1} xs={6}>
                      {item.isDelete === 1 && (
                        <RegularButton
                          fab
                          size="sm"
                          color="danger"
                          onClick={() => this.handleRemoveClick(i)}
                        >
                          <DeleteIcon />
                        </RegularButton>
                      )}
                    </Grid>
                    <Grid container item md={12} xs={6} justify="flex-end">
                      {academicDetails.length - 1 === i && (
                        <Box pr="10px" pb="5px">
                          <div className="alignCenter">
                            <Typography>
                              Press on <b>"+"</b> button to add more
                              certifications / courses. &nbsp;&nbsp;
                            </Typography>
                            <RegularButton
                              size="sm"
                              onClick={this.handleAddClick}
                            >
                              <AddIcon />
                            </RegularButton>
                          </div>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
          ) : (
            <Grid container item xs={12} justify="center">
              <Typography variant="subtitle1">
                Select course type to view this content.
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} className="headBg">
            <Typography variant="subtitle1">
              Upload Documents (Only allowed jpg,png,jpeg or pdf.)
            </Typography>
          </Grid>
          {courseType !== '' ? (
            <Grid item xs={12}>
              {documents.map((item, i) => (
                <Box p={1} key={i}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item md={4} xs={12}>
                      <TextField
                        fullWidth
                        select
                        disabled={item.isDelete === 0}
                        label={mandatoryField('Document Type')}
                        value={item.documentType}
                        onChange={(e) => this.handleInputEnclosure(e, i)}
                        variant="outlined"
                        name="documentType"
                      >
                        <MenuItem value="highSchool">
                          High School Marksheet
                        </MenuItem>
                        <MenuItem value="inter">Inter Marksheet</MenuItem>
                        <MenuItem value="gDegree">Graduation Degree</MenuItem>
                        <MenuItem value="pgDegree">
                          Post-Graduation Degree
                        </MenuItem>
                        <MenuItem value="other">Others</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <FileUploader
                        buttonLabel="Upload Document"
                        accept="image/jpg,image/jpeg,image/png,application/pdf"
                        maxSize={2}
                        handleChange={this.handleUploadEnclosure}
                        id={'uploadDocument' + i}
                        index={i}
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      {item.document !== '' && (
                        <img
                          className={classes.photo}
                          src={URL.createObjectURL(item.document)}
                        />
                      )}
                    </Grid>
                    <Grid item md={1} xs={12}>
                      {item.isDelete === 1 && (
                        <RegularButton
                          fab
                          size="sm"
                          color="danger"
                          onClick={() => this.handleRemoveEnclosure(i)}
                        >
                          <DeleteIcon />
                        </RegularButton>
                      )}
                    </Grid>
                    <Grid container item md={12} xs={6} justify="flex-end">
                      {documents.length - 1 === i && (
                        <Box pr="10px" pb="5px">
                          <div className="alignCenter">
                            <Typography>
                              Press on <b>"+"</b> button to add more documents.
                              &nbsp;&nbsp;
                            </Typography>
                            <RegularButton
                              size="sm"
                              onClick={this.handleAddEnclosure}
                            >
                              <AddIcon />
                            </RegularButton>
                          </div>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
          ) : (
            <Grid container item xs={12} justify="center">
              <Typography variant="subtitle1">
                Select course type to view this content.
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} className="headBg">
            <Typography variant="subtitle1">
              Other Details <b>(For More Details Read the Prospectus)</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {courseType === '' ? (
              <Grid container item xs={12} justify="center">
                <Typography variant="subtitle1">
                  Select course type to view this content.
                </Typography>
              </Grid>
            ) : courseType === 'Under Graduate' ? (
              <UGMerit />
            ) : (
              <PGMerit />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              variant="outlined"
              name="other"
              label="Other Details / Marks"
              value={other}
              onChange={this.handleChangeFields}
            >
              <MenuItem value="डॉ. भीमराव आंबेडकर विश्वविद्यालय और सम्बद्ध महाविद्यालयों में सेवारत एवं स्ववित पोषित संस्थान के विश्वविद्यालय द्वारा अनुमोदित अनु बन्धित प्रवक्ता तथा अवकाश प्राप्त केवल स्थायी अध्यापको एवं कर्मचारियों के पति/पत्नी/पुत्री तथा कृषि संकाय में स्थायी परियोजना के स्थायी परियोजनाओं के स्थायी कर्मचारियों के  पति/पत्नी/पुत्री।">
                डॉ. भीमराव आंबेडकर विश्वविद्यालय और सम्बद्ध महाविद्यालयों में
                सेवारत एवं स्ववित पोषित संस्थान के विश्वविद्यालय द्वारा अनुमोदित
                अनु बन्धित प्रवक्ता तथा अवकाश प्राप्त केवल स्थायी अध्यापको एवं
                कर्मचारियों के पति/पत्नी/पुत्री तथा कृषि संकाय में स्थायी
                परियोजना के स्थायी परियोजनाओं के स्थायी कर्मचारियों के
                पति/पत्नी/पुत्री।
              </MenuItem>
              <MenuItem value="भारतीय सेवा में सेवारत अथवा अवकाश प्राप्त अधिकारियों या अन्य रैंक के केवल पति/पत्नी/पुत्री/पुत्री (अविवाहित)">
                भारतीय सेवा में सेवारत अथवा अवकाश प्राप्त अधिकारियों या अन्य
                रैंक के केवल पति/पत्नी/पुत्री/पुत्री (अविवाहित)
              </MenuItem>
              <MenuItem
                value=" भारतीय सेना/पैरा मिलट्री फोर्स/अद्र्ध सैनिक बल पुलिस/पी.एस.सी
                में कार्य करते हुए विजय के शहीदों के पुत्र/पुत्री/विधवाओं के
                प्रवेश में"
              >
                भारतीय सेना/पैरा मिलट्री फोर्स/अद्र्ध सैनिक बल पुलिस/पी.एस.सी
                में कार्य करते हुए विजय के शहीदों के पुत्र/पुत्री/विधवाओं के
                प्रवेश में
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Extra Marks : <b>{totalMeritCount}</b>
            </Typography>
            <br />
            <Typography variant="caption">
              <b>Note:-</b> Allowed maximum 17 marks.
            </Typography>
          </Grid>
          <Grid item xs={12} className="headBg">
            <Typography variant="subtitle1">Declaration</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              I solemnly declare that the above mentioned information is correct
              and I fulfill the eligibility condition of the course. Further, if
              admitted, I promise to abide by the rules and norms of discipline
              of the institute.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">APPLICANT SIGNATURE</Typography>
            <div className="alignCenter">
              <FileUploader
                buttonLabel="Upload"
                accept="image/jpg,image/jpeg,image/png"
                maxSize={2}
                handleChange={this.handleUploadSignature}
                id="applicantSignature"
              />
              &nbsp;&nbsp;
              {signature !== '' && (
                <img
                  className={classes.photo}
                  src={URL.createObjectURL(signature)}
                />
              )}
            </div>
          </Grid>
          <Grid container item xs={6} justify="flex-end">
            <RegularButton color="primary">Save Draft</RegularButton>
          </Grid>
          <Grid item xs={6}>
            <RegularButton color="primary">Submit</RegularButton>
          </Grid>
        </Grid>
      </CardContainer>
    )
  }
}

export default withRouter(withStyles(styles)(Form))
