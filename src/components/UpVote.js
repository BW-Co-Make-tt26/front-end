import React from 'react';
import styled from "styled-components";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import upvoteImg from '../images/upvote.svg'


export default function UpVote({issue}) {

    const handleUpvote = () => {
    
        const addVote = {
          upvotes: issue.upvotes + 1
        }
      
        console.log(addVote)
        axiosWithAuth()
        .put(`/api/issues/${issue.id}/upvotes`, addVote)
        .then(res => {
           // history.push('/issue-board')
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


// class Upvote extends React.Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             count: 0,
//             addend: 0 // either 1, 0, or -1
//         }
//     }

//     toggleIncrement = () => {
//         this.setState(prevState => ({
//             addend: prevState.addend === 1 ? 0 : 1
//         }))
//     }


//     render() {
//         return (
//             <UpvoteCtn className='upvote-ctn'>
//                 <Counter className='counter'>{this.props.issue.upvotes + this.state.count + this.state.addend}</Counter>
//                 <button style={{display:'contents'}}onClick={this.toggleIncrement}>
//                 <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M15 30C23.2863 30 30 23.2863 30 15C30 6.71371 23.2863 0 15 0C6.71371 0 0 6.71371 0 15C0 23.2863 6.71371 30 15 30ZM15 2.90323C21.6835 2.90323 27.0968 8.31653 27.0968 15C27.0968 21.6835 21.6835 27.0968 15 27.0968C8.31653 27.0968 2.90323 21.6835 2.90323 15C2.90323 8.31653 8.31653 2.90323 15 2.90323ZM16.2097 22.7419H13.7903C13.3911 22.7419 13.0645 22.4153 13.0645 22.0161V15H9.0121C8.36492 15 8.04435 14.2198 8.49798 13.7601L14.4859 7.77218C14.7702 7.4879 15.2298 7.4879 15.5141 7.77218L21.502 13.7601C21.9617 14.2198 21.6351 15 20.9879 15H16.9355V22.0161C16.9355 22.4153 16.6089 22.7419 16.2097 22.7419Z" fill="#7000FF"/>
//                 </svg>
//                 </button>
//             </UpvoteCtn>
//         );
//     }
// }

// export default Upvote;

const UpvoteCtn = styled.div `
    display:flex;
    justify-content: space-evenly;
    margin: 10px;
`
const Counter = styled.span `
    margin: 5px;
`