import React, { useContext } from 'react'
import { List, Image, Segment, Item, Button, Label } from 'semantic-ui-react'
import { IAttendee } from '../../../app/models/recarga'
import { RootStoreContext } from '../../../app/stores/rootStore';



const RecargaListAttendees = () => {

  const rootStore = useContext(RootStoreContext);
  const {compraList,setAttended, buttonText,extraColor,AttendCompra,isAttended,CancelCompra,RefundCompra} = rootStore.comprasStore;
  const {user,getSpecificUser,userId,getUser,isAdmin} = rootStore.userStore;

 
   /* const index= compraList?.length
    for(let i=0;i<index!;i++)
    {
      console.log("los indices son:",i)
      const id= compraList?.at(i)?.appUserId
      var name= getSpecificUser(id!)
      console.log("los nombres son:",name)
      compraList.at(i).displayName=name ;
    }*/
    getUser();
    //getSpecificUser();
    return (
      <Segment clearing>
          <Item.Group divided>
            { !isAdmin &&
            (compraList?.filter(person => person.buyer === user?.displayName).map(compra =>(
              
              <Item key={compra.id}>
                  <Item.Content>
                  <Item.Header as='a' >{compra.buyer}</Item.Header>
                  <Item.Meta>{compra.dateBought.toString()}</Item.Meta>
                  <Item.Description>
                  <div>{compra.title}</div>
                  <div>{compra.price}</div>
                  </Item.Description>
                  <Item.Extra>
                         
                  {compra.state==="Attended" && <Label basic content={compra.state} color='green'/>}
                      {compra.state==="Canceled" && !compra.refunded && (<>
                      <Label basic content={compra.state} color='red'/>
                      <Label basic content="No refunded"/>
                      </>
                      )}
                      {compra.state==="Canceled" && compra.refunded && (<>
                      <Label basic content={compra.state} color='red'/>
                      <Label basic content="Refunded"/>
                      </>
                      )}
                      {/*compra.state==="Canceled" <Label basic content={compra.state} color='red'/>*/}
                      {compra.state==="Unattended" &&<Label basic content={compra.state} color='yellow'/>/*!compra.isHost && <Label basic content="Unattended" color='red'/>*/}
                  
                  </Item.Extra>
                  </Item.Content>
              </Item>
            )))}   
             { isAdmin &&
            (compraList?.map(compra =>(
              
              <Item key={compra.id}>
                  <Item.Content>
                  <Item.Header as='a' color='red'>{compra.buyer}</Item.Header>
                  <Item.Meta>{compra.dateBought.toString()}</Item.Meta>
                  <Item.Description>
                  <div>{compra.title}</div>
                  <div>{compra.price}</div>
                  </Item.Description>
                  <Item.Extra>
                  {compra.state==="Unattended" &&<Button
                    onClick={()=>{AttendCompra(compra)}}
                    floated='right'
                    content="Attend"
                    color='green'
                    />}  
                    {compra.state==="Canceled" && !compra.refunded && <Button
                    onClick={()=>{RefundCompra(compra)}}
                    floated='right'
                    content="Refund"
                    color='blue'
                    />}  
                   {compra.state!=="Canceled" && <Button
                    onClick={()=>{CancelCompra(compra)}}
                    floated='right'
                    content="Cancel"
                    color='red'
                    /> }        
                      {compra.state==="Attended" && <Label basic content={compra.state} color='green'/>}
                      {compra.state==="Canceled" && !compra.refunded && (<>
                      <Label basic content={compra.state} color='red'/>
                      <Label basic content="No refunded"/>
                      </>
                      )}
                      {compra.state==="Canceled" && compra.refunded && (<>
                      <Label basic content={compra.state} color='red'/>
                      <Label basic content="Refunded"/>
                      </>
                      )}
                      {/*compra.state==="Canceled" <Label basic content={compra.state} color='red'/>*/}
                      {compra.state==="Unattended" &&<Label basic content={compra.state} color='yellow'/>/*!compra.isHost && <Label basic content="Unattended" color='red'/>*/}
                  </Item.Extra>
                  </Item.Content>
              </Item>
            )))}   
              </Item.Group>
      </Segment>
    )
  }
  
    /*return (
    <Segment clearing>
        <Item.Group divided>
          { !isAdmin &&
          (compraList?.filter(person => person.appUserId === userId).map(compra =>(
            
            <Item key={compra.displayName}>
                <Item.Content>
                <Item.Header as='a' >{compra.appUser.displayName}</Item.Header>
                <Item.Meta>{compra.dateBought.toString()}</Item.Meta>
                <Item.Description>
                <div>{compra.recarga.title}</div>
                <div>{compra.recarga.price}</div>
                </Item.Description>
                <Item.Extra>
                       
                    <Label basic content='EXTRA'/>
                </Item.Extra>
                </Item.Content>
            </Item>
          )))}   
           { isAdmin &&
          (compraList?.map(compra =>(
            
            <Item key={compra.displayName}>
                <Item.Content>
                <Item.Header as='a' color='red'>{compra.appUser.displayName}</Item.Header>
                <Item.Meta>{compra.dateBought.toString()}</Item.Meta>
                <Item.Description>
                <div>{compra.recarga.title}</div>
                <div>{compra.recarga.price}</div>
                </Item.Description>
                <Item.Extra>
                <Button
                  onClick={()=>{EditCompra(compra)}}
                  floated='right'
                  content="Attend"
                  color='blue'
                  />         
                    {/*compra.isHost && <Label basic content="Attended" color='green'/>*///}
                   /* {<Label basic content={compra.state} color='red'/>/*!compra.isHost && <Label basic content="Unattended" color='red'/>*///}
               /* </Item.Extra>
                </Item.Content>
            </Item>
          )))}   
            </Item.Group>
    </Segment>
  )
}*/

export default RecargaListAttendees

/*
<div>
  {names.filter(name => name.includes('J')).map(filteredName => (
    <li>
      {filteredName}
    </li>
  ))}
</div>
*/