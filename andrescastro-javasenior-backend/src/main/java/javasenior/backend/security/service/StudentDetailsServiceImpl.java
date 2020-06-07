package javasenior.backend.security.service;

import javasenior.backend.security.entity.MainStudent;
import javasenior.backend.security.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class StudentDetailsServiceImpl implements UserDetailsService {

    @Autowired
    StudentService studentService;

    @Override
    public UserDetails loadUserByUsername(String nameUser) throws UsernameNotFoundException {
        Student student = studentService.getByNameStudent(nameUser).get();
        return new MainStudent(student.getRut(),student.getName(),student.getLastName(),student.getAge(), student.getNameUser(), student.getPassword());
    }
}
