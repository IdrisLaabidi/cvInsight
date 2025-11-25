package fst.cvinsight.backend.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
class RecommendationFilters {

    private RecommendationType type;
    private List<RecommendationLevel> level;
    private PriceRange priceRange;
    private String priceMode;
    private List<String> duration;
    private List<String> providers;
    private String searchQuery;

    @Setter
    @Getter
    public static class PriceRange {
        private Integer min;
        private Integer max;

        public PriceRange() {}

        public PriceRange(Integer min, Integer max) {
            this.min = min;
            this.max = max;
        }

    }
}