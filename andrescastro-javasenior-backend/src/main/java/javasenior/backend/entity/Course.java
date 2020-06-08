package javasenior.backend.entity;
import javasenior.backend.security.entity.Student;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @Column(length = 4)
    private String code;
    @OneToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.REFRESH}, orphanRemoval=true)
    private List<Student> student = new ArrayList<>();

    public Course() {
    }

    public Course(String name, String code) {
        this.name = name;
        this.code = code;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<Student> getStudent() {
        return student;
    }

    public void setStudent(List<Student> student) {
        this.student = student;
    }
}
