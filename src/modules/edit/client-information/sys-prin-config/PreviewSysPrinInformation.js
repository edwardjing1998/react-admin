import React, { useState, useEffect } from 'react';
import PreviewFilesReceivedFrom from './PreviewFilesReceivedFrom';
import PreviewSysPrinNotes from './PreviewSysPrinNotes';
import PreviewFilesSentTo from './PreviewFilesSentTo';
import PreviewStatusOptions from './PreviewStatusOptions';
import SysPrinEditButtonPanel from './SysPrinEditButtonPanel';
import PreviewGeneralInformation from './PreviewGeneralInformation';
import PreviewFilesSentToTabs from './PreviewFilesSentToTabs';
import PreviewReMailOptions from './PreviewReMailOptions';


const PreviewSysPrinInformation = ({ setSysPrinInformationWindow, selectedData, selectedGroupRow }) => {
  
    const getStatusValue = (options, code) => {
        const index = parseInt(code, 10); // the `10` means base-10 (decimal)
        return !isNaN(index) ? options[index] || '' : '';
      };
    

    const handleCheckboxChange = (field) => (event) => {
        const checked = event.target.checked;
       // setSelectedData((prev) => ({ ...prev, [field]: checked }));
    };

  const [isEditable, setIsEditable] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    if (newValue === 5 && typeof setSysPrinInformationWindow === 'function') {
        setSysPrinInformationWindow(true);
      }
  };
  
  const sharedSx = {
    '& .MuiInputBase-root': {
      height: '20px',           // Set total height of the input box
      fontSize: '0.75rem',
    },
    '& .MuiInputBase-input': {
      padding: '4px 4px',       // Inner padding
      height: '30px',           // Force smaller height for input
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
    '& .MuiInputBase-input.Mui-disabled': {
      color: 'black',
      WebkitTextFillColor: 'black',
    },
    '& .MuiInputLabel-root.Mui-disabled': {
      color: 'black',
    },
  };

  return (
    <>
        
        <PreviewGeneralInformation
              selectedData={selectedData}
              isEditable={isEditable}
              sharedSx={sharedSx}
              getStatusValue={getStatusValue}
            />
        
        <PreviewStatusOptions
            selectedData={selectedData}
            sharedSx={sharedSx}
            getStatusValue={getStatusValue}
          />
          {/* Row 1: Billing Sys/Prin */}
        {/* <PreviewFilesSentTo data={selectedData?.vendorSentTo || []}  /> */}
        <PreviewFilesSentToTabs data={selectedData || []}  /> 
        <PreviewReMailOptions
            selectedData={selectedData}
            sharedSx={sharedSx} />
        <PreviewSysPrinNotes data={selectedData || []} />
        <SysPrinEditButtonPanel setSysPrinInformationWindow={setSysPrinInformationWindow} />
        
    </>
  );
};

export default PreviewSysPrinInformation;