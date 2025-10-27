from fastapi import APIRouter
from pydantic import BaseModel


class ReportRequest(BaseModel):
    topic: str
    scope: str | None = None


router = APIRouter(prefix="/report", tags=["report"])


@router.post("")
async def generate_report(req: ReportRequest):
    # Placeholder structured report; later integrate LLM and templates
    return {
        "title": f"Technical Accounting Memo: {req.topic}",
        "executive_summary": "Summary of the accounting issue and recommendation.",
        "analysis": [
            {"section": "Background", "content": "Facts and circumstances."},
            {"section": "Authoritative Guidance", "content": "ASC/IFRS references."},
            {"section": "Assessment", "content": "Alternative views and analysis."},
            {"section": "Conclusion", "content": "Recommended accounting treatment."},
        ],
        "citations": [],
    }
