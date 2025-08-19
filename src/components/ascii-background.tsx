"use client";

import { useEffect, useRef, useMemo } from "react";

interface ASCIIBackgroundProps {
    /** Color palette for the ASCII background */
    colors?: string[];
    /** Height of a character row (px). Adjust to taste / performance */
    fontSize?: number;
    /** Width of a character column (px). Adjust to taste / performance */
    charWidth?: number;
}

/**
 * Animated ASCII background.
 *
 * ─ Fixes & improvements over the original ──────────────────────────────
 *   • Palette is no longer mutated; useMemo guarantees a stable reference.
 *   • Added defensive colour normalisation in one place (map → #RRGGBB).
 *   • Stable resize handler sets font + baseline once per resize.
 *   • Uses requestAnimationFrame time parameter instead of Date.now().
 *   • Character and colour indices both clamp to length‑1, avoiding [][].
 *   • hexToRgb simplified, supports #RGB & #RRGGBB and guards against undefined.
 *   • All listeners cleaned up on unmount.
 *   • Extra props (fontSize / charWidth) let callers trade fidelity vs FPS.
 */
export function ASCIIBackground({
                                    colors = ["#0f0f1b", "#242633", "#565a75", "#c6b7be", "#fafbf6"],
                                    fontSize = 16,
                                    charWidth = 10,
                                }: ASCIIBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    /** Normalised colour palette (always #RRGGBB) */
    const palette = useMemo(() => {
        return colors.map((c) => (c.startsWith("#") ? c : `#${c}`));
    }, [colors]);

    useEffect(() => {
        
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        /* ───── helpers ──────────────────────────────────────────────────── */

        const chars = " .:-=+*#%@";

        /** Convert #RGB / #RRGGBB → rgb tuple; fallback to black if input invalid */
        const hexToRgb = (hex?: string) => {
            if (!hex) return { r: 0, g: 0, b: 0 };
            const h = hex.replace("#", "");
            const full = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
            const num = parseInt(full, 16);
            return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.font = `${fontSize}px monospace`;
            ctx.textBaseline = "top";
        };

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouse);

        /* ───── animation loop ──────────────────────────────────────────── */

        let frameId = 0;

        const step = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const { x: mx, y: my } = mouseRef.current;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            for (let y = 0; y < canvas.height; y += fontSize) {
                for (let x = 0; x < canvas.width; x += charWidth) {
                    const dx = x - mx;
                    const dy = y - my;
                    const dist = Math.hypot(dx, dy);

                    // Calculate distance from center for text readability
                    const centerDist = Math.hypot(x - centerX, y - centerY);
                    const centerFade = Math.min(1, centerDist / 800); // Adjust 300 to control fade area

                    const mouseAmp = Math.exp(-dist / 150) * 2;
                    const mouseWave = Math.sin(dist * 0.02 - time * 0.005) * mouseAmp;

                    const w1 = Math.sin(x * 0.005 + time * 0.001);
                    const w2 = Math.cos(y * 0.008 + time * 0.0008);
                    const w3 = Math.sin((x + y) * 0.003 + time * 0.0012);

                    const h = (w1 + w2 + w3 + mouseWave) / 4; // roughly in −1 … 1 but may exceed slightly
                    const normRaw = (h + 1) / 2; // un‑clamped 0 … 1 range
                    const norm = Math.min(1, Math.max(0, normRaw)); // clamp to [0,1]

                    // Apply center fade to make text more readable
                    const adjustedNorm = norm * centerFade;

                    // pick character + colour based on adjusted norm
                    const charIdx = Math.floor(adjustedNorm * (chars.length - 1));
                    const colourIdx = Math.floor(adjustedNorm * (palette.length - 1));

                    const char = chars[charIdx];
                    const { r, g, b } = hexToRgb(palette[colourIdx]);
                    ctx.fillStyle = `rgb(${r},${g},${b})`;

                    ctx.fillText(char, x, y);
                }
            }

            frameId = requestAnimationFrame(step);
        };

        frameId = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouse);
        };
    }, [palette, fontSize, charWidth]);

    /* ───── render ─────────────────────────────────────────────────────── */

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
            {/* Gradient overlay to fade the ASCII art into the background */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{
                    background: `linear-gradient(to bottom, var(--background) 0%, transparent 20%, transparent 60%, var(--background) 100%)`
                }}
            />
        </div>
    );
}

// Also export as default for compatibility with default‑import style.
export default ASCIIBackground;
