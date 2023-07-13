import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';



// Тут список пользователей: https://reqres.in/api/users

function App() {

  const[users,setUsers]= React.useState([]);
  const[isLoading,setLoading]= React.useState(true);
  const[searchValue,setSearchValue]= React.useState('');
  const[invites,setInvites]= React.useState([3,1]);

  React.useEffect(()=>{
    fetch('https://reqres.in/api/users')
    .then(res=>res.json()).then(json=>{
      setUsers(json.data);
    }).catch(err=>{
      console.log(err);
      alert("Error load data")
    }).finally(()=>setLoading(false));
  }, []); 

const onChangeSearchValue=(e)=>{
  setSearchValue(e.target.value);
}

const onClickInvite=(id)=>{
  if(invites.includes(id)){
    setInvites(prev=>prev.filter(_id=>_id!==id));
  } else {
    setInvites(prev=>[...prev,id]);
  }
}

  return (
    <div className="App">
      <Users 
      onChangeSearchValue={onChangeSearchValue}
      searchValue={searchValue}
       items={users} 
       isLoading={isLoading}
       invites={invites}
       onClickInvite={onClickInvite}
       />
      {/* <Success /> */}
    </div>
  );
}

export default App;
