import React from 'react';

// const NotesTab = ({onClick}) => {
class NotesTab extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }

        this.onTabButtonEventHandler = this.onTabButtonEventHandler.bind(this);
    }

    onTabButtonEventHandler = (val) => {
        this.props.onClick(val);
    }

    render(){
        return(
            <div className="d-flex justify-content-between notes-tab">
                <div>
                    <button className="notes-tab__tab-button" onClick={()=>{this.onTabButtonEventHandler('notes')}}>Notes</button>
                    <button className="notes-tab__tab-button" onClick={()=>{this.onTabButtonEventHandler('archived-notes')}}>Archived Notes</button>
                </div>
                <button className="notes-tab__tab-button" onClick={()=>{this.onTabButtonEventHandler('add-notes')}}>Add Notes</button>
            </div>
        )
    }
}

export default NotesTab;

