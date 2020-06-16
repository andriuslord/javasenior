package javasenior.backend.security.controller;

import javasenior.backend.dto.message;
import javasenior.backend.entity.Course;
import javasenior.backend.security.dto.JwtDto;
import javasenior.backend.security.dto.LoginStudent;
import javasenior.backend.security.dto.NewStudent;
import javasenior.backend.security.entity.Student;
import javasenior.backend.security.jwt.JwtProvider;
import javasenior.backend.security.service.StudentService;
import javasenior.backend.service.CourseService;
import javasenior.backend.wrapper.GenericWrapper;
import javasenior.backend.wrapper.RequestWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    StudentService studentService;
    @Autowired
    CourseService courseService;



    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/new")
    public ResponseEntity<?> nuevo(@Valid @RequestBody NewStudent newStudent, BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity(new message("email inválid"), HttpStatus.BAD_REQUEST);
        if(studentService.existsByNameStudent(newStudent.getNameUser()))
            return new ResponseEntity(new message("that nameUser already exists"), HttpStatus.BAD_REQUEST);
        if(studentService.existsByRut(newStudent.getRut()))
            return new ResponseEntity(new message("that rut already exists"), HttpStatus.BAD_REQUEST);
        if((newStudent.getAge() < 18))
            return new ResponseEntity(new message("Age should not be less than 18"), HttpStatus.BAD_REQUEST);
        Student student =
                new Student(newStudent.getRut(),newStudent.getName(),newStudent.getLastName(),newStudent.getAge(), newStudent.getNameUser(),
                        passwordEncoder.encode(newStudent.getPassword()));
        studentService.save(student);
        return new ResponseEntity(new message("Student save"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginStudent loginStudent, BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity(new message("invalid fields"), HttpStatus.BAD_REQUEST);
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginStudent.getNameUser(), loginStudent.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
        return new ResponseEntity(jwtDto, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Student>> list(){
        List<Student> list = studentService.list();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        String response = "Hola";
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping(path = "/create", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericWrapper<Course> saveCourse(@RequestBody RequestWrapper requestWrapper) {


        Course course = requestWrapper.getCourse();
        Student student = requestWrapper.getStudent();


        GenericWrapper<Course> wrapper = new GenericWrapper<>();
        try {
            setResponse(wrapper, this.studentService.saveCourse(course,student));
            return wrapper;
        } catch (Exception e) {
            setResponse(wrapper, e);
            return wrapper;
        }
    }
    public <T> void setResponse(GenericWrapper<T> wrapper, Exception e){
        wrapper.setErrorCode("-99");
        wrapper.setErrorMessage("Ocurrio un error inesperado. Causa : " + e);
    }
    public <T> void setResponse(GenericWrapper<T> wrapper, T o){
        wrapper.setData(o);
    }


}
