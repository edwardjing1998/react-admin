import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CFormSelect,
} from '@coreui/react';

const EditFileReceivedFrom = ({ selectedData, setSelectedData, isEditable }) => {
  /* vendors available to add */
  const [availableFileReceivedFrom, setAvailableFileReceivedFrom] = useState([]);     
  /* vendors already “selected” */
  const [moveAvailableFileReceivedFrom, setMoveAvailableFileReceivedFrom] = useState((selectedData?.vendorReceivedFrom ?? []).map(v => ({ vendId: v.vendorId, vendName: v.vendorName })));

  /* ids selected in each list */
  const [selectedAvailIds, setSelectedAvailIds] = useState([]);  
  const [selectedSentIds,  setSelectedSentIds]  = useState([]);  

  useEffect(() => {
    fetch('http://localhost:4444/api/vendors?fileIo=O')
      .then((r) => r.json())
      .then((data) => setAvailableFileReceivedFrom(data))
      .catch((err) => console.error('Failed to load vendors', err));
  }, []);

  const handleAdd = () => {
    const toMove = availableFileReceivedFrom.filter(v => selectedAvailIds.includes(v.vendId));
    setAvailableFileReceivedFrom(availableFileReceivedFrom.filter(v => !selectedAvailIds.includes(v.vendId)));
    setMoveAvailableFileReceivedFrom([...moveAvailableFileReceivedFrom, ...toMove]);
    setSelectedAvailIds([]);
  };

  const handleRemove = () => {
    const toMove = moveAvailableFileReceivedFrom.filter(v => selectedSentIds.includes(v.vendId));
    setMoveAvailableFileReceivedFrom(moveAvailableFileReceivedFrom.filter(v => !selectedSentIds.includes(v.vendId)));
    setAvailableFileReceivedFrom([...availableFileReceivedFrom, ...toMove]);
    setSelectedSentIds([]);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody className="d-flex flex-column gap-4">
            {/* -------- Available vendors -------- */}
            <CFormSelect
              multiple
              size="10"
              style={{ height: '200px' }}
              value={selectedAvailIds}
              onChange={(e) =>
                setSelectedAvailIds([...e.target.selectedOptions].map(o => o.value))
              }
              disabled={!isEditable}
            >
              {availableFileReceivedFrom.map(vendor => (
                <option key={vendor.vendId} value={vendor.vendId}>
                  {vendor.vendName.trim()}
                </option>
              ))}
            </CFormSelect>

            {/* -------- buttons -------- */}
            <div className="d-flex justify-content-center gap-4">
              <CButton
                color="success"
                variant="outline"
                size="sm"
                style={{ width: '120px' }}
                onClick={handleAdd}
                disabled={!isEditable || selectedAvailIds.length === 0}
              >
                Add ⬇️
              </CButton>
              <CButton
                color="danger"
                variant="outline"
                size="sm"
                style={{ width: '120px' }}
                onClick={handleRemove}
                disabled={!isEditable || selectedSentIds.length === 0}
              >
                ⬆️ Remove
              </CButton>
            </div>

            {/* -------- Sent vendors -------- */}
            <CFormSelect
              multiple
              size="10"
              style={{ height: '200px' }}
              value={selectedSentIds}
              onChange={(e) =>
                setSelectedSentIds([...e.target.selectedOptions].map(o => o.value))
              }
              disabled={!isEditable}
            >
              {moveAvailableFileReceivedFrom.map(vendor => (
                <option key={vendor.vendId} value={vendor.vendId}>
                  {vendor.vendName.trim()}
                </option>
              ))}
            </CFormSelect>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default EditFileReceivedFrom;
