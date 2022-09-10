import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import HomeLink from '../components/HomeLink';

import { getNote } from '../utils/local-data';

function DetailsNotesPageWrapper(){
  const {id} = useParams()

  return <DetailsNotesPage id={id}/>
}
class DetailsNotesPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      note: getNote(props.id)
    }
  }

  render() {
    const {note} = this.state
    
    return (
      <div className='w-full note-create border border-[#aaa] p-6'>
        {note &&
          <div className='w-1/2 mx-auto'>
            <p>{note.id}</p>
            <p>{note.title}</p>
            <p>{note.body}</p>
            <p>{note.archived}</p>
            <p>{note.createdAt}</p>
          </div>
        }

        {/* if note was not found */}
        {!note &&
          <p>Note are not found</p>
        }

        <HomeLink/>
      </div>
    )
  }
}

export default DetailsNotesPageWrapper