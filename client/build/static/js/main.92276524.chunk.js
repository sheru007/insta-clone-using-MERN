(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{16:function(e,t,a){e.exports=a(30)},21:function(e,t,a){},29:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),o=a(14),r=a.n(o),s=(a(21),a(3)),c=a(2),i=a(1),m=a.n(i);var d=()=>{const e=Object(l.useRef)(null),{state:t,dispatch:a}=Object(l.useContext)(w),o=Object(s.f)(),[r,i]=Object(l.useState)(""),[d,p]=Object(l.useState)([]);Object(l.useEffect)(()=>{m.a.Modal.init(e.current)},[]);return n.a.createElement("nav",null,n.a.createElement("div",{className:"nav-wrapper white"},n.a.createElement(c.b,{to:t?"/":"/signin",className:"brand-logo left"},"apnaInsta"),n.a.createElement("ul",{id:"nav-mobile",className:"right"},t?[n.a.createElement("li",{key:"1"},n.a.createElement("i",{"data-target":"modal1",className:"large material-icons modal-trigger",style:{color:"black"}},"search")),n.a.createElement("li",{key:"2"},n.a.createElement(c.b,{to:"/createpost"},"Create Post")),n.a.createElement("li",{key:"3"},n.a.createElement(c.b,{to:"/subscribedposts"},"Subscribed Posts")),n.a.createElement("li",{key:"4"},n.a.createElement(c.b,{to:"/profile"},n.a.createElement("img",{style:{width:"40px",height:"40px",borderRadius:"80px",margin:"13px -9px 2px -11px",border:"2px solid black"},src:t.pic,alt:"dp"}))),n.a.createElement("li",{key:"5"},n.a.createElement("button",{className:"btn waves-effect waves-light .#6a1b9a purple darken-3",onClick:()=>{localStorage.clear(),a({type:"CLEAR"}),o.push("/signin")}},"Logout"))]:[n.a.createElement("li",{key:"6"},n.a.createElement(c.b,{to:"/signin"},"Sign-in")),n.a.createElement("li",{key:"7"},n.a.createElement(c.b,{to:"/signup"},"Sign-up"))])),n.a.createElement("div",{id:"modal1",class:"modal",ref:e,style:{color:"black"}},n.a.createElement("div",{className:"modal-content"},n.a.createElement("input",{type:"text",placeholder:"search user",value:r,onChange:e=>{return t=e.target.value,i(t),void fetch("/search-users",{method:"post",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({query:t})}).then(e=>e.json()).then(e=>{p(e.user)});var t}}),n.a.createElement("ul",{className:"collection"},d&&d.map(a=>n.a.createElement(c.b,{to:a._id===t._id?"/profile":"/profile/"+a._id},n.a.createElement("li",{className:"collection-item",onClick:()=>{m.a.Modal.getInstance(e.current).close(),i("")}},n.a.createElement("img",{style:{width:"40px",height:"40px",borderRadius:"80px",margin:"1px 4px -7px 3px",border:"2px solid black"},src:a.pic,alt:"dp"}),a.name))))),n.a.createElement("div",{className:"modal-footer"},n.a.createElement("button",{className:"modal-close waves-effect waves-green btn-flat",onClick:()=>i("")},"close"))))};a(29);var p=()=>{const e=Object(l.useRef)(null),[t,a]=Object(l.useState)([]),{state:o,dispatch:r}=Object(l.useContext)(w);Object(l.useEffect)(()=>{fetch("/allpost",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then(e=>e.json()).then(e=>{a(e.posts)})},[]);return n.a.createElement("div",{className:"home"},t.map(l=>{return n.a.createElement("div",{className:"card home-card",key:l._id},n.a.createElement("h5",{style:{padding:"6px",borderBottom:"1px solid grey"}},n.a.createElement("img",{style:{width:"40px",height:"40px",borderRadius:"80px",margin:"1px 4px -7px 3px",border:"2px solid black"},src:l.postedBy.pic,alt:"dp"}),n.a.createElement(c.b,{to:l.postedBy._id!==o._id?"/profile/"+l.postedBy._id:"/profile"},l.postedBy.name),l.postedBy._id===o._id&&n.a.createElement("i",{className:"material-icons",style:{float:"right"},onClick:()=>{return e=l._id,void fetch("/deletepost/".concat(e),{method:"delete",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then(e=>e.json()).then(e=>{const l=t.filter(t=>t._id!==e._id);a(l)});var e}},"delete")),n.a.createElement("div",{className:"card-image"},n.a.createElement("img",{key:l._id,src:l.photo,alt:l.title})),n.a.createElement("div",{className:"card-content"},l.likes.includes(o._id)?n.a.createElement("i",{ref:e,className:"material-icons",onClick:()=>{return e=l._id,void fetch("/unlike",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:e})}).then(e=>e.json()).then(e=>{const l=t.map(t=>t._id===e._id?e:t);a(l)}).catch(e=>{console.log(e)});var e}},"thumb_down"):n.a.createElement("i",{className:"material-icons",onClick:()=>{return e=l._id,void fetch("/like",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:e})}).then(e=>e.json()).then(e=>{const l=t.map(t=>t._id===e._id?e:t);a(l)}).catch(e=>{console.log(e)});var e}},"thumb_up"),(s=o.bookmark,i=l._id,s.some(e=>e._id===i)?n.a.createElement("i",{className:"material-icons",style:{float:"right"},onClick:()=>(e=>{fetch("/removebookmark",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:e})}).then(e=>e.json()).then(e=>{r({type:"UPDATEBM",payload:{bookmark:e.bookmark}}),localStorage.setItem("user",JSON.stringify(e))}).catch(e=>{console.log(e)})})(l._id)},"bookmark"):n.a.createElement("i",{className:"material-icons",style:{float:"right"},onClick:()=>(e=>{fetch("/addbookmark",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:e})}).then(e=>e.json()).then(e=>{r({type:"UPDATEBM",payload:{bookmark:e.bookmark}}),localStorage.setItem("user",JSON.stringify(e))}).catch(e=>{console.log(e)})})(l._id)},"bookmark_border")),n.a.createElement("h6",null,l.likes.length," likes"),n.a.createElement("h6",null,l.title),n.a.createElement("p",null,l.body),l.comments.map(e=>n.a.createElement("h6",{key:e.key},n.a.createElement("span",{style:{fontWeight:"500"}},e.postedBy.name),e.postedBy._id===o._id&&n.a.createElement("i",{className:"material-icons",style:{float:"right"},onClick:()=>{return n=l._id,o=e._id,void fetch("/deletecomment",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:n,commentId:o})}).then(e=>e.json()).then(e=>{const l=t.map(t=>t._id===e._id?e:t);a(l)}).catch(e=>{console.log(e)});var n,o}},"delete")," ",e.text)),n.a.createElement("form",{onSubmit:e=>{var n,o;e.preventDefault(),n=e.target[0].value,o=l._id,""!==n&&fetch("/comment",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:o,text:n})}).then(e=>e.json()).then(e=>{const l=t.map(t=>t._id===e._id?e:t);a(l)}).catch(e=>{console.log(e)}),e.target[0].value=""}},n.a.createElement("input",{type:"text",placeholder:"add a comment!!"}))));var s,i}))};var h=()=>{const[e,t]=Object(l.useState)([]),{state:a,dispatch:o}=Object(l.useContext)(w),[r,s]=Object(l.useState)(""),c=Object(l.useRef)(null);Object(l.useEffect)(()=>{m.a.Tabs.init(c.current)},[]),Object(l.useEffect)(()=>{fetch("/mypost",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then(e=>e.json()).then(e=>{t(e.myposts)})},[]),Object(l.useEffect)(()=>{if(r){const e=new FormData;e.append("file",r),e.append("upload_preset","insta-clone"),e.append("cloud_name","sk007"),fetch(" https://api.cloudinary.com/v1_1/sk007/image/upload",{method:"post",body:e}).then(e=>e.json()).then(e=>{fetch("/updatepic",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({pic:e.url})}).then(e=>e.json()).then(e=>{console.log(e),localStorage.setItem("user",JSON.stringify({...a,pic:e.pic})),o({type:"UPDATEPIC",payload:e.pic})})}).catch(e=>{console.log(e)})}},[r]);return n.a.createElement("div",{style:{maxWidth:"550px",margin:"0px auto"}},n.a.createElement("div",{style:{margin:"18px 0px",borderBottom:"1px solid grey"}},n.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}},n.a.createElement("div",null,n.a.createElement("img",{style:{width:"160px",height:"160px",borderRadius:"80px",border:"2px solid black"},src:a?a.pic:"loading",alt:"dp"})),n.a.createElement("div",null,n.a.createElement("h4",null,a?a.name:"loading..."),n.a.createElement("h5",null,a?a.email:"loading..."),n.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",width:"108%"}},n.a.createElement("h6",null,e?e.length:"loading..."," Post"),n.a.createElement("h6",null,a?a.followers.length:"loading..."," Follower"),n.a.createElement("h6",null,a?a.following.length:"loading..."," Follow")))),n.a.createElement("div",{className:"file-field input-field",style:{margin:"10px"}},n.a.createElement("div",{className:"btn .#6a1b9a purple darken-3"},n.a.createElement("span",null,"Update Pic"),n.a.createElement("input",{type:"file",onChange:e=>{return t=e.target.files[0],void s(t);var t}})),n.a.createElement("div",{className:"file-path-wrapper"},n.a.createElement("input",{className:"file-path validate",type:"text"})))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col s12"},n.a.createElement("ul",{ref:c,class:"tabs"},n.a.createElement("li",{id:"mp",className:"tab col s6 "},n.a.createElement("a",{className:"active",href:"#myposts"},n.a.createElement("i",{className:"material-icons",style:{float:"center"}},"border_all"))),n.a.createElement("li",{id:"mb",className:"tab col s6"},n.a.createElement("a",{href:"#mysaved"},n.a.createElement("i",{className:"material-icons",style:{float:"center"}},"collections_bookmark"))))),n.a.createElement("div",{id:"myposts",className:"col s12"},n.a.createElement("div",{className:"gallery"},e.map(e=>n.a.createElement("img",{key:e._id,className:"item",src:e.photo,alt:e.title,style:{margin:"3px"}})))),n.a.createElement("div",{id:"mysaved",className:"col s12"},n.a.createElement("div",{className:"gallery"},a?a.bookmark.map(e=>n.a.createElement("img",{key:e._id,className:"item",src:e.photo,alt:e.title,style:{margin:"3px"}})):n.a.createElement("h3",null,"loading..")))))};var u=()=>{const[e,t]=Object(l.useState)(null),[a,o]=Object(l.useState)(!0),{state:r,dispatch:c}=Object(l.useContext)(w),{userid:i}=Object(s.g)();Object(l.useEffect)(()=>{fetch("/user/".concat(i),{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then(e=>e.json()).then(e=>{t(e)})},[]);return n.a.createElement(n.a.Fragment,null,e&&r?n.a.createElement("div",{style:{maxWidth:"550px",margin:"0px auto"}},n.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid grey"}},n.a.createElement("div",null,n.a.createElement("img",{style:{width:"160px",height:"160px",borderRadius:"80px",border:"2px solid black"},src:e.user.pic,alt:"dp"})),n.a.createElement("div",null,n.a.createElement("h4",null,e.user.name),n.a.createElement("h6",null,e.user.email),n.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",width:"108%"}},n.a.createElement("h6",null,e.post.length," Post"),n.a.createElement("h6",null,e.user.followers.length," Follower"),n.a.createElement("h6",null,e.user.following.length," Follow")),(m=e.user.followers,d=r._id,m.some(e=>e===d)?n.a.createElement("button",{style:{margin:"10px"},className:"btn waves-effect waves-light .#6a1b9a purple darken-3",onClick:()=>{fetch("/unfollow",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({unfollowId:i})}).then(e=>e.json()).then(e=>{c({type:"UPDATE",payload:{following:e.following,followers:e.followers}}),localStorage.setItem("user",JSON.stringify(e)),t(t=>{const a=t.user.followers.filter(t=>t!==e._id);return{...t,user:{...t.user,followers:a}}}),o(!0)})}},"UnFollow"):n.a.createElement("button",{style:{margin:"10px"},className:"btn waves-effect waves-light .#6a1b9a purple darken-3",onClick:()=>{fetch("/follow",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({followId:i})}).then(e=>e.json()).then(e=>{c({type:"UPDATE",payload:{following:e.following,followers:e.followers}}),localStorage.setItem("user",JSON.stringify(e)),t(t=>({...t,user:{...t.user,followers:[...t.user.followers,e._id]}})),o(!1)})}},"Follow")))),n.a.createElement("div",{className:"gallery"},e.post.map(e=>n.a.createElement("img",{key:e._id,className:"item",src:e.photo,alt:e.title})))):n.a.createElement("h2",null,"loading..."));var m,d};var g=()=>{const{state:e,dispatch:t}=Object(l.useContext)(w),a=Object(s.f)(),[o,r]=Object(l.useState)(""),[i,d]=Object(l.useState)("");return n.a.createElement("div",{className:"mycard"},n.a.createElement("div",{className:"card auth-card input-field"},n.a.createElement("h2",null,"apnaInsta"),n.a.createElement("input",{type:"text",placeholder:"Email",value:i,onChange:e=>d(e.target.value)}),n.a.createElement("input",{type:"password",placeholder:"Password",value:o,onChange:e=>r(e.target.value)}),n.a.createElement("button",{className:"btn waves-effect waves-light .#6a1b9a purple darken-3",onClick:()=>(()=>{if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(i))return m.a.toast({html:"invalid email",classes:"#c62828 red darken-3"});fetch("/signin",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o,email:i})}).then(e=>e.json()).then(e=>{console.log(e),e.error?m.a.toast({html:e.error,classes:"#c62828 red darken-3"}):(localStorage.setItem("jwt",e.token),localStorage.setItem("user",JSON.stringify(e.user)),t({type:"USER",payload:e.user}),m.a.toast({html:"Signed In success",classes:"#388e3c green darken-2"}),a.push("/"))}).catch(e=>{console.log(e)})})()},"Login"),n.a.createElement("h4",null,n.a.createElement(c.b,{to:"/signup"},"Need Account ? ")),n.a.createElement("h6",null,n.a.createElement(c.b,{to:"/reset"},"Forgot password ?"))))};var E=()=>{const e=Object(s.f)(),[t,a]=Object(l.useState)(""),[o,r]=Object(l.useState)(""),[i,d]=Object(l.useState)(""),[p,h]=Object(l.useState)(""),[u,g]=Object(l.useState)(void 0);Object(l.useEffect)(()=>{u&&E()},[u]);const E=()=>{if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(i))return m.a.toast({html:"invalid email",classes:"#c62828 red darken-3"});fetch("/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,password:o,email:i,pic:u})}).then(e=>e.json()).then(t=>{console.log(t),t.error?m.a.toast({html:t.error,classes:"#c62828 red darken-3"}):(m.a.toast({html:t.message,classes:"#388e3c green darken-2"}),e.push("/signin"))}).catch(e=>{console.log(e)})},y=()=>{p?(()=>{const e=new FormData;e.append("file",p),e.append("upload_preset","insta-clone"),e.append("cloud_name","sk007"),fetch(" https://api.cloudinary.com/v1_1/sk007/image/upload",{method:"post",body:e}).then(e=>e.json()).then(e=>{g(e.url)}).catch(e=>{console.log(e)})})():E()};return n.a.createElement("div",{className:"mycard"},n.a.createElement("div",{className:"card auth-card input-field"},n.a.createElement("h2",null,"apnaInsta"),n.a.createElement("input",{type:"text",placeholder:"Name",value:t,onChange:e=>a(e.target.value)}),n.a.createElement("input",{type:"text",placeholder:"Email",value:i,onChange:e=>d(e.target.value)}),n.a.createElement("input",{type:"password",placeholder:"Password",value:o,onChange:e=>r(e.target.value)}),n.a.createElement("div",{className:"file-field input-field"},n.a.createElement("div",{className:"btn .#6a1b9a purple darken-3"},n.a.createElement("span",null,"Upload Pic"),n.a.createElement("input",{type:"file",onChange:e=>h(e.target.files[0])})),n.a.createElement("div",{className:"file-path-wrapper"},n.a.createElement("input",{className:"file-path validate",type:"text"}))),n.a.createElement("button",{className:"btn waves-effect waves-light .#6a1b9a purple darken-3",onClick:()=>y()},"Sign Up"),n.a.createElement("h6",null,n.a.createElement(c.b,{to:"/signin"},"Already have an Account ? "))))};var y=()=>{const e=Object(s.f)(),[t,a]=Object(l.useState)(""),[o,r]=Object(l.useState)(""),[c,i]=Object(l.useState)(""),[d,p]=Object(l.useState)("");Object(l.useEffect)(()=>{d&&fetch("/createpost",{method:"post",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({title:o,body:t,pic:d})}).then(e=>e.json()).then(t=>{t.error?m.a.toast({html:t.error,classes:"#c62828 red darken-3"}):(m.a.toast({html:"created post successfully",classes:"#388e3c green darken-2"}),e.push("/"))}).catch(e=>{console.log(e)})},[d]);return n.a.createElement("div",{className:"card input-filed",style:{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}},n.a.createElement("input",{type:"text",placeholder:"Title",value:o,onChange:e=>r(e.target.value)}),n.a.createElement("input",{type:"text",placeholder:"Body",value:t,onChange:e=>a(e.target.value)}),n.a.createElement("div",{className:"file-field input-field"},n.a.createElement("div",{className:"btn .#6a1b9a purple darken-3"},n.a.createElement("span",null,"Upload Image"),n.a.createElement("input",{type:"file",onChange:e=>i(e.target.files[0])})),n.a.createElement("div",{className:"file-path-wrapper"},n.a.createElement("input",{className:"file-path validate",type:"text"}))),n.a.createElement("button",{className:"btn waves-effect waves-light .#6a1b9a purple darken-3",onClick:()=>(()=>{const e=new FormData;e.append("file",c),e.append("upload_preset","insta-clone"),e.append("cloud_name","sk007"),fetch(" https://api.cloudinary.com/v1_1/sk007/image/upload",{method:"post",body:e}).then(e=>e.json()).then(e=>{p(e.url)}).catch(e=>{console.log(e)})})()},"Post"))};var f=()=>{const[e,t]=Object(l.useState)([]),{state:a,dispatch:o}=Object(l.useContext)(w);Object(l.useEffect)(()=>{fetch("/getsubpost",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then(e=>e.json()).then(e=>{t(e.posts)})},[]);return n.a.createElement("div",{className:"home"},e.map(l=>n.a.createElement("div",{className:"card home-card",key:l._id},n.a.createElement("h5",{style:{padding:"6px",borderBottom:"1px solid grey"}},n.a.createElement("img",{style:{width:"40px",height:"40px",borderRadius:"80px",margin:"1px 4px -7px 3px",border:"2px solid black"},src:l.postedBy.pic,alt:"dp"}),n.a.createElement(c.b,{to:l.postedBy._id!==a._id?"/profile/"+l.postedBy._id:"/profile"},l.postedBy.name),l.postedBy._id===a._id&&n.a.createElement("i",{className:"material-icons",style:{float:"right"},onClick:()=>{return a=l._id,void fetch("/deletepost/".concat(a),{method:"delete",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then(e=>e.json()).then(a=>{const l=e.filter(e=>e._id!==a._id);t(l)});var a}},"delete")),n.a.createElement("div",{className:"card-image"},n.a.createElement("img",{key:l._id,src:l.photo,alt:l.title})),n.a.createElement("div",{className:"card-content"},l.likes.includes(a._id)?n.a.createElement("i",{className:"material-icons",onClick:()=>{return a=l._id,void fetch("/unlike",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:a})}).then(e=>e.json()).then(a=>{const l=e.map(e=>e._id===a._id?a:e);t(l)}).catch(e=>{console.log(e)});var a}},"thumb_down"):n.a.createElement("i",{className:"material-icons",onClick:()=>{return a=l._id,void fetch("/like",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:a})}).then(e=>e.json()).then(a=>{const l=e.map(e=>e._id===a._id?a:e);t(l)}).catch(e=>{console.log(e)});var a}},"thumb_up"),n.a.createElement("h6",null,l.likes.length," likes"),n.a.createElement("h6",null,l.title),n.a.createElement("p",null,l.body),l.comments.map(o=>n.a.createElement("h6",{key:o.key},n.a.createElement("span",{style:{fontWeight:"500"}},o.postedBy.name),o.postedBy._id===a._id&&n.a.createElement("i",{className:"material-icons",style:{float:"right"},onClick:()=>{return a=l._id,n=o._id,void fetch("/deletecomment",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:a,commentId:n})}).then(e=>e.json()).then(a=>{const l=e.map(e=>e._id===a._id?a:e);t(l)}).catch(e=>{console.log(e)});var a,n}},"delete")," ",o.text)),n.a.createElement("form",{onSubmit:a=>{var n,o;a.preventDefault(),n=a.target[0].value,o=l._id,fetch("/comment",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:o,text:n})}).then(e=>e.json()).then(a=>{const l=e.map(e=>e._id===a._id?a:e);t(l)}).catch(e=>{console.log(e)})}},n.a.createElement("input",{type:"text",placeholder:"add a comment!!"}))))))};var b=()=>{const e=Object(s.f)(),[t,a]=Object(l.useState)("");return n.a.createElement("div",{className:"mycard"},n.a.createElement("div",{className:"card auth-card input-field"},n.a.createElement("h2",null,"apnaInsta"),n.a.createElement("input",{type:"text",placeholder:"Email",value:t,onChange:e=>a(e.target.value)}),n.a.createElement("button",{className:"btn waves-effect waves-light .#6a1b9a purple darken-3",onClick:()=>(()=>{if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t))return m.a.toast({html:"invalid email",classes:"#c62828 red darken-3"});fetch("/reset-password",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})}).then(e=>e.json()).then(t=>{t.error?m.a.toast({html:t.error,classes:"#c62828 red darken-3"}):(m.a.toast({html:t.message,classes:"#388e3c green darken-2"}),e.push("/signin"))}).catch(e=>{console.log(e)})})()},"Reset Password")))};var v=()=>{const e=Object(s.f)(),[t,a]=Object(l.useState)(""),{token:o}=Object(s.g)();console.log(o);return n.a.createElement("div",{className:"mycard"},n.a.createElement("div",{className:"card auth-card input-field"},n.a.createElement("h2",null,"apnaInsta"),n.a.createElement("input",{type:"password",placeholder:"Enter New Password",value:t,onChange:e=>a(e.target.value)}),n.a.createElement("button",{className:"btn waves-effect waves-light .#6a1b9a purple darken-3",onClick:()=>{fetch("/new-password",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t,token:o})}).then(e=>e.json()).then(t=>{t.error?m.a.toast({html:t.error,classes:"#c62828 red darken-3"}):(m.a.toast({html:t.message,classes:"#388e3c green darken-2"}),e.push("/signin"))}).catch(e=>{console.log(e)})}},"Update Password")))};var j=()=>{const e=Object(s.f)(),{token:t}=Object(s.g)();return n.a.createElement("div",{className:"mycard"},n.a.createElement("div",{className:"card auth-card input-field"},n.a.createElement("h2",null,"apnaInsta"),n.a.createElement("button",{className:"btn waves-effect waves-light .#6a1b9a purple darken-3",onClick:()=>{fetch("/email-verify",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:t})}).then(e=>e.json()).then(t=>{t.error?m.a.toast({html:t.error,classes:"#c62828 red darken-3"}):(m.a.toast({html:t.message,classes:"#388e3c green darken-2"}),e.push("/signin"))}).catch(e=>{console.log(e)})}},"Verify your Email")))};const k=(e,t)=>"USER"===t.type?t.payload:"CLEAR"===t.type?null:"UPDATE"===t.type?{...e,followers:t.payload.followers,following:t.payload.following}:"UPDATEPIC"===t.type?{...e,pic:t.payload}:"UPDATEBM"===t.type?{...e,bookmark:t.payload.bookmark}:e,w=Object(l.createContext)(),N=()=>{const e=Object(s.f)(),{state:t,dispatch:a}=Object(l.useContext)(w);return Object(l.useEffect)(()=>{const t=JSON.parse(localStorage.getItem("user"));t?a({type:"USER",payload:t}):e.location.pathname.startsWith("/reset")||e.location.pathname.startsWith("/emailverify")||e.push("/signin")},[]),n.a.createElement(s.c,null,n.a.createElement(s.a,{exact:!0,path:"/"},n.a.createElement(p,null)),n.a.createElement(s.a,{path:"/signup"},n.a.createElement(E,null)),n.a.createElement(s.a,{path:"/signin"},n.a.createElement(g,null)),n.a.createElement(s.a,{exact:!0,path:"/profile"},n.a.createElement(h,null)),n.a.createElement(s.a,{path:"/profile/:userid"},n.a.createElement(u,null)),n.a.createElement(s.a,{path:"/createpost"},n.a.createElement(y,null)),n.a.createElement(s.a,{path:"/subscribedposts"},n.a.createElement(f,null)),n.a.createElement(s.a,{exact:!0,path:"/reset"},n.a.createElement(b,null)),n.a.createElement(s.a,{path:"/reset/:token"},n.a.createElement(v,null)),n.a.createElement(s.a,{path:"/emailverify/:token"},n.a.createElement(j,null)))};var x=function(){const[e,t]=Object(l.useReducer)(k,null);return n.a.createElement(w.Provider,{value:{state:e,dispatch:t}},n.a.createElement(c.a,null,n.a.createElement(d,null),n.a.createElement(N,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()}).catch(e=>{console.error(e.message)})}},[[16,1,2]]]);
//# sourceMappingURL=main.92276524.chunk.js.map