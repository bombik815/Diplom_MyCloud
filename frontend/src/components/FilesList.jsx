import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListFiles } from '../actions/filesActions';
import { Container, Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from './Card';
import Loader from '../components/Loader'
import Message from '../components/Message'
import styled from "styled-components";
import add_plus from '../assets/add_file.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: center;
  flex-flow: wrap;
  `;



const FilesList = () => {

    const history = useNavigate();

    const location = useLocation()
    // GET data files from store
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    const fileList = useSelector(state => state.fileLists)
    const { files, loading, error } = fileList

    const userLogin = useSelector(state => state.userLogin)
    const { error: userError, loading: userLoading, userInfo } = userLogin

    // on page load
    useEffect(() => {
        if (userInfo) {
            dispatch(getListFiles());
        } else {
            history('/login')
        }
    }, [dispatch, history, userInfo])


    return (
        <>
            <Container className='xs={12} md={6} lg={4} xl={3} mt-4'>
                <h2 className='my-6 text-center'>List of files</h2>
                <div className='flex justify-end container'>
                    <Form className='FormField' inline  >

                        <Form.Control
                            type='search'
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search files...'
                            className='bg-slate-200 rounded-full'
                        ></Form.Control>


                        <Tippy content={<span>Add new file</span>}>
                            <Link to='/add-file' className="  m-2 text-white px-3 py-1 rounded-xl 
                                text-decoration-none
                                hover:bg-gray-100 
                                hover:-translate-y-1 
                                hover: scale-110
                                flex justify-center items-center gap-2
                                transition ease-in-out duration-300">
                                <img className="h-10 w-10" src={add_plus} alt='add file' />
                            </Link>
                        </Tippy>
                    </Form>
                </div>
                {userLoading && loading
                    ? (<Loader />)
                    : error
                        ? (<Message variant='danger'>{error}</Message>)
                        : (
                            <div className=" container xs={12} md={6} lg={4} xl={3} mt-4">
                                <CardGrid className=" gap-4" >
                                    {files &&
                                        files
                                            .filter((file) => {

                                                return search.toLowerCase() === ''
                                                    ? file
                                                    : file.file_name.toLowerCase().includes(search) ||
                                                    file.file_type.toLowerCase().includes(search);
                                            })
                                            .map((file) =>
                                                <div key={file.id}>
                                                    <Card props={file} />
                                                </div>
                                            )}
                                </CardGrid>
                            </div>

                        )}
            </Container>
        </>
    )
}

export default FilesList
