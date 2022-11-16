import * as React from 'react';
import {
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {TaskItem} from './components';

import {useStartScreen} from './useStartScreen';
import {styles} from './styles';
import {useLoginScreen} from './useLoginScreen';

interface RenderTaskItem {
  item: {
    title: string;
    description: string;
    taskId: number;
  };
}

const renderTaskItem = ({item}: RenderTaskItem) => {
  return (
    <TaskItem
      title={item.title}
      description={item.description}
      taskId={item.taskId}
    />
  );
};

export const StartScreen: React.FC = () => {
  const {
    isLoggedIn,
    username,
    password,
    userDetails,
    handleLogout,
    onChangePassword,
    onChangeUsername,
    handleLogin,
  } = useLoginScreen();
  const {
    onChangeTaskDescription,
    onChangeTaskName,
    addTask,
    storedTasks,
    taskDescription,
    taskName,
  } = useStartScreen();
  return (
    <ImageBackground
      source={require('../assets/background-app.jpg')}
      style={styles.wrapper}>
      {isLoggedIn ? (
        <>
          <Text style={styles.titleHeader}>
            ToDo List {userDetails.username}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTaskName}
            placeholder="Task name"
            value={taskName}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeTaskDescription}
            placeholder="Task description"
            secureTextEntry={false}
            value={taskDescription}
          />
          <TouchableOpacity
            onPress={() => addTask(taskName, taskDescription)}
            style={styles.button}>
            <Text>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text>Log out</Text>
          </TouchableOpacity>
          <FlatList data={storedTasks} renderItem={renderTaskItem} />
        </>
      ) : (
        <>
          <Text style={styles.titleHeader}>Log in</Text>
          <TextInput
            placeholder="Enter username"
            style={styles.loginInput}
            onChangeText={onChangeUsername}
            value={username}
          />
          <TextInput
            placeholder="Enter password"
            style={styles.loginInput}
            onChangeText={onChangePassword}
            secureTextEntry
            value={password}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text>Log in</Text>
          </TouchableOpacity>
        </>
      )}
    </ImageBackground>
  );
};
