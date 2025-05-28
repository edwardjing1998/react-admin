// PreviewStatusOptions.js
import React, { useState, useEffect } from 'react';

import { CCard, CCardBody, CRow, CCol } from '@coreui/react';
import TextField from '@mui/material/TextField';

const PreviewStatusOptions = ({ selectedData, sharedSx, getStatusValue }) => {


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

      const [isEditable, setIsEditable] = useState(false);
    

  return (
    <>

     
     
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
    
    </>
  );
};

export default PreviewStatusOptions;
