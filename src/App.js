import React, { Component, } from 'react';
import Header from './components/layouts/Header';
import Search from './components/Search';
import Tabs from './components/Tabs';
import { getInitialData } from './utils';
import NotesList from './components/NotesList';
import NotesInput from './components/NotesInput';
import Footer from './components/layouts/Footer';
import { Route, Routes, Navigate } from 'react-router-dom';
import NoMatchPage from './pages/NoMatchPage';
import DetailsNotesPage from './pages/DetailsNotesPage';
import ListNotesPage from './pages/ListNotesPage';
import AddNotesPage from './pages/AddNotesPage';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			notes: getInitialData(),
			search: ''
		}
		this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
		this.onArchiveEventHandler = this.onArchiveEventHandler.bind(this);
		this.onAddNotesEventHandler = this.onAddNotesEventHandler.bind(this);
		this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
	}

	onSearchEventHandler = (find) => {
		this.setState({ search: find })
	}

	onDeleteEventHandler(id) {
		const { notes } = this.state;
		const filtered = notes.filter(note => note.id !== id);
		this.setState({ notes: filtered });
	}

	onArchiveEventHandler(id, isArchived) {
		const { notes } = this.state;
		const index = notes.findIndex((note) => note.id === id);
		const archived = isArchived;

		notes[index] = {
			...notes[index],
			archived
		}
		this.setState({ notes });
	}

	onAddNotesEventHandler({ title, content }) {
		const date = new Date();

		this.setState((prevState) => {
			return {
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

	render() {
		const {
			onAddNotesEventHandler,
			onDeleteEventHandler,
			onArchiveEventHandler,
			onSearchEventHandler,
			state: {
				notes,
				search,
			}
		} = this;

		// const archivedNotes = notes.filter(note => (note.archived === true));
		// const activeNotes = notes.filter(note => (note.archived === false));

		return (
			<main className='container-fluid'>
				<Header />
				<Routes>
					{/* main routes */}
					<Route path='/' element={<Navigate to='/notes' />} />
					<Route path='/notes' element={<ListNotesPage 
						onSearchEventHandler={onSearchEventHandler} 
						onDeleteEventHandler={onDeleteEventHandler} 
						onArchiveEventHandler={onArchiveEventHandler} 
						notes={notes}
						search={search}
						/>} 
					/>
					<Route path='/notes/:id' element={<DetailsNotesPage />} />
					<Route path='/notes/new' element={<AddNotesPage onAddNotes={onAddNotesEventHandler} />} />

					{/* page 404 */}
					<Route path='*' element={<Navigate to='/not-found' />} />
					<Route path='/not-found' element={<NoMatchPage />} />
				</Routes>

				{/* <Footer /> */}
			</main>
		)
	}
}

export default App;