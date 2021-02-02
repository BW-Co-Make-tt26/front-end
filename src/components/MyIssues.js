import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import MyIssuesCard from './MyIssuesCard'

export default function MyIssues(props) {

    const [myIssues, setMyIssues] = useState([])

    const curUser = JSON.parse(localStorage.getItem('user')) // get user data
    const curUserId = curUser.user_id                       // target user_id to filter through all issues


    useEffect(() => {                                        // get data issues array
        axiosWithAuth()
        .get(`/api/issues/`)
        .then(res => {
            setMyIssues(res.data)
        })
    }, [])
    console.log(myIssues)


    const myIssuesArr = myIssues.filter(item => item.user_id === curUserId ? item : null )  // myIssues Array
    console.log(myIssuesArr)
    
    return (
        <>
        <h2>My Issues</h2>
            <div className='issues-container'>
                {myIssuesArr.map((item, index) => {
                    return <MyIssuesCard key={index} issue={item}/>
                })}
            </div>
        </>
    )
}
