package javasenior.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ApiRestTests {

	@BeforeEach
	void loadConfig() {
		System.out.println("Hola");
	}

	@Test
	void contextLoads() {
	}

}
