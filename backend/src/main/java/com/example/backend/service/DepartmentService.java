package com.example.backend.service;

import com.example.backend.entity.DepartmentEntity;
import com.example.backend.model.DepartmentRequest;
import com.example.backend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {
    @Autowired
    DepartmentRepository departmentRepository;
    public List<DepartmentEntity> getAll(){
        return departmentRepository.findAll();
    }

    public Optional<DepartmentEntity> getById(Integer id) {
        return departmentRepository.findById(id);
    }

    public DepartmentEntity create(DepartmentRequest departmentRequest){
        Calendar calendar = Calendar.getInstance();
        Date currentDate = calendar.getTime();
        DepartmentEntity departmentEntity = new DepartmentEntity();
        departmentEntity.setCreatedBy(departmentRequest.getCreatedBy());
        departmentEntity.setDepartmentName(departmentRequest.getDepartmentName());
        departmentEntity.setHeadOfDepartment(departmentRequest.getHeadOfDepartment());
        departmentEntity.setCreatedDate(currentDate);
        departmentEntity.setUpdatedBy(departmentRequest.getUpdatedBy());
        departmentEntity.setUpdatedDate(departmentRequest.getUpdatedDate());
        return departmentRepository.save(departmentEntity);
    }

    public DepartmentEntity update(DepartmentRequest departmentRequest,Integer id){
        Calendar calendar = Calendar.getInstance();
        Date currentDate = calendar.getTime();
        DepartmentEntity departmentEntity = departmentRepository.findById(id).get();
        departmentEntity.setCreatedBy(departmentRequest.getCreatedBy());
        departmentEntity.setDepartmentName(departmentRequest.getDepartmentName());
        departmentEntity.setHeadOfDepartment(departmentRequest.getHeadOfDepartment());
        departmentEntity.setCreatedDate(departmentRequest.getCreatedDate());
        departmentEntity.setUpdatedBy(departmentRequest.getUpdatedBy());
        departmentEntity.setUpdatedDate(currentDate);
        return departmentRepository.save(departmentEntity);
    }

    public void delete(Integer id){
        departmentRepository.deleteById(id);
    }
}
