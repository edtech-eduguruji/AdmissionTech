import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import FilterListIcon from '@material-ui/icons/FilterList'
import ListAltIcon from '@material-ui/icons/ListAlt'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { ROLES_KEY } from './constants/Constants'
import asyncComponent from './layouts/AsyncComponent'
import Form from './views/StudentSrc/Form'
import MakePayment from './views/StudentSrc/MakePayment'
import PaymentHistory from './views/StudentSrc/PaymentHistory'
import Summary from './views/StudentSrc/Summary'

const FormSubmitted = asyncComponent(() =>
  import('./views/StudentSrc/FormSubmitted')
)
const CourseFee = asyncComponent(() => import('./views/StudentSrc/CourseFee'))
const NewForms = asyncComponent(() => import('./views/AdminSrc/Forms/NewForms'))
const Merit = asyncComponent(() => import('./views/AdminSrc/Merit/Merit'))
const ChangePassword = asyncComponent(() =>
  import('./views/AdminSrc/ChangePassword/ChangePassword')
)

const dashboardRoutes = [
  {
    path: '/changePassword',
    name: 'Change Password',
    id: 'password',
    icon: LockOpenIcon,
    component: ChangePassword,
    layout: '/admin',
    role: [ROLES_KEY.ADMIN],
    isSidebar: false,
  },
  {
    path: '/registrations',
    name: 'Registration Forms',
    id: 'newRegistrations',
    icon: ListAltIcon,
    component: NewForms,
    layout: '/admin',
    role: [ROLES_KEY.ADMIN],
    isSidebar: true,
    isNavbar: false,
  },
  {
    path: '/merit',
    name: 'Merit - (Excel)',
    id: 'merit',
    icon: FilterListIcon,
    component: Merit,
    layout: '/admin',
    role: [ROLES_KEY.ADMIN],
    isSidebar: true,
    isNavbar: false,
  },
  {
    path: '/payment',
    name: 'Make Payment',
    id: 'sPayment',
    icon: DynamicFeedIcon,
    component: MakePayment,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
    isSidebar: false,
    isNavbar: false,
  },
  {
    path: '/summary',
    name: 'Summary',
    id: 'sSummary',
    icon: DynamicFeedIcon,
    component: Summary,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
    isSidebar: false,
    isNavbar: false,
  },
  {
    path: '/form',
    name: 'Form',
    id: 'sForm',
    icon: DynamicFeedIcon,
    component: Form,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
    isSidebar: false,
    isNavbar: false,
  },
  {
    path: '/formsubmitted',
    name: 'Form Submitted',
    id: 'sFormSubmit',
    icon: DynamicFeedIcon,
    component: FormSubmitted,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
    isSidebar: false,
    isNavbar: false,
  },
  {
    path: '/coursefee',
    name: 'Course Fee',
    id: 'sCourseFee',
    icon: DynamicFeedIcon,
    component: CourseFee,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
    isSidebar: false,
    isNavbar: false,
  },
  {
    path: '/paymenthistory',
    name: 'Payment History',
    id: 'sPaymentHistory',
    icon: DynamicFeedIcon,
    component: PaymentHistory,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
    isSidebar: false,
    isNavbar: false,
  },
]

export default dashboardRoutes
