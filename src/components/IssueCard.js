import React from 'react'
import './IssueBoard.css'

export default function IssueCard(props) {

    const {issue} = props

    return (
        <div className='issue-card'>
            <div className='issue-title'>
                <h1>{issue.issue}</h1>
            </div>
            <div className='card-body'>
                <div className='issue-description'>
                    <p>{issue.description}</p>
                </div>
                {issue.image ? <div className='issue-img-ctn'>
                    <img src={issue.image} alt='issue-img' />
                </div> : null}
            </div>
        </div>
    )
}
