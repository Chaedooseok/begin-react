import React, {useMemo, useRef, useReducer, useCallback,createContext }  from 'react';
import produce from 'immer';

import CreateUser from './CreateUser';
import UserList from './UserList';


//window.produce = produce;
function countActiveUsers(users){
	console.log('활성 사용자 수를 세는 중...');
	return users.filter(user=>user.active).length;
}

export const UserDispatch  = createContext(null);
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
		return produce(state, draft =>{
			draft.users.push(action.user);
		} )
    //   return {
    //     inputs: initialState.inputs,
    //     users : state.users.concat(action.user)
    //   }
    case 'TOGGLE_USER':
		return produce(state, draft =>{
			const user = draft.users.find(user => user.id === action.id);
			user.active = !user.active;
		})
    //   return{
    //     ...state,
    //     users:state.users.map(user=>
    //       user.id === action.id
    //         ? { ...user, active : !user.active}
    //         : user
    //       )
    //   }
    case 'REMOVE_USER':
		return produce(state, draft =>{
			const index = draft.users.findIndex(user => user.id === action.id);
			draft.users.splice(index, 1);
		})
    //   return{
    //     ...state,
    //     users:state.users.filter(user=> user.id !==action.id)
    //   }
    default:
      throw new Error('Unhandled action');
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const { users } = state;

  

 
  const count = useMemo(()=> countActiveUsers(users),[users]);

  console.log(count);
	return (
    
	   <UserDispatch.Provider value = {dispatch} >
			  <CreateUser
          // username={username}
          // email={email}
          // onChange={onChange}
          // onCreate={onCreate}
        />
		    <UserList 
		 	    users = {users}
        
		    />
		    <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
	)
}

export default App;