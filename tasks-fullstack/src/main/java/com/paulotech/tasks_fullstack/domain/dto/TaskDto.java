package com.paulotech.tasks_fullstack.domain.dto;

import com.paulotech.tasks_fullstack.domain.entities.TaskPriority;
import com.paulotech.tasks_fullstack.domain.entities.TaskStatus;
import java.time.LocalDateTime;
import java.util.UUID;

public record TaskDto(
        UUID id,
        String title,
        String description,
        LocalDateTime dueDate,
        TaskPriority priority,
        TaskStatus status
) {
}
