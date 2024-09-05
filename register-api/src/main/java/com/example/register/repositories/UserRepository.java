package com.example.register.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.register.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    @Query("FROM User u WHERE u.email = :email")
    public User findByEmail(String email);

}
