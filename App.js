import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './screens/LoginPage';

const App = () => {
  return (
    <View >
      <StatusBar style="auto" />

      {/* Component where it has email/password with a meter */}
      <LoginPage />

    </View>
  );
}

export default App
