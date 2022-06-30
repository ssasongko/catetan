import React, {Component, useState} from 'react';
import Header from './Header';
import Search from './Search';
import Tabs from './Tabs';
import { getInitialData, showFormattedDate } from '../utils';
import NotesList from './NotesList';
import NotesInput from './NotesInput';

// class App extends Component {

const App = () =>  {

    const [notes] = useState(getInitialData());
    const [search] = useState('');

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         notes: getInitialData(),
    //         search: ''
    //     }
    //     this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
    //     this.onArchiveEventHandler = this.onArchiveEventHandler.bind(this);
    //     this.onAddNotesEventHandler = this.onAddNotesEventHandler.bind(this);
    //     this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
    // }

    const onSearchEventHandler = (find) => {
        // const {notes} = this.state;

        // const filteredData = notes.filter((note) => {
        //     if(find === ''){
        //         return getInitialData();
        //     }
        //     else{
        //         return note.title.toLowerCase().includes(find);
        //     }
        // })
        this.setState({search: find})
        console.log(`find ${find}`);
    }

    const onDeleteEventHandler = (id) => {
        const {notes} = this.state;
        const filtered = notes.filter(note => note.id !== id);
        this.setState({ notes: filtered });
    }
    
    const onArchiveEventHandler = (id, isArchived) => {
        const {notes} = this.state;
        const index = notes.findIndex((note) => note.id === id);
        const archived = isArchived;

		notes[index] = {
			...notes[index],
			archived
		}
        this.setState({ notes });
    }

    const onAddNotesEventHandler = ({title,content}) => {
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
    }

        // const {
        //     onAddNotesEventHandler,
        //     onDeleteEventHandler,
        //     onArchiveEventHandler,
        //     onSearchEventHandler,
        //     state: {
        //         notes,
        //         search,
        //     }
        // } = this;

        return(
            <main>
            <Header/>
            <article className='col-8 d-flex flex-wrap justify-content-between mx-auto my-2'>
                <Search onSearch={onSearchEventHandler}/>
                <NotesInput onAddNotes={onAddNotesEventHandler}/>
                <NotesList notes={notes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler} search={search}/>
            </article>
            <footer>Nur Sasongko</footer>
            </main>
        )
}

export default App;