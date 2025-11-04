from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import math

app = FastAPI()

# Allow frontend access (Live Server etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧠 Load a lightweight model that runs well on CPU
print("Loading summarization model (t5-base)...")
summarizer = pipeline("summarization", model="t5-base", device=-1)  # device=-1 forces CPU
print("Model loaded successfully on CPU.")

# Request body
class TextRequest(BaseModel):
    text: str

# Helper function to split long text into safe chunks
def chunk_text(text, max_words=400):
    words = text.split()
    for i in range(0, len(words), max_words):
        yield " ".join(words[i:i + max_words])

@app.post("/summarize/")
def get_summary(request: TextRequest):
    """
    Summarize text safely on CPU (handles long input by chunking).
    Produces roughly 1/3rd–1/4th of original size.
    """
    text = request.text.strip()
    if not text:
        return {"error": "Text cannot be empty."}

    chunks = list(chunk_text(text))
    summaries = []

    for chunk in chunks:
        # Dynamic summary length
        word_count = len(chunk.split())
        max_len = max(80, math.floor(word_count / 2))
        min_len = max(40, math.floor(max_len / 2))

        # Generate summary for each chunk
        part = summarizer(chunk, max_length=max_len, min_length=min_len, do_sample=False)
        summaries.append(part[0]["summary_text"])

    # Combine partial summaries and summarize once more (for flow)
    combined = " ".join(summaries)
    final_summary = summarizer(combined, max_length=150, min_length=60, do_sample=False)[0]["summary_text"]

    return {"summary": final_summary}
