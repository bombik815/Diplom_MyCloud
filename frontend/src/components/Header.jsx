import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import { useNavigate } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style.esm";



if (typeof window !== 'undefined') {
    injectStyle();
}

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand href="/">MyCloude</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ml-auto">
                            {userInfo ? (

                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/files'>
                                        <NavDropdown.Item>Files</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user pr-2"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin Panel' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />

                                </NavDropdown>
                            )}
                        </Nav>

                    </Navbar.Collapse>

                </Container>

            </Navbar>
            <ToastContainer
                position='bottom-right'
                theme='dark'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                toastStyle={{backgroundColor: '#343A40'}}

            />
        </header >
    )
}

export default Header;
