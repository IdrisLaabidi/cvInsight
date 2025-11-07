package fst.cvinsight.backend.exception;

public class CVAnalysisException extends CVProcessingException {
    public CVAnalysisException(Throwable cause) {
        super("Failed to analyze CV using AI model", cause);
    }
}
