import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import PatientsView from './components/views/PatientList.vue'
import DatasView from './components/views/DataList.vue'
import UsersView from './components/views/UserList.vue'
import TerminalsView from './components/views/TerminalList.vue'
import TerminalBindingsView from './components/views/TerminalBindingList.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/admin',
    component: DashView,
    meta: { auth: true },
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers'}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      },
      {
        path: 'patients',
        component: PatientsView,
        name: 'Patients'
      },
      {
        path: 'users',
        component: UsersView,
        name: 'Users'
      },
      {
        path: 'terminals',
        component: TerminalsView,
        name: 'Terminals'
      },
      {
        path: 'terminalbindings',
        component: TerminalBindingsView,
        name: 'Terminalbindings'
      },
      {
        path: 'datas',
        component: DatasView,
        name: 'Datas'
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
