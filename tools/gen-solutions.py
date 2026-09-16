"""
Generate the solution tile photos with an open-source model, locally, on CPU.

Model: stabilityai/sdxl-turbo (open weights). 4 steps, 512x512, then a 2x Lanczos
upscale for the tiles. Re-run with a slug argument to regenerate a single tile:

    python tools/gen-solutions.py paid-ads

Output: public/solutions/<slug>.jpg  (1024x1024, ~85% JPEG)
"""
import os, sys, time, pathlib
import torch
from PIL import Image
from diffusers import AutoPipelineForText2Image

# Torch defaults to half the cores on this box; diffusion here is pure CPU matmul,
# so giving it every core roughly halves the wall time per tile.
torch.set_num_threads(os.cpu_count() or 4)

OUT = pathlib.Path(__file__).resolve().parent.parent / "public" / "solutions"
OUT.mkdir(parents=True, exist_ok=True)

# One shared mood so the 14 tiles read as one set: warm cream light, deep navy
# shadows, oxblood accents, photographic, no text, no logos.
MOOD = (
    ", editorial photograph, cinematic, shallow depth of field, warm cream key light, "
    "deep navy shadows, dark red accents, high detail, 35mm, no text, no logo, no watermark"
)
NEG = "text, watermark, logo, caption, blurry, deformed, lowres, cartoon, illustration, extra limbs"

PROMPTS = {
    "short-form-video": "creator filmed on a smartphone gimbal in a moody studio, vertical video rig, ring light",
    "ai-creative": "creative director at a studio workstation, large monitor showing a grid of generated ad visuals for a product brand, glowing screen light on the face, stylus tablet on the desk, futuristic",
    "paid-ads": "marketer at a dark desk reviewing ad campaign dashboard on a monitor, soft screen glow",
    "social-media-management": "content creator planning a social feed on a tablet at a cafe table, phone and notebook",
    "ai-agents": "close up of a phone screen showing an AI chat conversation beside a headset on a desk, soft blue glow, minimal office",
    "search-engine-optimization": "laptop showing search analytics graphs on a clean desk, coffee, morning light",
    "local-seo": "modern boutique storefront at dusk, warm interior light through large windows, no signage, no lettering, street with a parked bicycle",
    "branding-and-identity": "brand designer laying out color swatches and packaging mockups on a cream table",
    "graphic-design": "designer's desk with product label prints, a tablet with pen, printed thumbnails and posters",
    "software-and-web-development": "developer writing code on an ultrawide monitor in a dim office, navy ambient light",
    "lead-generation": "sales desk with headset, laptop CRM pipeline on screen, notebook of leads, warm lamp light",
    "ecommerce": "consumer products and apparel photographed for an online store, packaging boxes, studio",
    "email-and-retention": "phone held in hand showing a branded email newsletter, tote bag and coffee cup beside it",
    "analytics-and-tracking": "close up of analytics attribution charts on a large monitor, reflections, dark room",
}

def main():
    only = set(sys.argv[1:])
    t0 = time.time()
    print("loading sdxl-turbo (bf16, cpu)...", flush=True)
    pipe = AutoPipelineForText2Image.from_pretrained(
        "stabilityai/sdxl-turbo", torch_dtype=torch.bfloat16, variant="fp16"
    ).to("cpu")
    pipe.set_progress_bar_config(disable=True)
    print(f"loaded in {time.time()-t0:.0f}s", flush=True)

    for slug, prompt in PROMPTS.items():
        if only and slug not in only:
            continue
        t = time.time()
        g = torch.Generator("cpu").manual_seed(abs(hash(slug)) % (2**31))
        img = pipe(
            prompt=prompt + MOOD, negative_prompt=NEG,
            num_inference_steps=4, guidance_scale=0.0,
            width=512, height=512, generator=g,
        ).images[0]
        img = img.resize((1024, 1024), Image.LANCZOS)
        path = OUT / f"{slug}.jpg"
        img.save(path, "JPEG", quality=85, optimize=True)
        print(f"{slug}: {time.time()-t:.0f}s -> {path.name}", flush=True)

if __name__ == "__main__":
    main()
