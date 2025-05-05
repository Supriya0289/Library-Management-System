package com.Project.LibraryManagement.Controller;


import com.Project.LibraryManagement.Model.Book;
import com.Project.LibraryManagement.Model.Borrower;
import com.Project.LibraryManagement.Service.BorrowerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrower")
@RequiredArgsConstructor
public class BorrowerController {
    private final BorrowerService borrowerService;


    @GetMapping
    public ResponseEntity<List<Borrower>> getAllBorrowers(){
        return ResponseEntity.ok( borrowerService.getAllBorrowers());
    }

    @GetMapping("/{id}")
    public  ResponseEntity<Borrower> getBorrowerById(@PathVariable Long id){
        return  ResponseEntity.ok(borrowerService.getBorrowerById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Borrower> updateBorrower(
            @PathVariable Long id,
            @RequestBody Borrower borrowerDetails) {
        return ResponseEntity.ok(borrowerService.updateBorrower(id, borrowerDetails));
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Void> deleteBorrower(@PathVariable Long id){
       borrowerService.deleteBorrower(id);
       return ResponseEntity.noContent().build();
    }

}
