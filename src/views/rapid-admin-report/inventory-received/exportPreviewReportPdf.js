// File: exportPreviewReportPdf.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DISPOSITION_TYPES = ['Destroyed', 'Returned', 'Special Destroy', 'Research', 'Hold'];

export const exportPreviewReportPdf = ({ groupedMap, clients, fromDate, toDate }) => {
  const doc = new jsPDF();
  let yPos = 10;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? '' : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  Object.entries(groupedMap).forEach(([client, sysPrinMap]) => {
    const clientDetails = clients.find((c) => c.client === client);
    const clientInfo = clientDetails
      ? `Client ${clientDetails.client} - ${clientDetails.name}, ${clientDetails.addr}, ${clientDetails.city}, ${clientDetails.state} ${clientDetails.zip}`
      : `Client ${client}`;

    doc.text(`Reporting Range From ${formatDate(fromDate)} to ${formatDate(toDate)}`, 10, yPos);
    yPos += 8;
    doc.text(clientInfo, 10, yPos);
    yPos += 6;

    Object.entries(sysPrinMap).forEach(([sysPrin, dispositionMap]) => {
      doc.text(`SysPrin: ${sysPrin}`, 12, yPos);
      yPos += 6;

      const rows = DISPOSITION_TYPES.map((type) => {
        const { count = 0, totalCards = 0 } = dispositionMap[type] || {};
        return [type, count, totalCards];
      });

      doc.autoTable({
        startY: yPos,
        head: [['Disposition', 'Count', 'Cards']],
        body: rows,
        margin: { left: 12 },
        styles: { fontSize: 9 },
      });

      yPos = doc.lastAutoTable.finalY + 10;
    });

    yPos += 8;
  });

  doc.save('preview_report.pdf');
};
