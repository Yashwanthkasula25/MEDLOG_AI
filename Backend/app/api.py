# Backend/app/api.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict, Any

from .langgraph_client import orchestrate_text

router = APIRouter()


class ChatReq(BaseModel):
    text: str
    session_id: Optional[str] = None


class ExtractedFields(BaseModel):
    hcp_name: Optional[str] = None
    interaction_type: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    topics: Optional[str] = None
    materials_shared: List[str] = Field(default_factory=list)
    samples_distributed: List[str] = Field(default_factory=list)
    attendees: List[str] = Field(default_factory=list)
    sentiment: Optional[str] = None

    @validator("sentiment")
    def sentiment_validator(cls, v):
        if not v:
            return v
        v = v.lower()
        if v not in ["positive", "neutral", "negative"]:
            raise ValueError("Invalid sentiment")
        return v


@router.post("/chat")
async def chat_endpoint(req: ChatReq):
    print("🔥 /api/chat received:", req.text)

    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Empty text")

    # 1️⃣ Call LangGraph orchestrator
    lg = await orchestrate_text(req.text)
    print("🔥 Orchestrator output:", lg)

    if "extraction" not in lg:
        return {
            "actions": [
                {"type": "message", "text": "Extractor failed to return data."}
            ]
        }

    # 2️⃣ Validate extracted fields
    extracted: Dict[str, Any] = lg["extraction"]
    print("🔥 Extracted fields:", extracted)

    try:
        fields = ExtractedFields(**extracted)
    except Exception as e:
        return {
            "actions": [
                {"type": "message", "text": f"Validation error: {str(e)}"}
            ]
        }

    # 3️⃣ Remove empty values
    final_fields = {
        k: v for k, v in fields.dict().items()
        if v not in (None, [], "")
    }

    print("🔥 Final fields sent to UI:", final_fields)

    # 4️⃣ Build actions for frontend
    actions = []
    if final_fields:
        actions.append({"type": "update", "fields": final_fields})

    actions.append(
        {"type": "message", "text": "Interaction parsed successfully."}
    )

    return {"actions": actions}
