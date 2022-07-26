import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';




const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const {isLoggedIn, user} = rootStore.userStore;
  const {openModal}=rootStore.modalStore;
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
        {isLoggedIn && user ? (
        <Fragment>
          <Header as='h2' inverted content={`Welcome back ${user.displayName}`}/>
          <Button as={NavLink} to='/recargas' size='huge' inverted>
          Go to Recargas!
          </Button>
        </Fragment>
        ): (
          <Fragment>
              <Header as='h2' inverted content='Welcome to Recargas'/>
                {/*<Button onClick={()=> {openModal('test')}} size='huge' inverted>*/}
                <Button as={NavLink} to='/login' size='huge' inverted>
                Login
                </Button>
               {/* <Button as={NavLink} to='/register' size='huge' inverted>
                Register
        </Button>*/}{/*implementar esto si se quiere que cualquiera pueda registrarse */}
          </Fragment>
        )}
        
      </Container>
    </Segment>
  );
};

export default HomePage
