---
name: kafka-cloud-setup
description: Set up Kafka Topics on Confluent Cloud for Microservice Event-Driven architecture
---

# Kafka Cloud Setup Skill

## When to Use
- When provisioning cloud-native Event-Driven Infrastructure.
- For creating and managing topics like `learning.*`, `struggle.*`.

## Instructions
1. Ensure Confluent Cloud API credentials are set in environment variables.
2. Run script: `python3 scripts/setup_kafka_topics.py`

## Validation
- [ ] Topics `struggle.alerts`, `progress.updates`, `code.submissions` are created.
