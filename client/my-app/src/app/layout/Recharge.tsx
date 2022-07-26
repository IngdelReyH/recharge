import React, {Component, useEffect, useState, Fragment, useSyncExternalStore, useContext} from 'react';

import { Route, Routes } from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import { ListFormat } from 'typescript';
import HomePage from '../../features/home/HomePage';
import NavBarR from '../../features/nav/NavBarR';
import RecargaDashboard from '../../features/recargas/dashboard/RecargaDashboard';
import RecargaForm from '../../features/recargas/form/RecargaForm';
import LoginForm from '../../features/user/LoginForm';
import agentR from '../api/agentR';
import { IRecarga } from '../models/recarga';
import { IUser } from '../models/user';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify'
import { RootStoreContext } from '../stores/rootStore';
import ModalContainer from '../common/modals/ModalContainer';
import RegisterForm from '../../features/user/RegisterForm';
import Compras from '../../features/compras/Compras';
import Shopping from '../../features/compras/Shopping';
import ListaUsers from '../../features/user/ListaUsers';
import NavBarU from '../../features/nav/NavBarU';
import UserDashboard from '../../features/user/UserDashboard';
import Trash from './Trash';


import StripeApp from '../../features/compras/StripeApp';
import ComprasCompletion from '../../features/compras/ComprasCompletion';
import RecargaListAttendees from '../../features/recargas/dashboard/RecargaListAttendees';
import ComprasDashboard from '../../features/recargas/dashboard/ComprasDashboard';
import NavBarC from '../../features/nav/NavBarC';
import PrivateRoute from './PrivateRoute';




const Recharge= () => {
 const rootStore = useContext(RootStoreContext);
 const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
 const {getUser,estaLogeao} = rootStore.userStore;

 useEffect(()=> {
  if(token){
    getUser().finally(() => setAppLoaded())
  } else {
    setAppLoaded()
  }
 },[getUser,setAppLoaded,token])


 const [recargas, setRecargas]= useState<IRecarga[]>([])
 const [selectedRecarga,setSelectedRecarga]= useState<IRecarga | null>(null);
 const [editMode,setEditMode]= useState(false);



  const handleSelectRecarga = (id: string)=>{
    setSelectedRecarga(recargas.filter(r => r.id === id)[0]);
    setEditMode(false);

  }
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
  const handleCreateRecarga = (recarga: IRecarga) =>{
    agentR.Recargas.create(recarga).then(()=>{
    setRecargas([...recargas,recarga]);
    setSelectedRecarga(recarga);
    setEditMode(false);
    })
  }

  const handleEditRecarga = (recarga: IRecarga) =>{
    agentR.Recargas.update(recarga).then(()=>{
      setRecargas([...recargas.filter(r => r.id !== recarga.id),recarga]);
      setSelectedRecarga(recarga);
      setEditMode(false);
    }) 
  }

  const handleDeleteRecarga = (id: string)=>{
    agentR.Recargas.delete(id).then(()=>{
      setRecargas([...recargas.filter(r => r.id !== id)])
    })
    
  }

//para recargas
  useEffect(()=>{
    agentR.Recargas.list()
     .then((response)=>{
      setRecargas(response);
       console.log(response)
     });
    },[]);


    /*if(!appLoaded)
    { //recordarme de agregar el loading component pa q se vea bonito
      return <h1>loading...</h1>
    }*/

  return (
    <Fragment>
      <ModalContainer/>
      <ToastContainer position='bottom-right'/>
      <Container style={{marginRight: '7em', marginTop: 100}}>
        <Routes >
          <Route path='/' element={<HomePage/>}
         />
         <Route path='/recargas' element={<>
          <RecargaDashboard 
          recargas={recargas} 
          selectRecarga={handleSelectRecarga}
          selectedRecarga={selectedRecarga}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedRecarga={setSelectedRecarga}
          createRecarga={handleCreateRecarga}
          editRecarga={handleEditRecarga}
          deleteRecarga={handleDeleteRecarga}
          />
          <NavBarR openCreateFormR={handleOpenCreateFormR}/>
         </>
         }
          />
           
          <Route path='/createRecarga'  element={<>
            <RecargaForm 
            key={selectedRecarga && selectedRecarga.id || 0}
            setEditMode={setEditMode}
            recarga={selectedRecarga!}
            createRecarga={handleCreateRecarga}
            editRecarga={handleEditRecarga}
            />
            <NavBarR openCreateFormR={handleOpenCreateFormR}/>
          </>
          }
         />
         {/*<Route path='/privatetest' element={<PrivateRoute component={<NotFound/>}/>}/>*/}
        
         <Route path='/login' element={<LoginForm/>}/>
         <Route path='/register' element={<RegisterForm/>}/>
         {/*<Route path='/shopping' element={<Shopping/>}/>*/}
         <Route path='/shopping' element={<StripeApp/>}/>
         <Route path='/trash' element={<Trash/>}/>
         <Route path='/paymentcompletion' element={<ComprasCompletion />}/>
         <Route path='/historialrecarga' element={<>
         <ComprasDashboard />
         <NavBarC/>
         </>
        }/>
         <Route path='/users' element={<>
          <UserDashboard/>
          <NavBarU openCreateFormR={handleOpenCreateFormR}/>
         </>
         }/>
        
        </Routes>
        </Container>
    </Fragment>
);
};

export default Recharge;
    //mioooooooooooooo
   /* <Fragment>
      <ModalContainer/>
      <ToastContainer position='bottom-right'/>
      <Container style={{marginRight: '7em', marginTop: 100}}>
        <Routes >
          <Route path='/' element={<HomePage/>}
         />
         <Route path='/recargas' element={<>
          <RecargaDashboard 
          recargas={recargas} 
          selectRecarga={handleSelectRecarga}
          selectedRecarga={selectedRecarga}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedRecarga={setSelectedRecarga}
          createRecarga={handleCreateRecarga}
          editRecarga={handleEditRecarga}
          deleteRecarga={handleDeleteRecarga}
          />
          <NavBarR openCreateFormR={handleOpenCreateFormR}/>
         </>
         }
          />
           
          <Route path='/createRecarga'  element={<>
            <RecargaForm 
            key={selectedRecarga && selectedRecarga.id || 0}
            setEditMode={setEditMode}
            recarga={selectedRecarga!}
            createRecarga={handleCreateRecarga}
            editRecarga={handleEditRecarga}
            />
            <NavBarR openCreateFormR={handleOpenCreateFormR}/>
          </>
          }
         />
        <Route element={<NotFound/>}/>
         <Route path='/login' element={<LoginForm/>}/>
        
        
        </Routes>
        </Container>
    </Fragment>*/
      

    //falsoooooo
    /*
     <Fragment>
    <ModalContainer />
    <ToastContainer position='bottom-right' />
    <Routes>
    <Route  path='/' element={<HomePage/>} />
    <Route
      path={'/(.+)'}
      element={<>
      <Fragment>   
      <Container style={{marginRight: '7em', marginTop: 100}}>
        <Routes >
          
         <Route path='/recargas' element={<>
          <RecargaDashboard 
          recargas={recargas} 
          selectRecarga={handleSelectRecarga}
          selectedRecarga={selectedRecarga}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedRecarga={setSelectedRecarga}
          createRecarga={handleCreateRecarga}
          editRecarga={handleEditRecarga}
          deleteRecarga={handleDeleteRecarga}
          />
          <NavBarR openCreateFormR={handleOpenCreateFormR}/>
         </>
         }
          />
          <Route path='/createRecarga'  element={<>
            <RecargaForm 
            key={selectedRecarga && selectedRecarga.id || 0}
            setEditMode={setEditMode}
            recarga={selectedRecarga!}
            createRecarga={handleCreateRecarga}
            editRecarga={handleEditRecarga}
            />
            <NavBarR openCreateFormR={handleOpenCreateFormR}/>
          </>
          }
         />
        <Route element={<NotFound/>}/>
         <Route path='/login' element={<LoginForm/>}/>
        </Routes>
        </Container>
        </Fragment>
      </>
        
      }
    />
    </Routes>
   
  </Fragment>
    */