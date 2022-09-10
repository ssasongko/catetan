import React, { Component, } from 'react';
import Header from './components/layouts/Header';
import { getInitialData } from './utils';
import Footer from './components/layouts/Footer';
import { Route, Routes, Navigate, useSearchParams } from 'react-router-dom';
import NoMatchPage from './pages/NoMatchPage';
import DetailsNotesPage from './pages/DetailsNotesPage';
import ListNotesPage from './pages/ListNotesPage';
import AddNotesPage from './pages/AddNotesPage';

const AppWrapper = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const keyword = searchParams.get('q')
	const changeSearchParams = (q) => {
		setSearchParams({q})
	}

	return <App defaultKeyword={keyword} keywordChange={changeSearchParams}/>
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			notes: getInitialData(),
			search: props.defaultKeyword || ''
		}
		this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
		this.onArchiveEventHandler = this.onArchiveEventHandler.bind(this);
		this.onAddNotesEventHandler = this.onAddNotesEventHandler.bind(this);
		this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
	}

	onKeywordEventHandler = (search) => {
		this.setState(()=>{
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
			onKeywordEventHandler,
			onSearchEventHandler,
			onDeleteEventHandler,
			onArchiveEventHandler,
			onAddNotesEventHandler,
			state: {
				notes,
				search,
			}
		} = this;

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
						onKeywordChangeEventHandler={onKeywordEventHandler}
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

export default AppWrapper;