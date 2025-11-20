import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, Activity, AlertTriangle, CheckCircle, Server } from 'lucide-react';

const App = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [stats, setStats] = useState({ safe: 0, attack: 0 });
  const [manualResult, setManualResult] = useState(null);
  
  // Manual Entry State
  const [formData, setFormData] = useState({
    source_ip: "192.168.1.10", destination_ip: "10.0.0.5",
    protocol: "TCP", packet_count: 150, byte_count: 1200, duration: 1.5
  });

  // WebSocket Connection for Live Data
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/traffic");
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const isAttack = data.prediction.is_ddos;

      // Update Stats
      setStats(prev => ({
        safe: isAttack ? prev.safe : prev.safe + 1,
        attack: isAttack ? prev.attack + 1 : prev.attack
      }));

      // Update Graph Data (Keep last 20 points)
      setTrafficData(prev => {
        const newData = [...prev, {
          time: data.packet.timestamp,
          packets: data.packet.packet_count,
          type: isAttack ? 'Attack' : 'Safe'
        }];
        return newData.slice(-20);
      });
    };

    return () => ws.close();
  }, []);

  const handleManualCheck = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/analyze', formData);
      setManualResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Charts Data
  const pieData = [
    { name: 'Benign', value: stats.safe, color: '#10b981' },
    { name: 'DDoS', value: stats.attack, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen p-6 bg-slate-900 text-slate-100 font-sans">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <Shield className="h-10 w-10 text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold">NetGuardAI Defense System</h1>
            <p className="text-slate-400 text-sm">Hybrid Ensemble DDoS Detection</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-400">Server Status</p>
            <div className="flex items-center gap-2 text-green-400 font-bold">
              <Activity size={16} /> ONLINE
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COL: Live Monitor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Chart */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="text-blue-400" /> Live Traffic Throughput
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                  />
                  <Line type="monotone" dataKey="packets" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Logs */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Recent Packets</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400 border-b border-slate-700">
                  <tr>
                    <th className="p-2">Time</th>
                    <th className="p-2">Protocol</th>
                    <th className="p-2">Packets</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trafficData.slice().reverse().slice(0, 5).map((log, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50">
                      <td className="p-2">{log.time}</td>
                      <td className="p-2">TCP</td>
                      <td className="p-2">{log.packets}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${log.type === 'Attack' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                          {log.type.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COL: Stats & Manual Check */}
        <div className="space-y-6">
          {/* Statistics */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Traffic Distribution</h2>
            <div className="h-48 flex items-center justify-center">
               <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div> Benign: {stats.safe}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div> DDoS: {stats.attack}
              </div>
            </div>
          </div>

          {/* Manual Inspector */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Server className="text-purple-400" /> Packet Inspector
            </h2>
            <form onSubmit={handleManualCheck} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="number" placeholder="Packet Count" 
                  className="bg-slate-900 border border-slate-700 rounded p-2 text-sm w-full"
                  onChange={(e) => setFormData({...formData, packet_count: parseInt(e.target.value)})}
                  value={formData.packet_count}
                />
                 <input 
                  type="number" placeholder="Duration (s)" 
                  className="bg-slate-900 border border-slate-700 rounded p-2 text-sm w-full"
                  onChange={(e) => setFormData({...formData, duration: parseFloat(e.target.value)})}
                  value={formData.duration}
                />
              </div>
              <select 
                className="bg-slate-900 border border-slate-700 rounded p-2 text-sm w-full"
                onChange={(e) => setFormData({...formData, protocol: e.target.value})}
                value={formData.protocol}
              >
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
                <option value="ICMP">ICMP</option>
              </select>
              
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition">
                Analyze Packet
              </button>
            </form>

            {manualResult && (
              <div className={`mt-4 p-3 rounded border ${manualResult.is_ddos ? 'bg-red-500/10 border-red-500' : 'bg-green-500/10 border-green-500'}`}>
                <div className="flex items-center gap-2 font-bold">
                  {manualResult.is_ddos ? <AlertTriangle size={18} className="text-red-500"/> : <CheckCircle size={18} className="text-green-500"/>}
                  <span className={manualResult.is_ddos ? "text-red-400" : "text-green-400"}>
                    {manualResult.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Confidence Score: {manualResult.confidence}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;