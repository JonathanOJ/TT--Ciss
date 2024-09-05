package com.example.register.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.register.models.User;
import com.example.register.services.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/user")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/findAll")
    public List<User> findAll() {
        return (List<User>) this.userService.findAll();
    }

    @GetMapping("/{id}")
    public  ResponseEntity<Optional<User>> findById(@PathVariable Long id) {
        Optional<User> user = this.userService.findById(id);
        return ResponseEntity.ok().body(user);
    }

    // Serve tanto pata salvar quanto para atualizar
    @PostMapping("/save")
    public ResponseEntity<Object> save(@RequestBody User user) {
        return this.userService.save(user);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.userService.delete(id);
    }

}
