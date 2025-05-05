import React from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CRow,
} from '@coreui/react'

const Notes = ({ notes, setNotes }) => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
              <CFormLabel htmlFor="basic-url" style={{
                width: '400px',
                height: '38px',
                padding: '6px 10px',
                borderRadius: '8px',
                fontWeight: '500',
                color: '#4B0082',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Segoe UI, sans-serif',
                textAlign: 'left',
                fontSize: '0.95rem'
              }}>Enter Special Processing Notes for this SYS/PRIN</CFormLabel>
              <CInputGroup>
                  
              <CInputGroup>
                <CFormTextarea
                  id="special-notes"
                  aria-label="Special Processing Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    height: '150px',
                    fontSize: '0.95rem',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '500',
                    overflowY: 'auto',
                    resize: 'vertical',
                  }}
                />
              </CInputGroup>

              </CInputGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Notes
