package com.example.backend.service;

import com.example.backend.entity.EmployeeEntity;
import com.example.backend.model.EmployeeRequest;
import com.example.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;
    public List<EmployeeEntity> getAll(){
        return employeeRepository.findAll();
    }

    public Optional<EmployeeEntity> getById(String id){
        return employeeRepository.findById(id);
    }

    public EmployeeEntity create(EmployeeRequest employeeRequest){
        Calendar calendar = Calendar.getInstance();
        Date currentDate = calendar.getTime();
        EmployeeEntity employeeEntity = new EmployeeEntity();
        employeeEntity.setEmployeeNo(employeeRequest.getEmployeeNo());
        employeeEntity.setCreatedDate(currentDate);
        employeeEntity.setCreatedBy(employeeRequest.getCreatedBy());
        employeeEntity.setEmail(employeeRequest.getEmail());
        employeeEntity.setFirstName(employeeRequest.getFirstName());
        employeeEntity.setDepartmentId(employeeRequest.getDepartmentId());
        employeeEntity.setPosition(employeeRequest.getPosition());
        employeeEntity.setLastName(employeeRequest.getLastName());
        employeeEntity.setPhoneNumber(employeeRequest.getPhoneNumber());
//        employeeEntity.setUpdatedBy(employeeRequest.getUpdatedBy());
//        employeeEntity.setUpdatedDate(employeeRequest.getUpdatedDate());
        return employeeRepository.save(employeeEntity);
    }

    public EmployeeEntity update(EmployeeRequest employeeRequest,String id){
        Calendar calendar = Calendar.getInstance();
        Date currentDate = calendar.getTime();
//        EmployeeEntity employeeEntity = getById(id).get(); เขียนได้2แบบ
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        employeeEntity.setEmployeeNo(employeeRequest.getEmployeeNo());
//        employeeEntity.setCreatedDate(employeeRequest.getCreatedDate());
//        employeeEntity.setCreatedBy(employeeRequest.getCreatedBy());
        employeeEntity.setEmail(employeeRequest.getEmail());
        employeeEntity.setFirstName(employeeRequest.getFirstName());
        employeeEntity.setDepartmentId(employeeRequest.getDepartmentId());
        employeeEntity.setPosition(employeeRequest.getPosition());
        employeeEntity.setLastName(employeeRequest.getLastName());
        employeeEntity.setPhoneNumber(employeeRequest.getPhoneNumber());
        employeeEntity.setUpdatedBy(employeeRequest.getUpdatedBy());
        employeeEntity.setUpdatedDate(currentDate);
        return employeeRepository.save(employeeEntity);
    }

    public void delete(String id){
        employeeRepository.deleteById(id);
    }
}
