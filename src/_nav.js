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
  cilPeople,
  cilAddressBook,
  cilMoney,
  cilBug,
  cilLoopCircular,
  cilSwapHorizontal,
  cilCheckCircle,
  cilFlagAlt,
  cilTags

} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';
import './scss/navigation.scss'; // Import custom styles




const _nav = [
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
    to: '/navigation/archiveSystem',
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
        Edit
      </li>
    ),
  },
  {
    component: CNavItem,
    name: 'Global Settings',
    to: '/edit/global-settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Daily Message',
    to: '/edit/daily-message',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/edit/client-search-input',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Client Information New',
    to: '/edit/client-information-new',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Client Information',
    to: '/edit/client-information',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'SysPrins',
    to: '/edit/sys-prin-config',
    icon: <CIcon icon={cilCode} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'SysPrins (New)',
    to: '/edit/sys-prin-config-new',
    icon: <CIcon icon={cilCode} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Receive Files',
    to: '/eidt/receive-files',
    icon: <CIcon icon={cilCloudDownload} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Email Setup',
    to: '/edit/email-setup',
    icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
  },  
  {
    component: CNavItem,
    name: 'Message Table',
    to: '/edit/message-table',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Zip Code Table',
    to: '/edit/zip-code-table',
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Mail Type',
    to: '/edit/mail-type',
    icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Delete Case ...',
    to: '/edit/delete-case',
    icon: <CIcon icon={cilTrash} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Review Deleted Case ...',
    to: '/edit/review-deleted-case',
    icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Account Number',
    to: '/eidt/account-number',
    icon: <CIcon icon={cilBarcode} customClassName="nav-icon" />,
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
    to: '/maintenance/client-report-mapping',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Resend Web Reports',
    to: '/maintenance/resend-web-reports',
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Web Client Directory',
    to: '/maintenance/web-client-directory',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
    
  {
    component: () => (
      <li className="nav-title nav-title-black">
        Report
      </li>
    ),
  },
  {
    component: CNavGroup,
    name: 'Daily',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Daily Activity',
        to: '/report/daily-activity',
      },
      {
        component: CNavItem,
        name: 'Daily Return Destroy',
        to: '/report/daily-return-destroy',
      },
      {
        component: CNavItem,
        name: 'Inventory',
        to: '/report/inventory',
      },
      {
        component: CNavItem,
        name: 'Inventory Listing',
        to: '/report/inventory-listing',
      },
      {
        component: CNavItem,
        name: 'Inventory Received',
        to: '/report/inventory-received',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Productivity',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Productivity Report',
        to: '/report/productivity-report',
      },
      {
        component: CNavItem,
        name: 'Input Robot Totals',
        to: '/report/input-robot-totals',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Billing',
    to: '/report/billing',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Unmatched Sys Prins',
    to: '/report/unmatch-sys-prins',
    icon: <CIcon icon={cilBug} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Resend Email Reports',
    to: '/report/resend-email-reports',
    icon: <CIcon icon={cilLoopCircular} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Report Queries',
    to: '/report/report-queries',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },  
  {
    component: CNavItem,
    name: 'Email Event Id',
    to: '/report/email-event-id',
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
        to: '/query-maintenance/define-query',
      },
      {
        component: CNavItem,
        name: 'C3 File Transfer',
        to: '/query-maintenance/c3-file-transfer',
      },
      {
        component: CNavItem,
        name: 'Data Definitions',
        to: '/query-maintenance/data-definitions',
      },
      {
        component: CNavItem,
        name: 'Schedule Batch Report',
        to: '/query-maintenance/schedule-batch-report',
      },
      {
        component: CNavItem,
        name: 'Table Load',
        to: '/query-maintenance/table-load',
      },
      {
        component: CNavItem,
        name: 'Table Load Column Mapping',
        to: '/query-maintenance/table-load-column-mapping',
      },
      {
        component: CNavItem,
        name: 'Tool Tips',
        to: '/query-maintenance/tool-tips',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Address Change',
    to: '/report/address-change',
    icon: <CIcon icon={cilSwapHorizontal} customClassName="nav-icon" />,
  },    
  {
    component: CNavItem,
    name: 'Mails with A-Stat',
    to: '/report/mails-with-a-stat',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Status',
    to: '/report/status',
    icon: <CIcon icon={cilFlagAlt} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Pending CIS',
    to: '/report/pending-cis',
    icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Failed NON-MONS',
    to: '/report/failed-non-mons',
    icon: <CIcon icon={cilXCircle} customClassName="nav-icon" />,
  },   
  {
    component: CNavItem,
    name: 'Robot Labels',
    to: '/report/robot-labels',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
  }, 
  {
    component: CNavItem,
    name: 'Sys/Prin Config',
    to: '/edit/sys-prin-config',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
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

export default _nav
