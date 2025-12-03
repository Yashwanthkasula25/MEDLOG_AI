from sqlalchemy import Column, Integer, String, Text, Date, Time, TIMESTAMP
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import func

Base = declarative_base()

# Use JSON for MySQL compatibility and JSONB for Postgres when configuring dialect.
class Interaction(Base):
    __tablename__ = 'interactions'
    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String(255), nullable=True)
    interaction_type = Column(String(100), nullable=True)
    date = Column(Date, nullable=True)
    time = Column(Time, nullable=True)
    attendees = Column(Text, nullable=True)  # store as comma-separated or JSON string
    topics = Column(Text, nullable=True)
    materials_shared = Column(Text, nullable=True)  # JSON string or CSV
    samples_distributed = Column(Text, nullable=True)
    sentiment = Column(String(20), nullable=True)
    outcomes = Column(Text, nullable=True)
    follow_up_actions = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
