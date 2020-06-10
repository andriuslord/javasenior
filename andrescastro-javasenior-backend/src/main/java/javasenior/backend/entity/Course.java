package javasenior.backend.entity;

import com.fasterxml.jackson.annotation.*;
import javasenior.backend.security.entity.Student;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Course {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    private String name;

    @Column(length = 4)
    private String code;

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "comanda_pizza",
//            joinColumns = { @JoinColumn(name = "user_id") },
//            inverseJoinColumns = { @JoinColumn(name = "pizza_id") }
//    )

//    @OneToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE,
//            CascadeType.REFRESH}, orphanRemoval=true)

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "student",
//            joinColumns = { @JoinColumn(name = "user_id") },
//            inverseJoinColumns = { @JoinColumn(name = "pizza_id") }
//    )
//    @ManyToOne(optional = false) // Correto
//    @JoinColumn(name = "rut")
//    private Collection<Student> students = new ArrayList<>();

    //    @ManyToOne(optional = false) // Correto
//    @JoinColumn(name = "rut")

//    @OneToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE,
//            CascadeType.REFRESH}, orphanRemoval=true)
//    @OneToMany(mappedBy = "course")
@JsonProperty
@OneToMany(mappedBy = "course", fetch=FetchType.EAGER)
    //@OneToMany(cascade = CascadeType.ALL, mappedBy = "course")
@JsonBackReference
@JsonIgnore
    private List<Student> students;

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

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

//    public Collection<Student> getStudents() {
//        return students;
//    }
//
//    public void setStudents(Collection<Student> students) {
//        this.students = students;
//    }


//    public List<Student> getStudents() {
//        return students;
//    }
//
//    public void setStudents(List<Student> students) {
//        this.students = students;
//    }
}
