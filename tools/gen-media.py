"""
Generate the hero and band background photos with an open-source model, locally,
on CPU. Replaces the Pexels stock photography in public/media/ and public/reel/
with generated frames in the same mood as the solution tiles, so the site carries
no fitness-specific stock imagery.

Model: stabilityai/sdxl-turbo (open weights). 4 steps, then a Lanczos upscale to
the target size. Re-run with a slug argument to regenerate a single frame:

    python tools/gen-media.py studio-wide

Output: public/media/<slug>.jpg or public/reel/<slug>.jpg (see SPECS below).
"""
import os, sys, time, pathlib
import torch
from PIL import Image
from diffusers import AutoPipelineForText2Image

torch.set_num_threads(os.cpu_count() or 4)

ROOT = pathlib.Path(__file__).resolve().parent.parent

MOOD = (
    ", editorial photograph, cinematic, shallow depth of field, warm cream key light, "
    "deep navy shadows, dark red accents, high detail, 35mm, no text, no logo, no watermark, no people close-up faces"
)
NEG = "text, watermark, logo, caption, blurry, deformed, lowres, cartoon, illustration, extra limbs"

# slug -> (subfolder, prompt, output width, output height)
SPECS = {
    "studio-wide": (
        "media",
        "wide interior of a modern creative studio, desks with monitors and cameras, warm morning light through large windows",
        1600, 900,
    ),
    "studio-duo": (
        "reel",
        "two creative professionals reviewing a campaign storyboard together at a desk, warm lamp light, vertical composition",
        620, 1102,
    ),
    "studio-dark": (
        "reel",
        "a single desk with a laptop and camera gear in a dark moody studio, dramatic rim light, vertical composition",
        620, 1102,
    ),
    "creative-studio": (
        "reel",
        "a photographer adjusting studio lighting around a product on a seamless backdrop, vertical composition",
        620, 1102,
    ),
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

    for slug, (folder, prompt, w, h) in SPECS.items():
        if only and slug not in only:
            continue
        t = time.time()
        out_dir = ROOT / "public" / folder
        out_dir.mkdir(parents=True, exist_ok=True)
        g = torch.Generator("cpu").manual_seed(abs(hash(slug)) % (2**31))
        # Generate at the target aspect ratio (SDXL needs multiples of 8) so the
        # upscale doesn't stretch the composition.
        scale = 768 / max(w, h)
        gen_w = max(8, round(w * scale / 8) * 8)
        gen_h = max(8, round(h * scale / 8) * 8)
        img = pipe(
            prompt=prompt + MOOD, negative_prompt=NEG,
            num_inference_steps=4, guidance_scale=0.0,
            width=gen_w, height=gen_h, generator=g,
        ).images[0]
        img = img.resize((w, h), Image.LANCZOS)
        path = out_dir / f"{slug}.jpg"
        img.save(path, "JPEG", quality=85, optimize=True)
        print(f"{slug}: {time.time()-t:.0f}s -> {path}", flush=True)

if __name__ == "__main__":
    main()
