package com.tebogo.portfolioai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

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
        this.apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException(
                "GEMINI_API_KEY environment variable is not set."
            );
        }

        this.restClient =
            RestClient.builder()
                .baseUrl(GEMINI_URL)
                .build();
    }

    public String ask(String question) {

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
                throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Gemini returned an empty response."
                );
            }

            JsonNode root =
                objectMapper.readTree(jsonResponse);

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

                    if (!"model_output".equals(type)) {
                        continue;
                    }

                    JsonNode content =
                        step.path("content");

                    if (!content.isArray()) {
                        continue;
                    }

                    for (JsonNode part : content) {

                        String text =
                            part.path("text").asText("");

                        if (!text.isBlank()) {
                            return text;
                        }
                    }
                }
            }

            throw new ResponseStatusException(
                HttpStatus.BAD_GATEWAY,
                "Gemini completed but returned no model text."
            );

        } catch (
            HttpClientErrorException.TooManyRequests e
        ) {

            System.err.println(
                "Gemini rate limit reached."
            );

            System.err.println(
                "Gemini HTTP status: 429"
            );

            throw new ResponseStatusException(
                HttpStatus.TOO_MANY_REQUESTS,
                "AI request limit reached. Please try again shortly."
            );

        } catch (ResponseStatusException e) {

            throw e;

        } catch (Exception e) {

            System.err.println(
                "Gemini request failed."
            );

            System.err.println(
                "Type: "
                    + e.getClass().getName()
            );

            System.err.println(
                "Message: "
                    + e.getMessage()
            );

            throw new ResponseStatusException(
                HttpStatus.BAD_GATEWAY,
                "The AI service is temporarily unavailable."
            );
        }
    }
}