import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CFormSelect
} from '@coreui/react'

const ReceivingFiles = () => {
  const [availableFiles, setAvailableFiles] = useState([
    'file1.pdf', 'file2.docx', 'file3.xlsx', 'file4.txt',
    'file5.pdf', 'file6.docx', 'file7.xlsx', 'file8.txt',
    'file9.pdf', 'file10.docx', 'file11.xlsx', 'file12.txt',
    'file13.pdf', 'file14.docx', 'file15.xlsx', 'file16.txt',
  ])

  const [selectedAvailable, setSelectedAvailable] = useState([])
  const [selectedSent, setSelectedSent] = useState([])

  const [sentFiles, setSentFiles] = useState([])

  const handleAdd = () => {
    const toMove = availableFiles.filter(file => selectedAvailable.includes(file))
    setAvailableFiles(availableFiles.filter(file => !selectedAvailable.includes(file)))
    setSentFiles([...sentFiles, ...toMove])
    setSelectedAvailable([])
  }

  const handleRemove = () => {
    const toMove = sentFiles.filter(file => selectedSent.includes(file))
    setSentFiles(sentFiles.filter(file => !selectedSent.includes(file)))
    setAvailableFiles([...availableFiles, ...toMove])
    setSelectedSent([])
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              {/* Left Box: Hosting Files */}
              <CCol sm={4}>
                <CRow style={{ height: '20px' }} />
                <CFormSelect
                  multiple
                  size="10"
                  style={{ height: '300px' }}
                  onChange={(e) =>
                    setSelectedAvailable([...e.target.selectedOptions].map(o => o.value))
                  }
                >
                  {availableFiles.map((file, idx) => (
                    <option key={idx} value={file}>{file}</option>
                  ))}
                </CFormSelect>
              </CCol>

              {/* Middle Buttons */}
              <CCol sm={2} className="d-flex flex-column align-items-center justify-content-center gap-3">
                <CButton
                  color="success"
                  variant="outline"
                  size="sm"
                  style={{ width: '120px' }}
                  onClick={handleAdd}
                >
                  Add ➡️
                </CButton>
                <CButton
                  color="danger"
                  variant="outline"
                  size="sm"
                  style={{ width: '120px' }}
                  onClick={handleRemove}
                >
                  ⬅️ Remove
                </CButton>
              </CCol>

              {/* Right Box: Sent Files */}
              <CCol sm={4}>
                <CRow style={{ height: '20px' }} />
                <CFormSelect
                  multiple
                  size="10"
                  style={{ height: '300px' }}
                  onChange={(e) =>
                    setSelectedSent([...e.target.selectedOptions].map(o => o.value))
                  }
                >
                  {sentFiles.map((file, idx) => (
                    <option key={idx} value={file}>{file}</option>
                  ))}
                </CFormSelect>
              </CCol>

              {/* Far Right Column: Additional Actions */}
              <CCol sm={2} className="d-flex flex-column align-items-center justify-content-center gap-3">
                <CButton color="secondary" variant="outline" size="sm" style={{ width: '120px' }}>
                  New
                </CButton>
                <CButton color="info" variant="outline" size="sm" style={{ width: '120px' }}>
                  Duplicate
                </CButton>
                <CButton color="warning" variant="outline" size="sm" style={{ width: '120px' }}>
                  Change All
                </CButton>
                <CButton color="dark" variant="outline" size="sm" style={{ width: '120px' }}>
                  Move
                </CButton>
                
                  {/* Spacer row */}
                 <div style={{ height: '20px' }} />

                <CButton color="primary" variant="outline" size="sm" style={{ width: '120px' }}>
                  OK
                </CButton>
                <CButton color="danger" variant="outline" size="sm" style={{ width: '120px' }}>
                  Cancel
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ReceivingFiles
