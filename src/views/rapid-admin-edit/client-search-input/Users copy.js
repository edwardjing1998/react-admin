// File: UserTableWithPDF.js
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Register required AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const UserTableWithPDF = () => {
  const [rowData] = useState([
    {
      "caseNumber": "C00004_R27",
      "account": "A104",
      "lastName": "Last4",
      "firstName": "First4",
      "addr1": "Addr1-4",
      "addr2": "Addr2-4",
      "city": "City4",
      "state": "NY",
      "zip": "10001",
      "homePhone": "212-555-0004",
      "workPhone": "646-555-0004",
      "status": "Closed",
      "numCards": 2,
      "nextDate": "2025-04-01",
      "noRenewal": true,
      "reason": "Auto-generated",
      "disposition": "S",
      "inDate": "2025-03-06",
      "deliveryId": "D001",
      "sysPrin": "SP4",
      "outDate": "2025-03-10",
      "cycle": "Monthly",
      "active": true,
      "inHour": "10:00:00",
      "autoDate": "2025-03-01",
      "subreason": "N/A",
      "client": "CLIENT4"
  }
  ]);

  const [columnDefs] = useState([
    { field: 'caseNumber', headerName: 'Case Number' },
    { field: 'account', headerName: 'Account' },
    { field: 'disposition', headerName: 'Disposition' },
    { field: 'addr1', headerName: 'Address' },
    { field: 'sysPrin', headerName: 'Sys Prin' },
  ]);

  // Export PDF from rowData directly
  const handleExportPDF = () => {
    const doc = new jsPDF();
  
    // Prepare table data: insert a row + a blank spanning row after each
    const tableBody = [];
    rowData.forEach((item) => {
      tableBody.push([item.name, item.age.toString()]);
      tableBody.push([{ content: '', colSpan: 2 }]); // ⬅️ Empty row spans 2 columns
    });
  
    doc.text('Inventory Received Report', 14, 10);
    doc.autoTable({
      head: [['caseNumber', 'account', 'disposition', 'sysPrin']],
      body: tableBody,
      startY: 20,
    });
  
    doc.save('user_table.pdf');
  };
  
  return (
    <div>
      <button onClick={handleExportPDF} style={{ marginBottom: '10px' }}>
        📄 Export to PDF
      </button>

      <div className="ag-theme-quartz" style={{ height: 300, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true, sortable: true, filter: true }}
          pagination={true}
          paginationPageSize={5}
        />
      </div>
    </div>
  );
};

export default UserTableWithPDF;
