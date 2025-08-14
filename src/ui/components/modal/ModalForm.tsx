import { Modal } from "@mui/material"
import { Form } from "../form/Form"
import { useState } from "react";

type Props = {
  openModal: boolean
  handleCloseModal: () => void
}


export const ModalForm = (
  { 
    handleCloseModal,
    openModal,
  } : Props
) => {


  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      style={{  top: '25%',}}
    >
      <Form handleClose={handleCloseModal} />
    </Modal>
  )
}