import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {Button, Container, Menu, MenuItem, Image, Dropdown, DropdownMenu, DropdownItem} from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';

interface IProps{
    openCreateFormR: ()=> void;

}

 const NavBarU: React.FC<IProps> = ({openCreateFormR}) => {
  const rootStore = useContext(RootStoreContext);
  const {isLoggedIn,user, logout, isAdmin,listar, registerBox_mod} = rootStore.userStore;
  return (
    <Menu  fixed='top' inverted>
        <Container>
        <Menu.Item header as={NavLink} to='/'>
        <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
        Home
        </Menu.Item>
        <Menu.Item  name='Recargas' as={NavLink} to='/recargas'/>

        {isAdmin && (<Menu.Item  
        name='Users' 
        onClick={listar}
        /* as={NavLink} 
         to='/users'*//>)}
        
        <Menu.Item >
           {isAdmin && (<Button 
            //invisible={isAdmmin}
            //as={NavLink} to='/register'
            onClick={registerBox_mod}
            positive 
            content='Create User'
            />)}
        </Menu.Item>
        {user  && (
        <Menu.Item 
        
        position='right'>
        <Image avatar spaced='right' src={user.image || 'assets/user.png'}/>
        <Dropdown pointing='top left' text={user.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item 
            as={Link} 
            to={`profile/username`} 
            text='My profile' 
            icon='user'/>
            <Dropdown.Item  onClick={logout} text='Logout' icon='power'/>
          </Dropdown.Menu>
        </Dropdown>
        </Menu.Item>
        )}
        </Container>
       
      </Menu>
  );
};

export default NavBarU;