package javasenior.backend.security.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import javasenior.backend.entity.Course;

import javax.validation.constraints.Min;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String rut;

    @NotNull
    private String name;
    @NotNull
    private String lastName;
    @NotNull
    @Min(value = 18, message = "Age should not be less than 18")
    private int age;
    @NotNull
    @Column(unique = true)
    private String nameUser;
    @NotNull
    private String password;

    public Student() {
    }

    public Student( @NotNull String rut, @NotNull String name, @NotNull String lastName,@NotNull int age, @NotNull String nameUser, @NotNull String password) {
        this.rut = rut;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.nameUser = nameUser;

        this.password = password;
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

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getNameUser() {
        return nameUser;
    }

    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "course_id")
    private Course course;

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    //    @OneToMany(mappedBy = "students")
//    private Collection<Course> course;
//
//    public Collection<Course> getCourse() {
//        return course;
//    }
//
//    public void setCourse(Collection<Course> course) {
//        this.course = course;
//    }
}
