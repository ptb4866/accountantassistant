from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.models import AuditLog


class AuditMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        try:
            db: Session = SessionLocal()
            log = AuditLog(
                actor=request.headers.get("X-User", "anonymous"),
                action=f"{request.method} {request.url.path}",
                details={
                    "status_code": response.status_code,
                    "client": request.client.host if request.client else None,
                },
            )
            db.add(log)
            db.commit()
        except Exception:
            pass
        finally:
            try:
                db.close()
            except Exception:
                pass
        return response
