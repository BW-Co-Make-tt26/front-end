import React, { useState, useEffect } from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import IssueCard from './IssueCard'
import { Link } from 'react-router-dom'
import './IssueBoard.css'

export default function IssueBoard(props) {

    const [issues, setIssues] = useState([])

    useEffect(() => {
        axiosWithAuth()
        .get("/api/issues")
        .then(res => {
            setIssues(res.data)
        })
    }, [])

    return (
        <>
            <div className='btn-ctn'>
                <Link to='/new-issue-form'>
                <button className='addIssue-btn'>Add Issue</button>
                </Link> 
                <button className='logout' onClick={props.logout}>Logout</button>
            </div>
            <div className='issues-container'>
                {issues.map((item, index) => {
                    return <IssueCard key={index} issue={item}/>
                })}
            </div>
        </>
    )
}


