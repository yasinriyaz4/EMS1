package com.employeesystem.emsbackend.controller;

import com.employeesystem.emsbackend.entity.Department;
import com.employeesystem.emsbackend.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    // Add department
    @PostMapping
    public ResponseEntity<Department> addDepartment(@RequestBody Department dept) {
        return ResponseEntity.ok(departmentService.addDepartment(dept));
    }

    // Get all departments
    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }
}