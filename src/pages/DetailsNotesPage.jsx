import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import { getNote } from '../utils';

function DetailsNotesPageWrapper(){
  const {id} = useParams()

  return <DetailsNotesPage id={Number(id)}/>
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
      <div>
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
      </div>
    )
  }
}

export default DetailsNotesPageWrapper