import React, { useEffect, useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';
import {Switch, View} from 'react-native'


interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEnable, setEnabled] = useState(true)
  const touggleSwitch = () => setEnabled(enabled => !enabled)

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    if(newTaskTitle.trim() != ""){
      setTasks([...tasks, data])
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const taskMark = tasks.filter(task => {
      if(task.id === id){
        task.done = !task.done
      }
      return task;
    })
    setTasks(taskMark)
  }

  function handleRemoveTask(id: number) {
    const removeTasks = tasks.filter(task => {
      if(task.id != id){
        return task;
      }
    })
    setTasks(removeTasks)
  }


  return (
    <View style={{ flex: 1, backgroundColor: isEnable ?'#10101E' : '#fff' }}>
      <Header isEnable={isEnable}/>

      <TodoInput addTask={handleAddTask} isEnable={isEnable} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
        isEnable={isEnable}
      />
      <Switch 
        trackColor={{ false: "#767577", true: "#767577" }}
        thumbColor={"#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={touggleSwitch}
        value={isEnable}
        style={{backgroundColor: isEnable ?'#191932' : '#fff'}}
        />
      </View>
  )
}