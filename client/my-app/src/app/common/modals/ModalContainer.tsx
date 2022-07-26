import React, { useContext } from 'react';
import {Button, Modal } from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';

const ModalContainer = () => {
   const rootStore = useContext(RootStoreContext);
   const {modal: {open,body}, closeModal} = rootStore.modalStore;
   if(open)
   console.log("yo soy el modal container")
  return (
    <Modal  onClose={closeModal} open={open} size='mini' >
      <Modal.Content >Our component will be here</Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);