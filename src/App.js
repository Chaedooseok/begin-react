import React, {useMemo, useRef, useState, useCallback }  from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';





function countActiveUsers(users){
	console.log('활성 사용자 수를 세는 중...');
	return users.filter(user=>user.active).length;
}


function App() {


const [inputs, setInputs] = useState({
	username: '',
	email : ''
});
const { username, email} = inputs;
const onChange = useCallback(e =>{
	const { name, value	} = e.target;
	setInputs({
		...inputs, 
		[name] : value
	})
},[inputs]);



const [users, setUsers] = useState( [   //배열을 컴포넌트 상태로 관리하기... 그래야 업데이트 칠수 있다. 그래서 useState를 슨다.
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
	{
		id : 4,
		username: 'dschae4',
		email : 'dschae4@naver.com',
		active: false
	},
])



const nextId = useRef(5);
const onCreate =useCallback(()=>{
	const user = {
		id : nextId.current,
		username,
		email,
	};
	setUsers([users =>users.concat(user)]);

	
	setInputs({
		username:'',
		email:''
	})
	//console.log(username);
	console.log(nextId.current);
	nextId.current += 1;	

},[email, username]);

const onToggle = useCallback(id =>{
	setUsers(users =>users.map(
		user=> user.id ===id
			? { ...user, active:!user.active}
			: user
	))

},[]);
const onRemove  = useCallback(id =>{
	setUsers(users =>users.filter(user=> user.id !== id));


},[]);
const count = useMemo(()=>countActiveUsers(users), [users]);
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
			 onRemove={onRemove}
			 onToggle={onToggle}
		/>
		<div>활성 사용자 수 : {count}</div>
	   </>
	)
}

export default App;
