package javasenior.backend.dto;

import javax.validation.constraints.NotBlank;

public class CourseDto {

    @NotBlank
    private String name;
    @NotBlank
    private String code;

    public CourseDto(@NotBlank String name,@NotBlank String code) {
        this.name = name;
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
