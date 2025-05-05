import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions, cilCheckCircle, cilXCircle } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
      <div className="d-flex gap-3">
          <CWidgetStatsA
              className="mb-4"
              color="success"
              value="1,325"
              title="Successful Messages"
              icon={<CIcon icon={cilCheckCircle} height={36} />}
              chart={
                <svg className="chart" width="100%" height="40">
                  <rect width="100%" height="40" fill="#2eb85c" />
                </svg>
              }
            />

            <CWidgetStatsA
              className="mb-4"
              color="danger"
              value="78"
              title="Failed Messages"
              icon={<CIcon icon={cilXCircle} height={36} />}
              chart={
                <svg className="chart" width="100%" height="40">
                  <rect width="100%" height="40" fill="#e55353" />
                </svg>
              }
            />
     </div>

      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
            <div className="d-flex gap-3">
                <CWidgetStatsA
                    className="mb-4"
                    color="success"
                    value="1,325"
                    title="Successful Messages"
                    icon={<CIcon icon={cilCheckCircle} height={36} />}
                    chart={
                      <svg className="chart" width="100%" height="40">
                        <rect width="100%" height="40" fill="#2eb85c" />
                      </svg>
                    }
                  />

                  <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value="78"
                    title="Failed Messages"
                    icon={<CIcon icon={cilXCircle} height={36} />}
                    chart={
                      <svg className="chart" width="100%" height="40">
                        <rect width="100%" height="40" fill="#e55353" />
                      </svg>
                    }
                  />
          </div>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
           <div className="d-flex gap-3">
                <CWidgetStatsA
                    className="mb-4"
                    color="success"
                    value="1,325"
                    title="Successful Messages"
                    icon={<CIcon icon={cilCheckCircle} height={36} />}
                    chart={
                      <svg className="chart" width="100%" height="40">
                        <rect width="100%" height="40" fill="#2eb85c" />
                      </svg>
                    }
                  />

                  <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value="78"
                    title="Failed Messages"
                    icon={<CIcon icon={cilXCircle} height={36} />}
                    chart={
                      <svg className="chart" width="100%" height="40">
                        <rect width="100%" height="40" fill="#e55353" />
                      </svg>
                    }
                  />
          </div>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
      <div className="d-flex gap-3">
                <CWidgetStatsA
                    className="mb-4"
                    color="success"
                    value="1,325"
                    title="Successful Messages"
                    icon={<CIcon icon={cilCheckCircle} height={36} />}
                    chart={
                      <svg className="chart" width="100%" height="40">
                        <rect width="100%" height="40" fill="#2eb85c" />
                      </svg>
                    }
                  />

                  <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value="78"
                    title="Failed Messages"
                    icon={<CIcon icon={cilXCircle} height={36} />}
                    chart={
                      <svg className="chart" width="100%" height="40">
                        <rect width="100%" height="40" fill="#e55353" />
                      </svg>
                    }
                  />
          </div>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
      <div className="d-flex gap-3">
                <CWidgetStatsA
                    className="mb-4"
                    color="success"
                    value="1,325"
                    title="Successful Messages"
                    icon={<CIcon icon={cilCheckCircle} height={36} />}
                    chart={
                      <svg className="chart" width="100%" height="40">
                        <rect width="100%" height="40" fill="#2eb85c" />
                      </svg>
                    }
                  />

                  <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value="78"
                    title="Failed Messages"
                    icon={<CIcon icon={cilXCircle} height={36} />}
                    chart={
                      <svg className="chart" width="100%" height="40">
                        <rect width="100%" height="40" fill="#e55353" />
                      </svg>
                    }
                  />
          </div>
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
