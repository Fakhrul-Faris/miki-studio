"""Install and enable the Blender MCP add-on (run with Blender's Python)."""
from __future__ import annotations

import sys
from pathlib import Path

ADDON_PATH = Path(__file__).resolve().parent / "addon.py"
MODULE = "addon"  # installed module name from addon.py filename


def main() -> None:
    import bpy

    if not ADDON_PATH.is_file():
        raise SystemExit(f"Missing add-on file: {ADDON_PATH}")

    # Install
    bpy.ops.preferences.addon_install(filepath=str(ADDON_PATH), overwrite=True)
    bpy.ops.preferences.addon_enable(module=MODULE)
    bpy.ops.wm.save_userpref()

    enabled = MODULE in bpy.context.preferences.addons
    print(f"Blender MCP add-on installed: {ADDON_PATH}")
    print(f"Enabled: {enabled}")
    print("Next: open Blender GUI → 3D View sidebar (N) → BlenderMCP → Connect to MCP server")


if __name__ == "__main__":
    main()
