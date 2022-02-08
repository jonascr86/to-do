import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

interface FlatListProps{
  isEnable: boolean
}

interface EditTaskProps{
  taskId: number,
  taskNewTitle: string
}

function FlatListHeaderComponent({isEnable} : FlatListProps) {
  return (
    <View>
      <Text style={ isEnable ? styles.headerDark : styles.header}>Minhas tasks</Text>
    </View>
  )
}

interface MyTasksListProps {
  tasks: {
    id: number;
    title: string;
    done: boolean;
  }[];
  onPress: (id: number) => void;
  onPressDelete: (id: number) => void;
  isEnable: boolean;
  editTask: ({taskId: number,
    taskNewTitle: string}: EditTaskProps) => void
}



export function MyTasksList({ tasks, onPressDelete, onPress, isEnable, editTask}: MyTasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index} >
            <Text>
              <TaskItem 
                index={index}
                isEnable={isEnable}
                item={item}
                onPress={onPress}
                onPressDelete={onPressDelete}
                editTask={editTask}
              />
            </Text>
          </ItemWrapper>
        )
      }}
      ListHeaderComponent={<FlatListHeaderComponent isEnable={isEnable}/>}
      ListHeaderComponentStyle={{
        marginBottom: 20,
        backgroundColor:  ( isEnable ? '#10101E' : '#FFFFFF' )
      }}
      style={{
        paddingHorizontal: 24,
        paddingTop: 32,
        backgroundColor: ( isEnable ? '#10101E' : '#FFFFFF' )
      }}
    />
  )
}

const styles = StyleSheet.create({
  header: {
    color: '#3D3D4D',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold'
  },
  headerDark: {
    color: '#565BFF',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold'
  },
})