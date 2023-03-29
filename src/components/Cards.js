import React from 'react';
import { useDrag } from "react-dnd";

function Cards(props) {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "text",
    item: { id: props.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  return (
    <div className='cards' ref={drag} key={props.key} >
        <p>{props.name}</p>
    </div>
  )
}

export default Cards;
