package fst.cvinsight.backend.exception;

public class ResumeExtractionException extends ResumeProcessingException {
    public ResumeExtractionException(Throwable cause) {
        super("Failed to extract text from CV", cause);
    }
}