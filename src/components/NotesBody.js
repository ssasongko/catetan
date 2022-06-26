import React from 'react';
import { getInitialData, showFormattedDate } from '../utils';
import NotesInput from './NotesInput';
import NotesList from './NotesList';
import NotesSearch from './Search';
import NotesTab from './NotesTab';

class NotesBody extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            notes : getInitialData(),
            showFormattedDate: showFormattedDate(),
            tabOpen: "notes"
        }

        this.onTabButtonEventHandler = this.onTabButtonEventHandler.bind(this);
    }
    

    onTabButtonEventHandler = (val) => {
        this.setState({
            tabOpen: val
        })
        // console.log(this.forceUpdate);
    }

    render(){
        const tabOpen = this.state.tabOpen;
        // console.log()

        const isArchived = tabOpen === 'archived-notes';
        let tabVal = <NotesList notes={this.state.notes} isArchived={false}/>;
        // const tabVal = (tabOpen === 'notes' || tabOpen === 'archived-notes') 
        //     ?  <NotesList notes={this.state.notes} isArchived={isArchived}/>
        //     :  <NotesInput/>

        if(tabOpen === 'archived-notes') tabVal = <NotesList notes={this.state.notes} isArchived={true}/>
        if(tabOpen === 'add-notes') tabVal = <NotesInput/>

        return(
            <main className="col-8 d-flex flex-wrap justify-content-between mx-auto mt-2">
                <NotesSearch/>
                <section className="col-12 mt-2">
                    <NotesTab onClick={this.onTabButtonEventHandler}/>
                    <div className='tabcontent'>{tabVal}</div>
                </section>
            </main>
        )
    }
}

export default NotesBody;