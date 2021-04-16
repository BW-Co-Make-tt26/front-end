import React from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import { Link } from 'react-router-dom'
import styled from "styled-components";

export default function MyIssuesCard(props) {

    const {issue, myIssues, setMyIssues} = props

    const deleteIssue = issue => {
        axiosWithAuth()
        .delete(`/api/issues/${issue.id}`)
        .then( res => {
            setMyIssues(myIssues.filter(item => {
                return item.id !== res.data
            }))
        })
        .catch(err => {
            console.log(err.data)
        })
    }

    return (
        <Card className='issue-card'>
            <Title className='issue-title'>
                <h1>{issue.issue}</h1>
            </Title>
            <CardBody className='card-body'>
                <Description className='issue-description'>
                    <p>{issue.description}</p>
                </Description>
                {issue.image ? <IssueImg className='issue-img-ctn'>
                    <Img src={issue.image} alt='issue-img' />
                </IssueImg> : null}
            </CardBody>
            <ButtonDiv>
                <Link to={`/edit-form/${issue.id}`}>
                <button id='edit-issue-btn'>Edit</button>
                </Link>
                <button id='delete-issue-btn' onClick={e => {
                    e.stopPropagation();
                    deleteIssue(issue)
                }}>Delete</button>
            </ButtonDiv>
        </Card>
    )
}

const Card = styled.div `
    border: solid 1px #c1c1c1;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: left;
    padding-bottom: 10px;
`

const CardBody = styled.div `
    display: flex;
    justify-content: space-between;
`

const Title = styled.div `
    display: flex;
    justify-content: space-between;
    margin-left: 45px;
`

const Description = styled.div `
    max-width: 60%;
    padding-left: 45px;
`

const ButtonDiv = styled.div `
    margin-left: 15px;
`

const IssueImg = styled.div `
    max-width: fit-content;
    height: auto;
    width: 200px;
    max-height: 200px;
    margin: 3px;
    padding: 3px;
    display: flex;
    margin-right: 20px;
`

const Img = styled.img `
    max-width: 100%;
    height: auto;
`