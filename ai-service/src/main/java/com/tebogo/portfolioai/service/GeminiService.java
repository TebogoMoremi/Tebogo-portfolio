package com.tebogo.portfolioai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import java.util.Map;
import java.util.Optional;

@Service
public class GeminiService {

    private static final String GEMINI_URL =
        "https://generativelanguage.googleapis.com/v1beta/interactions";

    private static final String MODEL =
        "gemini-3.8-flash";

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final String apiKey;

    public GeminiService(ObjectMapper objectMapper) {

        this.objectMapper = objectMapper;

        this.apiKey =
            System.getenv("GEMINI_API_KEY");

        this.restClient =
            RestClient.builder()
                .baseUrl(GEMINI_URL)
                .build();

        if (isAvailable()) {
            System.out.println(
                "Gemini integration is available."
            );
        } else {
            System.out.println(
                "Gemini integration is disabled. " +
                "Local portfolio answers will still work."
            );
        }
    }

    /**
     * Returns true when a Gemini API key is available.
     */
    public boolean isAvailable() {

        return apiKey != null &&
               !apiKey.isBlank();
    }

    /**
     * Attempts to ask Gemini.
     *
     * Optional.empty() means Gemini could not provide
     * an answer. This allows the portfolio assistant
     * to continue working with local knowledge.
     */
    public Optional<String> ask(String question) {

        if (!isAvailable()) {

            System.out.println(
                "Gemini skipped because API key is unavailable."
            );

            return Optional.empty();
        }

        try {

            Map<String, Object> requestBody =
                Map.of(
                    "model", MODEL,
                    "input", question
                );

            String jsonResponse =
                restClient
                    .post()
                    .header(
                        "x-goog-api-key",
                        apiKey
                    )
                    .header(
                        "Content-Type",
                        "application/json"
                    )
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            if (
                jsonResponse == null ||
                jsonResponse.isBlank()
            ) {

                System.err.println(
                    "Gemini returned an empty response."
                );

                return Optional.empty();
            }

            JsonNode root =
                objectMapper.readTree(
                    jsonResponse
                );

            String status =
                root.path("status").asText();

            System.out.println(
                "Gemini status: " + status
            );

            JsonNode steps =
                root.path("steps");

            if (steps.isArray()) {

                for (JsonNode step : steps) {

                    String type =
                        step.path("type").asText();

                    if (
                        !"model_output".equals(type)
                    ) {
                        continue;
                    }

                    JsonNode content =
                        step.path("content");

                    if (!content.isArray()) {
                        continue;
                    }

                    for (JsonNode part : content) {

                        String text =
                            part
                                .path("text")
                                .asText("");

                        if (!text.isBlank()) {

                            return Optional.of(
                                text
                            );
                        }
                    }
                }
            }

            System.err.println(
                "Gemini completed but returned no model text."
            );

            return Optional.empty();

        } catch (
            HttpClientErrorException.TooManyRequests e
        ) {

            /*
             * IMPORTANT:
             *
             * Gemini's free-tier quota has been exhausted.
             *
             * Do NOT propagate HTTP 429 to React.
             *
             * Our own RateLimitService is responsible for
             * visitor-level 429 responses.
             */

            System.err.println(
                "Gemini free-tier quota reached."
            );

            System.err.println(
                "Gemini HTTP status: 429"
            );

            return Optional.empty();

        } catch (Exception e) {

            /*
             * Gemini being unavailable should never make
             * the whole portfolio assistant unavailable.
             */

            System.err.println(
                "Gemini request failed."
            );

            System.err.println(
                "Type: " +
                e.getClass().getSimpleName()
            );

            System.err.println(
                "Message: " +
                e.getMessage()
            );

            return Optional.empty();
        }
    }
}