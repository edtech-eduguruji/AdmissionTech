import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import ListAltIcon from '@material-ui/icons/ListAlt'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import { ROLES_KEY } from './constants/Constants'
import asyncComponent from './layouts/AsyncComponent'

const FormSubmitted = asyncComponent(() =>
  import('./views/StudentSrc/FormSubmitted')
)
const Courses = asyncComponent(() => import('views/AdminSrc/Course/Courses'))
const NewForms = asyncComponent(() => import('views/AdminSrc/Forms/NewForms'))

const dashboardRoutes = [
  // {
  //   path: '/admission',
  //   name: 'Admission',
  //   id: 'sAdmission',
  //   icon: DynamicFeedIcon,
  //   component: Home,
  //   layout: '/student',
  //   role: [ROLES_KEY.STUDENT],
  //   isSidebar: true,
  //   isNavbar: false,
  // },
  {
    path: '/formSubmmited',
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
    path: '/courseMgt',
    name: 'Course Mgt.',
    id: 'courses',
    icon: LocalLibraryIcon,
    component: Courses,
    layout: '/admin',
    role: [ROLES_KEY.ADMIN],
    isSidebar: true,
    isNavbar: false,
  },
  {
    path: '/newForms',
    name: 'New Forms',
    id: 'newForms',
    icon: ListAltIcon,
    component: NewForms,
    layout: '/admin',
    role: [ROLES_KEY.ADMIN],
    isSidebar: true,
    isNavbar: false,
  },
]

export default dashboardRoutes
