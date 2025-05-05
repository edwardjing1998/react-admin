// File: exportUtils.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { InventoryReceivedData } from './data.js';

export const exportToPdf = ({
  filteredData,
  headers,
  fileName,
}) => {
  const doc = new jsPDF();

  const tableData = filteredData.map(item => [
    item.client || '',
    item.caseNumber || '',
    item.account || '',
    item.disposition || '',
    item.sysPrin || '',
  ]);

  doc.text('Inventory Received Report', 14, 10);
  doc.autoTable({
    head: [headers],
    body: tableData,
    startY: 18,
  });

  doc.save(fileName);
};

