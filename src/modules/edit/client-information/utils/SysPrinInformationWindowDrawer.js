import React from 'react';
import Drawer from '@mui/material/Drawer';
import SysPrinInformationWindow from './SysPrinInformationWindow';

const drawerWidth = '35vw';

export default function SysPrinInformationWindowDrawer({
  open,
  mode = 'edit',
  onClose,
  selectedData,
  setSelectedData,
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: drawerWidth, p: 2 } }}
    >
      <SysPrinInformationWindow
        mode={mode}
        onClose={onClose}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </Drawer>
  );
}
