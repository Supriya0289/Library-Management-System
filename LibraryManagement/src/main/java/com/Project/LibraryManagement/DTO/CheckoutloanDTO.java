package com.Project.LibraryManagement.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CheckoutloanDTO {
    private Long bookId;
    private  Long userId;

}
