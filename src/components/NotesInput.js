import React, {Component} from 'react'


class NotesInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
            titleMaxLength: 50,
            titleCount: 50,
        }

        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onContentChangeEventHandler = this.onContentChangeEventHandler.bind(this);

    }

    onTitleChangeEventHandler (event){
        const {state:{titleMaxLength}} = this;

        let val = event.target.value.slice(0, titleMaxLength)

        this.setState({
            title: val,
            titleCount: titleMaxLength - val.length
        });
    }

    onContentChangeEventHandler (event){
        let val = event.target.value;

        this.setState({
            content: val,
        });
    }

    onSubmitEventHandler(event){
        event.preventDefault();

        const {state:{title, content, titleMaxLength},props:{onAddNotes}} = this;
        onAddNotes({title, content});

        this.setState({
            title: '',
            content: '',
            titleCount: titleMaxLength
        });
    }

    render(){
        const {
            onSubmitEventHandler, 
            onTitleChangeEventHandler,
            onContentChangeEventHandler,
            state:{
                title,
                content,
                titleCount,
            }
        } = this;

        return(
            <div className="w-100 mt-2 p-2 border note-create" onSubmit={onSubmitEventHandler}>
                <form className="p-1">
                    <h3 className="note-create__title">New Note</h3>
                    <p className="mt-1 text-right note-create__span">Sisa Karakter : {titleCount}</p>
                    <input className="w-100 mt-1 p-1 note-create__title-input" type="text" placeholder="Title..." onChange={onTitleChangeEventHandler} value={title}/>
                    <textarea className="w-100 mt-1 p-1 note-create__content-textarea" cols="30" rows="10" placeholder="Content...." onChange={onContentChangeEventHandler} value={content}></textarea>
                    <button className="w-100 mt-1 p-1" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default NotesInput;