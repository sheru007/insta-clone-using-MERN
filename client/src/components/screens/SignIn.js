import React,{useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
const Signin = ()=>{

    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")


    const PostData = ()=>{

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            return M.toast({html: "invalid email" ,classes:"#c62828 red darken-3"})

        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user)) 
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signed In success",classes:"#388e3c green darken-2"})
                history.push('/')
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
                <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange = {(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light .#6a1b9a purple darken-3" onClick={()=>PostData()}>
                    Login
                    
                </button>
                <h4>
                    <Link to="/signup">Need Account ? </Link>
                </h4>
                <h6>
                    <Link to="/reset">Forgot password ?</Link>
                </h6>
            </div>
        </div>
    )
}
export default Signin