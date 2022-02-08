import React, { useEffect, useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';
import {Alert, Switch, View} from 'react-native'


interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface EditTask{
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEnable, setEnabled] = useState(true)
  const touggleSwitch = () => setEnabled(enabled => !enabled)

  function handleAddTask(newTaskTitle: string) {
    if(newTaskTitle === ''){
      Alert.alert('Task com nome vazio', 'Você não pode cadastrar uma task com o nome vazio!')
      return false;
    }

    if(tasks.find(task => task.title === newTaskTitle) !== undefined){
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return false
    }

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
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',[
      {
        text: "Não",
        onPress: () => console.log("Tarefa não removida"),
        style: "cancel"
      },
      { text: "Sim", onPress: () => {
        const removeTasks = tasks.filter(task => {
          if(task.id != id){
            return task;
          }
        })
        setTasks(removeTasks)
      } }
    ])
  }

  function handleEditTask(data: EditTask){
    const taskEdit = tasks.filter(task => {
      if(task.id === data.taskId){
        task.title = data.taskNewTitle
      }
      return task;
    })
    setTasks(taskEdit)
  }

  return (
    <View style={{ flex: 1, backgroundColor: isEnable ?'#10101E' : '#fff' }}>
      <Header isEnable={isEnable}/>

      <TodoInput addTask={handleAddTask} isEnable={isEnable} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onPressDelete={handleRemoveTask} 
        isEnable={isEnable}
        editTask={handleEditTask}
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