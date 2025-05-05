import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import SysPrinGeneral from './SysPrinGeneral.js';
import ReMailOptions from './ReMailOptions.js';
import StatusOptions from './StatusOptions.js';
import Notes from './Notes.js';
import FileSentTo from './FileSentTo.js';
import FileSentFrom from './FileSentFrom.js';



const SysPrin = () => {

  const storedClient = localStorage.getItem("selectedClient");
  const [sysPin, setSysPin] = useState('');

  const [custType, setCustType] = useState('');
  const [returnStatus, setReturnStatus] = useState('');
  const [destroyStatus, setDestroyStatus] = useState('');

  const [nm13, setNm13] = useState('');
  const [active, setActive] = useState('');
  const [addrFlag, setAddrFlag] = useState('');
  const [rsp, setRsp] = useState('');
  const [astatRch, setAstatRch] = useState('');

  const [nonUS, setNonUS] = useState('');
  const [tempAway, setTempAway] = useState('');
  const [undeliverable, setUndeliverable] = useState('');
  const [poBox, setPoBox] = useState('');
  const [badState, setBadState] = useState('');
  const [tempAwayAtts, setTempAwayAtts] = useState('');
  

  const sysPrinsData = [
    {
      "sysPrin": "SYS001",
      "client": "CLIENT1",
      "custType": "TypeA",
      "startDate": "2024-01-01",
      "undeliverable": "Return",
      "statA": "stat_a 1",
      "statB": "stat_b 1",
      "statC": "stat_c 1",
      "statD": "stat_d 1",
      "statE": "stat_e 1",
      "statF": "stat_f 1",
      "statG": "stat_g 1",
      "statH": "stat_h 1",
      "statI": "stat_i 1",
      "statJ": "stat_j 1",
      "statK": "stat_k 1",
      "statL": "stat_l 1",
      "statM": "stat_m 1",
      "statN": "stat_n 1",
      "statO": "stat_o 1",
      "statP": "stat_p 1",
      "statQ": "stat_q 1",
      "statR": "stat_r 1",
      "statS": "stat_s 1",
      "statT": "stat_t 1",
      "statU": "stat_u 1",
      "statV": "stat_v 1",
      "statW": "stat_w 1",
      "statX": "stat_x 1",
      "statY": "stat_y 1",
      "statZ": "stat_z 1",
      "poBox": "Return",
      "noRenewal": "N",
      "blockCard": "N",
      "addrFlag": "Invalid",
      "tempAway": 5,
      "rsp": "Y",
      "session": "Session1",
      "badState": "Return",
      "nm13": "Y",
      "tempAwayAtts": 1,
      "reportMethod": "Method1",
      "contact": "John Doe",
      "phone": "123-456-7890",
      "active": "Y",
      "notes": "Note1",
      "returnStatus": "Return Status 1",
      "destroyStatus": "Destroy Status 1",
      "nonUS": "Return",
      "astatRch": "N"
    },
    {
      "sysPrin": "SYS002",
      "client": "CLIENT2",
      "custType": "TypeB",
      "startDate": "2024-02-01",
      "undeliverable": "Destroy",
      "statA": "stat_a 2",
      "statB": "stat_b 2",
      "statC": "stat_c 2",
      "statD": "stat_d 2",
      "statE": "stat_e 2",
      "statF": "stat_f 2",
      "statG": "stat_g 2",
      "statH": "stat_h 2",
      "statI": "stat_i 2",
      "statJ": "stat_j 2",
      "statK": "stat_k 2",
      "statL": "stat_l 2",
      "statM": "stat_m 2",
      "statN": "stat_n 2",
      "statO": "stat_o 2",
      "statP": "stat_p 2",
      "statQ": "stat_q 2",
      "statR": "stat_r 2",
      "statS": "stat_s 2",
      "statT": "stat_t 2",
      "statU": "stat_u 2",
      "statV": "stat_v 2",
      "statW": "stat_w 2",
      "statX": "stat_x 2",
      "statY": "stat_y 2",
      "statZ": "stat_z 2",
      "poBox": "Destroy",
      "noRenewal": "Y",
      "blockCard": "Y",
      "addrFlag": "Valid",
      "tempAway": 15,
      "rsp": "N",
      "session": "Session2",
      "badState": "Destroy",
      "nm13": "N",
      "tempAwayAtts": 0,
      "reportMethod": "Method2",
      "contact": "Jane Smith",
      "phone": "987-654-3210",
      "active": "N",
      "notes": "Note2",
      "returnStatus": "Return Status 2",
      "destroyStatus": "Destroy Status 2",
      "nonUS": "Return",
      "astatRch": "Y"
    },
    {
      "sysPrin": "SYS003",
      "client": "CLIENT3",
      "custType": "TypeC",
      "startDate": "2024-03-01",
      "undeliverable": "In Process",
      "statA": "stat_a 3",
      "statB": "stat_b 3",
      "statC": "stat_c 3",
      "statD": "stat_d 3",
      "statE": "stat_e 3",
      "statF": "stat_f 3",
      "statG": "stat_g 3",
      "statH": "stat_h 3",
      "statI": "stat_i 3",
      "statJ": "stat_j 3",
      "statK": "stat_k 3",
      "statL": "stat_l 3",
      "statM": "stat_m 3",
      "statN": "stat_n 3",
      "statO": "stat_o 3",
      "statP": "stat_p 3",
      "statQ": "stat_q 3",
      "statR": "stat_r 3",
      "statS": "stat_s 3",
      "statT": "stat_t 3",
      "statU": "stat_u 3",
      "statV": "stat_v 3",
      "statW": "stat_w 3",
      "statX": "stat_x 3",
      "statY": "stat_y 3",
      "statZ": "stat_z 3",
      "poBox": "Return",
      "noRenewal": "N",
      "blockCard": "N",
      "addrFlag": "Invalid",
      "tempAway": 8,
      "rsp": "Y",
      "session": "Session3",
      "badState": "Return",
      "nm13": "Y",
      "tempAwayAtts": 3,
      "reportMethod": "Method3",
      "contact": "Alice Brown",
      "phone": "555-123-6789",
      "active": "Y",
      "notes": "Note3",
      "returnStatus": "Return Status 3",
      "destroyStatus": "Destroy Status 3",
      "nonUS": "Destroy",
      "astatRch": "N"
    }
  ];

  const handleSearch = () => {
    const result = sysPrinsData.find(
      item => item.sysPrin === sysPin && item.client === storedClient
    );

  
    if (result) {
      setCustType(result.custType);
      setReturnStatus(result.returnStatus);
      setDestroyStatus(result.destroyStatus);
      setNm13(result.nm13);
      setActive(result.active);
      setAddrFlag(result.addrFlag);
      setRsp(result.rsp);
      setAstatRch(result.astatRch);

      setNonUS(result.nonUS);

      setPoBox(result.poBox);
      setUndeliverable(result.undeliverable);
      setBadState(result.badState);
      setTempAwayAtts(result.tempAwayAtts);
      setTempAway(result.tempAway);

    } else {
      setCustType('');
      setReturnStatus('');
      setDestroyStatus('');
      setNm13('');
      setActive('');
      setAddrFlag('');
      setRsp('');
      setAstatRch('');

      setNonUS('');

      setPoBox('');
      setUndeliverable('');
      setBadState('');
      setTempAwayAtts('');
      setTempAway('');

    }
  };
  

  return (
    <CRow className="justify-content-center align-items-center">
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
             <strong>Sys/Prin Configuration</strong>
          </CCardHeader>
          <CCardBody>


            {/* Input Field with Title and Button */}
            <div className="d-flex align-items-center justify-content-center gap-3 mb-4">

            {/* ✅ Added new input field for Selected Client ID */}
             
             <label htmlFor="select-client-id" className="form-label me-3 mb-0" style={{
                 width: '230px',
                 height: '38px',
                 padding: '6px 10px',
                 borderRadius: '8px',
                 fontWeight: '500',
                 color: '#4B0082',
                 boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                 fontFamily: 'Segoe UI, sans-serif',
                 textAlign: 'left',
                 fontSize: '0.95rem',
                 lineHeight: '1',
                 display: 'flex',
                 alignItems: 'center',
                }}>
                  Selected Client Id
              </label>



              <CFormInput 
                id="select-client-id"
                type="text" 
                placeholder="Selected Client Id" 
                className="w-50 text-center"
                value={storedClient || ''}  // ✅ Display selectedClient
                readOnly
              />
              
              <label htmlFor="sys-pin-id" className="form-label me-3 mb-0" style={{
                 width: '200px',
                 height: '38px',
                 padding: '6px 10px',
                 borderRadius: '8px',
                 fontWeight: '500',
                 color: '#4B0082',
                 boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                 fontFamily: 'Segoe UI, sans-serif',
                 textAlign: 'left',
                 fontSize: '0.95rem',
                 lineHeight: '1',
                 display: 'flex',
                 alignItems: 'center',
                }}>
                  Input Sys/Prin
              </label>


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
                      nm13={nm13}
                      setNm13={setNm13}
                      active={active}
                      setActive={setActive}
                      addrFlag={addrFlag}
                      setAddrFlag={setAddrFlag}
                      rsp={rsp}
                      setRsp={setRsp}
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

                    />
                  </CTabPanel>
                  <CTabPanel className="p-3" itemKey="status-options">
                    <StatusOptions />
                  </CTabPanel>
                  <CTabPanel className="p-3" itemKey="notes">
                    <Notes />
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
    </CRow>
  )
}

export default SysPrin;
