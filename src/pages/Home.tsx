import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import {Task, editTaskProps} from '../components/interface/interfaces';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';




export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);


  function handleEditTask(data:editTaskProps){
      const editTask = tasks.map((task) => {
      if(task.id === data.taskId){
        task.title = data.taskNewTitle;
      }
      return task;
    });

    setTasks(editTask);
  }


  function handleAddTask(newTaskTitle: string) {

    if(newTaskTitle.trim().length === 0)
    return;

    const tempTasks = tasks.map( task => ({...task}));
    const checkTask = tempTasks.find( task => task.title === newTaskTitle);
    
    if(checkTask){
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome.', [{
        text: 'Ok'
      }])
      return;
    }


    //TODO - add new task
        const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks([...tasks, newTask]);
    

  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists

    const toggleDone = tasks.map((task) => {
      if(task.id === id){
        task.done = !task.done;
      }
      return task;
    });

    setTasks(toggleDone);

    // const updatedTasks = tasks.map( task => ({...task}));
    // const toggleDone = updatedTasks.find( task => task.id === id);
    // if(!toggleDone)
    // return;
    // toggleDone.done = !toggleDone.done;
    // setTasks(updatedTasks)

  }

  function handleRemoveTask(id: number) {

    // Alert.alert('Remover item', 'Tem certeza que você deseja remover este item?',[
    //   {
    //     text: 'Sim',
    //     onPress: () => setTasks((oldState) => oldState.filter((task) => task.id !== id))
    //   },
    //   {
    //     text: 'Não',
    //     style: 'cancel'
    //   }
    // ])

    //TODO - remove task from state
   
    setTasks((oldState) => oldState.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})