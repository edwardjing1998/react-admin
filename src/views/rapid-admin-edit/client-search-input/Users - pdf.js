// File: UserTableWithPDF.js
import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Register AG Grid module
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const UserTableWithPDF = () => {
  const [clientsData] = useState(() => {
    const client1Data = [];
    const client2Data = [];

    for (let j = 0; j < 30; j++) {
      const createRecord = (client, index) => ({
        caseNumber: `C00001_R${index}`,
        account: `A${100 + index + 1}`,
        lastName: `Last_${index}`,
        firstName: `First_${index}`,
        addr1: `Addr1-${index}`,
        addr2: `Addr2-${index}`,
        city: 'CityX',
        state: 'NY',
        zip: '10001',
        homePhone: `212-555-${String(index).padStart(4, '0')}`,
        workPhone: `646-555-${String(index).padStart(4, '0')}`,
        status: 'Closed',
        numCards: (index % 3) + 1,
        nextDate: '2025-04-01',
        noRenewal: index % 2 === 0,
        reason: 'Auto-generated',
        disposition: ['D', 'R', 'B', 'S', 'H'][index % 5],
        inDate: `2025-03-${String(index + 1).padStart(2, '0')}`,
        deliveryId: 'D001',
        sysPrin: `SP_${index}`,
        outDate: '2025-03-10',
        cycle: index % 2 === 0 ? 'Weekly' : 'Monthly',
        active: index % 2 === 0,
        inHour: '10:00:00',
        autoDate: '2025-03-01',
        subreason: 'N/A',
        client,
      });

      client1Data.push(createRecord('CLIENT1', j));
      client2Data.push(createRecord('CLIENT2', j));
    }

    return [...client1Data, ...client2Data];
  });

  const rowData = useMemo(() => clientsData, [clientsData]);

  const columnDefs = useMemo(() => [
    { headerName: 'Client', field: 'client', rowGroup: true, hide: true },
    { field: 'caseNumber', headerName: 'Case Number' },
    { field: 'account', headerName: 'Account' },
    { field: 'disposition', headerName: 'Disposition' },
    { field: 'addr1', headerName: 'Address' },
    { field: 'sysPrin', headerName: 'Sys Prin' }
  ], []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    flex: 1
  }), []);

  const autoGroupColumnDef = useMemo(() => ({
    headerName: 'Grouped by Client',
    field: 'client',
    cellRendererParams: {
      suppressCount: false
    }
  }), []);

  const handleExportPDF = () => {
    const doc = new jsPDF();

    const tableBody = rowData.map((item) => [
      item.client,
      item.caseNumber,
      item.account,
      item.disposition,
      item.sysPrin
    ]);

    doc.text('Inventory Received Report', 14, 10);
    doc.autoTable({
      head: [['Client', 'Case Number', 'Account', 'Disposition', 'Sys Prin']],
      body: tableBody,
      startY: 20
    });

    doc.save('user_table.pdf');
  };

  return (
    <div>
      <button onClick={handleExportPDF} style={{ marginBottom: '10px' }}>
        📄 Export to PDF
      </button>

      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType="singleColumn"
          groupDefaultExpanded={1}
          pagination={true}
          paginationPageSize={5}
        />
      </div>
    </div>
  );
};

export default UserTableWithPDF;
