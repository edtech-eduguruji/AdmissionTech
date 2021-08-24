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
import Autocomplete from '@material-ui/lab/Autocomplete'
import jwtDecode from 'jwt-decode'
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { withRouter } from 'react-router-dom'
import FormApi from '../../apis/FormApi'
import CardContainer from '../../common/CardContainer'
import FileUploader from '../../common/FileUploader/FileUploader'
import LocalStorage from '../../common/LocalStorage'
import RegularButton from '../../components/CustomButtons/Button'
import CustomInput from '../../components/CustomInput/CustomInput'
import Success from '../../components/Typography/Success'
import { ASSETS } from '../../constants/Constants'
import {
  addErrorMsg,
  downloadPdf,
  errorDialog,
  mandatoryField,
  redirectUrl,
} from '../../utils/Utils'
import PaymentInfo from './PaymentInfo'
import academicDetailsStatic from './StaticData/academic.json'
import academicData from './StaticData/academicData.json'
import categoryData from './StaticData/category.json'
import citiesData from './StaticData/cities.json'
import courseTypeData from './StaticData/courseType.json'
import documentsStatic from './StaticData/documents.json'
import documentTypeData from './StaticData/documentType.json'
import facultyData from './StaticData/faculty.json'
import majorSubjectsData from './StaticData/majorSubjects.json'
import religionData from './StaticData/religion.json'
import semesterSubjectsData from './StaticData/semesterSubjects.json'
import statesData from './StaticData/states.json'
import streamData from './StaticData/stream.json'
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
      academicDetails: academicDetailsStatic.UG,
      documents: documentsStatic.UG,
      guardianName: '',
      relationOfApplicant: '',
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
      submitted: '0',
      major1: [],
      major2: '',
      major3: '',
      major4: '',
      vocationalSem1: '',
      vocationalSem2: '',
      coCurriculumSem1: '',
      coCurriculumSem2: '',
      token: '',
      paymentDetails: [],
      registrationNo: null,
      uploadExtraMark: null,
    }
  }

  componentDidMount() {
    let data = {
      registrationNo: LocalStorage.getUser() && LocalStorage.getUser().user_id,
    }
    FormApi.getForm(data).then((response) => {
      if (response.data) {
        if (response.data.submitted === '1' && !this.props.isPreview) {
          this.props.history.push('/formsubmitted')
        } else {
          if (this.props.isPreview) {
            const data = {
              registrationNo: LocalStorage.getUser().user_id,
            }
            FormApi.fetchPaymentDetails(data).then((res) => {
              if (res.data) {
                this.setState({
                  paymentDetails: jwtDecode(res.data).data,
                })
              }
            })
          }
          Object.keys(response.data).map((item) => {
            if (
              response.data[item] === null ||
              response.data[item] === 'null'
            ) {
              response.data[item] = ''
            }
          })
          response.data.academicDetails = response.data.academicDetails
            ? JSON.parse(response.data.academicDetails)
            : []
          response.data.documents = response.data.documents
            ? JSON.parse(response.data.documents)
            : []
          response.data.major1 = response.data.major1
            ? JSON.parse(response.data.major1)
            : []
          response.data.major2 = response.data.major2
            ? JSON.parse(response.data.major2)
            : []
          response.data.coCurriculumSem1 = 'Food, Nutrition and Hygiene'
          response.data.coCurriculumSem2 = 'First Aid and Basic health'
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
      if (event.target.value === '#ug1UG') {
        this.setState({
          academicDetails: academicDetailsStatic.UG,
          documents: documentsStatic.UG,
        })
      } else if (event.target.value === '#pg2PG') {
        this.setState({
          academicDetails: academicDetailsStatic.PG,
          documents: documentsStatic.PG,
        })
      }
      // else if (event.target.value === 'LLM') {
      //   this.setState({
      //     academicDetails: academicDetailsStatic.LLM,
      //     documents: documentsStatic.LLM,
      //   })
      // }
    } else if (name === 'major3') {
      this.setState({
        major4: '',
      })
    } else if (name === 'major4') {
      this.setState({
        major3: '',
      })
    } else if (name === 'faculty') {
      this.setState({
        major1: [],
        major2: '',
        major3: '',
        major4: '',
        vocationalSem1: '',
      })
    }
    this.setState({
      [event.target.name]:
        name === 'major2' ? JSON.parse(event.target.value) : event.target.value,
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
    } else if (name === 'stream') {
      this.setState({
        faculty: '',
        major1: [],
        major2: '',
        major3: '',
        major4: '',
        vocationalSem1: '',
        vocationalSem2: '',
      })
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
      this.setState({
        totalMeritCount: total,
        [event.target.name]: event.target.checked,
      })
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
      token,
      major1,
      major2,
      major3,
      major4,
      vocationalSem1,
      vocationalSem2,
      coCurriculumSem1,
      coCurriculumSem2,
      faculty,
      courseType,
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
      uploadExtraMark,
    } = this.state
    var count = 0
    const data = new FormData()
    data.append(
      'registrationNo',
      LocalStorage.getUser() && LocalStorage.getUser().user_id !== null
        ? LocalStorage.getUser().user_id
        : ''
    )
    data.append('faculty', faculty)
    data.append('courseType', courseType)
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
    data.append('major1', JSON.stringify(major1))
    data.append('major2', JSON.stringify(major2))
    data.append('major3', major3)
    data.append('major4', major4)
    data.append('vocationalSem1', vocationalSem1)
    data.append('vocationalSem2', vocationalSem2)
    data.append('coCurriculumSem1', coCurriculumSem1)
    data.append('coCurriculumSem2', coCurriculumSem2)
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
    data.append('uploadExtraMark', uploadExtraMark)
    if (btnValue === 0) {
      if (dob === '') {
        count++
        addErrorMsg('For saving the draft date of birth is mandatory.')
      } else if (!token) {
        count++
        addErrorMsg("Please verify you're not a robot")
      }
    } else {
      debugger
      if (
        !photo ||
        !wrn ||
        !form ||
        !nameTitle ||
        !name ||
        !dob ||
        !gender ||
        !religion ||
        !caste ||
        !category ||
        !personalMobile ||
        !parentMobile ||
        !aadharNo ||
        !email
      ) {
        count++
        addErrorMsg("Fill the empty fields in 'Basic Details' Section")
      } else if (
        !fatherName ||
        !motherName ||
        !parentsOccupation ||
        !guardianName ||
        !relationOfApplicant
      ) {
        count++
        addErrorMsg(
          "Fill the empty fields in 'Parent & Guardian Details' Section"
        )
      } else if (
        !houseNo ||
        !street ||
        !state ||
        !city ||
        (!pincode && !postOffice)
      ) {
        count++
        addErrorMsg("Fill the empty fields in 'Permanent Address' Section")
      } else if (this.checkJSONfields(academicDetails) !== 0 || !courseType) {
        count++
        addErrorMsg("Fill the empty fields in 'Academic Details' Section")
      } else if (!mediumOfInstitution || !faculty || major1.length === 0) {
        count++
        addErrorMsg(
          "Fill the empty fields in 'Faculty and Courses Details' Section"
        )
      } else if (this.checkFaculty(faculty) && major1.length === 0) {
        count++
        addErrorMsg(
          "Fill the empty fields in 'Faculty and Courses Details' Section"
        )
      } else if (
        (!this.checkFaculty(faculty) &&
          (major1.length !== 2 ||
            !major2 ||
            (!major3 && !major4) ||
            !vocationalSem1)) ||
        !vocationalSem2
      ) {
        count++
        addErrorMsg(
          "Fill the empty fields in 'Faculty and Courses Details' Section"
        )
      } else if (this.checkJSONfields(documents) !== 0) {
        count++
        addErrorMsg("Fill the empty fields in 'Upload Documents' Section")
      } else if (!signature) {
        count++
        addErrorMsg('Upload Signature')
      } else if (!token) {
        count++
        addErrorMsg("Please verify you're not a robot")
      }
    }
    if (count === 0) {
      FormApi.submitForm(data).then((response) => {
        if (response.data) {
          if (btnValue === 1) {
            errorDialog('Your application is submitted successfully', 'Form')
            LocalStorage.setUser(response.data)
            redirectUrl('sFormSubmit', 1)
          } else {
            const user = jwtDecode(response.data).data
            errorDialog(
              'Your application is saved. Your registration no. is : ' +
                user.user_id,
              'Form'
            )
            LocalStorage.removeUser()
            redirectUrl('/login')
          }
        }
      })
    }
  }

  checkJSONfields = (data) => {
    let isNull = 0
    if (data.length > 0) {
      data.map((item) => {
        Object.values(item).map((value) => {
          if (value === null || value === '') {
            isNull++
          }
        })
      })
      return isNull
    } else {
      return 1
    }
  }

  handleDownloadForm = () => {
    downloadPdf('form1234', 'FORM')
  }

  handleMultiDropDownData = (event, value) => {
    if (this.state.major1.length > value.length || value.length === 0) {
      this.setState({
        major1: value,
        major2: '',
        major3: '',
        major4: '',
        vocationalSem1: '',
        vocationalSem2: '',
      })
    } else {
      if (value.length <= 2) {
        this.setState({ major1: value })
      } else {
        addErrorMsg('You can select only 2 subjects.')
      }
    }
  }

  handleReCaptcha = (token) => {
    this.setState({ token: token })
  }

  checkFaculty = (facultyId) => {
    if (facultyId === '') {
      return false
    } else {
      if (facultyId !== 'f5foc' && facultyId !== 'f6fom') {
        return false
      } else {
        return true
      }
    }
  }

  checkCombination = (subjectId) => {
    const { faculty, major1 } = this.state
    let combination1 = ['$s7dss', '$s10Phylosophy']
    let combination2 = ['$17Sanskrit', '$11pe']
    let combination3 = ['$17Sanskrit', '$18dp']
    let combination4 = ['$11pe', '$18dp']
    if (faculty === 'f2Arts') {
      major1.map((item, i) => {
        if (combination1.includes(item.subjectId)) {
          combination1.splice(combination1.indexOf(item.subjectId), 1)
        }
        if (combination2.includes(item.subjectId)) {
          combination2.splice(combination2.indexOf(item.subjectId), 1)
        }
      })
      if (
        (subjectId === combination1[0] && combination1.length === 1) ||
        (subjectId === combination2[0] && combination2.length === 1)
      ) {
        return 0
      } else {
        return 1
      }
    } else if (faculty === 'f3Language') {
      major1.map((item) => {
        if (combination3.includes(item.subjectId)) {
          combination3.splice(combination3.indexOf(item.subjectId), 1)
        }
        if (combination2.includes(item.subjectId)) {
          combination2.splice(combination2.indexOf(item.subjectId), 1)
        }
      })
      if (
        (subjectId === combination3[0] && combination3.length === 1) ||
        (subjectId === combination2[0] && combination2.length === 1)
      ) {
        return 0
      } else {
        return 1
      }
    } else if (faculty === 'f4fineArt') {
      major1.map((item) => {
        if (combination3.includes(item.subjectId)) {
          combination3.splice(combination3.indexOf(item.subjectId), 1)
        }
        if (combination4.includes(item.subjectId)) {
          combination4.splice(combination4.indexOf(item.subjectId), 1)
        }
      })
      if (
        (subjectId === combination3[0] && combination3.length === 1) ||
        (subjectId === combination4[0] && combination4.length === 1)
      ) {
        return 0
      } else {
        return 1
      }
    } else {
      return 1
    }
  }

  filterMajorSubjects = () => {
    const { faculty, major1, major2, academicDetails } = this.state
    if (academicDetails.length > 0 && academicDetails[1].stream) {
      let subjects = majorSubjectsData.filter(
        (item) =>
          item.streamId.includes(academicDetails[1].stream) &&
          item.facultyId === faculty
      )
      major1.map((item) => {
        let index = subjects.findIndex(
          (itm) => item.subjectId === itm.subjectId
        )
        subjects.splice(index, 1)
      })
      if (major2 !== '') {
        let i = subjects.findIndex(
          (item) => item.subjectId === major2.subjectId
        )
        subjects.splice(i, 1)
      }
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
    } else {
      return []
    }
  }

  render() {
    const { classes } = this.props
    const {
      faculty,
      courseType,
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
      major1,
      major2,
      major3,
      major4,
      vocationalSem1,
      vocationalSem2,
      coCurriculumSem1,
      coCurriculumSem2,
      paymentDetails,
      registrationNo,
      uploadExtraMark,
    } = this.state
    const { isPreview } = this.props
    const preview =
      submitted === '1' && isPreview && isPreview === '1' ? true : false
    return (
      <div className="childContainer" id="form1234">
        <CardContainer
          heading={'Admission Form'}
          buttons={[
            !preview && (
              <Hidden xsDown>
                <RegularButton
                  size="sm"
                  color="danger"
                  key="dp"
                  target="_blank"
                  href={`./${ASSETS.PROSPECTUS}`}
                >
                  Download Prospectus &nbsp;&nbsp; <GetAppIcon />
                </RegularButton>
              </Hidden>
            ),
          ]}
        >
          <Grid container spacing={2} alignItems="center" className="pad10">
            {!preview && (
              <Hidden smUp>
                <Grid container item xs={12} justifyContent="center">
                  <RegularButton
                    size="sm"
                    color="danger"
                    target="_blank"
                    href={`./${ASSETS.PROSPECTUS}`}
                  >
                    Download Prospectus &nbsp;&nbsp; <GetAppIcon />
                  </RegularButton>
                </Grid>
              </Hidden>
            )}
            {!preview ? (
              <Grid item xs={12}>
                <Typography variant="h6">
                  Please read below all the instructions carefully before
                  filling up the form
                </Typography>
                <Divider />
                <Typography variant="caption">
                  <ul>
                    <li>
                      Please verify your details before clicking 'Submit' button
                    </li>
                    <li>
                      After submitting FORM, it cannot be modify or change
                    </li>
                    <li>
                      Please note down your registration id after clicking 'Save
                      Draft' button
                    </li>
                    <li>
                      Your photo and signature must be in image format
                      (jpeg/png)
                    </li>
                    <li>
                      All other uploads in the form can be in
                      image(png/jpg/jpeg) or pdf format
                    </li>
                  </ul>
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Your registration no: {registrationNo}
                </Typography>
                <Divider />
                <br />
                <br />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
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
                {courseTypeData.map((item, key) => (
                  <MenuItem key={key} value={item.courseTypeId}>
                    {item.courseType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
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
                      photo === '' || photo === null
                        ? 'user.png'
                        : typeof photo === 'object'
                        ? URL.createObjectURL(photo)
                        : ASSETS.url + photo
                    }
                  />
                </Grid>
                <Grid item md={9} xs={7}>
                  {!preview && (
                    <FileUploader
                      buttonLabel="Upload Photo"
                      accept="image/jpg,image/jpeg,image/png"
                      maxSize={5}
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
                  <Typography>
                    Enter university web registration no and upload
                    certification (in PDF)
                  </Typography>
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
                <Grid container item xs={12} justifyContent="center">
                  <div className="alignCenter">
                    {!preview && (
                      <FileUploader
                        buttonLabel="Upload Form"
                        accept="image/jpg,image/jpeg,image/png,application/pdf"
                        maxSize={5}
                        handleChange={this.handleUpload}
                        id="uploadForm"
                        name="form"
                      />
                    )}
                  </div>
                </Grid>
                <Grid container item xs={12} justifyContent="center">
                  {form !== '' && form !== null ? (
                    <Success>Uploaded.</Success>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    disabled={preview}
                    name="vaccinated"
                    checked={!vaccinated ? false : true}
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
                {religionData.map((item, key) => (
                  <MenuItem key={key} value={item.religionId}>
                    {item.religion}
                  </MenuItem>
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
                {categoryData.map((item, key) => (
                  <MenuItem key={key} value={item.categoryId}>
                    {item.category}
                  </MenuItem>
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
                {subCategoryData.map((item, key) => (
                  <MenuItem key={key} value={item.subCategoryId}>
                    {item.subCategory}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid container item md={6} xs={12} justifyContent="center">
              <div className="center">
                {!preview && (
                  <FileUploader
                    buttonLabel="Upload Category Certificate"
                    accept="image/jpg,image/jpeg,image/png,application/pdf"
                    maxSize={5}
                    handleChange={this.handleUpload}
                    id="categoryCertificate"
                    name="categoryCertificate"
                  />
                )}
                {categoryCertificate !== '' && categoryCertificate !== null ? (
                  <Success>Uploaded.</Success>
                ) : null}
              </div>
            </Grid>
            <Grid container item md={6} xs={12} justifyContent="center">
              <div className="center">
                {!preview && (
                  <FileUploader
                    buttonLabel="Upload Sub-Category Certificate"
                    accept="image/jpg,image/jpeg,image/png,application/pdf"
                    maxSize={5}
                    handleChange={this.handleUpload}
                    id="subCategoryCertificate"
                    name="subCategoryCertificate"
                  />
                )}
                {subCategoryCertificate !== '' &&
                subCategoryCertificate !== null ? (
                  <Success>Uploaded.</Success>
                ) : null}
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
                {statesData.map((item, key) => (
                  <MenuItem key={key} value={item.code}>
                    {item.name}
                  </MenuItem>
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
                  (item, key) =>
                    state === item.state && (
                      <MenuItem key={key} value={item.id}>
                        {item.name}
                      </MenuItem>
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
                {statesData.map((item, key) => (
                  <MenuItem key={key} value={item.code}>
                    {item.name}
                  </MenuItem>
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
                  (item, key) =>
                    cState === item.state && (
                      <MenuItem key={key} value={item.id}>
                        {item.name}
                      </MenuItem>
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
                      <Grid item md={1} xs={6}>
                        <CustomInput
                          smallLabel
                          labelText={mandatoryField('Percentage')}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'percentage',
                            value: item.percentage,
                            disabled: true,
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item md={1} xs={12}>
                        <CustomInput
                          smallLabel
                          labelText={mandatoryField('Subjects')}
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
                      {item.stream ||
                      item.stream === '' ||
                      item.stream === null ? (
                        <Grid item md={1} xs={8}>
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
                            size="small"
                            variant={preview ? 'standard' : 'outlined'}
                            name="stream"
                            label={mandatoryField('Stream')}
                            value={item.stream}
                            onChange={(e) => this.handleInputChange(e, i)}
                          >
                            {streamData.map((item, key) => (
                              <MenuItem key={key} value={item.streamId}>
                                {item.stream}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      ) : null}
                      <Grid
                        container
                        item
                        md={1}
                        xs={4}
                        justifyContent="flex-end"
                      >
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
                      <Grid container item xs={12} justifyContent="flex-end">
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
              <Grid container item xs={12} justifyContent="center">
                <Typography variant="subtitle1">
                  Select <b>"course type"</b> to view this content.
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} className="headBg">
              <Typography variant="subtitle1">
                Faculty & Courses Details
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" component="div" gutterBottom>
                Selection of Faculty
              </Typography>
              <Typography variant="caption">
                You can choose "Facult of Science" only if you are from science
                stream in 12th
              </Typography>
              <Divider />
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
                {academicDetails.length > 0 &&
                  academicDetails[1].stream !== '' &&
                  facultyData.map((item, key) => (
                    <MenuItem
                      key={key}
                      disabled={
                        (academicDetails[1].stream === '$s2Commerce' ||
                          academicDetails[1].stream === '$s3Arts') &&
                        item.facultyId === 'f1Science'
                      }
                      value={item.facultyId}
                    >
                      {item.faculty}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Selection of 2 Major Subjects
              </Typography>
              <Typography variant="caption">
                You can select any two subjects from the list
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disabled={preview}
                value={major1}
                onChange={this.handleMultiDropDownData}
                multiple
                name="major1"
                options={this.filterMajorSubjects(major1)}
                getOptionLabel={(option) => option.subjectName}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    label={mandatoryField('Select Subject / Course')}
                    {...params}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            {!this.checkFaculty(faculty) && (
              <Grid container spacing={2} item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="div" gutterBottom>
                    Selection of 3rd Major Subject (Any Faculty)
                  </Typography>
                  <Typography variant="caption">
                    You have to select only one subject from the list
                  </Typography>
                  <Divider />
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
                    name="major2"
                    value={JSON.stringify(major2)}
                    onChange={this.handleChangeFields}
                  >
                    {major1.length === 2 &&
                      majorSubjectsData.map((item, key) => (
                        <MenuItem
                          disabled={
                            major1.some(
                              (itm) => item.subjectId === itm.subjectId
                            ) ||
                            this.checkCombination(item.subjectId) === 0 ||
                            item.subjectId === '$20Bcom' ||
                            item.subjectId === '$21Bba' ||
                            ((academicDetails[1].stream === '$s2Commerce' ||
                              academicDetails[1].stream === '$s3Arts') &&
                              item.facultyId === 'f1Science') ||
                            (!item.streamId.includes(
                              academicDetails[1].stream
                            ) &&
                              item.facultyId === faculty)
                          }
                          key={key}
                          value={JSON.stringify(item)}
                        >
                          {item.subjectName}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="div" gutterBottom>
                    Selection of Minor / Elective Course
                  </Typography>
                  <Typography variant="caption">
                    You can only select one subject either from Semester 1 or
                    Semester 2
                  </Typography>
                  <Divider />
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
                    name="major3"
                    label={mandatoryField('Semester 1')}
                    value={major3}
                    onChange={this.handleChangeFields}
                  >
                    {major1.length > 0 && major2
                      ? semesterSubjectsData.map(
                          (item, key) =>
                            item.semester === 1 && (
                              <MenuItem
                                key={key}
                                disabled={
                                  (major1[0].facultyId === major2.facultyId &&
                                    major2.facultyId === item.facultyId) ||
                                  ((academicDetails[1].stream ===
                                    '$s2Commerce' ||
                                    academicDetails[1].stream === '$s3Arts') &&
                                    item.facultyId === 'f1Science') ||
                                  item.subjectId === major1[0].subjectId ||
                                  item.subjectId === major1[1].subjectId ||
                                  item.subjectId === major2.subjectId
                                }
                                value={item.paperId}
                              >
                                {item.subjectName}
                              </MenuItem>
                            )
                        )
                      : null}
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
                    name="major4"
                    label={mandatoryField('Semester 2')}
                    value={major4}
                    onChange={this.handleChangeFields}
                  >
                    {major1.length > 0 && major2
                      ? semesterSubjectsData.map(
                          (item, key) =>
                            item.semester === 2 && (
                              <MenuItem
                                key={key}
                                disabled={
                                  (major1[0].facultyId === major2.facultyId &&
                                    major2.facultyId === item.facultyId) ||
                                  ((academicDetails[1].stream ===
                                    '$s2Commerce' ||
                                    academicDetails[1].stream === '$s3Arts') &&
                                    item.facultyId === 'f1Science') ||
                                  item.subjectId === major1[0].subjectId ||
                                  item.subjectId === major1[1].subjectId ||
                                  item.subjectId === major2.subjectId
                                }
                                value={item.subjectId}
                              >
                                {item.subjectName}
                              </MenuItem>
                            )
                        )
                      : null}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Selection of Vocational / Skill Course
                  </Typography>
                  <Divider />
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
                    name="vocationalSem1"
                    label={mandatoryField('Semester 1')}
                    value={vocationalSem1}
                    onChange={this.handleChangeFields}
                  >
                    <MenuItem value="1">Will be alloted later</MenuItem>
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
                    name="vocationalSem2"
                    label={mandatoryField('Semester 2')}
                    value={vocationalSem2}
                    onChange={this.handleChangeFields}
                  >
                    <MenuItem value="1">Will be alloted later</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Co-Curriculum</Typography>
                  <Divider />
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
                    disabled={true}
                    fullWidth
                    variant={preview ? 'standard' : 'outlined'}
                    name="coCurriculumSem1"
                    label={mandatoryField('Semester 1')}
                    value={coCurriculumSem1}
                    onChange={this.handleChangeFields}
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
                    disabled={true}
                    fullWidth
                    variant={preview ? 'standard' : 'outlined'}
                    name="coCurriculumSem2"
                    label={mandatoryField('Semester 2')}
                    value={coCurriculumSem2}
                    onChange={this.handleChangeFields}
                  />
                </Grid>
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
                          {documentTypeData.map((item, key) => (
                            <MenuItem key={key} value={item.documentTypeId}>
                              {item.documentType}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      {!preview && (
                        <Grid item md={3} xs={12}>
                          <FileUploader
                            buttonLabel="Upload Document"
                            accept="image/jpg,image/jpeg,image/png,application/pdf"
                            maxSize={5}
                            handleChange={this.handleUploadEnclosure}
                            id={'uploadDocument' + i}
                            index={i}
                          />
                        </Grid>
                      )}
                      <Grid item md={4} xs={12}>
                        {item.document !== '' && item.document !== null ? (
                          <Success>Uploaded.</Success>
                        ) : null}
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
                      <Grid
                        container
                        item
                        md={12}
                        xs={6}
                        justifyContent="flex-end"
                      >
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
              <Grid container item xs={12} justifyContent="center">
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
                <Grid container item xs={12} justifyContent="center">
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
                        maxSize={5}
                        handleChange={this.handleUpload}
                        id={'nationalCompetition'}
                        name="nationalCertificate"
                      />
                    </Grid>
                  )}
                  <Grid item md={4} xs={6}>
                    {nationalCertificate !== '' &&
                    nationalCertificate !== null ? (
                      <Success>Uploaded.</Success>
                    ) : null}
                  </Grid>
                  {courseType === '#pg2PG' && (
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
                  {courseType === '#pg2PG' && !preview && (
                    <Grid item md={2} xs={6}>
                      <FileUploader
                        buttonLabel="Upload Document"
                        accept="image/jpg,image/jpeg,image/png,application/pdf"
                        maxSize={5}
                        handleChange={this.handleUpload}
                        id={'otherCompetition'}
                        name="otherCertificate"
                      />
                    </Grid>
                  )}
                  {courseType === '#pg2PG' && (
                    <Grid item md={4} xs={6}>
                      {otherCertificate !== '' && otherCertificate !== null ? (
                        <Success>Uploaded.</Success>
                      ) : null}
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
                        maxSize={5}
                        handleChange={this.handleUpload}
                        id={'nccDoc'}
                        name="nccCertificate"
                      />
                    </Grid>
                  )}
                  <Grid item md={4} xs={6}>
                    {nccCertificate !== '' && nccCertificate !== null ? (
                      <Success>Uploaded.</Success>
                    ) : null}
                  </Grid>
                  {courseType === '#ug1UG' && (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="5"
                            checked={!freedomFighter ? false : true}
                            s
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
                          checked={!nationalSevaScheme ? false : true}
                          onChange={this.handleCalculateMeritCheck}
                          name="nationalSevaScheme"
                          color="primary"
                          disabled={preview}
                        />
                      }
                      label="(NSS) National Seva Scheme ?"
                    />
                  </Grid>
                  <Grid item md={3} xs={6}>
                    {nationalSevaScheme && !preview && (
                      <FileUploader
                        buttonLabel="Upload Document"
                        accept="image/jpg,image/jpeg,image/png,application/pdf"
                        maxSize={5}
                        handleChange={this.handleUpload}
                        id={'nssDoc'}
                        name="nssDocument"
                      />
                    )}
                  </Grid>
                  <Grid item md={5} xs={6}>
                    {nssDocument !== '' && nssDocument !== null ? (
                      <Success>Uploaded.</Success>
                    ) : null}
                  </Grid>
                  {courseType === '#pg2PG' && (
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
                  {courseType === '#pg2PG' && (
                    <Grid item md={2} xs={6}>
                      {!otherRoverRanger && !preview && (
                        <FileUploader
                          buttonLabel="Upload Document"
                          accept="image/jpg,image/jpeg,image/png,application/pdf"
                          maxSize={5}
                          handleChange={this.handleUpload}
                          id={'roverRanger'}
                          name="rrDocument"
                        />
                      )}
                    </Grid>
                  )}
                  {courseType === '#pg2PG' && (
                    <Grid item md={4} xs={6}>
                      {rrDocument !== '' && rrDocument !== null ? (
                        <Success>Uploaded.</Success>
                      ) : null}
                    </Grid>
                  )}
                  {courseType === '#pg2PG' && (
                    <Grid container item xs={12} justifyContent="center">
                      <Typography>OR</Typography>
                    </Grid>
                  )}
                  {courseType === '#pg2PG' && (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="3"
                            checked={!otherRoverRanger ? false : true}
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
                  {courseType === '#ug1UG' && (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="5"
                            checked={!bcom ? false : true}
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
              <FileUploader
                buttonLabel="Upload Certificate for Extra Merit Marks"
                accept="image/jpg,image/jpeg,image/png,application/pdf"
                maxSize={1}
                handleChange={this.handleUpload}
                id="uploadExtraMark"
                name="uploadExtraMark"
              />
              <Grid item md={4} xs={6}>
                {uploadExtraMark !== '' && uploadExtraMark !== null ? (
                  <Success>Uploaded.</Success>
                ) : null}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Extra Marks: <b>{totalMeritCount}</b>
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
                correct and I fulfill the eligibility condition for the course.
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
                    maxSize={5}
                    handleChange={this.handleUpload}
                    id="signature"
                    name="signature"
                  />
                )}
                &nbsp;&nbsp;
                {signature !== '' && signature !== null ? (
                  <img
                    className={classes.photo}
                    src={
                      typeof signature === 'object'
                        ? URL.createObjectURL(signature)
                        : ASSETS.url + signature
                    }
                  />
                ) : null}
              </div>
            </Grid>
            {!preview && (
              <Grid container item xs={12} justifyContent="center">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={(token) => this.handleReCaptcha(token)}
                  onExpired={() => this.handleReCaptcha('')}
                />
              </Grid>
            )}
            {!preview && (
              <Grid container item xs={6} justifyContent="flex-end">
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
            {preview && <PaymentInfo paymentDetails={paymentDetails} />}
          </Grid>
          {preview && (
            <Grid container item xs={12} justifyContent="center">
              <Box p={2}>
                <RegularButton
                  color="primary"
                  onClick={this.handleDownloadForm}
                >
                  Download Form & Payment Receipt
                </RegularButton>
              </Box>
            </Grid>
          )}
        </CardContainer>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Form))
