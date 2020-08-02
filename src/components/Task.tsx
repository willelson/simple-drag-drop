import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import '../App.css';

interface TaskProps {
  id: string;
  text: string;
  index: number;
}

const Task = ({ id, text, index }: TaskProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={'container'}
        >
          {text}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
