import React, {Component} from 'react';
import {showFormattedDate} from './../utils';

class NotesItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            note: this.props.note,
            showFormattedDate: showFormattedDate()
        }
    }

    onDelete = () => {
        const{ 
            onDelete,
            note:{
                id
            },
        } = this.props;
        onDelete(id);
    }

    render(){
         const {
            onDelete,
            state: {
                note
            }
        } = this;


        return(
            <div className="note-item">
                <div className="p-1 note-item__content">
                    <h3 className="note-item__title">{note.title}</h3>
                    <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
                    <p>{note.body}</p>
                </div>
                <div className="note-item__action d-flex">
                    <button className="note-item__delete-button" onClick={onDelete}>Delete</button>
                    <button className="note-item__archive-button">Archive</button>
                </div>
            </div> 
        )
    }
}

export default NotesItem;