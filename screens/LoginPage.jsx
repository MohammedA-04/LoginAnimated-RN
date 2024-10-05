import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign'

const LoginPage = () => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

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
  const numbersLen = checks[0].test((password)) >= 1 ? '00FF00' : 'FF0000'

  // check 1x upper and 1x lower
  const upperlowerLen = checks[1].test((password)) + checks[2].test((password)) >= 2 ? '00FF00' : 'FF0000'

  // check len >= 8
  const passwordLen = password.length >= 8 ? '00FF00' : 'FF0000'


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
    <View className="flex-1 justify-center items-center">

      <View>
        <TextInput
          placeholder="Username"
        />
      </View>

      <View className="mx-2">
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>


      {/* Dynamically change the progress bar color based on strength */}
      <Progress.Bar
        progress={progressValue}
        width={200}
        color={getColor()}
      />

      <Text style={{ color: getColor() }}>
        Password Strength: {getLabel()}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, borderColor: 'black' }}>
        {/* Symbols */}
        <AntDesign name="closecircleo" size={10} color={symbolsLen} />
        <Text>1 or more special characters</Text>
      </View>

      <View className="flex-row items-center my-2">
        {/* Numbers */}
        <AntDesign name="closecircleo" size={10} color={numbersLen} />
        <Text>At least 2 numbers</Text>
      </View>

      <View className="flex-row items-center my-4">
        {/* UpperLower */}
        <AntDesign name="closecircleo" size={10} color={upperlowerLen} />
        <Text>At least one upper and lowercase</Text>
      </View>

      <View className="flex-row items-center my-4">
        {/* Len of password */}
        <AntDesign name="closecircleo" size={10} color={passwordLen} />
        <Text>minimum 8-15 Characters</Text>
      </View>


    </View>
  );
};

export default LoginPage;
