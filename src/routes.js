import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { ROLES_KEY } from './constants/Constants'
import asyncComponent from './layouts/AsyncComponent'
import Form from './views/StudentSrc/Form'
import MakePayment from './views/StudentSrc/MakePayment'
import Summary from './views/StudentSrc/Summary'

const FormSubmitted = asyncComponent(() =>
  import('./views/StudentSrc/FormSubmitted')
)
const NewForms = asyncComponent(() => import('./views/AdminSrc/Forms/NewForms'))

const dashboardRoutes = [
  {
    path: '/registrations',
    name: 'New Registrations',
    id: 'newRegistrations',
    icon: ListAltIcon,
    component: NewForms,
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
]

export default dashboardRoutes
