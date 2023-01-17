import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/react-toastify.cjs.development";
import "react-toastify/dist/";

function LoginScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let history = useNavigate();
    let location = useLocation();

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/files'
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        toast.success('You was logged successfully')
    }

    return (

        <FormContainer>
            <h1 className='text-center'>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='bg-zinc-700'>
                    Sign In
                </Button>


            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>

        </FormContainer>

    )
}

export default LoginScreen
