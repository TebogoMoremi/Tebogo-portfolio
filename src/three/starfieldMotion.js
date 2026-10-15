// Pure animation step: mutates preallocated buffers without per-star allocations.
export function stepStars(data, time, dt, cursor, width, height, interactive, compact) {
  const follow = 1 - Math.exp(-dt * 5);
    for (let i = 0; i < data.count; i++) {
      const offset = i * 3;
      const layer = data.base[offset + 2];
      const drift = Math.sin(time * (0.12 + layer * 0.035) + i * 1.7);
      let x = data.base[offset] + drift * (0.008 + layer * 0.004);
      let y = data.base[offset + 1] + Math.cos(time * 0.14 + i) * 0.009;
      x += cursor.x * (layer + 1) * 0.004;
      y += cursor.y * (layer + 1) * 0.003;
      const dx = (x - cursor.x) * width / 2;
      const dy = (y - cursor.y) * height / 2;
      const distance = Math.hypot(dx, dy);
      const influence = interactive ? Math.max(0, 1 - distance / 145) ** 2 : 0;
      if (distance > 0.1) {
        x += dx / distance * influence * (8 + layer * 5) * 2 / width;
        y += dy / distance * influence * (8 + layer * 5) * 2 / height;
      }
      data.heat[i] = Math.max(influence, data.heat[i] * Math.exp(-dt * 2.5));
      data.positions[offset] += (x - data.positions[offset]) * follow;
      data.positions[offset + 1] += (y - data.positions[offset + 1]) * follow;
      // Lower contrast behind the copy; a gentle luminance trail lingers on exit.
      const textMask = !compact && x < 0 ? 0.55 : 1;
      // Only one star in seven twinkles; modulation stays within 12% of rest.
      const twinkle = i % 7 === 0 ? 1 + Math.sin(time * 0.7 + i * 1.9) * 0.12 : 1;
      data.brightness[i] = (data.resting[i] * twinkle + data.heat[i] * 0.28) * textMask;
    }
}
