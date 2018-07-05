import { TabNavigator,StackNavigator } from 'react-navigation';
import Home from '../screens/Home'
import Report from '../screens/Report'
import Login from '../screens/Login'

export const Routes = StackNavigator({
    // Tabs:{
    //     screen:Tabs
    // },
    Login:{
        screen: Login,
        navigationOptions: {
            title: 'Login', 
            headerStyle: {
              backgroundColor: 'white'
            }, 
          },
    },

    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home', 
            headerStyle: {
              backgroundColor: 'white'
            }, 
          },
      },

      Report: {
          screen: Report,
          navigationOptions: {
              title: 'Report',
              headerStyle:{
                  backgroundColor: 'white'
              },
          },
      },
    //   IndividualGroup: {
    //     screen: IndividualGroup,
    //     navigationOptions: {
    //         title: 'Lesson of the week',     
    //       },
    //   },
   
})