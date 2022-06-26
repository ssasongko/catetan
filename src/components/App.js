import React, {Component} from 'react';
import Header from './Header';
import Search from './Search';
import Tabs from './Tabs';
import { getInitialData, showFormattedDate } from '../utils';
import NotesList from './NotesList';
import NotesInput from './NotesInput';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            notes: getInitialData(),
        }
        this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
        this.onArchiveEventHandler = this.onArchiveEventHandler.bind(this);
        this.onAddNotesEventHandler = this.onAddNotesEventHandler.bind(this);
    }

    // onDeleteEventHandler(id){
    //     const {notes} = this.state;
    //     const filtered = notes.filter(note => note.id !== id);
    //     this.setState({ notes: filtered });
        
    // }

    onDeleteEventHandler(id){
        const {notes} = this.state;
        const filtered = notes.filter(note => note.id !== id);
        this.setState({ notes: filtered });
    }
    
    onArchiveEventHandler(id, isArchived){
        const {notes} = this.state;
        const index = notes.findIndex((note) => note.id === id);
        const archived = isArchived;

		notes[index] = {
			...notes[index],
			archived
		}
        this.setState({ notes });
    }

    // onArchiveEventHandler(id){
    //     const {notes} = this.state;
    //     const index = notes.findIndex((note) => note.id === id);
    //     const archived = false;

	// 	notes[index] = {
	// 		...notes[index],
	// 		archived
	// 	}
    //     this.setState({ notes });
    // }

    onAddNotesEventHandler({title,content}){
        const date = new Date();

        this.setState((prevState) => {
            return{
                notes: [
                    ...prevState.notes,
                    {
                        id: +date,
                        title,
                        body: content,
                        archived: false,
                        createdAt: date.toISOString()
                    }
                ]
            }
        })

        console.log(this.state.notes)
    }

    render(){
        const {
            onAddNotesEventHandler,
            onDeleteEventHandler,
            onArchiveEventHandler,
            state: {
                notes,
            }
        } = this;

        return(
            <main>
            <Header/>
            <article className='col-8 d-flex flex-wrap justify-content-between mx-auto my-2'>
                <Search/>
                <NotesInput onAddNotes={onAddNotesEventHandler}/>
                <NotesList notes={notes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler}/>
            </article>
            <footer>Nur Sasongko</footer>
            </main>
        )
    }
}

export default App;