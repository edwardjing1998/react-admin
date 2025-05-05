import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilSettings,
  cilSpeech,
  cilUser,
  cilCode,
  cilCloudDownload,
  cilEnvelopeClosed,
  cilSpreadsheet,
  cilLocationPin,
  cilEnvelopeOpen,
  cilTrash,
  cilSearch,
  cilBarcode,
  cilPrint,
  cilLink,
  cilCalendar,
  cilRecycle,
  cilStorage,
  cilChartLine,
  cilDollar,
  cilClock,
  cilXCircle,
  cilFile,
  cilTask,
  cilCog,
  cilMoney,
  cilBug

} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';
import './scss/navigation.scss'; // Import custom styles




const _archiveNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: () => (
      <li className="nav-title nav-title-black">
        File
      </li>
    ),
  },  
  {
    component: CNavItem,
    name: 'Connect Rapid3 Aechive',
    to: '/archive-dashboard',
    icon: <CIcon icon={cilLink} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Print',
    to: '/theme/typography',
    icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
  },
  {
    component: () => (
      <li className="nav-title nav-title-black">
        Maintenance
      </li>
    ),
  },
  {
    component: CNavItem,
    name: 'Client Report Mapping',
    to: '/archive-maintenance/client-report-mapping',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Resend Web Reports',
    to: '/archive-maintenance/resend-web-reports',
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Web Client Directory',
    to: '/archive-maintenance/web-client-directory',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: () => (
      <li className="nav-title nav-title-black">
        Report
      </li>
    ),
  },
  {
    component: CNavItem,
    name: 'Input Robot Totals',
    to: '/archive-maintenance/input-robot-totals',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Billing',
    to: '/archive-report/billing',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Unmatched Sys Prins',
    to: '/archive-report/unmatch-sys-prins',
    icon: <CIcon icon={cilBug} customClassName="nav-icon" />,
  },    
  {
    component: CNavItem,
    name: 'Report Queries',
    to: '/archive-report/report-queries',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Email Event Id',
    to: '/archive-report/email-event-id',
    icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
  },              
  {
    component: CNavGroup,
    name: 'Query Maintenance',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Define Query',
        to: '/archive-query-maintenance/define-query',
      },
      {
        component: CNavItem,
        name: 'C3 File Transfer',
        to: '/archive-query-maintenance/c3-file-transfer',
      },
      {
        component: CNavItem,
        name: 'Data Definitions',
        to: '/archive-query-maintenance/data-definitions',
      },
      {
        component: CNavItem,
        name: 'Schedule Batch Report',
        to: '/archive-query-maintenance/schedule-batch-report',
      },
      {
        component: CNavItem,
        name: 'Table Load',
        to: '/archive-query-maintenance/table-load',
      },
      {
        component: CNavItem,
        name: 'Table Load Column Mapping',
        to: '/archive-query-maintenance/table-load-column-mapping',
      },
      {
        component: CNavItem,
        name: 'Tool Tips',
        to: '/archive-query-maintenance/tool-tips',
      }
    ],
  },  
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _archiveNav
