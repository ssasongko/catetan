import React, {Component} from 'react';
import NotesItem from './NotesItem';

class NotesList extends Component{

    render(){
         const {
             props: {
                onArchive,
                onDelete,
                notes,
                search,
            }
        } = this;

        const filtered = notes.filter((note) => {
            if(search === '') return note;
            else return note.title.toLowerCase().includes(search);
        });

        return(
            <div className="notes-list">
                {(filtered.length > 0)
                    ? filtered.map((note) => {
                        return(
                            <NotesItem 
                                key={note.id} 
                                note={note} 
                                onDelete={onDelete}
                                onArchive={onArchive}
                            />
                        )
                    })
                    : "Result note was not found"
                }
            </div>
        )
    }
}

export default NotesList;

