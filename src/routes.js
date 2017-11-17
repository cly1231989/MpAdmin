import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'
import {subDomain} from '../config/deploy.env'

// Import Views - Dash
import PatientsView from './components/views/PatientList.vue'
import DatasView from './components/views/DataList.vue'
import UsersView from './components/views/UserList.vue'
import TerminalsView from './components/views/TerminalList.vue'

// Routes
const routes = [
  {
    path: subDomain + '/',
    redirect: {name: '病人管理'}
  },
  {
    path: subDomain + '/login',
    component: LoginView
  },
  {
    path: subDomain + '/admin',
    component: DashView,
    meta: { auth: true },
    children: [
      {
        path: 'patients',
        component: PatientsView,
        name: '病人管理'
      },
      {
        path: 'users',
        component: UsersView,
        name: '用户管理'
      },
      {
        path: 'terminals',
        component: TerminalsView,
        name: '终端管理'
      },
      {
        path: 'datas',
        component: DatasView,
        name: '数据管理'
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
