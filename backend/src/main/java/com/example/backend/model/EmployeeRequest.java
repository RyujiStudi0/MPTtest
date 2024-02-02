package com.example.backend.model;

import lombok.Data;

import java.util.Date;

@Data
public class EmployeeRequest {
    private String employeeNo;
    private Date createdDate;
    private String createdBy;
    private Date updatedDate;
    private String updatedBy;
    private String firstName;
    private String lastName;
    private String position;
    private String phoneNumber;
    private String email;
    private Integer departmentId;
}
