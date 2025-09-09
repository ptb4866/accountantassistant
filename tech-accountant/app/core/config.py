from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    app_name: str = Field(default="Tech Accountant AI")
    environment: str = Field(default="development")
    database_url: str = Field(default="sqlite:////workspace/tech-accountant/db/app.db")
    openai_api_key: str | None = None

    class Config:
        env_file = "/workspace/tech-accountant/.env"
        extra = "ignore"


settings = Settings()
