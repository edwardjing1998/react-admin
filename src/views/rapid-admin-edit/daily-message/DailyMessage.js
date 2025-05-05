import React, { useState } from 'react'
import {
  CCard, CCardBody, CRow, CCol,
  CFormLabel, CFormSelect, CFormInput,
  CButton, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell,
  CPagination, CPaginationItem,
} from '@coreui/react'

const DailyTransactionPage = () => {
  const [client, setClient] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 10

  const sampleTransactions = Array.from({ length: 50 }, (_, i) => ({
    trans_no: i + 1,
    case_number: `C${1000 + i}`,
    type: ['CREATE', 'UPDATE', 'DELETE'][i % 3],
    command_line: `command-${i}`,
    system_type: `SYS${i % 5}`,
    retry_count: i % 3,
    date_time: `2025-03-28T10:${String((i % 60)).padStart(2, '0')}:00`,
    cycle: i % 2 === 0 ? 'Monthly' : 'Weekly',
  }))

  const paginatedData = sampleTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <CCard className="p-3">
      <CCardBody>
        {/* First Row: Client Dropdown + Buttons */}
        <CRow className="mb-2 align-items-center">
          <CCol md={1}>
            <CFormLabel htmlFor="client" className="mb-0">Client</CFormLabel>
          </CCol>
          <CCol md={4}>
            <CFormSelect
              id="client"
              name="client"
              size="sm"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            >
              <option value="">Select Client</option>
              <option value="CLIENT1">CLIENT1</option>
              <option value="CLIENT2">CLIENT2</option>
            </CFormSelect>
          </CCol>
          <CCol md={7} className="d-flex justify-content-end gap-2">
            <CButton color="primary" size="sm">Print</CButton>
            <CButton color="info" size="sm">Preview</CButton>
            <CButton color="secondary" size="sm">Cancel</CButton>
          </CCol>
        </CRow>

        {/* Second Row: From and To Dates */}
        <CRow className="mb-3 align-items-center">
          <CCol md={1}>
            <CFormLabel htmlFor="fromDate" className="mb-0">From</CFormLabel>
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="date"
              id="fromDate"
              name="fromDate"
              size="sm"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </CCol>

          <CCol md={1}>
            <CFormLabel htmlFor="toDate" className="mb-0">To</CFormLabel>
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="date"
              id="toDate"
              name="toDate"
              size="sm"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </CCol>
        </CRow>

        {/* Table */}
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Trans No</CTableHeaderCell>
              <CTableHeaderCell>Case Number</CTableHeaderCell>
              <CTableHeaderCell>Type</CTableHeaderCell>
              <CTableHeaderCell>Command Line</CTableHeaderCell>
              <CTableHeaderCell>System Type</CTableHeaderCell>
              <CTableHeaderCell>Retry Count</CTableHeaderCell>
              <CTableHeaderCell>Date Time</CTableHeaderCell>
              <CTableHeaderCell>Cycle</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paginatedData.map((txn) => (
              <CTableRow key={txn.trans_no}>
                <CTableDataCell>{txn.trans_no}</CTableDataCell>
                <CTableDataCell>{txn.case_number}</CTableDataCell>
                <CTableDataCell>{txn.type}</CTableDataCell>
                <CTableDataCell>{txn.command_line}</CTableDataCell>
                <CTableDataCell>{txn.system_type}</CTableDataCell>
                <CTableDataCell>{txn.retry_count}</CTableDataCell>
                <CTableDataCell>{txn.date_time}</CTableDataCell>
                <CTableDataCell>{txn.cycle}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Pagination */}
        <CPagination align="center" className="mt-3">
          {Array.from({ length: Math.ceil(sampleTransactions.length / pageSize) }, (_, i) => (
            <CPaginationItem
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </CPaginationItem>
          ))}
        </CPagination>
      </CCardBody>
    </CCard>
  )
}

export default DailyTransactionPage
