import React, { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '../../App'
import M from 'materialize-css'


const Profile = () => {

    const [mypics, setMypics] = useState([])
    
    const { state, dispatch } = useContext(UserContext)
    const [image,setImage] = useState("")
    const searchModal = useRef(null)
    useEffect(()=>{
        M.Tabs.init(searchModal.current)
    },[])

    useEffect(() => {
        
       

        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setMypics(result.myposts)
                // console.log(window.location.protocol)
                
            })
    }, [])

    useEffect(()=>{
        if(image)
        {
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","insta-clone")
            data.append("cloud_name","sk007")
    
            // for pic upload 
            fetch(" https://api.cloudinary.com/v1_1/sk007/image/upload",{
                method:"post",
                body:data
                })
                .then(res=>res.json())
                .then(data=>{

                    fetch('/updatepic',{
                        method:"put",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("jwt")
                        },
                        body:JSON.stringify({
                            pic:data.url
                        })
                    }).then(res=>res.json())
                    .then(result=>{
                        console.log(result)
                        localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                        dispatch({type:"UPDATEPIC",payload:result.pic})
                        // window.location.reload()
                    })

                })
                .catch(err=>{
                    console.log(err)
                })


        }
    },[image])
    
    const updatePhoto = (filee)=>{
        setImage(filee)
       }

               
        
    return (
       
                    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                        <div style={{
                            margin: "18px 0px",
                            borderBottom: "1px solid grey"
                        }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-around",
                                
                                }}>
                                <div>
                                    <img style={{ width: "160px", height: "160px", borderRadius: "80px",border:"2px solid black" }}
                                        src={state?state.pic:"loading"}
                                        alt="dp"
                                    />
                                </div>
                                <div>
                                    <h4>{state ? state.name : "loading..."}</h4>
                                    <h5>{state ? state.email : "loading..."}</h5>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "108%"
                                    }}>
                                        <h6>{mypics?mypics.length:"loading..."} Post</h6>

                                        <h6>{state ? state.followers.length : "loading..."} Follower</h6>
                                        <h6>{state ? state.following.length : "loading..."} Follow</h6>

                                    </div>
                                </div>
                            </div>
                            <div className="file-field input-field" style={{margin:"10px"}}>
                                <div className="btn .#6a1b9a purple darken-3">
                                    <span>Update Pic</span>
                                    <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])}/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                               
                        </div>
                        <div  className="row">
                                <div className="col s12">
                                    <ul ref={searchModal} class="tabs">
                                        <li   id="mp"  className="tab col s6 ">
                                            <a className="active" href="#myposts">
                                            <i className="material-icons"
                                                        style={{ float: "center" }}
                                                        
                                            >border_all</i>
                                            </a>
                                        </li>
                                        <li id="mb" className="tab col s6">
                                            <a  href="#mysaved">
                                            <i className="material-icons"
                                                        style={{ float: "center" }}
                                                        
                                            >collections_bookmark</i>
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>

                                <div id="myposts" className="col s12">
                                    <div className="gallery">
                            
                                        {
                                                mypics.map(item => {
                                                    return (
                                                        <img key={item._id} className="item" src={item.photo} alt={item.title} style={{margin:"3px"}} />
                                                    )
                                                })
                                            }

                                    </div>
                                </div>

                                <div id="mysaved" className="col s12">
                                    <div className="gallery">
                                
                                        {state
                                            ?
                                               state.bookmark.map(item => {
                                                    return (
                                                        <img key={item._id} className="item" src={item.photo} alt={item.title} style={{margin:"3px"}}/>
                                                    )
                                                })
                                            :
                                            <h3>loading..</h3>
                                        }
                                    </div>
                                </div>
                               
                        </div>
                        
                    </div>
                   

    )
}
export default Profile