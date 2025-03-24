package com.tienda.app.controllers;

import com.tienda.app.dtos.auth.*;
import com.tienda.app.exception.InvalidPasswordException;
import com.tienda.app.exception.UserNotFoundException;
import com.tienda.app.models.User;
import com.tienda.app.models.UserInfo;
import com.tienda.app.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/*
*
* http://localhost:8080/ -> Esta es la URL base para conectarnos a SpringBoot
* http://localhost:8080/api -> Si tenemos el context-path en app.properties, la URL base cambia
*
* * */

// http://localhost:8080/api/users

/*
*
* 200 -> Todo bien
* 201 -> Todo bien pero para update
* 204 -> Todo bien pero para borrar
* 400 -> Error de identification
* 401 -> Error de datos incorrectos
* 403 -> Permiso denegado
* 404 -> No se ha encontrado
* 500 -> Error en el servidor. Esto ocurre por fallo en el código
*
* */
@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(this.userService.getAllUsers());
    }

    // http://localhost:8080/api/users/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest credentials) {
        try {
            LoginResponse loginResponse = this.userService.login(credentials);
            return ResponseEntity.ok(loginResponse);
        }
        catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            User user = this.userService.createUser(registerRequest);
            return ResponseEntity.ok(user);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/check-token")
    public ResponseEntity<Boolean> checkToken(@RequestBody CheckTokenRequest checkTokenRequest) {
        return ResponseEntity.ok(this.userService.checkToken(checkTokenRequest));
    }

    // New endpoint to fetch user profile
    @GetMapping("/profile")
    public ResponseEntity< Map<String, Object> > getUserProfile() {
        // Get the authenticated user's username from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Fetch the user's profile data
        User user = userService.getUserByUsername(username);

        if (user != null) {
            // Fetch the associated UserInfo
            UserInfo userInfo = user.getUserInfo();

            Map<String, Object> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("role", user.getRole().getRoleName()); // Assuming Role has a getRoleName() method
            response.put("firstName", userInfo != null ? userInfo.getFirstName() : null);
            response.put("lastName", userInfo != null ? userInfo.getLastName() : null);
            response.put("address", userInfo != null ? userInfo.getAddress() : null);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(null); // User not found
        }
    }
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            userService.changePassword(username, request.getOldPassword(), request.getNewPassword());

            return ResponseEntity.ok().body(Map.of("message", "Password changed successfully"));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        } catch (InvalidPasswordException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }
}
