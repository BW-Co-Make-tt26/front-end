import React from 'react'

export default function IssueCard(props) {

    const {issue} = props

    return (
        <div className='issue-card'>
            <div className='issue-title'>
                <h1>{issue.issue}</h1>
            </div>
            <div className='issue-description'>
                <p>{issue.description}</p>
            </div>
            <div className='issue-img-ctn'>
                <img src={issue.image} alt='issue-img' />
            </div>
        </div>
    )
}