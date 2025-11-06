package fst.cvinsight.backend.util;

import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.ocr.TesseractOCRConfig;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Component;
import org.xml.sax.SAXException;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Component
public class DocumentUtils {

    /**
     * Extracts text from PDF, DOC, DOCX, and performs OCR on scanned PDFs.
     */
    public String extractText(File file) throws IOException {
        try (FileInputStream stream = new FileInputStream(file)) {
            AutoDetectParser parser = new AutoDetectParser();
            BodyContentHandler handler = new BodyContentHandler(-1);
            Metadata metadata = new Metadata();

            // Configure OCR (Tesseract)
            TesseractOCRConfig tesseractConfig = new TesseractOCRConfig();
            tesseractConfig.setLanguage("eng+fra+deu+ara");
            tesseractConfig.setEnableImagePreprocessing(true);
            tesseractConfig.setPreserveInterwordSpacing(true);

            ParseContext context = new ParseContext();
            context.set(TesseractOCRConfig.class, tesseractConfig);

            parser.parse(stream, handler, metadata, context);
            String text = handler.toString().trim();

            if (text.isEmpty()) {
                throw new IOException("No text found or OCR failed");
            }

            return text;

        } catch (TikaException | SAXException e) {
            throw new IOException("Error extracting text: " + e.getMessage(), e);
        }
    }
}
