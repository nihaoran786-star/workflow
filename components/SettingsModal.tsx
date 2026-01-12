
import React, { useState, useEffect } from 'react';
import { X, Save, Key, ExternalLink } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [polloKey, setPolloKey] = useState('');
  const [duomiKey, setDuomiKey] = useState('');
  const [duomiSecret, setDuomiSecret] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const pKey = localStorage.getItem('pollo_api_key');
    if (pKey) setPolloKey(pKey);
    
    const dKey = localStorage.getItem('duomi_api_key');
    if (dKey) setDuomiKey(dKey);

    const dSecret = localStorage.getItem('duomi_secret_key');
    if (dSecret) setDuomiSecret(dSecret);
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('pollo_api_key', polloKey.trim());
    localStorage.setItem('duomi_api_key', duomiKey.trim());
    localStorage.setItem('duomi_secret_key', duomiSecret.trim());
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    setTimeout(onClose, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="w-[520px] bg-[#1c1c1e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-700/50 rounded-lg">
                <Key size={16} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">API 设置 (Settings)</span>
          </div>
        </div>

        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Pollo / Wan Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    Pollo.ai (Wan 2.1)
                </label>
                <a href="https://pollo.ai/dashboard/api-keys" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors">
                    <span>获取 Key</span>
                    <ExternalLink size={10} />
                </a>
            </div>
            
            <div className="relative group">
                <input 
                    type="password" 
                    autoComplete="off"
                    className="w-full bg-black/30 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
                    placeholder="Pollo API Key..."
                    value={polloKey}
                    onChange={(e) => setPolloKey(e.target.value)}
                />
            </div>
          </div>

          {/* Sora-2 (Duomi) Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    External API (Sora-2)
                </label>
                <span className="text-[10px] text-slate-500">Duomi API</span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-medium ml-1">API Key</label>
                    <input 
                        type="password" 
                        autoComplete="off"
                        className="w-full bg-black/30 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
                        placeholder="Duomi API Key..."
                        value={duomiKey}
                        onChange={(e) => setDuomiKey(e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-medium ml-1">Secret Key</label>
                    <input 
                        type="password" 
                        autoComplete="off"
                        className="w-full bg-black/30 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
                        placeholder="Duomi Secret Key..."
                        value={duomiSecret}
                        onChange={(e) => setDuomiSecret(e.target.value)}
                    />
                </div>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed px-1">
                配置 Sora-2 接口密钥。所有密钥仅存储在本地浏览器中，绝不上传至其他服务器。
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-white/5 bg-[#121214] flex justify-end">
            <button 
                onClick={handleSave}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${isSaved ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-cyan-400 hover:scale-105'}`}
            >
                {isSaved ? '已保存' : '保存设置'}
            </button>
        </div>
      </div>
    </div>
  );
};
