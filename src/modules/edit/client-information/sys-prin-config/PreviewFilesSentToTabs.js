import { Button, Typography, Tabs, Tab, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PreviewFilesReceivedFrom from './PreviewFilesReceivedFrom';
import PreviewFilesSentTo from './PreviewFilesSentTo';


const PAGE_SIZE = 3;
const COLUMNS = 4;

const PreviewFilesSentToTabs = ({ data }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Box sx={{ width: '100%' }}>
      <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} centered>
          <Tab
            label="File Sent To"
            sx={{ textTransform: 'none', fontSize: '0.78rem' }}
          />
          <Tab
            label="File Received From"
            sx={{ textTransform: 'none', fontSize: '0.78rem' }}
          />
      </Tabs>

        <Box hidden={tabIndex !== 0} sx={{ padding: '0px' }}>
             <PreviewFilesSentTo data={data?.vendorSentTo || []} />
        </Box>

        <Box hidden={tabIndex !== 1} sx={{ padding: '0px' }}>
             <PreviewFilesReceivedFrom data={data?.vendorReceivedFrom || []} />
        </Box>
      </Box>
    </>
  );
};

export default PreviewFilesSentToTabs;
