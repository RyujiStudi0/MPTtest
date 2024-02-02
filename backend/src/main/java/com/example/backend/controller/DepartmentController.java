package com.example.backend.controller;

import com.example.backend.entity.DepartmentEntity;
import com.example.backend.model.DepartmentRequest;
import com.example.backend.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/department")
public class DepartmentController {
    @Autowired
    DepartmentService departmentService;

    @GetMapping("/getAll")
    public List<DepartmentEntity> getAll(){
        return departmentService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<DepartmentEntity> findById(@PathVariable("id") Integer id){
        return departmentService.getById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> add(@RequestBody DepartmentRequest departmentRequest){
//        return departmentService.create(departmentRequest);
        try {
            return ResponseEntity.ok(departmentService.create(departmentRequest));
        }catch (Exception exception) {
            return new ResponseEntity<>("DepartmentName Duplicate!!",HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/update/{id}")
    public DepartmentEntity update(@RequestBody DepartmentRequest departmentRequest,@PathVariable("id") Integer id){
        return departmentService.update(departmentRequest,id);
    }

    @DeleteMapping("/delete/{id}")
    public void update(@PathVariable("id") Integer id){
        departmentService.delete(id);
    }
}
