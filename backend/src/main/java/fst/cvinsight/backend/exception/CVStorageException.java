package fst.cvinsight.backend.exception;

public class CVStorageException extends CVProcessingException {
    public CVStorageException(Throwable cause) {
        super("Failed to save CV to database", cause);
    }
}
