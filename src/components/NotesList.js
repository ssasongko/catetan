import React, {Component} from 'react';
import NotesItem from './NotesItem';
import { getInitialData } from '../utils';

class NotesList extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         notes: this.props.notes,
            // notes: getInitialData()
            // archived: this.props.isArchived
        // }
    //     this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
    //     this.onArchiveEventHandler = this.onArchiveEventHandler.bind(this);
    // }

    // onDeleteEventHandler(id){
    //     const {props:{onDeleteEventHandler}} = this;
    //     onDeleteEventHandler({title, content});
    // }
    
    render(){
         const {
             props: {
                onArchive,
                onDelete,
                notes,
                search,
            }
        } = this;

        console.log(search)

        return(
            <div className='border mt-2 p-2'>
            <p>Active Notes</p>
            <div className="notes-list p-2">
                {notes.filter((note) => {
            if(search === ''){
                return note;
            }
            else{
                return note.title.toLowerCase().includes(search);
            }
        }).filter(note =>(note.archived === false)).map((note) => {
                    return(
                        <NotesItem 
                            key={note.id} 
                            note={note} 
                            onDelete={onDelete}
                            onArchive={onArchive}
                        />
                    )
                })}
            </div>
            
            <p>Archived</p>
            <div className="notes-list p-2">
                {notes.filter(note => (note.archived === true)).map((note) => {
                    return(
                        <NotesItem 
                            key={note.id} 
                            note={note} 
                            onDelete={onDelete}
                            onArchive={onArchive}
                        />
                    )
                })}
            </div>
            </div>
        )
    }
}

export default NotesList;

