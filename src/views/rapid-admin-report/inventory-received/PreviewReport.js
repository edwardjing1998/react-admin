// File: PreviewReport.js
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const DISPOSITION_MAP = {
  D: 'Destroyed',
  B: 'Returned',
  S: 'Special Destroy',
  R: 'Research',
  H: 'Hold',
};

const reportMetadataList = []; // 🆕 Collects metadata per client

const DISPOSITION_TYPES = Object.values(DISPOSITION_MAP);

const PreviewReport = ({ rawData = [], fromDate = '', toDate = '' }) => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4444/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error('Failed to fetch clients:', err));
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return '';
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
      .getDate()
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const nbsp = '\u00A0';
  const reportRangeText = `Reporting Range From${nbsp.repeat(10)}${formatDate(fromDate)}${nbsp.repeat(10)}to${nbsp.repeat(10)}${formatDate(toDate)}`;

  const clientAccountCount = {};
  rawData.forEach(({ client, account }) => {
    if (!clientAccountCount[client]) clientAccountCount[client] = new Set();
    clientAccountCount[client].add(account);
  });

  const groupedMap = {};
  rawData.forEach(({ client, sysPrin, disposition, numCards = 0 }) => {
    const fullDisposition = DISPOSITION_MAP[disposition] || disposition;
    if (!groupedMap[client]) groupedMap[client] = {};
    if (!groupedMap[client][sysPrin]) groupedMap[client][sysPrin] = {};
    if (!groupedMap[client][sysPrin][fullDisposition]) {
      groupedMap[client][sysPrin][fullDisposition] = { count: 0, totalCards: 0 };
    }
    groupedMap[client][sysPrin][fullDisposition].count += 1;
    groupedMap[client][sysPrin][fullDisposition].totalCards += numCards;
  });

  useEffect(() => {
    const autoExpand = {};
    Object.entries(groupedMap).forEach(([client, sysPrinMap]) => {
      const clientDetails = clients.find(c => c.client.toUpperCase() === client.toUpperCase());
      if (!clientDetails) return;
      autoExpand[client] = true;
      Object.keys(sysPrinMap).forEach((sysPrin) => {
        autoExpand[`${client}_${sysPrin}`] = true;
      });
    });
    setExpandedGroups(autoExpand);
  }, [rawData, clients]);

  const groupedRows = [];

  Object.entries(groupedMap).forEach(([client, sysPrinMap]) => {
    const clientDetails = clients.find(c => c.client.toUpperCase() === client.toUpperCase());
    if (!clientDetails) return;

    const accountCount = clientAccountCount[client]?.size || 0;
    const clientLabel = `${client} (${accountCount} account${accountCount > 1 ? 's' : ''})`;

    reportMetadataList.push({
      client,
      reportRangeText,
      accountCount,
    });

    const clientName = `Client ${clientDetails.client}\u00A0\u00A0\u00A0\u00A0${clientDetails.name}\u00A0\u00A0\u00A0\u00A0${clientDetails.addr}\u00A0\u00A0${clientDetails.city}\u00A0\u00A0${clientDetails.state}\u00A0\u00A0${clientDetails.zip}`;

    groupedRows.push({ isReportHeader: true, reportText: reportRangeText, client });
    groupedRows.push({ isClientLabelRow: true, clientNameLabel: clientName });
    groupedRows.push({ isClientGroup: true, client, label: clientLabel });

    if (expandedGroups[client]) {
      Object.entries(sysPrinMap).forEach(([sysPrin, dispositionMap]) => {
        groupedRows.push({ isSysPrinGroup: true, client, sysPrin });

        if (expandedGroups[`${client}_${sysPrin}`]) {
          DISPOSITION_TYPES.forEach((type) => {
            const { count = 0, totalCards = 0 } = dispositionMap[type] || {};
            groupedRows.push({
              isClientGroup: false,
              isSysPrinGroup: false,
              disposition: `${type}: ${count}`,
              cards: totalCards,
              client: '',
              sysPrin: '',
            });
          });
        }
      });
    }
  });

  const columnDefs = [
    {
      field: 'group',
      headerName: 'Client',
      colSpan: (params) =>
        params.data?.isReportHeader || params.data?.isClientLabelRow ? 3 : 1,
      cellRenderer: (params) => {
        const data = params.data;
        if (data?.isReportHeader) {
          return <span style={{ fontSize: '1rem', color: '#444' }}>{data.reportText}</span>;
        }
        if (data?.isClientLabelRow) {
          return <span style={{ paddingLeft: 16, color: '#005' }}>{data.clientNameLabel}</span>;
        }
        if (data?.isClientGroup) {
          return <span>{`▼ ${data.label}`}</span>;
        }
        if (data?.isSysPrinGroup) {
          return <span style={{ paddingLeft: 32 }}>{`▼ SysPrin: ${data.sysPrin}`}</span>;
        }
        return '';
      },
    },
    {
      field: 'disposition',
      headerName: 'Disposition',
      valueGetter: (params) =>
        params.data?.isClientGroup || params.data?.isClientLabelRow || params.data?.isSysPrinGroup || params.data?.isReportHeader
          ? ''
          : params.data.disposition,
    },
    {
      field: 'cards',
      headerName: 'Cards',
      valueGetter: (params) =>
        params.data?.isClientGroup || params.data?.isClientLabelRow || params.data?.isSysPrinGroup || params.data?.isReportHeader
          ? ''
          : params.data.cards,
    },
  ];

  const rowClassRules = {
    'report-header-row': (params) => params.data?.isReportHeader,
    'client-name-label-row': (params) => params.data?.isClientLabelRow,
    'client-group-row': (params) => params.data?.isClientGroup,
    'sysprin-group-row': (params) => params.data?.isSysPrinGroup,
  };

  const onCellClicked = () => {
    // Disable collapsing by leaving this function empty
  };

  return (
    <div className="ag-grid-container ag-theme-quartz" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={groupedRows}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, resizable: true, minWidth: 120 }}
        rowClassRules={rowClassRules}
        pagination={true}
        paginationPageSize={9}
        onCellClicked={onCellClicked}
      />
    </div>
  );
};

export default PreviewReport;
