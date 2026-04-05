import { useState } from "react";
import { Settings2, Check, ArrowLeft } from "lucide-react";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { useChatPipelineStore } from "../model/chat-pipeline.store";

export const PersonaEditor = () => {
  const { context, confirmPersona, backToSelection } = useChatPipelineStore();
  const [editedPersona, setEditedPersona] = useState(context.finalPersona!);

  const handleSave = () => {
    confirmPersona(editedPersona);
  };

  const handleBack = () => {
    backToSelection();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Retour
        </button>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
          <Settings2 className="text-accent" />
          Affinage <span className="text-accent">Persona</span>
        </h2>
        <div className="w-20" /> {/* Spacer for centering */}
      </div>

      <Glass level={2} className="p-8 space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-5xl border-2 border-accent/30 shadow-2xl">
            {editedPersona.avatar}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Nom</label>
              <input 
                type="text" 
                value={editedPersona.name}
                onChange={(e) => setEditedPersona({...editedPersona, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Rôle</label>
              <input 
                type="text" 
                value={editedPersona.role}
                onChange={(e) => setEditedPersona({...editedPersona, role: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Description</label>
          <textarea 
            value={editedPersona.description}
            onChange={(e) => setEditedPersona({...editedPersona, description: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors min-h-[100px] resize-none"
          />
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button 
            onClick={handleSave}
            className="px-8 py-3 bg-accent text-black font-black uppercase tracking-widest text-sm rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Check size={18} />
            Confirmer & Démarrer
          </button>
        </div>
      </Glass>
    </div>
  );
};
