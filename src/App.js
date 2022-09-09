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

		const archivedNotes = notes.filter(note => (note.archived === true));
		const activeNotes = notes.filter(note => (note.archived === false));

		return (
			<main>
				<Header />
					<Routes>
						<Route path="/" element={
							<article className='col-8 d-flex flex-wrap justify-content-between mx-auto my-2'>
								<Search onSearch={onSearchEventHandler} />
								<Tabs>
									<div label="Notes">
										{
											(activeNotes.length > 0)
												? <NotesList notes={activeNotes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler} search={search} />
												: "Active note is empty"
										}
									</div>
									<div label="Archived">
										{
											(archivedNotes.length > 0)
												? <NotesList notes={archivedNotes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler} search={search} />
												: "Archived note is empty"
										}
	
									</div>
									<div label="Add">
										<NotesInput onAddNotes={onAddNotesEventHandler} />
									</div>
								</Tabs>
							</article>
						}/>
						<Route path='/not-found' element={<NoMatchPage/>}/>
						<Route path="*" element={<Navigate to="/not-found" />} />
					</Routes>
					
				{/* <Footer /> */}
			</main>
		)
	}
}

export default App;