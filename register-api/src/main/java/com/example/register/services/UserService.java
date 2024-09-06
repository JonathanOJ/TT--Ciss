package com.example.register.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.register.models.User;
import com.example.register.repositories.UserRepository;


@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public Optional<User> findById(Long id) {
        Optional<User> user;
        try {
            user = this.userRepository.findById(id);
            return user;
        } catch (Exception e) {
            throw new RuntimeException("Usuário não encontrado! id: " + id);
        }
        
    }

    public User findByEmail(String email) {
        User user = (this.userRepository.findByEmail(email));
        return user;
    }
    
    @Transactional
    public ResponseEntity<Object> save(User user) {
        try {
            if(user.getId() == null || user.getId() == 0) {
                User userExists = findByEmail(user.getEmail());
                if(userExists != null) {
                    return new ResponseEntity<>("E-mail já cadastrado.", HttpStatus.BAD_REQUEST);
                }

                User nisExists = this.userRepository.findByNis(user.getNis());
                if(nisExists != null) {
                    return new ResponseEntity<>("NIS já cadastrado.", HttpStatus.BAD_REQUEST);
                }
            }

            String validationMessage = userDtoValidator(user);

            if (validationMessage != null) {
                return new ResponseEntity<>(validationMessage, HttpStatus.BAD_REQUEST);
            }

            User savedUser = this.userRepository.save(user);
            return new ResponseEntity<>(savedUser, HttpStatus.OK); 
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao salvar o usuário!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String userDtoValidator(User user) {
        if (user.getName() == null || user.getName().isEmpty() || user.getName().length() < 2 || user.getName().length() > 30) {
            return "O nome é obrigatório e deve ter entre 2 e 30 caracteres.";
        }
        if (user.getEmail() == null || user.getEmail().isEmpty() || !isEmailValid(user.getEmail())) {
            return "É necessário um e-mail válido.";
        }
        if (user.getSurname() == null || user.getSurname().isEmpty() || user.getSurname().length() < 2 || user.getSurname().length() > 50) {
            return "O sobrenome é obrigatório e deve ter entre 2 e 50 caracteres.";
        }
        if (user.getNis() == null || user.getNis().isEmpty() || user.getNis().length() != 11) {
            return "O NIS é obrigatório e deve ter 11 caracteres.";
        }

        return null; 
    }

    private Boolean isEmailValid(String email) {
        return email.contains("@") && email.contains(".");
    }

    @Transactional
    public void delete(Long id) {
        try {
            findById(id);
            this.userRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao deletar o usuário! id: " + id);
        }
    }
    
    public Iterable<User> findAll() {
        try {
            return this.userRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao encontrar todos os usuários!");
        }
    }

}
