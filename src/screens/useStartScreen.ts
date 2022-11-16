import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  title: string;
  description: string;
  taskId: number;
}

export const useStartScreen = () => {
  const [taskName, setTaskName] = React.useState('');
  const [taskDescription, setTaskDescrition] = React.useState('');
  const [storedTasks, setStoredTasks] = React.useState([]);

  const onChangeTaskName = (name: string) => {
    setTaskName(name);
  };

  const onChangeTaskDescription = (description: string) => {
    setTaskDescrition(description);
  };

  const getTasks = async () => {
    try {
      const value = await AsyncStorage.getItem('@tasks');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log('Error when get data: ', e);
    }
  };

  const addTask = async (title: string, description: string) => {
    const taskArrayJson = await getTasks();

    if (taskArrayJson) {
      const formattedTasks = JSON.parse(taskArrayJson);
      const taskId = formattedTasks.length + 1;
      const tasks = [...formattedTasks, {title, description, taskId}];
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
      const newData = await getTasks();
      newData && setStoredTasks(JSON.parse(newData));
    } else {
      const valueToSave = [{title, description}];
      await AsyncStorage.setItem('@tasks', JSON.stringify(valueToSave));
      const newCurrentText = await getTasks();
      newCurrentText && setStoredTasks(JSON.parse(newCurrentText));
    }
  };

  const removeTask = async (taskId: number) => {
    const currentTask = storedTasks.findIndex(
      (task: Task) => task.taskId === taskId,
    );
    storedTasks.splice(currentTask, 1);
    await AsyncStorage.setItem('@tasks', JSON.stringify(storedTasks));
    const newData = await getTasks();
    newData && setStoredTasks(JSON.parse(newData));
  };

  React.useEffect(() => {
    const getTaskList = async () => {
      const tasks = await getTasks();
      tasks && setStoredTasks(JSON.parse(tasks));
    };
    getTaskList();
  }, []);

  return {
    taskName,
    taskDescription,
    onChangeTaskDescription,
    onChangeTaskName,
    addTask,
    removeTask,
    storedTasks,
  };
};
