package fst.cvinsight.backend.exception;

public class ResumeAnalysisException extends ResumeProcessingException {
    public ResumeAnalysisException(Throwable cause) {
        super("Failed to analyze CV using AI model", cause);
    }
}
