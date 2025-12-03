# Backend/app/langgraph_client.py
import re
import asyncio
from typing import Optional, Dict, Any

async def _async_sleep():
    await asyncio.sleep(0)
print("🔥🔥 langgraph_client.py LOADED FRESH")


def _smart_extract_all(text: str) -> Dict[str, Any]:
    print("🔥 USING _smart_extract_all:", text)

    print("\n====================")
    print("EXTRACTOR RECEIVED TEXT:")
    print(text)
    print("====================\n")

    out = {}

    # ---------- HCP NAME ----------
    m = re.search(r"\bDr\.?\s+[A-Z][a-zA-Z]+\b", text, re.I)
    if m:
        name = m.group(0).replace("Dr.", "Dr").strip()
        out["hcp_name"] = name

    # ---------- DATE ----------
    m = re.search(r"\b(\d{4}-\d{2}-\d{2})\b", text)
    if m:
        out["date"] = m.group(1)

    # ---------- TIME ----------
    m = re.search(r"\b([0-2]?\d:[0-5]\d)\b", text)
    if m:
        out["time"] = m.group(1)

    # ---------- MATERIALS ----------
    mats = []
    if "brochure" in text.lower():
        mats.append("brochures")
    if "sample" in text.lower():
        mats.append("samples")
    if mats:
        out["materials_shared"] = mats

    # ---------- SENTIMENT ----------
    if re.search(r"positive|good|excellent|great", text, re.I):
        out["sentiment"] = "positive"
    elif re.search(r"negative|bad|poor|unhappy", text, re.I):
        out["sentiment"] = "negative"
    else:
        out["sentiment"] = "neutral"

    # ---------- TOPICS ----------
    m = re.search(r"discussed\s+(.*?)(?:\.|;|,|$)", text, re.I)
    if m:
        out["topics"] = m.group(1).strip()

    # ---------- ATTENDEES ----------
    m = re.search(r"with\s+([A-Z][A-Za-z ]+)", text)
    if m:
        attendees_raw = m.group(1)
        attendees = re.split(r"and|,", attendees_raw)
        attendees = [a.strip() for a in attendees if a.strip()]
        out["attendees"] = attendees

    print("EXTRACTOR OUTPUT:")
    print(out)
    print("====================\n")

    return out


async def orchestrate_text(user_text: str, session_id: Optional[str] = None) -> Dict[str, Any]:
    print("🔥 orchestrate_text CALLED with:", user_text)
    await _async_sleep()
    extracted = _smart_extract_all(user_text)

    return {"extraction": extracted}
