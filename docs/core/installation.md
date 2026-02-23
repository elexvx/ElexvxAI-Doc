---
title: "Installation"
description: "Step-by-step guide to install ElexvxAI and its dependencies."
order: 2
section: "Getting Started"
---

# Installation

This guide walks you through installing ElexvxAI and all required dependencies.

## Requirements

| Dependency | Minimum Version |
|-----------|----------------|
| Python     | 3.9+           |
| PyTorch    | 2.0+           |
| CUDA (opt) | 11.8+          |
| RAM        | 8 GB+          |

## Install via pip

```bash
pip install elexvxai
```

To include GPU-optimized dependencies:

```bash
pip install "elexvxai[cuda]"
```

## Install from Source

For the latest development build:

```bash
git clone https://github.com/elexvx/elexvxai.git
cd elexvxai
pip install -e .
```

## Verify Installation

```python
import elexvxai
print(elexvxai.__version__)  # e.g. 1.0.0
```

## Virtual Environments

We strongly recommend using a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate   # Linux / macOS
.venv\Scripts\activate      # Windows

pip install elexvxai
```

## Troubleshooting

### CUDA not detected
Ensure your CUDA installation matches your PyTorch build. Run:
```bash
python -c "import torch; print(torch.cuda.is_available())"
```

### Dependency conflicts
Use `pip install elexvxai --upgrade` to ensure all dependencies are at compatible versions.
