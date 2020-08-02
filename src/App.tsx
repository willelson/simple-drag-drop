import React, { useState } from 'react';
import './App.css';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import TaskList from './components/TaskList';
import Task from './components/Task';

import { randomID } from './helpers';

export interface ITask {
  id: string;
  text: string;
}

const initialState = [
  {
    id: randomID(),
    text: 'Make a potato curry'
  },
  {
    id: randomID(),
    text: 'Complete todays WOD'
  },
  {
    id: randomID(),
    text: 'Go for a walk'
  },
  {
    id: randomID(),
    text: 'Go surfing'
  }
];

function App() {
  const dragEnd = (result: DropResult) => {
    console.log('drag end');
  };
  const [tasks, setTasks] = useState<ITask[]>(initialState);
  return (
    <div className={'container'}>
      <h3>Tasks</h3>
      <DragDropContext onDragEnd={dragEnd}>
        <Droppable droppableId={randomID()}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Task key={task.id} {...task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
