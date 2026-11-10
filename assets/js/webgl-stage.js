/**
 * =====================================================================
 * RiSH SAKUGA ATELIER — WEBGL GLSL 5-LAYER LIGHT-TABLE & AUDIO ENGINE
 * Custom GPU Shader: 5-Stage Pipeline Cross-Dissolve, Refractive Glass
 * X-Ray Loupe, Dual-Ring Genga Iris, Real-Time Sobel Onion-Skin Edge
 * Detection, Velocity Chromatic Smear & Web Audio Tactile Synthesizer.
 * =====================================================================
 */
(function () {
  'use strict';

  /* =====================================================================
     1. TACTILE WEB AUDIO STUDIO SYNTHESIZER (ZERO EXTERNAL ASSETS)
     ===================================================================== */
  const StudioAudio = (function () {
    let ctx = null;
    let enabled = false;

    try {
      enabled = localStorage.getItem('rish:sfx') === 'on';
    } catch (_) {}

    function ensureContext() {
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AC = window.AudioContext || window.webkitAudioContext;
        ctx = new AC();
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      return ctx;
    }

    function playTick(freq = 1400, dur = 0.018, vol = 0.045) {
      if (!enabled) return;
      const ac = ensureContext();
      if (!ac) return;
      try {
        const now = ac.currentTime;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.45, now + dur);
        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(now);
        osc.stop(now + dur + 0.005);
      } catch (_) {}
    }

    function playFlip() {
      if (!enabled) return;
      const ac = ensureContext();
      if (!ac) return;
      try {
        const now = ac.currentTime;
        // Short filtered noise burst simulating animation paper flip
        const bufferSize = Math.floor(ac.sampleRate * 0.055);
        const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const env = Math.sin((i / bufferSize) * Math.PI);
          data[i] = (Math.random() * 2 - 1) * env * 0.35;
        }
        const noise = ac.createBufferSource();
        noise.buffer = buffer;

        const filter = ac.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1800, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.055);
        filter.Q.value = 2.2;

        const gain = ac.createGain();
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ac.destination);
        noise.start(now);
      } catch (_) {}
    }

    function playChime(base = 523.25) {
      if (!enabled) return;
      const ac = ensureContext();
      if (!ac) return;
      try {
        const now = ac.currentTime;
        [base, base * 1.25, base * 1.5].forEach((f, idx) => {
          const osc = ac.createOscillator();
          const gain = ac.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + idx * 0.035);
          gain.gain.setValueAtTime(0.035, now + idx * 0.035);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + 0.22);
          osc.connect(gain);
          gain.connect(ac.destination);
          osc.start(now + idx * 0.035);
          osc.stop(now + idx * 0.035 + 0.24);
        });
      } catch (_) {}
    }

    function setEnabled(val) {
      enabled = Boolean(val);
      try {
        localStorage.setItem('rish:sfx', enabled ? 'on' : 'off');
      } catch (_) {}
      document.documentElement.setAttribute('data-sfx', enabled ? 'on' : 'off');
      const btn = document.querySelector('[data-sfx-toggle]');
      if (btn) {
        btn.setAttribute('aria-pressed', String(enabled));
        btn.classList.toggle('is-active', enabled);
      }
      if (enabled) playChime(587.33);
    }

    return {
      isEnabled: () => enabled,
      toggle: () => setEnabled(!enabled),
      setEnabled,
      tick: playTick,
      flip: playFlip,
      chime: playChime
    };
  })();

  window.RishAudio = StudioAudio;

  /* =====================================================================
     2. WEBGL 5-LAYER SAKUGA SHADER STAGE
     ===================================================================== */
  function initWebGLStage() {
    const cel = document.querySelector('[data-lens]');
    const canvas = document.querySelector('[data-webgl-canvas]');
    if (!cel || !canvas) return;

    const prefersReducedMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let gl = null;
    try {
      gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: true,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false
      }) || canvas.getContext('experimental-webgl');
    } catch (_) {}

    if (!gl) return;

    const VERT_SRC = `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main() {
        vUv = aPos * 0.5 + 0.5;
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `;

    const FRAG_SRC = `
      precision highp float;
      varying vec2 vUv;

      uniform sampler2D uTex0; // Stage 5: Final Satsuei & FX (process-5)
      uniform sampler2D uTex1; // Stage 4: Composite (process-4)
      uniform sampler2D uTex2; // Stage 3: Colour / Sai-shiki (process-3)
      uniform sampler2D uTex3; // Stage 2: Clean-up & Shadow guides (process-2)
      uniform sampler2D uTex4; // Stage 1: Rough Genga Key (process-1)

      uniform vec2 uResolution;
      uniform float uImageAspect;
      uniform vec2 uMouse;
      uniform vec2 uMouseVel;
      uniform float uRadius;
      uniform float uStageMix;   // 0.0 (FX) -> 1.0 (COMP) -> 2.0 (COLOR) -> 3.0 (CLEAN) -> 4.0 (RAFU)
      uniform float uLensTarget; // Target layer inside loupe (default 3.0 = CLEAN)
      uniform float uOnionMix;   // 0.0 = off, 1.0 = GLSL Onion-Skin Edge overlay
      uniform float uTime;
      uniform vec3 uShock;       // xy = click pos, z = elapsed time since click

      // Cover UV mapping so artwork never stretches
      vec2 getCoverUv(vec2 uv, vec2 res, float imgAspect) {
        float viewAspect = res.x / max(1.0, res.y);
        vec2 scale = vec2(1.0);
        if (viewAspect > imgAspect) {
          scale.y = imgAspect / viewAspect;
        } else {
          scale.x = viewAspect / imgAspect;
        }
        return (uv - 0.5) * scale + 0.5;
      }

      vec4 sampleLayer(int idx, vec2 uv) {
        vec2 cUv = clamp(uv, 0.001, 0.999);
        if (idx == 0) return texture2D(uTex0, cUv);
        if (idx == 1) return texture2D(uTex1, cUv);
        if (idx == 2) return texture2D(uTex2, cUv);
        if (idx == 3) return texture2D(uTex3, cUv);
        return texture2D(uTex4, cUv);
      }

      // Smoothly sample across the 5 pipeline layers with diagonal wipe feel
      vec4 samplePipeline(float stageVal, vec2 uv) {
        float s = clamp(stageVal, 0.0, 4.0);
        float diag = (uv.x * 0.35 + (1.0 - uv.y) * 0.25) - 0.3;
        float f01 = smoothstep(0.0, 1.0, clamp(s - 0.0 + diag * 0.35, 0.0, 1.0));
        float f12 = smoothstep(0.0, 1.0, clamp(s - 1.0 + diag * 0.35, 0.0, 1.0));
        float f23 = smoothstep(0.0, 1.0, clamp(s - 2.0 + diag * 0.35, 0.0, 1.0));
        float f34 = smoothstep(0.0, 1.0, clamp(s - 3.0 + diag * 0.35, 0.0, 1.0));

        vec4 c0 = sampleLayer(0, uv);
        vec4 c1 = sampleLayer(1, uv);
        vec4 c2 = sampleLayer(2, uv);
        vec4 c3 = sampleLayer(3, uv);
        vec4 c4 = sampleLayer(4, uv);

        vec4 res = mix(c0, c1, f01);
        res = mix(res, c2, f12);
        res = mix(res, c3, f23);
        res = mix(res, c4, f34);
        return res;
      }

      // Procedural subtle paper grain
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec2 aspect = vec2(uResolution.x / max(1.0, uResolution.y), 1.0);
        vec2 baseUv = getCoverUv(vUv, uResolution, uImageAspect);

        // Click shockwave ripple
        vec2 shockDelta = (vUv - uShock.xy) * aspect;
        float shockDist = length(shockDelta);
        float shockWave = 0.0;
        if (uShock.z > 0.0 && uShock.z < 1.2) {
          float waveFront = uShock.z * 0.85;
          float band = exp(-pow((shockDist - waveFront) * 18.0, 2.0));
          shockWave = band * sin((shockDist - waveFront) * 55.0) * (1.0 - uShock.z / 1.2) * 0.012;
        }
        vec2 shockDir = shockDist > 0.0001 ? normalize(shockDelta) : vec2(0.0);
        baseUv += shockDir * shockWave;

        // Cursor distance in aspect-corrected space
        vec2 delta = (vUv - uMouse) * aspect;
        float dist = length(delta);

        // Base stage sample with subtle velocity chromatic shift
        float velMag = clamp(length(uMouseVel) * 0.65, 0.0, 0.012);
        vec2 velShift = uMouseVel * 0.004;
        vec4 baseColR = samplePipeline(uStageMix, baseUv + velShift);
        vec4 baseColG = samplePipeline(uStageMix, baseUv);
        vec4 baseColB = samplePipeline(uStageMix, baseUv - velShift);
        vec3 baseColor = vec3(baseColR.r, baseColG.g, baseColB.b);

        // Optional GLSL Onion-Skin Edge Detection overlay (cyan clean-up + vermilion rough key)
        if (uOnionMix > 0.005) {
          vec2 texel = vec2(1.5) / max(uResolution, vec2(1.0));
          // Sample neighboring pixels on Rough Genga (uTex4) & Clean-up (uTex3)
          vec3 gC = sampleLayer(4, baseUv).rgb;
          vec3 gR = sampleLayer(4, baseUv + vec2(texel.x, 0.0)).rgb;
          vec3 gU = sampleLayer(4, baseUv + vec2(0.0, texel.y)).rgb;
          float edgeRough = clamp((length(gC - gR) + length(gC - gU)) * 2.4, 0.0, 1.0);

          vec3 cC = sampleLayer(3, baseUv).rgb;
          vec3 cR = sampleLayer(3, baseUv + vec2(texel.x, 0.0)).rgb;
          vec3 cU = sampleLayer(3, baseUv + vec2(0.0, texel.y)).rgb;
          float edgeClean = clamp((length(cC - cR) + length(cC - cU)) * 2.2, 0.0, 1.0);

          // Also detect dark ink strokes directly on white genga sheet
          float inkRough = smoothstep(0.88, 0.45, dot(gC, vec3(0.333)));
          float inkClean = smoothstep(0.90, 0.50, dot(cC, vec3(0.333)));

          float pulse = 0.82 + 0.18 * sin(uTime * 3.0 + vUv.x * 6.0);
          vec3 cyanTrace = vec3(0.05, 0.78, 1.0);
          vec3 redTrace  = vec3(1.0, 0.22, 0.14);

          baseColor = mix(baseColor, baseColor * 0.48 + vec3(0.03, 0.04, 0.06), uOnionMix * 0.55);
          baseColor = mix(baseColor, redTrace,  clamp(max(edgeRough, inkRough * 0.75) * uOnionMix * pulse, 0.0, 0.92));
          baseColor = mix(baseColor, cyanTrace, clamp(max(edgeClean, inkClean * 0.75) * uOnionMix, 0.0, 0.95));
        }

        // Optical X-Ray Loupe
        if (uRadius > 0.002) {
          float r = uRadius;
          float edgeSoft = 0.004;
          float inside = 1.0 - smoothstep(r - edgeSoft, r + edgeSoft, dist);

          if (inside > 0.001) {
            float normDist = clamp(dist / max(0.0001, r), 0.0, 1.0);
            // Optical magnification + glass rim barrel refraction
            float zoom = 0.89 + 0.08 * pow(normDist, 2.6);
            vec2 lensUv = getCoverUv(uMouse + (vUv - uMouse) * zoom, uResolution, uImageAspect);

            // Chromatic dispersion strongest near glass bevel
            float chroma = 0.0035 * pow(normDist, 2.0) + velMag * 0.35;
            vec2 radDir = dist > 0.0001 ? normalize(delta) : vec2(1.0, 0.0);

            // Inner Core (0..0.80R): Target X-Ray Layer (e.g. Clean-up uTex3)
            vec3 innerCol;
            innerCol.r = samplePipeline(uLensTarget, lensUv + radDir * chroma).r;
            innerCol.g = samplePipeline(uLensTarget, lensUv).g;
            innerCol.b = samplePipeline(uLensTarget, lensUv - radDir * chroma).b;

            // Outer Bevel Iris (0.80R..1.0R): Contrast with Rough Genga (layer 4) or Comp (layer 1)
            float altTarget = abs(uLensTarget - 4.0) < 0.5 ? 3.0 : 4.0;
            vec3 outerRingCol = samplePipeline(altTarget, lensUv).rgb;
            // Tint outer ring slightly like a cyan/vermilion light-table prism
            outerRingCol = mix(outerRingCol, outerRingCol * vec3(0.92, 0.96, 1.04), 0.5);

            float ringSplit = smoothstep(0.78, 0.82, normDist);
            vec3 loupeCol = mix(innerCol, outerRingCol, ringSplit);

            // Warm backlit light-table paper luminescence & micro-grain
            float grain = (hash(vUv * uResolution + fract(uTime)) - 0.5) * 0.028;
            loupeCol = clamp(loupeCol * 1.02 + grain, 0.0, 1.0);

            // Glass bevel specular highlight & inner shadow
            float innerRingLine = exp(-pow((normDist - 0.80) * 65.0, 2.0));
            float outerRimLine  = exp(-pow((normDist - 0.985) * 75.0, 2.0));

            // Rotating degree ticks along the 0.80 ring
            float angle = atan(delta.y, delta.x);
            float ticks = smoothstep(0.65, 0.95, cos(angle * 24.0 - uTime * 1.2));
            float tickMask = exp(-pow((normDist - 0.80) * 90.0, 2.0)) * ticks;

            loupeCol = mix(loupeCol, vec3(0.88, 0.14, 0.10), (innerRingLine * 0.45 + tickMask * 0.55));
            loupeCol = mix(loupeCol, vec3(0.08, 0.08, 0.08), outerRimLine * 0.85);

            baseColor = mix(baseColor, loupeCol, inside);
          }

          // Subtle drop shadow right outside the glass loupe
          float shadowBand = smoothstep(r + 0.025, r, dist) * (1.0 - smoothstep(r, r - 0.003, dist));
          baseColor *= (1.0 - shadowBand * 0.22);
        }

        gl_FragColor = vec4(baseColor, 1.0);
      }
    `;

    function compileShader(type, source) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, source);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compileShader(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // Fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const locs = {
      uTex0: gl.getUniformLocation(prog, 'uTex0'),
      uTex1: gl.getUniformLocation(prog, 'uTex1'),
      uTex2: gl.getUniformLocation(prog, 'uTex2'),
      uTex3: gl.getUniformLocation(prog, 'uTex3'),
      uTex4: gl.getUniformLocation(prog, 'uTex4'),
      uResolution: gl.getUniformLocation(prog, 'uResolution'),
      uImageAspect: gl.getUniformLocation(prog, 'uImageAspect'),
      uMouse: gl.getUniformLocation(prog, 'uMouse'),
      uMouseVel: gl.getUniformLocation(prog, 'uMouseVel'),
      uRadius: gl.getUniformLocation(prog, 'uRadius'),
      uStageMix: gl.getUniformLocation(prog, 'uStageMix'),
      uLensTarget: gl.getUniformLocation(prog, 'uLensTarget'),
      uOnionMix: gl.getUniformLocation(prog, 'uOnionMix'),
      uTime: gl.getUniformLocation(prog, 'uTime'),
      uShock: gl.getUniformLocation(prog, 'uShock')
    };

    // Create 5 placeholder 1x1 textures first so rendering starts immediately
    const textures = [];
    for (let i = 0; i < 5; i++) {
      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([242, 239, 233, 255])
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      textures.push(tex);
      gl.uniform1i(locs['uTex' + i], i);
    }

    const LAYER_SOURCES = [
      'assets/img/process-5-1400.webp', // idx 0: Final Satsuei & FX
      'assets/img/process-4-1400.webp', // idx 1: Composite
      'assets/img/process-3-1400.webp', // idx 2: Colour
      'assets/img/process-2-1400.webp', // idx 3: Clean-up & Shadow guides
      'assets/img/process-1-1400.webp'  // idx 4: Rough Genga
    ];

    let loadedCount = 0;
    function uploadImageToTexture(idx, img) {
      gl.activeTexture(gl.TEXTURE0 + idx);
      gl.bindTexture(gl.TEXTURE_2D, textures[idx]);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      loadedCount++;
      if (loadedCount === 2) {
        // As soon as primary Final (0) + Clean-up (3) are in GPU, activate WebGL stage!
        cel.classList.add('has-webgl');
      }
      requestRender();
    }

    function loadLayerTexture(idx, url, fallbackUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      img.onload = () => uploadImageToTexture(idx, img);
      img.onerror = () => {
        if (fallbackUrl) {
          const fb = new Image();
          fb.onload = () => uploadImageToTexture(idx, fb);
          fb.src = fallbackUrl;
        }
      };
      img.src = url;
    }

    // Prioritize Final (0) and Clean-up (3) first for instant LCP, then stream 4, 2, 1
    loadLayerTexture(0, LAYER_SOURCES[0], 'assets/img/process-5-1400.jpg');
    loadLayerTexture(3, LAYER_SOURCES[3], 'assets/img/process-2-1400.jpg');
    setTimeout(() => {
      loadLayerTexture(4, LAYER_SOURCES[4], 'assets/img/process-1-1400.jpg');
      loadLayerTexture(2, LAYER_SOURCES[2], 'assets/img/process-3-1400.jpg');
      loadLayerTexture(1, LAYER_SOURCES[1], 'assets/img/process-4-1400.jpg');
    }, 120);

    // State & physics
    const state = {
      mouseX: 0.52,
      mouseY: 0.46,
      targetX: 0.52,
      targetY: 0.46,
      velX: 0,
      velY: 0,
      radius: prefersReducedMotion ? 0.19 : 0.21,
      targetRadius: prefersReducedMotion ? 0.19 : 0.21,
      stageMix: 0.0,
      targetStageMix: 0.0,
      lensTarget: 3.0, // Default Clean-up (process-2)
      targetLensTarget: 3.0,
      onionMix: 0.0,
      targetOnionMix: 0.0,
      shockX: 0.5,
      shockY: 0.5,
      shockStart: -10,
      isVisible: true,
      activeCut: 'akari'
    };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    let rafId = 0;
    let startTime = performance.now();

    function render(now) {
      rafId = 0;
      if (!state.isVisible || state.activeCut !== 'akari') return;

      resize();
      const elapsed = (now - startTime) * 0.001;

      // Spring interpolation
      const dx = state.targetX - state.mouseX;
      const dy = state.targetY - state.mouseY;
      state.velX = state.velX * 0.72 + dx * 0.28;
      state.velY = state.velY * 0.72 + dy * 0.28;
      state.mouseX += state.velX;
      state.mouseY += state.velY;

      state.radius += (state.targetRadius - state.radius) * 0.16;
      state.stageMix += (state.targetStageMix - state.stageMix) * 0.14;
      state.lensTarget += (state.targetLensTarget - state.lensTarget) * 0.18;
      state.onionMix += (state.targetOnionMix - state.onionMix) * 0.15;

      const shockElapsed = state.shockStart > 0 ? elapsed - state.shockStart : -1.0;

      gl.useProgram(prog);
      gl.uniform2f(locs.uResolution, canvas.width, canvas.height);
      gl.uniform1f(locs.uImageAspect, 1751.0 / 1167.0);
      gl.uniform2f(locs.uMouse, state.mouseX, state.mouseY);
      gl.uniform2f(locs.uMouseVel, state.velX * 14.0, state.velY * 14.0);
      gl.uniform1f(locs.uRadius, state.radius);
      gl.uniform1f(locs.uStageMix, state.stageMix);
      gl.uniform1f(locs.uLensTarget, state.lensTarget);
      gl.uniform1f(locs.uOnionMix, state.onionMix);
      gl.uniform1f(locs.uTime, elapsed);
      gl.uniform3f(locs.uShock, state.shockX, state.shockY, shockElapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      const stillMoving =
        Math.abs(dx) > 0.0003 ||
        Math.abs(dy) > 0.0003 ||
        Math.abs(state.targetRadius - state.radius) > 0.0005 ||
        Math.abs(state.targetStageMix - state.stageMix) > 0.001 ||
        Math.abs(state.targetLensTarget - state.lensTarget) > 0.001 ||
        Math.abs(state.targetOnionMix - state.onionMix) > 0.001 ||
        state.onionMix > 0.01 ||
        (shockElapsed >= 0 && shockElapsed < 1.25);

      if (stillMoving) {
        requestRender();
      }
    }

    function requestRender() {
      if (!rafId && state.isVisible && state.activeCut === 'akari') {
        rafId = requestAnimationFrame(render);
      }
    }

    // Sync pointer coordinates from the hero cel container
    const frameEl = cel.querySelector('.cel__frame') || cel;
    frameEl.addEventListener('pointermove', (e) => {
      if (cel.classList.contains('is-locked')) return;
      const r = frameEl.getBoundingClientRect();
      if (!r.width || !r.height) return;
      state.targetX = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      state.targetY = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      if (!cel.classList.contains('is-peeking')) {
        state.targetRadius = 0.235;
      }
      requestRender();
    }, { passive: true });

    frameEl.addEventListener('pointerenter', () => {
      if (!cel.classList.contains('is-locked')) {
        state.targetRadius = 0.235;
      }
      requestRender();
    });

    frameEl.addEventListener('pointerleave', () => {
      if (!cel.classList.contains('is-locked')) {
        state.targetRadius = 0.19;
        state.targetX = 0.52;
        state.targetY = 0.46;
      }
      requestRender();
    });

    frameEl.addEventListener('click', (e) => {
      if (e.target.closest('button, a')) return;
      const r = frameEl.getBoundingClientRect();
      if (r.width && r.height) {
        state.shockX = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
        state.shockY = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
        state.shockStart = (performance.now() - startTime) * 0.001;
      }
      const locked = cel.classList.contains('is-locked');
      state.targetRadius = locked ? 0.275 : 0.225;
      StudioAudio.tick(locked ? 1680 : 1120, 0.025, 0.05);
      requestRender();
    });

    // Interactive 5-Layer Pipeline Fader Pills on Hero
    const stageBtns = document.querySelectorAll('[data-hero-stage]');
    const lensReadout = document.querySelector('[data-lens-ring] span');
    const stageBadge = document.querySelector('.cel__badge--akari');

    const STAGE_META = [
      { mix: 0.0, lens: 3.0, lensLabel: 'CLEAN ✎', badge: '05 · SATSUEI FX (撮影)' },
      { mix: 1.0, lens: 3.0, lensLabel: 'CLEAN ✎', badge: '04 · COMPOSITE (合成)' },
      { mix: 2.0, lens: 4.0, lensLabel: 'RAFU ✎',  badge: '03 · SAI-SHIKI (彩色)' },
      { mix: 3.0, lens: 4.0, lensLabel: 'RAFU ✎',  badge: '02 · CLEAN-UP (二原・動画)' },
      { mix: 4.0, lens: 0.0, lensLabel: 'FINAL ★', badge: '01 · ROUGH GENGA (ラフ原画)' }
    ];

    function setHeroStage(idx) {
      const m = STAGE_META[idx] || STAGE_META[0];
      state.targetStageMix = m.mix;
      state.targetLensTarget = m.lens;
      state.shockX = state.mouseX;
      state.shockY = state.mouseY;
      state.shockStart = (performance.now() - startTime) * 0.001;

      stageBtns.forEach((btn) => {
        const bIdx = Number(btn.getAttribute('data-hero-stage'));
        const active = bIdx === idx;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });

      if (lensReadout) lensReadout.textContent = m.lensLabel;
      if (stageBadge) stageBadge.textContent = m.badge;

      StudioAudio.flip();
      requestRender();
    }

    stageBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute('data-hero-stage'));
        setHeroStage(idx);
      });
    });

    // GLSL Onion-Skin Toggle Button on Hero
    const onionToggle = document.querySelector('[data-hero-onion]');
    if (onionToggle) {
      onionToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const next = state.targetOnionMix < 0.5 ? 1.0 : 0.0;
        state.targetOnionMix = next;
        onionToggle.classList.toggle('is-active', next > 0.5);
        onionToggle.setAttribute('aria-pressed', String(next > 0.5));
        cel.classList.toggle('is-onion-glsl', next > 0.5);
        StudioAudio.chime(next > 0.5 ? 659.25 : 440);
        requestRender();
      });
    }

    // Listen to Cut Switcher (Akari vs Shinkai)
    document.querySelectorAll('[data-hero-cut]').forEach((pill) => {
      pill.addEventListener('click', () => {
        state.activeCut = pill.getAttribute('data-hero-cut') || 'akari';
        StudioAudio.flip();
        if (state.activeCut === 'akari') {
          state.shockX = 0.5;
          state.shockY = 0.5;
          state.shockStart = (performance.now() - startTime) * 0.001;
          requestRender();
        }
      });
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          state.isVisible = entry.isIntersecting;
          if (state.isVisible) requestRender();
        });
      }, { threshold: 0.02 });
      io.observe(cel);
    }

    window.addEventListener('resize', () => {
      resize();
      requestRender();
    }, { passive: true });

    resize();
    requestRender();
  }

  /* =====================================================================
     3. STUDIO ENHANCEMENTS: THEME SWITCH, 3D LAYER STACK, X-SHEET RAIL,
        DOUGA 50/50 SPLIT COMPARE, WORK FILTER & VARIABLE FONT KINETICS
     ===================================================================== */
  function initAtelierEnhancements() {
    // 3A. Studio Light-Table vs Darkroom Satsuei Theme Toggle
    const themeBtn = document.querySelector('[data-theme-toggle]');
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('rish:studio-mode');
    } catch (_) {}

    function applyStudioMode(mode, withSound) {
      const isDark = mode === 'darkroom';
      document.documentElement.setAttribute('data-studio-mode', isDark ? 'darkroom' : 'paper');
      if (themeBtn) {
        themeBtn.setAttribute('aria-pressed', String(isDark));
        themeBtn.classList.toggle('is-active', isDark);
        const label = themeBtn.querySelector('[data-mode-label]');
        if (label) label.textContent = isDark ? 'DARKROOM' : 'LIGHT TABLE';
      }
      try {
        localStorage.setItem('rish:studio-mode', isDark ? 'darkroom' : 'paper');
      } catch (_) {}
      if (withSound) StudioAudio.chime(isDark ? 392.0 : 587.33);
    }

    if (savedTheme === 'darkroom') {
      applyStudioMode('darkroom', false);
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-studio-mode');
        applyStudioMode(cur === 'darkroom' ? 'paper' : 'darkroom', true);
      });
    }

    // 3B. Audio SFX Toggle Button
    const sfxBtn = document.querySelector('[data-sfx-toggle]');
    if (sfxBtn) {
      sfxBtn.setAttribute('aria-pressed', String(StudioAudio.isEnabled()));
      sfxBtn.classList.toggle('is-active', StudioAudio.isEnabled());
      sfxBtn.addEventListener('click', () => StudioAudio.toggle());
    }

    // Attach subtle tactile audio ticks to interactive controls
    document.querySelectorAll('a, button, [role="tab"]').forEach((el) => {
      el.addEventListener('pointerenter', () => {
        StudioAudio.tick(1520, 0.012, 0.025);
      }, { passive: true });
    });

    // 3C. Dual Studio Clocks (HCMC GMT+7 & TOKYO JST GMT+9)
    const tokyoClockEls = document.querySelectorAll('[data-clock-tyo]');
    function updateTokyoClock() {
      if (!tokyoClockEls.length) return;
      try {
        const str = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Tokyo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        tokyoClockEls.forEach((el) => { el.textContent = str; });
      } catch (_) {}
    }
    updateTokyoClock();
    setInterval(updateTokyoClock, 1000);

    // 3D. Variable-Font Kinetic Hero Nameplate Response (width-safe per-character weight wave)
    const heroNameRow = document.querySelector('[data-hero-name]');
    const heroSec = document.getElementById('top');
    if (heroNameRow && heroSec) {
      heroSec.addEventListener('pointermove', (e) => {
        const chars = heroNameRow.querySelectorAll('.char');
        if (!chars.length) return;
        chars.forEach((ch) => {
          const cr = ch.getBoundingClientRect();
          const cx = cr.left + cr.width * 0.5;
          const dist = Math.abs(e.clientX - cx);
          const prox = Math.max(0, 1 - dist / 320);
          const wght = Math.round(760 + prox * 140);
          ch.style.fontVariationSettings = `"wdth" 64, "wght" ${wght}`;
        });
      }, { passive: true });
    }

    // 3E. Process Section — 3D Exploded Isometric Cel Stack Mode
    const processSec = document.getElementById('process');
    const stackToggleBtn = document.querySelector('[data-process-3d-toggle]');
    const processStage = document.querySelector('.process__stage');
    const processFrames = document.querySelectorAll('.process__frame');

    if (processSec && stackToggleBtn && processStage) {
      stackToggleBtn.addEventListener('click', () => {
        const is3D = processSec.classList.toggle('is-3d-stack');
        stackToggleBtn.classList.toggle('is-active', is3D);
        stackToggleBtn.setAttribute('aria-pressed', String(is3D));
        StudioAudio.chime(is3D ? 659.25 : 493.88);
      });

      // Interactive 3D tilt when in Exploded Cel Stack mode
      processStage.addEventListener('pointermove', (e) => {
        if (!processSec.classList.contains('is-3d-stack')) return;
        const r = processStage.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -16;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 24;
        processStage.style.setProperty('--stack-rx', `${(18 + rx).toFixed(2)}deg`);
        processStage.style.setProperty('--stack-ry', `${(-22 + ry).toFixed(2)}deg`);
      }, { passive: true });

      processStage.addEventListener('pointerleave', () => {
        processStage.style.setProperty('--stack-rx', '18deg');
        processStage.style.setProperty('--stack-ry', '-22deg');
      });

      // Clicking an individual cel in 3D stack triggers its step
      processFrames.forEach((frame) => {
        frame.addEventListener('click', () => {
          if (!processSec.classList.contains('is-3d-stack')) return;
          const stepIdx = frame.getAttribute('data-step');
          const markBtn = document.querySelector(`[data-process-go="${stepIdx}"]`);
          if (markBtn) markBtn.click();
          StudioAudio.flip();
        });
      });
    }

    // 3F. Selected Work — Cut-Bag Category Filter & Grid View Switcher
    const filterBtns = document.querySelectorAll('[data-work-filter]');
    const workItems = document.querySelectorAll('[data-work-cat]');
    const layoutBtns = document.querySelectorAll('[data-work-layout]');
    const workSection = document.getElementById('work');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-work-filter') || 'all';
        filterBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });

        workItems.forEach((item) => {
          const itemCat = item.getAttribute('data-work-cat') || '';
          const show = cat === 'all' || itemCat === cat;
          item.hidden = !show;
          item.classList.toggle('is-filtered-out', !show);
        });

        // Also hide/show category group headers if empty
        document.querySelectorAll('.works-list').forEach((list) => {
          const visibleRows = list.querySelectorAll('[data-work-cat]:not([hidden])');
          list.hidden = visibleRows.length === 0;
        });

        StudioAudio.flip();
        if (window.ScrollTrigger) {
          setTimeout(() => window.ScrollTrigger.refresh(), 60);
        }
      });
    });

    layoutBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const layout = btn.getAttribute('data-work-layout') || 'editorial';
        layoutBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        if (workSection) {
          workSection.classList.toggle('is-compact-grid', layout === 'grid');
        }
        StudioAudio.flip();
        if (window.ScrollTrigger) {
          setTimeout(() => window.ScrollTrigger.refresh(), 60);
        }
      });
    });

    // 3G. Douga 50/50 Split Wipe Compare Mode
    const dougaEl = document.querySelector('[data-douga]');
    const splitSlider = document.querySelector('[data-douga-split-range]');
    if (dougaEl) {
      const modeBtns = dougaEl.querySelectorAll('[data-douga-mode]');
      modeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const m = btn.getAttribute('data-douga-mode');
          dougaEl.classList.toggle('is-split', m === 'split');
          if (m === 'split') {
            const vid = dougaEl.querySelector('[data-douga-video]');
            if (vid) vid.play().catch(() => {});
          }
          StudioAudio.flip();
        });
      });

      if (splitSlider) {
        const updateSplit = (val) => {
          dougaEl.style.setProperty('--douga-split', `${val}%`);
        };
        splitSlider.addEventListener('input', (e) => {
          updateSplit(e.target.value);
        });
        updateSplit(splitSlider.value || 50);
      }
    }

    // 3H. Showreel Shot Breakdown Jump Buttons
    document.querySelectorAll('[data-reel-cue]').forEach((cueBtn) => {
      cueBtn.addEventListener('click', () => {
        const sec = Number(cueBtn.getAttribute('data-reel-cue')) || 0;
        const reelContainer = document.querySelector('[data-reel]');
        if (!reelContainer) return;

        document.querySelectorAll('[data-reel-cue]').forEach((b) => {
          b.classList.toggle('is-active', b === cueBtn);
        });

        reelContainer.dataset.playing = 'true';
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/dxZP3VsqWcM?autoplay=1&start=${sec}&rel=0&modestbranding=1&playsinline=1`;
        iframe.title = 'Phat Tran (RiSH) — 2D Animation Showreel';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allowFullscreen = true;
        reelContainer.innerHTML = '';
        reelContainer.appendChild(iframe);
        StudioAudio.chime(523.25);
      });
    });

    // 3I. Right-Edge X-Sheet Keyframe Rail Sync
    const railNodes = document.querySelectorAll('[data-xsheet-jump]');
    const railProgress = document.querySelector('[data-xsheet-progress]');
    if (railNodes.length) {
      const updateRail = () => {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        if (railProgress) {
          railProgress.style.transform = `scaleY(${p.toFixed(4)})`;
        }
      };
      window.addEventListener('scroll', updateRail, { passive: true });
      updateRail();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initWebGLStage();
      initAtelierEnhancements();
    });
  } else {
    initWebGLStage();
    initAtelierEnhancements();
  }
})();
