import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import ComprasInfo from './ComprasInfo'
import RecargaListAttendees from './RecargaListAttendees'

const ComprasDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  //const {compraList} = rootStore.comprasStore;
  const {user,getSpecificUser,userId,getUser,isAdmin} = rootStore.userStore;
  return (
    <Grid>
      <Grid.Column width={10}>
      <RecargaListAttendees />
      </Grid.Column>
     <Grid.Column width={6}>
        {isAdmin &&<ComprasInfo/>}
     </Grid.Column>
    </Grid>
  )
}

export default ComprasDashboard
