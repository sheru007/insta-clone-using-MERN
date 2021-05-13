import React,{useContext, useRef, useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {UserContext} from "../App"
import M from 'materialize-css'

const NavBar = () => {

    const searchModal = useRef(null)
    const {state, dispatch}  = useContext(UserContext)
    const history = useHistory()
    const [search, setSearch] = useState("")
    const [userDetails, setUserDetails] = useState([])
    
    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])

    const renderList = ()=>{
        if(state)
        {
            return [
                <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,

                
                <li key="2"><Link to="/createpost">Create Post</Link></li>,
                <li key="3"><Link to="/subscribedposts">Subscribed Posts</Link></li>,
                <li key="4">
                    <Link to="/profile">
                        <img style={{ width: "40px", height: "40px", borderRadius: "80px", margin: "13px -9px 2px -11px", border: "2px solid black" }}
                                        src={state.pic}
                                        alt="dp"
                        />
                    </Link>
                </li>,
                <li key="5">
                    <button className="btn waves-effect waves-light .#6a1b9a purple darken-3" 
                    onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                    }}
                    >
                    Logout
                    
                    </button>
                </li>
                
            ]
        }
        else{
            return [
                <li key="6"><Link to="/signin">Sign-in</Link></li>,
                <li key="7"><Link to="/signup">Sign-up</Link></li>
            ]
        }
    }

    const fetchUser = (query)=>{
        setSearch(query)
        fetch('/search-users',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                query

            })       
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setUserDetails(result.user)
        })

    }

    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state?"/":"/signin"} className="brand-logo left">apnaInsta</Link>
                <ul id="nav-mobile" className="right">
                   {renderList()}
                    
                </ul>
            </div>
            <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
                <div className="modal-content">
                    <input 
                    type="text" 
                    placeholder="search user"
                    value={search}
                    onChange = {(e)=>fetchUser(e.target.value)}
                    />
                     <ul className="collection">
                        {   userDetails &&
                            userDetails.map(item=>{

                                return <Link to={item._id === state._id?"/profile":"/profile/"+item._id}>
                                            <li className="collection-item" onClick={()=>{
                                                    M.Modal.getInstance(searchModal.current).close()
                                                    setSearch("")
                                                }}>
                                                <img style={{ width: "40px", height: "40px", borderRadius: "80px", margin:"1px 4px -7px 3px",border:"2px solid black"}}
                                                            src={item.pic}
                                                            alt="dp"
                                                />
                                                {item.name}
                                            </li>
                                        </Link>
                            })
                            
                        }
                        
                        
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch("")}>close</button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar