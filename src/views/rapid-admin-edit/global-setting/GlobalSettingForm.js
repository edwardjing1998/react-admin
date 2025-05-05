import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CRow,
  CCol,
  CButton
} from '@coreui/react'

const GlobalSettingForm = () => {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Send your HTTP POST request here using fetch or axios
    console.log('Form submitted:', formData)
  }

  const handleCancel = () => {
    setFormData({
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
    })
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <CCard>
        <CCardHeader>
          <strong>HTTP Form</strong>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="field1">Field 1</CFormLabel>
              <CFormInput name="field1" value={formData.field1} onChange={handleChange} />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="field2">Field 2</CFormLabel>
              <CFormInput name="field2" value={formData.field2} onChange={handleChange} />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="field3">Field 3</CFormLabel>
              <CFormInput name="field3" value={formData.field3} onChange={handleChange} />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="field4">Field 4</CFormLabel>
              <CFormInput name="field4" value={formData.field4} onChange={handleChange} />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="field5">Field 5</CFormLabel>
              <CFormInput name="field5" value={formData.field5} onChange={handleChange} />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="field6">Field 6</CFormLabel>
              <CFormInput name="field6" value={formData.field6} onChange={handleChange} />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="field7">Field 7</CFormLabel>
              <CFormInput name="field7" value={formData.field7} onChange={handleChange} />
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" type="submit" className="me-2">OK</CButton>
          <CButton color="secondary" type="button" onClick={handleCancel}>Cancel</CButton>
        </CCardFooter>
      </CCard>
    </CForm>
  )
}

export default GlobalSettingForm
