import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { TbArrowBackUp } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, getDetailFile } from './../actions/filesActions';
import ScreenFile from '../assets/file-blank-solid-240.png';
import { variables } from './../utils/variables';
import { toast } from 'react-toastify';

function DetailFile() {
    const navigate = useNavigate();
    // catch ID useParams
    const [loading, setLoading] = useState([])
    const { id } = useParams();
    const dispatch = useDispatch();
    const fileDetail = useSelector(state => state.detailFile);
    const { file, error, success } = fileDetail;


    useEffect(() => {
        setLoading(true);
        dispatch(getDetailFile(id))
        setLoading(false);
    }, [id, dispatch])


    // handle delete File function
    const handleDelete = (file_id) => {

        if (window.confirm(`Are you sure you want to delete this File ${file.file_name}.${file.file_type} ?`)) {
            dispatch(deleteFile(file_id))
            toast.success('The File was delete successfully')
        }
        navigate('/files');
    }

    return (
        <div>
            <Container>
                <h2 className='my-6 text-center'>Detail of files</h2>
                <div className="m-2 flex justify-between items-cente">
                    <Link to='/files' className="flex justify-center items-center text-decoration-none ">
                        <TbArrowBackUp className="mr-1 " />
                        Go Back
                    </Link>
                </div>
                <div className='flex justify-center items-center'>
                    {
                        file && (
                            <div className='card w-80 p-3 bg-white rounded-xl transform transition-all 
                         duration-300 shadow-lg'>
                                {
                                    variables.format_files.includes(file.file_type) ?
                                        (
                                            // eslint-disable-next-line jsx-a11y/alt-text
                                            <a href={`${variables.STATIC_URL}${file.file_file}`} target='_blank'>
                                                <img className="object-cover object-center rounded-xl"
                                                    src={`${variables.STATIC_URL}${file.file_file}`} />
                                            </a>
                                        ) : (
                                            // eslint-disable-next-line jsx-a11y/alt-text
                                            <img className="h-40 w-40 object-cover object-center rounded-xl"
                                                src={`${ScreenFile}`} />
                                        )
                                }
                                <div className="img-fluid rounded-start" alt={file.name} />
                                <div className="card-body static">
                                    <div className="pr-3 absolute p-3 top-0 right-0 shadow-lg
                                            font-medium rounded-tr-xl bg-[#686868] text-white">
                                        {file.file_type}
                                    </div>
                                    <h5 className=" mb-3"><span className='text-sm font-bold text-white bg-[#686868] mb-3'>
                                        Name: <br />
                                    </span>{file.file_name}</h5>
                                    <p className="card-text  mb-3">
                                        <span className='text-sm font-bold text-white bg-[#686868] mb-2'>
                                            Decription: <br />
                                        </span>{file.description}
                                    </p>
                                    <p className="card-text mb-3">
                                        <span className='text-sm font-bold text-white bg-[#686868] mb-2'>
                                            Date of creation: <br />
                                        </span>{new Date(file.create_at).toLocaleString('ru')}
                                    </p>
                                    <hr />
                                    <div className='mt-3 flex justify-center'>
                                        <button type="button" onClick={(e) => handleDelete(file.id)}
                                            className="btn btn-outline-danger btn-sm">
                                            <span className="bi bi-trash mr-2"></span>
                                            Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Container>
        </div >
    )
}

export default DetailFile
