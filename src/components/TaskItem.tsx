import React, {useState, useRef, useEffect} from 'react';
import { Image, TouchableOpacity, View, TextInput,  Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {TaskItemProps} from './interface/interfaces';

import trashIcon from '../assets/icons/trash/trash.png';



export function TaskItem({ renderItens, toggleTaskDone, removeTask, editTask }: TaskItemProps){
  const {item, index} = renderItens;
  const [isEdited, setIsEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(()=>{
    if(textInputRef.current){
        if(isEdited){
          textInputRef.current.focus();

        }else{
          textInputRef.current.blur();
        }
    }
  },[isEdited]);


  function handleStartEditing(){
    setIsEdited(true);
    setNewTitle(item.title);
  }

  function handleCancelEditing(){
    setIsEdited(false);
    setNewTitle(item.title);
  }

  function handleSubmitEditing(){
    const newData = {
        taskId: item.id,
        taskNewTitle: newTitle
    };
    editTask(newData);
    setIsEdited(false);
  }

  return (
    <>    
          <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                //TODO - use onPress (toggle task) prop
                onPress = {() => toggleTaskDone(item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  //TODO - use style prop 
                  style = { item.done === true ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>
                    
              
                  { isEdited === true
                  ? 
                    <TextInput 
                      ref={textInputRef}
                      style={ item.done ? styles.taskTextDone : styles.taskText}
                      value={newTitle}
                      editable={isEdited}
                      onChangeText={setNewTitle}
                      onSubmitEditing={handleSubmitEditing}
                    />                  
                  :                   
                  <Text style = { item.done === true ? styles.taskTextDone : styles.taskText}>
                        {item.title}
                    </Text>

                
                }


              </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>

{ isEdited ? (
    <TouchableOpacity
      onPress={handleCancelEditing}
    >
      <Icon name="x" size={24} color="#b2b2b2" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={handleStartEditing}
    >
      <Icon name="edit-2" size={24} color="#b2b2b2" />
    </TouchableOpacity>
  ) }

  <View 
    style={ styles.iconsDivider }
  />

  <TouchableOpacity
    disabled={isEdited}
    onPress={() => removeTask(item.id)}
  >
    <Image source={trashIcon} style={{ opacity: isEdited ? 0.2 : 1 }} />
  </TouchableOpacity>


           {/* <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              //TODO - use onPress (remove task) prop
              onPress = {() => removeTask(item.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>               */}

            </View>
    </>
  );
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
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
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
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
  ,
  iconsContainer:{
    flexDirection: 'row'
  },
  iconsDivider:{
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  }
})