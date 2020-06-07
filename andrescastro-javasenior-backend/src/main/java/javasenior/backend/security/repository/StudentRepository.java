package javasenior.backend.security.repository;

import javasenior.backend.security.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findByNameUser(String nameUser);
    boolean existsByNameUser(String nameUser);
    boolean existsByRut(String rut);

}
