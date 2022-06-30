import React, {Component} from 'react'

class NotesInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
            titleMaxLength: 50,
            titleCount: 50,
            boolTitle: true,
            boolContent: true,
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
            titleCount: titleMaxLength - val.length,
            boolTitle: val !== ""
        });
    }

    onContentChangeEventHandler (event){
        let val = event.target.value;

        this.setState({
            content: val,
            boolContent: val !== ""
        });
    }

    onSubmitEventHandler(event){
        event.preventDefault();

        const {state:{title, content, titleMaxLength},props:{onAddNotes}} = this;

        if(title === "" || content === ""){
            this.setState({
                boolTitle: title !== "",
                boolContent: content !== ""
            });
            return;
        }

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
                boolTitle,
                boolContent,
            }
        } = this;

        return(
            <div className="w-100 note-create" onSubmit={onSubmitEventHandler}>
                <form className="">
                    <p className="text-right note-create__span">remaining chars : {titleCount}</p>
                    <input className={`w-100 mt-1 p-1 note-create__title-input ${(boolTitle) ? '' : 'input-error'}`} type="text" placeholder="Title..." onChange={onTitleChangeEventHandler} value={title}/>
                    <span className={`message-error ${(boolTitle) ? 'is_hidden' : ''}`}>The title field is required</span>
                    <textarea className={`w-100 mt-1 p-1 note-create__content-textarea ${(boolContent) ? '' : 'input-error'}`} cols="30" rows="5" placeholder="Content...." onChange={onContentChangeEventHandler} value={content}></textarea>
                    <span className={`message-error ${(boolContent) ? 'is_hidden' : ''}`}>The content field is required</span>
                    <button className="w-100 mt-1 p-1 submit-button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default NotesInput;