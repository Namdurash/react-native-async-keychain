import * as React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

import {styles} from './styles';
import {useLoginScreen} from './useLoginScreen';

export const LoginScreen: React.FC = () => {
  const {onChangePassword, onChangeUsername, handleLogin} = useLoginScreen();
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleHeader}>Log in</Text>
      <TextInput
        placeholder="Enter username"
        style={styles.loginInput}
        onChangeText={onChangeUsername}
      />
      <TextInput
        placeholder="Enter password"
        secureTextEntry
        style={styles.loginInput}
        onChangeText={onChangePassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};
