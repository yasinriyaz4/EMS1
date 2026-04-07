package com.employeesystem.emsbackend.service;

import com.employeesystem.emsbackend.entity.Department;
import com.employeesystem.emsbackend.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    // Add department
    public Department addDepartment(Department dept) {
        return departmentRepository.save(dept);
    }

    // Get all departments
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
}