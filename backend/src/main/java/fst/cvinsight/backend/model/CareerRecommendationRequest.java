package fst.cvinsight.backend.model;

import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.UUID;

@Getter
@ToString
public class CareerRecommendationRequest {
    private List<UUID> resumeIds;
    private RecommendationFilters filters;
}
