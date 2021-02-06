import React, { useState, useEffect } from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import IssueCard from './IssueCard'
import { Link } from 'react-router-dom'
import styled from "styled-components"

export default function IssueBoard(props) {

    const [issues, setIssues] = useState([])

    useEffect(() => {
        axiosWithAuth()
        .get("/api/issues")
        .then(res => {
            setIssues(res.data)
        })
    }, [])

    
    issues.sort((a,b) => {return b.upvotes - a.upvotes})        // sort issues by upvotes
    

    return (
        <>
            <Header className='btn-ctn'>
                <button className='logout' onClick={props.logout}>Logout</button>
                <Link to='/new-issue-form'>
                <button className='addIssue-btn'>Add Issue</button>
                </Link> 
                <Link to='/my-issues'>
                <button className='my-issues-btn'>My Issue's</button>
                </Link> 
            </Header>
            <CardContainer className='issues-container'>
                {issues.map((item, index) => {
                    return <IssueCard key={index} issue={item} />
                })}
            </CardContainer>
        </>
    )
}

const Header = styled.div ` 
    text-align: center;
    outline: 0;
`

const CardContainer = styled.div `
  width: 50%;
  margin: auto; 
  text-align: center;
`


