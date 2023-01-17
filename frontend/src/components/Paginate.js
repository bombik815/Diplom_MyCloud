import React from 'react';


const Pagination = ({ filesPerFile, totalFiles, paginate }) => {
    console.log(filesPerFile, totalFiles)
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalFiles / filesPerFile); i++) {
        pageNumber.push(i);
    }
    return (
        <nav>
            <ul className='pagination'>
                {pageNumber.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)}
                            href='!#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

export default Pagination;
