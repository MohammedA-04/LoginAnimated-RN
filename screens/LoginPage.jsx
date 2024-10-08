import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign'

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [seeState, setSeeState] = useState(true);

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleUnseeRequest = (text) => {
    setSeeState(prevState => !prevState) // inverter
  }

  // Add points for at least two numbers, uppercase, lowercase, and special characters
  const checks = [
    /\d.*\d/,   // Two numbers
    /[A-Z]/,    // Uppercase letter
    /[a-z]/,    // Lowercase letter
    /[^a-zA-Z0-9]/ // Special character
  ];

  const calculateStrength = (password) => {
    let strength = 0;

    // Add points for length >= 8
    if (password.length >= 8) strength += 0.25;

    checks.forEach((regex, i) => {
      if (regex.test(password)) strength += [0.25, 0.25, 0.1, 0.15][i];
    });

    return Math.min(strength, 1); // Cap strength at 1 (100%)
  };

  const progressValue = calculateStrength(password);


  // check for 1x special
  const symbolsLen = checks[3].test((password)) >= 1 ? "#00FF00" : "#FF0000";

  // check for 2x numbers
  const numbersLen = checks[0].test((password)) >= 1 ? '#00FF00' : '#FF0000'

  // check 1x upper and 1x lower
  const upperlowerLen = checks[1].test((password)) + checks[2].test((password)) >= 2 ? '#00FF00' : '#FF0000'

  // check len >= 8
  const passwordLen = password.length >= 8 ? '#00FF00' : '#FF0000'


  // Determine color based on strength
  const getColor = () => {
    if (progressValue < 0.3) return 'red';
    if (progressValue < 0.6) return 'orange';
    if (progressValue < 0.8) return 'green';
    return 'darkgreen';
  };

  // Determine label based on strength
  const getLabel = () => {
    if (progressValue < 0.3) return 'Weak';
    if (progressValue < 0.6) return 'Fair';
    if (progressValue < 0.8) return 'Good';
    return 'Very Good';
  };


  return (
    <View style={{ flex: '1', alignItems: 'center', justifyContent: 'center' }}>

      {/* Username Input */}
      <View style={{ marginLeft: 20, borderRadius: 10 }}>
        <Text
          style={{ fontSize: 8, padding: 5 }}
        >Username</Text>
        <TextInput
          style={{
            backgroundColor: 'white', borderRadius: 10,
            borderColor: 'black', borderWidth: 2, marginBottom: 10,
            paddingRight: 40, paddingLeft: 5, paddingTop: 1, paddingBottom: 1
          }}
        />
      </View>

      {/* Password Input */}
      <View style={{ marginLeft: 20, borderRadius: 10 }}>
        <Text style={{ fontSize: 8, padding: 5 }}>Password</Text>

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            secureTextEntry={seeState}
            value={password}
            onChangeText={handlePasswordChange}
            style={{
              backgroundColor: 'white', borderRadius: 10,
              borderColor: 'black', borderWidth: 2, marginBottom: 10,
              paddingRight: 40, paddingLeft: 5, paddingTop: 1, paddingBottom: 1
            }}
          />

          <Pressable
            style={{ position: 'absolute', right: 10 }}
            onPress={handleUnseeRequest}>
            <AntDesign name={seeState ? "eye" : "eyeo"} size={20} color="black" />
          </Pressable>
        </View>

      </View>

      <View style={{ marginLeft: 20, marginTop: 2 }}>
        <Progress.Bar
          progress={progressValue}
          width={200}
          height={10}
          color={getColor()}
        />
        <Text style={{ color: getColor(), maerginTop: 10, fontSize: 8 }}>
          Password Strength: {getLabel()}
        </Text>
      </View>

      {/* Password Criteria */}
      <View style={{ marginTop: 10, marginLeft: 60 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="closecircleo" size={20} color={symbolsLen} />
          <Text className="ml-2">1 or more special characters</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="closecircleo" size={20} color={numbersLen} />
          <Text className="ml-2">At least 2 numbers</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="closecircleo" size={20} color={upperlowerLen} />
          <Text className="ml-2">At least one upper and lowercase</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="closecircleo" size={20} color={passwordLen} />
          <Text className="ml-2">Minimum 8-15 Characters</Text>
        </View>
      </View>

    </View>
  );
};

export default LoginPage;
