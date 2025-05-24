package com.fabdev.AlbirLeaks.jobs.mappers;

import com.fabdev.AlbirLeaks.jobs.Job; // Verifica importación
import com.fabdev.AlbirLeaks.jobs.dto.JobSummaryDto;

public class JobMapper {
    // ... (tus otros mappers si existen) ...

    public static JobSummaryDto toJobSummaryDto(Job job) {
         if (job == null) return null;
         // Asegúrate que Job tiene getJobId()
         return new JobSummaryDto(job.getJobId(), job.getJobTitle());
    }
} 