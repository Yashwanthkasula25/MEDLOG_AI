from sqlalchemy.orm import Session
from . import models
from datetime import datetime
import json

def create_interaction(db: Session, payload: dict):
    # Normalize some fields: arrays -> JSON string
    def to_str(x):
        if x is None:
            return None
        if isinstance(x, (list, dict)):
            return json.dumps(x)
        return str(x)
    obj = models.Interaction(
        hcp_name=payload.get('hcp_name'),
        interaction_type=payload.get('interaction_type'),
        date=payload.get('date'),
        time=payload.get('time'),
        attendees=to_str(payload.get('attendees')),
        topics=payload.get('topics'),
        materials_shared=to_str(payload.get('materials_shared')),
        samples_distributed=to_str(payload.get('samples_distributed')),
        sentiment=payload.get('sentiment'),
        outcomes=payload.get('outcomes'),
        follow_up_actions=payload.get('follow_up_actions')
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_interaction(db: Session, interaction_id: int):
    return db.query(models.Interaction).filter(models.Interaction.id == interaction_id).first()

def get_interactions_by_hcp(db: Session, hcp_name: str, limit: int = 10):
    return db.query(models.Interaction).filter(models.Interaction.hcp_name.ilike(f"%{hcp_name}%")).order_by(models.Interaction.created_at.desc()).limit(limit).all()

def update_interaction(db: Session, interaction_id: int, update_fields: dict):
    obj = db.query(models.Interaction).filter(models.Interaction.id == interaction_id).first()
    if not obj:
        return None
    # only update keys provided
    for k, v in update_fields.items():
        if hasattr(obj, k):
            # keep serialization for arrays/objects
            if isinstance(v, (list, dict)):
                setattr(obj, k, json.dumps(v))
            else:
                setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj
