package com.tebogo.portfolioai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class GeminiService {

    private static final String GEMINI_URL =
        "https://generativelanguage.googleapis.com/v1beta/interactions";

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final String apiKey;

    public GeminiService(ObjectMapper objectMapper) {

        this.objectMapper = objectMapper;
        this.apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException(
                "GEMINI_API_KEY environment variable is not set."
            );
        }

        this.restClient = RestClient.builder()
            .baseUrl(GEMINI_URL)
            .build();
    }

    public String ask(String question) {

        try {

            Map<String, Object> requestBody = Map.of(
                "model", "gemini-3.6-flash",
                "input", question
            );

            String jsonResponse =
                restClient.post()
                    .header("x-goog-api-key", apiKey)
                    .header("Content-Type", "application/json")
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            if (jsonResponse == null || jsonResponse.isBlank()) {
                return "I could not generate a response.";
            }

            JsonNode root = objectMapper.readTree(jsonResponse);

            JsonNode steps = root.get("steps");

            if (steps != null && steps.isArray()) {

                for (JsonNode step : steps) {

                    if ("model_output".equals(
                        step.path("type").asText()
                    )) {

                        JsonNode content = step.get("content");

                        if (content != null && content.isArray()) {

                            for (JsonNode part : content) {

                                if ("text".equals(
                                    part.path("type").asText()
                                )) {

                                    String text =
                                        part.path("text").asText();

                                    if (!text.isBlank()) {
                                        return text;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            System.err.println(
                "Gemini returned a response but no model text was found:"
            );

            System.err.println(jsonResponse);

            return "I could not generate a response.";

        } catch (Exception e) {

            System.err.println(
                "Gemini request failed: "
                    + e.getClass().getSimpleName()
                    + " - "
                    + e.getMessage()
            );

            return """
                The portfolio AI assistant is temporarily unavailable.
                Please try again shortly.
                """.trim();
        }
    }
}