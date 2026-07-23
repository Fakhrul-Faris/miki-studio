# Blender MCP setup (Miki Studio)

Control Blender from Cursor via [ahujasid/blender-mcp](https://github.com/ahujasid/blender-mcp).

## What storyboards are for

Board stills in `comedy-autopsy/storyboards/` are **camera/mood reference only** — not the animatic deliverable.  
Cursor drives Blender to build the real 9:16 Grease Pencil scene (sets, cameras, keys, timing).

## One-time install (done / run once)

```bash
# 1. Add-on (already in repo)
/Applications/Blender.app/Contents/MacOS/Blender --background \
  --python production/tools/blender-mcp/install_addon.py

# 2. Cursor MCP — entry added to ~/.cursor/mcp.json:
#    "blender": { "command": "/Users/user/.local/bin/uvx", "args": ["blender-mcp"] }
```

Reload Cursor MCP after config change (**Cursor Settings → MCP → refresh**).

## Every session (you — 30 seconds)

1. **Quit and reopen Blender** if you installed the add-on while it was already running
2. **Layout** workspace (or any view with the big 3D viewport)
3. Click inside the **3D Viewport** (the grey grid area — not Video Editing / Compositing)
4. Press **N** to open the right sidebar (if hidden)
5. Click the **BlenderMCP** tab at the top of that sidebar  
   *(Not Edit → Preferences — the panel lives in the viewport sidebar.)*
6. Click **Connect to MCP server**
7. In Cursor: confirm **user-blender** MCP is green

### Can't find the tab?

| Check | Fix |
|-------|-----|
| Add-on disabled | **Edit → Preferences → Add-ons** → search `MCP` → enable **Interface: Blender MCP** |
| Wrong editor | Switch to **Layout**; panel only appears in **3D Viewport** |
| Sidebar hidden | Press **N** while mouse is over the 3D viewport |
| Tab name | Look for **BlenderMCP** (one word) in the sidebar tabs |
| Old Blender session | **Quit Blender fully** (Cmd+Q) and reopen |

### Enable add-on manually (if search finds nothing)

```bash
/Applications/Blender.app/Contents/MacOS/Blender --background \
  --python production/tools/blender-mcp/install_addon.py
```

Then quit and reopen Blender GUI.

## Episode workflow

| Layer | Role |
|-------|------|
| `StyleLock/MIKI_CHARACTER.md` | Character lock |
| `storyboards/PROOF_XX/` | Camera + composition reference |
| `production/02_EPISODES/EP001_*/` | Blender working files |
| Agent via MCP | Builds scene, blocks shots, GP keys from refs |

## Troubleshooting

| Issue | Fix |
|-------|-----|
| MCP tools missing in Cursor | Reload MCP; check `uvx blender-mcp` runs in terminal |
| "Cannot connect to Blender" | Blender GUI open + BlenderMCP connected |
| Commands no-op | Don't use `blender --background` for MCP sessions |
| Port conflict | Default `9876`; only one Blender MCP session |

## Files

- `addon.py` — Blender add-on (upstream pin: main branch)
- `install_addon.py` — headless install helper
