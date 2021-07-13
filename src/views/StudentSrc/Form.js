import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Hidden,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import React from 'react'
import { withRouter } from 'react-router-dom'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import FileUploader from '../../common/FileUploader/FileUploader'
import LocalStorage from '../../common/LocalStorage'
import RegularButton from '../../components/CustomButtons/Button'
import CustomInput from '../../components/CustomInput/CustomInput'
import Success from '../../components/Typography/Success'
import { ASSETS } from '../../constants/Constants'
import { errorDialog, mandatoryField } from '../../utils/Utils'
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
  labelRoot: {
    fontSize: 12,
  },
  disabled: {
    color: 'black',
  },
}

class Form extends React.Component {
  constructor(props) {
    super(props)
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
      otherCompetition: '',
      otherCertificate: '',
      ncc: '',
      nccCertificate: '',
      freedomFighter: false,
      nationalSevaScheme: false,
      nssDocument: '',
      roverRanger: '',
      otherRoverRanger: false,
      rrDocument: '',
      bcom: false,
      other: '',
      totalMerit: {
        nationalCompetition: 0,
        otherCompetition: 0,
        ncc: 0,
        roverRanger: 0,
        other: 0,
      },
      totalMeritCount: 0,
      mediumOfInstitution: '',
      signature: '',
      submitted: '0'
    }
  }

  componentDidMount() {
    let data = {
      registrationNo: LocalStorage.getUser() && LocalStorage.getUser().user_id,
    }
    FormApi.getForm(data).then((response) => {
      if (response.data) {
        
        if(response.data.submitted == '1' &&  !this.props.isPreview) {
          //
          this.props.history.push('/formsubmitted')
        } else if (response.data.submitted == '1' && this.props.isPreview) {
          response.data.academicDetails = JSON.parse(
            response.data.academicDetails
          )
          response.data.documents = JSON.parse(response.data.documents)
          this.setState({ ...response.data })
        } else {
          response.data.academicDetails = JSON.parse(
            response.data.academicDetails
          )
          response.data.documents = JSON.parse(response.data.documents)
          this.setState({ ...response.data })
        }
      }
    })
  }

  handleUpload = (file, index, name) => {
    this.setState({
      [name]: file,
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
        let totalMarks = list[index]['totalMarks']
        let marksObtained = list[index]['marksObtained']
        let p = parseFloat((marksObtained / totalMarks) * 100).toFixed(2)
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

  handleCalculateMeritCheck = (event) => {
    const { totalMeritCount } = this.state
    var total = 0
    total = !event.target.checked
      ? totalMeritCount - parseInt(event.target.value)
      : parseInt(event.target.value) + totalMeritCount <= 17
      ? parseInt(event.target.value) + totalMeritCount
      : 17
    if (event.target.name === 'otherRoverRanger') {
      var { totalMerit } = this.state
      if (totalMerit.roverRanger !== 0) {
        total = total - totalMerit.roverRanger
        totalMerit.roverRanger = 0
      }
      this.setState({
        roverRanger: '',
        [event.target.name]: event.target.checked,
        totalMerit,
        totalMeritCount: total,
      })
    } else {
      if (event.target.checked) {
        this.setState({
          totalMeritCount: total,
          [event.target.name]: event.target.checked,
        })
      } else {
        this.setState({
          totalMeritCount: total,
          [event.target.name]: event.target.checked,
        })
      }
    }
  }

  handleCalculateMerit = (event) => {
    var { totalMerit } = this.state
    var total = 0
    totalMerit[event.target.name] = parseInt(event.target.value.split(',')[1])
    Object.keys(totalMerit).map((item) => {
      total = totalMerit[item] + total
    })
    this.setState({
      totalMeritCount: total <= 17 ? total : 17,
      [event.target.name]: event.target.value,
    })
  }

  handleFillCorrespondenceAddress = () => {
    const { houseNo, street, pincode, postOffice, state, city } = this.state
    this.setState({
      cHouseNo: houseNo,
      cStreet: street,
      cPincode: pincode,
      cPostOffice: postOffice,
      cState: state,
      cCity: city,
    })
  }

  handleSubmitForm = (btnValue) => () => {
    const {
      faculty,
      courseType,
      course,
      vaccinated,
      nameTitle,
      name,
      dob,
      gender,
      caste,
      religion,
      personalMobile,
      parentMobile,
      fatherName,
      motherName,
      parentsOccupation,
      wrn,
      form,
      photo,
      houseNo,
      street,
      pincode,
      postOffice,
      state,
      city,
      cHouseNo,
      cStreet,
      cPincode,
      cPostOffice,
      cState,
      cCity,
      aadharNo,
      email,
      category,
      subCategory,
      categoryCertificate,
      subCategoryCertificate,
      academicDetails,
      guardianName,
      relationOfApplicant,
      documents,
      nationalCompetition,
      nationalCertificate,
      otherCompetition,
      otherCertificate,
      ncc,
      nccCertificate,
      freedomFighter,
      nationalSevaScheme,
      nssDocument,
      roverRanger,
      otherRoverRanger,
      rrDocument,
      bcom,
      other,
      totalMeritCount,
      mediumOfInstitution,
      signature,
    } = this.state
    const data = new FormData()
    data.append(
      'registrationNo',
      LocalStorage.getUser() ? LocalStorage.getUser().user_id : ''
    )
    data.append('faculty', faculty)
    data.append('courseType', courseType)
    data.append('course', course)
    data.append('mediumOfInstitution', mediumOfInstitution)
    data.append('vaccinated', vaccinated)
    data.append('nameTitle', nameTitle)
    data.append('name', name)
    data.append('dob', dob)
    data.append('gender', gender)
    data.append('caste', caste)
    data.append('religion', religion)
    data.append('personalMobile', personalMobile)
    data.append('parentMobile', parentMobile)
    data.append('fatherName', fatherName)
    data.append('motherName', motherName)
    data.append('parentsOccupation', parentsOccupation)
    data.append('wrn', wrn)
    data.append('form', form)
    data.append('photo', photo)
    data.append('houseNo', houseNo)
    data.append('street', street)
    data.append('pincode', pincode)
    data.append('postOffice', postOffice)
    data.append('state', state)
    data.append('city', city)
    data.append('cHouseNo', cHouseNo)
    data.append('cStreet', cStreet)
    data.append('cPincode', cPincode)
    data.append('cPostOffice', cPostOffice)
    data.append('cState', cState)
    data.append('cCity', cCity)
    data.append('aadharNo', aadharNo)
    data.append('email', email)
    data.append('category', category)
    data.append('subCategory', subCategory)
    data.append('categoryCertificate', categoryCertificate)
    data.append('subCategoryCertificate', subCategoryCertificate)
    data.append('academicDetails', JSON.stringify(academicDetails))
    data.append('documents', JSON.stringify(documents))
    documents.map(
      (item, index) =>
        item.document !== '' && data.append('document' + index, item.document)
    )
    data.append('guardianName', guardianName)
    data.append('relationOfApplicant', relationOfApplicant)
    data.append('nationalCompetition', nationalCompetition)
    data.append('nationalCertificate', nationalCertificate)
    data.append('otherCompetition', otherCompetition)
    data.append('otherCertificate', otherCertificate)
    data.append('ncc', ncc)
    data.append('nccCertificate', nccCertificate)
    data.append('freedomFighter', freedomFighter)
    data.append('nationalSevaScheme', nationalSevaScheme)
    data.append('nssDocument', nssDocument)
    data.append('roverRanger', roverRanger)
    data.append('otherRoverRanger', otherRoverRanger)
    data.append('rrDocument', rrDocument)
    data.append('bcom', bcom)
    data.append('other', other)
    data.append('totalMeritCount', totalMeritCount)
    data.append('signature', signature)
    data.append('submit', btnValue)
    FormApi.submitForm(data).then((response) => {
      if (response && response.data) {
        LocalStorage.setUser(response.data)
        if (btnValue == 1) {
          errorDialog('Your application is submitted successfully', 'Form')
          this.props.history.push('/formsubmitted')
        } else {
          errorDialog(
            `Your application is saved. Your registration no. is ${response.data.user_id}`,
            'Form'
          )
        }
      }
    })
  }

  handleDownloadForm = () => {
    const input = document.getElementById('form1234')
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg')
      const pdf = new jsPDF()
      pdf.addImage(
        imgData,
        0,
        0,
        pdf.internal.pageSize.width,
        pdf.internal.pageSize.height
      )
      pdf.save('form' + '.pdf')
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
      cHouseNo,
      cStreet,
      cPincode,
      cPostOffice,
      cState,
      cCity,
      academicDetails,
      documents,
      mediumOfInstitution,
      nationalCompetition,
      nationalCertificate,
      otherCertificate,
      otherCompetition,
      ncc,
      nccCertificate,
      freedomFighter,
      nationalSevaScheme,
      nssDocument,
      roverRanger,
      otherRoverRanger,
      rrDocument,
      bcom,
      other,
      totalMeritCount,
      signature,
      wrn,
      name,
      personalMobile,
      parentMobile,
      aadharNo,
      email,
      fatherName,
      motherName,
      parentsOccupation,
      guardianName,
      relationOfApplicant,
      houseNo,
      street,
      pincode,
      postOffice,
      submitted,
    } = this.state
    const { isPreview } = this.props
    const preview = submitted === '1' && isPreview && isPreview === '1' ? true : false
    return (
      <div className="childContainer">
        <CardContainer
          heading={'Admission Form'}
          subTitle="Fill Up the Form"
          buttons={[
            <Hidden xsDown>
              <RegularButton
                size="sm"
                color="danger"
                key="dp"
                onClick={preview ? this.handleDownloadForm : this.handleDownloadProspectus}
              >
                {preview ? 'Download Form' : 'Download Prospectus'}
                &nbsp;&nbsp; <GetAppIcon />
              </RegularButton>
            </Hidden>,
          ]}
        >
          <Grid container spacing={2} alignItems="center" id="form1234">
            <Hidden smUp>
              <Grid container item xs={12} justify="center">
                <RegularButton
                  size="sm"
                  color="danger"
                  key="dp"
                  onClick={preview ? this.handleDownloadForm : this.handleDownloadProspectus}
                >
                  {preview ? 'Download Form' : 'Download Prospectus'}
                  &nbsp;&nbsp; <GetAppIcon />
                </RegularButton>
              </Grid>
            </Hidden>
            {!preview ? (
              <Grid item xs={12}>
                <Typography variant="h6">
                  Please read all the instructions before fill up form
                </Typography>
                <Divider />
                <Typography variant="caption">
                  <ul>
                    <li>
                      Please verify your form details once before click on
                      'Submit' button
                    </li>
                    <li>
                      After submitting FORM, you cannot modified or change any
                      details
                    </li>
                    <li>
                      Please note down your registration id after click on 'Save
                      Draft' button
                    </li>
                    <li>Your photo and signature must be image format</li>
                    <li>
                      Any other uploads can be image(png/jpg/jpeg) or pdf{' '}
                    </li>
                  </ul>
                </Typography>
              </Grid>
            ) : (
              <Grid container item xs={12} justify="center">
                <Typography variant="h6">ADMISSION FORM</Typography>
                <Divider />
              </Grid>
            )}
            <Grid item xs={12} className="headBg">
              <Typography variant="subtitle1">
                Faculty & Courses Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={preview}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                fullWidth
                select
                label={mandatoryField('Select Faculty')}
                value={faculty}
                onChange={this.handleChangeFields}
                variant={preview ? 'standard' : 'outlined'}
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
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                fullWidth
                select
                label={mandatoryField('Select Course Type')}
                value={courseType}
                onChange={this.handleChangeFields}
                variant={preview ? 'standard' : 'outlined'}
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
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                fullWidth
                select
                label={mandatoryField('Select Course')}
                value={course}
                onChange={this.handleChangeFields}
                variant={preview ? 'standard' : 'outlined'}
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
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                select
                fullWidth
                variant={preview ? 'standard' : 'outlined'}
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
                <Grid item md={3} xs={5}>
                  <img
                    className={classes.profilePhoto}
                    src={
                      photo === ''
                        ? 'user.png'
                        : typeof photo === 'object'
                        ? URL.createObjectURL(ASSETS.url + photo)
                        : ASSETS.url + photo
                    }
                  />
                </Grid>
                <Grid item md={9} xs={7}>
                  {!preview && (
                    <FileUploader
                      buttonLabel="Upload Photo"
                      accept="image/jpg,image/jpeg,image/png"
                      maxSize={2}
                      handleChange={this.handleUpload}
                      id="profile"
                      name="photo"
                    />
                  )}
                  <Box paddingTop="10px">
                    <Typography variant="caption">
                      Upload Passport size photo with white background.
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      <b>Note:-</b> Allowed JPG, JPEG or PNG image only. Max
                      size of 2MB.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <CustomInput
                    smallLabel
                    labelText={mandatoryField('Web Registration No.')}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: 'wrn',
                      value: wrn,
                      disabled: preview,
                    }}
                    handleChange={this.handleChangeFields}
                  />
                </Grid>
                <Grid container item xs={12} justify="center">
                  <div className="alignCenter">
                    <Typography>
                      Upload University Web Registration (PDF) &nbsp;
                    </Typography>
                    {!preview && (
                      <FileUploader
                        buttonLabel="Upload Form"
                        accept="image/jpg,image/jpeg,image/png,application/pdf"
                        maxSize={2}
                        handleChange={this.handleUpload}
                        id="uploadForm"
                        name="form"
                      />
                    )}
                  </div>
                </Grid>
                <Grid container item xs={12} justify="center">
                  {form !== '' && <Success>Uploaded.</Success>}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    disabled={preview}
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
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                fullWidth
                select
                margin="dense"
                label={mandatoryField('Title')}
                value={nameTitle}
                onClick={this.handleChangeFields}
                variant={preview ? 'standard' : 'outlined'}
                name="nameTitle"
              >
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Ms.">Ms.</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={11} xs={8}>
              <CustomInput
                smallLabel
                labelText={mandatoryField('Full Name')}
                formControlProps={{
                  fullWidth: true,
                  isForm: true,
                }}
                inputProps={{
                  name: 'name',
                  value: name,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
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
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                fullWidth
                select
                label={mandatoryField('Gender')}
                value={gender}
                onClick={this.handleChangeFields}
                variant={preview ? 'standard' : 'outlined'}
                name="gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="transgender">Transgender</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                fullWidth
                select
                label={mandatoryField('Religion')}
                value={religion}
                onClick={this.handleChangeFields}
                variant={preview ? 'standard' : 'outlined'}
                name="religion"
              >
                {religionData.map((item) => (
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
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                fullWidth
                label={mandatoryField('Caste')}
                value={caste}
                onChange={this.handleChangeFields}
                variant={preview ? 'standard' : 'outlined'}
                name="caste"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                select
                fullWidth
                variant={preview ? 'standard' : 'outlined'}
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
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                select
                fullWidth
                variant={preview ? 'standard' : 'outlined'}
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
              <div className="center">
                {!preview && (
                  <FileUploader
                    buttonLabel="Upload Category Certificate"
                    accept="image/jpg,image/jpeg,image/png,application/pdf"
                    maxSize={2}
                    handleChange={this.handleUpload}
                    id="categoryCertificate"
                    name="categoryCertificate"
                  />
                )}
                {categoryCertificate !== '' && <Success>Uploaded.</Success>}
              </div>
            </Grid>
            <Grid container item md={6} xs={12} justify="center">
              <div className="center">
                {!preview && (
                  <FileUploader
                    buttonLabel="Upload Sub-Category Certificate"
                    accept="image/jpg,image/jpeg,image/png,application/pdf"
                    maxSize={2}
                    handleChange={this.handleUpload}
                    id="subCategoryCertificate"
                    name="subCategoryCertificate"
                  />
                )}
                {subCategoryCertificate !== '' && <Success>Uploaded.</Success>}
              </div>
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText={mandatoryField('Mobile No. of Student')}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'personalMobile',
                  type: 'number',
                  value: personalMobile,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText={mandatoryField('Mobile No. of Parent')}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'parentMobile',
                  type: 'number',
                  value: parentMobile,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText={mandatoryField('Aadhar No.')}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'aadharNo',
                  type: 'number',
                  value: aadharNo,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText="Email"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'email',
                  value: email,
                  disabled: preview,
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
                smallLabel
                labelText={mandatoryField("Father's / Husband Name")}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'fatherName',
                  value: fatherName,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText={mandatoryField("Mother's Name")}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'motherName',
                  value: motherName,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                smallLabel
                labelText={mandatoryField("Parent's Occupation")}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'parentsOccupation',
                  value: parentsOccupation,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText={mandatoryField('Guardian Name')}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'guardianName',
                  value: guardianName,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText={mandatoryField('Relation with Student')}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'relationOfApplicant',
                  value: relationOfApplicant,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={12} className="headBg">
              <Typography variant="subtitle1">Permanent Address</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomInput
                smallLabel
                labelText={mandatoryField('House/Flat No.')}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'houseNo',
                  value: houseNo,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomInput
                smallLabel
                labelText={mandatoryField('Colony/Street/Mohalla/Village')}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'street',
                  value: street,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText={'Pincode'}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'pincode',
                  type: 'number',
                  value: pincode,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText={'Post Office'}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'postOffice',
                  value: postOffice,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                select
                fullWidth
                variant={preview ? 'standard' : 'outlined'}
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
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                select
                fullWidth
                label={mandatoryField('Select City')}
                variant={preview ? 'standard' : 'outlined'}
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
              <Typography variant="subtitle1">
                Correspondence Address &nbsp;&nbsp;
                {!preview && (
                  <RegularButton
                    color="primary"
                    size="sm"
                    onClick={this.handleFillCorrespondenceAddress}
                  >
                    Same as Permanent Address ?
                  </RegularButton>
                )}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomInput
                smallLabel
                labelText="House/Flat No."
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'cHouseNo',
                  value: cHouseNo,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomInput
                smallLabel
                labelText="Colony/Street/Mohalla/Village"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'cStreet',
                  value: cStreet,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText="Pincode"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'cPincode',
                  value: cPincode,
                  type: 'number',
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                smallLabel
                labelText="Post Office"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  name: 'cPostOffice',
                  value: cPostOffice,
                  disabled: preview,
                }}
                handleChange={this.handleChangeFields}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                select
                fullWidth
                variant={preview ? 'standard' : 'outlined'}
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
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                select
                fullWidth
                label="Select City"
                variant={preview ? 'standard' : 'outlined'}
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
                      <Grid item md={2} xs={12}>
                        <CustomInput
                          smallLabel
                          labelText={mandatoryField('Name of Board')}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'board',
                            value: item.board,
                            disabled: preview,
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
                        <CustomInput
                          smallLabel
                          labelText={mandatoryField('Name of Institution')}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'institution',
                            value: item.institution,
                            disabled: preview,
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
                            disabled: preview,
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
                            disabled: preview,
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item md={2} xs={6}>
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
                            disabled: preview,
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
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
                            disabled: preview,
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item md={2} xs={6}>
                        <CustomInput
                          smallLabel
                          labelText={mandatoryField('Percentage')}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'percentage',
                            value: item.percentage,
                            disabled: preview,
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <CustomInput
                          smallLabel
                          labelText="Subjects"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'subjects',
                            value: item.subjects,
                            disabled: preview,
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item md={1} xs={6}>
                        {item.isDelete === 1 && !preview && (
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
                        {academicDetails.length - 1 === i && !preview && (
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
                Upload Documents <b>(allowed jpg,png,jpeg or pdf only.)</b>
              </Typography>
            </Grid>
            {courseType !== '' ? (
              <Grid item xs={12}>
                {documents.map((item, i) => (
                  <Box p={1} key={i}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item md={4} xs={12}>
                        <TextField
                          InputLabelProps={{
                            classes: {
                              root: classes.labelRoot,
                            },
                          }}
                          InputProps={{
                            classes: {
                              disabled: classes.disabled,
                            },
                          }}
                          disabled={preview}
                          fullWidth
                          select
                          disabled={item.isDelete === 0}
                          label={mandatoryField('Document Type')}
                          value={item.documentType}
                          onChange={(e) => this.handleInputEnclosure(e, i)}
                          variant={preview ? 'standard' : 'outlined'}
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
                      {!preview && (
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
                      )}
                      <Grid item md={4} xs={12}>
                        {item.document !== '' && <Success>Uploaded.</Success>}
                      </Grid>
                      <Grid item md={1} xs={12}>
                        {item.isDelete === 1 && !preview && (
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
                        {documents.length - 1 === i && !preview && (
                          <Box pr="10px" pb="5px">
                            <div className="alignCenter">
                              <Typography>
                                Press on <b>"+"</b> button to add more
                                documents. &nbsp;&nbsp;
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
              ) : (
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      InputLabelProps={{
                        classes: {
                          root: classes.labelRoot,
                        },
                      }}
                      InputProps={{
                        classes: {
                          disabled: classes.disabled,
                        },
                      }}
                      disabled={preview}
                      select
                      fullWidth
                      variant={preview ? 'standard' : 'outlined'}
                      name="nationalCompetition"
                      label="Participation in Zone / State Level National Competition"
                      value={nationalCompetition}
                      onChange={this.handleCalculateMerit}
                    >
                      <MenuItem value="none,0">None</MenuItem>
                      <MenuItem value="Ist,5">Ist</MenuItem>
                      <MenuItem value="IInd,4">IInd</MenuItem>
                      <MenuItem value="IIIrd,3">IIIrd</MenuItem>
                      <MenuItem value="Participant,2">Participant</MenuItem>
                    </TextField>
                  </Grid>
                  {!preview && (
                    <Grid item md={2} xs={6}>
                      <FileUploader
                        buttonLabel="Upload Document"
                        accept="image/jpg,image/jpeg,image/png,application/pdf"
                        maxSize={2}
                        handleChange={this.handleUpload}
                        id={'nationalCompetition'}
                        name="nationalCertificate"
                      />
                    </Grid>
                  )}
                  <Grid item md={4} xs={6}>
                    {nationalCertificate !== '' && <Success>Uploaded.</Success>}
                  </Grid>
                  {courseType === 'Post Graduate' && (
                    <Grid item md={6} xs={12}>
                      <TextField
                        InputLabelProps={{
                          classes: {
                            root: classes.labelRoot,
                          },
                        }}
                        InputProps={{
                          classes: {
                            disabled: classes.disabled,
                          },
                        }}
                        disabled={preview}
                        select
                        fullWidth
                        variant={preview ? 'standard' : 'outlined'}
                        name="otherCompetition"
                        label="Participation in Competition from University"
                        value={otherCompetition}
                        onChange={this.handleCalculateMerit}
                      >
                        <MenuItem value="none,0">None</MenuItem>
                        <MenuItem value="Ist,8">Ist</MenuItem>
                        <MenuItem value="IInd,7">IInd</MenuItem>
                        <MenuItem value="IIIrd,6">IIIrd</MenuItem>
                        <MenuItem value="participant,3">Participant</MenuItem>
                      </TextField>
                    </Grid>
                  )}
                  {courseType === 'Post Graduate' && !preview && (
                    <Grid item md={2} xs={6}>
                      <FileUploader
                        buttonLabel="Upload Document"
                        accept="image/jpg,image/jpeg,image/png,application/pdf"
                        maxSize={2}
                        handleChange={this.handleUpload}
                        id={'otherCompetition'}
                        name="otherCertificate"
                      />
                    </Grid>
                  )}
                  {courseType === 'Post Graduate' && (
                    <Grid item md={4} xs={6}>
                      {otherCertificate !== '' && <Success>Uploaded.</Success>}
                    </Grid>
                  )}
                  <Grid item md={6} xs={12}>
                    <TextField
                      InputLabelProps={{
                        classes: {
                          root: classes.labelRoot,
                        },
                      }}
                      InputProps={{
                        classes: {
                          disabled: classes.disabled,
                        },
                      }}
                      disabled={preview}
                      select
                      fullWidth
                      variant={preview ? 'standard' : 'outlined'}
                      name="ncc"
                      label="NCC/Cadet"
                      value={ncc}
                      onChange={this.handleCalculateMerit}
                    >
                      <MenuItem value="none,0">None</MenuItem>
                      <MenuItem value="NCC(B)/G-1,8">NCC(C)/G-2</MenuItem>
                      <MenuItem value="NCC(B)/G-1,6">NCC(B)/G-1</MenuItem>
                      <MenuItem value="NCC Worked(240 Hours) and Participated in 2 Camps but didn't passed any exam,3">
                        NCC Worked(240 Hours) and Participated in 2 Camps but
                        didn't passed any exam
                      </MenuItem>
                    </TextField>
                  </Grid>
                  {!preview && (
                    <Grid item md={2} xs={6}>
                      <FileUploader
                        buttonLabel="Upload Document"
                        accept="image/jpg,image/jpeg,image/png,application/pdf"
                        maxSize={2}
                        handleChange={this.handleUpload}
                        id={'nccDoc'}
                        name="nccCertificate"
                      />
                    </Grid>
                  )}
                  <Grid item md={4} xs={6}>
                    {nccCertificate !== '' && <Success>Uploaded.</Success>}
                  </Grid>
                  {courseType === 'Under Graduate' && (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="5"
                            checked={freedomFighter}
                            onChange={this.handleCalculateMeritCheck}
                            name="freedomFighter"
                            color="primary"
                            disabled={preview}
                          />
                        }
                        label="Freedom Fighter ?"
                      />
                    </Grid>
                  )}
                  <Grid item md={4} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="5"
                          checked={nationalSevaScheme}
                          onChange={this.handleCalculateMeritCheck}
                          name="nationalSevaScheme"
                          color="primary"
                          disabled={preview}
                        />
                      }
                      label="(NSS) National Seva Scheme ?"
                    />
                  </Grid>
                  <Grid item md={2} xs={6}>
                    {nationalSevaScheme && !preview && (
                      <FileUploader
                        buttonLabel="Upload Document"
                        accept="image/jpg,image/jpeg,image/png,application/pdf"
                        maxSize={2}
                        handleChange={this.handleUpload}
                        id={'nssDoc'}
                        name="nssDocument"
                      />
                    )}
                  </Grid>
                  <Grid item md={6} xs={6}>
                    {nssDocument !== '' && <Success>Uploaded.</Success>}
                  </Grid>
                  {courseType === 'Post Graduate' && (
                    <Grid item md={6} xs={12}>
                      <TextField
                        InputLabelProps={{
                          classes: {
                            root: classes.labelRoot,
                          },
                        }}
                        InputProps={{
                          classes: {
                            disabled: classes.disabled,
                          },
                        }}
                        disabled={preview}
                        select
                        fullWidth
                        disabled={otherRoverRanger}
                        variant={preview ? 'standard' : 'outlined'}
                        name="roverRanger"
                        label="Team Members of Rover Rangers to Participate in Rally from University"
                        value={roverRanger}
                        onChange={this.handleCalculateMerit}
                      >
                        <MenuItem value="none,0">None</MenuItem>
                        <MenuItem value="Ist,5">Ist</MenuItem>
                        <MenuItem value="IInd,4">IInd</MenuItem>
                        <MenuItem value="IIIrd,3">IIIrd</MenuItem>
                        <MenuItem value="Participant,2">Participant</MenuItem>
                      </TextField>
                    </Grid>
                  )}
                  {courseType === 'Post Graduate' && (
                    <Grid item md={2} xs={6}>
                      {!otherRoverRanger && !preview && (
                        <FileUploader
                          buttonLabel="Upload Document"
                          accept="image/jpg,image/jpeg,image/png,application/pdf"
                          maxSize={2}
                          handleChange={this.handleUpload}
                          id={'roverRanger'}
                          name="rrDocument"
                        />
                      )}
                    </Grid>
                  )}
                  {courseType === 'Post Graduate' && (
                    <Grid item md={4} xs={6}>
                      {rrDocument !== '' && <Success>Uploaded.</Success>}
                    </Grid>
                  )}
                  {courseType === 'Post Graduate' && (
                    <Grid container item xs={12} justify="center">
                      <Typography>OR</Typography>
                    </Grid>
                  )}
                  {courseType === 'Post Graduate' && (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="3"
                            checked={otherRoverRanger}
                            onChange={this.handleCalculateMeritCheck}
                            name="otherRoverRanger"
                            color="primary"
                            disabled={preview}
                          />
                        }
                        label="Team Members of Rover Rangers to Participate in Rally from Other University"
                      />
                    </Grid>
                  )}
                  {courseType === 'Under Graduate' && (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="5"
                            checked={bcom}
                            onChange={this.handleCalculateMeritCheck}
                            name="bcom"
                            color="primary"
                            disabled={preview}
                          />
                        }
                        label="Inter 10+2 with Commerce ?"
                      />
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                  },
                }}
                disabled={preview}
                select
                fullWidth
                variant={preview ? 'standard' : 'outlined'}
                name="other"
                label="Other Details / Marks"
                value={other}
                onChange={this.handleCalculateMerit}
              >
                <MenuItem value="none,0">None</MenuItem>
                <MenuItem
                  value="डॉ. भीमराव आंबेडकर विश्वविद्यालय और सम्बद्ध महाविद्यालयों में
                सेवारत एवं स्ववित पोषित संस्थान के विश्वविद्यालय द्वारा अनुमोदित
                अनु बन्धित प्रवक्ता तथा अवकाश प्राप्त केवल स्थायी
                अध्यापको एवं कर्मचारियों के पति/पत्नी/पुत्री तथा कृषि संकाय में
                स्थायी परियोजना के स्थायी परियोजनाओं के स्थायी कर्मचारियों के
                पति/पत्नी/पुत्री/पुत्र।,17"
                >
                  डॉ. भीमराव आंबेडकर विश्वविद्यालय और सम्बद्ध महाविद्यालयों में
                  सेवारत एवं स्ववित पोषित संस्थान के विश्वविद्यालय द्वारा
                  अनुमोदित अनु बन्धित प्रवक्ता तथा अवकाश प्राप्त <br /> केवल
                  स्थायी अध्यापको एवं कर्मचारियों के पति/पत्नी/पुत्री तथा कृषि
                  संकाय में स्थायी परियोजना के स्थायी परियोजनाओं के स्थायी
                  कर्मचारियों के पति/पत्नी/पुत्री/पुत्र।
                </MenuItem>
                <MenuItem
                  value="भारतीय सेना में सेवारत अथवा अवकाश प्राप्त अधिकारियों या अन्य
                रैंक के केवल पति/पत्नी/पुत्री/पुत्र (अविवाहित),10"
                >
                  भारतीय सेना में सेवारत अथवा अवकाश प्राप्त अधिकारियों या अन्य
                  रैंक के केवल पति/पत्नी/पुत्री/पुत्र (अविवाहित)
                </MenuItem>
                <MenuItem
                  value="भारतीय सेना पैरा/मिलट्री फोर्स/अर्ध सैनिक बल (पुलिस/पीएसी) में
                कार्य करते हुये विजय के शहीदों के पुत्र/पुत्री/विधवाओं को प्रवेश
                में,17"
                >
                  भारतीय सेना पैरा/मिलट्री फोर्स/अर्ध सैनिक बल (पुलिस/पीएसी) में
                  कार्य करते हुये विजय के शहीदों के पुत्र/पुत्री/विधवाओं को
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
                I solemnly declare that the above mentioned information is
                correct and I fulfill the eligibility condition of the course.
                Further, if admitted, I promise to abide by the rules and norms
                of discipline of the institute.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">APPLICANT SIGNATURE</Typography>
              <div className="alignCenter">
                {!preview && (
                  <FileUploader
                    buttonLabel="Upload"
                    accept="image/jpg,image/jpeg,image/png"
                    maxSize={2}
                    handleChange={this.handleUpload}
                    id="signature"
                    name="signature"
                  />
                )}
                &nbsp;&nbsp;
                {signature !== '' && (
                  <img
                    className={classes.photo}
                    src={
                      typeof signature === 'object'
                        ? URL.createObjectURL(signature)
                        : ASSETS.url + signature
                    }
                  />
                )}
              </div>
            </Grid>
            {!preview && (
              <Grid container item xs={6} justify="flex-end">
                <RegularButton
                  color="primary"
                  onClick={this.handleSubmitForm(0)}
                >
                  Save Draft
                </RegularButton>
              </Grid>
            )}
            {!preview && (
              <Grid item xs={6}>
                <RegularButton
                  color="primary"
                  onClick={this.handleSubmitForm(1)}
                >
                  Submit
                </RegularButton>
              </Grid>
            )}
          </Grid>
        </CardContainer>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Form))
