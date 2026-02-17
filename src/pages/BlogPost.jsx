import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SEO, { StructuredData } from '../components/SEO'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ArrowLeft } from 'lucide-react'

function BlogPost() {
  const { postId } = useParams()

  // Blog post content - hardcoded for simplicity and performance
  // To add new posts: add to this object and update Blog.jsx list
  const posts = {
    '2025-09-06-training-llm-part-1-motivation-and-architecture': {
      title: 'Training My Own LLM Part 1: Why I Did It and What I Was Getting Into',
      author: 'Daniel Christensen',
      date: 'September 6, 2025',
      dateISO: '2025-09-06',
      tags: ['LLM', 'Machine Learning', 'GPT-2', 'Deep Learning', 'AI'],
      excerpt: 'The motivation behind training a custom large language model from scratch, the architectural decisions that shaped the project, and the honest reality of working within consumer hardware constraints.',
      content: `
        <p>There is no shortage of large language models available today. GPT-4, Claude, Llama, Mistral—the list grows every few months. So why spend weeks training one from scratch on a gaming GPU?</p>
        
        <p>The honest answer: because I learn better hands-on. Coming from an academic background, I know that reading papers is not the same as writing the proof. I wanted to understand how these systems actually work.</p>
        
        <p>This is part one of a five-part series documenting that journey.</p>
        
        <h2 id="setting-realistic-expectations">Setting Realistic Expectations</h2>
        
        <p>From the outset, I established clear and deliberately modest objectives. The goal was not to compete with state-of-the-art models. It was to build a functional, locally-deployable language model that could serve as both a learning platform and a proof of technical competency.</p>
        
        <p>The scope was intentionally constrained:</p>
        
        <ul>
          <li><strong>Context window</strong>: 1024 tokens (versus 100K+ in modern production models)</li>
          <li><strong>Parameter count</strong>: Millions, not billions</li>
          <li><strong>Training data</strong>: A curated subset, not internet-scale</li>
          <li><strong>Compute budget</strong>: One consumer GPU, not a distributed cluster</li>
        </ul>
        
        <p>This was always going to be a toy model. Acknowledging that upfront made every subsequent decision cleaner.</p>
        
        <h2 id="why-gpt-2">Why GPT-2?</h2>
        
        <p>I researched other models, but the underlying data was readily available for GPT-2, and I could follow the general understanding shared by others online.</p>
        
        <p>Larger models like GPT-3 and GPT-4 would require a small datacenter's worth of GPUs. More complex architectures would have doubled memory requirements or demanded multiple machines working in parallel.</p>
        
        <p>GPT-2 Small hit the only sweet spot that actually mattered: it was possible to build on my hardware. Its 124 million parameters fit in memory alongside everything needed to train it. It is also battle-tested, with extensive documentation, working examples, and a community that has already debugged the problems I would inevitably face.</p>
        
        <h2 id="understanding-the-architecture-by-building-it">Understanding the Architecture by Building It</h2>
        
        <h3 id="self-attention-finally-made-sense">Self-Attention Finally Made Sense</h3>
        
        <p>The formula <code>Attention(Q,K,V) = softmax(QK^T/√d_k)V</code> had appeared in dozens of papers I had read. It became concrete only when I had to implement it. Watching tensors flow through attention heads during debugging gave me an intuitive grasp of how the model learns to relate different parts of the input sequence.</p>
        
        <p>It also helped me understand why a GPU is much faster and preferred for training.</p>
        
        <p>GPT-2 Small uses 12 attention heads with 768-dimensional hidden states. During implementation, the quadratic complexity O(n²) with respect to sequence length stopped being an abstract concern and became a practical one. Doubling the context window quadruples memory requirements. On an RTX 4080 with 16GB VRAM, that constraint became real very quickly.</p>
        
        <h3 id="the-embedding-layer-surprise">The Embedding Layer Surprise</h3>
        
        <p>My first genuine insight came from the embedding layer. Nearly a third of GPT-2's entire capacity is dedicated to understanding individual words and tokens before any actual reasoning happens. The model needs a massive built-in dictionary just to translate human language into something it can work with. This seemed excessive until I understood the implication: if the model cannot richly represent each token, nothing that follows matters.</p>
        
        <h3 id="positional-encoding-and-the-simultaneity-problem">Positional Encoding and the Simultaneity Problem</h3>
        
        <p>The second breakthrough was positional encoding. GPT does not read a sentence sequentially the way humans do. It sees the entire input at once—every token simultaneously. This creates an immediate problem: without position information, "The cat chased the dog" and "The dog chased the cat" would appear identical.</p>
        
        <p>The solution is elegant: the model learns what "being the first token" or "being the hundredth token" actually means through training. It is not hardcoded. The model figures out on its own that early tokens often set context, and that nearby tokens tend to relate more closely. This is completely invisible when chatting with a production model, but it is foundational to why these systems work at all.</p>
        
        <h2 id="working-within-hardware-limits">Working Within Hardware Limits</h2>
        
        <p>The RTX 4080 with 16GB VRAM was the limiting factor in every architectural decision. Here is the concrete reality of training on consumer hardware:</p>
        
        <ul>
          <li><strong>Model weights</strong>: 124M parameters × 4 bytes (FP32) ≈ 500MB</li>
          <li><strong>Optimizer states</strong>: Adam requires 2× model size for momentum and variance ≈ 1GB</li>
          <li><strong>Activations and gradients</strong>: With batch size 4, I was constantly monitoring memory usage</li>
        </ul>
        
        <p>I implemented gradient checkpointing not as a strategic optimization but because I had to. Without it, I could only fit a batch size of 1, which made training unstable. (And I needed to be able to pause the training when it was time to use my gaming computer for what I purchased it for.) The technique recomputes activations during backpropagation instead of storing them.</p>
        
        <h3 id="what-the-scaling-laws-papers-do-not-emphasize">What the Scaling Laws Papers Do Not Emphasize</h3>
        
        <p>The most humbling realization: my RTX 4080 achieved approximately 45 tokens per second during inference—roughly 1/100th the speed of commercial APIs. That single comparison drove home the infrastructure gap between hobbyist experiments and production systems.</p>
        
        <h2 id="what-comes-next">What Comes Next</h2>
        
        <p>Part 2 covers dataset engineering: why OpenWebText was the right choice, what tokenization looks like at scale, and what it feels like to watch all 28 CPU cores hit 100% utilization for the first time.</p>
        
        <p><em>This is part 1 of a 5-part series.</em></p>
        <ul>
          <li><em>Part 1: Motivation and Architecture (this post)</em></li>
          <li><em><a href="/blog/2025-09-13-training-llm-part-2-dataset-engineering">Part 2: Dataset Engineering</a></em></li>
          <li><em><a href="/blog/2025-09-20-training-llm-part-3-implementation-and-training-loop">Part 3: Implementation and the Training Loop</a></em></li>
          <li><em><a href="/blog/2025-09-27-training-llm-part-4-the-training-experience">Part 4: The Training Experience</a></em></li>
          <li><em><a href="/blog/2025-10-04-training-llm-part-5-evaluation-deployment-conclusions">Part 5: Evaluation, Deployment, and Conclusions</a></em></li>
        </ul>
      `
    },
    '2025-09-13-training-llm-part-2-dataset-engineering': {
      title: 'Training My Own LLM Part 2: Dataset Engineering at Scale',
      author: 'Daniel Christensen',
      date: 'September 13, 2025',
      dateISO: '2025-09-13',
      tags: ['LLM', 'Machine Learning', 'NLP', 'Dataset', 'Python'],
      excerpt: 'How I prepared 8.2 million training examples from OpenWebText, what tokenization looks like at scale, and the data pipeline lessons learned the hard way.',
      content: `
        <p>Dataset selection was one of the easiest decisions in this entire project.</p>
        
        <h2 id="why-openwebtext">Why OpenWebText</h2>
        
        <p>OpenWebText is an open-source recreation of GPT-2's original training dataset, containing approximately 40GB of filtered web content. Rather than spending weeks implementing web scrapers, parsing HTML, and building quality filters from scratch, I could focus on the model itself.</p>
        
        <pre><code>from datasets import load_dataset

dataset = load_dataset("openwebtext", trust_remote_code=True)

print(f"Dataset size: {len(dataset['train'])} documents")
# Output: Dataset size: 8,013,769 documents</code></pre>
        
        <p>Conveniently using OpenWebText someone else already did the hard work by removing duplicates, filtering low-quality pages, and ensuring diverse content across domains. News articles, blog posts, forum discussions, creative writing.</p>
        
        <h2 id="tokenization-reality">Tokenization Reality</h2>
        
        <p>Using GPT-2's tokenizer was a practical necessity, but it also revealed how much the field has progressed as i read about other current transformers across their size of tokens, but it also illustrated a lot more of the how-the-model-works.</p>
        
        <pre><code>from transformers import GPT2TokenizerFast

tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
print(f"Vocabulary size: {tokenizer.vocab_size}")  # 50,257

text = "The quick brown fox jumps over the lazy dog"
tokens = tokenizer.encode(text)
print(f"{len(text)} characters -> {len(tokens)} tokens")
# Output: 44 characters -> 10 tokens</code></pre>
        
        <p>GPT-2's vocabulary of 50,257 tokens seems large until you compare it to modern models using 100,000+. Fewer tokens means more tokens are needed to represent the same text. My 1024-token context window might represent 3,000 to 4,000 characters — while modern models with 128K contexts can handle entire books.</p>
        
        <p>The inefficiency becomes more visible with non-English content, and emojis:</p>
        
        <pre><code>samples = [
    "def factorial(n): return 1 if n <= 1 else n * factorial(n-1)",
    "こんにちは世界",   # Hello world in Japanese
    "🚀 Machine Learning is awesome! 🎉"
]

for text in samples:
    tokens = tokenizer.encode(text)
    print(f"{text[:40]} -> {len(tokens)} tokens")</code></pre>
        
        <p>Code tokenizes relatively efficiently. Japanese and emoji content explodes into many tokens. This is the kind of practical constraint that only becomes visible when you actually run the numbers.</p>
        
        <h2 id="building-the-data-pipeline">Building the Data Pipeline</h2>
        
        <p>Processing 8 million documents required a pipeline that could use available hardware effectively. My machine has 28 CPU cores and 94GB of RAM — normally occupied by Chrome tabs. The tokenization job finally justified both. :)</p>
        
        <pre><code>from datasets import load_dataset
from transformers import GPT2TokenizerFast

def prepare_dataset(save_dir="./tokenized_data"):
    dataset = load_dataset("openwebtext", trust_remote_code=True)
    tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")

    def tokenize_function(examples):
        return tokenizer(examples["text"], return_attention_mask=False)

    tokenized = dataset.map(
        tokenize_function,
        batched=True,
        num_proc=28,
        remove_columns=["text"],
        desc="Tokenizing dataset"
    )

    block_size = 1024

    def group_texts(examples):
        concatenated = {k: sum(examples[k], []) for k in examples.keys()}
        total_length = (len(concatenated["input_ids"]) // block_size) * block_size
        result = {
            k: [t[i:i + block_size] for i in range(0, total_length, block_size)]
            for k, t in concatenated.items()
        }
        result["labels"] = result["input_ids"].copy()
        return result

    lm_dataset = tokenized.map(
        group_texts,
        batched=True,
        num_proc=28,
        desc="Chunking into blocks"
    )

    lm_dataset.save_to_disk(save_dir)
    print(f"Final dataset: {len(lm_dataset['train'])} training examples")
    return lm_dataset</code></pre>
        
        <p>Watching all 28 cores hit 100% utilization was satisfying in a way that is difficult to explain. (My gaming PC gets bored with such a nice CPU) Parallel processing reduced tokenization time considerably.</p>
        
        <h2 id="the-chunking-strategy">The Chunking Strategy</h2>
        
        <p>Each training example needed to be exactly 1024 tokens for efficient batching. This meant some text got split mid-sentence, which is actually beneficial — it forces the model to learn representations that do not depend on always seeing complete sentences.</p>
        
        <p>The final dataset: 8.2 million training examples, each containing exactly 1024 tokens. That is 8.4 billion tokens total — a meaningful corpus for training, though still tiny compared to GPT-3's 300 billion.</p>
        
        <p>The key point I learned with tokenization was all of the odd things that come with it. How does all of human writing get broken-down, what are the inefficiencies of having some tokens exist but not be used, and it spawned a lot of reading about how other models tokenize differently, such as Meta's Llama.</p>
        
        <h2 id="what-comes-next">What Comes Next</h2>
        
        <p>Part 3 covers the model implementation: configuration decisions, the training loop, memory arithmetic, and the checkpoint strategy that evolved from painful experience.</p>
        
        <p><em>This is part 2 of a 5-part series.</em></p>
        <ul>
          <li><em><a href="/blog/2025-09-06-training-llm-part-1-motivation-and-architecture">Part 1: Motivation and Architecture</a></em></li>
          <li><em>Part 2: Dataset Engineering (this post)</em></li>
          <li><em><a href="/blog/2025-09-20-training-llm-part-3-implementation-and-training-loop">Part 3: Implementation and the Training Loop</a></em></li>
          <li><em><a href="/blog/2025-09-27-training-llm-part-4-the-training-experience">Part 4: The Training Experience</a></em></li>
          <li><em><a href="/blog/2025-10-04-training-llm-part-5-evaluation-deployment-conclusions">Part 5: Evaluation, Deployment, and Conclusions</a></em></li>
        </ul>
      `
    },
    '2025-09-20-training-llm-part-3-implementation-and-training-loop': {
      title: 'Training My Own LLM Part 3: Implementation and the Training Loop',
      author: 'Daniel Christensen',
      date: 'September 20, 2025',
      dateISO: '2025-09-20',
      tags: ['LLM', 'PyTorch', 'Hugging Face', 'Training', 'GPU'],
      excerpt: 'The actual model configuration, memory arithmetic that dictated every decision, gradient accumulation, and the checkpoint strategy earned through repeated failures.',
      content: `
        <p>The model configuration was essentially copied from GPT-2 Small's published specifications. No clever innovations, no architectural improvements — just 124 million parameters arranged exactly as OpenAI designed them in 2019.</p>
        
        <p>When learning how transformers work, the last thing you want is to debug your own modifications.</p>
        
        <h2 id="configuration">Configuration</h2>
        
        <pre><code>from transformers import GPT2Config, GPT2LMHeadModel

def create_model():
    config = GPT2Config(
        vocab_size=50257,
        n_positions=1024,
        n_ctx=1024,
        n_embd=768,
        n_layer=12,
        n_head=12,
        resid_pdrop=0.1,
        embd_pdrop=0.1,
        attn_pdrop=0.1,
        use_cache=False
    )

    model = GPT2LMHeadModel(config)

    total_params = sum(p.numel() for p in model.parameters())
    print(f"Total parameters: {total_params:,}")       # 124,439,808
    print(f"Model size: {total_params * 4 / 1024**2:.0f} MB")  # ~474 MB

    return model</code></pre>
        
        <p>These numbers are not arbitrary. The hidden dimension of 768 divides evenly by the 12 attention heads, giving each head 64 dimensions — a size optimized for GPU tensor cores that operate efficiently on multiples of 64. This is the kind of implementation detail that only becomes obvious when you have to think about it explicitly, and when I'm avoiding OOM errors.</p>
        
        <h2 id="the-memory-arithmetic">The Memory Arithmetic</h2>
        
        <p>The batch size of 4 seems small. Here is why it was not a choice:</p>
        
        <pre><code>def calculate_memory(batch_size=4, seq_length=1024,
                     hidden_size=768, num_layers=12):
    model_params = 124_439_808 * 4          # FP32 bytes
    attention_mem = batch_size * seq_length * hidden_size * 5 * 4
    ffn_mem = batch_size * seq_length * hidden_size * 4 * 4
    per_layer = attention_mem + ffn_mem
    total_activations = per_layer * num_layers
    optimizer_mem = model_params * 2        # Adam momentum + variance

    total_gb = (model_params + total_activations + optimizer_mem) / (1024**3)
    print(f"Batch size {batch_size}: ~{total_gb:.1f} GB")

calculate_memory(4)   # ~11 GB - fits
calculate_memory(8)   # ~19 GB - out of memory</code></pre>
        
        <p>Batch size 4 fit. Batch size 8 did not. That was the entire decision. Gradient accumulation over 8 steps gave an effective batch size of 32 while processing only 4 examples at a time:</p>
        
        <pre><code>model.zero_grad()
accumulated_loss = 0

for micro_step in range(gradient_accumulation_steps):
    outputs = model(input_ids=batch[micro_step])
    loss = outputs.loss / gradient_accumulation_steps
    loss.backward()
    accumulated_loss += loss.item()

optimizer.step()
scheduler.step()</code></pre>
        
        <p>Computationally inefficient. Memory efficient. The correct tradeoff given the constraints.</p>
        
        <h2 id="training-arguments-that-actually-worked">Training Arguments That Actually Worked</h2>
        
        <p>The training configuration below is the result of multiple failed runs, not first-attempt intuition:</p>
        
        <pre><code>from transformers import TrainingArguments

training_args = TrainingArguments(
    output_dir="./gpt2-clone",
    overwrite_output_dir=False,   # Never overwrite after losing progress

    num_train_epochs=5,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=8,

    learning_rate=5e-5,
    lr_scheduler_type="cosine",
    warmup_steps=1000,            # Critical for stability

    fp16=True,
    optim="adamw_torch",
    weight_decay=0.01,
    max_grad_norm=1.0,
    gradient_checkpointing=True,

    logging_steps=100,
    save_steps=500,
    save_total_limit=5,
    save_safetensors=True,

    evaluation_strategy="steps",
    eval_steps=1000,

    resume_from_checkpoint="latest",
)</code></pre>
        
        <p>The warmup schedule deserves emphasis. Without it, the model diverged within the first 100 steps of every attempt. The cosine decay that follows keeps the learning rate from oscillating during the long tail of training.</p>
        
        <h2 id="checkpoint-recovery">Checkpoint Recovery</h2>
        
        <p>Losing a weekend of training to a power outage teaches you to treat checkpointing as infrastructure rather than convenience, and plus I like using my gaming computer for what I purchased it for.</p>
        
        <p>As a 100% side note I started training from a checkpoint, went to Alaska hoping it would finish while I was gone, then the power went out about 12 hours after I left so I lost about 460 hours of possible training which was. . . Sad. But back to my actual writing</p>
        
        <pre><code>from pathlib import Path

def find_latest_checkpoint(output_dir="./gpt2-clone"):
    checkpoints = list(Path(output_dir).glob("checkpoint-*"))
    if not checkpoints:
        return None

    checkpoints.sort(key=lambda x: int(x.name.split("-")[1]))
    latest = checkpoints[-1]

    required_files = ["config.json", "model.safetensors", "trainer_state.json"]
    for f in required_files:
        if not (latest / f).exists():
            print(f"Checkpoint corrupted, missing {f}")
            return None

    return str(latest)</code></pre>
        
        <p>The training run spanned five epochs across approximately 640,000 steps. At 500-step checkpoints, keeping the last five meant roughly 7GB of checkpoint storage at any given time. A small price.</p>
        
        <h2 id="what-the-numbers-looked-like">What the Numbers Looked Like</h2>
        
        <p>Training for five epochs meant:</p>
        <ul>
          <li>Total training steps: ~640,000</li>
          <li>Time per epoch: ~14 hours</li>
          <li>Total training time: ~100 hours, excluding failed runs</li>
          <li>Checkpoints saved: ~1,280 total across the run</li>
        </ul>
        
        <p>The most educational moments were not the successful steps — they were the failures. Each crash taught something concrete about memory scaling, gradient stability, or checkpoint integrity.</p>
        
        <p>By the math it was about 70 hours, but the practical run-time was more from check pointing, and power-cycles. I don't have a clear record of how long it took.</p>
        
        <h2 id="what-comes-next">What Comes Next</h2>
        
        <p>Part 4 covers the actual training experience: what the loss curves looked like, the failures that shaped the final configuration, and what 70 hours of watching a GPU run at full load actually teaches you.</p>
        
        <p><em>This is part 3 of a 5-part series.</em></p>
        <ul>
          <li><em><a href="/blog/2025-09-06-training-llm-part-1-motivation-and-architecture">Part 1: Motivation and Architecture</a></em></li>
          <li><em><a href="/blog/2025-09-13-training-llm-part-2-dataset-engineering">Part 2: Dataset Engineering</a></em></li>
          <li><em>Part 3: Implementation and the Training Loop (this post)</em></li>
          <li><em><a href="/blog/2025-09-27-training-llm-part-4-the-training-experience">Part 4: The Training Experience</a></em></li>
          <li><em><a href="/blog/2025-10-04-training-llm-part-5-evaluation-deployment-conclusions">Part 5: Evaluation, Deployment, and Conclusions</a></em></li>
        </ul>
      `
    },
    '2025-09-27-training-llm-part-4-the-training-experience': {
      title: 'Training My Own LLM Part 4: The Actual Training Experience',
      author: 'Daniel Christensen',
      date: 'September 27, 2025',
      dateISO: '2025-09-27',
      tags: ['LLM', 'Machine Learning', 'GPU', 'Training', 'AI'],
      excerpt: 'What 70 hours of GPU training actually looks like — the failures, the recoveries, the thermal throttling, and what the loss curves revealed about the gap between toy models and production systems.',
      content: `
        <p>The papers make training look clean. Loss goes down. Model improves. You evaluate, publish, move on.</p>
        
        <p>The reality involved power outages, corrupted checkpoints, and at least one complete restart from scratch because I changed the path and forgot to update the code 😅</p>
        
        <p>This is what the actual experience looked like.</p>
        
        <h2 id="the-hardware-setup">The Hardware Setup</h2>
        
        <ul>
          <li>Single RTX 4080, 16GB VRAM</li>
          <li>No distributed training, no multi-GPU setup</li>
          <li>Mixed precision FP16 — essential, not optional</li>
          <li>Actual GPU utilization: ~78%, memory bound rather than compute bound</li>
          <li>Windows — because it was what I had</li>
        </ul>
        
        <p>CUDA setup on Windows consumed two days that are not coming back. Dependency conflicts between PyTorch, CUDA 11.8, and various supporting libraries required more troubleshooting than any single step in the project. This is not documented well anywhere, and the error messages are not helpful.</p>
        
        <p>If I were to do this again I'd use UV and be better with my requirements so then the dependencies could be addressed easier, and there's a lot of Nvidia packages I needed to install alongside</p>
        
        <h2 id="what-worked">What Worked</h2>
        
        <p><strong>Resuming from checkpoints.</strong> The checkpoint recovery logic described in Part 3 saved the project at least three times. A power outage mid-training, a pause for my own gaming computer enjoyment, and an accidental path update I missed that resulting in a complete restarts.</p>
        
        <p><strong>Mixed precision training.</strong> FP16 delivered a 1.7× speedup and allowed larger effective batch sizes. This was not a nice-to-have optimization — it was the difference between a manageable training run and one that would have taken twice as long.</p>
        
        <p><strong>Pre-tokenizing the entire dataset.</strong> The first training attempt loaded and tokenized data on the fly. Despite using PyTorch's DataLoader with 4 workers, the GPU was frequently idle waiting for data. Pre-tokenizing and saving the full 45GB processed dataset to disk eliminated this bottleneck entirely.</p>
        
        <h2 id="what-did-not-work">What Did Not Work</h2>
        
        <p><strong>Batch size 8.</strong> Out of memory on the first step. Expected in hindsight, frustrating in the moment.</p>
        
        <p><strong>Training without learning rate warmup.</strong> The first two attempts diverged within 100 steps. Loss climbed instead of falling. Adding 1,000 warmup steps with a cosine decay schedule fixed this completely.</p>
        
        <h2 id="the-loss-curves">The Loss Curves</h2>
        
        <p>Training loss converged to approximately 2.8 over five epochs. Validation perplexity settled around 30 — closely matching published GPT-2 Small results, which was genuinely validating after all the failed attempts.</p>
        
        <p>The convergence pattern revealed something the papers understate: smaller models are more sensitive to hyperparameter choices. The loss curves were noisier, the convergence less smooth, and the margin between a good configuration and a diverging one was narrower than I expected. Larger models tolerate more variation. This one did not.</p>
        
        <h2 id="the-real-cost">The Real Cost</h2>
        
        <p>The project ran intermittently over 55 days. Actual GPU runtime was approximately 300ish hours — two weeks of continuous training spread across evenings and weekends.</p>
        
        <p>My electricity bill increased by roughly $150 during the peak months, though some of that increase reflected summer cooling costs rather than pure training overhead. Running a consumer GPU at sustained maximum load also ages the hardware faster than normal use.</p>
        
        <p>None of this was prohibitive. But the economics put things in perspective: I spent meaningful time and money to train a model worse than GPT-2, which was released in 2019, which is now ancient by the standards of the field.</p>
        
        <h2 id="what-70-hours-teaches-you">What 70 Hours Teaches You</h2>
        
        <p>The understanding earned from understanding how the models are built, at least at an elementary level was helpful. Watching loss curves plateau didn't particularly matter, it's not like I am an original designer but there was still debugging. I now have an intuitive grasp of concepts that were previously just equations in papers, and hype that people talk about.</p>
        
        <p>When I read about new architectures or training techniques, I can immediately place them against my own experience. That context is genuinely valuable and would not exist without the hands-on work.</p>
        
        <p>But I would not do it again for practical purposes. The gap between hobbyist experiments and production systems is not just large — it is economically insurmountable on consumer hardware. This experience taught me to deeply respect the infrastructure behind modern AI development, while also clarifying where my time is better spent.</p>
        
        <h2 id="what-comes-next">What Comes Next</h2>
        
        <p>Part 5 covers evaluation, the local deployment that resulted, fine-tuning considerations, and the final honest assessment of what this project was worth.</p>
        
        <p><em>This is part 4 of a 5-part series.</em></p>
        <ul>
          <li><em><a href="/blog/2025-09-06-training-llm-part-1-motivation-and-architecture">Part 1: Motivation and Architecture</a></em></li>
          <li><em><a href="/blog/2025-09-13-training-llm-part-2-dataset-engineering">Part 2: Dataset Engineering</a></em></li>
          <li><em><a href="/blog/2025-09-20-training-llm-part-3-implementation-and-training-loop">Part 3: Implementation and the Training Loop</a></em></li>
          <li><em>Part 4: The Training Experience (this post)</em></li>
          <li><em><a href="/blog/2025-10-04-training-llm-part-5-evaluation-deployment-conclusions">Part 5: Evaluation, Deployment, and Conclusions</a></em></li>
        </ul>
      `
    },
    '2025-10-04-training-llm-part-5-evaluation-deployment-conclusions': {
      title: 'Training My Own LLM Part 5: Evaluation, Deployment, and Honest Conclusions',
      author: 'Daniel Christensen',
      date: 'October 4, 2025',
      dateISO: '2025-10-04',
      tags: ['LLM', 'Machine Learning', 'Deployment', 'AI', 'Lessons Learned'],
      excerpt: 'How the model actually performed, what a local deployment looked like, why I stopped before fine-tuning, and the honest verdict on whether training your own LLM from scratch is worth it.',
      content: `
        <p>After many days and an increased energy bill, the model was trained. The question was whether it was worth anything — and whether the project as a whole was worth it.</p>
        
        <p>The answers are different for each question.</p>
        
        <h2 id="evaluation-keeping-expectations-calibrated">Evaluation: Keeping Expectations Calibrated</h2>
        
        <h3 id="what-the-numbers-said">What the Numbers Said</h3>
        
        <ul>
          <li><strong>Training loss</strong>: Converged to ~2.8</li>
          <li><strong>Validation perplexity</strong>: ~30, closely matching published GPT-2 Small benchmarks</li>
          <li><strong>Inference speed</strong>: 45 tokens per second</li>
        </ul>
        
        <p>Matching the published perplexity for GPT-2 Small was genuinely satisfying. It confirmed the implementation was correct and the training had proceeded as intended.</p>
        
        <p>The inference speed was more sobering. 45 tokens per second on an RTX 4080 is approximately 1/100th the throughput of commercial APIs. A conversational exchange that feels instantaneous through an API becomes a patience exercise locally.</p>
        
        <h3 id="what-the-benchmarks-would-have-said">What the Benchmarks Would Have Said</h3>
        
        <p>I did not run formal benchmarks — MMLU, HellaSwag, or similar evaluations. The model is too small for the results to be meaningful, and the comparison to any current production model would have been discouraging rather than informative. The evaluation that mattered was whether the implementation matched the reference architecture. It did.</p>
        
        <h3 id="what-the-text-generation-actually-looked-like">What the Text Generation Actually Looked Like</h3>
        
        <p>The model generates coherent text, mostly. Short sequences are reasonable. Longer generations drift. There is a clear quality gap compared to even GPT-2 Medium — which has twice the parameters and was trained on more data. This was expected and confirmed the scaling law predictions.</p>
        
        <p>It is not a useful tool. It is a working demonstration of the mechanism.</p>
        
        <h2 id="deployment-local-only">Deployment: Local Only</h2>
        
        <h3 id="what-the-setup-looked-like">What the Setup Looked Like</h3>
        
        <ul>
          <li>Model quantized to INT8 for a 2× inference speedup with minor quality loss</li>
          <li>Simple Flask API for local testing</li>
          <li>Final model size: 550MB</li>
          <li>Startup time: 3 to 4 seconds on consumer hardware</li>
        </ul>
        
        <pre><code>from transformers import GPT2LMHeadModel, GPT2TokenizerFast
from flask import Flask, request, jsonify
import torch

app = Flask(__name__)
model = GPT2LMHeadModel.from_pretrained("./gpt2-clone/final")
tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
model.eval()

@app.route("/generate", methods=["POST"])
def generate():
    prompt = request.json.get("prompt", "")
    inputs = tokenizer.encode(prompt, return_tensors="pt")

    with torch.no_grad():
        outputs = model.generate(
            inputs,
            max_new_tokens=100,
            temperature=0.8,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )

    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({"generated": text})</code></pre>
        
        <h3 id="why-there-was-no-production-deployment">Why There Was No Production Deployment</h3>
        
        <p>Cloud hosting would cost more per month than using the OpenAI API directly. A model this size with this quality does not justify the infrastructure. The local deployment was a playground for experimentation, not a practical tool.</p>
        
        <h2 id="why-i-stopped-before-fine-tuning">Why I Stopped Before Fine-Tuning</h2>
        
        <p>Fine-tuning was the natural next step — adapting the base model for specific domains or tasks using LoRA or QLoRA. I chose not to continue for straightforward reasons.</p>
        
        <p>One, I had already done fine-tuning before I made my own model locally. Second, the base model is barely functional for general text generation compared to current standards. Fine-tuning a weak base model produces a weak specialized model. Each fine-tuned variant would require quality domain-specific training data, another 20 to 40 hours of training, and evaluation time I did not want to spend on a model I already knew was obsolete.</p>
        
        <p>The diminishing returns were clear. The learning objective had already been met.</p>
        
        <h2 id="the-honest-verdict">The Honest Verdict</h2>
        
        <h3 id="what-this-project-was-worth">What This Project Was Worth</h3>
        
        <p>The educational value was real and cannot be replicated by reading. I now have a working intuition for concepts that were previously abstract: why context windows have the sizes they do, what memory bandwidth actually constrains during training, why warmup schedules exist, and what scaling laws mean in practice.</p>
        
        <p>When I read about new architectures, I can contextualize them against direct experience rather than theory. That foundation is genuinely useful for the work I actually do — fine-tuning existing models, building RAG pipelines, integrating LLMs into production systems.</p>
        
        <h3 id="what-this-project-was-not-worth">What This Project Was Not Worth</h3>
        
        <p>I spent roughly $150 in electricity and 55 days of intermittent effort to replicate 2019 technology at a fraction of its original quality. While I was doing this, the field moved through GPT-3, ChatGPT, GPT-4, and a generation of open-source models that make my result irrelevant from any practical standpoint.</p>
        
        <h3 id="would-i-do-it-again">Would I Do It Again?</h3>
        
        <p>No. Not for practical purposes.</p>
        
        <p>This exercise is the equivalent of computing a regression by hand in a graduate statistics course — foundational for building intuition, worthwhile exactly once, and something you would never do again when the goal is actually getting an answer.</p>
        
        <p>If I were teaching a course on LLMs, I would absolutely recommend this as a learning exercise. The hands-on intuition it builds is irreplaceable. But for anyone whose goal is building useful systems with language models, the time is better spent learning to fine-tune existing checkpoints, design effective RAG architectures, and build reliable evaluation frameworks.</p>
        
        <p>Use the infrastructure that exists. Understand it deeply. Build on top of it rather than beside it.</p>
        
        <h2 id="the-full-series">The Full Series</h2>
        
        <ul>
          <li><em><a href="/blog/2025-09-06-training-llm-part-1-motivation-and-architecture">Part 1: Motivation and Architecture</a></em></li>
          <li><em><a href="/blog/2025-09-13-training-llm-part-2-dataset-engineering">Part 2: Dataset Engineering</a></em></li>
          <li><em><a href="/blog/2025-09-20-training-llm-part-3-implementation-and-training-loop">Part 3: Implementation and the Training Loop</a></em></li>
          <li><em><a href="/blog/2025-09-27-training-llm-part-4-the-training-experience">Part 4: The Training Experience</a></em></li>
          <li><em>Part 5: Evaluation, Deployment, and Conclusions (this post)</em></li>
        </ul>
        
        <p>Have questions or want to discuss any part of this project? The code is available at <a href="https://github.com/christensendaniel" target="_blank" rel="noopener noreferrer">github.com/christensendaniel</a>.</p>
      `
    },
    '2025-08-31-hello-world': {
      title: 'Hello World: Building Scalable Data Pipelines',
      author: 'Daniel B. Christensen',
      date: 'August 31, 2025',
      dateISO: '2025-08-31',
      tags: ['data-engineering', 'pipelines', 'snowflake', 'apache-flink'],
      excerpt: 'An introduction to my blog and insights on building enterprise-scale data pipelines at Disney and beyond.',
      content: `
        <p>Welcome to my technical blog! I'm Daniel B. Christensen, a Senior Data Engineer at The Walt Disney Company, and I'm excited to share insights from my journey building data infrastructure at scale.</p>
        
        <h2 id="why-this-blog">Why This Blog?</h2>
        <p>After 7+ years in data engineering, I've accumulated knowledge that I believe can help others navigate the complex world of data pipelines, real-time processing, and cloud infrastructure. This blog will serve as a platform to share:</p>
        <ul>
          <li><strong>Technical deep-dives</strong> into data engineering challenges and solutions</li>
          <li><strong>Best practices</strong> for building scalable, maintainable data systems</li>
          <li><strong>Performance optimization</strong> techniques that have saved companies millions</li>
          <li><strong>Real-world case studies</strong> from my work at Disney, SAVVBI, and VIVBI</li>
        </ul>
        
        <h2 id="what-ive-been-working-on">What I've Been Working On</h2>
        <h3 id="disney-enterprise-scale-real-time-analytics">Disney: Enterprise-Scale Real-Time Analytics</h3>
        <p>At Disney, I've been focused on building systems that can handle scale. Some highlights:</p>
        <ul>
          <li><strong>Performance Optimization</strong>: Improved event-based data query performance by 30% through advanced Snowflake optimization</li>
          <li><strong>Cost Management</strong>: Implemented comprehensive Snowflake cost reduction strategies</li>
          <li><strong>Real-Time Processing</strong>: Built Apache Flink pipelines for streaming analytics</li>
          <li><strong>Data Modeling</strong>: Created ML-ready data models with strict SLA adherence</li>
        </ul>
        
        <h3 id="key-technologies-in-my-stack">Key Technologies in My Stack</h3>
        <ul>
          <li><strong>Streaming</strong>: Apache Flink, Kafka, AWS Kinesis</li>
          <li><strong>Data Warehousing</strong>: Snowflake, BigQuery, PostgreSQL</li>
          <li><strong>Orchestration</strong>: Apache Airflow with custom monitoring</li>
          <li><strong>APIs</strong>: FastAPI for high-throughput data ingestion</li>
          <li><strong>Cloud</strong>: AWS, Azure with infrastructure-as-code</li>
        </ul>
        
        <h2 id="whats-coming">What's Coming</h2>
        <p>I'm planning to cover topics like:</p>
        <ol>
          <li><strong>Building Sub-2-Minute Data Pipelines</strong> - The architecture behind real-time analytics at scale</li>
          <li><strong>Snowflake Cost Optimization</strong> - How to reduced compute costs by 30% and increasing performance</li>
          <li><strong>Apache Flink for Data Engineers</strong> - Practical patterns for stream processing</li>
          <li><strong>API-First Data Platforms</strong> - Lessons from building systems that handle 2M+ requests/month</li>
          <li><strong>Data Quality at Scale</strong> - Monitoring and validation strategies for enterprise data</li>
        </ol>
        
        <h2 id="lets-connect">Let's Connect</h2>
        <p>I'm always interested in discussing data engineering challenges and solutions. Feel free to reach out on <a href="https://linkedin.com/in/dbchristensen">LinkedIn</a> or check out my other work:</p>
        <ul>
          <li><a href="https://christensendaniel.github.io">Portfolio</a></li>
          <li><a href="https://github.com/christensendaniel">GitHub</a></li>
          <li><a href="https://pypi.org/project/paged-list/">PyPI Package: paged-list</a></li>
        </ul>
        <p>Looking forward to sharing more insights of enterprise data engineering!</p>
      `
    },
    '2026-02-17-building-portfolio-site-ai-github-pages': {
      title: 'Building a Modern Portfolio Site with AI: From Static HTML to React',
      author: 'Daniel Christensen',
      date: 'February 17, 2026',
      dateISO: '2026-02-17',
      tags: ['AI', 'GitHub Pages', 'React', 'GitHub Actions', 'Copilot'],
      excerpt: 'How I used GitHub Pages, automated deployments, and AI-assisted development to transform a static HTML site into a modern React portfolio without writing every line myself.',
      content: `
        <p>Every good developer has a portfolio site that lingers in the back of their mind—the one that's been "good enough" for years, gathering dust as their career grows. I'm using mine as a blog to document my journey into learning about AI. Essentially, this is a journal where I am the primary audience.</p>
        
        <p>I started the site with static HTML, inline styles, and a dark mode toggle, all wired together with vanilla JavaScript and an iron will. It worked, but it didn't tell the right story for someone who builds production data systems for a living. It also exposed my front-end weaknesses, as most of my expertise lies in back-end performance.</p>
        
        <p>So, I rebuilt it—with a little help.</p>
        
        <h2 id="start-simple">Start Simple: GitHub Pages as the Foundation</h2>
        
        <p>The goal was zero infrastructure cost and zero maintenance. GitHub Pages checked both boxes. Previously, the site was hosted with a friend, but converting it to GitHub Pages allowed me to park it for free.</p>
        
        <p>The repository is public, hosting is free, and the only real expense is the domain itself—just a few dollars a year for the TLD. Everything else is handled by GitHub.</p>
        
        <p>Setting up a custom domain was straightforward. I added a <code>CNAME</code> file to the repository containing my domain name and updated my DNS provider with GitHub's nameserver records. Within a few minutes, <code>christensendaniel.com</code> was live and serving directly from the repository.</p>
        
        <p>No servers. No infrastructure to maintain. No hosting bills at the end of the month.</p>
        
        <h2 id="deployment-pipeline">The Upgraded Deployment Pipeline: Automate Everything</h2>
        
        <p>Static files work fine until you introduce a build process. The moment you add React, Tailwind, or any compilation step, complexity increases.</p>
        
        <p>GitHub Actions simplified this. I set up a workflow file in <code>.github/workflows/</code> to watch for pushes to <code>main</code>. It runs the build process and automatically deploys the compiled output:</p>
        
        <pre><code>- name: Install dependencies
  run: npm ci

- name: Build
  run: npm run build

- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: \${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist</code></pre>
        
        <p>One critical detail most tutorials overlook: <strong>deploy <code>./dist</code>, not <code>./</code></strong>. Deploying the repository root means GitHub Pages serves your source files directly. Browsers cannot execute raw JSX. The site will appear blank, the error messages will be confusing, and the fix is not obvious until you know to look for it. Deploy only the build output and update the GitHub Actions settings accordingly. This was the key step I missed when prompting AI for the site upgrade.</p>
        
        <p>It wasn't a wasted opportunity, though. From my professional experience with AI, I've learned that frameworks for testing are invaluable for keeping AI on track. Tests were my guardrails here. A post-deployment verification step ensured the live HTML referenced compiled asset bundles, not raw source files. AI can be empowering, but tests enable AI debugging to happen in an automated and reliable way.</p>
        
        <h2 id="ai-conversion">The AI Conversion: From Static HTML to React</h2>
        
        <p>This is where the story gets interesting.</p>
        
        <p>Converting a hand-written static site to React is the kind of repetitive, pattern-heavy task that AI handles exceptionally well. The structure is predictable, the patterns repeat, and decisions are largely mechanical: isolate sections, extract components, integrate a router, repeat.</p>
        
        <p>Using GitHub Copilot with detailed prompts, I followed a clear sequence for the conversion:</p>
        
        <ol>
          <li><strong>Establish the foundation</strong>—Vite, React Router, shadcn/ui, and Tailwind. The component library decision was significant. shadcn/ui offers composable, unstyled-by-default components that don't interfere with design intentions.</li>
          <li><strong>Convert pages one by one</strong>—Each static HTML page became a React component. Navigation evolved into a shared <code>Layout</code> wrapping each route. The dark mode toggle (previously held together with JavaScript event listeners) became a proper <code>ThemeProvider</code> with <code>localStorage</code> persistence.</li>
          <li><strong>Wire up routing and deployment</strong>—BrowserRouter replaced HashRouter since hash routes look unprofessional and are poorly handled by search engines. GitHub Pages required a <code>404.html</code> redirect trick for direct URL access with BrowserRouter, but that's a one-time setup.</li>
        </ol>
        
        <p>AI didn't write perfect code on the first try. It rarely does. But it shortened the gap between "I know what I want" and "I have a working prototype to iterate on." Prompts became conversations, conversations became components, and components became pages.</p>
        
        <h2 id="what-made-it-work">What Made It Work</h2>
        
        <p>Several things contributed to making the AI-assisted approach productive instead of frustrating:</p>
        
        <ul>
          <li><strong>Specific prompts beat vague ones</strong>—For example, "Convert this navigation to use shadcn/ui NavigationMenu with a hamburger Sheet on mobile" produces something useful, but "Make the nav better" generates unhelpful noise.</li>
          <li><strong>Tests as guardrails</strong>—Adding Jest and React Testing Library early on ensured every AI-generated component could be verified immediately. When Playwright deployment tests were incorrectly triggered by Jest, the error logs pinpointed the issue, and a targeted AI prompt resolved it in minutes.</li>
          <li><strong>Iterative over big bang</strong>—Converting one page or component at a time kept the scope manageable, helped catch regressions early, and made the whole process feel less overwhelming.</li>
        </ul>
        
        <h2 id="the-result">The Result</h2>
        
        <p>The outcome is a portfolio site that finally reflects the quality of work I do professionally.</p>
        
        <ul>
          <li><strong>React with proper routing</strong></li>
          <li><strong>Automated deployments with verification</strong></li>
          <li>A blog that will grow over time and is SEO-friendly.</li>
        </ul>
        
        <p>The infrastructure is boring in the best way possible—push to <code>main</code>, tests run, the build deploys, and the site updates. It fades into the background, letting the content take center stage.</p>
        
        <p>That's the goal. The site should be invisible. The work should speak.</p>
        
        <p>Have questions about the setup? Want to see the deployment workflow in detail? The repository is public at <a href="https://github.com/christensendaniel" target="_blank" rel="noopener noreferrer">github.com/christensendaniel</a>, and the website is live at <a href="https://christensendaniel.com" target="_blank" rel="noopener noreferrer">ChristensenDaniel.com</a>.</p>
      `
    }
  }

  const post = posts[postId]

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">Sorry, the blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    )
  }

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.dateISO,
    "url": `https://christensendaniel.com/blog/${postId}/`
  }

  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://christensendaniel.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://christensendaniel.com/blog/" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://christensendaniel.com/blog/${postId}/` }
    ]
  }

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${postId}/`}
        type="article"
        keywords={post.tags.join(', ')}
        article={{
          publishedTime: post.dateISO,
          author: post.author,
          tags: post.tags
        }}
      />
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="space-y-4">
              <CardTitle className="text-4xl font-bold">{post.title}</CardTitle>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
            </CardHeader>

            <CardContent className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
          </Card>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPost
