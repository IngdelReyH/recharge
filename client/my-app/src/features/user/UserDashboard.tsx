import React, { SyntheticEvent, useContext } from 'react'
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ListaUsers from './ListaUsers';
import RegisterForm from './RegisterForm';





interface IProps{
    
}

const UserDashboard: React.FC<IProps> = ({
  
    }) => {
        const rootStore = useContext(RootStoreContext);
  const {registerBox} = rootStore.userStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ListaUsers/>
      </Grid.Column>
     <Grid.Column width={6}>
        {registerBox &&(<RegisterForm/>)}
     </Grid.Column>
    </Grid>
  )
}

export default  UserDashboard;