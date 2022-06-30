import React from 'react';

const ArchiveButton = ({id, onArchive}) => {
    return <button className='note-item__archive-button' onClick={()=>{onArchive(id, true)}}>Archive</button>
}

export default ArchiveButton;