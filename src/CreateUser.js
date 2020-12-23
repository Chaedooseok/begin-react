import React, { useContext, useRef }  from 'react';
import { UserDispatch} from './App';
import useInputs from './useInputs';

function CreateUser() {
    const nextId = useRef(4);
    const dispatch = useContext(UserDispatch);
    const [form, onChange, reset] = useInputs({
        username:'',
        email:''
    });
    const { username, email } = form;

    const onCreate =()=>{
        dispatch({
            type:'CREATE_USERS',
            user:{
            id:nextId.current,
            username,
            email
            }
        })
    
    reset();
    nextId.current += 1;
    };
    return (
    <div>
        <input 
            name ='username'
            placeholder="계정명"
            onChange={onChange}
            
            value = {username}
        />        
        <input 
            name ='email'
            placeholder="이메일"
            onChange={onChange}
            
            value = {email}
        />                    
        <button onClick ={onCreate} >등록</button>
    </div>
    )
}


export default CreateUser ;