import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import {Link} from 'react-router-dom'
const  SubscribedPosts = () => {

    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {

        // console.log("into into")
        fetch("/getsubpost", {
            headers: {

                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }

        }).then(res => res.json())
            .then(result => {
                // console.log("hiii ",result)
                setData(result.posts)
                
            })
    }, [])

    const likePost = (id) => {

        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const UnlikePost = (id) => {

        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }


    const makeComment = (text, postId) => {

        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })

        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)

            }).catch(err => {
                console.log(err)
            })
    }

    const deletePost = (postId) => {

    
        fetch(`/deletepost/${postId}`, {
            method: "delete",
            headers: {

                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }

        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })
    }

    const deleteComment = (postId,commentId) =>{

        fetch('/deletecomment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                commentId
            })

        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)

            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="home">
            {
                data.map(item => {
                    return (

                        <div className="card home-card" key={item._id}>
                            <h5 style={{padding:"6px",borderBottom: "1px solid grey"}}> 
                                    <img style={{ 
                                        width: "40px", 
                                        height: "40px", 
                                        borderRadius: "80px", 
                                        margin:"1px 4px -7px 3px",
                                        border:"2px solid black",
                                       
                                    }}
                                                src={item.postedBy.pic}
                                                alt="dp"
                                    />

                                    <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link>
                                                              
                                {
                                    item.postedBy._id === state._id &&
                                    <i className="material-icons"
                                        style={{ float: "right" }}
                                        onClick={() => deletePost(item._id)}
                                    >delete</i>
                                }
                            </h5>

                            <div className="card-image">
                                <img key={item._id} src={item.photo} alt={item.title} />
                            </div>
                            <div className="card-content">
                                
                                {item.likes.includes(state._id)
                                    ?
                                    <i className="material-icons"
                                        onClick={() => UnlikePost(item._id)}
                                    >thumb_down</i>
                                    :

                                    <i className="material-icons"
                                        onClick={() => likePost(item._id)}
                                    >thumb_up</i>
                                }


                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record => {
                                    
                                        return (
                                            <h6 key={record.key}><span style={{ fontWeight: "500" }}>{record.postedBy.name}</span>
                                             {
                                                record.postedBy._id === state._id &&
                                                <i className="material-icons"
                                                    style={{ float: "right" }}
                                                    onClick={() => deleteComment(item._id,record._id)}
                                                >delete</i>
                                            } {record.text}
                                             </h6>
                                            
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="add a comment!!" />
                                </form>
                            </div>
                        </div>

                    )
                })
            }



        </div>
    )
}
export default  SubscribedPosts