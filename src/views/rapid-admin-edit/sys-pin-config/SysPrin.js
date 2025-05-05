// File: SysPrin.js
import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
  CFormInput,
  CButton,
} from '@coreui/react';

import SysPrinGeneral from './SysPrinGeneral.js';
import ReMailOptions from './ReMailOptions.js';
import StatusOptions from './StatusOptions.js';
import Notes from './Notes.js';
import FileSentTo from './FileSentTo.js';
import FileSentFrom from './FileSentFrom.js';


const SysPrin = ({ selectedData }) => {
  const storedClient = selectedData?.client || localStorage.getItem("selectedClient") || '';
  const [sysPin, setSysPin] = useState(selectedData?.sysPrin || '');

  const [custType, setCustType] = useState('');
  const [returnStatus, setReturnStatus] = useState('');
  const [destroyStatus, setDestroyStatus] = useState('');

  const [special, setSpecial] = useState('');
  const [pinMailer, setPinMailer] = useState('');
  const [forwardingAddress, setForwardingAddress] = useState('');

  const [nm13, setNm13] = useState('');
  const [active, setActive] = useState('');
  const [addrFlag, setAddrFlag] = useState('');
  const [rps, setRps] = useState('');
  const [astatRch, setAstatRch] = useState('');
  const [nonUS, setNonUS] = useState('');
  const [tempAway, setTempAway] = useState('');
  const [undeliverable, setUndeliverable] = useState('');
  const [poBox, setPoBox] = useState('');
  const [badState, setBadState] = useState('');
  const [tempAwayAtts, setTempAwayAtts] = useState('');

  const [statusMap, setStatusMap] = useState({});
  const [invalidDelivAreas, setInvalidDelivAreas] = useState([]);
  const [notes, setNotes] = useState('');
  const [holdDays, setHoldDays] = useState('');

  useEffect(() => {
    if (selectedData?.sysPrin) {
      setSysPin(selectedData.sysPrin);
    }
  }, [selectedData]);

  const handleSearch = () => {
    const clientId = storedClient;
    const sysPrinId = sysPin;

    if (!selectedData?.sysPrins?.length) {
      alert("No sysPrins found in selectedData.");
      return;
    }

    const result = selectedData.sysPrins.find(
      item =>
        item.sysPrin?.trim().toUpperCase() === sysPrinId.trim().toUpperCase() &&
        item.client?.trim().toUpperCase() === clientId.trim().toUpperCase()
    );

    if (result) {
      setCustType(result.custType);
      setReturnStatus(result.returnStatus);
      setDestroyStatus(result.destroyStatus);
      setSpecial(result.special);
      setPinMailer(result.pinMailer);
      setNm13(result.nm13);
      setActive(result.active);
      setAddrFlag(result.addrFlag);
      setRps(result.rps);
      setAstatRch(result.aStatRch);
      setNonUS(result.nonUS);
      setPoBox(result.poBox);
      setUndeliverable(result.undeliverable);
      setBadState(result.badState);
      setTempAwayAtts(result.tempAwayAtts);
      setTempAway(result.tempAway);
      setInvalidDelivAreas(result.invalidDelivAreas || []);
      setNotes(result.notes);
      setForwardingAddress(result.forwardingAddress);
      setAstatRch(result.astatRch);
      setHoldDays(result.holdDays);

      const statusFields = {};
      for (let ch of ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'L', 'O', 'U', 'X', 'Z']) {
        const key = `stat${ch}`;
        statusFields[key] = result[key] || '';
      }
      setStatusMap(statusFields);
    } else {
      setCustType('');
      setReturnStatus('');
      setDestroyStatus('');
      setSpecial('');
      setPinMailer('');
      setNm13('');
      setActive('');
      setAddrFlag('');
      setRps('');
      setAstatRch('');
      setNonUS('');
      setPoBox('');
      setUndeliverable('');
      setBadState('');
      setTempAwayAtts('');
      setTempAway('');
      setStatusMap({});
      setInvalidDelivAreas([]);
      setNotes('');
      setForwardingAddress('');
      setAstatRch('');
      setHoldDays('');
    }
  };

  const handleNew = () => {
    setCustType('');
    setReturnStatus('');
    setDestroyStatus('');
    setSpecial('');
    setPinMailer('');
    setNm13('');
    setActive('');
    setAddrFlag('');
    setRps('');
    setAstatRch('');
    setNonUS('');
    setPoBox('');
    setUndeliverable('');
    setBadState('');
    setTempAwayAtts('');
    setTempAway('');
    setStatusMap({});
    setInvalidDelivAreas([]);
    setSysPin('');
    setNotes('');
    setForwardingAddress('');
    setAstatRch('');
    setHoldDays('');
  };


  const handleOk = async () => {


    console.log("statusMap at save time:", statusMap);


    const payload = [
      {
        client: storedClient,
        sysPrin: sysPin,
        custType,
        undeliverable,
        statA: statusMap['statA'] || '',
        statB: statusMap['statB'] || '',
        statC: statusMap['statC'] || '',
        statD: statusMap['statD'] || '',
        statE: statusMap['statE'] || '',
        statF: statusMap['statF'] || '',
        statI: statusMap['statI'] || '',
        statL: statusMap['statL'] || '',
        statO: statusMap['statO'] || '',
        statU: statusMap['statU'] || '',
        statX: statusMap['statX'] || '',
        statZ: statusMap['statZ'] || '',
        poBox,
        addrFlag,
        tempAway,
        rps: rps,
        session: "Session1", // adjust as needed
        badState,
        nm13,
        tempAwayAtts,
        reportMethod: "Email", // adjust as needed
        active,
        notes,
        returnStatus,
        destroyStatus,
        nonUS,
        special,
        pinMailer,
        holdDays, // adjust if you have a UI field for this
        forwardingAddress, // adjust if needed
        invalidDelivAreas, // can be [] or null
        astatRch
      }
    ];
  
    try {

      console.log("Client ID:", storedClient);
      console.log("Payload to be sent:", JSON.stringify(payload, null, 2));
      console.log("API Endpoint:", `http://localhost:4444/api/sysprins/${storedClient}`);
      

      const response = await fetch(`http://localhost:4444/api/sysprins/${storedClient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        alert("SysPrin saved successfully.");
      } else {
        alert("Failed to save SysPrin. Please check the server logs.");
      }
    } catch (error) {
      console.error("Error saving SysPrin:", error);
      alert("Error occurred while saving SysPrin.");
    }
  };
  
  return (
    <CRow>
      <CCol xs={10}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sys/Prin Configuration</strong>
          </CCardHeader>
          <CCardBody>
            <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
              <label htmlFor="select-client-id" className="form-label me-3 mb-0">Selected Client Id</label>
              <CFormInput
                id="select-client-id"
                type="text"
                placeholder="Selected Client Id"
                className="w-50 text-center"
                value={storedClient}
                readOnly
              />
              <label htmlFor="sys-pin-id" className="form-label me-3 mb-0">Input Sys/Prin</label>
              <CFormInput
                id="sys-pin-id"
                type="text"
                placeholder="Enter Sys/Prin here..."
                className="w-50 text-center"
                value={sysPin}
                onChange={(e) => setSysPin(e.target.value)}
              />
              <CButton color="primary" onClick={handleSearch}>Submit</CButton>
            </div>

            <CTabs activeItemKey="general">
              <CTabList variant="pills">
                <CTab itemKey="general">General</CTab>
                <CTab itemKey="re-mail-options">Re-Mail Options</CTab>
                <CTab itemKey="status-options">Status Options</CTab>
                <CTab itemKey="notes">Notes</CTab>
                <CTab itemKey="file-sent-to">File Sent to</CTab>
                <CTab itemKey="file-recived-from">File Sent from</CTab>
              </CTabList>
              <CTabContent>
                <CTabPanel className="p-3" itemKey="general">
                  <SysPrinGeneral
                    custType={custType}
                    setCustType={setCustType}
                    returnStatus={returnStatus}
                    setReturnStatus={setReturnStatus}
                    destroyStatus={destroyStatus}
                    setDestroyStatus={setDestroyStatus}
                    special={special}
                    setSpecial={setSpecial}
                    pinMailer={pinMailer}
                    setPinMailer={setPinMailer}
                    nm13={nm13}
                    setNm13={setNm13}
                    active={active}
                    setActive={setActive}
                    addrFlag={addrFlag}
                    setAddrFlag={setAddrFlag}
                    rps={rps}
                    setRps={setRps}
                    astatRch={astatRch}
                    setAstatRch={setAstatRch}
                  />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="re-mail-options">
                  <ReMailOptions
                    nonUS={nonUS}
                    setNonUS={setNonUS}
                    poBox={poBox}
                    setPoBox={setPoBox}
                    undeliverable={undeliverable}
                    setUndeliverable={setUndeliverable}
                    badState={badState}
                    setBadState={setBadState}
                    tempAwayAtts={tempAwayAtts}
                    setTempAwayAtts={setTempAwayAtts}
                    tempAway={tempAway}
                    setTempAway={setTempAway}
                    invalidDelivAreas={invalidDelivAreas}
                    setInvalidDelivAreas={setInvalidDelivAreas}
                    forwardingAddress={forwardingAddress}
                    setForwardingAddress={setForwardingAddress}
                    holdDays={holdDays}
                    setHoldDays={setHoldDays}
                  />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="status-options">
                <StatusOptions statusMap={statusMap} setStatusMap={setStatusMap} />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="notes">
                  <Notes 
                    notes={notes} 
                    setNotes={setNotes} 
                  />
                </CTabPanel>

                <CTabPanel className="p-3" itemKey="file-sent-to">
                  <FileSentTo />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="file-recived-from">
                  <FileSentFrom />
                </CTabPanel>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={2}>
       <CCard className="mb-4" style={{ border: 'none', boxShadow: 'none' }}>
          <CCardBody>
          <div className="mb-3 d-grid" style={{ height: '40px', padding: '10px' }}>
              &nbsp;
          </div>
          <div className="mb-3 d-grid" style={{ height: '40px', padding: '10px' }}>
              &nbsp;
          </div>
          <div className="mb-3 d-grid" style={{ height: '40px', padding: '10px' }}>
              &nbsp;
          </div>
          <div className="mb-3 d-grid" style={{ height: '40px', padding: '10px' }}>
              &nbsp;
          </div>
          <div className="mb-3 d-grid" style={{ height: '40px', padding: '10px' }}>
              &nbsp;
          </div>
          <div className="mb-3 d-grid" style={{ height: '40px', padding: '10px' }}>
              &nbsp;
          </div>
            <div className="mb-3 d-grid"><CButton color="secondary" variant="outline" onClick={handleNew}>New</CButton></div>
            <div className="mb-3 d-grid"><CButton color="secondary" variant="outline">Duplicate</CButton></div>
            <div className="mb-3 d-grid"><CButton color="secondary" variant="outline">Move</CButton></div>
            <div className="mb-3 d-grid"><CButton color="secondary" variant="outline"  onClick={handleOk}>OK</CButton></div>
            <div className="mb-3 d-grid" style={{ height: '40px', padding: '10px' }}>
              &nbsp;
          </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SysPrin;