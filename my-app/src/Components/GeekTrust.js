import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

let pageSize = 10;

function GeekTrust() {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * pageSize;
    //     const lastPageIndex = (firstPageIndex + pageSize);

    //     return employees.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);

    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = (firstPageIndex + pageSize);

    const currentTableData = employees.slice(firstPageIndex, lastPageIndex);

    const loadData = async () => {
        const empReq = await fetch("http://localhost:3001/employees");
        const empRes = await empReq.json();
        setEmployees(empRes)

        // axios.get("http://localhost:3001/employees")
        //     .then((res) => {
        //         setEmployees(res.data);
        //     })
    }

    useEffect(() => {
        loadData();
    }, [])

    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:3001/employees/${id}`)
            .then(res => {
                loadData();
            })
    }

    return (
        <>
            <div className='container'>
                <table className='table table-hover' >
                    <thead >
                        <tr >
                            <th>
                                <input type="checkbox" id="" name="" value="" />
                            </th>
                            <th scope='col'>Id</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Role</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTableData.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <th>
                                        <input type="checkbox" id="" name=""
                                            value="data.id "
                                        />
                                    </th>
                                    <th scope='row'>{data.id}</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.role}</td>
                                    <td >
                                        <Link
                                            to={`/employees/${data.id}`}
                                            className='px-6 py-2 bg-blue-500 rounded-lg font-normal'>
                                            &#9998;
                                        </Link>
                                        <button className='btn btn-link'
                                            onClick={() => deleteEmployee(data.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalCount={employees.length}
                    pageSize={pageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </>
    )
}

export default GeekTrust