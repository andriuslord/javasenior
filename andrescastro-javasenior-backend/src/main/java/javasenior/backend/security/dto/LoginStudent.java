package javasenior.backend.security.dto;

import javax.validation.constraints.NotBlank;

public class LoginStudent {
    @NotBlank
    private String nameUser;
    @NotBlank
    private String password;

    public String getNameUser() {
        return nameUser;
    }

    public void setgetNameUser(String nameUser) {
        this.nameUser = nameUser;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
