import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormSelect,
  CFormInput,
  CFormCheck,
  CButton,
} from '@coreui/react';

const ClientEmailSetup = ({ selectedData }) => {
  const [emailList, setEmailList] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailServer, setEmailServer] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isCC, setIsCC] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const emailServers = [
    'Omaha-SMTP Server (uschaappsmtp.1dc.com)',
    'Cha-SMTP Server (uschaappsmtp.1dc.com)',
  ];

  useEffect(() => {
    if (selectedData?.clientEmail && selectedData.clientEmail.length > 0) {
      setEmailList(selectedData.clientEmail);

      const formattedOptions = selectedData.clientEmail.map(
        (email) =>
          `${email.emailNameTx} <${email.emailAddressTx}>${email.carbonCopyFlag ? ' (CC)' : ''}`
      );

      setOptions(formattedOptions);
      setSelectedRecipients([formattedOptions[0]]);

      const first = selectedData.clientEmail[0];
      updateFormFromEmail(first);
    } else {
      resetForm();
    }
  }, [selectedData]);

  const updateFormFromEmail = (email) => {
    setName(email.emailNameTx || '');
    setEmailAddress(email.emailAddressTx || '');
    setEmailServer(emailServers[email.mailServerId] || '');
    setIsActive(email.activeFlag || false);
    setIsCC(email.carbonCopyFlag || false);
  };

  const resetForm = () => {
    setName('');
    setEmailAddress('');
    setEmailServer('');
    setIsActive(false);
    setIsCC(false);
    setOptions([]);
    setSelectedRecipients([]);
  };

  const handleChange = (selectedOptions) => {
    const values = Array.from(selectedOptions).map((opt) => opt.value);
    setSelectedRecipients(values);

    if (values.length > 0) {
      const selected = values[0];
      const emailObj = emailList.find((email) =>
        selected.startsWith(`${email.emailNameTx} <${email.emailAddressTx}>`)
      );
      if (emailObj) {
        updateFormFromEmail(emailObj);
      }
    }
  };

  const handleNew = () => {
    setEmailServer('');
    setName('');
    setEmailAddress('');
    setIsActive(false);
    setIsCC(false);
  };
  
  const handleRemove = async () => {
    if (!selectedRecipients.length) return;
  
    const selectedLabel = selectedRecipients[0];
    const emailObj = emailList.find(
      (email) =>
        selectedLabel.startsWith(`${email.emailNameTx} <${email.emailAddressTx}>`)
    );
  
    if (!emailObj) return;
  
    try {
      const res = await fetch(
        `http://localhost:4444/api/client-email/delete?clientId=${selectedData.client}&emailAddress=${encodeURIComponent(emailObj.emailAddressTx)}`,
        { method: 'DELETE' }
      );
  
      if (!res.ok) {
        throw new Error('Failed to delete email');
      }
  
      // 🧹 Update list by removing the deleted email
      const updatedList = emailList.filter(
        (email) => email.emailAddressTx !== emailObj.emailAddressTx
      );
      setEmailList(updatedList);
  
      // 🔁 Generate updated options
      const updatedOptions = updatedList.map(
        (email) =>
          `${email.emailNameTx} <${email.emailAddressTx}>${
            email.carbonCopyFlag ? ' (CC)' : ''
          }`
      );
      setOptions(updatedOptions);
  
      // 🧠 If any emails remain, select the next one
      if (updatedList.length > 0) {
        const nextEmail = updatedList[0];
        const nextLabel = `${nextEmail.emailNameTx} <${nextEmail.emailAddressTx}>${
          nextEmail.carbonCopyFlag ? ' (CC)' : ''
        }`;
        setSelectedRecipients([nextLabel]);
        updateFormFromEmail(nextEmail);
      } else {
        // 🧹 Otherwise, clear form
        resetForm();
      }
  
      setStatusMessage('Email removed successfully');
    } catch (err) {
      console.error('Error removing email:', err);
      setStatusMessage('Error removing email');
    }
  };
  
  const handleAdd = async () => {
    const mailServerId = emailServers.indexOf(emailServer);
    const payload = {
      id: {
        clientId: selectedData.client,
        emailAddressTx: emailAddress,
      },
      reportId: 0,
      emailNameTx: name,
      emailAddressTx: emailAddress,
      carbonCopyFlag: isCC,
      activeFlag: isActive,
      mailServerId: mailServerId === -1 ? 0 : mailServerId,
    };

    try {
      const res = await fetch('http://localhost:4444/api/client-email/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to add email');
      }

      const newEmail = await res.json();
      const formatted = `${newEmail.emailNameTx} <${newEmail.id.emailAddressTx}>${newEmail.carbonCopyFlag ? ' (CC)' : ''}`;

      setEmailList((prev) => [...prev, newEmail]);
      setOptions((prev) => [...prev, formatted]);
      setSelectedRecipients([formatted]);
      setStatusMessage('Email added successfully');
    } catch (err) {
      console.error('Error adding email:', err);
      alert('Error adding email');
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>Email Recipients</CCardHeader>
          <CCardBody>
            {/* Email Recipients Multi-Select */}
            <CRow className="align-items-center mb-3">
              <CCol xs={12} md={3}>Email Recipients:</CCol>
              <CCol xs={12} md={9}>
                <CFormSelect
                  multiple
                  size="6"
                  value={selectedRecipients}
                  onChange={(e) => handleChange(e.target.selectedOptions)}
                >
                  {options.map((email, idx) => (
                    <option key={idx} value={email}>
                      {email}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>

            {/* Email Server & Active Flag */}
            <CRow className="mb-3 align-items-center">
              <CCol xs={12} md={3}>Email Server:</CCol>
              <CCol xs={12} md={5}>
                <CFormSelect
                  value={emailServer}
                  onChange={(e) => setEmailServer(e.target.value)}
                >
                  <option value="">Select Email Server</option>
                  {emailServers.map((srv, idx) => (
                    <option key={idx} value={srv}>{srv}</option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12} md={4}>
                <CFormCheck
                  label="Recipient Active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </CCol>
            </CRow>

            {/* Name & CC */}
            <CRow className="mb-3 align-items-center">
              <CCol xs={12} md={3}>Name:</CCol>
              <CCol xs={12} md={6}>
                <CFormInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </CCol>
              <CCol xs={12} md={3}>
                <CFormCheck
                  label="CC"
                  checked={isCC}
                  onChange={(e) => setIsCC(e.target.checked)}
                />
              </CCol>
            </CRow>

            {/* Email Address */}
            <CRow className="mb-3 align-items-center">
              <CCol xs={12} md={3}>Email Address:</CCol>
              <CCol xs={12} md={9}>
                <CFormInput
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter email address"
                />
              </CCol>
            </CRow>

            {/* Selected Values Display */}
            <CRow className="mb-3">
              <CCol>
                Selected: {selectedRecipients.length > 0 ? selectedRecipients.join(', ') : 'None'}
              </CCol>
            </CRow>

            {statusMessage && (
              <CRow className="mb-2">
                <CCol>
                  <div style={{ color: 'red', fontWeight: 'bold' }}>{statusMessage}</div>
                </CCol>
              </CRow>
            )}

            {/* Buttons */}
            <CRow className="mt-4">
              <CCol className="d-flex gap-2 justify-content-end">
                <CButton color="info" onClick={handleNew}>New</CButton>
                <CButton color="primary" onClick={handleAdd}>Add</CButton>
                <CButton color="danger" onClick={handleRemove}>Remove</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ClientEmailSetup;
