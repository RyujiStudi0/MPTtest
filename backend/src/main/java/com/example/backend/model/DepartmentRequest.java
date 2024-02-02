package com.example.backend.model;

import lombok.Data;

import java.util.Date;
@Data
public class DepartmentRequest {
    private Date createdDate;
    private String createdBy;
    private Date updatedDate;
    private String updatedBy;
    private String departmentName;
    private String headOfDepartment;
}
