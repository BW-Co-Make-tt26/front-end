import React from 'react';
import styled from "styled-components";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import upvoteImg from '../images/upvote.svg'


export default function UpVote({issue}) {

    const handleUpvote = () => {
        const addVote = {
          upvotes: issue.upvotes + 1
        }
        axiosWithAuth()
        .put(`/api/issues/${issue.id}/upvotes`, addVote)
        .then(res => {
           window.location.reload()
          })
        .catch(err => {
            console.log(err)
        })
    };

    return (
            <UpvoteCtn className='upvote-ctn'>
                 <Counter className='counter'>{issue.upvotes}</Counter>
                 <button style={{display:'contents'}} onClick={handleUpvote}>
                 <img id='upvote-svg' src={upvoteImg} alt='upvote' />
                 </button>
            </UpvoteCtn>
            
       
    )
}

const UpvoteCtn = styled.div `
    display:flex;
    justify-content: space-evenly;
    margin: 10px;
`
const Counter = styled.span `
    margin: 5px;
`