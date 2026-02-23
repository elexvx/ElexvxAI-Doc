---
title: "Quick Start"
description: "Get up and running with ElexvxAI in under 5 minutes."
order: 3
section: "Getting Started"
---

# Quick Start

This guide gets you from installation to your first optimized model in under 5 minutes.

## Basic Example

```python
from elexvxai import optimize
from transformers import AutoModelForCausalLM

# 1. Load your model
model = AutoModelForCausalLM.from_pretrained("gpt2")

# 2. Optimize with one line
optimized = optimize(model, strategy="quantize", bits=8)

# 3. Run inference — same API as before
output = optimized.generate(input_ids, max_new_tokens=100)
```

## Choosing a Strategy

| Strategy       | Size Reduction | Accuracy Impact | Speed Gain |
|----------------|---------------|----------------|------------|
| `quantize`     | 2–4×          | Minimal        | 1.5–3×     |
| `prune`        | 1.5–2×        | Low            | 1.2–2×     |
| `distill`      | 5–10×         | Moderate       | 4–8×       |

## Configuration Options

```python
from elexvxai import OptimizationConfig, optimize

config = OptimizationConfig(
    strategy="quantize",
    bits=8,                    # 8-bit or 4-bit quantization
    device="cuda",             # "cuda", "mps", or "cpu"
    calibration_dataset=None,  # Optional: for better accuracy
)

optimized = optimize(model, config=config)
```

## Saving the Optimized Model

```python
optimized.save("./my-optimized-model")

# Later, load it back
from elexvxai import load_optimized
model = load_optimized("./my-optimized-model")
```

## Next Steps

- Learn about [Neural Network Optimization](/docs/core/neural-optimization) in depth.
- Explore the full [Python API Reference](/docs/reference/python-api).
