import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CFormLabel,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const sampleData = Array.from({ length: 33 }, (_, i) => ({
  case_number: `C${i + 1}`.padStart(4, '0'),
  account: `A${100 + i}`,
  last_name: `Last${i + 1}`,
  first_name: `First${i + 1}`,
  sys_prin: `SP${i + 1}`,
  active: i % 2 === 0 ? 'Yes' : 'No',
  reason: 'Auto-generated',
  addr1: `Addr1-${i + 1}`,
  addr2: `Addr2-${i + 1}`,
  city: `City${i + 1}`,
  state: 'NY',
  zip: '10001',
  hm_phone: '212-555-0000',
  wk_phone: '646-555-0000',
  status: 'Closed',
  num_cards: 2,
  next_date: '2025-04-01',
  no_renewal: false,
  disposition: 'Archived',
  in_date: '2024-03-15',
  delivery_id: 'D001',
  out_date: '2025-03-10',
  cycle: 'Monthly',
  in_hour: '10:00',
  auto_date: '2025-03-01',
  subreason: 'N/A',
}))

const DeleteCase = () => {
  const [selectedCase, setSelectedCase] = useState(sampleData[0])
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = sampleData.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(sampleData.length / recordsPerPage)

  const renderInputWithLabel = (label, value) => (
    <div className="d-flex align-items-center mb-2">
      <CFormLabel className="me-2 mb-0" style={{ minWidth: '150px' }}>{label}:</CFormLabel>
      <CFormInput value={value} readOnly style={{ fontSize: '0.9rem' }} />
    </div>
  )

  return (
    <CCard>
      <CCardHeader>
        <strong>Case Archive</strong>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4">
          <CCol>
            <CTable hover bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Case Number</CTableHeaderCell>
                  <CTableHeaderCell>Account</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Sys Prin</CTableHeaderCell>
                  <CTableHeaderCell>Active</CTableHeaderCell>
                  <CTableHeaderCell>Reason</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentRecords.map((item, index) => (
                  <CTableRow
                    key={index}
                    onClick={() => setSelectedCase(item)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedCase?.case_number === item.case_number ? '#f0f0f0' : '',
                    }}
                  >
                    <CTableDataCell>{item.case_number}</CTableDataCell>
                    <CTableDataCell>{item.account}</CTableDataCell>
                    <CTableDataCell>{`${item.first_name} ${item.last_name}`}</CTableDataCell>
                    <CTableDataCell>{item.sys_prin}</CTableDataCell>
                    <CTableDataCell>{item.active}</CTableDataCell>
                    <CTableDataCell>{item.reason}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <CPagination align="center" className="mt-3">
              {[...Array(totalPages)].map((_, i) => (
                <CPaginationItem
                  key={i + 1}
                  active={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  style={{ cursor: 'pointer' }}
                >
                  {i + 1}
                </CPaginationItem>
              ))}
            </CPagination>
          </CCol>
        </CRow>

        {selectedCase && (
          <>
            {/* Row 1: Address 1 + Address 2 */}
            <CRow className="mb-3">
              <CCol sm={6}>{renderInputWithLabel('Address 1', selectedCase.addr1)}</CCol>
              <CCol sm={6}>{renderInputWithLabel('Address 2', selectedCase.addr2)}</CCol>
            </CRow>

            {/* Row 2: City + State + Zip */}
            <CRow className="mb-3">
              <CCol sm={4}>{renderInputWithLabel('City', selectedCase.city)}</CCol>
              <CCol sm={4}>{renderInputWithLabel('State', selectedCase.state)}</CCol>
              <CCol sm={4}>{renderInputWithLabel('Zip', selectedCase.zip)}</CCol>
            </CRow>

            {/* Row 3: Home Phone + Work Phone */}
            <CRow className="mb-3">
              <CCol sm={6}>{renderInputWithLabel('Phone (Home)', selectedCase.hm_phone)}</CCol>
              <CCol sm={6}>{renderInputWithLabel('Phone (Work)', selectedCase.wk_phone)}</CCol>
            </CRow>

            {/* Other fields */}
            <CRow className="g-4">
              <CCol sm={6}>
                {renderInputWithLabel('Status', selectedCase.status)}
                {renderInputWithLabel('Cycle', selectedCase.cycle)}
                {renderInputWithLabel('Disposition', selectedCase.disposition)}
                {renderInputWithLabel('Subreason', selectedCase.subreason)}
                {renderInputWithLabel('Delivery ID', selectedCase.delivery_id)}
                {renderInputWithLabel('Out Date', selectedCase.out_date)}
                {renderInputWithLabel('In Hour', selectedCase.in_hour)}
              </CCol>
              <CCol sm={6}>
                {renderInputWithLabel('Next Date', selectedCase.next_date)}
                {renderInputWithLabel('Auto Date', selectedCase.auto_date)}
                {renderInputWithLabel('Number of Cards', selectedCase.num_cards)}
                {renderInputWithLabel('No Renewal', selectedCase.no_renewal ? 'Yes' : 'No')}
                {renderInputWithLabel('In Date', selectedCase.in_date)}
                {renderInputWithLabel('Reason', selectedCase.reason)}
              </CCol>
            </CRow>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default DeleteCase
