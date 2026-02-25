# Poetic Assistant 🌸

A fine-tuned AI model that answers user questions in the form of poems. Built using **unsloth/Phi-3-mini-4k-instruct-bnb-4bit**, fine-tuned on a custom dataset, deployed on Hugging Face Space with **Gradio**, and accessible via API in a React frontend.

---

## 📌 Features

- Answers user queries in **poetic form**.
- Preserves **title + poem structure**.
- **React/Next.js frontend** integration ready.
- Hugging Face **Gradio Space** deployment.
- CPU-only compatible, memory-efficient 4-bit model.

---

## 1️⃣ Base Model

- **Original model:** `unsloth/Phi-3-mini-4k-instruct-bnb-4bit`
- **Reason for choice:**
  - Lightweight (suitable for CPU/low memory)
  - Supports instruction-following
  - Can be fine-tuned using LoRA (low-rank adapters)

---

## 2️⃣ Dataset Format

Your training dataset is in CSV/JSON with columns:

| instruction            | response                                                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Why is the sky blue?" | "Sky's Secret\n\nSunlight scatters in the air,\nBlue waves dance everywhere.\nRed and orange pass on through,\nThat's why sky looks bright and blue." |

**Important:**

- `instruction` → user question
- `response` → poetic answer (including **title + poem body**)

---

## Fine-tuning Process

### Install Dependencies

```bash
!pip install unsloth trl peft accelerate bitsandbytes datasets
from datasets import Dataset
import json
from unsloth import FastLanguageModel
import torch
from trl import SFTTrainer
from transformers import TrainingArguments
```

### 1 Load Personal Dataset for finetuning

```bash
with open("poetry-dataset.json", "r") as f:
    data = json.load(f)

dataset = Dataset.from_list(data)

print(f"Total examples: {len(dataset)}")

```

### 2 separate data for training and evaluation ( testing )

```bash
train_test_split = dataset.train_test_split(test_size=0.1, seed=3407)
train_dataset = train_test_split["train"]  # 180 examples
eval_dataset = train_test_split["test"]    # 20 examples

print(f"Train examples: {len(train_dataset)}")
print(f"Eval examples: {len(eval_dataset)}")
```

### Load the Base Microsoft's Phi-3 model via unsloth:

```bash
model_name = "unsloth/Phi-3-mini-4k-instruct-bnb-4bit"
max_seq_length = 2048

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name=model_name,
    max_seq_length=max_seq_length,
    dtype=None,
    load_in_4bit=True,
)
```

### Prepare system prompt/format dataset and apply to training/evaluation dataset (Format Dataset for Instruction-style Fine-tuning):

```bash
SYSTEM_PROMPT = (
    "You are a poetic assistant. "
    "You must answer EVERY question in the form of a poem. "
    "Use verses, rhythm, and imagery. "
    "Never answer in plain prose."
)

def format_chat(example):
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": example["instruction"]},
        {"role": "assistant", "content": example["response"]},
    ]
    return {
        "text": tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=False
        )
    }

# Apply formatting to BOTH datasets
train_dataset = train_dataset.map(format_chat, remove_columns=train_dataset.column_names)
eval_dataset = eval_dataset.map(format_chat, remove_columns=eval_dataset.column_names)

print("Sample training text:")
print(train_dataset[0]["text"])
```

### This code wraps the base model with LoRA-based PEFT (Parameter-Efficient Fine-Tuning) using FastLanguageModel.get_peft_model(), configuring low-rank adapters (r=32) on key transformer projection layers (q, k, v, o, gate, up, down) with alpha scaling 64, no dropout or bias training, gradient checkpointing enabled, and a fixed random seed (3407) for reproducibility.

- In simple terms:
- It prepares the model for efficient fine-tuning by training small LoRA adapter layers instead of updating all model weights.

```bash
model = FastLanguageModel.get_peft_model(
    model,
    r=32,
    lora_alpha=64,
    lora_dropout=0,
    bias="none",
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ],
    use_gradient_checkpointing="unsloth",
    random_state=3407,
)
```

### Training the Model:

```bash
trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=train_dataset,      # ← Model learns from this
    eval_dataset=eval_dataset,        # ← Model NEVER learns from this (just for checking)
    dataset_text_field="text",
    max_seq_length=max_seq_length,
    dataset_num_proc=2,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=50,                    # CHANGED: more warmup
        num_train_epochs=8,                  # CHANGED: more epochs for small dataset
        learning_rate=3e-5,                   # CHANGED: lower learning rate
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        logging_steps=10,                     # CHANGED: log more frequently
        optim="adamw_8bit",
        weight_decay=0.01,
        lr_scheduler_type="linear",
        seed=3407,
        output_dir="fun_assistant_outputs",

        # EVALUATION SETTINGS (IMPORTANT!)
        eval_strategy="epoch",                 # NEW: evaluate each epoch
        save_strategy="epoch",
        save_total_limit=3,                    # CHANGED: keep more checkpoints
        load_best_model_at_end=True,            # NEW: keep best model
        metric_for_best_model="eval_loss",      # NEW: track loss
        greater_is_better=False,                 # NEW: lower loss is better
        logging_dir="./logs",                    # NEW: for tensorboard
        report_to="tensorboard",                  # CHANGED: enable logging
    ),
)
```

### Actual training:

```bash
trainer.train()
```

### Inference step- This block is direct Python-based testing and inference snippet, showing exactly how to feed messages to the fine-tuned model and get a poem.

- Demonstrates how to generate poetry directly using the fine-tuned model in Python, without Gradio or a Space.
- Shows how the system/user message structure used in training is applied for inference.
- Useful for testing, debugging, or integrating in custom scripts before exposing it via API or frontend.

```bash


import re, json
FastLanguageModel.for_inference(model) #Switches the model into inference mode
# Example user input
messages = [
    {
        "role": "system",
        "content": "You are a poetic assistant. You must answer EVERY question in the form of a poem. "

    },
    {
        "role": "user",
        "content": "Why is the sky blue?"
    }
]

inputs = tokenizer.apply_chat_template(
    messages,
    tokenize=True,
    add_generation_prompt=True,
    return_tensors="pt",
).to("cuda")

outputs = model.generate(
    input_ids=inputs,
    temperature=0.8,        # GOOD: creative but not random
    do_sample=True,         # GOOD: allows variety
    max_new_tokens=256     # GOOD: enough for 4-8 line poems
)

# Extract assistant output only
prompt_len = inputs.shape[-1]
generated_ids = outputs[0][prompt_len:]

response = tokenizer.decode(
    generated_ids,
    skip_special_tokens=True
).strip()

print("🤖 Poetic Assistant Says:\n", response)
```

# Response can be like so:

🤖 Poetic Assistant Says:
Rayleigh's Gift

Raindrops scatter sunlight too,
Blue is what we see and through.
Raman scatter might add a bit,
To the shade of blue on top.

### Post training steps:

## login to HF:

```bash
from huggingface_hub import login

login(token="my-personal-token")
```

🧩 Merging LoRA Adapter with Base Model for Deployment

After fine-tuning your model with LoRA using unsloth or PEFT, you have two sets of weights:

Base model weights (microsoft/Phi-3-mini-4k-instruct)

LoRA adapter weights (khemn/poetic-assistant-phi3)

For deployment in a Hugging Face Space or API, it’s recommended to merge the adapter into the base model. This produces a single model that can be used with standard transformers APIs without requiring FastLanguageModel.

```bash
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import torch

BASE_MODEL = "microsoft/Phi-3-mini-4k-instruct"  # IMPORTANT: full model, NOT bnb-4bit
ADAPTER = "khemn/poetic-assistant-phi3"  # your LoRA repo

# Load full base model (not 4bit!)
base_model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL,
    torch_dtype=torch.float16,
    device_map="auto"
)

tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)

# Load adapter
model = PeftModel.from_pretrained(base_model, ADAPTER)

# Merge
model = model.merge_and_unload()

# Save clean merged model
# model.save_pretrained("clean_merged_model")
# tokenizer.save_pretrained("clean_merged_model")
```

### Then push the model and tokenizer to HF, username is 'khemn'

```bash
model.push_to_hub("khemn/poetic-assistant-phi3-v1")
tokenizer.push_to_hub("khemn/poetic-assistant-phi3-v1")
```

## Create Hugging Face Space with Gradio

- Go to Hugging Face → New Space → Gradio (SDK: Gradio, we used Gradio for easy Python UI)
- Name: poetic-assistant-space
- Spaces allow you to host interactive web apps (Gradio or Streamlit) that call your model.
- Get the Git clone URL
  -- Click the “Files and versioning” tab in your Space.
  -- Copy the Git HTTPS URL. It looks like: https://huggingface.co/spaces/khemn/poetic-assistant-space
  -- Clone the Space locally
  -- Optional: minimal clone without downloading large model files
  -- GIT_LFS_SKIP_SMUDGE=1 git clone https://huggingface.co/spaces/khemn/poetic-assistant-space

  ```bash cd poetic-assistant-space

  ```

  -- Add app.py and requirements.txt as following. app.py will tell which model will be used to run in the space. In my case: `bash MODEL_NAME = "khemn/poetic-assistant-phi3-v1" `
  -- Then git add . and commit. Once committed, we will get free endpoint to interract to our finetuned model.
  -- Once deployed:
  -- Go to your Space in browser
  -- Click the ¨Files & Versioning' tab => 'API info' or use Gradio Client like following:

  ```bash
    import { Client } from "@gradio/client";

    const client = await Client.connect("khemn/poetic-assistant-space");
    const result = await client.predict("/generate_poem", { message: "Hello!" });
    console.log(result.data);
  ```

  -- **/generate_poem** corresponds to the Gradio function output.
  -- You can now call this endpoint from Next.js, React, or other frontends

Add **app.py**:

```bash
import gradio as gr
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

MODEL_NAME = "khemn/poetic-assistant-phi3-v1"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    dtype=torch.float32,      # CPU safe
    device_map="cpu"
)

def generate_poem(message):
    messages = [
        {
            "role": "system",
            "content": (
                "You are a poetic assistant.\n"
                "Always answer in poem form.\n"
                "Provide a suitable title for the poem.\n"
                "Then a blank line.\n"
                "Then the poem.\n"
                "Do not add explanations or extra labels.\n"
                "At the end of the poem, stop writing. Do not continue after completion."
            )
        },
        {
            "role": "user",
            "content": message
        }
    ]

    inputs = tokenizer.apply_chat_template(
        messages,
        tokenize=True,
        add_generation_prompt=True,
        return_tensors="pt"
    )

    outputs = model.generate(
        **inputs,
        max_new_tokens=400,
        temperature=0.5,
        do_sample=True,
        top_p=0.85,
        eos_token_id=tokenizer.eos_token_id,
        pad_token_id=tokenizer.eos_token_id,
    )

    generated_ids = outputs[0][inputs["input_ids"].shape[-1]:]

    result = tokenizer.decode(generated_ids, skip_special_tokens=True)
    return result.strip()



demo = gr.Interface(
    fn=generate_poem,
    inputs="text",
    outputs="text",
    title="Poetic Assistant 🌸",
)

demo.launch()
```

### add requirements.txt also

```bash
torch
transformers
gradio
accelerate
```
