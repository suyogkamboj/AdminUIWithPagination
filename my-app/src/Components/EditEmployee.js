import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditEmployee = () => {
    const [employeeData, setEmployeeData] = useState();
    const [employeeID, setEmployeeID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/employees/${id}`)
            .then((res) => {
                setEmployeeData(res.data);
                setEmployeeID(res.data.id);
                setName(res.data.name);
                setEmail(res.data.email);
                setRole(res.data.role);
                // console.log(res.data);
            })
    }, [id])

    const data = {
        ...employeeData,
        name,
        email,
        role
    }

    const navigate = useNavigate()

    const handleChange = (event) => {
        // event.preventDefault();
        axios.put(`http://localhost:3001/employees/${id}`, data)
            .then((res) => {
                navigate('/')
            })

    }

    return (
        <div className='col-5 container-sm'>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">ID :</label>
                <div className="col-sm-6">
                    <input type="number"
                        className='form-control-plaintext'
                        value={employeeID}
                        placeholder="ID"
                        readOnly
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Name :</label>
                <div className="col-sm-6">
                    <input type="text"
                        className='form-control'
                        value={name}
                        placeholder="Enter Employee Name"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Email :</label>
                <div className="col-sm-6">
                    <input type="email"
                        className='form-control'
                        value={email}
                        placeholder="Enter Employee Email Id"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Role :</label>
                <div className="col-sm-6">
                    <input type="text"
                        className='form-control'
                        value={role}
                        placeholder="Enter Employee Role"
                        onChange={(event) => setRole(event.target.value)}
                    />
                </div>
            </div>
            <div className="col-sm">
                <button type="submit"
                    className="btn btn-primary"
                    onClick={handleChange}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
