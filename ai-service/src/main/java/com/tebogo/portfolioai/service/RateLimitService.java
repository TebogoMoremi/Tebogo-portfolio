package com.tebogo.portfolioai.service;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {

    private static final int MAX_REQUESTS = 10;
    private static final long WINDOW_SECONDS = 60;

    private final Map<String, ClientWindow> clients =
        new ConcurrentHashMap<>();

    public boolean isAllowed(String clientIp) {

        long now = Instant.now().getEpochSecond();

        ClientWindow window = clients.compute(
            clientIp,
            (ip, current) -> {

                if (
                    current == null ||
                    now - current.windowStart() >= WINDOW_SECONDS
                ) {
                    return new ClientWindow(now, 1);
                }

                return new ClientWindow(
                    current.windowStart(),
                    current.requestCount() + 1
                );
            }
        );

        System.out.println(
            "RATE LIMIT -> IP=" + clientIp +
            " COUNT=" + window.requestCount()
        );

        return window.requestCount() <= MAX_REQUESTS;
    }

    private record ClientWindow(
        long windowStart,
        int requestCount
    ) {
    }
}