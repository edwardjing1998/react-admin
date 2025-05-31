import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody
} from '@coreui/react';


import ClientInformation from './ClientInformation.js';
import ClientAutoComplete from '../client-search-input/ClientAutoCompleteInput.js'
import EditClientWindow from './EditClientWindow.js';
import PreviewSysPrinInformation from './PreviewSysPrinInformation.js';
import Drawer from '@mui/material/Drawer';
import BusinessIcon from '@mui/icons-material/Business';
import ComputerIcon from '@mui/icons-material/Computer';
import PreviewClientInformation from './PreviewClientInformation'
import SysPrin from './SysPrin'


const SysPinConfig = () => {
  const [clientList, setClientList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const [inputValue, setInputValue] = useState('');
  const [isWildcardMode, setIsWildcardMode] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedGroupRow, setSelectedGroupRow] = useState(null);

  const handleClientsFetched = (fetchedClients) => {
    setCurrentPage(0);
    setClientList(prev => {
      const prevIds = prev.map(c => c.client).join(',');
      const newIds = fetchedClients.map(c => c.client).join(',');
      return prevIds === newIds ? prev : fetchedClients;
    });
  };

  const [selectedData, setSelectedData] = useState({
    client: '',
    name: '',
    address: '',
    billingSp: '',
    atmCashRule: '',
    notes:'',
    special:'',
    pinMailer:'',
    destroyStatus:'',
    custType:'',
    returnStatus:'',
    addrFlag:'',
    astatRch:'',
    active:'',
    nm13:'',
    sysPrinsPrefixes: [],
  });


  const sharedSx = {
    '& .MuiInputBase-root': {
      height: '20px',           // Set total height of the input box
      fontSize: '0.75rem',
    },
    '& .MuiInputBase-input': {
      padding: '4px 4px',       // Inner padding
      height: '30px',           // Force smaller height for input
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
    '& .MuiInputBase-input.Mui-disabled': {
      color: 'black',
      WebkitTextFillColor: 'black',
    },
    '& .MuiInputLabel-root.Mui-disabled': {
      color: 'black',
    },
  };

  useEffect(() => {
    setClientList([]); // ✅ Clear old page data
    fetch(`http://localhost:4444/api/clients-paging?page=${currentPage}&size=25`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch paged clients');
        }
        return response.json();
      })
      .then((data) => {
        setClientList(data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, [currentPage]);

  const handleCheckboxChange = (field) => (event) => {
    const checked = event.target.checked;
    setSelectedData((prev) => ({ ...prev, [field]: checked }));
  };

  const [editClientWindow, setEditClientWindow] = useState(false);


  const handleRowClick = (rowData) => {
    const billingSp = rowData.billingSp || '';
    const matchedClient = clientList.find(client => client.billingSp === billingSp);
    const atmCashPrefixes = matchedClient?.sysPrinsPrefixes || [];
    const clientEmails = matchedClient?.clientEmail || [];
    const reportOptions = matchedClient?.reportOptions || [];
    const sysPrinsList = matchedClient?.sysPrins || [];

    const matchedSysPrin = sysPrinsList.find(sp =>
      sp?.id?.sysPrin === rowData.sysPrin || sp?.sysPrin === rowData.sysPrin
    );

    const specificInvalidDelivAreas = (matchedSysPrin?.invalidDelivAreas || []).map(area => ({
      ...area,
      sysPrin: matchedSysPrin?.id?.sysPrin || area.sysPrin,
    }));

    if (rowData.isGroup) {
      setSelectedGroupRow(rowData); // ✅ save the group row
      return; // optionally stop here if you don't want to overwrite selectedData
    }

    setSelectedData((prev) => ({
      ...prev,
      ...rowData,
      sysPrinsPrefixes: atmCashPrefixes,
      clientEmail: clientEmails,
      reportOptions: reportOptions,
      sysPrins: sysPrinsList,
      sysPrin: rowData.sysPrin || '',
      invalidDelivAreas: specificInvalidDelivAreas,
      vendorSentTo: matchedSysPrin?.vendorSentTo || [],
      notes: rowData.notes || matchedSysPrin?.notes || '',
      statA: rowData.statA || matchedSysPrin?.statA || '',
      statB: rowData.statB || matchedSysPrin?.statB || '',
      statC: rowData.statC || matchedSysPrin?.statC || '',
      statE: rowData.statE || matchedSysPrin?.statE || '',
      statF: rowData.statF || matchedSysPrin?.statF || '',
      statI: rowData.statI || matchedSysPrin?.statI || '',
      statL: rowData.statL || matchedSysPrin?.statL || '',
      statU: rowData.statU || matchedSysPrin?.statU || '',
      statD: rowData.statD || matchedSysPrin?.statD || '',
      statO: rowData.statO || matchedSysPrin?.statO || '',
      statX: rowData.statX || matchedSysPrin?.statX || '',
      statZ: rowData.statZ || matchedSysPrin?.statZ || '',
      special: rowData.special || matchedSysPrin?.special || '',
      pinMailer: rowData.pinMailer || matchedSysPrin?.pinMailer || '',
      destroyStatus: rowData.destroyStatus || matchedSysPrin?.destroyStatus || '',
      custType: rowData.custType || matchedSysPrin?.custType || '',
      returnStatus: rowData.returnStatus || matchedSysPrin?.returnStatus || '',
      addrFlag: rowData.addrFlag || matchedSysPrin?.addrFlag || '',
      astatRch: rowData.astatRch || matchedSysPrin?.astatRch || '',
      active: rowData.active || matchedSysPrin?.active || '',
      nm13: rowData.nm13 || matchedSysPrin?.nm13 || '',
    }));
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '80vw', overflow: 'auto' }}>
     <CRow className="px-3" style={{ height: '100%', marginBottom: '10px' }}>
        {/* Left Panel (30%) */}
        <CCol style={{ flex: '0 0 29%', maxWidth: '29%', paddingLeft: '0px', border: '1px solid #ccc', }}>
            <ClientAutoComplete
              inputValue={inputValue}
              setInputValue={setInputValue}
              onClientsFetched={handleClientsFetched}
              isWildcardMode={isWildcardMode}
              setIsWildcardMode={setIsWildcardMode}           
            />
        </CCol>

        {/* Right Panel (70%) */}
        <CCol style={{ flex: '0 0 71%', maxWidth: '71%' }}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ padding: 0 }}>
              <CRow style={{ height: '30px' }}>
                {/* Left Column */}
                <CCol style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', border: '0px solid #ccc', maxWidth: '60%' }}>
                     <BusinessIcon style={{ marginLeft: '8px', fontSize: '18px' }} />                
                     <p style={{ margin: 0, marginLeft: '20px', fontWeight:'800' }}>Client Information</p>
                </CCol>

                {/* Right Column */}
                <CCol style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', border: '0px solid #ccc', maxWidth: '40%' }}>
                    <ComputerIcon style={{ marginLeft: '8px', fontSize: '18px' }} />                
                    <p style={{ margin: 0, marginLeft: '20px', fontWeight:'800' }}>SYS/PRIN</p>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow style={{ height: '100%', marginBottom: '10px', paddingLeft: '0px', paddingRight: '12px' }}>
        <CCol style={{ flex: '0 0 30%', maxWidth: '30%' }}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ height: '100%', padding: 0 }}>
              <div style={{ height: '1200px', overflow: 'hidden' }}>
                  <ClientInformation
                    onRowClick={handleRowClick}
                    clientList={clientList}
                    setClientList={setClientList} 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isWildcardMode={isWildcardMode}
                    setIsWildcardMode={setIsWildcardMode}
                    onFetchWildcardPage={(page) => {
                      const keyword = inputValue;
                      fetch(`http://localhost:4444/api/client/wildcard?keyword=${encodeURIComponent(keyword)}`)
                        .then((res) => res.json())
                        .then((newData) => {
                          setClientList(newData);
                          setCurrentPage(page);
                        });
                    }}                  
                  />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol style={{ flex: '0 0 70%', maxWidth: '70%' }}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ height: '100%', padding: 0 }}>
              <div style={{ height: '1200px', overflow: 'hidden' }}>
                <CRow className="p-3" style={{ height: '1200px' }}>
                 <CCol style={{ flex: '0 0 56%', maxWidth: '56%', height: '100%' }}>
                  <PreviewClientInformation setEditClientWindow={setEditClientWindow} selectedGroupRow={selectedGroupRow} selectedData={selectedData} />
              </CCol>
              <CCol style={{ flex: '0 0 44%', maxWidth: '44%', height: '100%' }}>
                  <PreviewSysPrinInformation  setEditClientWindow={setEditClientWindow}  selectedData={selectedData} selectedGroupRow={selectedGroupRow}/>
              </CCol>
            </CRow>
          </div>
        </CCardBody>
      </CCard>                   
    </CCol>
  </CRow>

  <Drawer
        anchor="right"
        open={editClientWindow}
        onClose={() => setEditClientWindow(false)}
        PaperProps={{ sx: { width: '35vw', padding: '16px' } }}
      >
        <EditClientWindow onClose={() => setEditClientWindow(false)} selectedGroupRow={selectedGroupRow} setSelectedGroupRow={setSelectedGroupRow} />
  </Drawer>



      {/* Left Panel (30%) */}
      <CRow className="mb-3">
        <CCol xs={12}>
            <CCard className="h-100">
            <CCardBody className="h-100 p-3">
                <div style={{ height: '100%', backgroundColor: '#f5f5f5' }}></div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow style={{ height: '55%' }}>
        <CCol xs={12}>
          <CCard className="h-100">
            <CCardBody className="h-100 p-3">
              <SysPrin selectedData={selectedData} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> 
    </div>
  );
};

export default SysPinConfig;
