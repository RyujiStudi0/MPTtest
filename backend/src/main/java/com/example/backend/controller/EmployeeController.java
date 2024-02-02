package com.example.backend.controller;

import com.example.backend.entity.EmployeeEntity;
import com.example.backend.model.EmployeeRequest;
import com.example.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/getAll")
    public List<EmployeeEntity> getAll(){
        return employeeService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<EmployeeEntity> findById(@PathVariable("id") String id){
        return employeeService.getById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> add(@RequestBody EmployeeRequest employeeRequest){
//       return employeeService.create(employeeRequest);
        try {
            return ResponseEntity.ok(employeeService.create(employeeRequest));
        }catch (Exception exception) {
            return new ResponseEntity<>("EmployeeNo Duplicate!!", HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/update/{id}")
    public EmployeeEntity update(@RequestBody EmployeeRequest employeeRequest,@PathVariable("id") String id){
        return employeeService.update(employeeRequest,id);
    }

    @DeleteMapping("/delete/{id}")
    public void update(@PathVariable("id") String id){
        employeeService.delete(id);
    }
}
