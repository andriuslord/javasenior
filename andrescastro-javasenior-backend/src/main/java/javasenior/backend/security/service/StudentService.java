package javasenior.backend.security.service;

import javasenior.backend.entity.Course;
import javasenior.backend.repository.CourseRepository;
import javasenior.backend.security.dto.NewStudent;
import javasenior.backend.security.entity.Student;
import javasenior.backend.security.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentService {

    @Autowired
    StudentRepository studentRepository;
    @Autowired
    CourseRepository courseRepository;

    public Optional<Student> getByNameStudent(String nameUser){
        return studentRepository.findByNameUser(nameUser);
    }

    public boolean existsByNameStudent(String nameUser){
        return studentRepository.existsByNameUser(nameUser);
    }

    public boolean existsByRut(String rut){
        return studentRepository.existsByRut(rut);
    }

    public void save(Student student){
        studentRepository.save(student);
    }

    public List<Student> list(){
        return studentRepository.findAll();
    }

    public Course saveCourse(Course course, List<Student> student) {
        this.courseRepository.save(course);
     //   this.studentRepository.save(student);
        List<Student> studentBuyer = this.studentRepository.findByName(student);
        List<Course> courses = new ArrayList<>();
        courses.add(course);
        course.setStudents(student);
      //  studentBuyer.getCourses().addAll(courses);

        return course;

    }

}
