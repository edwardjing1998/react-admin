// ✅ File: ClientATMCashPrefixes.js
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CFormLabel,
  CCol,
  CFormSelect,
  CRow,
  CFormInput,
  CButton,
} from '@coreui/react'
import '../../../scss/sys-prin-configuration/client-atm-pin-prefixes.scss'

const ClientATMCashPrefixes = ({ selectedData }) => {
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [atmCashRule, setAtmCashRule] = useState('')
  const [selectedToDelete, setSelectedToDelete] = useState([])

  useEffect(() => {
    if (
      selectedData &&
      typeof selectedData === 'object' &&
      selectedData.sysPrinsPrefixes
    ) {
      let parsed = selectedData.sysPrinsPrefixes

      if (typeof parsed === 'string') {
        try {
          parsed = JSON.parse(parsed)
        } catch (e) {
          console.error('Invalid JSON in sysPrinsPrefixes', e)
          parsed = []
        }
      }

      if (Array.isArray(parsed)) {
        const prefixes = parsed.map((p) => p.prefix)
        setOptions(prefixes)
      }
    }
  }, [selectedData])

  const handleSelectionChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value)
    setSelectedToDelete(selected)

    if (selected.length > 0) {
      const selectedPrefix = selected[0]
      setInputValue(selectedPrefix)

      const found = selectedData.sysPrinsPrefixes?.find((p) => p.prefix === selectedPrefix)
      if (found) {
        setAtmCashRule(found.atmCashRule)
      }
    }
  }

  const handleAddOption = async () => {
    const trimmed = (inputValue || '').trim()
    if (trimmed !== '' && !options.includes(trimmed)) {
      try {
        const response = await fetch('http://localhost:4444/api/prefixes/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            billingSp: selectedData.billingSp,
            prefix: trimmed,
            atmCashRule: atmCashRule,
          }),
        })

        if (response.ok) {
          setOptions((prev) => [...prev, trimmed])
          setInputValue('')
          setAtmCashRule('')
        } else {
          console.error('Failed to add prefix')
        }
      } catch (err) {
        console.error('Error calling add API:', err)
      }
    }
  }

  const handleDeleteOption = async () => {
    if (selectedToDelete.length > 0) {
      const prefixToDelete = selectedToDelete[0]
      try {
        const res = await fetch('http://localhost:4444/api/prefixes/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            billingSp: selectedData.billingSp,
            prefix: prefixToDelete,
          }),
        })

        if (res.ok) {
          setOptions((prev) => prev.filter((opt) => opt !== prefixToDelete))
          setSelectedToDelete([])
          setInputValue('')
          setAtmCashRule('')
        } else {
          console.error('Failed to delete prefix')
        }
      } catch (err) {
        console.error('Error calling delete API:', err)
      }
    }
  }

  return (
    <CRow className="d-flex justify-content-between align-items-stretch" style={{ minHeight: '60vh' }}>
      <CCol xs={6} className="d-flex justify-content-start h-100">
        <CCard className="mb-4 w-100 h-100">
          <CCardBody className="d-flex flex-column h-100">
            <p className="text-body-secondary small" style={{ fontSize: '0.97rem' }}>
              <span>Billing Sys/Prin: <code>{selectedData?.billingSp}</code></span>
            </p>

            <div className="flex-grow-1 d-flex flex-column" style={{ height: '400px' }}>
              <CFormSelect
                size="lg"
                multiple
                aria-label="Multiple select example"
                style={{ fontSize: '0.97rem', flex: 1 }}
                className="w-100"
                onChange={handleSelectionChange}
                value={selectedToDelete}
              >
                {options.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </CFormSelect>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={6} className="d-flex justify-content-end h-100">
        <CCard className="mb-4 w-100" style={{ minHeight: '470px' }}>
          <CCardBody className="d-flex flex-column justify-content-between h-100">
            <div></div>

            <div>
              <CFormLabel htmlFor="prefixInput" style={{ fontSize: '0.87rem' }}>Account Prefix</CFormLabel>
              <CFormInput
                id="prefixInput"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter account prefix"
              />
            </div>

            <div style={{ height: '10px' }}></div>

            <div>
              <CFormLabel htmlFor="atmSelect" style={{ fontSize: '0.87rem' }}>ATM/Cash</CFormLabel>
              <CFormSelect
                id="atmSelect"
                className="mb-3"
                value={atmCashRule}
                onChange={(e) => setAtmCashRule(e.target.value)}
              >
                <option value="">Select Rule</option>
                <option value="Destroy">Destroy</option>
                <option value="Return">Return</option>
              </CFormSelect>

              <CRow className="text-center">
                <CCol>
                  <CButton color="outline-primary" className="w-100" onClick={handleAddOption}>OK</CButton>
                </CCol>
                <CCol>
                  <CButton color="outline-success" className="w-100" onClick={handleAddOption}>Add</CButton>
                </CCol>
                <CCol>
                  <CButton color="outline-danger" className="w-100" onClick={handleDeleteOption}>Delete</CButton>
                </CCol>
              </CRow>
            </div>

            <div className="flex-grow-1"></div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ClientATMCashPrefixes
