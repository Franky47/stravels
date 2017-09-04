import * as screens from '../screens'
import header from './header'

export default {
  Login: {
    screen: screens.LoginScreen,
    path: 'login',
    header: null
  },
  About: {
    screen: screens.AboutScreen,
    path: 'about',
    navigationOptions: {
      title: 'About',
      ...header.main.navigationOptions
    }
  },
  SelectActivities: {
    screen: screens.SelectActivitiesScreen,
    navigationOptions: {
      title: 'Select Activities'
    }
  },

  // Settings
  Preferences: {
    screen: screens.SettingsPreferencesScreen,
    navigationOptions: {
      title: 'Preferences'
    }
  },

  // Debug Screens
  Sandbox: {
    screen: screens.SandboxScreen,
    navigationOptions: {
      title: 'Sandbox'
    }
  },
  Routing: {
    screen: screens.RoutingScreen,
    navigationOptions: {
      title: 'Routing'
    }
  }
}
