from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import random
import json
from datetime import datetime
from model_loader import ModelHandler

app = FastAPI()

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_handler = ModelHandler()

class PacketInput(BaseModel):
    source_ip: str
    destination_ip: str
    protocol: str
    packet_count: int
    byte_count: int
    duration: float

@app.post("/api/analyze")
async def analyze_packet(packet: PacketInput):
    is_ddos, confidence = model_handler.predict(packet.dict())
    
    return {
        "status": "Attack Detected" if is_ddos else "Benign Traffic",
        "is_ddos": is_ddos,
        "confidence": round(confidence * 100, 2),
        "timestamp": datetime.now().isoformat()
    }

# --- REAL-TIME TRAFFIC SIMULATOR (WebSockets) ---
@app.websocket("/ws/traffic")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate incoming network traffic
            protocols = ['TCP', 'UDP', 'ICMP']
            is_attack = random.choice([True, False, False, False]) # 25% chance of attack in simulation
            
            packet = {
                "id": random.randint(10000, 99999),
                "source_ip": f"192.168.1.{random.randint(1, 255)}",
                "destination_ip": "10.0.0.5",
                "protocol": random.choice(protocols),
                "packet_count": random.randint(500, 5000) if is_attack else random.randint(10, 100),
                "byte_count": random.randint(10000, 50000) if is_attack else random.randint(100, 1000),
                "duration": random.uniform(0.1, 5.0),
                "timestamp": datetime.now().strftime("%H:%M:%S")
            }
            
            # Run prediction
            is_ddos, conf = model_handler.predict(packet)
            
            response = {
                "packet": packet,
                "prediction": {
                    "is_ddos": is_ddos,
                    "confidence": round(conf * 100, 1)
                }
            }
            
            await websocket.send_json(response)
            await asyncio.sleep(1) # Send update every 1 second
    except Exception as e:
        print(f"WebSocket Error: {e}")
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)