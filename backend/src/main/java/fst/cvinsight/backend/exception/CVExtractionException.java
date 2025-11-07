package fst.cvinsight.backend.exception;

public class CVExtractionException extends CVProcessingException {
    public CVExtractionException(Throwable cause) {
        super("Failed to extract text from CV", cause);
    }
}