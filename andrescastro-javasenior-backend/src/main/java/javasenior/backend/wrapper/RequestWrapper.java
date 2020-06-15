package javasenior.backend.wrapper;

import javasenior.backend.entity.Course;
import javasenior.backend.security.entity.Student;
import org.springframework.web.bind.annotation.ControllerAdvice;

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
