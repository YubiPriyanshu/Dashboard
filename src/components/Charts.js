import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Cards from './Cards';
import ClearIcon from '@mui/icons-material/Clear';
import { useDrop } from "react-dnd";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import {useMousePosition} from './useMousePosition'
import GetComponent from './GetComponent';

function Charts() {
  const [datas, setDatas] = useState([{name: "button", id: 1, component: 'button'}, {name: "input", id: 2,  component: 'input'}, {name: "BarChart", id: 3,  component: 'BarChart'}, {name: "LineChart", id: 4,  component: 'LineChart'}, {name: "PieChart", id: 5,  component: 'PieChart'}]);
  const [isVisible, setIsVisible] = useState(false);
  const [board, setBoard] = useState([]);
  const {x, y}= useMousePosition()
  //console.log({x,y})


  const [{ isOver }, drop] = useDrop(() => ({
    accept: "text",
    drop: (item) => addTextToBoard(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function addTextToBoard (item) {
    const dataList = datas.filter((data) => item.id === data.id);
    const newList = [{...dataList[0],id: uuidv4()}]
    setBoard((board)=>{ 
      return [...board, newList[0]]
    });
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
		const items = Array.from(board);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setBoard(items);
  }

  return (
    <div className='charts'>
      {
      isVisible? 
        <ClearIcon className='charts__menu--button' onClick = {()=>{setIsVisible(!isVisible)}}/>:
        <MenuIcon className='charts__menu--button' onClick = {()=>{setIsVisible(!isVisible)}}/> 
      }  
     

    {isVisible && <div className='charts__table'>
        {  
          datas.map((data) => {
            return <Cards name = {data.name} id = {data.id} key={data.id} />
          })
        }
    </div>}


    <div className="Board" ref={drop}>
    <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list" direction="horizontal">
          {(provided) => (
            <div  {...provided.droppableProps}
            ref={provided.innerRef}>
                {board.map((boar, index) => {
                  return (
                    <Draggable key={boar.id} draggableId={boar.id.toString()} index={index}>
                      {(provided) => (
                          <div  className='parentStyled' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={index}>
                            <GetComponent item={boar}/>
                          </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
            </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default Charts