import React from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import './IssueBoard.css'
import {useHistory, Link} from 'react-router-dom'

export default function MyIssuesCard(props) {

    const {issue, myIssues, setMyIssues} = props
    const { push } = useHistory();

    const deleteIssue = issue => {
        axiosWithAuth()
        .delete(`/api/issues/${issue.id}`)
        .then( res => {
            setMyIssues(myIssues.filter(issue => {
                return issue.id !== res.data
            }))
            window.location.reload()
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.data)
        })
    }

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
    
            <button id='edit-issue-btn' onClick={push(`/edit-form/${issue.id}`)}>Edit</button>
            
            <button id='delete-issue-btn' onClick={e => {
                e.stopPropagation();
                deleteIssue(issue)
            }}>Delete</button>
        </div>
    )
}
