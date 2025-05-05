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

  const emailServers = ['Omaha-SMTP Server (uschaappsmtp.1dc.com)', 'Cha-SMTP Server (uschaappsmtp.1dc.com)'];

  useEffect(() => {
    if (selectedData?.clientEmail && selectedData.clientEmail.length > 0) {
      setEmailList(selectedData.clientEmail);

      const formattedOptions = selectedData.clientEmail.map(email =>
        `${email.emailName} <${email.emailAddress}>${email.carbonCopyFlag ? ' (CC)' : ''}`
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
    setName(email.emailName || '');
    setEmailAddress(email.emailAddress || '');
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
    const values = Array.from(selectedOptions).map(opt => opt.value);
    setSelectedRecipients(values);

    if (values.length > 0) {
      const selected = values[0];
      const emailObj = emailList.find(email =>
        selected.startsWith(`${email.emailName} <${email.emailAddress}>`)
      );
      if (emailObj) {
        updateFormFromEmail(emailObj);
      }
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

            {/* Buttons */}
            <CRow className="mt-4">
              <CCol className="d-flex gap-2 justify-content-end">
                <CButton color="info">New</CButton>
                <CButton color="primary">Add</CButton>
                <CButton color="danger">Remove</CButton>
                <CButton color="success">Save</CButton>
                <CButton color="secondary">Clear</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ClientEmailSetup;
