"""根据案件 JSON 的 lines 生成美音 MP3（Kokoro TTS，Apache 2.0）。

用法：
  python -I scripts/generate-audio.py src/content/case-02.json

依赖：kokoro-onnx==0.4.7、soundfile==0.13.1、ffmpeg；
模型文件放在 KOKORO_MODEL_DIR（默认 /tmp/kokoro-model），从
https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0 下载
kokoro-v1.0.onnx 和 voices-v1.0.bin。
"""

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent
MODEL_DIR = Path(os.environ.get("KOKORO_MODEL_DIR", "/tmp/kokoro-model"))
SPEEDS = {"": 1.0, "-slow": 0.75}


def main(case_path: Path) -> None:
    case = json.loads(case_path.read_text(encoding="utf-8"))
    out_dir = ROOT / "src/static/audio" / case["id"]
    out_dir.mkdir(parents=True, exist_ok=True)
    kokoro = Kokoro(str(MODEL_DIR / "kokoro-v1.0.onnx"), str(MODEL_DIR / "voices-v1.0.bin"))

    with tempfile.TemporaryDirectory() as tmp:
        for name, line in case["lines"].items():
            voice = case["voices"][line["voice"]]
            for suffix, speed in SPEEDS.items():
                samples, rate = kokoro.create(line["text"], voice=voice, speed=speed, lang="en-us")
                wav = Path(tmp) / f"{name}{suffix}.wav"
                sf.write(wav, samples, rate)
                mp3 = out_dir / f"{name}{suffix}.mp3"
                subprocess.run(
                    ["ffmpeg", "-loglevel", "error", "-y", "-i", str(wav),
                     "-ac", "1", "-b:a", "48k", str(mp3)],
                    check=True,
                )
                print(f"{mp3.relative_to(ROOT)}  {line['text']}")


if __name__ == "__main__":
    main(Path(sys.argv[1]).resolve())
