package javasenior.backend.wrapper;

import javasenior.backend.entity.Course;
import javasenior.backend.security.entity.Student;


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
