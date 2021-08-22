import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FormApi from '../../../apis/FormApi'
import CardContainer from '../../../common/CardContainer'
import CustomPagination from '../../../common/CustomPagination'
import { ExcelExport } from '../../../common/ExcelExport'
import RegularButton from '../../../components/CustomButtons/Button'
import CustomTable from '../../../components/Table/Table'
import { deleteEachKeyPair, formDialog, replaceKey } from '../../../utils/Utils'
import Form from '../../StudentSrc/Form'
import categoryData from '../../StudentSrc/StaticData/category.json'
import citiesData from '../../StudentSrc/StaticData/cities.json'
import courseTypeData from '../../StudentSrc/StaticData/courseType.json'
import facultyData from '../../StudentSrc/StaticData/faculty.json'
import religionData from '../../StudentSrc/StaticData/religion.json'
import semesterSubjectsData from '../../StudentSrc/StaticData/semesterSubjects.json'
import statesData from '../../StudentSrc/StaticData/states.json'
import subCategoryData from '../../StudentSrc/StaticData/subCategory.json'

function NewForms() {
  const [formsData, setFormsData] = useState([])

  useEffect(() => {
    handleGetForms(10, 0)
  }, [])

  const handleGetForms = (limit, offset) => {
    const data = {
      limit: limit,
      offset: offset,
    }
    FormApi.getForm(data).then((response) => {
      response.data.map((obj) => {
        Object.keys(obj).map((item) => {
          if (obj[item] === 'null') {
            obj[item] = ''
          }
        })
        obj.academicDetails = JSON.parse(obj.academicDetails)
        obj.documents = JSON.parse(obj.documents)
        obj.major1 = JSON.parse(obj.major1)
        obj.major2 = JSON.parse(obj.major2)
        obj.coCurriculumSem1 = 'Food, Nutrition and Hygiene'
        obj.coCurriculumSem2 = 'First Aid and Basic health'
      })
      setFormsData(response.data)
    })
  }

  const formatData = (data) => {
    var formatted = data.map((item) => {
      return [
        item.name,
        item.gender.toUpperCase(),
        item.dob,
        item.personalMobile,
        facultyData.find((itm) => itm.facultyId === item.faculty).faculty,
        <RegularButton
          size="md"
          color="primary"
          onClick={() =>
            formDialog(<Form isView isPreview="1" data={item} />, true)
          }
        >
          VIEW
        </RegularButton>,
      ]
    })
    return formatted
  }

  const filteredData = (data) => {
    let filteredData = data.map((item) => {
      let subitem = { ...item }
      subitem.vaccinated = subitem.vaccinated === '1' ? 'YES' : 'NO'
      subitem.major3 = semesterSubjectsData.find(
        (val) => val.paperId === subitem.major3
      ).subjectName
      subitem.courseType = courseTypeData.find(
        (val) => val.courseTypeId === subitem.courseType
      ).courseType
      subitem.faculty = facultyData.find(
        (val) => val.facultyId === subitem.faculty
      ).faculty
      subitem.cCity = citiesData.find((val) => val.id === subitem.cCity).name
      subitem.cState = statesData.find(
        (val) => val.code === subitem.cState
      ).name
      subitem.city = citiesData.find((val) => val.id === subitem.city).name
      subitem.state = statesData.find((val) => val.code === subitem.state).name
      subitem.religion = religionData.find(
        (val) => val.religionId === subitem.religion
      ).religion
      subitem.category = categoryData.find(
        (val) => val.categoryId === subitem.category
      ).category
      subitem.subCategory
        ? (subitem.subCategory = subCategoryData.find(
            (val) => val.subCategoryId === subitem.subCategory
          ).subCategory)
        : null
      subitem.academicDetails.map((itm, i) => {
        Object.keys(itm).map((key) => {
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
            let keyName =
              i === 0 ? 'High School' : i === 1 ? 'Intermediate' : 'Graduation'
            subitem[keyName + '(Percentage)'] = itm[key]
          }
        })
      })
      subitem.major1.length === 1
        ? (subitem.major1 = subitem.major1[0].subjectName)
        : (subitem.major1 =
            subitem.major1[0].subjectName +
            ', ' +
            subitem.major1[1].subjectName)
      subitem.major2 ? (subitem.major2 = subitem.major2.subjectName) : null
      subitem.nationalCompetition
        ? (subitem.nationalCompetition =
            subitem.nationalCompetition.split(',')[0])
        : null
      // subitem.ncc ? (subitem.ncc = subitem.ncc.split(',')[0]) : null
      // subitem.other ? (subitem.other = subitem.other.split(',')[0]) : null
      // subitem.nationalSevaScheme === 'true'
      //   ? (subitem.nationalSevaScheme = 'YES')
      //   : (subitem.nationalSevaScheme = 'NO')
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
    filteredData = replaceKey(filteredData, 'Total Merit', 'totalMeritCount')
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
    filteredData = deleteEachKeyPair(filteredData, 'nationalCompetition')
    filteredData = deleteEachKeyPair(filteredData, 'otherCompetition')
    filteredData = deleteEachKeyPair(filteredData, 'ncc')
    filteredData = deleteEachKeyPair(filteredData, 'freedomFighter')
    filteredData = deleteEachKeyPair(filteredData, 'nationalSevaScheme')
    filteredData = deleteEachKeyPair(filteredData, 'roverRanger')
    filteredData = deleteEachKeyPair(filteredData, 'otherRoverRanger')
    filteredData = deleteEachKeyPair(filteredData, 'bcom')
    filteredData = deleteEachKeyPair(filteredData, 'other')
    return filteredData
  }

  const handlePagination = (limit, offset) => {
    handleGetForms(limit, offset)
  }

  return (
    <CardContainer heading="New Registrations Form">
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <CustomTable
            boldHeading
            tableHead={[
              'Student Name',
              'Gender',
              'DOB',
              'Mobile',
              'Applied in',
              'View All Details',
            ]}
            tableData={formatData(formsData)}
          />
        </Grid>
        <Grid container item sm={6} xs={12} justifyContent="center">
          <ExcelExport
            csvData={filteredData(formsData)}
            fileName={new Date().getTime()}
          />
        </Grid>
        <Grid container item sm={6} xs={12} justifyContent="center">
          <CustomPagination
            handleChange={handlePagination}
            data={formsData}
            limit={10}
          />
        </Grid>
      </Grid>
    </CardContainer>
  )
}

export default NewForms
