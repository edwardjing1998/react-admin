import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody
} from '@coreui/react';


import AutoCompleteInputBox from '../../../components/AutoCompleteInputBox'
import EditClientWindow from './EditClientWindow';
import PreviewSysPrinInformation from './sys-prin-config/PreviewSysPrinInformation';
import Drawer from '@mui/material/Drawer';
import BusinessIcon from '@mui/icons-material/Business';
import ComputerIcon from '@mui/icons-material/Computer';
import PreviewClientInformation from './PreviewClientInformation'
import { defaultSelectedData, mapRowDataToSelectedData } from './utils/SelectedData';
import NavigationPanel from './NavigationPanel';
import { fetchClientsPaging, fetchWildcardPage } from './utils/ClientService'; // adjust the path as needed

const ClientInformationPage = () => {
  const [clientList, setClientList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const [inputValue, setInputValue] = useState('');
  const [isWildcardMode, setIsWildcardMode] = useState(false);
  const [selectedGroupRow, setSelectedGroupRow] = useState(null);

  const handleClientsFetched = (fetchedClients) => {
    setCurrentPage(0);
    setClientList(prev => {
      const prevIds = prev.map(c => c.client).join(',');
      const newIds = fetchedClients.map(c => c.client).join(',');
      return prevIds === newIds ? prev : fetchedClients;
    });
  };

  
  const [selectedData, setSelectedData] = useState(defaultSelectedData);

  useEffect(() => {
    setClientList([]); // ✅ Clear old page data
        fetchClientsPaging(currentPage, 25)
            .then((data) => {
            setClientList(data);
            })
            .catch((error) => {
            console.error('Error fetching clients:', error);
        });
  }, [currentPage]);


  const [editClientWindow, setEditClientWindow] = useState(false);

  const handleRowClick = (rowData) => {
    const billingSp = rowData.billingSp || '';
    const matchedClient = clientList.find(client => client.billingSp === billingSp);
    const atmCashPrefixes = matchedClient?.sysPrinsPrefixes || [];
    const clientEmails = matchedClient?.clientEmail || [];
    const reportOptions = matchedClient?.reportOptions || [];
    const sysPrinsList = matchedClient?.sysPrins || [];

    if (rowData.isGroup) {
      setSelectedGroupRow(rowData); // ✅ save the group row
      return; // optionally stop here if you don't want to overwrite selectedData
    }

    const mappedData = mapRowDataToSelectedData(selectedData, rowData, atmCashPrefixes, clientEmails, reportOptions, sysPrinsList);
    setSelectedData(mappedData);
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '80vw', overflow: 'auto' }}>
     <CRow className="px-3" style={{ height: '100%', marginBottom: '10px' }}>
        {/* Left Panel (30%) */}
        <CCol style={{ flex: '0 0 29%', maxWidth: '29%', paddingLeft: '0px', border: '1px solid #ccc', }}>
            <AutoCompleteInputBox
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
                  <NavigationPanel
                    onRowClick={handleRowClick}
                    clientList={clientList}
                    setClientList={setClientList} 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isWildcardMode={isWildcardMode}
                    setIsWildcardMode={setIsWildcardMode}
                    onFetchWildcardPage={fetchWildcardPage}                  
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
                  <PreviewClientInformation setEditClientWindow={setEditClientWindow} selectedGroupRow={selectedGroupRow} />
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



      {/* Left Panel (30%) 
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
      </CRow> */}
    </div>
  );
};

export default ClientInformationPage;
