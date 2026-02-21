---
title: "Human-In-The-Loop RLHF Strategies"
excerpt: "Improving reinforcement learning with human feedback loops. How we structure annotation tasks for maximum model alignment."
date: "Sep 28, 2023"
category: "CASE STUDY"
author: "Mark Zhang"
image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=800&h=400"
readTime: "9 min read"
---

# Human-In-The-Loop RLHF Strategies

Reinforcement Learning from Human Feedback (RLHF) enables models to be closely aligned with human intents. In this case study, we outline how our annotation processes dictate successful alignment.

## Annotation Interfaces

The UI for raters must be clear and intuitive to avoid noisy feedback. We conduct detailed A/B testing on formatting the prompt and response evaluation interfaces. 

## Reward Model Tuning

The reward model behaves as a proxy for our human raters. Our latest framework decreases the required number of annotations by 30% by employing active learning—only querying the raters when the reward model is highly uncertain.

> **Note**: We will soon release our framework to the public!
