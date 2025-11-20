package fst.cvinsight.backend.exception;

public class ResumeStorageException extends ResumeProcessingException {
    public ResumeStorageException(Throwable cause) {
        super("Failed to save CV to database", cause);
    }
}
