import React, { useContext } from 'react'
import { Card,Icon,Image } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';

const ComprasInfo = () => {

    const rootStore = useContext(RootStoreContext);
  const {totalVendido, totVendido} = rootStore.comprasStore;
  
  totalVendido();
  return (
    <Card>
    {/*<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />*/}
    <Card.Content>
      <Card.Header>Recargas</Card.Header>
      <Card.Meta>
        Total vendido: ${totVendido}
      </Card.Meta>
    </Card.Content>
  </Card>
  )
}

export default ComprasInfo
