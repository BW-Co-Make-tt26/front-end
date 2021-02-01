import React from 'react'

export default function IssueBoard(props) {


    return (
        <div>
            <button className='addIssue-btn'>Add Issue</button>
            <button className='logout' onClick={props.logout}>Logout</button>
        </div>
    )
}


