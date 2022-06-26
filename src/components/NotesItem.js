import React, {Component} from 'react';
import {showFormattedDate} from './../utils';
import ActiveButton from './ActiveButton';
import ArchiveButton from './ArchiveButton';
import DeleteButton from './DeleteButton';

class NotesItem extends Component{

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         note: this.props.note,
    //         showFormattedDate: showFormattedDate()
    //     }
    // }

    // onDelete = () => {
    //     const{ 
    //         onDelete,
    //         note:{
    //             id
    //         },
    //     } = this.props;
    //     onDelete(id);
    // }

    //  onArchive = () => {
    //     const{ 
    //         onArchive,
    //         note:{
    //             id
    //         },
    //     } = this.props;
    //     onArchive(id);
    // }

    render(){
         const {
             props: {
                onArchive,
                onDelete,
                note
            }
        } = this;

        const Button = (note.archived)
            ? <ActiveButton id={note.id} onArchive={onArchive}/>
            : <ArchiveButton id={note.id} onArchive={onArchive}/>

        return(
            <div className="note-item">
                <div className="p-1 note-item__content">
                    <h3 className="note-item__title">{note.title}</h3>
                    <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
                    <p>{note.body}</p>
                </div>
                <div className="note-item__action d-flex">
                    <DeleteButton id={note.id} onDelete={onDelete}/>
                    {Button}
                </div>
            </div> 
        )
    }
}

export default NotesItem;