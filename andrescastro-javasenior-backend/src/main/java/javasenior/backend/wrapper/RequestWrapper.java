package javasenior.backend.wrapper;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import javasenior.backend.entity.Course;
import javasenior.backend.security.entity.Student;

import java.util.List;

@JsonDeserialize
public class RequestWrapper {

    List<Student> student;
    Course course;

    public List<Student> getStudent() {
        return student;
    }

    public void setStudent(List<Student> student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

}
