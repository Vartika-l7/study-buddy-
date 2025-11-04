from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import random

app = FastAPI(
    title="Flashcards & Paraphrasing API",
    description="Generates flashcards (Q&A) and paraphrases text using NLP models.",
    version="1.0.0"
)

# Load Hugging Face models
qa_model = pipeline("question-generation", model="valhalla/t5-small-qg-hl")
paraphrase_model = pipeline("text2text-generation", model="Vamsi/T5_Paraphrase_Paws")

class TextInput(BaseModel):
    text: str

@app.post("/flashcards")
def create_flashcards(input: TextInput):
    text = input.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    try:
        qa_pairs = qa_model(text)
        flashcards = [
            {"question": item["question"], "answer": item["answer"]}
            for item in qa_pairs[:5]
        ]
        random.shuffle(flashcards)
        return {"count": len(flashcards), "flashcards": flashcards}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/paraphrase")
def paraphrase_text(input: TextInput):
    text = input.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    try:
        result = paraphrase_model(f"paraphrase: {text}", max_length=100, num_return_sequences=3)
        paraphrases = [r["generated_text"] for r in result]
        return {"original": text, "paraphrases": paraphrases}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "Flashcards & Paraphrasing API is running 🚀"}
