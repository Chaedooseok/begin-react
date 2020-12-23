import React, {useMemo, useRef, useReducer, useCallback }  from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';





function countActiveUsers(users){
	console.log('활성 사용자 수를 세는 중...');
	return users.filter(user=>user.active).length;
}

const initialState={
  inputs:{
    username:'',
    email:''
  },
  users : [   //배열을 컴포넌트 상태로 관리하기... 그래야 업데이트 칠수 있다. 그래서 useState를 슨다.
    {
      id : 1,
      username: 'dschae',
      email : 'dschae@naver.com',
      active: true
    },
    {
      id : 2,
      username: 'dschae2',
      email : 'dschae2@naver.com',
      active: false
    },
    {
      id : 3,
      username: 'dschae3',
      email : 'dschae3@naver.com',
      active: false
    },
   
  ]

}

function reducer(state, action){
  switch (action.type){
    case 'CHANGE_INPUT':
      return{
        ...state,
        inputs : {
          ...state.inputs,
          [action.name]:action.value
        }
      };
    case 'CREATE_USERS':
      return {
        inputs: initialState.inputs,
        users : state.users.concat(action.user)
      }
    case 'TOGGLE_USER':
      return{
        ...state,
        users:state.users.map(user=>
          user.id === action.id
            ? { ...user, active : !user.active}
            : user
          )
      }
    case 'REMOVE_USER':
      return{
        ...state,
        users:state.users.filter(user=> user.id !==action.id)
      }
    default:
      throw new Error('Unhandled action');
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type : 'CHANGE_INPUT',
      name,
      value
    })
  }, []);

  const onCreate = useCallback(()=>{
    dispatch({
      type:'CREATE_USERS',
      user:{
        id:nextId.current,
        username,
        email
      }
    })
  }, [username, email]);

  const onToggle = useCallback((id)=>{
    dispatch({
      type:'TOGGLE_USER',
      id
    })
  },[]);

  const onRemove = useCallback(id =>{
    dispatch({
      type:'REMOVE_USER',
      id
    })
  },[]);

  const count = useMemo(()=> countActiveUsers(users),[users]);
  //const count = countActiveUsers(users);
  nextId.current += 1;
  console.log(count);
	return (
    
	   <>
			<CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        
			/>
		 <UserList 
		 	users = {users}
      onToggle = {onToggle} 
      onRemove={onRemove}
		/>
		<div>활성 사용자 수 : {count}</div>
	   </>
	)
}

export default App;