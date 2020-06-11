package javasenior.backend.wrapper;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import javasenior.backend.entity.Course;
import javasenior.backend.security.entity.Student;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.List;

@ControllerAdvice
public class RequestWrapper {

    Student student;
    Course course;

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

}
