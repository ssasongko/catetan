import React, { Component, } from 'react';
import { Route, Routes, Navigate, useSearchParams } from 'react-router-dom';

// Layout
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

// Pages for Router
import NoMatchPage from './pages/NoMatchPage';
import DetailsNotesPage from './pages/DetailsNotesPage';
import ListNotesPage from './pages/ListNotesPage';
import AddNotesPage from './pages/AddNotesPage';

// Data
import { getAllNotes } from './utils/local-data';
import EditNotesWrapper from './pages/EditNotesPage';
import autoBind from 'auto-bind';

const AppWrapper = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const keyword = searchParams.get('q')
	const changeSearchParams = (q) => {
		setSearchParams({ q })
	}

	return <App defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			notes: getAllNotes(),
			search: props.defaultKeyword || ''
		}
		
		autoBind(this);
	}

	onFindNoteHandler = (id) => {
		const { notes } = this.state;
		const foundedNote = notes.find((note) => note.id === id);
		return foundedNote
	}

	onKeywordEventHandler = (search) => {
		this.setState(() => {
			return {
				search,
			}
		})

		this.props.keywordChange(search)
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
						id: `notes-${+new Date()}`,
						title: title || '(untitled)',
						body: content,
						archived: false,
						createdAt: date.toISOString()
					}
				]
			}
		})
	}

	onEditNoteHandler = (obj) => {
		const { notes } = this.state;

		const willChangeNote = [obj]
		const changedNote = notes.map(note => willChangeNote.find(c => c.id === note.id) || note)

		this.setState({
			notes: changedNote
		})
	}

	render() {
		const {
			onKeywordEventHandler,
			onSearchEventHandler,
			onDeleteEventHandler,
			onArchiveEventHandler,
			onAddNotesEventHandler,
			onFindNoteHandler,
			onEditNoteHandler,
			state: {
				notes,
				search,
			}
		} = this;

		return (
			<main className='container-fluid'>
				<Header />

				<section className='w-full md:w-2/3 flex justify-center mx-auto my-5 px-6 md:px-0'>
					<Routes>
						{/* main routes */}
						<Route path='/' element={<Navigate to='/notes' />} />
						<Route path='/notes' element={<ListNotesPage
							onSearchEventHandler={onSearchEventHandler}
							onDeleteEventHandler={onDeleteEventHandler}
							onArchiveEventHandler={onArchiveEventHandler}
							onKeywordChangeEventHandler={onKeywordEventHandler}
							notes={notes}
							search={search}
						/>}
						/>
						<Route path='/notes/:id' element={<DetailsNotesPage onFindNoteHandler={onFindNoteHandler} />} />
						<Route path='/notes/new' element={<AddNotesPage onAddNotes={onAddNotesEventHandler} />} />
						<Route path='/notes/:id/edit' element={<EditNotesWrapper onFindNoteHandler={onFindNoteHandler} onEditNoteHandler={onEditNoteHandler} />} />

						{/* page 404 */}
						<Route path='*' element={<Navigate to='/not-found' />} />
						<Route path='/not-found' element={<NoMatchPage />} />
					</Routes>
				</section>

				{/* <Footer /> */}
			</main>
		)
	}
}

export default AppWrapper;