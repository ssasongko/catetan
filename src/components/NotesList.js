import React, {Component} from 'react';
import NotesItem from './NotesItem';

class NotesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            notes: this.props.notes,
            // archived: this.props.isArchived
        }
        this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
    }

    onDeleteEventHandler(id){
        const {
            onDelete
        } = this.props
        console.log(onDelete);
        onDelete(id)
    }
    
    
    render(){
         const {
            onDeleteEventHandler,
            props: {
                notes,
            }
        } = this;

        return(
            <div className="notes-list p-2">
                {notes.map((note) => {
                    return(
                        <NotesItem 
                            key={note.id} 
                            note={note} 
                            onDelete={onDeleteEventHandler}
                        />
                    )
              })}
            </div>
        )
    }
}

export default NotesList;

