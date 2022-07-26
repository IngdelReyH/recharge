import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Grid, GridColumn, Item, Label, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';



const ListaUsers = () => {

    const rootStore = useContext(RootStoreContext);
  const {userList,deleteUser} = rootStore.userStore;
  return (
    
      <Segment clearing>
        <Item.Group divided>
          {userList?.map(user =>(
            <Item key={user.id}>
                <Item.Content>
                <Item.Header as='a'>{user.displayName}</Item.Header>
                <Item.Meta>{user.email}</Item.Meta>
                <Item.Extra>
                  <Button
                  onClick={()=>{deleteUser(user.id)/*console.log("tocando btn delete user:",user.email)*/}}
                  floated='right'
                  content='Delete' 
                  color='red'
                  />
                  
                    <Label basic content='EXTRA'/>
                </Item.Extra>
                </Item.Content>
            </Item>
          ))}   
            </Item.Group>
    </Segment>
     
    
  )
}

export default ListaUsers
