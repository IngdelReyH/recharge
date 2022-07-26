import React, {Component, useEffect, useState, Fragment, useSyncExternalStore} from 'react';
import { Route, Routes } from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import { ListFormat } from 'typescript';
import HomePage from '../../features/home/HomePage';

import NavBarR from '../../features/nav/NavBarR';


import agentR from '../api/agentR';
import ModalContainer from '../common/modals/ModalContainer';
import { IRecarga } from '../models/recarga';
import { IUser } from '../models/user';
import Recharge from './Recharge';

import Register from './Register';

const App= () => {

 const [editMode,setEditMode]= useState(false);
 
 const [recargas, setRecargas]= useState<IRecarga[]>([])
 const [selectedRecarga,setSelectedRecarga]= useState<IRecarga | null>(null);


 
//------------------------------------------------------------------------
 /* const handleOpenCreateForm =()=>{
     setSelectedUser(null);
     setEditMode(true);
  }*/
  const handleOpenCreateFormR =()=>{
    setSelectedRecarga(null);
    setEditMode(true);
 }

//-------------------------------------------------------------------

//para recargas
  useEffect(()=>{
    agentR.Recargas.list()
     .then((response)=>{
      setRecargas(response);
       console.log(response)
     });
    },[]);

    //--recordar poner lo del toast container
  return (
    <Recharge/>
      );
    };

    
   /* <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{marginRight: '7em', marginTop: 100}}>
        <Routes>
         <Route path='/' element={<HomePage
         key={selectedUser && selectedUser.id || 0}
         users={users}
         selectedUser={selectedUser!}
         />
         }/>
         <Route path='/users' element={
         <UserDashboard 
          users={users} 
          selectUser={handleSelectUser}
          selectedUser={selectedUser}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedUser={setSelectedUser}
          createUser={handleCreateUser}
          editUser={handleEditUser}
          deleteUser={handleDeleteUser}
          />}
          />
          <Route path='/createUser' element={
          <UserForm 
            key={selectedUser && selectedUser.id || 0}
            setEditMode={setEditMode}
            user={selectedUser!}
            createUser={handleCreateUser}
            editUser={handleEditUser}
         />}
         />
        </Routes>
        
     
      </Container>
    </Fragment>*/

export default App;


/* <UserDashboard 
      users={users} 
      selectUser={handleSelectUser}
      selectedUser={selectedUser}
      editMode={editMode}
      setEditMode={setEditMode}
      setSelectedUser={setSelectedUser}
      createUser={handleCreateUser}
      editUser={handleEditUser}
      deleteUser={handleDeleteUser}
      />*/
        /*<Register/>*/