import React from 'react';

const ActiveButton = ({id, onArchive}) => {
    return <button className='note-item__archive-button' onClick={()=>{onArchive(id, false)}}>Active</button>
}

export default ActiveButton;