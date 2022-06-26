import React, {Component} from 'react';
import Header from './Header';
import Search from './Search';
import Tabs from './Tabs';
import { getInitialData, showFormattedDate } from '../utils';
import NotesList from './NotesList';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            notes: getInitialData()
        }

        this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
    }

    onDeleteEventHandler(id){
        const {notes} = this.state;
        const filtered = notes.filter(note => note.id !== id);
        this.setState({ notes: filtered });
    }

    render(){
        const {
            onDeleteEventHandler,
            state: {
                notes,
            }
        } = this;

        return(
            <main>
            <Header/>
            <article className='col-8 d-flex flex-wrap justify-content-between mx-auto my-2'>
                <Search/>
                <Tabs>
                    <div label="Notes">
                        {(notes.length > 0) ? <NotesList notes={notes} onDelete={onDeleteEventHandler}/> : "No Data"}
                    </div>
                    <div label="Archived">
                        This will going for archived notes
                    </div>
                    <div label="Add">
                        This will going to add
                    </div>
                </Tabs>
            </article>
            <footer>Nur Sasongko</footer>
            </main>
        )
    }
}

export default App;