import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody
} from '@coreui/react';

import ClientInformation from './ClientInformation.js';
import SysPrin from './SysPrin.js';
import ClientAutoComplete from '../client-search-input/ClientAutoCompleteInput.js'

const SysPinConfig = () => {
  const [clientList, setClientList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const [inputValue, setInputValue] = useState('');
  const [isWildcardMode, setIsWildcardMode] = useState(false);

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
    sysPrinsPrefixes: [],
  });

  useEffect(() => {
    setClientList([]); // ✅ Clear old page data
    fetch(`http://localhost:4444/api/clients-paging?page=${currentPage}&size=15`)
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

    setSelectedData((prev) => ({
      ...prev,
      ...rowData,
      sysPrinsPrefixes: atmCashPrefixes,
      clientEmail: clientEmails,
      reportOptions: reportOptions,
      sysPrins: sysPrinsList,
      sysPrin: rowData.sysPrin || '',
      invalidDelivAreas: specificInvalidDelivAreas,
    }));
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', width: '80vw', overflow: 'auto' }}>

      <CRow className="mb-3" style={{ backgroundColor: '#007bff', padding: '6px 0', borderRadius: '6px' }}>
        <CCol xs={3}></CCol>
        <CCol xs={6} className="d-flex justify-content-end">
        <ClientAutoComplete
          inputValue={inputValue}
          setInputValue={setInputValue}
          onClientsFetched={handleClientsFetched}
          isWildcardMode={isWildcardMode}
          setIsWildcardMode={setIsWildcardMode}
        />
        </CCol>
        <CCol xs={3}></CCol>
      </CRow>

      <CRow className="p-3" style={{ height: '100%' }}>
        <CCol style={{ flex: '0 0 30%', maxWidth: '30%' }}>
          <CCard style={{ height: '100%' }}>
            <CCardBody style={{ height: '100%', padding: 0 }}>
              <div style={{ height: '700px', overflow: 'auto' }}>
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
              <div style={{ height: '700px', overflow: 'auto' }}>
                <CRow className="p-3" style={{ height: '700px' }}>
                  <CCol style={{ flex: '0 0 50%', maxWidth: '50%', height: '100%' }}>
                    <CCard style={{ height: '100%' }}>
                      <CCardBody style={{ height: '100%' }}>
                        <p>This is the left column (50%).</p>
                      </CCardBody>
                    </CCard>
                  </CCol>

                  <CCol style={{ flex: '0 0 50%', maxWidth: '50%', height: '100%' }}>
                    <CCard style={{ height: '100%' }}>
                      <CCardBody style={{ height: '100%' }}>
                        <p>This is the right column (50%).</p>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

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
