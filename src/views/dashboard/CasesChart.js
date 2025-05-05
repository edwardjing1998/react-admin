import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { CCard, CCardBody, CCardHeader, CCol, CProgress, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const CasesChart = () => {
  const chartRef1 = useRef(null)
  const chartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      setTimeout(() => {
        [chartRef1, chartRef2].forEach((ref) => {
          if (ref.current) {
            ref.current.options.scales.x.grid.borderColor = getStyle('--cui-border-color-translucent')
            ref.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
            ref.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
            ref.current.options.scales.y.grid.borderColor = getStyle('--cui-border-color-translucent')
            ref.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
            ref.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
            ref.current.update()
          }
        })
      })
    })
  }, [])

  const random = () => Math.round(Math.random() * 100)

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September']

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
          drawOnChartArea: false,
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
      },
      y: {
        beginAtZero: true,
        border: {
          color: getStyle('--cui-border-color-translucent'),
        },
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        max: 250,
        ticks: {
          color: getStyle('--cui-body-color'),
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
  }

  const progressExampleLeft = [
    { title: 'Accounts', value: '8,214', percent: 65, color: 'info' },
    { title: 'Cases', value: '5,431', percent: 45, color: 'success' },
    { title: 'Sys/Prin', value: '3,912', percent: 35, color: 'primary' },
  ]

  const progressExampleRight = [
    { title: 'Active Cases', value: '4,100', percent: 75, color: 'warning' },
    { title: 'Disabled Cases', value: '1,331', percent: 25, color: 'danger' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Monday', value1: 80, value2: 1000 },
    { title: 'Tuesday', value1: 70, value2: 1100 },
    { title: 'Wednesday', value1: 500, value2: 2000 },
    { title: 'Thursday', value1: 250, value2: 2100 },
    { title: 'Friday', value1: 300, value2: 2500 },
    { title: 'Saturday', value1: 400, value2: 3000 },
    { title: 'Sunday', value1: 600, value2: 3500 },
  ]

  const globalMax = Math.max(...progressGroupExample2.flatMap(item => [item.value1, item.value2]))

  return (
    <>
      <CRow>
        <CCol md={6}>
          <CCard>
            <CCardHeader>Accounts and Cases</CCardHeader>
            <CCardBody>
              <CChartLine
                ref={chartRef1}
                style={{ height: '300px' }}
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: 'Accounts',
                      backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
                      borderColor: getStyle('--cui-info'),
                      pointHoverBackgroundColor: getStyle('--cui-info'),
                      borderWidth: 2,
                      data: Array(9).fill().map(() => random()),
                      fill: true,
                    },
                    {
                      label: 'Cases',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-danger'),
                      pointHoverBackgroundColor: getStyle('--cui-danger'),
                      borderWidth: 2,
                      data: Array(9).fill().map(() => random()),
                    },
                    {
                      label: 'Sys/Prin',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-primary'),
                      pointHoverBackgroundColor: getStyle('--cui-primary'),
                      borderWidth: 2,
                      borderDash: [3, 3],
                      data: Array(9).fill().map(() => random()),
                    },
                  ],
                }}
                options={chartOptions}
              />
              <CRow className="mt-4 text-center">
                {progressExampleLeft.map((item, index) => (
                  <CCol key={index}>
                    <div className="text-body-secondary">{item.title}</div>
                    <div className="fw-semibold text-truncate">{item.value}</div>
                    <CProgress thin className="mt-2" color={item.color} value={item.percent} />
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard>
            <CCardHeader>Case Status</CCardHeader>
            <CCardBody>
              <CChartLine
                ref={chartRef2}
                style={{ height: '300px' }}
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: 'Case Active',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-success'),
                      pointHoverBackgroundColor: getStyle('--cui-success'),
                      borderWidth: 2,
                      data: Array(9).fill().map(() => random()),
                    },
                    {
                      label: 'Case Disable',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-warning'),
                      pointHoverBackgroundColor: getStyle('--cui-warning'),
                      borderWidth: 2,
                      borderDash: [5, 5],
                      data: Array(9).fill().map(() => random()),
                    },
                  ],
                }}
                options={chartOptions}
              />
              <CRow className="mt-4 text-center">
                {progressExampleRight.map((item, index) => (
                  <CCol key={index}>
                    <div className="text-body-secondary">{item.title}</div>
                    <div className="fw-semibold text-truncate">{item.value}</div>
                    <CProgress thin className="mt-2" color={item.color} value={item.percent} />
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <div style={{ height: '50px' }}></div>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Account Metrics</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">New Accounts</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Recurring Accounts</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Outdated</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Special Reason</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupExample2.map((item, index) => {
                    const value1Percent = (item.value1 / globalMax) * 100
                    const value2Percent = (item.value2 / globalMax) * 100

                    return (
                      <div className="progress-group mb-4" key={index}>
                        <div className="progress-group-prepend">
                          <span className="text-body-secondary small">{item.title}</span>
                        </div>
                        <div className="progress-group-bars">
                          <CProgress thin color="warning" value={value1Percent} />
                          <CProgress thin color="success" value={value2Percent} />
                        </div>
                      </div>
                    )
                  })}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CasesChart