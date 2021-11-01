import { Grid, Switch } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FormApi from '../../../apis/FormApi'
import CardContainer from '../../../common/CardContainer'
import CustomPagination from '../../../common/CustomPagination'
import RegularButton from '../../../components/CustomButtons/Button'
import CustomTable from '../../../components/Table/Table'
import {
  addSuccessMsg,
  createdDateTime,
  errorDialog,
  formDialog,
  modifyKeys,
  updateInList,
  verifyString,
} from '../../../utils/Utils'
import Form from '../../StudentSrc/Form'
import PaymentHistory from '../../StudentSrc/PaymentHistory'
import facultyData from '../../StudentSrc/StaticData/faculty.json'
import Filters from '../Filters'

function NewForms() {
  const [fields, setFields] = useState({ formsData: [], limit: 10, offset: 0 })
  const { formsData, limit, offset } = fields

  useEffect(() => {
    handleGetForms()
  }, [limit, offset])

  const handleGetForms = (
    courseType,
    year,
    selection,
    category,
    status,
    faculty,
    major1,
    regNo,
    fromDate,
    toDate
  ) => {
    if (
      courseType ||
      year ||
      selection ||
      category ||
      status ||
      faculty ||
      major1 ||
      regNo ||
      fromDate ||
      toDate
    ) {
      const data = {
        limit: limit,
        offset: offset,
        courseType: courseType,
        admissionYear: year,
        selection: selection,
        category: category,
        status: status,
        faculty: faculty,
        major1: major1,
        regNo: regNo,
        fromDate: fromDate,
        toDate: toDate,
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
          obj.academicDetails = obj.academicDetails
            ? JSON.parse(verifyString(obj.academicDetails), (key, value) => {
                return typeof value === 'string' ? value.trim() : value
              })
            : []
          modifyKeys(obj.academicDetails)
          obj.documents = obj.documents ? JSON.parse(obj.documents) : []
          obj.major1 = obj.major1 ? JSON.parse(obj.major1) : []
          obj.major2 = obj.major2 ? JSON.parse(obj.major2) : ''
          obj.totalMeritCount = !obj.totalMeritCount
            ? 0
            : parseInt(obj.totalMeritCount)
          obj.totalMeritCount = !obj.totalMeritCount
            ? 0
            : parseInt(obj.totalMeritCount)
          obj.coCurriculumSem1 =
            obj.admissionYear === '1' ? 'Food, Nutrition and Hygiene' : ''
          obj.coCurriculumSem2 =
            obj.admissionYear === '1' ? 'First Aid and Basic health' : ''
        })
        setFields({ ...fields, formsData: response.data })
      })
    }
  }

  const formatData = (data) => {
    var formatted = data.map((item) => {
      let subs = []
      if (item.major1 && item.major1.length > 0) {
        item.major1.map((mj1) => {
          subs.push(mj1.subjectName)
        })
        subs = subs.join(',')
      } else {
        subs = null
      }
      return [
        item.registrationNo,
        item.name,
        item.fatherName,
        item.gender.toUpperCase(),
        item.dob,
        item.personalMobile,
        item.faculty
          ? facultyData.find((itm) => itm.facultyId === item.faculty).faculty
          : null,
        subs,
        createdDateTime(item.lastUpdated),
        item.payment === '1' ? 'PAID' : ' NOT PAID',
        item.submitted === '1' ? 'SUBMITTED' : 'NOT SUBMITTED',
        item.courseFee === '1' ? 'PAID' : '-',
        <div>
          <RegularButton
            size="md"
            color="primary"
            onClick={() =>
              formDialog(<Form isView isPreview="1" data={item} />, true)
            }
          >
            VIEW
          </RegularButton>
          <RegularButton
            size="md"
            color="danger"
            onClick={() => formDialog(<Form isView data={item} />, true)}
          >
            EDIT
          </RegularButton>
          <RegularButton
            size="md"
            onClick={() =>
              formDialog(
                <PaymentHistory userId={item.registrationNo} />,
                true,
                'Payment History'
              )
            }
          >
            Payment History
          </RegularButton>
          {item.admissionYear === '1' && item.payment === '1' && (
            <Switch
              checked={item.selection === '1'}
              onChange={handleStudentSelection(
                item.selection === '1' ? '0' : '1',
                item.registrationNo
              )}
            />
          )}
        </div>,
      ]
    })
    return formatted
  }

  const handleStudentSelection = (value, regNo) => () => {
    const data = new FormData()
    data.append('value', value)
    data.append('registrationNo', regNo)
    FormApi.studentSelection(data).then((res) => {
      if (res.status === 200) {
        if (!res.data.isError) {
          addSuccessMsg(
            value === '0'
              ? 'Student removed from selection list.'
              : 'Student added in selection list.'
          )
          setFields({
            ...fields,
            formsData: updateInList(
              formsData,
              { keyName: 'registrationNo', keyValue: regNo },
              { keyName: 'selection', keyValue: value }
            ),
          })
        } else {
          errorDialog(res.data.Response, 'Failed')
        }
      }
    })
  }

  const handlePagination = (limit, offset) => {
    setFields({ ...fields, limit, offset })
  }

  const handleUpdate = (
    courseType,
    year,
    selection,
    category,
    status,
    faculty,
    major1,
    regNo,
    fromDate,
    toDate
  ) => {
    handleGetForms(
      courseType,
      year,
      selection,
      category,
      status,
      faculty,
      major1,
      regNo,
      fromDate,
      toDate
    )
  }

  return (
    <CardContainer heading="New Registrations Form">
      <Filters handleUpdate={handleUpdate} />
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <CustomTable
            boldHeading
            tableHead={[
              'Registration No.',
              'Student Name',
              'Father Name',
              'Gender',
              'DOB',
              'Mobile',
              'Applied in',
              'Course / Subject',
              'Submitted On',
              'Prospectus Payment',
              'Form Submitted',
              'Course Payment',
              'View All Details',
            ]}
            tableData={formatData(formsData)}
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
