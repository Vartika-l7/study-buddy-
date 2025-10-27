"""
Author: Akanksha Dhyani (J240211051)
Module: Input & Preprocessing + Database Setup + API Endpoint
Description:
    - Extracts text from PDF/DOCX/TXT
    - Preprocesses text (clean + tokenize)
    - Stores cleaned text in SQLite DB
    - Provides /upload API endpoint for integration
"""

import os
import re
import sqlite3
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from docx import Document
import nltk
import spacy

# ------------------ NLP Setup ------------------
nltk.download('punkt', quiet=True)
nlp = spacy.load("en_core_web_sm")

# ------------------ FastAPI App ------------------
app = FastAPI(title="Input & Preprocessing API", version="1.0")

# Allow frontend & backend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with frontend domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Database Setup ------------------

def setup_database(db_name="studybuddy.db"):
    """Create SQLite database with required tables."""
    conn = sqlite3.connect(db_name)
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS Notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        file_name TEXT,
        clean_text TEXT,
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS Summaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        note_id INTEGER,
        summary_text TEXT,
        FOREIGN KEY(note_id) REFERENCES Notes(id)
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS Quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        note_id INTEGER,
        quiz_data TEXT,
        FOREIGN KEY(note_id) REFERENCES Notes(id)
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS Scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        quiz_id INTEGER,
        score REAL,
        FOREIGN KEY(user_id) REFERENCES Users(id),
        FOREIGN KEY(quiz_id) REFERENCES Quizzes(id)
    )
    """)

    conn.commit()
    conn.close()
    print("[DB] Tables created successfully!")

setup_database()

# ------------------ Text Extraction ------------------

def extract_text_from_pdf(file_path):
    text = ""
    reader = PdfReader(file_path)
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.strip()

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs]).strip()

def extract_text_from_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read().strip()

def extract_text(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext == ".docx":
        return extract_text_from_docx(file_path)
    elif ext == ".txt":
        return extract_text_from_txt(file_path)
    else:
        raise ValueError("Unsupported file format! Only PDF, DOCX, TXT allowed.")

# ------------------ Preprocessing ------------------

def clean_and_tokenize(text):
    text = re.sub(r'[^A-Za-z0-9\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip().lower()
    doc = nlp(text)
    tokens = [token.text for token in doc if not token.is_stop]
    return " ".join(tokens)

# ------------------ Utility Functions ------------------

def store_clean_text(user_id, file_name, clean_text, db_name="studybuddy.db"):
    conn = sqlite3.connect(db_name)
    cur = conn.cursor()
    cur.execute("INSERT INTO Notes (user_id, file_name, clean_text) VALUES (?, ?, ?)",
                (user_id, file_name, clean_text))
    conn.commit()
    conn.close()

# ------------------ FastAPI Endpoint ------------------

@app.post("/upload")
async def upload_file(
    user_id: int = Form(...),
    file: UploadFile = File(...)
):
    """
    Upload a file (PDF/DOCX/TXT), preprocess it,
    store clean text in DB, and return confirmation.
    """
    try:
        # Save uploaded file temporarily
        file_path = f"temp_{file.filename}"
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        # Extract and preprocess
        raw_text = extract_text(file_path)
        clean_text = clean_and_tokenize(raw_text)

        # Store in DB
        store_clean_text(user_id, file.filename, clean_text)

        # Clean up
        os.remove(file_path)

        return {
            "status": "success",
            "filename": file.filename,
            "message": "File processed and stored successfully!",
            "clean_text_preview": clean_text[:200] + "..."  # preview first 200 chars
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}


# ------------------ Run Server ------------------

# Run using: uvicorn input_preprocessing_db_api:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("input_preprocessing_db_api:app", host="0.0.0.0", port=8000, reload=True)
