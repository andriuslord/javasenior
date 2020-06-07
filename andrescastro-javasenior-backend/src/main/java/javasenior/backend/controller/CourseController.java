package javasenior.backend.controller;

import javasenior.backend.dto.message;
import javasenior.backend.dto.CourseDto;
import javasenior.backend.entity.Course;
import javasenior.backend.service.CourseService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    CourseService courseService;

    @GetMapping("/list")
    public ResponseEntity<List<Course>> list(){
        List<Course> list = courseService.list();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Course> getById(@PathVariable("id") int id){
        if(!courseService.existsById(id))
            return new ResponseEntity(new message("does not exist"), HttpStatus.NOT_FOUND);
        Course course = courseService.getOne(id).get();
        return new ResponseEntity(course, HttpStatus.OK);
    }

    @GetMapping("/detailname/{name}")
    public ResponseEntity<Course> getByName(@PathVariable("name") String name){
        if(!courseService.existsByName(name))
            return new ResponseEntity(new message("does not exist"), HttpStatus.NOT_FOUND);
        Course course = courseService.getByName(name).get();
        return new ResponseEntity(course, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CourseDto courseDto){
        if(StringUtils.isBlank(courseDto.getName()))
            return new ResponseEntity(new message("the name is required"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(courseDto.getCode()))
            return new ResponseEntity(new message("the code is required"), HttpStatus.BAD_REQUEST);
        if(courseService.existsByName(courseDto.getName()))
            return new ResponseEntity(new message("that name already exists"), HttpStatus.BAD_REQUEST);
        Course course = new Course(courseDto.getName(), courseDto.getCode());
        courseService.save(course);
        return new ResponseEntity(new message("created course"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody CourseDto courseDto){
        if(!courseService.existsById(id))
            return new ResponseEntity(new message("does not exist"), HttpStatus.NOT_FOUND);
        if(courseService.existsByName(courseDto.getName()) && courseService.getByName(courseDto.getName()).get().getId() != id)
            return new ResponseEntity(new message("that name already exists"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(courseDto.getName()))
            return new ResponseEntity(new message("the name is required"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(courseDto.getCode()))
            return new ResponseEntity(new message("the code is required"), HttpStatus.BAD_REQUEST);

        Course course = courseService.getOne(id).get();
        course.setName(courseDto.getName());
        course.setCode(courseDto.getCode());
        courseService.save(course);
        return new ResponseEntity(new message("course update"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")int id){
        if(!courseService.existsById(id))
            return new ResponseEntity(new message("does not exist"), HttpStatus.NOT_FOUND);
        courseService.delete(id);
        return new ResponseEntity(new message("course removed"), HttpStatus.OK);
    }


}