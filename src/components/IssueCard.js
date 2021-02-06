import React from 'react'
import UpVote from './UpVote'
import styled from "styled-components"


export default function IssueCard(props) {

    const {issues} = props

    

    return (
        <Card className='issue-card'>
            <Title className='issue-title'>
                <h1>{issues.issue}</h1>
                <UpVote issue={issues} />
            </Title>
            <CardBody className='card-body'>
                <Description className='issue-description'>
                    <p>{issues.description}</p>
                    <span>{issues.city}, {issues.state}</span><br/>
                    <span>{issues.zipcode}</span>
                </Description>
                
                {issues.image ? <IssueImg className='issue-img-ctn'>
                    <Img src={issues.image} alt='issue-img' />
                </IssueImg> : null}
           
            </CardBody>
        </Card>
    )
}

const Card = styled.div `
    border: solid 1px #c1c1c1;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: left;
    padding-bottom: 10px;
    background: #4E505A;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
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