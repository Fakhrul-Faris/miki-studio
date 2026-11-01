# Cheap preview of a Blender scene before the real render (user, 2026-11-01: "before render in blender, capture a quick
# screen capture so i can see what's happening… so we're not wasting time on rendering").
#   from preview import preview
#   preview("…/out/preview.mp4", range(N), audio="…/audio/voice.wav")
# Renders every `step`-th frame at `scale` of the output size with EEVEE at 1 sample, no motion blur, then encodes an mp4 at
# the matching rate (60 fps / step 2 = 30 fps) with the voice under it, so timing can be judged. Settings are restored after.
import os, shutil, subprocess, tempfile, bpy


def preview(out_mp4, frames, step=2, scale=0.25, audio=None):
    sc = bpy.context.scene; r = sc.render
    keep = (r.resolution_percentage, r.use_motion_blur, sc.eevee.taa_render_samples, r.filepath, r.image_settings.file_format)
    r.resolution_percentage = int(scale * 100); r.use_motion_blur = False; sc.eevee.taa_render_samples = 1
    r.image_settings.file_format = "JPEG"
    tmp = tempfile.mkdtemp(prefix="preview_")
    try:
        fr = list(frames)[::step]
        for i, f in enumerate(fr):
            sc.frame_set(f); r.filepath = f"{tmp}/p_{i:05d}.jpg"; bpy.ops.render.render(write_still=True)
        rate = r.fps / step; start = fr[0] / r.fps
        cmd = ["ffmpeg", "-v", "error", "-y", "-framerate", str(rate), "-i", f"{tmp}/p_%05d.jpg"]
        if audio and os.path.exists(audio): cmd += ["-ss", str(start), "-i", audio, "-map", "0:v", "-map", "1:a", "-shortest", "-c:a", "aac"]
        cmd += ["-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "26", out_mp4]
        subprocess.run(cmd, check=True)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
        r.resolution_percentage, r.use_motion_blur, sc.eevee.taa_render_samples, r.filepath, r.image_settings.file_format = keep
    print("preview:", out_mp4)
