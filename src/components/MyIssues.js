import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import MyIssuesCard from './MyIssuesCard'
import { useHistory } from "react-router-dom";
import styled from "styled-components";


export default function MyIssues(props) {

    const [myIssues, setMyIssues] = useState([])

    const history = useHistory()

    const curUser = JSON.parse(localStorage.getItem('user')) // get user data
    const curUserId = curUser.user_id                       // target user_id to filter through all issues


    useEffect(() => {                                        // get data issues array
        axiosWithAuth()
        .get(`/api/issues`)
        .then(res => {
            setMyIssues(res.data)
        })
    }, [])


    const myIssuesArr = myIssues.filter(item => item.user_id === curUserId ? item : null )  // myIssues Array
    console.log(myIssuesArr)

    const goBack = () => {
        history.goBack()
      }
    
    return (
        <Container>
            <h2>My Issues</h2>
            <button onClick={goBack}>Issue Board</button>
            <div className='issues-container'>
                {myIssuesArr.map((item, index) => {
                    return <MyIssuesCard key={index} issue={item} myIssues={myIssuesArr} setMyIssues={setMyIssues}/>
                })}
            </div>
        </Container>
    )
}

const Container = styled.div `
  width: 30%;
  margin: auto; 
  text-align: center;
`
