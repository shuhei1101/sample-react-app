from typing import Any, Dict
from pydantic import BaseModel

class Source(BaseModel):
    """llmの回答時に使用したソース"""
    text: str
    metadata: Dict[str, Any]
