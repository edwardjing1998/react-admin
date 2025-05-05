import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { DocsLink } from 'src/components'

const Charts = () => {
  const random = () => Math.round(Math.random() * 100)

  return (
    <CRow>
      <CCol xs={12}></CCol>

      {/* Left Column - Bar and Doughnut Charts */}
      <CCol xs={6}>
        {/* Bar Chart */}
        <CCard className="mb-4">
          <CCardHeader>Accounts and Cases</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Accounts',
                    backgroundColor: '#64B5F6',
                    data: [35, 25, 30, 45, 20, 50, 40],
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
          </CCardBody>
        </CCard>

        {/* Doughnut Charts in One Row */}
        <CRow>
          <CCol md={4}>
            <CCard className="mb-4">
              <CCardHeader>Doughnut Chart A</CCardHeader>
              <CCardBody>
                <CChartDoughnut
                  data={{
                    labels: ['VueJs', 'EmberJs'],
                    datasets: [
                      {
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [40, 20],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  style={{ height: '200px' }}
                />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol md={4}>
            <CCard className="mb-4">
              <CCardHeader>Doughnut Chart B</CCardHeader>
              <CCardBody>
                <CChartDoughnut
                  data={{
                    labels: ['ReactJs', 'AngularJs'],
                    datasets: [
                      {
                        backgroundColor: ['#00D8FF', '#DD1B16'],
                        data: [30, 50],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  style={{ height: '200px' }}
                />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol md={4}>
            <CCard className="mb-4">
              <CCardHeader>Doughnut Chart C</CCardHeader>
              <CCardBody>
                <CChartDoughnut
                  data={{
                    labels: ['Svelte', 'SolidJS'],
                    datasets: [
                      {
                        backgroundColor: ['#FF3E00', '#2C4F7C'],
                        data: [15, 35],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  style={{ height: '200px' }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>

      {/* Right Column */}
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            Line Chart <DocsLink name="chart" />
          </CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Case Active',
                    backgroundColor: '#A5D6A7',
                    data: [40, 20, 12, 39, 10, 40, 39],
                  },
                  {
                    label: 'Case Disabled',
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
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>Pie Chart <DocsLink name="chart" /></CCardHeader>
          <CCardBody>
            <CChartPie
              data={{
                labels: ['Red', 'Green', 'Yellow'],
                datasets: [
                  {
                    data: [300, 50, 100],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>Polar Area Chart <DocsLink name="chart" /></CCardHeader>
          <CCardBody>
            <CChartPolarArea
              data={{
                labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
                datasets: [
                  {
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>Radar Chart <DocsLink name="chart" /></CCardHeader>
          <CCardBody>
            <CChartRadar
              data={{
                labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                    data: [65, 59, 90, 81, 56, 55, 40],
                  },
                  {
                    label: 'My Second dataset',
                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                    borderColor: 'rgba(151, 187, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                    pointBorderColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151, 187, 205, 1)',
                    data: [28, 48, 40, 19, 96, 27, 100],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
