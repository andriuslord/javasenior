package javasenior.backend.service;

import javasenior.backend.entity.Course;
import javasenior.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CourseService {

    @Autowired
    CourseRepository courseRepository;

    public List<Course> list(){
        return courseRepository.findAll();
    }

    public Optional<Course> getOne(int id){
        return courseRepository.findById(id);
    }

    public Optional<Course> getByName(String name){
        return courseRepository.findByName(name);
    }

    public void  save(Course course){
        courseRepository.save(course);
    }

    public void delete(int id){
        courseRepository.deleteById(id);
    }

    public boolean existsById(int id){
        return courseRepository.existsById(id);
    }

    public boolean existsByName(String name){
        return courseRepository.existsByName(name);
    }
}
