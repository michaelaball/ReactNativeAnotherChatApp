// Import the screens
import Main from './components/Main';
import Chat from './components/Chat';
// import Fire from './Fire'
// Import React Navigation
import { createStackNavigator, createAppContainer } from 'react-navigation'

// Create the createStackNavigator
const navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat },
});
const app = createAppContainer(navigator)

// Export it as the root components
export default app
