import React,{useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Reset = ()=>{

    
    const history = useHistory()
    
    
    const [email, setEmail] = useState("")


    const PostData = ()=>{

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            return M.toast({html: "invalid email" ,classes:"#c62828 red darken-3"})

        fetch("/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
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
                <input 
                type="text" 
                placeholder="Email"
                value={email}
                onChange = {(e)=>setEmail(e.target.value)}
                />
                
                <button className="btn waves-effect waves-light .#6a1b9a purple darken-3" onClick={()=>PostData()}>
                    Reset Password
                    
                </button>
               
            </div>
        </div>
    )
}
export default Reset