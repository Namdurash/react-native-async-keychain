import * as React from 'react';
import * as Keychain from 'react-native-keychain';

export const useLoginScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});

  const handleLogin = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    await Keychain.setGenericPassword(username, token);
    setIsLoggedIn(true);
    setUserDetails({token, username});
  };

  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    if (logout) {
      setIsLoggedIn(false);
      setUserDetails({});
    }
  };

  const testAsync = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('Login', credentials.username);
        setIsLoggedIn(true);
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  React.useEffect(() => {
    testAsync();
  }, [isLoggedIn]);

  const onChangeUsername = (usernameInput: string) => {
    setUsername(usernameInput);
  };

  const onChangePassword = (passwordInput: string) => {
    setPassword(passwordInput);
  };

  return {
    onChangePassword,
    onChangeUsername,
    handleLogin,
    handleLogout,
    isLoggedIn,
    username,
    password,
    userDetails,
  };
};
