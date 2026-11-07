
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# This list will temporarily store emergency requests
emergency_requests = []

# This defines what information a person submits
class EmergencyRequest(BaseModel):
    message: str
    location: str

# Our homepage
@app.get("/")
def home():
    return {"message": "ResQ Beacon is running!"}

# Receive a new emergency request
@app.post("/requests")
def create_request(request: EmergencyRequest):

    new_request = {
        "id": len(emergency_requests) + 1,
        "message": request.message,
        "location": request.location,
        "urgency": "pending_review",
        "status": "open"
    }

    emergency_requests.append(new_request)

    return new_request

# Get all emergency requests
@app.get("/requests")
def get_requests():
    return emergency_requests
