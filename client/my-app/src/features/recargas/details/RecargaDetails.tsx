import React, { useContext } from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { IRecarga } from '../../../app/models/recarga';
import { RootStoreContext } from '../../../app/stores/rootStore';


interface IProps{
    recarga: IRecarga
    setEditMode: (editMode: boolean)=>void;
    setSelectedRecarga: (user: IRecarga | null)=>void;
}
// si quisiera arreglar la imagen regresar al video 13 modulo 5 y ver ahi
const Recargadetails: React.FC<IProps> = ({
    recarga, 
    setEditMode, 
    setSelectedRecarga
    }) => {

      const rootStore = useContext(RootStoreContext);
  const {isAdmin} = rootStore.userStore;
  return (
    <Card fluid>
    <Image src='assets/placeholder.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{recarga.title}</Card.Header>
      <Card.Meta>
        <span >{recarga.price}</span>
      </Card.Meta>
      <Card.Description>
        description: {recarga.description}
        </Card.Description>
        <Card.Description>
        category: {recarga.category}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
       {isAdmin && (<Button onClick={()=>setEditMode(true)} color='blue' content='edit'/>)}
        <Button onClick={()=> setSelectedRecarga(null)} color='grey' content='cancel'/>
      </Button.Group>
    </Card.Content>
  </Card>
  )
}

export default Recargadetails