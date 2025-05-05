import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody
} from '@coreui/react';

import ClientInformation from './ClientInformation.js';
import SysPrin from './SysPrin.js';

const SysPinConfig = () => {
  const [clientList, setClientList] = useState([]);
  const [selectedData, setSelectedData] = useState({
    client: '',
    name: '',
    address: '',
    billingSp: '',
    atmCashRule: '',
    sysPrinsPrefixes: [],
  });

  useEffect(() => {
    fetch('http://localhost:4444/api/clients')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        return response.json();
      })
      .then((data) => {
        setClientList(data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

    const handleRowClick = (rowData) => {
      const billingSp = rowData.billingSp || '';
      const matchedClient = clientList.find(client => client.billingSp === billingSp);
      const atmCashPrefixes = matchedClient?.sysPrinsPrefixes || [];
      const clientEmails = matchedClient?.clientEmail || [];
      const reportOptions = matchedClient?.reportOptions || [];
      const sysPrinsList = matchedClient?.sysPrins || [];
    
      // 🔍 Find the specific sysPrin object
      const matchedSysPrin = sysPrinsList.find(sp =>
        sp?.id?.sysPrin === rowData.sysPrin || sp?.sysPrin === rowData.sysPrin
      );
    
      // 📦 Extract only the invalidDelivAreas of that sysPrin
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
        invalidDelivAreas: specificInvalidDelivAreas, // ✅ Set only relevant areas
      }));
    
      // ✅ Optional debug log
      if (specificInvalidDelivAreas.length > 0) {
        console.log('✅ specific invalidDelivAreas found:', specificInvalidDelivAreas);
      } else {
        console.log('❌ No invalidDelivAreas for this sysPrin.');
      }
    };
  
  return (
    <div className="d-flex flex-column" style={{ height: 'calc(100vh - 100px)' }}>
      <CRow className="mb-3" style={{ height: '45%' }}>
        <CCol xs={12}>
          <CCard className="h-100">
            <CCardBody className="h-100 p-3">
              <ClientInformation onRowClick={handleRowClick} clientList={clientList} />
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
