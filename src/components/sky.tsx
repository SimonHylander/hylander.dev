"use client";

import { useEffect, useRef } from "react";

const reducedMotion = "(prefers-reduced-motion: reduce)";

/** Most pixels the shader draws per frame. Larger viewports render below CSS resolution and scale up. */
const PIXEL_BUDGET = 800_000;
/** Clouds move slowly, so 30 frames a second is enough. */
const FRAME_MS = 1000 / 30;

const vertex = /* glsl */ `
attribute vec2 corner;
void main() {
  gl_Position = vec4(corner, 0.0, 1.0);
}`;

const fragment = /* glsl */ `
precision highp float;

uniform vec2 u_view;    // canvas size in CSS px
uniform float u_ratio;  // buffer px per CSS px
uniform float u_unit;   // CSS px per noise unit
uniform float u_time;   // seconds
uniform float u_rise;   // CSS px the clouds have risen with the scroll
uniform float u_gain;   // 0..1 cloud strength
uniform vec3 u_sky;
uniform vec3 u_shade;
uniform vec3 u_lit;

const mat2 TURN = mat2(0.8, 0.6, -0.6, 0.8);

// A repeatable random point in 0..1 for each grid cell.
vec2 scatter(vec2 p) {
  return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453123);
}

vec2 slope(vec2 p) {
  return 2.0 * scatter(p) - 1.0;
}

// Gradient noise, about -0.7..0.7.
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(
    mix(dot(slope(i), f), dot(slope(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(slope(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(slope(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// A field of domes, one around a point in every cell. The points circle slower than the clouds
// drift, so the domes swell and merge without the bank losing its shape. A smooth minimum over the neighbours rounds the seams between cells.
float domes(vec2 p, float t) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float sum = 0.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 cell = vec2(float(x), float(y));
      vec2 point = 0.5 + 0.38 * sin(t + 6.2831853 * scatter(i + cell));
      vec2 d = cell + point - f;
      sum += pow(dot(d, d) + 0.0001, -3.0);
    }
  }
  return 1.0 - sqrt(pow(sum, -1.0 / 3.0));
}

// Cloud density: broad masses, three sizes of dome for the cauliflower edge of cumulus, then wisps.
float density(vec2 p) {
  float t = u_time;
  vec2 q = p * 0.5 + vec2(t * 0.004, 0.0);
  float mass = 0.6 * noise(q) + 0.3 * noise(TURN * q * 2.0 + vec2(t * 0.003, 0.0));
  vec2 r = p + vec2(t * 0.008, 0.0);
  r += 0.07 * vec2(noise(r * 2.3), noise(r * 2.3 + 31.7));
  float puff = 0.55 * domes(r * 1.6, t * 0.011) + 0.3 * domes(TURN * r * 3.3, t * 0.016) + 0.15 * domes(r * 6.9, t * 0.024);
  float wisp = 0.03 * noise(r * 11.0) + 0.015 * noise(r * 23.0);
  return mass + puff + wisp;
}

void main() {
  vec2 px = gl_FragCoord.xy / u_ratio;
  vec2 uv = px / u_view;
  float fromTop = u_view.y - px.y;
  vec2 p = vec2(px.x, px.y - u_rise) / u_unit;

  // Clear at the top, where the canvas meets the top bar. The bank builds toward the bottom right,
  // and rises less on a narrow screen, where the content spans the full width.
  float lift = 0.3 * min(u_view.x / u_view.y, 1.7);
  float bank = smoothstep(0.05, 0.95, 0.86 - uv.y + lift * smoothstep(0.35, 1.0, uv.x));
  float edge = mix(1.25, 0.3, bank);
  float d = density(p);
  float cover = smoothstep(edge, edge + 0.1, d) * smoothstep(0.0, 90.0, fromTop);

  // Light from the upper left: compare the density one step toward it.
  float toward = density(p + vec2(-0.03, 0.04));
  float lit = smoothstep(-0.1, 0.16, d - toward);

  // Shade is plum 2 and the brightest cloud is plum 3, so hairlines and muted text stay clear of it.
  vec3 color = mix(u_sky, mix(u_shade, u_lit, lit), cover * u_gain);

  // Dither, so the dark steps do not band. None on clear sky, which stays the exact page color.
  float grain = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  color += (grain - 0.5) / 255.0 * step(0.001, cover);

  gl_FragColor = vec4(color, 1.0);
}`;

/** Resolves a CSS color to 0..1 sRGB channels by painting one pixel with it. */
function channels(color: string) {
  const context = document.createElement("canvas").getContext("2d");
  if (!context) return [0, 0, 0] as const;
  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);
  const [r = 0, g = 0, b = 0] = context.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255] as const;
}

function compile(gl: WebGLRenderingContext, type: GLenum, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/**
 * The home page sky: a bank of night cumulus drifting behind the content, drawn by a fragment
 * shader in the plum tokens. It is clear at the top, at full strength behind the hero and the
 * contact footer, and fainter behind the sections between. Under reduced motion the clouds hold
 * still. Without JavaScript or WebGL the page keeps its flat plum background.
 *
 * The canvas starts below the top bar and keeps the default alpha channel. Chrome cuts a
 * bar-sized hole in a WebGL canvas that the sticky bar overlaps.
 */
export function Sky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;

    const program = gl.createProgram();
    const shaders = [compile(gl, gl.VERTEX_SHADER, vertex), compile(gl, gl.FRAGMENT_SHADER, fragment)];
    for (const shader of shaders) if (shader) gl.attachShader(program, shader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One triangle that covers the canvas.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const corner = gl.getAttribLocation(program, "corner");
    gl.enableVertexAttribArray(corner);
    gl.vertexAttribPointer(corner, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const token = (name: string) => channels(getComputedStyle(canvas).getPropertyValue(name));
    gl.uniform3f(uniform("u_sky"), ...token("--plum"));
    gl.uniform3f(uniform("u_shade"), ...token("--plum-2"));
    gl.uniform3f(uniform("u_lit"), ...token("--plum-3"));
    const view = uniform("u_view");
    const ratio = uniform("u_ratio");
    const unit = uniform("u_unit");
    const time = uniform("u_time");
    const rise = uniform("u_rise");
    const gain = uniform("u_gain");

    const motion = matchMedia(reducedMotion);
    let seconds = 0;
    let last = 0;
    let drawn = "";

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (now - last < FRAME_MS) return;
      if (!motion.matches) seconds += Math.min((now - last) / 1000, 0.1);
      last = now;

      const { clientWidth: width, clientHeight: height } = canvas;
      const { scrollY } = window;
      const state = `${seconds} ${width} ${height} ${scrollY}`;
      if (state === drawn || width === 0 || height === 0) return;
      drawn = state;

      const scale = Math.min(1, Math.sqrt(PIXEL_BUDGET / (width * height)));
      const bufferWidth = Math.round(width * scale);
      const bufferHeight = Math.round(height * scale);
      if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
        canvas.width = bufferWidth;
        canvas.height = bufferHeight;
        gl.viewport(0, 0, bufferWidth, bufferHeight);
      }

      // Full strength at the hero and the contact footer, 60% behind the sections between.
      const fromHero = scrollY / height;
      const fromFooter = (document.documentElement.scrollHeight - window.innerHeight - scrollY) / height;
      const strength = 0.6 + 0.4 * Math.max(1 - Math.min(fromHero, 1), 0.8 * (1 - Math.min(fromFooter, 1)));

      gl.uniform2f(view, width, height);
      gl.uniform1f(ratio, bufferWidth / width);
      gl.uniform1f(unit, Math.min(Math.max(Math.min(width, height) * 0.62, 280), 760));
      gl.uniform1f(time, seconds);
      // The sky is far away: it rises a tenth as fast as the page, and not at all under reduced motion.
      gl.uniform1f(rise, motion.matches ? 0 : scrollY * 0.1);
      gl.uniform1f(gain, strength);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let frame = requestAnimationFrame(draw);
    canvas.style.opacity = "1";
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed top-16 left-0 -z-10 h-[calc(100lvh-4rem)] w-full opacity-0 transition-opacity duration-[1200ms] ease-out print:hidden"
    />
  );
}
