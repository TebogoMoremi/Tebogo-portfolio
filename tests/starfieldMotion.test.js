import test from "node:test";
import assert from "node:assert/strict";
import { stepStars } from "../src/three/starfieldMotion.js";

function field(x = 0.04) {
  return { count: 1, base: new Float32Array([x, 0, 2]), positions: new Float32Array([x, 0, 0]), resting: new Float32Array([0.4]), brightness: new Float32Array([0.4]), heat: new Float32Array(1) };
}
function advance(data, interactive, frames = 120, compact = false) {
  for (let frame = 0; frame < frames; frame++) stepStars(data, 0, 1 / 60, { x: 0, y: 0 }, 1000, 800, interactive, compact);
}
test("nearby stars move gently away and brighten, then return after the pointer leaves", () => {
  const near = field();
  const ambient = field();
  advance(near, true); advance(ambient, false);
  const pixels = (near.positions[0] - ambient.positions[0]) * 500;
  assert.ok(pixels > 5 && pixels < 20, `Displacement ${pixels}px should stay within the requested range`);
  assert.ok(near.brightness[0] > ambient.brightness[0]);
  advance(near, false, 300);
  assert.ok(Math.abs(near.positions[0] - ambient.positions[0]) * 500 < 0.1);
  assert.ok(near.heat[0] < 0.0001);
});
test("stars outside the influence radius remain unaffected", () => {
  const far = field(0.8); const ambient = field(0.8);
  advance(far, true); advance(ambient, false);
  assert.deepEqual(far.positions, ambient.positions);
  assert.deepEqual(far.brightness, ambient.brightness);
});
test("ambient touch mode does not leave a cursor glow and reuses its arrays", () => {
  const mobile = field(); const positions = mobile.positions;
  advance(mobile, false, 120, true);
  assert.equal(mobile.heat[0], 0);
  assert.equal(mobile.positions, positions);
  assert.ok([...mobile.positions].every(Number.isFinite));
});
