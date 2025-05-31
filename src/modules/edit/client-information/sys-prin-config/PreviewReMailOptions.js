// PreviewStatusOptions.js
import React, { useState, useEffect } from 'react';

import { CCard, CCardBody, CRow, CCol } from '@coreui/react';
import TextField from '@mui/material/TextField';
import { CButton } from '@coreui/react';

import {
  unableToDeliver,
  forwardingAddress,
  nonUs,
  invalidState,
  isPOBox,
} from '../utils/FieldValueMapping';

const PreviewReMailOptions = ({ selectedData, sharedSx }) => {

    const [isEditable, setIsEditable] = useState(false);

    const getStatusValue = (options, code) => {
      if (!code) return ''
      // find the object whose .code === code
      const match = options.find((opt) => opt.code === code)
      return match ? match.label : ''
    }
    
  return (
    <>

      <CCard style={{ height: '35px', marginBottom: '4px', marginTop: '15px' }}>
        <CCardBody
          className="d-flex align-items-center"
          style={{ padding: '0.25rem 0.5rem', height: '100%' }}
        >
          <span style={{ fontSize: '0.85rem' }}>ReMail Options</span>
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
                                  <CCol style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Hold Days</p>
                                  </CCol>
                                  <CCol style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Temp Aways</p>
                                  </CCol>
                                  <CCol style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Attempts</p>
                                  </CCol>
                              </CRow>
   
                              {/* Row 2 */}
                              <CRow style={{ height: '25px' }}>
                                <CCol style={{ display: 'flex', alignItems: 'center'}}>
                                  
                                  <TextField
                                    placeholder="0"
                                    value={selectedData?.holdDays}
                                    size="small"
                                    fullWidth
                                    disabled={!isEditable}
                                    sx={sharedSx}
                                  />
      
                                </CCol>
                                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                                  
                                <TextField
                                    placeholder="xxx"
                                    value={selectedData?.tempAway}
                                    size="small"
                                    fullWidth
                                    disabled={!isEditable}
                                    sx={sharedSx}
                                  />
      
                                </CCol>
                                <CCol style={{ display: 'flex', alignItems: 'center' }}>
                                  
                                <TextField
                                    placeholder="xxx"
                                    value={selectedData?.tempAwayAtts}
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
                                  <CCol style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Unable Deliver</p>
                                  </CCol>
                                  <CCol style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '0.78rem' }}>FWD Address</p>
                                  </CCol>
                                  <CCol style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '0.78rem' }}>Non-US</p>
                                  </CCol>
                              </CRow>
                  
                                  {/* Row 2 */}
                                  <CRow style={{ height: '25px' }}>
                                      <CCol style={{ display: 'flex', alignItems: 'center'}}>
                                      
                                      <TextField
                                          placeholder="0"
                                          value={getStatusValue(unableToDeliver, selectedData?.undeliverable)}
                                          size="small"
                                          fullWidth
                                          disabled={!isEditable}
                                          sx={sharedSx}
                                      />
                  
                                      </CCol>
                                      <CCol style={{ display: 'flex', alignItems: 'center' }}>
                                      
                                      <TextField
                                          placeholder="xxx"
                                          value={getStatusValue(forwardingAddress, selectedData?.forwardingAddress)}
                                          size="small"
                                          fullWidth
                                          disabled={!isEditable}
                                          sx={sharedSx}
                                      />
                  
                                      </CCol>
                                      <CCol style={{ display: 'flex', alignItems: 'center' }}>
                                      
                                      <TextField
                                          placeholder="xxx"
                                          value={getStatusValue(nonUs, selectedData?.nonUS)}
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
                                <CRow style={{ height: '25px' }}>
                                    <CCol style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                      <p style={{ margin: 0, fontSize: '0.78rem' }}>P.O. Box</p>
                                    </CCol>
                                    <CCol style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                      <p style={{ margin: 0, fontSize: '0.78rem' }}>Invalid State</p>
                                    </CCol>
                                     {/* -------- Empty -------- */}
                                    <CCol style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    </CCol>
                                </CRow>

                                {/* Row 2 */}
                                <CRow style={{ height: '25px' }}>
                                    <CCol style={{ display: 'flex', alignItems: 'center'}}>
                                    
                                    <TextField
                                        placeholder="0"
                                        value={getStatusValue(isPOBox, selectedData?.poBox)}
                                        size="small"
                                        fullWidth
                                        disabled={!isEditable}
                                        sx={sharedSx}
                                    />

                                    </CCol>
                                    <CCol style={{ display: 'flex', alignItems: 'center' }}>
                                    
                                    <TextField
                                        placeholder="xxx"
                                        value={getStatusValue(invalidState, selectedData?.badState)}
                                        size="small"
                                        fullWidth
                                        disabled={!isEditable}
                                        sx={sharedSx}
                                    />

                                    </CCol>
                                    <CCol style={{ display: 'flex', alignItems: 'center' }}>                                 
                                    <CButton
                                          size="sm"
                                          style={{
                                            backgroundColor: '#d1f3f2',
                                            color: '#000',          // choose a contrasting text color
                                            fontSize: '0.75rem',
                                            padding: '0px 8px',
                                            minWidth: 'unset',
                                            textAlign: 'left',
                                            width: '92px',
                                          }}
                                          onClick={() => {
                                            console.log('Do not Deliver clicked');
                                          }}
                                        >
                                          Not Deliver...
                                        </CButton>
                                    </CCol>
                                </CRow>
                                </CCardBody>
                            </CCard>
    
    </>
  );
};

export default PreviewReMailOptions;
