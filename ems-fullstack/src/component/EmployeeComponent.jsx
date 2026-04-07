import React, { useState, useEffect } from 'react'
import { savedEmployee, updateDataEmployee, editEmployee } from '../service/EmployeeService'
import { getAllDepartments } from '../service/DepartmentService'
import '../style/employeeform.css'
import { useNavigate, useParams } from 'react-router-dom'

function EmployeeComponent() {

    // Employee fields
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    // Department states
    const [departments, setDepartments] = useState([])
    const [departmentId, setDepartmentId] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()

    // Page title
    function pageTitle() {
        return id
            ? <h4 className='title'>Update Employees</h4>
            : <h4 className='title'>Add Employees</h4>
    }

    // Load data
    useEffect(() => {

        // Load departments
        getAllDepartments()
            .then((res) => {
                setDepartments(res.data)
            })
            .catch(error => console.error(error))

        // Load employee for update
        if (id) {
            editEmployee(id)
                .then((response) => {
                    setFirstName(response.data.firstName)
                    setLastName(response.data.lastName)
                    setEmail(response.data.email)

                    // 🔥 Set department correctly
                    if (response.data.department) {
                        setDepartmentId(response.data.department.id)
                    }
                })
                .catch(error => console.error(error))
        }

    }, [id])

    // Save / Update employee
    function saveEmployee(e) {
        e.preventDefault()

        if (!firstName || !lastName || !email || !departmentId) {
            alert("Please fill all fields")
            return
        }

        const employee = {
            firstName,
            lastName,
            email,
            department: {
                id: Number(departmentId)   // 🔥 FIXED
            }
        }
        console.log("Updating Employee:", employee)

        if (id) {
            updateDataEmployee(id, employee)
                .then(() => navigate('/'))
                .catch(error => console.error(error))
        } else {
            savedEmployee(employee)
                .then(() => navigate('/'))
                .catch(error => console.error(error))
        }
    }

    return (
        <>
            <div className='st-ba'>
                <div className='container d-flex justify-content-center align-items-center'>
                    <div className="text-center card card-top">

                        <div className='card-head'>
                            {pageTitle()}
                        </div>

                        <div className="card-body">
                            <form>

                                {/* First Name */}
                                <div className='form-group mb-3'>
                                    <input
                                        type="text"
                                        placeholder='Enter First Name'
                                        value={firstName}
                                        className='form-control'
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Last Name */}
                                <div className='form-group mb-3'>
                                    <input
                                        type="text"
                                        placeholder='Enter Last Name'
                                        value={lastName}
                                        className='form-control'
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className='form-group mb-3'>
                                    <input
                                        type="email"
                                        placeholder='Enter Email'
                                        value={email}
                                        className='form-control'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* 🔥 Department Dropdown */}
                                <div className='form-group mb-3'>
                                    <select
                                        className='form-control'
                                        value={departmentId}
                                        onChange={(e) => setDepartmentId(Number(e.target.value))} // 🔥 FIXED
                                        required
                                    >
                                        <option value="">Select Department</option>

                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Save Button */}
                                <button
                                    className='btn btn-success'
                                    onClick={saveEmployee}
                                >
                                    Save
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeComponent