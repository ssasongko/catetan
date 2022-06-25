import React from 'react';

// const NotesList = ({notes, isArchived, showFormattedDate}) => {

class NotesList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notes: this.props.notes,
            archived: this.props.isArchived
        }

        this.onTestHandler = this.onTestHandler.bind(this);
    }
    // notes.filter((function(currentValue, index, arr)), thisValue)
    // console.log(notes);

    componentDidUpdate(){
        const isArchived = this.state.archived;
        console.log('state', isArchived)
        const archivedNotes = this.state.notes.filter(note => note.archived === isArchived);

        this.setState = {
            notes: archivedNotes
        }
    }

    onTestHandler(){
    }
    
    
    render(){
        // console.log('state', this.state.archived);
        return(
            
        // <div className='book_list'>
        //     {
        //         notes.map((note) => (
        //             <article className='book_item d-flex mt-1'>
        //                 <div className='p-2'>
        //                     <h3 className='mt-1'>{note.title}</h3>
        //                     <h6>{showFormattedDate(note.createdAt)}</h6>
        //                     <p className='mt-1'>{note.body}</p>
        //                     <div className='mt-1 action'>
        //                         <button className='green'>Archive</button>
        //                         <button className='red'>Delete</button>
        //                     </div>
        //                 </div>
        //             </article>
        //         ))
        //     }
        // </div>
        // <div className='tabcontent'>
        <div className="notes-list p-2">
            <button onClick={this.onTestHandler}>testing</button>
            <div className="note-item">
                <div className="p-1 note-item__content">
                    <h3 className="note-item__title">Babel</h3>
                    <p className="note-item__date">Kamis, 14 April 2022</p>
                    <p>Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.</p>
                </div>
                <div className="note-item__action d-flex">
                    <button className="note-item__delete-button">Delete</button>
                    <button className="note-item__archive-button">Archive</button>
                </div>
            </div> 
            <div className="note-item">
                <div className="p-1 note-item__content">
                    <h3 className="note-item__title">Babel</h3>
                    <p className="note-item__date">Kamis, 14 April 2022</p>
                    <p>Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.</p>
                </div>
                <div className="note-item__action d-flex">
                    <button className="note-item__delete-button">Delete</button>
                    <button className="note-item__archive-button">Archive</button>
                </div>
            </div> 
        </div>
        // </div>
        )
    }
}

export default NotesList;

