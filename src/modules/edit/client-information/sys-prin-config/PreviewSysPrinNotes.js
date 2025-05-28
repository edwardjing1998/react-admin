import React from 'react'
import { CFormTextarea } from '@coreui/react'
import { CCard, CCardBody } from '@coreui/react';

const SysPrinNotes = ({ data }) => {
  return (
    <>
      <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
            className="d-flex align-items-center"
            style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
            <span style={{ fontSize: '0.85rem' }}>Sys/Prin Notes</span>
            </CCardBody>
        </CCard>
        <CCard style={{ height: '150px', marginBottom: '4px', marginTop: '12px', border: '0px solid gray' }}>
              <CCardBody
              className="d-flex align-items-center"
              style={{ padding: '0.25rem 0.5rem', height: '100%' }}
              >
              <div style={{ width: '100%', height: '100%' }}>
                    <CFormTextarea
                      id="special-notes"
                      aria-label="Special Processing Notes"
                      value={data.notes}
                      readOnly
                      style={{
                        height: '145px',
                        fontSize: '0.78rem',
                        fontFamily: 'Segoe UI, sans-serif',
                        fontWeight: '500',
                        overflowY: 'auto',
                        resize: 'vertical',
                      }}
                    />
                  </div>
              </CCardBody>
        </CCard>
    </>
  )
}

export default SysPrinNotes
