import React from 'react';
import Drawer from '@mui/material/Drawer';
import ClientInformationWindow from './ClientInformationWindow';

const drawerWidth = '35vw';

export default function ClientInformationWindowDrawer({
  open,
  mode = 'edit',
  onClose,
  selectedGroupRow,
  setSelectedGroupRow,
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: drawerWidth, p: 2 } }}
    >
      <ClientInformationWindow
        mode={mode}
        onClose={onClose}
        selectedGroupRow={selectedGroupRow}
        setSelectedGroupRow={setSelectedGroupRow}
      />
    </Drawer>
  );
}
