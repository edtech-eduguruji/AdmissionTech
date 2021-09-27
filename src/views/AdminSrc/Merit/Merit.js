import { Box, Divider, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import FormApi from '../../../apis/FormApi'
import CardContainer from '../../../common/CardContainer'
import { ExcelExport } from '../../../common/ExcelExport'
import {
  calculateMerit,
  deleteEachKeyPair,
  replaceKey,
  verifyString,
} from '../../../utils/Utils'
import categoryData from '../../StudentSrc/StaticData/category.json'
import citiesData from '../../StudentSrc/StaticData/cities.json'
import courseTypeData from '../../StudentSrc/StaticData/courseType.json'
import facultyData from '../../StudentSrc/StaticData/faculty.json'
import religionData from '../../StudentSrc/StaticData/religion.json'
import semesterSubjectsData from '../../StudentSrc/StaticData/semesterSubjects.json'
import statesData from '../../StudentSrc/StaticData/states.json'
import subCategoryData from '../../StudentSrc/StaticData/subCategory.json'
import Filters from '../Filters'

function NewForms() {
  const [fields, setFields] = useState({ formsData: [] })
  const { formsData } = fields

  const handleGetForms = (
    courseType,
    year,
    category,
    status,
    faculty,
    major1
  ) => {
    if (courseType && year && category && status && faculty) {
      const data = {
        courseType: courseType,
        admissionYear: year,
        category: category,
        status: status,
        faculty: faculty,
        major1: major1,
      }
      FormApi.getForm(data).then((response) => {
        response.data.map((obj) => {
          Object.keys(obj).map((item) => {
            if (
              obj[item] === 'null' ||
              obj[item] === null ||
              obj[item] === 'false'
            ) {
              obj[item] = ''
            }
          })
          obj.academicDetails =
            obj.academicDetails && obj.academicDetails.length > 0
              ? JSON.parse(verifyString(obj.academicDetails))
              : []
          obj.documents = obj.documents ? JSON.parse(obj.documents) : []
          obj.major1 = obj.major1 ? JSON.parse(obj.major1) : []
          obj.major2 = obj.major2 ? JSON.parse(obj.major2) : ''
          obj.totalMeritCount = !obj.totalMeritCount
            ? 0
            : parseInt(obj.totalMeritCount)
          obj.coCurriculumSem1 =
            obj.admissionYear === '1' ? 'Food, Nutrition and Hygiene' : ''
          obj.coCurriculumSem2 =
            obj.admissionYear === '1' ? 'First Aid and Basic health' : ''
        })
        setFields({ formsData: filteredData(response.data) })
      })
    } else {
      setFields({ formsData: [] })
    }
  }

  const filteredData = (data) => {
    let filteredData = data.map((item) => {
      let subitem = { ...item }
      subitem.vaccinated = subitem.vaccinated === '1' ? 'YES' : 'NO'
      subitem.courseType &&
        (subitem.courseType = courseTypeData.find(
          (val) => val.courseTypeId === subitem.courseType
        ).courseType)
      subitem.faculty &&
        (subitem.faculty = facultyData.find(
          (val) => val.facultyId === subitem.faculty
        ).faculty)
      subitem.cCity &&
        (subitem.cCity = citiesData.find(
          (val) => val.id === subitem.cCity
        ).name)
      subitem.cState &&
        (subitem.cState = statesData.find(
          (val) => val.code === subitem.cState
        ).name)
      subitem.city &&
        (subitem.city = citiesData.find((val) => val.id === subitem.city).name)
      subitem.city &&
        (subitem.state = statesData.find(
          (val) => val.code === subitem.state
        ).name)
      subitem.city &&
        (subitem.religion = religionData.find(
          (val) => val.religionId === subitem.religion
        ).religion)
      subitem.category &&
        (subitem.category = categoryData.find(
          (val) => val.categoryId === subitem.category
        ).category)
      subitem.subCategory &&
        (subitem.subCategory = subCategoryData.find(
          (val) => val.subCategoryId === subitem.subCategory
        ).subCategory)
      subitem.academicDetails &&
        subitem.academicDetails.length > 0 &&
        subitem.academicDetails.map((itm, i) => {
          Object.keys(itm).map((key) => {
            let p
            // Printing all columns of 'academicDetails'
            // if (key !== 'isDelete') {
            //   let keyName = key + ' (' + parseInt(i + 1) + ')'
            //   if (key === 'stream') {
            //     subitem[keyName] = streamData.find(
            //       (val) => val.streamId === itm.stream
            //     ).stream
            //   } else {
            //     subitem[keyName] = itm[key]
            //   }
            // }
            if (key === 'percentage') {
              if (itm[key]) {
                p = itm[key]
              } else {
                p = null
              }
              let keyName =
                i === 0
                  ? 'High School'
                  : i === 1
                  ? 'Intermediate'
                  : 'Graduation'
              subitem[keyName + '(Percentage)'] = p
            }
          })
        })
      subitem.major1 &&
        subitem.major1.length > 0 &&
        (subitem.major1.length === 1
          ? (subitem.major1 = subitem.major1[0].subjectName)
          : (subitem.major1 =
              subitem.major1[0].subjectName +
              ', ' +
              subitem.major1[1].subjectName))
      subitem.major2 && (subitem.major2 = subitem.major2.subjectName)
      subitem.major3 &&
        (subitem.major3 = semesterSubjectsData.find(
          (val) => val.paperId === subitem.major3
        ).subjectName)
      subitem.major4 &&
        (subitem.major4 = semesterSubjectsData.find(
          (val) => val.subjectId === subitem.major4
        ).subjectName)
      subitem.nationalCompetition &&
        (subitem.nationalCompetition =
          subitem.nationalCompetition.split(',')[0])
      subitem.otherCompetition &&
        (subitem.otherCompetition = subitem.otherCompetition.split(',')[0])
      subitem.ncc && (subitem.ncc = subitem.ncc.split(',')[0])
      subitem.freedomFighter = subitem.freedomFighter === 'true' ? 'YES' : 'NO'
      subitem.nationalSevaScheme =
        subitem.nationalSevaScheme === 'true' ? 'YES' : 'NO'
      subitem.otherRoverRanger =
        subitem.otherRoverRanger === 'true' ? 'YES' : 'NO'
      subitem.bcom = subitem.bcom === 'true' ? 'YES' : 'NO'
      subitem.other && (subitem.other = subitem.other.split(',')[0])
      subitem.admissionYear &&
        subitem.courseType &&
        subitem.admissionYear === '1' &&
        subitem.courseType !== 'pgd3PGD' &&
        (subitem.Merit_Points = subitem.totalMeritCount)
      subitem.admissionYear &&
        subitem.courseType &&
        subitem.admissionYear === '1' &&
        subitem.courseType !== 'pgd3PGD' &&
        (subitem.Total_Merit = calculateMerit(
          subitem.courseType,
          subitem.admissionYear,
          subitem.academicDetails,
          subitem.totalMeritCount,
          subitem.submitted
        ))
      return subitem
    })
    filteredData = replaceKey(filteredData, 'Vaccinated', 'vaccinated')
    filteredData = replaceKey(
      filteredData,
      'Registration No.',
      'registrationNo'
    )
    filteredData = replaceKey(filteredData, 'Title', 'nameTitle')
    filteredData = replaceKey(filteredData, 'Name', 'name')
    filteredData = replaceKey(filteredData, 'DOB', 'dob')
    filteredData = replaceKey(filteredData, 'Gender', 'gender')
    filteredData = replaceKey(filteredData, 'Religion', 'religion')
    filteredData = replaceKey(filteredData, 'Caste', 'caste')
    filteredData = replaceKey(filteredData, 'Category', 'category')
    filteredData = replaceKey(filteredData, 'Sub-Category', 'subCategory')
    filteredData = replaceKey(filteredData, 'Student Mobile', 'personalMobile')
    filteredData = replaceKey(filteredData, 'Parent Mobile', 'parentMobile')
    filteredData = replaceKey(filteredData, 'Aadhar No.', 'aadharNo')
    filteredData = replaceKey(filteredData, 'Email', 'email')
    filteredData = replaceKey(
      filteredData,
      'Institution Medium',
      'mediumOfInstitution'
    )
    filteredData = replaceKey(
      filteredData,
      'Parents Occupation',
      'parentsOccupation'
    )
    filteredData = replaceKey(filteredData, 'Guardian Name', 'guardianName')
    filteredData = replaceKey(
      filteredData,
      'Relation of Applicant',
      'relationOfApplicant'
    )
    filteredData = replaceKey(filteredData, 'House No.', 'houseNo')
    filteredData = replaceKey(filteredData, 'Street', 'street')
    filteredData = replaceKey(filteredData, 'Pincode', 'pincode')
    filteredData = replaceKey(filteredData, 'Post Office', 'postOffice')
    filteredData = replaceKey(filteredData, 'State', 'state')
    filteredData = replaceKey(filteredData, 'City', 'city')
    filteredData = replaceKey(filteredData, 'Cor. House No.', 'cHouseNo')
    filteredData = replaceKey(filteredData, 'Cor. Street', 'cStreet')
    filteredData = replaceKey(filteredData, 'Cor. Pincode', 'cPincode')
    filteredData = replaceKey(filteredData, 'Cor. Post Office', 'cPostOffice')
    filteredData = replaceKey(filteredData, 'Cor. State', 'cState')
    filteredData = replaceKey(filteredData, 'Cor. City', 'cCity')
    filteredData = replaceKey(filteredData, 'Faculty', 'faculty')
    filteredData = replaceKey(filteredData, 'Course Type', 'courseType')
    filteredData = replaceKey(filteredData, 'WRN No.', 'wrn')
    filteredData = replaceKey(filteredData, 'Father Name', 'fatherName')
    filteredData = replaceKey(filteredData, 'Mother Name', 'motherName')
    filteredData = replaceKey(filteredData, 'Major Subjects', 'major1')
    filteredData = replaceKey(filteredData, 'Major Subject (Third)', 'major2')
    filteredData = replaceKey(
      filteredData,
      'Vocational Subject (Sem 1)',
      'vocationalSem1'
    )
    filteredData = replaceKey(
      filteredData,
      'Vocational Subject (Sem 2)',
      'vocationalSem2'
    )
    filteredData = replaceKey(
      filteredData,
      'Minor / Elective Course (Sem 1)',
      'major3'
    )
    filteredData = replaceKey(
      filteredData,
      'Minor / Elective Course (Sem 2)',
      'major4'
    )
    filteredData = replaceKey(
      filteredData,
      'Co-Curriculum (Sem 1)',
      'coCurriculumSem1'
    )
    filteredData = replaceKey(
      filteredData,
      'Co-Curriculum (Sem 2)',
      'coCurriculumSem2'
    )
    filteredData = replaceKey(
      filteredData,
      'National Competition',
      'nationalCompetition'
    )
    filteredData = replaceKey(
      filteredData,
      'Other Competition',
      'otherCompetition'
    )
    filteredData = replaceKey(filteredData, 'NCC', 'ncc')
    filteredData = replaceKey(filteredData, 'Freedom Fighter', 'freedomFighter')
    filteredData = replaceKey(
      filteredData,
      'National Service Scheme',
      'nationalSevaScheme'
    )
    filteredData = replaceKey(filteredData, 'Rover Ranger', 'roverRanger')
    filteredData = replaceKey(
      filteredData,
      'Other Rover Ranger',
      'otherRoverRanger'
    )
    filteredData = replaceKey(filteredData, 'B.Com', 'bcom')
    filteredData = replaceKey(filteredData, 'Other', 'other')
    filteredData = deleteEachKeyPair(filteredData, 'id')
    filteredData = deleteEachKeyPair(filteredData, 'photo')
    filteredData = deleteEachKeyPair(filteredData, 'form')
    filteredData = deleteEachKeyPair(filteredData, 'signature')
    filteredData = deleteEachKeyPair(filteredData, 'payment')
    filteredData = deleteEachKeyPair(filteredData, 'submitted')
    filteredData = deleteEachKeyPair(filteredData, 'lastUpdated')
    filteredData = deleteEachKeyPair(filteredData, 'creationTime')
    filteredData = deleteEachKeyPair(filteredData, 'nationalCertificate')
    filteredData = deleteEachKeyPair(filteredData, 'otherCertificate')
    filteredData = deleteEachKeyPair(filteredData, 'nccCertificate')
    filteredData = deleteEachKeyPair(filteredData, 'nssDocument')
    filteredData = deleteEachKeyPair(filteredData, 'rrDocument')
    filteredData = deleteEachKeyPair(filteredData, 'categoryCertificate')
    filteredData = deleteEachKeyPair(filteredData, 'subCategoryCertificate')
    filteredData = deleteEachKeyPair(filteredData, 'academicDetails')
    filteredData = deleteEachKeyPair(filteredData, 'documents')
    filteredData = deleteEachKeyPair(filteredData, 'courseFee')
    filteredData = deleteEachKeyPair(filteredData, 'admissionYear')
    filteredData = deleteEachKeyPair(filteredData, 'uploadExtraMark')
    filteredData = deleteEachKeyPair(filteredData, 'totalMeritCount')
    return filteredData
  }

  const handleUpdate = (
    courseType,
    year,
    category,
    status,
    faculty,
    major1
  ) => {
    setFields({ formsData: [] })
    handleGetForms(courseType, year, category, status, faculty, major1)
  }

  return (
    <CardContainer heading="Download Excel">
      <Filters excel handleUpdate={handleUpdate} />
      <Grid container alignItems="center">
        <Grid container item xs={12} justifyContent="center">
          {formsData.length > 0 ? (
            <div className="center">
              <Box p={2}>
                <Typography>Total No. of Forms : {formsData.length}</Typography>
              </Box>
              <ExcelExport
                csvData={formsData}
                fileName={new Date().getTime()}
              />
            </div>
          ) : (
            <Box pt="10px">
              <Divider />
              <Typography variant="overline">
                Data is Not Available Please Select Above Options and Hit{' '}
                <b>'SUBMIT'</b> Button
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </CardContainer>
  )
}

export default NewForms
