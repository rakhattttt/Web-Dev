"""
Lecture 10 §6 — the views/ package pattern.

Swap imports here to switch implementations without touching urls.py.
Currently: Level 5 (concrete generics).
"""
# Level 2 — Function-based views
# from .fbv import skills_list, skill_detail

# Level 3 — Class-based views (APIView)
# from .cbv import SkillListAPIView, SkillDetailAPIView

# Level 5 (ACTIVE) — concrete generics + custom endpoint
from .generic_v2 import (
    CategoryListAPIView,
    CategoryDetailAPIView,
    CategorySkillsAPIView,
    SkillListAPIView,
    SkillDetailAPIView,
    SwapRequestListAPIView,
    SwapRequestDetailAPIView,
)
