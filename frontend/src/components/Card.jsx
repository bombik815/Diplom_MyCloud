import React from 'react'
import ScreenFile from '../assets/file-blank-solid-240.png';
import edit_file from '../assets/edit.png';
import detail_file from '../assets/Documents.png';
import download_file from '../assets/download.png';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { variables } from './../utils/variables';
import axios from 'axios';

function Card({ props }) {

    // Split the string name of file
    let newNameFile = props.file_name.slice(0, 10)
    if (newNameFile.length < props.file_name.length) {
        newNameFile += '...';
    }


    // const urlFile = `${variables.STATIC_URL}${props.file_file}`
    // async function downloadFileAtURL(urlFile, fileName) {
    //     const file_test = "/frontend/package.json"
    //     // "http://127.0.0.1:8000/static/files/user_test111%40email.com/2022-12-01T09_44_56_568Z-eresolve-report.txt";

    //     const response = await axios.get({
    //         url: file_test,
    //         // method: "GET",
    //         responseType: "blob",
    //         headers: { "Content-type": "application/octet-stream", },
    //         // mode: 'no-cors',
    //     })
    //     console.log(response)
    //     const blob = await response.blob();
    //     console.log(String(file_test))
    //     const downloadURL = window.URL.createObjectURL(new Blob([blob]));
    //     const link = document.createElement('a');
    //     link.href = downloadURL
    //     link.setAttribute("download", fileName)
    //     document.body.appendChild(link)
    //     link.click();
    //     link.parentNode.removeChild(link)

    // }

    return (
        <div>
            {/* <!--Card --> */}
            <div className='w-40 p-2 bg-white rounded-xl transform transition-all 
            hover:-translate-y-1 duration-300 shadow-lg
            hover:shadow-2xl'>
                <div className='static flex justify-start items-center'>
                    {
                        variables.format_files.includes(props.file_type) ?
                            (
                                // eslint-disable-next-line jsx-a11y/alt-text
                                <img className="h-20 w-20 object-cover object-center rounded-xl"
                                    src={`${variables.STATIC_URL}${props.file_file}`} />
                            ) : (
                                // eslint-disable-next-line jsx-a11y/alt-text
                                <img className="h-20 w-20 object-cover object-center rounded-xl"
                                    src={`${ScreenFile}`} />
                            )}
                    <div className="p-2 absolute top-0 right-0 
                        font-medium rounded-tr-xl bg-[#686868] text-white text-center">
                        {props.file_type}
                    </div>
                </div>
                <div className='p-2'>
                    <h2 className='text-xs text-left font-normal'>{newNameFile}</h2>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <Tippy content={<span>Edit file</span>}>
                        <Link to={'/update/' + props.id}>
                            <img className='h-10 w-10 rounded-xl' src={edit_file} alt='delet file' />
                        </Link>
                    </Tippy>
                    <Tippy content={<span>Detail file</span>}>
                        <Link to={'/detail/' + props.id}>
                            <img className='h-10 w-10 rounded-xl' src={detail_file} alt='delet file' />
                        </Link>
                    </Tippy>
                    <Tippy content={<span>Download file</span>}>
                        {/* <button onClick={() => { */}
                        {/* downloadFileAtURL(
                                `${variables.STATIC_URL}${props.file_file}`,
                                `${props.file_name}.${props.file_type}`)
                        }}> */}
                        {/* <img className='h-10 w-10 rounded-xl' src={download_file} alt='download file' /> */}
                        {/* </button> */}
                        <a href={`${variables.STATIC_URL}${props.file_file}`} target='_blank' download>
                            <img className='h-10 w-10 rounded-xl' src={download_file} alt='download file' />
                        </a>
                    </Tippy>

                </div>
            </div>
        </div >
    )
}

export default Card
