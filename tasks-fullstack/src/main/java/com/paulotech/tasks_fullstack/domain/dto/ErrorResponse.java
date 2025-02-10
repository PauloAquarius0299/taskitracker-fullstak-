package com.paulotech.tasks_fullstack.domain.dto;

public record ErrorResponse(
        int status,
        String message,
        String details
) {
}
