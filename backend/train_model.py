import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split

print("⏳ Generating synthetic network traffic data...")

# 1. Generate Synthetic Data (Simulating network traffic)
n_samples = 5000

# Benign Traffic (Label 0)
benign_data = {
    'packet_count': np.random.randint(10, 500, n_samples),
    'byte_count': np.random.randint(100, 10000, n_samples),
    'duration': np.random.uniform(0.5, 10.0, n_samples),
    'flow_rate': np.random.uniform(0, 50, n_samples),
    'protocol_num': np.random.choice([0, 1], n_samples), # 0=TCP, 1=UDP
    'label': [0] * n_samples
}

# DDoS Traffic (Label 1)
ddos_data = {
    'packet_count': np.random.randint(2000, 10000, n_samples),
    'byte_count': np.random.randint(50000, 1000000, n_samples),
    'duration': np.random.uniform(0.0, 1.0, n_samples),
    'flow_rate': np.random.uniform(1000, 10000, n_samples),
    'protocol_num': np.random.choice([0, 1, 2], n_samples),
    'label': [1] * n_samples
}

# Combine
df_benign = pd.DataFrame(benign_data)
df_ddos = pd.DataFrame(ddos_data)
df = pd.concat([df_benign, df_ddos]).sample(frac=1).reset_index(drop=True)

X = df.drop('label', axis=1)
y = df['label']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("🧠 Initializing Hybrid Ensemble Models...")

# 2. Define Models
dt_model = DecisionTreeClassifier(max_depth=10, random_state=42)
nb_model = GaussianNB()
knn_model = KNeighborsClassifier(n_neighbors=5)

# Voting Classifier
voting_ensemble = VotingClassifier(
    estimators=[('dt', dt_model), ('nb', nb_model), ('knn', knn_model)],
    voting='soft'
)

# Validation Model
rf_validator = RandomForestClassifier(n_estimators=100, random_state=42)

# 3. Train Models
print("🏋️ Training Voting Ensemble...")
voting_ensemble.fit(X_train, y_train)

print("🏋️ Training Random Forest Validator...")
rf_validator.fit(X_train, y_train)

# 4. Save Model
print("💾 Saving model to disk...")
model_data = {
    'voting_ensemble': voting_ensemble,
    'rf_validator': rf_validator,
    'description': 'Hybrid DDoS Detection Model',
    'version': '1.0'
}

joblib.dump(model_data, 'ddos_detector.pkl')
print("🎉 Success! 'ddos_detector.pkl' has been created.")