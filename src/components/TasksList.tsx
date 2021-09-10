import React from 'react';
import { FlatList } from 'react-native';
import { ItemWrapper } from './ItemWrapper';
import {TasksListProps} from './interface/interfaces';
import {TaskItem} from './TaskItem';





export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
       data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
                renderItens = {{item, index}}
                toggleTaskDone = { toggleTaskDone}
                removeTask = { removeTask }  
                editTask = { editTask }
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

