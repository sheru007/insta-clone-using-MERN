import React,{useState, useContext} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'

import M from 'materialize-css'
const VerifyEmail = ()=>{

    
    const history = useHistory()
    
    
    const {token} = useParams()
    // console.log(token)

    const PostData = ()=>{

        

        fetch("/email-verify",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                
                token
                
            })
        }).then(res=>res.json()).then(data=>{
            // console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
               
                M.toast({html:data.message,classes:"#388e3c green darken-2"})
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }


    return(
        <div className = 'mycard'>
            <div className="card auth-card input-field">
                <h2>apnaInsta</h2>
                
                
                <button className="btn waves-effect waves-light .#6a1b9a purple darken-3" onClick={()=>PostData()}>
                    Verify your Email
                    
                </button>
                
            </div>
        </div>
    )
}
export default VerifyEmail