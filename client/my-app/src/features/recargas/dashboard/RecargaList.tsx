import React, { SyntheticEvent, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { Item,  Button, Label, Segment } from 'semantic-ui-react'
import { IRecarga } from '../../../app/models/recarga';
import { RootStoreContext } from '../../../app/stores/rootStore';



interface IProps {
   recargas: IRecarga[];
   selectRecarga: (id: string)=>void;
   deleteRecarga: (id: string)=>void;
}
 
const UserList: React.FC<IProps> = ({recargas, selectRecarga, deleteRecarga}) => {
  const rootStore = useContext(RootStoreContext);
  const {isAdmin,isAdminFunction,getUser,user} = rootStore.userStore;
  const {setPrice,setName}= rootStore.recargasStore;
  const {listaC,setRecarga, registerC }= rootStore.comprasStore;


  isAdminFunction();
  //console.log("se debe haber corrido isAdminFunction");
  return (
    
    <Segment clearing>
        <Item.Group divided>
            {recargas.map(recarga =>(
            <Item key={recarga.id}>
            <Item.Content>
                <Item.Header as='a'>{recarga.title}</Item.Header>
                <Item.Meta>{recarga.price}</Item.Meta>
                <Item.Description>
                <div>{recarga.description}</div>
                <div>{recarga.category}</div>
                </Item.Description>
                <Item.Extra >
                    <Button onClick={() => selectRecarga(recarga.id)} 
                    floated='right'
                    content='View' 
                    color='blue'
                    />
                    <Button 
                    onClick={() => {
                      console.log("tocando buy, el precio es:",recarga.price)
                      setPrice(parseInt(recarga.price,10));
                      setName(recarga.title);
                      getUser()
                      console.log("a continuacion se debe guardar la recarga:",recarga)
                      setRecarga(recarga,user);

                     // registerC();
                    }}
                    as={NavLink} to='/shopping' 
                    floated='right'
                    content='Buy' 
                    color='green'
                    />

                    
                    
                    {isAdmin && (<Button onClick={() => deleteRecarga(recarga.id)} 
                    floated='right'
                    content='Delete' 
                    color='red'
                    />)}
                    <Label basic content="Extra"/>
                </Item.Extra>
            </Item.Content>
            </Item>
                    ))}         
            </Item.Group>
    </Segment>
       

  
   
    
  )
}

export default  UserList;