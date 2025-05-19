import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import '../../../scss/sys-prin-configuration/client-information.scss';

ModuleRegistry.registerModules([AllCommunityModule]);

const ClientReport = ({ onRowClick, selectedData }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(selectedData?.reportOptions)) {
      setTableData([]);
      return;
    }

    const clientData = selectedData.reportOptions.map((option) => ({
      reportName: option?.reportDetails?.reportName || '',
      receive: option.receiveFlag ? 'Yes' : 'No',
      destination: option.outputTypeCd || '',
      fileText: option.fileTypeCd || '', // ✅ use string value: "Text" or "Excel"
      email:
        option.emailFlag === 1
          ? 'Email'
          : option.emailFlag === 2
          ? 'Web'
          : 'None', // 0 or any other case
      password: option.reportPasswordTx || '',
    }));
    
    setTableData(clientData);
  }, [selectedData]);

  const cellSelectStyle = {
    width: '100%',
    border: '1px solid gray',
    borderRadius: '4px',
    height: '28px',
  };

const columnDefs = [
    { field: 'reportName', headerName: 'Report Name', filter: true, width: 300 }, // ⬅️ wider
    {
      field: 'receive',
      headerName: 'Receive',
      filter: true,
      width: 120, // ⬅️ narrowed
      cellRenderer: (params) => (
        <select
          value={params.value}
          onChange={(e) =>
            params.api.getRowNode(params.node.id).setDataValue('receive', e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
          style={cellSelectStyle}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      ),
    },
    {
      field: 'destination',
      headerName: 'Destination',
      filter: true,
      width: 120,
      cellRenderer: (params) => (
        <select
          value={params.value}
          onChange={(e) =>
            params.api.getRowNode(params.node.id).setDataValue('destination', e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
          style={cellSelectStyle}
        >
          <option value="File">File</option>
          <option value="Print">Print</option>
        </select>
      ),
    },
    {
      field: 'fileText',
      headerName: 'File Type',
      filter: true,
      width: 120,
      cellRenderer: (params) => (
        <select
          value={params.value}
          onChange={(e) =>
            params.api.getRowNode(params.node.id).setDataValue('fileText', e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
          style={cellSelectStyle}
        >
          <option value="Excel">Excel</option>
          <option value="Text">Text</option>
        </select>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      filter: true,
      width: 120,
      cellRenderer: (params) => (
        <select
          value={params.value}
          onChange={(e) =>
            params.api.getRowNode(params.node.id).setDataValue('email', e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
          style={cellSelectStyle}
        >
          <option value="Email">Email</option>
          <option value="Web">Web</option>
          <option value="None">None</option>
        </select>
      ),
    },
    {
      field: 'password',
      headerName: 'Password',
      filter: true,
      width: 120,
      cellRenderer: (params) => (
        <input
          type="password"
          value={params.value}
          onChange={(e) =>
            params.api.getRowNode(params.node.id).setDataValue('password', e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            fontSize: '12px',
            height: '30px',
            padding: '2px 4px',
            border: '1px solid gray',
            borderRadius: '4px',
          }}
        />
      ),
    },
  ];

  const defaultColDef = {
    flex: 1,
    resizable: true,
    filter: true,
  };

  const handleRowClicked = (event) => {
    const row = event.data;
    localStorage.setItem('selectedClient', row.reportName);
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <div
              className="ag-grid-container ag-theme-quartz"
              style={{ height: 200 }}
            >
              <AgGridReact
                rowData={tableData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={5}
                onRowClicked={handleRowClicked}
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ClientReport;
