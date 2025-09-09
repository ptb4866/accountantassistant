from pathlib import Path
from fastapi import APIRouter
from fastapi.responses import FileResponse


router = APIRouter(tags=["ui"])


@router.get("/")
def serve_index():
    html_path = Path("/workspace/tech-accountant/app/templates/index.html")
    return FileResponse(str(html_path))
