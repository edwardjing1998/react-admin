import React, { useEffect, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CProgress, CRow } from '@coreui/react'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const TransactionChart = () => {
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

  const progressGroupExample1 = [
    { title: 'Monday', value1: 66, value2: 78, value3: 200},
    { title: 'Tuesday', value1: 56, value2: 150, value3: 140 },
    { title: 'Wednesday', value1: 68, value2: 67, value3: 120 },
    { title: 'Thursday', value1: 43, value2: 91, value3: 80 },
    { title: 'Friday', value1: 100, value2: 140, value3: 200 },
    { title: 'Saturday', value1: 53, value2: 82, value3: 99 },
    { title: 'Sunday', value1: 88, value2: 69, value3: 66 },
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
            <CCardHeader>Transaction Type</CCardHeader>
            <CCardBody>
              <CChartBar
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'Accounts',
                        backgroundColor: '#64B5F6',
                        data: [35, 25, 30, 45, 20, 50, 20],
                      },
                      {
                        label: 'Cases',
                        backgroundColor: '#A5D6A7',
                        data: [40, 20, 12, 39, 10, 40, 39],
                      },
                      {
                        label: 'Sys/Prin',
                        backgroundColor: '#FFCA28',
                        data: [25, 35, 45, 30, 20, 60, 50],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        barPercentage: 0.66,
                        categoryPercentage: 0.8,
                      },
                    },
                  }}
                  style={{ height: '300px' }}
                />
              <CRow className="pt-4">
                <CCol xs={4}>
                  <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                    <div className="text-body-secondary text-truncate small">Transaction Type 1</div>
                    <div className="fs-5 fw-semibold">9,123</div>
                  </div>
                </CCol>
                <CCol xs={4}>
                  <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                    <div className="text-body-secondary text-truncate small">Transaction Type 2</div>
                    <div className="fs-5 fw-semibold">15,789</div>
                  </div>
                </CCol>
                <CCol xs={4}>
                  <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                    <div className="text-body-secondary text-truncate small">Transaction Type 3</div>
                    <div className="fs-5 fw-semibold">22,643</div>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard>
            <CCardHeader>System Type</CCardHeader>
            <CCardBody>
            <CChartLine
                ref={chartRef2}
                style={{ height: '300px' }}
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: 'Type 1',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-success'),
                      pointHoverBackgroundColor: getStyle('--cui-success'),
                      borderWidth: 2,
                      data: [30, 45, 60, 70, 105, 120, 140, 165, 180], // 👈 Fixed data for Type 1
                    },
                    {
                      label: 'Type 2',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-warning'),
                      pointHoverBackgroundColor: getStyle('--cui-warning'),
                      borderWidth: 2,
                      borderDash: [5, 5],
                      data: [25, 35, 40, 50, 45, 60, 30, 50, 70], // 👈 You can fix this too
                    },
                  ],
                }}
                options={chartOptions}
              />
              <CRow className="pt-4">
                <CCol xs={6}>
                  <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                    <div className="text-body-secondary text-truncate small">System Type 1</div>
                    <div className="fs-5 fw-semibold">78,623</div>
                  </div>
                </CCol>
                <CCol xs={6}>
                  <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                    <div className="text-body-secondary text-truncate small">System Type 2</div>
                    <div className="fs-5 fw-semibold">49,123</div>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <div style={{ height: '50px' }}></div>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Transaction Metrics</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                      <CProgress thin color="info" value={item.value1} />
                      <CProgress thin color="danger" value={item.value2} />
                      <CProgress thin color="primary" value={item.value3} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
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

export default TransactionChart