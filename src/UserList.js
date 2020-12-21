import React, {useEffect} from 'react';


const User = React.memo(function User({user, onRemove, onToggle}) {
	const {username, email, id, active } =user;

	useEffect(() =>{  //컴포넌트가 나타날때
	//	console.log(user);
		return() =>{ //컴포넌트가 사라질대
//			console.log(user);
		}
	}, [user]);

	return(
		<div>
		<b style={{
			color:active ? 'green' : 'black',
			cursor:'pointer'
			}}
			onClick={()=> onToggle(id)}
			>{username}</b><span>({email})</span>
		<button onClick = {()=>onRemove(id)}>삭제</button>
	</div>
	)
})

function UserList({users, onRemove, onToggle}){
	

	return(
		<>
		{/* <User user={users[0]}></User>
		<User user={users[1]}></User>
		<User user={users[2]}></User> */}
		{
			users.map(
				(user, idex) => 
					<User 
						user = {user} 
						key={user.id} 
						onRemove={onRemove}
						onToggle={onToggle}
					/>
				
			) 
		}
		</>
	)
}


export default React.memo(UserList);