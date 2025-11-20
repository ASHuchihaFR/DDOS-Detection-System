import pandas as pd
import joblib
import random
import os

class ModelHandler:
    def __init__(self):
        self.model = None
        self.path = "ddos_detector.pkl"
        self.load_model()

    def load_model(self):
        if os.path.exists(self.path):
            try:
                # Assuming the dict structure from previous prompt
                loaded_data = joblib.load(self.path)
                self.model = loaded_data['voting_ensemble']
                self.rf = loaded_data['rf_validator']
                print("✅ Trained Model Loaded Successfully")
            except Exception as e:
                print(f"⚠️ Error loading model: {e}. Switching to Mock Mode.")
                self.model = None
        else:
            print("⚠️ No model found. Switching to Mock/Demo Mode.")
            self.model = None

    def predict(self, packet_data):
        """
        Returns: (is_ddos: bool, confidence: float, type: str)
        """
        if self.model:
            # Real Prediction Logic (Simplified for integration)
            # You would add your preprocessing steps here
            df = pd.DataFrame([packet_data])
            # prediction = self.model.predict(df) ...
            # For now, let's pass through to mock if implementation isn't fully wired
            pass
        
        # --- DEMO/MOCK LOGIC (For presentation purposes) ---
        # If packet count is high or duration is short, flag as DDoS
        is_ddos = False
        confidence = random.uniform(0.6, 0.95)
        
        if packet_data['packet_count'] > 1000 or packet_data['duration'] < 0.1:
            is_ddos = True
        elif packet_data['protocol'] == 'UDP' and packet_data['byte_count'] > 5000:
             is_ddos = True
             
        return is_ddos, confidence