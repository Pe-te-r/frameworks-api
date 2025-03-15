
from app import create_app
from hypercorn.middleware import AsyncioWSGIMiddleware
import uvicorn

app = create_app()
asgi_app = AsyncioWSGIMiddleware(app)

if __name__ == '__main__':
    uvicorn.run("run:asgi_app", host="127.0.0.1", port=5000, reload=True)
