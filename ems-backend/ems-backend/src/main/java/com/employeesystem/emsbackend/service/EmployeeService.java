package com.employeesystem.emsbackend.service;

import com.employeesystem.emsbackend.entity.Department;
import com.employeesystem.emsbackend.entity.Employee;
import com.employeesystem.emsbackend.exception.ResourceNotFoundException;
import com.employeesystem.emsbackend.repository.DepartmentRepository;
import com.employeesystem.emsbackend.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    
    public EmployeeService(EmployeeRepository employeeRepository,
                           DepartmentRepository departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    //ADD Employee 
    public Employee addEmployee(Employee employee) {

        Long deptId = employee.getDepartment().getId();

        Department dept = departmentRepository.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        employee.setDepartment(dept);

        return employeeRepository.save(employee);
    }

    public Employee findEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee Id " + employeeId + " not found"));
    }

    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    public Employee updateEmployee(Long id, Employee updatedEmployee) {

        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));


        emp.setFirstName(updatedEmployee.getFirstName());
        emp.setLastName(updatedEmployee.getLastName());
        emp.setEmail(updatedEmployee.getEmail());
        
        
        Long deptId = updatedEmployee.getDepartment().getId();

        Department dept = departmentRepository.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        emp.setDepartment(dept);

        return employeeRepository.save(emp);
    }

    public void deleteEmployeeById(Long id) {
        boolean exist = employeeRepository.existsById(id);
        if (!exist) {
            throw new ResourceNotFoundException("Employee not found Id " + id);
        }
        employeeRepository.deleteById(id);
    }

    public Employee findEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
}