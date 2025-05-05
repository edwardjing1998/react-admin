 {/* Email Recipients Multi-Select

import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import './SysPrinConfigs.css';
import { useClientContext } from '../../../context/ClientContext.js';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { 
  CCol, 
  CRow, 
  CFormCheck
} from '@coreui/react';

ModuleRegistry.registerModules([AllCommunityModule]);

const flattenData = (data) => {
  const result = [];
  data?.forEach(item => {
    item.sysPrins?.forEach(sys => {
      result.push({
        client: item.client,
        name: item.name,
        sysPrin: sys.sysPrin
      });
    });
  });
  return result;
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '60px',
};

const SysPrinConfigs = () => {
  const { clientList = [] } = useClientContext();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [custType, setCustType] = useState('');
  const [destroyStatus, setDestroyStatus] = useState('');
  const [returnStatus, setReturnStatus] = useState('');
  const [special, setSpecial] = useState('');
  const [pinMailer, setPinMailer] = useState('');
  const [active, setActive] = useState('');
  const [addrFlag, setAddrFlag] = useState('');
  const [astatRch, setAstatRch] = useState('');
  const [nm13, setNm13] = useState('');
  const [rps, setRps] = useState('');



  
  

  const debounceTimer = useRef(null);

  const columnDefs = [
    { field: 'client', headerName: 'Client', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'sysPrin', headerName: 'SysPrin', flex: 1 },
  ];

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const trimmed = searchText.trim().toLowerCase();

      if (trimmed === '') {
        setFilteredData([]);
        setShowGrid(false);
      } else {
        const flat = flattenData(clientList);
        const filtered = flat.filter((item) =>
          item.name?.toLowerCase().includes(trimmed) ||
          item.sysPrin?.toLowerCase().includes(trimmed)
        );
        setFilteredData(filtered);
        setShowGrid(filtered.length > 0);
      }
    }, 300);

    return () => clearTimeout(debounceTimer.current);
  }, [searchText, clientList]);

  return (
    <>
      <CRow style={{ backgroundColor: '#007bff', padding: '4px 10px', color: 'white', alignItems: 'center' }}>
        <CCol xs={2}>
          <div style={{ fontWeight: 'bold' }}>Column 1</div>
        </CCol>

        <CCol xs={2}>
          <div style={{ fontWeight: 'bold' }}>Column 2</div>
        </CCol>

        <CCol xs={6}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Type to search name or sysPrin..."
              value={searchText}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />

            {showGrid && (
              <div
                className="ag-theme-alpine"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                  padding: '1rem',
                }}
              >
                <AgGridReact
                  rowData={filteredData}
                  columnDefs={columnDefs}
                  pagination={true}
                  paginationPageSize={5}
                  paginationPageSizeSelector={[5, 10, 20, 50]}
                  domLayout="autoHeight"
                  animateRows={false}
                />
              </div>
            )}
          </div>
        </CCol>

        <CCol xs={2}>
          <div style={{ fontWeight: 'bold' }}>Column 6</div>
        </CCol>
      </CRow>

      <CRow className="mt-3" style={{ backgroundColor: 'white', padding: '10px' }}>
      <CCol xs={12}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
            General Information
          </div>
        </CCol>
      </CRow>

      <CRow className="mt-3" style={{ minHeight: '64px', alignItems: 'middle' }}>
      <CCol xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="customer-type-label">Customer Type</InputLabel>
            <Select
              labelId="customer-type-label"
              id="customer-type"
              value={custType}
              label="Customer Type"
              onChange={(e) => setCustType(e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Full Processing">Full Processing</MenuItem>
              <MenuItem value="Destroy All">Destroy All</MenuItem>
              <MenuItem value="Return All">Return All</MenuItem>
            </Select>
          </FormControl>
        </CCol>

        <CCol xs={2} style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
        <div style={rowStyle} className="mb-3">
              <CFormCheck
                  type="checkbox"
                  id="sys-prin-active"
                  label="Sys/PRIN Active"
                  checked={active === 'Y'}
                  onChange={(e) => setActive(e.target.checked ? 'Y' : 'N')}
                />
          </div>
        </CCol>
        <CCol xs={2}>
        <div style={rowStyle} className="mb-3">
              AAA
                
          </div>
          
        </CCol>
        <CCol xs={2}>
          <div style={{ fontWeight: 'bold' }}>Col 4</div>
        </CCol>
        <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 5</div></CCol>
        <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 6</div></CCol>
      </CRow>

      <CRow className="mt-2" style={{ minHeight: '64px', alignItems: 'left' }}>
        <CCol xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="return-status-label">Return Status</InputLabel>
            <Select
              labelId="return-status-label"
              id="destroy-status"
              value={returnStatus}
              label="Destroy Status"
              onChange={(e) => setReturnStatus(e.target.value)}
            >
                <MenuItem value="">None</MenuItem>
                  <MenuItem value="A Status">A Status</MenuItem>
                  <MenuItem value="C Status">C Status</MenuItem>
                  <MenuItem value="E Status">E Status</MenuItem>
                  <MenuItem value="F Status">F Status</MenuItem>
            </Select>
          </FormControl>
        </CCol>

      <CCol xs={2} style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
      <div style={rowStyle} className="mb-3">
          <CFormCheck
                  type="checkbox"
                  id="rps-customer"
                  label="RPS Customer"
                  checked={rps === 'Y'}
                  onChange={(e) => setRps(e.target.checked ? 'Y' : 'N')}
                />
      </div>
      </CCol>
      <CCol xs={2}><div style={{   display: 'flex',
  alignItems: 'center',
  height: '64px', height: '100%', }}>Col 3</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 4</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 5</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 6</div></CCol>
    </CRow>

    <CRow className="mt-2"  style={{ minHeight: '64px', alignItems: 'left' }}>
        <CCol xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="destroy-status-label">Destroy Status</InputLabel>
            <Select
              labelId="destroy-status-label"
              id="destroy-status"
              value={destroyStatus}
              label="Destroy Status"
              onChange={(e) => setDestroyStatus(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Destroy">Destroy</MenuItem>
              <MenuItem value="Return">Return</MenuItem>
            </Select>
          </FormControl>
        </CCol>

      <CCol xs={2} style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
        
      <div style={rowStyle} className="mb-3">
              <CFormCheck
                  type="checkbox"
                  id="invalid-address-flag"
                  label="Flag Undeliverable an Invalid Address"
                  checked={addrFlag === 'Y'}
                  onChange={(e) => setAddrFlag(e.target.checked ? 'Y' : 'N')}
                />
          </div>        
      </CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 3</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 4</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 5</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 6</div></CCol>
    </CRow>

    <CRow className="mt-2" style={{ minHeight: '64px', alignItems: 'left' }}>
        <CCol xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="destroy-status-label">Special</InputLabel>
            <Select
              labelId="special-label"
              id="special"
              value={special}
              label="Destroy Status"
              onChange={(e) => setSpecial(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Destroy">Destroy</MenuItem>
              <MenuItem value="Return">Return</MenuItem>
            </Select>
          </FormControl>
        </CCol>

      <CCol xs={2} style={{ display: 'flex', alignItems: 'center', height: '64px' }}>     
        <div style={rowStyle} className="mb-3">
              <CFormCheck
                  type="checkbox"
                  id="status-research"
                  label="A Status Accounts Going in Research"
                  checked={astatRch === 'Y'}
                  onChange={(e) => setAstatRch(e.target.checked ? 'Y' : 'N')}
                />
          </div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 3</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 4</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 5</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 6</div></CCol>
    </CRow>

    <CRow className="mt-2">
        <CCol xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="destroy-status-label">Pin Mailer</InputLabel>
            <Select
              labelId="pin-mailer-label"
              id="pin-mailer"
              value={pinMailer}
              label="Pin Mailer"
              onChange={(e) => setPinMailer(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Destroy">Destroy</MenuItem>
              <MenuItem value="Return">Return</MenuItem>
            </Select>
          </FormControl>
        </CCol>

      <CCol xs={2} style={{ display: 'flex', alignItems: 'center', height: '64px' }}>

      <div style={rowStyle} className="mb-3">
              <CFormCheck
                  type="checkbox"
                  id="non-mon-13"
                  label="Perform Non Mon 13 on Destroy"
                  checked={nm13 === 'Y'}
                  onChange={(e) => setNm13(e.target.checked ? 'Y' : 'N')}
                />
          </div>

      </CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 3</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 4</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 5</div></CCol>
      <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 6</div></CCol>
    </CRow>

    </>
  );
};

export default SysPrinConfigs;

*/}

 {/* 
import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import './SysPrinConfigs.css';
import { useClientContext } from '../../../context/ClientContext.js';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {
  CCol,
  CRow,
  CFormCheck
} from '@coreui/react';

import {
  Box,
  TextField
} from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule]);

const flattenData = (data) => {
  const result = [];
  data?.forEach(item => {
    item.sysPrins?.forEach(sys => {
      result.push({
        client: item.client,
        name: item.name,
        sysPrin: sys.sysPrin
      });
    });
  });
  return result;
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '60px',
};

const SysPrinConfigs = () => {
  const { clientList = [] } = useClientContext();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [custType, setCustType] = useState('');
  const [destroyStatus, setDestroyStatus] = useState('');
  const [returnStatus, setReturnStatus] = useState('');
  const [special, setSpecial] = useState('');
  const [pinMailer, setPinMailer] = useState('');
  const [active, setActive] = useState('');
  const [addrFlag, setAddrFlag] = useState('');
  const [astatRch, setAstatRch] = useState('');
  const [nm13, setNm13] = useState('');
  const [rps, setRps] = useState('');
  const [holdDays, setHoldDays] = useState('');
  const [tempAway, setTempAway] = useState('');
  const [tempAwayAtts, setTempAwayAtts] = useState('');
  const [undeliverable, setUndeliverable] = useState('');
  const [forwardingAddress, setForwardingAddress] = useState('');

  const debounceTimer = useRef(null);

  const columnDefs = [
    { field: 'client', headerName: 'Client', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'sysPrin', headerName: 'SysPrin', flex: 1 },
  ];

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const colWithRightGap = {
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    backgroundColor: 'white',
    borderRight: '8px solid #f0f0f0'
  };
  

  useEffect(() => {
    clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const trimmed = searchText.trim().toLowerCase();

      if (trimmed === '') {
        setFilteredData([]);
        setShowGrid(false);
      } else {
        const flat = flattenData(clientList);
        const filtered = flat.filter((item) =>
          item.name?.toLowerCase().includes(trimmed) ||
          item.sysPrin?.toLowerCase().includes(trimmed)
        );
        setFilteredData(filtered);
        setShowGrid(filtered.length > 0);
      }
    }, 300);

    return () => clearTimeout(debounceTimer.current);
  }, [searchText, clientList]);

  return (
    <>
      <CRow style={{ backgroundColor: '#007bff', padding: '4px 10px', color: 'white', alignItems: 'center' }}>
        <CCol xs={2}>
          <div style={{ fontWeight: 'bold' }}>Column 1</div>
        </CCol>

        <CCol xs={2}>
          <div style={{ fontWeight: 'bold' }}>Column 2</div>
        </CCol>

        <CCol xs={6}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Type to search name or sysPrin..."
              value={searchText}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
            {showGrid && (
              <div
                className="ag-theme-alpine"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                  padding: '1rem',
                }}
              >
                <AgGridReact
                  rowData={filteredData}
                  columnDefs={columnDefs}
                  pagination={true}
                  paginationPageSize={5}
                  paginationPageSizeSelector={[5, 10, 20, 50]}
                  domLayout="autoHeight"
                  animateRows={false}
                />
              </div>
            )}
          </div>
        </CCol>

        <CCol xs={2}>
          <div style={{ fontWeight: 'bold' }}>Column 6</div>
        </CCol>
      </CRow>

      <CRow className="mt-3" style={{ backgroundColor: 'white', padding: '10px' }}>
        <CCol xs={12}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
            General Information
          </div>
        </CCol>
      </CRow>
      <CRow style={{ backgroundColor: '#f0f0f0', height: '12px', margin: 0, padding: 0 }} />

      <CRow style={{ minHeight: '64px', alignItems: 'center', backgroundColor: 'white', margin: 0, padding: 0 }}>
        <CCol xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="customer-type-label">Customer Type</InputLabel>
            <Select
              labelId="customer-type-label"
              id="customer-type"
              value={custType}
              label="Customer Type"
              onChange={(e) => setCustType(e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Full Processing">Full Processing</MenuItem>
              <MenuItem value="Destroy All">Destroy All</MenuItem>
              <MenuItem value="Return All">Return All</MenuItem>
            </Select>
          </FormControl>
        </CCol>

        <CCol xs={4} style={colWithRightGap}>
        <div style={rowStyle} className="mb-3">

          <CFormCheck
            type="checkbox"
            id="sys-prin-active"
            label="Sys/PRIN Active"
            checked={active === 'Y'}
            onChange={(e) => setActive(e.target.checked ? 'Y' : 'N')}
          />
        </div>
        </CCol>

        <CCol xs={2}>
          <div style={rowStyle}>
              <TextField
                label="Days to Hold"
                variant="outlined"
                fullWidth
                size="small"
                value={holdDays}
                onChange={(e) => setHoldDays(e.target.value)}
              />
          </div>
        </CCol>

        <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 55</div></CCol>
        <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col AAAA</div></CCol>
      </CRow>

      <CRow style={{ minHeight: '64px', alignItems: 'center', backgroundColor: 'white', margin: 0, padding: 0 }}>
        <CCol xs={2}>
        <FormControl fullWidth size="small">
            <InputLabel id="return-status-label">Return Status</InputLabel>
            <Select
              labelId="return-status-label"
              id="destroy-status"
              value={destroyStatus}
              label="Destroy Status"
              onChange={(e) => setDestroyStatus(e.target.value)}
            >
                <MenuItem value="">None</MenuItem>
                  <MenuItem value="A Status">A Status</MenuItem>
                  <MenuItem value="C Status">C Status</MenuItem>
                  <MenuItem value="E Status">E Status</MenuItem>
                  <MenuItem value="F Status">F Status</MenuItem>
            </Select>
          </FormControl>
        </CCol>

        <CCol xs={4} style={colWithRightGap}>
        <div style={rowStyle} className="mb-3">
          <CFormCheck
                  type="checkbox"
                  id="rps-customer"
                  label="RPS Customer"
                  checked={rps === 'Y'}
                  onChange={(e) => setRps(e.target.checked ? 'Y' : 'N')}
                />
      </div>
        </CCol>

        <CCol xs={2}>
          <div style={rowStyle}>
          <TextField
                label="Days to Hold Temp Aways"
                variant="outlined"
                fullWidth
                size="small"
                value={tempAway}
                onChange={(e) => setTempAway(e.target.value)}
              />

          </div>
        </CCol>

        <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col 66</div></CCol>
        <CCol xs={2}><div style={{ fontWeight: 'bold' }}>Col BBB</div></CCol>
      </CRow>

      <CRow style={{ minHeight: '64px', alignItems: 'center', backgroundColor: 'white', margin: 0, padding: 0 }}>
        <CCol xs={2}>
        <FormControl fullWidth size="small">
            <InputLabel id="return-status-label">Return Status</InputLabel>
            <Select
              labelId="return-status-label"
              id="destroy-status"
              value={returnStatus}
              label="Destroy Status"
              onChange={(e) => setReturnStatus(e.target.value)}
            >
                <MenuItem value="">None</MenuItem>
                  <MenuItem value="A Status">A Status</MenuItem>
                  <MenuItem value="C Status">C Status</MenuItem>
                  <MenuItem value="E Status">E Status</MenuItem>
                  <MenuItem value="F Status">F Status</MenuItem>
            </Select>
          </FormControl>
        </CCol>

        <CCol xs={4} style={colWithRightGap}>
        <div style={rowStyle} className="mb-3">
              <CFormCheck
                  type="checkbox"
                  id="invalid-address-flag"
                  label="Flag Undeliverable an Invalid Address"
                  checked={addrFlag === 'Y'}
                  onChange={(e) => setAddrFlag(e.target.checked ? 'Y' : 'N')}
                />
          </div>   
        </CCol>

        <CCol xs={2}>
          <div style={rowStyle}>
             <TextField
                             label="Re-Mail Attempts"
                             variant="outlined"
                             fullWidth
                             size="small"
                             value={tempAwayAtts}
                             onChange={(e) => setTempAwayAtts(e.target.value)}
                           />

          </div>
        </CCol>

        <CCol xs={4} rowSpan={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', borderLeft: '1px solid #eee' }}>
  Col 77 + CCC
        </CCol>

      </CRow>

      <CRow style={{ minHeight: '64px', alignItems: 'center', backgroundColor: 'white', margin: 0, padding: 0 }}>
        <CCol xs={2}>
        <FormControl fullWidth size="small">
            <InputLabel id="destroy-status-label">Special</InputLabel>
            <Select
              labelId="special-label"
              id="special"
              value={special}
              label="Special"
              onChange={(e) => setSpecial(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Destroy">Destroy</MenuItem>
              <MenuItem value="Return">Return</MenuItem>
            </Select>
          </FormControl>
        </CCol>

        <CCol xs={4} style={colWithRightGap}>
        <div style={rowStyle} className="mb-3">
              <CFormCheck
                  type="checkbox"
                  id="status-research"
                  label="A Status Accounts Going in Research"
                  checked={astatRch === 'Y'}
                  onChange={(e) => setAstatRch(e.target.checked ? 'Y' : 'N')}
                />
          </div>
        </CCol>

        <CCol xs={2}>
          <div style={rowStyle}>
          <FormControl fullWidth size="small">
              <InputLabel id="undeliverable-label">Unable to Deliver</InputLabel>
              <Select
                labelId="undeliverable-label"
                id="undeliverable"
                value={undeliverable || ''}
                label="Unable to Deliver"
                onChange={(e) => setUndeliverable(e.target.value)}
              >
                <MenuItem value="0">Return</MenuItem>
                <MenuItem value="1">Destroy</MenuItem>
                <MenuItem value="2">Research Destroy</MenuItem>
                <MenuItem value="3">Research / Return</MenuItem>
                <MenuItem value="4">Research / Carrier Ret</MenuItem>
              </Select>
            </FormControl>
          </div>
        </CCol>



      </CRow>



      <CRow style={{ minHeight: '64px', alignItems: 'center', backgroundColor: 'white', margin: 0, padding: 0 }}>
      <CCol xs={2} style={{ backgroundColor: 'white' }}>

      <FormControl fullWidth size="small">
            <InputLabel id="destroy-status-label">Pin Mailer</InputLabel>
            <Select
              labelId="pin-mailer-label"
              id="pin-mailer"
              value={pinMailer}
              label="Pin Mailer"
              onChange={(e) => setPinMailer(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Destroy">Destroy</MenuItem>
              <MenuItem value="Return">Return</MenuItem>
            </Select>
          </FormControl>
        </CCol>

        <CCol xs={4} style={colWithRightGap}>
        <div style={rowStyle} className="mb-3">
              <CFormCheck
                  type="checkbox"
                  id="non-mon-13"
                  label="Perform Non Mon 13 on Destroy"
                  checked={nm13 === 'Y'}
                  onChange={(e) => setNm13(e.target.checked ? 'Y' : 'N')}
                />
          </div>
        </CCol>

        <CCol xs={2} style={{ backgroundColor: 'white' }}>
          <div style={rowStyle}>
          <FormControl fullWidth size="small">
              <InputLabel id="forwarding-label">Forwarding Address</InputLabel>
              <Select
                labelId="forwarding-label"
                id="forwarding"
                value={forwardingAddress || ''}
                label="Forwarding Address"
                onChange={(e) => setForwardingAddress(e.target.value)}
              >
                <MenuItem value="1">Re-Mail</MenuItem>
                <MenuItem value="2">Research</MenuItem>
              </Select>
            </FormControl>
          </div>
        </CCol>

      </CRow>

    </>
  );
};

export default SysPrinConfigs;

*/}
 
import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import './SysPrinConfigs.css';
import { useClientContext } from '../../../context/ClientContext.js';
import SysPrinGeneral from './SysPrinGeneral';
import ReMailOptions from './ReMailOptions';


import {
  CCol,
  CRow,
  CFormCheck
} from '@coreui/react';

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule]);

const flattenData = (data) => {
  const result = [];
  data?.forEach(item => {
    item.sysPrins?.forEach(sys => {
      result.push({
        client: item.client,
        name: item.name,
        sysPrin: sys.sysPrin
      });
    });
  });
  return result;
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '60px',
};

const colWithRightGap = {
  display: 'flex',
  alignItems: 'center',
  height: '64px',
  backgroundColor: 'white',
  borderRight: '8px solid #f0f0f0'
};

const SysPrinConfigs = () => {


  const handleRowClick = (event) => {
    const { client, sysPrin } = event.data;
    const matchedClient = clientList.find(c => c.client === client);
  
    if (!matchedClient) return;
  
    const matchedSysPrin = matchedClient.sysPrins?.find(sp => sp.sysPrin === sysPrin);
  
    if (!matchedSysPrin) return;
  
    setGeneralFormState({
      custType: matchedSysPrin.custType || '',
      destroyStatus: matchedSysPrin.destroyStatus || '',
      returnStatus: matchedSysPrin.returnStatus || '',
      special: matchedSysPrin.special || '',
      pinMailer: matchedSysPrin.pinMailer || '',
      active: matchedSysPrin.active ? 'Y' : 'N',
      addrFlag: matchedSysPrin.addrFlag || '',
      astatRch: matchedSysPrin.astatRch || '',
      nm13: matchedSysPrin.nm13 || '',
      rps: matchedSysPrin.rps || ''
    });
  
    setFormState(prev => ({
      ...prev,
      holdDays: matchedSysPrin.holdDays?.toString() || '',
      tempAway: matchedSysPrin.tempAway?.toString() || '',
      tempAwayAtts: matchedSysPrin.tempAwayAtts?.toString() || '',
      undeliverable: matchedSysPrin.undeliverable || '',
      forwardingAddress: matchedSysPrin.forwardingAddress || '',
      nonUS: matchedSysPrin.nonUS || '',
      poBox: matchedSysPrin.poBox || '',
      badState: matchedSysPrin.badState || '',
      invalidDelivAreas: matchedSysPrin.invalidDelivAreas || []
    }));
  
    setShowGrid(false);
    setSearchText(`${matchedClient.name} - ${sysPrin}`);
  };
  

  const { clientList = [] } = useClientContext();

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);

  const [generalFormState, setGeneralFormState] = useState({
    custType: '', destroyStatus: '', returnStatus: '', special: '', pinMailer: '',
    active: '', addrFlag: '', astatRch: '', nm13: '', rps: '',
    holdDays: '', tempAway: '', tempAwayAtts: '', undeliverable: '', forwardingAddress: ''
  });

  const [formState, setFormState] = useState({
    custType: '', destroyStatus: '', returnStatus: '', special: '', pinMailer: '',
    active: '', addrFlag: '', astatRch: '', nm13: '', rps: '',
    holdDays: '', tempAway: '', tempAwayAtts: '', undeliverable: '', forwardingAddress: '',
    nonUS: '', poBox: '', badState: '',
    invalidDelivAreas: [ { area: 'Los Angeles, CA 90001' } ] // optional placeholder
  });
  
  const debounceTimer = useRef(null);

  const columnDefs = [
    { field: 'client', headerName: 'Client', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'sysPrin', headerName: 'SysPrin', flex: 1 },
  ];

  const handleInputChange = (e) => setSearchText(e.target.value);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const trimmed = searchText.trim().toLowerCase();
      if (!trimmed) {
        setFilteredData([]);
        setShowGrid(false);
      } else {
        const flat = flattenData(clientList);
        const filtered = flat.filter(item =>
          item.name?.toLowerCase().includes(trimmed) ||
          item.sysPrin?.toLowerCase().includes(trimmed)
        );
        setFilteredData(filtered);
        setShowGrid(filtered.length > 0);
      }
    }, 300);
    return () => clearTimeout(debounceTimer.current);
  }, [searchText, clientList]);

  return (
    <>
      <CRow style={{ backgroundColor: '#007bff', padding: '4px 10px', color: 'white', alignItems: 'center' }}>
        <CCol xs={2}><div style={{ fontWeight: 'bold' }}></div></CCol>
        <CCol xs={2}><div style={{ fontWeight: 'bold' }}></div></CCol>
        <CCol xs={6}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Type to search name or sysPrin..."
              value={searchText}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
            {showGrid && (
              <div className="ag-theme-alpine" style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 9999, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', padding: '1rem' }}>
                <AgGridReact
                  rowData={filteredData}
                  columnDefs={columnDefs}
                  pagination={true}
                  paginationPageSize={5}
                  paginationPageSizeSelector={[5, 10, 20, 50]}
                  domLayout="autoHeight"
                  animateRows={false}
                  onRowClicked={handleRowClick}
                />
              </div>
            )}
          </div>
        </CCol>
        <CCol xs={2}><div style={{ fontWeight: 'bold' }}></div></CCol>
      </CRow>

      <CRow
          className="mt-3"
          style={{
            backgroundColor: 'white',
            alignItems: 'stretch',
            minHeight: '36px',
          }}
        >
          <CCol
            xs={7}
            style={{
              paddingRight: '16px',
              borderRight: '12px solid #f0f0f0', // Right gray vertical separator
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
              General Information
            </div>
          </CCol>

          <CCol
            xs={5}
            style={{
              paddingLeft: '16px',
              borderLeft: '12px solid #f0f0f0', // Left gray vertical separator
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
              Re-Mail Options
            </div>
          </CCol>
      </CRow>

      <CRow className="mt-3">
        <CCol xs={7}>
          <SysPrinGeneral
            custType={generalFormState.custType}
            setCustType={(val) => setGeneralFormState(prev => ({ ...prev, custType: val }))}

            returnStatus={generalFormState.returnStatus}
            setReturnStatus={(val) => setGeneralFormState(prev => ({ ...prev, returnStatus: val }))}

            destroyStatus={generalFormState.destroyStatus}
            setDestroyStatus={(val) => setGeneralFormState(prev => ({ ...prev, destroyStatus: val }))}

            special={generalFormState.special}
            setSpecial={(val) => setGeneralFormState(prev => ({ ...prev, special: val }))}

            pinMailer={generalFormState.pinMailer}
            setPinMailer={(val) => setGeneralFormState(prev => ({ ...prev, pinMailer: val }))}

            active={generalFormState.active}
            setActive={(val) => setGeneralFormState(prev => ({ ...prev, active: val }))}

            addrFlag={generalFormState.addrFlag}
            setAddrFlag={(val) => setGeneralFormState(prev => ({ ...prev, addrFlag: val }))}

            astatRch={generalFormState.astatRch}
            setAstatRch={(val) => setGeneralFormState(prev => ({ ...prev, astatRch: val }))}

            nm13={generalFormState.nm13}
            setNm13={(val) => setGeneralFormState(prev => ({ ...prev, nm13: val }))}

            rps={generalFormState.rps}
            setRps={(val) => setGeneralFormState(prev => ({ ...prev, rps: val }))}
          />
        </CCol>

        <CCol xs={5}>
          <ReMailOptions
            nonUS={formState.nonUS}
            setNonUS={(val) => setFormState(prev => ({ ...prev, nonUS: val }))}

            poBox={formState.poBox}
            setPoBox={(val) => setFormState(prev => ({ ...prev, poBox: val }))}

            badState={formState.badState}
            setBadState={(val) => setFormState(prev => ({ ...prev, badState: val }))}

            tempAwayAtts={formState.tempAwayAtts}
            setTempAwayAtts={(val) => setFormState(prev => ({ ...prev, tempAwayAtts: val }))}

            tempAway={formState.tempAway}
            setTempAway={(val) => setFormState(prev => ({ ...prev, tempAway: val }))}

            holdDays={formState.holdDays}
            setHoldDays={(val) => setFormState(prev => ({ ...prev, holdDays: val }))}

            undeliverable={formState.undeliverable}
            setUndeliverable={(val) => setFormState(prev => ({ ...prev, undeliverable: val }))}

            forwardingAddress={formState.forwardingAddress}
            setForwardingAddress={(val) => setFormState(prev => ({ ...prev, forwardingAddress: val }))}

            invalidDelivAreas={formState.invalidDelivAreas}
            setInvalidDelivAreas={(val) => setFormState(prev => ({ ...prev, invalidDelivAreas: val }))}
          />
        </CCol>

      </CRow>  
    </>
  );
};

export default SysPrinConfigs;
