import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TbArrowBackUp } from 'react-icons/tb';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import FormContainer from './FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailFile, updateFile } from '../actions/filesActions';
import ScreenFile from '../assets/file-blank-solid-240.png';
import { variables } from './../utils/variables';
import { toast } from 'react-toastify';

function EditFile() {


    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fileDetail = useSelector(state => state.detailFile);
    const { file, loading, error, success } = fileDetail;
    const fileUpdate = useSelector(state => state.updateFile);
    const { file: updatedFile, error: updatedError, success: updatedSuccess } = fileUpdate;


    const [description, setDescription] = useState('')


    // to clear all data
    const clearData = () => {
        setDescription("");

    }

    useEffect(() => {
        dispatch(getDetailFile(id));
        setDescription(file.description);
    }, [id, dispatch])


    // to handler Update File
    const fileUpdateSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        let create_at = new Date().toISOString()
        formData.append('description', description)
        formData.append('create_at', create_at)
        dispatch(updateFile(id, formData));
        toast.success('The File was updated successfully')
        clearData();

        navigate('/files');


    }

    return (
        <div>
            <Container>
                <h2 className='my-6 text-center'>Update of files</h2>
                <div className="m-2 flex justify-between items-cente">
                    <Link to='/files' className="flex justify-center items-center text-decoration-none ">
                        <TbArrowBackUp className="mr-1 " />
                        Go Back
                    </Link>
                </div>

                {
                    file && (
                        <FormContainer >
                            <Form className='w-100 p-3 bg-white rounded-xl transform 
                    transition-all duration-300 shadow-lg'
                                onSubmit={fileUpdateSubmit}>
                                <div className='flex gap-4'>
                                    <div>
                                        {
                                            variables.format_files.includes(file.file_type) ?
                                                (
                                                    // eslint-disable-next-line jsx-a11y/alt-text
                                                    <a href={`${variables.STATIC_URL}${file.file_file}`} target='_blank'>
                                                        <img className="h-40 w-40 object-cover object-center rounded-xl "
                                                            src={`${variables.STATIC_URL}${file.file_file}`} />
                                                    </a>
                                                ) : (
                                                    // eslint-disable-next-line jsx-a11y/alt-text
                                                    <img className="h-40 w-40 object-cover object-center rounded-xl"
                                                        src={`${ScreenFile}`} />
                                                )
                                        }
                                    </div>
                                    <div className="grid justify-center items-center">
                                        <label className="block">
                                            <span className='block text-sm font-medium text-slate-700'>Name of File</span>
                                            <Form.Control className='rounded-xl text-sm text-slate-500 font-bold text-left'
                                                type="text"
                                                placeholder="name of file"
                                                defaultValue={file.file_name}
                                                readOnly={true} />
                                        </label>
                                        <InputGroup className="rounded-xl p-0">
                                            <label className="block">
                                                <span className='block text-sm font-medium text-slate-700'>Size of File</span>
                                                <Form.Control className=' static rounded-xl text-sm text-slate-500 font-bold text-left'
                                                    placeholder="size"
                                                    type="text"
                                                    defaultValue={file.size_file}
                                                    readOnly={true}
                                                />
                                            </label>
                                            <div className='absolute p-2  top-6 right-1 rounded-r-lg bg-[#686868] text-white text-cente'>byte</div>
                                        </InputGroup>
                                        <InputGroup>
                                            <label className="block">
                                                <span className='block text-sm font-medium text-slate-700'>Creation Date</span>
                                                <Form.Control className='rounded-xl text-sm text-slate-500 font-bold text-left'
                                                    type="text"
                                                    placeholder="Creation data"
                                                    defaultValue={new Date(file.create_at).toLocaleString('ru')}
                                                    readOnly={true}
                                                />
                                            </label>
                                        </InputGroup>

                                    </div>
                                </div>
                                <Form.Group>
                                    <label className="block">
                                        <span className='block md-2 text-sm font-medium text-slate-700'>Description</span>
                                        <Form.Control as='textarea' row={3}
                                            className="rounded-xl hover:bg-green-200 border-size-2 focus:ring focus:ring-inherit"
                                            type="text"
                                            required
                                            placeholder="Enter Description"
                                            defaultValue={file.description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)}
                                        />
                                    </label>
                                </Form.Group>

                                <div className="mb-3 flex justify-end items-center">
                                    <Button className="text-white bg-gray-600 px-3 py-1 rounded-xl 
                        text-decoration-none hover:bg-gray-700 " size='xl' type='submit'>Update</Button>
                                </div>
                            </Form>
                        </FormContainer>
                    )
                }
            </Container>
        </div>
    )
}

export default EditFile
