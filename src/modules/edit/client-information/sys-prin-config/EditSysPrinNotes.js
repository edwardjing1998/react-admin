import React from 'react'
import { CFormTextarea } from '@coreui/react'

const EditSysPrinNotes = ({ selectedData, setSelectedData, isEditable }) => {
  return (
    <CFormTextarea
      id="special-notes"
      aria-label="Special Processing Notes"
      value={selectedData.notes}
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
  )
}

export default EditSysPrinNotes
