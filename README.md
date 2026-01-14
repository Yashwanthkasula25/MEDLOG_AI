📘 MedLog AI – HCP Interaction Logging (Assignment Submission)

This project is a full-stack replica of the interaction logging interface provided in the assignment.

It includes:

✔ Fully functional React frontend.

✔ Styled UI matching the exact reference screenshots.

✔ FastAPI backend with /api/chat endpoint.

✔ Integration with LangGraph orchestrator.

✔ Automatic field extraction + UI autofill.

🏗  Tech Stack
Frontend 

React (Vite)

TailwindCSS

Custom CSS (ChatPanel.css, LogInteractionForm.css)

Component-based architecture

Backend

FastAPI

Pydantic

Python Async

LangGraph orchestrator client

Extraction + Validation Pipeline

🎯 Features Implemented (as per requirements)
✅ UI Requirements

Exact replica of the reference design

Light blue instruction card

User chat message (blue bubble)

AI response bubble (light grey)

Green success card with correct text

Right-side rounded “Log” floating button

Left side form:

HCP Name

Interaction Type

Date

Time

Attendees

Topics

Materials Shared

Samples Distributed

Sentiment

✨ Interaction Flow

User types interaction summary

Frontend sends it to backend via /api/chat

Backend extracts structured data:

HCP Name

Date

Time

Attendees

Topics

Materials Shared

Sentiment

Extracted values automatically populate the form

AI response shown in chat panel

Green success card displayed

UI remains scrollable & responsive

📂 Project Structure
Frontend/
 └── src/
      └── components/
           ├── SplitLayout.jsx
           ├── ChatPanel.jsx
           ├── ChatPanel.css
           ├── LogInteractionForm.jsx
           ├── LogInteractionForm.css

Backend/
 ├── main.py
 ├── app/
 │    ├── api.py
 │    └── langgraph_client.py
 └── requirements.txt

🔌 API Endpoint
POST /api/chat
Request
{
  "text": "Met Dr. Smith today at 09:30; shared brochures; positive sentiment"
}

Response
{
  "actions": [
    {
      "type": "update",
      "fields": {
        "hcp_name": "Dr. Smith",
        "time": "09:30",
        "materials_shared": ["brochures"],
        "sentiment": "positive"
      }
    },
    {
      "type": "message",
      "text": "Interaction parsed successfully."
    }
  ]
}

▶️ How to Run Locally
Backend
cd Backend
pip install -r requirements.txt
uvicorn main:app --reload


Backend runs at:
👉 http://127.0.0.1:8000

👉 http://127.0.0.1:8000/docs

Frontend
cd Frontend
npm install
npm run dev


Frontend runs at:
👉 http://localhost:5173


🎨 Screenshot

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a1e0bcf3-a367-4cc9-b229-bde04bd53658" />


✔ Status

Completed: All features match the assignment demo perfectly.
The UI replicates the spacing, colors, message bubbles, and interaction flow exactly.# MEDLOG_AI
