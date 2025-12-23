# Backend/app/langgraph_client.py
import re
import asyncio
from typing import Optional, Dict, Any

async def _async_sleep():
    await asyncio.sleep(0)
print("🔥🔥 langgraph_client.py LOADED FRESH")


def _smart_extract_all(text: str) -> Dict[str, Any]:
    print("🔥 USING _smart_extract_all:", text)

    out: Dict[str, Any] = {}
    text_lower = text.lower()

   # ---------- INTERACTION TYPE ----------
    text_lower = text.lower()

    if "email" in text_lower:
        out["interaction_type"] = "Email"

    elif "call" in text_lower:
        out["interaction_type"] = "Call"

    elif "visit" in text_lower:
        out["interaction_type"] = "Visit"

    elif "in-person" in text_lower or "meeting" in text_lower:
        out["interaction_type"] = "In-Person Meeting"

    # ---------- HCP NAME (Primary Doctor) ----------
    m = re.search(r"\bDr\.?\s+[A-Z][a-zA-Z]+\b", text)
    if m:
        hcp_name = m.group(0).replace("Dr.", "Dr").strip()
        out["hcp_name"] = hcp_name
    else:
        hcp_name = ""

    # ---------- DATE ----------
    m = re.search(r"\b(\d{4}-\d{2}-\d{2})\b", text)
    if m:
        out["date"] = m.group(1)

    # ---------- TIME ----------
    m = re.search(r"\b([0-2]?\d:[0-5]\d)\b", text)
    if m:
        out["time"] = m.group(1)

    # ---------- MATERIALS & SAMPLES ----------
    materials = []
    samples = []

    if "brochure" in text_lower:
        materials.append("brochures")
    if "slide" in text_lower:
        materials.append("slides")
    if "sample" in text_lower:
        samples.append("samples")

    if materials:
        out["materials_shared"] = materials
    if samples:
        out["samples_distributed"] = samples

    # ---------- SENTIMENT ----------
    if re.search(r"\b(positive|good|excellent|great|interested)\b", text_lower):
        out["sentiment"] = "positive"
    elif re.search(r"\b(negative|bad|poor|unhappy)\b", text_lower):
        out["sentiment"] = "negative"
    else:
        out["sentiment"] = "neutral"

    # ---------- TOPICS ----------
    topic_patterns = [
        r"discussion was about\s+([a-zA-Z\s]+?)\s+drug",
        r"discussed\s+([a-zA-Z\s]+)",
        r"about\s+([a-zA-Z\s]+?)\s+drug"
    ]

    for pat in topic_patterns:
        m = re.search(pat, text, re.I)
        if m:
            out["topics"] = m.group(1).strip() + " drug"
            break

    # ---------- ATTENDEES (Exclude Primary HCP) ----------
    attendees = []

    names = re.findall(
        r"(Dr\.?\s+[A-Z][a-z]+|Nurse\s+[A-Z][a-z]+)",
        text
    )

    for name in names:
        clean = name.replace("Dr.", "Dr").strip()
        if hcp_name and clean.lower() == hcp_name.lower():
            continue
        attendees.append(clean)

    if attendees:
        out["attendees"] = attendees

    print("EXTRACTOR OUTPUT:")
    print(out)
    print("====================\n")

    return out

async def orchestrate_text(
    user_text: str,
    session_id: Optional[str] = None
) -> Dict[str, Any]:
    print("🔥 orchestrate_text CALLED with:", user_text)
    await _async_sleep()
    extracted = _smart_extract_all(user_text)
    return {"extraction": extracted}
