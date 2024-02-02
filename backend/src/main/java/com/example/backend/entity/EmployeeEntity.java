package com.example.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "employee")
public class EmployeeEntity {
    @Id
    @Column(unique=true)
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
