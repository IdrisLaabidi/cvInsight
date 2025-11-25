package fst.cvinsight.backend.model;

import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class CareerRecommendationRequest {
    private List<UUID> resumeIds;
    private RecommendationFilters filters;
}
