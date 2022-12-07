import { Alert, Button, Form, Modal } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import { AppContexts } from '../contexts/AppContexts';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
//register route

const LoginForm = ({show,hide,setModalLoginShow, setModalRegisterShow}) => {  

  document.title = 'Cinema Online | Home';

  const [dispatch] = useContext(AppContexts);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
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

      const response = await API.post('/login', form)

      const alert = (<Alert variant='success' className='py-1'>
        Success
      </Alert>)
      setMessage(alert)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data
      })
      console.log("LOGIN SUCCESS", response.data.data)
    } catch (err) {
      const alert = (<Alert variant='danger' className='py-1'>
        LOGIN FAILED
      </Alert>)
      setMessage(alert)
      console.log(err)
    }
    hide(true)
  })

  return (
    <>
      <Modal show={show} onHide={hide}>
        <Modal.Body>
<div className='form-group'>
  {message && message}
    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
        <h1>LOGIN</h1>
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
      <Button variant="danger" type='submit'>Login</Button>{' '}
      <p style={{fontSize: "11pt", margin: "8px 0 0", textAlign:"center"}}>Already have an account ? Click <span className='btn text-info' style={{border: "none", padding: "0"}} onClick={() => {setModalRegisterShow(true) ; hide(true)}}>here</span></p>
    </Form>
</div>
        </Modal.Body>
      </Modal>
    </>
  );
  }  

export default LoginForm