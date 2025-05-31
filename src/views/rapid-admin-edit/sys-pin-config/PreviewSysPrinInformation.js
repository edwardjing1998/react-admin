import React, { useState, useEffect } from 'react';
import { CRow, CCol, CCard, CCardBody } from '@coreui/react';
import FilesReceivedFrom from './FilesReceivedFrom';
import SysPrinNotes from './SysPrinNotes';
import FilesSentTo from './FilesSentTo';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { Box, IconButton, Tabs, Tab, Button } from '@mui/material';




const PreviewSysPrinInformation = ({ setEditClientWindow, selectedData, selectedGroupRow }) => {

    const statusOptionsA = ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"];
    const statusOptionsB = ["Destroy", "Return"];
    const statusOptionsC = ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"];
    const statusOptionsD = ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"];
    const statusOptionsE = ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"];
    const statusOptionsF = ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"];
    const statusOptionsI = ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"];
    const statusOptionsL = ["Destroy", "Return"];
    const statusOptionsO = ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"];
    const statusOptionsU = ["Destroy", "Return"];
    const statusOptionsX = ["Destroy", "Return", "Research / Destroy", "Research / Return", "Research / Carrier Ret"];
    const statusOptionsZ = ["Destroy", "Return"];

    const specialStatus = ["Destroy", "Return"];
    const pinMailerStatus = ["Destroy", "Return"];
    const destroyStatus = ["Destroy", "Return"];
    const customerTypeStatus = ["Full Processing", "Destroy All", "Return All"];
    


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
    if (newValue === 5 && typeof setEditClientWindow === 'function') {
        setEditClientWindow(true);
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
        
        <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '2px' }}>
            <CCardBody className="d-flex align-items-center" style={{ padding: '0.25rem 0.5rem', height: '100%' }} >
                <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: '500' }}>General</p>
            </CCardBody>
        </CCard>
        <CCard style={{ height: '50px', marginBottom: '4px', marginTop: '-5px' }}>
            <CCardBody
                style={{
                padding: '0.25rem 0.5rem',
                height: '100%',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                }}
            >
                {/* Row 1 */}
                <CRow style={{ height: '25px' }}>
                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Special</p>
                </CCol>
                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Pin Mailer</p>
                </CCol>
                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Destroy Status</p>
                </CCol>
                </CRow>

                {/* Row 2 */}
                <CRow style={{ height: '25px' }}>
                <CCol style={{ display: 'flex', alignItems: 'center'}}>
                    
                    <TextField
                    placeholder="xxx"
                    value={getStatusValue(specialStatus, selectedData?.special)}
                    size="small"
                    fullWidth
                    disabled={!isEditable}
                    sx={sharedSx}
                    />

                </CCol>
                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    
                <TextField
                    placeholder="xxx"
                    value={getStatusValue(pinMailerStatus, selectedData?.pinMailer)}
                    size="small"
                    fullWidth
                    disabled={!isEditable}
                    sx={sharedSx}
                    />

                </CCol>
                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    
                <TextField
                    placeholder="xxx"
                    value={getStatusValue(destroyStatus, selectedData?.destroyStatus)}
                    size="small"
                    fullWidth
                    disabled={!isEditable}
                    sx={sharedSx}
                    />

                </CCol>
                </CRow>
            </CCardBody>
            </CCard>

            <CCard style={{ height: '50px', marginBottom: '4px', marginTop: '-5px' }}>
            <CCardBody
                style={{
                padding: '0.25rem 0.5rem',
                height: '100%',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                }}
            >
                {/* Row 1 */}
                <CRow style={{ height: '25px' }}>
                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Customer Type</p>
                </CCol>
                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Return Status</p>
                </CCol>
                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    
                </CCol>
                </CRow>

                {/* Row 2 */}
                <CRow style={{ height: '25px' }}>
                <CCol style={{ display: 'flex', alignItems: 'center'}}>
                    
                    <TextField
                    placeholder="0"
                    value={getStatusValue(customerTypeStatus, selectedData?.custType)}
                    size="small"
                    fullWidth
                    disabled={!isEditable}
                    sx={sharedSx}
                    />

                </CCol>
                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    
                <TextField
                    placeholder="xxx"
                    value={selectedData?.returnStatus || ''}
                    size="small"
                    fullWidth
                    disabled={!isEditable}
                    sx={sharedSx}
                    />

                </CCol>
                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                </CCol>
                </CRow>
            </CCardBody>
            </CCard>

            <CCard style={{ marginTop: '-5px', marginBottom: '10px' }}>
            <CCardBody
                style={{
                padding: '0.8rem',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '0px'
                }}
            >
                {/* Row 1 */}
                <CRow style={{ height: '30px' }}>
                <CCol style={{  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',  paddingLeft: '4px', flex:'0 0 41%', maxWidth: '41%' }}>
                    {/* Checkboxes */}
                    <FormControlLabel
                        control={<Checkbox size="small" checked={selectedData.addrFlag === 'Y'} onChange={handleCheckboxChange('active')} disabled={!isEditable} />}
                        label="Bad Address  "
                        sx={{
                        backgroundColor: 'white',
                        pl: 1,
                        m: 0,
                        '& .MuiFormControlLabel-label': { fontSize: '0.78rem', color: 'black' },
                        '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
                        paddingLeft: '0px', // 👈 reduce left padding of the checkbox
                        paddingRight: '0px', // 👈 reduce left padding of the checkbox

                        }}
                    />
                </CCol>
                <CCol style={{  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',  paddingLeft: '4px', flex:'0 0 59%', maxWidth: '59%' }}>
                    {/* Checkboxes */} 

                    <FormControlLabel
                        control={<Checkbox size="small" checked={selectedData.astatRch === '1'} onChange={handleCheckboxChange('active')} disabled={!isEditable} />}
                        label="Account Research"
                        sx={{
                        backgroundColor: 'white',
                        pl: 1,
                        m: 0,
                        paddingLeft: '2px', // 👈 reduce left padding of the checkbox
                        paddingRight: '0px', // 👈 reduce left padding of the checkbox
                        '& .MuiFormControlLabel-label': { fontSize: '0.78rem', color: 'black' },
                        '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
                        }}
                    />
                </CCol>
                </CRow>

                {/* Row 2 */}
                <CRow style={{ height: '30px' }}>
                <CCol style={{  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',  paddingLeft: '4px', flex:'0 0 42%', maxWidth: '42%' }}>
                    {/* Checkboxes */}
                    <FormControlLabel
                        control={<Checkbox size="small" checked={selectedData.active} onChange={handleCheckboxChange('active')} disabled={!isEditable} />}
                        label="Active"
                        sx={{
                        backgroundColor: 'white',
                        pl: 1,
                        m: 0,
                        paddingLeft: '0px', // 👈 reduce left padding of the checkbox
                        paddingRight: '0px', // 👈 reduce left padding of the checkbox
                        '& .MuiFormControlLabel-label': { fontSize: '0.78rem', color: 'black' },
                        '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
                        }}
                    />
                </CCol>
                <CCol style={{  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',  paddingLeft: '4px', flex:'0 0 58%', maxWidth: '58%' }}>
                    <FormControlLabel
                        control={<Checkbox size="small" checked={selectedData.nm13 === '1'} disabled={!isEditable} />}
                        label="Non-Mon 13 on Destroy"
                        sx={{
                        backgroundColor: 'white',
                        pl: 1,
                        m: 0,
                        paddingLeft: '0px', // 👈 reduce left padding of the checkbox
                        paddingRight: '0px', // 👈 reduce left padding of the checkbox
                        '& .MuiFormControlLabel-label': { fontSize: '0.78rem', color: 'black' },
                        '& .Mui-disabled + .MuiFormControlLabel-label': { color: 'black' },
                        }}
                    />
                </CCol>
                </CRow>
            </CCardBody>
            </CCard>

            <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
                className="d-flex align-items-center"
                style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
                <span style={{ fontSize: '0.85rem' }}>Status Options</span>
            </CCardBody>
            </CCard>
    
            <CCard style={{ height: '50px', marginBottom: '0px', marginTop: '15px' }}>
                      <CCardBody
                        style={{
                          padding: '0.25rem 0.5rem',
                          height: '100%',
                          backgroundColor: 'white',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        {/* Row 1 */}
                        <CRow style={{ height: '25px' }}>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                                width: '15px',
                                height: '15px',
                                backgroundColor: 'red',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '3px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.78rem',
                                marginRight: '5px'
                              }}>
                                A
                              </div>
                            <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                                width: '15px',
                                height: '15px',
                                backgroundColor: 'brown',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '3px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.78rem',
                                marginRight: '5px'
                              }}>
                                B
                              </div>
                            <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                                width: '15px',
                                height: '15px',
                                backgroundColor: 'green',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '3px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.78rem',
                                marginRight: '5px'
                              }}>
                                C
                              </div>
                            <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                                width: '15px',
                                height: '15px',
                                backgroundColor: 'black',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '3px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.78rem',
                                marginRight: '5px'
                              }}>
                                E
                              </div>
                            <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                          </CCol>
                        </CRow>

                        {/* Row 2 */}
                        <CRow style={{ height: '25px' }}>
                          <CCol style={{ display: 'flex', alignItems: 'center'}}>
                            
                            <TextField
                              placeholder="0"
                              value={getStatusValue(statusOptionsA, selectedData?.statA)}
                              size="small"
                              fullWidth
                              disabled={!isEditable}
                              sx={sharedSx}
                            />

                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                            
                          <TextField
                              placeholder="xxx"
                              value={getStatusValue(statusOptionsB, selectedData?.statB)}
                              size="small"
                              fullWidth
                              disabled={!isEditable}
                              sx={sharedSx}
                            />

                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                            
                          <TextField
                              placeholder="xxx"
                              value={getStatusValue(statusOptionsC, selectedData?.statC)}
                              size="small"
                              fullWidth
                              disabled={!isEditable}
                              sx={sharedSx}
                            />

                          </CCol>
                          <CCol style={{ display: 'flex', alignItems: 'center' }}>
                            
                          <TextField
                              placeholder="xxx"
                              value={getStatusValue(statusOptionsE, selectedData?.statE)}
                              size="small"
                              fullWidth
                              disabled={!isEditable}
                              sx={sharedSx}
                            />

                          </CCol>
                        </CRow>
                      </CCardBody>
            </CCard>

            <CCard style={{ height: '50px', marginBottom: '0px', marginTop: '0px' }}>
                <CCardBody
                style={{
                    padding: '0.25rem 0.5rem',
                    height: '100%',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                >
                {/* Row 1 */}
                <CRow style={{ height: '25px' }}>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: 'blue',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        marginRight: '5px'
                        }}>
                        F
                        </div>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#f110ee',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        marginRight: '5px'
                        }}>
                        I
                        </div>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                            width: '15px',
                            height: '15px',
                            backgroundColor: '#f17610',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.78rem',
                            marginRight: '5px'
                        }}>
                            L
                        </div>
                        <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                        </CCol>
                        <CCol style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            width: '15px',
                            height: '15px',
                            backgroundColor: '#10e7f1',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.78rem',
                            marginRight: '5px'
                            }}>
                            U
                        </div>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                    </CCol>
                </CRow>

                {/* Row 2 */}
                <CRow style={{ height: '25px' }}>
                    <CCol style={{ display: 'flex', alignItems: 'center'}}>
                    
                    <TextField
                        placeholder="0"
                        value={getStatusValue(statusOptionsF, selectedData?.statF)}
                        size="small"
                        fullWidth
                        disabled={!isEditable}
                        sx={sharedSx}
                    />

                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <TextField
                        placeholder="xxx"
                        value={getStatusValue(statusOptionsI, selectedData?.statI)}
                        size="small"
                        fullWidth
                        disabled={!isEditable}
                        sx={sharedSx}
                    />

                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <TextField
                        placeholder="xxx"
                        value={getStatusValue(statusOptionsL, selectedData?.statL)}
                        size="small"
                        fullWidth
                        disabled={!isEditable}
                        sx={sharedSx}
                    />

                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <TextField
                        placeholder="xxx"
                        value={getStatusValue(statusOptionsU, selectedData?.statU)}
                        size="small"
                        fullWidth
                        disabled={!isEditable}
                        sx={sharedSx}
                    />

                    </CCol>
                </CRow>
                </CCardBody>
            </CCard>
                                                    
            <CCard style={{ height: '50px', marginBottom: '0px', marginTop: '0px' }}>
                <CCardBody
                style={{
                    padding: '0.25rem 0.5rem',
                    height: '100%',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                >
                {/* Row 1 */}
                <CRow style={{ height: '25px' }}>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#8410f1',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        marginRight: '5px'
                        }}>
                        D
                        </div>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: 'blue',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        marginRight: '5px'
                        }}>
                        O
                        </div>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#65167c',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        marginRight: '5px'
                        }}>
                        X
                        </div>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#c07bc4',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        marginRight: '5px'
                        }}>
                        Z
                        </div>
                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Status</p>
                    </CCol>
                </CRow>

                {/* Row 2 */}
                <CRow style={{ height: '25px' }}>
                    <CCol style={{ display: 'flex', alignItems: 'center'}}>
                    
                    <TextField
                        placeholder="0"
                        value={getStatusValue(statusOptionsD, selectedData?.statD)}
                        size="small"
                        fullWidth
                        disabled={!isEditable}
                        sx={sharedSx}
                    />

                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <TextField
                        placeholder="xxx"
                        value={getStatusValue(statusOptionsO, selectedData?.statO)}
                        size="small"
                        fullWidth
                        disabled={!isEditable}
                        sx={sharedSx}
                    />

                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <TextField
                        placeholder="xxx"
                        value={getStatusValue(statusOptionsX, selectedData?.statX)}
                        size="small"
                        fullWidth
                        disabled={!isEditable}
                        sx={sharedSx}
                    />

                    </CCol>
                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <TextField
                        placeholder="xxx"
                        value={getStatusValue(statusOptionsZ, selectedData?.statZ)}
                        size="small"
                        fullWidth
                        disabled={!isEditable}
                        sx={sharedSx}
                    />

                    </CCol>
                </CRow>
                </CCardBody>
            </CCard>
        
            <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '15px' }}>
                <CCardBody
                className="d-flex align-items-center"
                style={{ padding: '0.25rem 0.5rem', height: '100%' }}
                >
                <span style={{ fontSize: '0.85rem' }}>File Sent To</span>
                </CCardBody>
            </CCard>

            <CCard style={{ height: '150px', marginBottom: '4px', marginTop: '15px' }}>
                <CCardBody
                className="d-flex align-items-center"
                style={{ padding: '0.25rem 0.5rem', height: '100%' }}
                >
                <div style={{ width: '100%', height: '100%' }}>
                    <FilesSentTo data={selectedData?.vendorSentTo || []}  />
                </div>
                </CCardBody>
            </CCard>
        
        <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
            className="d-flex align-items-center"
            style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
            <span style={{ fontSize: '0.85rem' }}>File Received From</span>
            </CCardBody>
        </CCard>

        <CCard style={{ height: '150px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
            className="d-flex align-items-center"
            style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
            <div style={{ width: '100%', height: '100%' }}>
                <FilesReceivedFrom data={selectedGroupRow?.reportOptions || []} />
            </div>
            </CCardBody>
        </CCard>

        <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '15px' }}>
            <CCardBody
            className="d-flex align-items-center"
            style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
            <span style={{ fontSize: '0.85rem' }}>Sys/Prin Notes</span>
            </CCardBody>
        </CCard>

        <CCard style={{ height: '150px', marginBottom: '4px', marginTop: '12px', border: '0px solid gray' }}>
            <CCardBody
            className="d-flex align-items-center"
            style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
            <div style={{ width: '100%', height: '100%' }}>
                <SysPrinNotes data={selectedData || []} />
            </div>
            </CCardBody>
        </CCard>

        <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '25px' }}>
            <CCardBody
            className="d-flex align-items-center"
            style={{ padding: '0.25rem 0.5rem', height: '100%' }}
            >
                
                         <div>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ fontSize: '0.78rem', marginRight: '6px', textTransform: 'none' }}
                            >
                              Change All
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => setEditClientWindow(true)}
                              size="small"
                              sx={{ fontSize: '0.78rem', textTransform: 'none', marginRight: '6px' }}
                            >
                              Edit SysPrin
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ fontSize: '0.78rem', marginRight: '6px', textTransform: 'none' }}
                            >
                              New
                            </Button>
                          </div>


            </CCardBody>
       </CCard>


    </>
  );
};

export default PreviewSysPrinInformation;