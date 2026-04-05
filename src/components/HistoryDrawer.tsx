import { Drawer } from "../ui/Drawer";
import { useUIStore } from "../stores/uiStore";
import { History, Trash2, MessageSquare, Clock } from "lucide-react";
import { Glass } from "../ui/Glass";

export const HistoryDrawer = () => {
  const { isHistoryOpen, toggleHistory } = useUIStore();

  return (
    <Drawer 
      isOpen={isHistoryOpen} 
      onClose={toggleHistory} 
      title="Historique"
      side="right"
    >
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Glass key={i} level={1} className="p-4 flex flex-col gap-3 group border-white/5 hover:border-accent/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-white/20" />
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">Aujourd'hui, 14:24</div>
              </div>
              <button className="text-white/20 hover:text-red-500 transition-opacity opacity-0 group-hover:opacity-100">
                <Trash2 size={12} />
              </button>
            </div>
            <div className="text-white text-xs font-bold uppercase tracking-widest truncate">
              Analyse du concept de conscience artificielle
            </div>
            <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-widest">
              <MessageSquare size={10} />
              <span>12 messages</span>
            </div>
          </Glass>
        ))}
        {/* Empty State */}
        <div className="py-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
            <History size={20} className="text-white/10" />
          </div>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Historique vide</p>
        </div>
      </div>
    </Drawer>
  );
};
