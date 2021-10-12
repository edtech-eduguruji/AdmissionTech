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
import classNames from 'classnames'
import jwtDecode from 'jwt-decode'
import config from 'myconfig'
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
  addSuccessMsg,
  calculateMerit,
  checkFaculty,
  closeDialog,
  deleteBox,
  downloadPdf,
  errorDialog,
  handleCalculateFees,
  mandatoryField,
  modifyKeys,
  redirectUrl,
  uploadViewer,
  validateUser,
  verifyString,
} from '../../utils/Utils'
import PaymentInfo from './PaymentInfo'
import academicDetailsStatic from './StaticData/academic.json'
import academicData from './StaticData/academicData.json'
import yearsStatic from './StaticData/admissionYears.json'
import categoryData from './StaticData/category.json'
import citiesData from './StaticData/cities.json'
import courseTypeData from './StaticData/courseType.json'
import documentsStatic from './StaticData/documents.json'
import documentTypeData from './StaticData/documentType.json'
import facultyData from './StaticData/faculty.json'
import majorSubjectsData from './StaticData/majorSubjects.json'
import meritCalculateData from './StaticData/meritCalculate.json'
import religionData from './StaticData/religion.json'
import semesterSubjectsData from './StaticData/semesterSubjects.json'
import statesData from './StaticData/states.json'
import streamData from './StaticData/stream.json'
import subCategoryData from './StaticData/subCategory.json'
import Validation from './Validation.json'

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
  unCheckIcon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        'url("https://admission.agracollegeagra.org.in/checkbox.png")',
      content: '""',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '97%',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      admissionYear: '',
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
      academicDetails: null,
      documents: null,
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
      totalMerit: meritCalculateData,
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
      courseFeeDetails: null,
      registrationNo: null,
      uploadExtraMark: null,
    }
  }

  componentDidMount() {
    const { isView, data } = this.props
    if (isView) {
      const dt = {
        registrationNo: data.registrationNo,
        receipt: '1',
      }
      FormApi.fetchPaymentDetails(dt).then((payResponse) => {
        if (payResponse.data) {
          this.setState({
            ...data,
            paymentDetails: jwtDecode(payResponse.data.payment).data,
            courseFeeDetails: payResponse.data.courseFee
              ? jwtDecode(payResponse.data.courseFee).data
              : null,
            totalMerit: {
              nationalCompetition: !data.nationalCompetition
                ? 0
                : parseInt(data.nationalCompetition.split(',')[1]),
              otherCompetition: !data.otherCompetition
                ? 0
                : parseInt(data.otherCompetition.split(',')[1]),
              freedomFighter: !data.freedomFighter ? 0 : 5,
              nationalSevaScheme: !data.nationalSevaScheme ? 0 : 5,
              ncc: data.ncc ? parseInt(data.ncc.split(',')[1]) : 0,
              roverRanger: data.roverRanger
                ? parseInt(data.roverRanger.split(',')[1])
                : 0,
              otherRoverRanger: !data.otherRoverRanger ? 0 : 3,
              bcom: !data.bcom ? 0 : 5,
              other: !data.other ? 0 : parseInt(data.other.split(',')[1]),
            },
          })
        } else {
          this.setState({
            ...data,
            totalMerit: {
              nationalCompetition: !data.nationalCompetition
                ? 0
                : parseInt(data.nationalCompetition.split(',')[1]),
              otherCompetition: !data.otherCompetition
                ? 0
                : parseInt(data.otherCompetition.split(',')[1]),
              freedomFighter: !data.freedomFighter ? 0 : 5,
              nationalSevaScheme: !data.nationalSevaScheme ? 0 : 5,
              ncc: data.ncc ? parseInt(data.ncc.split(',')[1]) : 0,
              roverRanger: data.roverRanger
                ? parseInt(data.roverRanger.split(',')[1])
                : 0,
              otherRoverRanger: !data.otherRoverRanger ? 0 : 3,
              bcom: !data.bcom ? 0 : 5,
              other: !data.other ? 0 : parseInt(data.other.split(',')[1]),
            },
          })
        }
      })
    } else {
      if (validateUser()) {
        const data = {
          registrationNo:
            LocalStorage.getUser() && LocalStorage.getUser().user_id,
          receipt: '1',
        }
        FormApi.getForm(data).then((response) => {
          if (response.data) {
            FormApi.fetchPaymentDetails(data).then((payResponse) => {
              if (payResponse.data) {
                this.setState({
                  paymentDetails: jwtDecode(payResponse.data.payment).data,
                  courseFeeDetails: payResponse.data.courseFee
                    ? jwtDecode(payResponse.data.courseFee).data
                    : null,
                })
              }

              if (response.data.submitted === '1' && !this.props.isPreview) {
                this.props.history.push('/formsubmitted')
              } else {
                Object.keys(response.data).map((item) => {
                  if (
                    response.data[item] === null ||
                    response.data[item] === 'null' ||
                    response.data[item] === 'false'
                  ) {
                    response.data[item] = ''
                  }
                })
                debugger
                response.data.academicDetails = response.data.academicDetails
                  ? JSON.parse(
                      verifyString(response.data.academicDetails),
                      (key, value) => {
                        return typeof value === 'string' ? value.trim() : value
                      }
                    )
                  : []
                modifyKeys(response.data.academicDetails)
                response.data.documents = response.data.documents
                  ? JSON.parse(response.data.documents)
                  : []
                response.data.major1 = response.data.major1
                  ? JSON.parse(response.data.major1)
                  : []
                response.data.major2 = response.data.major2
                  ? JSON.parse(response.data.major2)
                  : ''
                response.data.coCurriculumSem1 = 'Food, Nutrition and Hygiene'
                response.data.coCurriculumSem2 = 'First Aid and Basic health'
                response.data.totalMeritCount = !response.data.totalMeritCount
                  ? 0
                  : parseInt(response.data.totalMeritCount)
                this.setState({
                  ...response.data,
                  totalMerit: {
                    nationalCompetition: !response.data.nationalCompetition
                      ? 0
                      : parseInt(
                          response.data.nationalCompetition.split(',')[1]
                        ),
                    otherCompetition: !response.data.otherCompetition
                      ? 0
                      : parseInt(response.data.otherCompetition.split(',')[1]),
                    freedomFighter: !response.data.freedomFighter ? 0 : 5,
                    nationalSevaScheme: !response.data.nationalSevaScheme
                      ? 0
                      : 5,
                    ncc: response.data.ncc
                      ? parseInt(response.data.ncc.split(',')[1])
                      : 0,
                    roverRanger: response.data.roverRanger
                      ? parseInt(response.data.roverRanger.split(',')[1])
                      : 0,
                    otherRoverRanger: !response.data.otherRoverRanger ? 0 : 3,
                    bcom: !response.data.bcom ? 0 : 5,
                    other: !response.data.other
                      ? 0
                      : parseInt(response.data.other.split(',')[1]),
                  },
                })
              }
            })
          }
        })
      }
    }
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
      this.setState({
        [event.target.name]: event.target.value,
        admissionYear: '',
        academicDetails: [],
        documents: [],
        faculty: '',
        major1: [],
        major2: '',
        major3: '',
        major4: '',
        vocationalSem1: '',
        vocationalSem2: '',
        coCurriculumSem1: '',
        coCurriculumSem2: '',
        nationalCompetition: '',
        nationalCertificate: '',
        otherCompetition: '',
        otherCertificate: '',
        ncc: '',
        uploadExtraMark: null,
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
          ...meritCalculateData,
        },
        totalMeritCount: 0,
      })
    } else if (name === 'admissionYear') {
      this.setState({
        [event.target.name]: event.target.value,
        academicDetails:
          academicDetailsStatic[
            this.state.courseType + '-' + event.target.value
          ],
        documents:
          documentsStatic[this.state.courseType + '-' + event.target.value],
        faculty: '',
        major1: [],
        major2: '',
        major3: '',
        major4: '',
        vocationalSem1: '',
        vocationalSem2: '',
        coCurriculumSem1: '',
        coCurriculumSem2: '',
        nationalCompetition: '',
        nationalCertificate: '',
        otherCompetition: '',
        otherCertificate: '',
        ncc: '',
        uploadExtraMark: null,
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
          ...meritCalculateData,
        },
        totalMeritCount: 0,
      })
    } else if (name === 'major2') {
      this.setState({
        [event.target.name]: JSON.parse(event.target.value),
      })
    } else if (name === 'major3') {
      this.setState({
        major4: '',
        [event.target.name]: event.target.value,
      })
    } else if (name === 'major4') {
      this.setState({
        major3: '',
        [event.target.name]: event.target.value,
      })
    } else if (name === 'faculty') {
      this.setState({
        major1: [],
        major2: '',
        major3: '',
        major4: '',
        vocationalSem1: '',
        [event.target.name]: event.target.value,
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      })
    }
  }

  handleFieldChecked = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    })
  }

  handleInputChange = (e, index, val) => {
    const { name, value, checked } = e.target
    const { academicDetails } = this.state
    const list = [...academicDetails]
    if (val || value.match('^[A-Za-z0-9()/\\+-., $#]*$')) {
      if (val) {
        this.handleMultiDropDownData(e, val)
      } else if (name === 'promoted') {
        list[index][name] = checked
        if (checked) {
          list[index]['totalMarks'] = 0
          list[index]['marksObtained'] = 0
          list[index]['percentage'] = '_'
        } else {
          list[index]['totalMarks'] = ''
          list[index]['marksObtained'] = ''
          list[index]['percentage'] = ''
        }
      } else {
        list[index][name] = value
      }
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
        list.map((item, i) => {
          if (Object.keys(item).find((key) => key === 'faculty')) {
            item.faculty = ''
            item.major1 = []
          }
        })
        this.setState({
          faculty: '',
          major1: [],
          major2: '',
          major3: '',
          major4: '',
          vocationalSem1: '',
          vocationalSem2: '',
        })
      } else if (name === 'faculty') {
        list.map((item) => {
          if (Object.keys(item).find((key) => key === 'faculty')) {
            item.faculty = value
            item.major1 = []
          }
        })
        this.setState({
          faculty: value,
          major1: [],
          major2: '',
          major3: '',
          major4: '',
          vocationalSem1: '',
          vocationalSem2: '',
        })
      }
      if (!val) {
        this.setState({
          academicDetails: list,
        })
      }
    }
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
    const name = event.target.name
    const checked = event.target.checked
    let { totalMerit } = this.state
    if (!checked) {
      totalMerit[name] = 0
    } else {
      totalMerit[name] = parseInt(event.target.value)
    }
    let total = 0
    total = Object.values(totalMerit).reduce(
      (currentVal, nextVal) => currentVal + nextVal
    )
    if (name === 'otherRoverRanger') {
      if (totalMerit.roverRanger !== 0) {
        total = total - totalMerit.roverRanger
        totalMerit.roverRanger = 0
      }
      this.setState({
        roverRanger: '',
        [name]: checked,
        totalMerit,
        totalMeritCount: total > 17 ? 17 : total,
      })
    } else if (name === 'nationalSevaScheme' && !checked) {
      this.setState({
        nssDocument: null,
        [name]: checked,
        totalMerit,
        totalMeritCount: total > 17 ? 17 : total,
      })
    } else {
      this.setState({
        totalMeritCount: total > 17 ? 17 : total,
        [name]: checked,
        totalMerit,
      })
    }
  }

  handleCalculateMerit = (event) => {
    const name = event.target.name
    const value = event.target.value
    var { totalMerit } = this.state
    let total = 0
    console.log(totalMerit)
    totalMerit[name] = parseInt(value.split(',')[1])
    total = Object.values(totalMerit).reduce(
      (currentVal, nextVal) => currentVal + nextVal
    )
    if (name === 'other' && value === 'none,0') {
      this.setState({
        totalMerit,
        totalMeritCount: total <= 17 ? total : 17,
        [name]: value,
        uploadExtraMark: null,
      })
    } else if (name === 'ncc' && value === 'none,0') {
      this.setState({
        totalMerit,
        totalMeritCount: total <= 17 ? total : 17,
        [name]: value,
        nccCertificate: null,
      })
    } else if (name === 'nationalCompetition' && value === 'none,0') {
      this.setState({
        totalMerit,
        totalMeritCount: total <= 17 ? total : 17,
        [name]: value,
        nationalCertificate: null,
      })
    } else {
      this.setState({
        totalMerit,
        totalMeritCount: total <= 17 ? total : 17,
        [name]: value,
      })
    }
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
      admissionYear,
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
    const { isView } = this.props
    const data = new FormData()
    data.append(
      'registrationNo',
      LocalStorage.getUser() &&
        LocalStorage.getUser().user_id !== null &&
        !isView
        ? LocalStorage.getUser().user_id
        : this.props.data.registrationNo
    )
    data.append('admissionYear', admissionYear)
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
    data.append('vocationalSem1', vocationalSem1)
    data.append('vocationalSem2', vocationalSem2)
    data.append('coCurriculumSem1', coCurriculumSem1)
    data.append('coCurriculumSem2', coCurriculumSem2)
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

    data.append('academicDetails', JSON.stringify(academicDetails))
    data.append('documents', JSON.stringify(documents))
    data.append('major1', JSON.stringify(major1))
    data.append('major2', JSON.stringify(major2))
    data.append('major3', major3)
    data.append('major4', major4)

    documents &&
      documents.length > 0 &&
      documents.map(
        (item, index) =>
          item.document &&
          item.document !== '' &&
          typeof item.document === 'object' &&
          data.append('document' + index, item.document)
      )

    let tryToSubmit = 0
    if (btnValue === 0) {
      if (dob === '') {
        addErrorMsg('For saving the draft date of birth is mandatory.')
        return
      } else if (!token) {
        addErrorMsg("Please verify you're not a robot")
        return
      }
      tryToSubmit = 1
    } else {
      debugger
      if (
        photo &&
        nameTitle &&
        name &&
        dob &&
        gender &&
        religion &&
        caste &&
        personalMobile &&
        parentMobile &&
        aadharNo &&
        email &&
        mediumOfInstitution
      ) {
        if (
          wrn &&
          (admissionYear !== '1' ||
            form ||
            form != undefined ||
            form != null ||
            form != 'null' ||
            form != 'undefined' ||
            data.get('form'))
        ) {
          let cat = 0
          let subCat = 0
          if (!category || category == '') {
            addErrorMsg('Please select Category')
            return
          } else {
            if (category != '#c1General') {
              if (categoryCertificate) {
                cat = 1
              } else {
                addErrorMsg('Upload Category Certificate')
                return
              }
            } else {
              cat = 1
            }
          }

          if (!subCategory || subCategory == '') {
            addErrorMsg('Please select Sub-Category')
            return
          } else {
            if (subCategory != 'none') {
              if (subCategoryCertificate) {
                subCat = 1
              } else {
                addErrorMsg('Upload Sub-Category Certificate')
                return
              }
            } else {
              subCat = 1
            }
          }

          if (
            cat == 1 &&
            subCat == 1 &&
            fatherName &&
            motherName &&
            parentsOccupation &&
            guardianName &&
            relationOfApplicant
          ) {
            if (houseNo && street && state && city && pincode && postOffice) {
              if (
                academicDetails &&
                this.checkJSONfields(academicDetails) <= 0 &&
                courseType &&
                admissionYear
              ) {
                if (faculty && faculty !== '') {
                  let fac = 0
                  if (
                    //for other than bcom,bba and legal
                    checkFaculty(faculty) === 0 &&
                    major1.length >= 2 &&
                    major2 &&
                    (major3 || major4) &&
                    vocationalSem1 &&
                    vocationalSem2
                  ) {
                    fac = 1
                  } else if (checkFaculty(faculty) > 0 && major1.length >= 1) {
                    fac = 1
                  } else if (checkFaculty(faculty) < 0 && major1.length >= 3) {
                    fac = 1
                  } else {
                    addErrorMsg(
                      "Fill the empty fields in 'Faculty and Courses Details' Section"
                    )
                    return
                  }

                  if (fac == 1 && this.checkJSONfields(documents) <= 0) {
                    // ug 1, pg 1, law- llm 1, llb 1
                    let naCCount = 0,
                      nccCount = 0,
                      nSSCount = 0,
                      otherCount = 0,
                      otherCertCount = 0,
                      rangeRoverCount = 0,
                      validation = 0
                    if (
                      (courseType == '#ug1UG' && admissionYear == '1') ||
                      (courseType == 'law4LAW' &&
                        admissionYear == '1' &&
                        major1.length >= 1 &&
                        major1[0].subjectId == '$22ballb')
                    ) {
                      validation = 1
                      if (
                        (!nationalCompetition ||
                          nationalCompetition == 'none,0') &&
                        !nationalCertificate
                      ) {
                        naCCount = 1
                      } else if (
                        nationalCompetition !== 'none,0' &&
                        nationalCertificate
                      ) {
                        naCCount = 1
                      } else {
                        addErrorMsg(
                          'Upload "Participation in Zone / National Competition" Certificate'
                        )
                        return
                      }

                      if ((!ncc || ncc == 'none,0') && !nccCertificate) {
                        nccCount = 1
                      } else if (ncc !== 'none,0' && nccCertificate) {
                        nccCount = 1
                      } else {
                        addErrorMsg('Upload "NCC/Cadet" Certificate')
                        return
                      }

                      if (!nationalSevaScheme) {
                        nSSCount = 1
                      } else if (nationalSevaScheme && nssDocument) {
                        nSSCount = 1
                      } else {
                        addErrorMsg('Upload "NSS" Document')
                        return
                      }

                      if ((!other || other == 'none,0') && !uploadExtraMark) {
                        otherCount = 1
                      } else if (other !== 'none,0' && uploadExtraMark) {
                        otherCount = 1
                      } else {
                        addErrorMsg(
                          'Upload "Other Details / Extra Marks" Certificate'
                        )
                        return
                      }

                      if (
                        naCCount == 1 &&
                        nccCount == 1 &&
                        nSSCount == 1 &&
                        otherCount == 1
                      ) {
                      } else {
                        return
                      }
                    } else if (
                      (courseType == '#pg2PG' && admissionYear == '1') ||
                      (courseType == 'law4LAW' && admissionYear == '1')
                    ) {
                      validation = 1
                      if (
                        (!nationalCompetition ||
                          nationalCompetition == 'none,0') &&
                        !nationalCertificate
                      ) {
                        naCCount = 1
                      } else if (
                        nationalCompetition !== 'none,0' &&
                        nationalCertificate
                      ) {
                        naCCount = 1
                      } else {
                        addErrorMsg(
                          'Upload "Participation in Zone / National Competition" Certificate'
                        )
                        return
                      }

                      if (
                        (!otherCompetition || otherCompetition == 'none,0') &&
                        !otherCertificate
                      ) {
                        otherCertCount = 1
                      } else if (
                        otherCompetition !== 'none,0' &&
                        otherCertificate
                      ) {
                        otherCertCount = 1
                      } else {
                        addErrorMsg(
                          'Upload "Participation in Zone / National Competition" from Other University'
                        )
                        return
                      }

                      if (
                        (!roverRanger || roverRanger == 'none,0') &&
                        !rrDocument
                      ) {
                        rangeRoverCount = 1
                      } else if (roverRanger !== 'none,0' && rrDocument) {
                        rangeRoverCount = 1
                      } else if (otherRoverRanger) {
                        rangeRoverCount = 1
                      } else {
                        addErrorMsg(
                          'Please upload certificate or checkbox for range rover'
                        )
                        return
                      }

                      if ((!ncc || ncc == 'none,0') && !nccCertificate) {
                        nccCount = 1
                      } else if (ncc !== 'none,0' && nccCertificate) {
                        nccCount = 1
                      } else {
                        addErrorMsg('Upload "NCC/Cadet" Certificate')
                        return
                      }

                      if (!nationalSevaScheme) {
                        nSSCount = 1
                      } else if (nationalSevaScheme && nssDocument) {
                        nSSCount = 1
                      } else {
                        addErrorMsg('Upload "NSS" Document')
                        return
                      }

                      if ((!other || other == 'none,0') && !uploadExtraMark) {
                        otherCount = 1
                      } else if (other !== 'none,0' && uploadExtraMark) {
                        otherCount = 1
                      } else {
                        addErrorMsg(
                          'Upload "Other Details / Extra Marks" Certificate'
                        )
                        return
                      }

                      if (
                        naCCount == 1 &&
                        otherCertCount == 1 &&
                        rangeRoverCount == 1 &&
                        naCCount == 1 &&
                        nccCount == 1 &&
                        nSSCount == 1 &&
                        otherCount == 1
                      ) {
                      } else {
                        return
                      }
                    }

                    if (signature) {
                      if (token) {
                        tryToSubmit = 1
                      } else {
                        addErrorMsg("Please verify you're not a robot")
                      }
                    } else {
                      addErrorMsg('Upload Signature')
                    }
                  } else {
                    addErrorMsg(
                      "Fill the empty fields in 'Upload Documents' Section"
                    )
                  }
                } else {
                  addErrorMsg(
                    "Choose the faculty in 'Faculty and Courses Details' Section"
                  )
                }
              } else {
                addErrorMsg(
                  "Fill the empty fields in 'Academic Details' Section"
                )
              }
            } else {
              addErrorMsg(
                "Fill the empty fields in 'Permanent Address' Section"
              )
            }
          } else {
            addErrorMsg(
              "Fill the empty fields in 'Parent & Guardian Details' Section"
            )
          }
        } else {
          addErrorMsg('Please enter wrn number and upload wrn certificate')
        }
      } else {
        addErrorMsg("Fill the empty fields in 'Basic Details' Section")
      }
    }

    if (tryToSubmit === 1) {
      if (
        !isView &&
        admissionYear &&
        courseType &&
        new Date().getTime() >
          yearsStatic.find((item) => item.yearId === admissionYear).lastDate[
            courseType
          ]
      ) {
        errorDialog(
          'According to your selected course and year, registration are closed now.',
          'Notice'
        )
      } else {
        FormApi.submitForm(data).then((response) => {
          if (response.data) {
            if (btnValue === 1) {
              if (isView) {
                addSuccessMsg('Form Submitted Successfully.')
                closeDialog()
              } else {
                LocalStorage.setUser(response.data)
                let payment = handleCalculateFees(
                  admissionYear,
                  faculty,
                  gender,
                  major1
                )
                if (payment !== null) {
                  // Take "parameterId" and "amount" from  'payment' variable.
                  // And Proceed for Payment Process.
                  deleteBox(
                    `Your application is submitted successfully. 
                You have to pay the fees of Rs. ${payment.amount} for your applied course`,
                    this.handleCourseFees
                  )
                } else {
                  errorDialog(
                    'Your application is submitted successfully',
                    'Form'
                  )
                  redirectUrl('sFormSubmit', 1)
                }
              }
            } else {
              if (isView) {
                addSuccessMsg('Form Saved Successfully.')
                closeDialog()
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
          }
        })
      }
    }
  }

  handleCourseFees = () => {
    redirectUrl('sCourseFee', 1)
  }

  // 0: not null, >1: null
  checkJSONfields = (data) => {
    let isNull = 0
    if (data && data.length > 0) {
      data.map((item) => {
        for (let k in item) {
          if (
            typeof item[k] == 'string' &&
            (item[k] == undefined ||
              item[k] == 'undefined' ||
              item[k] == 'null' ||
              item[k] == null ||
              item[k] == '')
          ) {
            isNull = isNull + 1
            break
          }
        }
      })
    }
    return isNull
  }

  handleDownloadForm = () => {
    downloadPdf('form1234', 'FORM')
  }

  handleMultiDropDownData = (event, value) => {
    let { major1, faculty, academicDetails, documents } = this.state
    if (major1.length > value.length || value.length === 0) {
      if (major1[0].subjectName === 'LLM' && value.length === 0) {
        academicDetails.splice(2, 1)
        academicDetails.splice(2, 1)
        documents.splice(2, 1)
        documents.splice(2, 1)
      } else if (major1[0].subjectName === 'LLB' && value.length === 0) {
        academicDetails.splice(2, 1)
        documents.splice(2, 1)
      }
      academicDetails.map((item) => {
        if (
          Object.keys(item).find((key) => key === 'major1' || key === 'faculty')
        ) {
          item.major1 = value
        }
      })
      this.setState({
        major1: value,
        major2: '',
        major3: '',
        major4: '',
        vocationalSem1: '',
        vocationalSem2: '',
        academicDetails,
        documents,
        nationalCompetition: '',
        nationalCertificate: '',
        otherCompetition: '',
        otherCertificate: '',
        ncc: '',
        uploadExtraMark: null,
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
          ...meritCalculateData,
        },
        totalMeritCount: 0,
      })
    } else {
      if (checkFaculty(faculty) > 0) {
        if (value.length <= 1) {
          if (value[0].subjectName === 'LLM') {
            academicDetails.splice(
              2,
              0,
              academicDetailsStatic.GraduationDegree,
              academicDetailsStatic.LLB
            )
            documents.splice(
              2,
              0,
              documentsStatic.GraduationDegree,
              documentsStatic.LLB
            )
          } else if (value[0].subjectName === 'LLB') {
            academicDetails.splice(2, 0, academicDetailsStatic.GraduationDegree)
            documents.splice(2, 0, documentsStatic.GraduationDegree)
          }
          academicDetails.map((item) => {
            if (
              Object.keys(item).find(
                (key) => key === 'major1' || key === 'faculty'
              )
            ) {
              item.major1 = value
            }
          })
          this.setState({
            major1: value,
            academicDetails,
            documents,
            nationalCompetition: '',
            nationalCertificate: '',
            otherCompetition: '',
            otherCertificate: '',
            ncc: '',
            uploadExtraMark: null,
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
              ...meritCalculateData,
            },
            totalMeritCount: 0,
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
            academicDetails.map((item) => {
              if (Object.keys(item).find((key) => key === 'major1')) {
                item.major1 = value
              }
            })
            this.setState({
              major1: value,
              academicDetails,
              nationalCompetition: '',
              nationalCertificate: '',
              otherCompetition: '',
              otherCertificate: '',
              ncc: '',
              uploadExtraMark: null,
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
                ...meritCalculateData,
              },
              totalMeritCount: 0,
            })
          }
        } else {
          addErrorMsg('You can select only 3 subjects.')
        }
      } else {
        if (value.length <= 2) {
          academicDetails.map((item) => {
            if (Object.keys(item).find((key) => key === 'major1')) {
              item.major1 = value
            }
          })
          this.setState({
            major1: value,
            academicDetails,
            nationalCompetition: '',
            nationalCertificate: '',
            otherCompetition: '',
            otherCertificate: '',
            ncc: '',
            uploadExtraMark: null,
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
              ...meritCalculateData,
            },
            totalMeritCount: 0,
          })
        } else {
          addErrorMsg('You can select only 2 subjects.')
        }
      }
    }
  }

  handleReCaptcha = (token) => {
    this.setState({ token: token })
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
    const { faculty, major1, major2, academicDetails, admissionYear } =
      this.state
    if (
      academicDetails &&
      academicDetails.length > 0 &&
      academicDetails[1].stream
    ) {
      let subjects = majorSubjectsData.filter(
        (item) =>
          item.streamId.includes(academicDetails[1].stream) &&
          item.year.includes(admissionYear) &&
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
      admissionYear,
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
      courseFeeDetails,
      registrationNo,
      uploadExtraMark,
    } = this.state
    const { isPreview, isView } = this.props
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
            isView && (
              <RegularButton
                size="sm"
                color="danger"
                key="back"
                onClick={() => closeDialog()}
              >
                Back
              </RegularButton>
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
                    <li>
                      Any form related issue kindly email at
                      admissionagracollege@gmail.com
                    </li>
                  </ul>
                </Typography>
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <Typography variant="h6" component="div" gutterBottom>
                Your registration no: {registrationNo}
              </Typography>
              <Success>
                <Typography variant="h6" component="div" gutterBottom>
                  {admissionYear &&
                    courseType &&
                    admissionYear === '1' &&
                    courseType !== 'pgd3PGD' &&
                    courseType !== 'law4LAW' &&
                    courseType !== '#pg2PG' &&
                    faculty !== 'f8fobt' &&
                    faculty !== 'f6fom' &&
                    'Your merit is: ' +
                      calculateMerit(
                        courseType,
                        admissionYear,
                        academicDetails,
                        totalMeritCount,
                        major1,
                        bcom
                      )}
                </Typography>
              </Success>
              <Divider />
              <br />
              <br />
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
                name="admissionYear"
                label={mandatoryField('Admission Year')}
                value={admissionYear}
                onChange={this.handleChangeFields}
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
                  {!admissionYear || admissionYear === '1' ? (
                    <Typography>
                      Enter (WRN Number) university web registration no and
                      upload certification (in PDF or Image)
                      <br />
                      (*Mandatory to upload)
                    </Typography>
                  ) : (
                    <Typography>(*University Exam Roll No.)</Typography>
                  )}
                  <CustomInput
                    isMandatory={true}
                    minLength={Validation['wrn']['minLength']}
                    maxLength={Validation['wrn']['maxLength']}
                    smallLabel
                    labelText={mandatoryField(
                      !admissionYear || admissionYear === '1'
                        ? 'Web Registration No.'
                        : 'Roll No.'
                    )}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: 'wrn',
                      value: wrn,
                      disabled: preview,
                      helperText:
                        !admissionYear || admissionYear === '1'
                          ? 'For Ex: WRN21*********'
                          : '',
                    }}
                    handleChange={this.handleChangeFields}
                  />
                </Grid>
                <Grid container item xs={12} justifyContent="center">
                  <div className="alignCenter">
                    {!preview && admissionYear === '1' && (
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
                  {form !== '' && form !== null ? uploadViewer(form) : null}
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
                isMandatory={true}
                minLength={Validation['fullname']['minLength']}
                maxLength={Validation['fullname']['maxLength']}
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
                {categoryCertificate !== '' && categoryCertificate !== null
                  ? uploadViewer(categoryCertificate)
                  : null}
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
                subCategoryCertificate !== null
                  ? uploadViewer(subCategoryCertificate)
                  : null}
              </div>
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                isMandatory={true}
                minLength={Validation['personalMobile']['minLength']}
                maxLength={Validation['personalMobile']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['parentMobile']['minLength']}
                maxLength={Validation['parentMobile']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['aadharNo']['minLength']}
                maxLength={Validation['aadharNo']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['email']['minLength']}
                maxLength={Validation['email']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['fatherName']['minLength']}
                maxLength={Validation['fatherName']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['motherName']['minLength']}
                maxLength={Validation['motherName']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['parentsOccupation']['minLength']}
                maxLength={Validation['parentsOccupation']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['guardianName']['minLength']}
                maxLength={Validation['guardianName']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['relationOfApplicant']['minLength']}
                maxLength={Validation['relationOfApplicant']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['houseNo']['minLength']}
                maxLength={Validation['houseNo']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['street']['minLength']}
                maxLength={Validation['street']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['pincode']['minLength']}
                maxLength={Validation['pincode']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['postOffice']['minLength']}
                maxLength={Validation['postOffice']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['houseNo']['minLength']}
                maxLength={Validation['houseNo']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['street']['minLength']}
                maxLength={Validation['street']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['pincode']['minLength']}
                maxLength={Validation['pincode']['maxLength']}
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
                isMandatory={true}
                minLength={Validation['postOffice']['minLength']}
                maxLength={Validation['postOffice']['maxLength']}
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
            {courseType &&
            admissionYear &&
            academicDetails &&
            academicDetails.length > 0 ? (
              <Grid item xs={12}>
                {academicDetails.map((item, i) => (
                  <Box p={1} key={i}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item md={2} xs={12}>
                        <CustomInput
                          isMandatory={true}
                          minLength={Validation['nameOfExam']['minLength']}
                          maxLength={Validation['nameOfExam']['maxLength']}
                          smallLabel
                          labelText={mandatoryField('Name of Exam')}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'nameOfExam',
                            value: item.nameOfExam,
                            disabled: item.isDelete === 0,
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
                      </Grid>
                      {Object.keys(item).find((key) => key === 'faculty') ? (
                        <Grid item md={3} xs={12}>
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
                            value={item.faculty}
                            onChange={(e) => this.handleInputChange(e, i)}
                            variant={preview ? 'standard' : 'outlined'}
                            name="faculty"
                          >
                            {academicDetails[1].stream !== '' &&
                              facultyData.map(
                                (itm, key) =>
                                  itm.year.includes(admissionYear) &&
                                  itm.courseType === courseType && (
                                    <MenuItem
                                      key={key}
                                      disabled={
                                        ((academicDetails[1].stream ===
                                          '$s2Commerce' ||
                                          academicDetails[1].stream ===
                                            '$s3Arts') &&
                                          itm.facultyId === 'f1Science') ||
                                        ((academicDetails[1].stream ===
                                          '$s2Commerce' ||
                                          academicDetails[1].stream ===
                                            '$s3Arts' ||
                                          academicDetails[1].stream ===
                                            '$s1Science') &&
                                          itm.facultyId === 'f8fobt')
                                      }
                                      value={itm.facultyId}
                                    >
                                      {itm.faculty}
                                    </MenuItem>
                                  )
                              )}
                          </TextField>
                          <Box pt="5px">
                            <Autocomplete
                              disabled={preview}
                              value={item.major1}
                              onChange={(e, value) =>
                                this.handleInputChange(e, i, value)
                              }
                              multiple
                              name="major1"
                              options={this.filterMajorSubjects(item.major1)}
                              getOptionLabel={(option) => option.subjectName}
                              filterSelectedOptions
                              renderInput={(params) => (
                                <TextField
                                  label={mandatoryField(
                                    'Select Subject / Course'
                                  )}
                                  {...params}
                                  variant="outlined"
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                      ) : (
                        <Grid item md={2} xs={12}>
                          <CustomInput
                            isMandatory={true}
                            minLength={Validation['board']['minLength']}
                            maxLength={Validation['board']['maxLength']}
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
                            isMandatory={true}
                            minLength={Validation['institution']['minLength']}
                            maxLength={Validation['institution']['maxLength']}
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
                      )}
                      <Grid item md={1} xs={6}>
                        <CustomInput
                          isMandatory={true}
                          minLength={Validation['year']['minLength']}
                          maxLength={Validation['year']['maxLength']}
                          smallLabel
                          labelText={mandatoryField('Year')}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'year',
                            value: item.year,
                            disabled: preview,
                            type: 'number',
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item md={1} xs={6}>
                        <CustomInput
                          isMandatory={true}
                          minLength={Validation['rollNo']['minLength']}
                          maxLength={Validation['rollNo']['maxLength']}
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
                          isMandatory={true}
                          minLength={Validation['totalMarks']['minLength']}
                          maxLength={Validation['totalMarks']['maxLength']}
                          smallLabel
                          labelText={mandatoryField('Total Marks')}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'totalMarks',
                            value: item.totalMarks,
                            type: 'number',
                            disabled: preview || item.promoted,
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
                        <CustomInput
                          isMandatory={true}
                          minLength={Validation['marksObtained']['minLength']}
                          maxLength={Validation['marksObtained']['maxLength']}
                          smallLabel
                          labelText={mandatoryField('Marks Obtained')}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            name: 'marksObtained',
                            value: item.marksObtained,
                            type: 'number',
                            disabled: preview || item.promoted,
                          }}
                          handleChange={(e) => this.handleInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item md={1} xs={6}>
                        <CustomInput
                          isMandatory={true}
                          minLength={Validation['percentage']['minLength']}
                          maxLength={Validation['percentage']['maxLength']}
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
                      <Grid
                        item
                        md={
                          Object.keys(item).find(
                            (key) => key === 'stream' || key === 'faculty'
                          )
                            ? 1
                            : item.isDelete === 0
                            ? 3
                            : 2
                        }
                        xs={
                          Object.keys(item).find((key) => key === 'stream')
                            ? 6
                            : 12
                        }
                      >
                        {Object.keys(item).find((key) => key === 'promoted') ? (
                          <FormControlLabel
                            control={
                              <Checkbox
                                value="5"
                                checked={item.promoted}
                                onChange={(e) => this.handleInputChange(e, i)}
                                name="promoted"
                                color="primary"
                                disabled={preview}
                              />
                            }
                            label="Promoted?"
                          />
                        ) : (
                          <CustomInput
                            isMandatory={true}
                            minLength={Validation['subjects']['minLength']}
                            maxLength={Validation['subjects']['maxLength']}
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
                        )}
                      </Grid>
                      {Object.keys(item).find((key) => key === 'stream') ? (
                        <Grid item md={2} xs={6}>
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
                        {academicDetails &&
                          academicDetails.length - 1 === i &&
                          !preview && (
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
                  Select <b>"course type"</b> and <b>"admission year"</b> to
                  view this content.
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
                You can choose "Faculty of Science" only if you are from science
                stream in 12th
                <br />
                NOTE: (Statistics as major subject will be available only in
                combination with Math, Physics, Chemistry and English as other
                major subjects.)
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={preview || admissionYear !== '1'}
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
                {academicDetails &&
                  academicDetails.length > 1 &&
                  academicDetails[1].stream !== '' &&
                  facultyData.map(
                    (item, key) =>
                      item.year.includes(admissionYear) &&
                      item.courseType === courseType && (
                        <MenuItem
                          key={key}
                          disabled={
                            ((academicDetails[1].stream === '$s2Commerce' ||
                              academicDetails[1].stream === '$s3Arts') &&
                              item.facultyId === 'f1Science') ||
                            ((academicDetails[1].stream === '$s2Commerce' ||
                              academicDetails[1].stream === '$s3Arts' ||
                              academicDetails[1].stream === '$s1Science') &&
                              item.facultyId === 'f8fobt')
                          }
                          value={item.facultyId}
                        >
                          {item.faculty}
                        </MenuItem>
                      )
                  )}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Selection of Major Subjects
              </Typography>
              <Typography variant="caption">
                {checkFaculty(faculty) > 0
                  ? 'You can select an option from the list'
                  : checkFaculty(faculty) == 0
                  ? 'You can select any two subjects from the list'
                  : ''}
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disabled={preview || admissionYear !== '1'}
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
            {checkFaculty(faculty) == 0 &&
            admissionYear === '1' &&
            courseType === '#ug1UG' ? (
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
                    value={
                      major2
                        ? JSON.stringify(
                            majorSubjectsData.find(
                              (item) => item.subjectId === major2.subjectId
                            )
                          )
                        : ''
                    }
                    onChange={this.handleChangeFields}
                  >
                    {academicDetails &&
                      academicDetails.length > 1 &&
                      major1.length === 2 &&
                      majorSubjectsData.map((item, key) =>
                        facultyData.find(
                          (itm) => itm.facultyId === item.facultyId
                        ).courseType === courseType &&
                        item.year.includes(admissionYear) &&
                        item.subjectId !== '$20Bcom' &&
                        item.subjectId !== '$21Bba' &&
                        item.subjectId !== '$23Bca' &&
                        item.subjectId !== '$24bscbt' ? (
                          <MenuItem
                            disabled={
                              major1.some(
                                (itm) => item.subjectId === itm.subjectId
                              ) ||
                              this.checkCombination(item.subjectId) === 0 ||
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
                        ) : null
                      )}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="div" gutterBottom>
                    Selection of Minor / Elective Course
                  </Typography>
                  <Typography variant="caption">
                    You can only select one subject either from Semester 1 or
                    Semester 2 (NOTE: Subject to the Availability of the Sheet)
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
                    {academicDetails &&
                    academicDetails.length > 1 &&
                    major1.length > 0 &&
                    major2
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
                                  item.subjectId === major2.subjectId ||
                                  (major1[0].subjectId ===
                                    '$sf17BALLBZoology' &&
                                    (item.paperId === '$p6' ||
                                      item.paperId === '$p34')) ||
                                  (major1[1].subjectId ===
                                    '$sf17BALLBZoology' &&
                                    (item.paperId === '$p6' ||
                                      item.paperId === '$p34'))
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
                    {academicDetails &&
                    academicDetails.length > 1 &&
                    major1.length > 0 &&
                    major2
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
                                  item.subjectId === major2.subjectId ||
                                  (major1[0].subjectId ===
                                    '$sf17BALLBZoology' &&
                                    item.subjectId === '$s6Zoology') ||
                                  (major1[1].subjectId ===
                                    '$sf17BALLBZoology' &&
                                    item.subjectId === '$s6Zoology')
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
            ) : null}
            <Grid item xs={12} className="headBg">
              <Typography variant="subtitle1">
                Upload Documents <b>(allowed jpg,png,jpeg or pdf only.)</b>
              </Typography>
            </Grid>
            {courseType && admissionYear ? (
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
                        {item.document !== '' && item.document !== null
                          ? uploadViewer(item.document)
                          : null}
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
                  Select <b>"course type"</b> and <b>"admission year"</b> to
                  view this content.
                </Typography>
              </Grid>
            )}
            {admissionYear === '1' &&
              major1.length > 0 &&
              (courseType === '#ug1UG' ||
                courseType === '#pg2PG' ||
                courseType === 'law4LAW') && (
                <Grid item xs={12} className="headBg">
                  <Typography variant="subtitle1">
                    Other Details <b>(For More Details Read the Prospectus)</b>
                  </Typography>
                </Grid>
              )}
            {admissionYear === '1' &&
            major1.length > 0 &&
            (courseType === '#ug1UG' ||
              courseType === '#pg2PG' ||
              courseType === 'law4LAW') ? (
              <Grid item xs={12}>
                {courseType === '#pg2PG' ||
                major1[0].subjectName === 'LLM' ||
                major1[0].subjectName === 'LLB' ? (
                  <Typography>
                    विश्वविद्यालय की टीम के सदस्य के रुप में अन्तर्विश्वविद्यालय
                    प्रतियोगिता में भाग लेने के लिए
                  </Typography>
                ) : (
                  <Typography>
                    उत्तर क्षेत्रीय स्तर की टीम सदस्य के रुप में राज्यस्तरीय
                    राष्ट्रीय प्रतियोगिता में भाग लेने के लिए{' '}
                  </Typography>
                )}
                <Grid container spacing={2} alignItems="center">
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
                      name="nationalCompetition"
                      label="Participation in Zone / National Competition"
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

                  {nationalCompetition &&
                    nationalCompetition !== 'none,0' &&
                    !preview && (
                      <Grid item xs={6}>
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

                  {nationalCertificate && (
                    <Grid item xs={6}>
                      {uploadViewer(nationalCertificate)}
                    </Grid>
                  )}
                  {courseType === '#pg2PG' ||
                  major1[0].subjectName === 'LLM' ||
                  major1[0].subjectName === 'LLB' ? (
                    <Grid item xs={12}>
                      <Typography>
                        विश्वविद्यालय की टीम के सदस्य के रुप में राष्ट्रीय
                        प्रतियोगिता में भाग लेने
                      </Typography>
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
                        label="Participation in Zone / National Competition from Other University"
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
                  ) : null}

                  {otherCompetition && (
                    <Grid item xs={6}>
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

                  {otherCertificate && (
                    <Grid item xs={6}>
                      {uploadViewer(otherCertificate)}
                    </Grid>
                  )}

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
                  {ncc && ncc !== 'none,0' && !preview && (
                    <Grid item xs={6}>
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
                  {nccCertificate && (
                    <Grid item xs={6}>
                      {uploadViewer(nccCertificate)}
                    </Grid>
                  )}
                  {courseType === '#ug1UG' ||
                  major1[0].subjectName === 'B.A. LLB' ? (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checkedIcon={
                              <span
                                className={classNames(
                                  classes.icon,
                                  classes.checkedIcon
                                )}
                              />
                            }
                            icon={<span className={classes.unCheckIcon} />}
                            value="5"
                            checked={!freedomFighter ? false : true}
                            onChange={this.handleCalculateMeritCheck}
                            name="freedomFighter"
                            color="primary"
                            disabled={preview}
                          />
                        }
                        label="Freedom Fighter ?"
                      />
                    </Grid>
                  ) : null}
                  <Grid item md={4} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checkedIcon={
                            <span
                              className={classNames(
                                classes.icon,
                                classes.checkedIcon
                              )}
                            />
                          }
                          icon={<span className={classes.unCheckIcon} />}
                          value="5"
                          checked={!nationalSevaScheme ? false : true}
                          onChange={this.handleCalculateMeritCheck}
                          name="nationalSevaScheme"
                          color="primary"
                          disabled={preview}
                        />
                      }
                      label="(NSS) National Service Scheme ?"
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
                    {nssDocument && uploadViewer(nssDocument)}
                  </Grid>
                  {(courseType === '#pg2PG' ||
                    major1[0].subjectName === 'LLM' ||
                    major1[0].subjectName === 'LLB') && (
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
                  {!otherRoverRanger &&
                    roverRanger &&
                    roverRanger !== 'none,0' &&
                    !preview && (
                      <Grid item md={3} xs={6}>
                        <FileUploader
                          buttonLabel="Upload Document"
                          accept="image/jpg,image/jpeg,image/png,application/pdf"
                          maxSize={5}
                          handleChange={this.handleUpload}
                          id={'roverRanger'}
                          name="rrDocument"
                        />
                      </Grid>
                    )}
                  <Grid item md={3} xs={6}>
                    {rrDocument &&
                      !otherRoverRanger &&
                      uploadViewer(rrDocument)}
                  </Grid>
                  {courseType === '#pg2PG' ||
                  major1[0].subjectName === 'LLM' ||
                  major1[0].subjectName === 'LLB' ? (
                    <Grid container item xs={12} justifyContent="center">
                      <Typography>OR</Typography>
                    </Grid>
                  ) : null}
                  {courseType === '#pg2PG' ||
                  major1[0].subjectName === 'LLM' ||
                  major1[0].subjectName === 'LLB' ? (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checkedIcon={
                              <span
                                className={classNames(
                                  classes.icon,
                                  classes.checkedIcon
                                )}
                              />
                            }
                            icon={<span className={classes.unCheckIcon} />}
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
                  ) : null}
                  {courseType === '#ug1UG' ||
                  major1[0].subjectName === 'B.A. LLB' ? (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checkedIcon={
                              <span
                                className={classNames(
                                  classes.icon,
                                  classes.checkedIcon
                                )}
                              />
                            }
                            icon={<span className={classes.unCheckIcon} />}
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
                  ) : null}
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
                      डॉ. भीमराव आंबेडकर विश्वविद्यालय और सम्बद्ध महाविद्यालयों
                      में सेवारत एवं स्ववित पोषित संस्थान के विश्वविद्यालय
                      द्वारा अनुमोदित अनु बन्धित प्रवक्ता तथा अवकाश प्राप्त{' '}
                      <br /> केवल स्थायी अध्यापको एवं कर्मचारियों के
                      पति/पत्नी/पुत्री तथा कृषि संकाय में स्थायी परियोजना के
                      स्थायी परियोजनाओं के स्थायी कर्मचारियों के
                      पति/पत्नी/पुत्री/पुत्र।
                    </MenuItem>
                    <MenuItem
                      value="भारतीय सेना में सेवारत अथवा अवकाश प्राप्त अधिकारियों या अन्य
                रैंक के केवल पति/पत्नी/पुत्री/पुत्र (अविवाहित),10"
                    >
                      भारतीय सेना में सेवारत अथवा अवकाश प्राप्त अधिकारियों या
                      अन्य रैंक के केवल पति/पत्नी/पुत्री/पुत्र (अविवाहित)
                    </MenuItem>
                    <MenuItem
                      value="भारतीय सेना पैरा/मिलट्री फोर्स/अर्ध सैनिक बल (पुलिस/पीएसी) में
                कार्य करते हुये विजय के शहीदों के पुत्र/पुत्री/विधवाओं को प्रवेश
                में,17"
                    >
                      भारतीय सेना पैरा/मिलट्री फोर्स/अर्ध सैनिक बल (पुलिस/पीएसी)
                      में कार्य करते हुये विजय के शहीदों के पुत्र/पुत्री/विधवाओं
                      को प्रवेश में
                    </MenuItem>
                  </TextField>
                  {other && other !== 'none,0' && (
                    <FileUploader
                      buttonLabel="Upload Certificate for Extra Merit Marks"
                      accept="image/jpg,image/jpeg,image/png,application/pdf"
                      maxSize={1}
                      handleChange={this.handleUpload}
                      id="uploadExtraMark"
                      name="uploadExtraMark"
                    />
                  )}
                  <Grid item md={4} xs={6}>
                    {uploadExtraMark !== '' && uploadExtraMark !== null
                      ? uploadViewer(uploadExtraMark)
                      : null}
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
              </Grid>
            ) : null}
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
            {preview || isView ? (
              <Grid container>
                <PaymentInfo paymentDetails={paymentDetails} />
                <br />
                {courseFeeDetails && (
                  <PaymentInfo paymentDetails={courseFeeDetails} />
                )}
              </Grid>
            ) : null}
            {!preview ? (
              <Grid container item xs={12} justifyContent="center">
                <ReCAPTCHA
                  sitekey={config.CAPTCHA}
                  onChange={(token) => this.handleReCaptcha(token)}
                  onExpired={() => this.handleReCaptcha('')}
                />
              </Grid>
            ) : null}
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
            {!preview ? (
              <Grid item xs={6}>
                <RegularButton
                  color="primary"
                  onClick={this.handleSubmitForm(1)}
                >
                  Submit
                </RegularButton>
              </Grid>
            ) : null}
          </Grid>
          {(preview || isView) && (
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
