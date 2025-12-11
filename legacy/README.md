# 🧜‍♀️ Cute Mermaid Viewer

A lightweight, Python-based Mermaid.js viewer with a soft, pastel aesthetic. Designed for internal use and VS Code integration.

## Features
- **Lightweight**: Uses only Python standard library (no `pip install` needed).
- **Auto-Refresh**: Watches your file for changes and updates the preview instantly.
- **Cute Aesthetic**: Custom CSS theme with pastel colors and rounded corners.

## Setup

1.  Ensure you have Python 3 installed.
2.  Clone or copy this repository.

## Usage

### From Terminal
Run the script passing the path to your Mermaid file:

```bash
python3 mermaid_viewer.py path/to/your/diagram.mmd
```

A browser window will open automatically. Edit your `.mmd` file, save, and watch the diagram update!

### VS Code Integration

1.  Open this folder in VS Code.
2.  Open any `.mmd` or `.txt` file containing Mermaid syntax.
3.  Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux).
4.  Type `Tasks: Run Task` and select **Preview Mermaid (Cute)**.

Alternatively, you can bind a keyboard shortcut to this task.

## Customization

- **Theme**: Edit `styles/theme.css` to change colors and fonts.
- **Port**: Change the `PORT` variable in `mermaid_viewer.py` if 8000 is occupied.
