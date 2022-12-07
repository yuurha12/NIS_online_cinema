import { Button, Form, Modal, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import {API} from '../../config/api'

//register route

const Regform = ({show, hide,setModalLoginShow, setModalRegisterShow}) => {

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post('/register', form)

      const alert = (<Alert variant='success' className='py-1'>
        REGISETER SUCCESS
      </Alert>)
      setMessage(alert)
      console.log("register berhasil", response.data.data)
    } catch (err) {
      const alert = (<Alert variant='danger' className='py-1'>
        REGISETER FAILED
      </Alert>)
      setMessage(alert)
      console.log(err)
    }
    setModalRegisterShow(false)
    setModalLoginShow(true)
  })
      

  return (
    <>
      <Modal show={show} onHide={hide}>
        <Modal.Body>
<div className='form-group'>
{message && message}
    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
        <h1>REGISTER</h1>
      <Form.Group controlId="formBasicEmail">
        <Form.Control 
        onChange={handleOnChange} 
        name="email" 
        type="email" 
        placeholder="Email" 
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control 
        onChange={handleOnChange} 
        name="password"
        type="password" 
        placeholder="Password" 
        />
        </Form.Group>
        <Form.Group controlId="formBasicName">
        <Form.Control
        onChange={handleOnChange} 
        name="fullname"
        type="text" 
        placeholder="Full Name" 
        />
      </Form.Group>
      <div>

      <Button variant="danger" type='submit'>Register</Button>
      <p style={{fontSize: "11pt", margin: "8px 0 0", textAlign:"center"}}>Already have an account ? Click <span className='btn text-info' style={{border: "none", padding: "0"}} onClick={() => {hide(true); setModalLoginShow(true)}}>here</span></p>
      </div>
    </Form>
</div>
        </Modal.Body>
      </Modal>
    </>
  );
  }

  export default Regform