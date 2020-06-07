package javasenior.backend.security.controller;

import javasenior.backend.dto.message;
import javasenior.backend.security.dto.JwtDto;
import javasenior.backend.security.dto.LoginStudent;
import javasenior.backend.security.dto.NewStudent;
import javasenior.backend.security.entity.Student;
import javasenior.backend.security.jwt.JwtProvider;
import javasenior.backend.security.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    JwtProvider jwtProvider;

    @PostMapping("/new")
    public ResponseEntity<?> nuevo(@Valid @RequestBody NewStudent newStudent, BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity(new message("email inválid"), HttpStatus.BAD_REQUEST);
        if(studentService.existsByNameStudent(newStudent.getNameUser()))
            return new ResponseEntity(new message("that name already exists"), HttpStatus.BAD_REQUEST);
        if(studentService.existsByRut(newStudent.getRut()))
            return new ResponseEntity(new message("that rut already exists"), HttpStatus.BAD_REQUEST);
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
}
