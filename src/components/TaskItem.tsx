import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Image } from 'react-native';

import trashIcon from '../assets/icons/trash/trash.png'
import x from '../assets/icons/x/X.png'
import pen from '../assets/icons/pen/Pen.png'

interface EditTask{
    taskId: number,
    taskNewTitle: string
}

interface MyTaskItemProps {
    item: {
      id: number;
      title: string;
      done: boolean;
    };
    onPress: (id: number) => void;
    onPressDelete: (id: number) => void;
    editTask: ({taskId: number, taskNewTitle: string}: EditTask) => void;
    isEnable: boolean,
    index: number,
}

export function TaskItem({ item, 
    onPress, onPressDelete, isEnable, index, editTask }: MyTaskItemProps){
        const [isEditing, setIsEditing] = useState(false)
        const [taskEdit, setTaskEdit] = useState(item.title)
        const textInputRef = useRef<TextInput>(null)

        function handleStartEditing(){
            setIsEditing(true)
        }

        function handleCancelEditing(){
            setTaskEdit(item.title);
            setIsEditing(false)
        }

        function handleSubmitEditing(){
            var data = {
                taskId: item.id,
                taskNewTitle: taskEdit
            }
            editTask(data)
            setIsEditing(false);
            return data;
        }

        useEffect(() => {
            if (textInputRef.current) {
              if (isEditing) {
                textInputRef.current.focus();
              } else {
                textInputRef.current.blur();
              }
            }
        }, [isEditing])
    return(
        <View>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                onPress={() => onPress(item.id)}
                style={item.done ? ( isEnable ? styles.taskButtonDoneDark : styles.taskButtonDone) : styles.taskButton }
                >
                <View 
                    testID={`marker-${index}`}
                    style={item.done ? ( isEnable ? styles.taskMarkerDoneDark : styles.taskMarkerDone): ( isEnable ? styles.taskMarkerDark : styles.taskMarker)} 
                />
                <TextInput 
                    ref={textInputRef}
                    value={taskEdit}
                    onChangeText={setTaskEdit}
                    editable={isEditing}
                    onSubmitEditing={handleSubmitEditing}
                    style={item.done ? ( isEnable ? styles.taskTextDoneDark : styles.taskTextDone): ( isEnable ? styles.taskTextDark : styles.taskText)} 
                />
                <View style={ styles.iconsContainer } >
                    { isEditing ? (
                        <TouchableOpacity
                        onPress={handleCancelEditing}
                        >
                        <Image source={x} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleStartEditing}
                        >
                            <Image source={pen} />
                        </TouchableOpacity>
                    ) }

                    <View 
                        style={ styles.iconsDivider }
                    />

                    <TouchableOpacity
                        disabled={isEditing}
                        onPress={() => onPressDelete(item.id)}
                    >
                        <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskMarkerDark: {
      height: 16,
      width: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E1E1E6',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
        marginRight: 150,
        color: '#3D3D4D',
    },
    taskTextDark: {
        marginRight: 150,
        color: '#E1E1E6',
    },
    taskButtonDone: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskButtonDoneDark: {
        marginRight: 25,
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskMarkerDoneDark: {
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: '#565BFF',
        marginRight: 10
    },
    taskTextDone: {
        marginRight: 150,
        color: '#A09CB1',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    taskTextDoneDark: {
        marginRight: 150,
        color: '#E1E1E6',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 12,
        paddingLeft: 24
    },
    iconsDivider:{
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12,
    }

  })