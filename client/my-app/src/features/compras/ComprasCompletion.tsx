import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { Container, Header, Segment, Image, Button, Message } from 'semantic-ui-react'
import { IRecarga } from '../../app/models/recarga';
import { RootStoreContext } from '../../app/stores/rootStore';


const ComprasCompletion  = () => {

  const rootStore = useContext(RootStoreContext);
  const {registerC} = rootStore.comprasStore;
  //correr funcion para guardar una compra
  
  

  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
        <Image
        size='massive'
        src='/assets/logo.png'
        alt='logo'
        style={{marginBottom: 12}}
        />
        Recargas
        </Header>
          <Fragment>
              <Header as='h2' inverted content='Pago completado'/>
                {/*<Button onClick={()=> {openModal('test')}} size='huge' inverted>*/}
                <Button as={NavLink} to='/recargas' size='huge' inverted>
                Back to Recargas
                </Button>
          </Fragment>
       
        
      </Container>
    </Segment>
  )
}

export default ComprasCompletion
