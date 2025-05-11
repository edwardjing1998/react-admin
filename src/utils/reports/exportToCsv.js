export const exportToCsv = ({ data, headers, fields, fileName }) => {
    const csvContent = [
      headers.join(','), // header row
      ...data.map(row => fields.map(f => `"${row[f] ?? ''}"`).join(','))
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  