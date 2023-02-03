import React from 'react';
import { usePagination, DOTS } from './usePagination';


const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize
    } = props;

    const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });

    let lastPage = paginationRange[paginationRange.length - 1];

    // If there are less than 2 times in pagination range we shall not render the component
    // if (currentPage === 0 || paginationRange.length < 2) {
    //     return null;
    // }

    const onNext = () => {
        if (currentPage != lastPage) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if (currentPage != 1) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <ul className='pagination'>
            {/* Left navigation arrow */}
            <li className='page-item' >
                <a className='page-link'
                    onClick={onPrevious}
                    href='#'
                >
                    Prev
                </a>
            </li>
            {paginationRange.map(pageNumber => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li key={pageNumber} className="page-item">&#8230;</li>;
                }

                // Render our Page Pills
                return (
                    <li key={pageNumber}
                        className='page-item'>
                        <a className='page-link'
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </a>
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li className='page-item' >
                <a className='page-link'
                    onClick={onNext}
                >
                    next
                </a>
            </li>
        </ul>
    );
};

export default Pagination;