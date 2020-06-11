package javasenior.backend.security.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class MainStudent implements UserDetails {
    private String rut;
    private String name;
    private String lastName;
    private int age;
    private String nameUser;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public MainStudent(String rut,String name,String lastName,int age, String nameUser, String password) {
        this.rut = rut;
        this.name = name;
        this.age = age;
        this.lastName = lastName;
        this.nameUser = nameUser;
        this.password = password;

    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return nameUser;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getName() {
        return name;
    }

}
