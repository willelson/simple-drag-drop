import React, { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import './App.css';

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
  const [tasks, setTasks] = useState<ITask[]>(initialState);

  const dragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (destination) {
      // copy task list from state without task to move
      let updatedTasks = tasks.filter((task) => task.id !== draggableId);

      // insert task into copied list at it's new position
      updatedTasks = [
        ...updatedTasks.slice(0, destination.index),
        tasks[source.index],
        ...updatedTasks.slice(destination.index)
      ];

      setTasks(updatedTasks);
    }
  };

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
