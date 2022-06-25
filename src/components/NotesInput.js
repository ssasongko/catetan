import React from 'react'

const NotesInput = () => {
    return(
        <div className="note-create p-2">
            <form className="p-1">
                <h3 className="note-create__title">New Note</h3>
                <p className="mt-1 text-right note-create__span">Sisa Karakter : 50</p>
                <input className="w-100 mt-1 p-1 note-create__title-input" type="text" placeholder="Title..."/>
                <textarea className="w-100 mt-1 p-1 note-create__content-textarea" cols="30" rows="10" placeholder="Content...."></textarea>
                <button className="w-100 mt-1 p-1" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NotesInput;