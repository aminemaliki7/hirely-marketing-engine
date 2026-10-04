# Hirely Video Engine

Template-based short video renderer for the Hirely Marketing Engine.

AI generates **Scene JSON**. This project renders a consistent **1080 × 1920 MP4** for YouTube Shorts, Instagram Reels, and LinkedIn.

```text
Hirely Content
     ↓
AI Script Generator
     ↓
Scene JSON
     ↓
Video Renderer (Remotion)
     ↓
1080 × 1920 MP4
```

## Stack

Remotion + React + TypeScript. Remotion downloads FFmpeg on first render.

## Setup

```bash
npm install
npm run generate:sfx
npm run dev
```

Studio opens with two compositions:

- `Short` — career tip example (`Don't apply to every job`)
- `ATSMatching` — AI explainer example

## Preview frames

```bash
npm run still
```

## Render MP4

```bash
npm run render:example
```

Or render any script:

```bash
npx remotion render Short out/my-video.mp4 --props=./examples/ats-matching.json
```

## Scene JSON schema

```ts
{
  template: "CareerTip" | "JobAlert" | "AIExplainer" | "ProductPromo"
  title: string
  duration?: number
  theme?: "dark" | "light"
  scenes: {
    duration: number          // seconds
    text: string
    subtext?: string
    animation: "fade" | "slide_up" | "slide_left" | "pop" | "zoom" | "typewriter"
    sound?: "whoosh" | "pop" | "click" | "impact" | "notification"
    image?: string            // file under public/, e.g. "images/shot.png"
    role?: "hook" | "problem" | "insight" | "example" | "cta"
  }[]
}
```

If `role` is omitted, the renderer assigns:

```text
HOOK → PROBLEM → INSIGHT → EXAMPLE → HIRELY CTA
```

## Brand

| Token | Value |
| --- | --- |
| Format | 1080 × 1920 (9:16) |
| Primary | `#0A66C2` |
| Secondary | `#1E40AF` |
| CTA | hirely.ma |
| Type | Inter, bold sans-serif |

## Later: AI layer

The model should only output this JSON. It should not generate pixels.

```text
User: Create a 20 second video about why ATS matching matters.

AI → { "template": "AIExplainer", "scenes": [...] }
```

A system prompt lives in `src/ai/system-prompt.ts` for that next step.

## Windows note

Remotion stills (PNG) work through Chrome. MP4 encode uses Remotion's bundled FFmpeg. If `npm run render` crashes immediately on `ffmpeg` / `ffprobe`, install the [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist) and retry. Preview in Studio is enough to iterate on Scene JSON in the meantime.
