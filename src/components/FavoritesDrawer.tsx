import { Drawer } from "../shared/ui/molecules/Drawer";
import { useUIStore } from "../stores/uiStore";
import { Star, Trash2, MessageSquare } from "lucide-react";
import { Glass } from "../shared/ui/atoms/Glass";

export const FavoritesDrawer = () => {
  const { isFavoritesOpen, toggleFavorites } = useUIStore();

  return (
    <Drawer 
      isOpen={isFavoritesOpen} 
      onClose={toggleFavorites} 
      title="Personas Favoris"
      side="left"
    >
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Glass key={i} level={1} className="p-4 flex flex-col gap-3 group border-white/5 hover:border-accent/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="text-white text-xs font-black uppercase tracking-widest">Entity-{i}</div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-white/20 hover:text-accent transition-colors">
                  <MessageSquare size={14} />
                </button>
                <button className="text-white/20 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="text-white/40 text-[10px] leading-relaxed">
              Une entité spécialisée dans l'analyse psychométrique et la narration complexe.
            </div>
          </Glass>
        ))}
        {/* Empty State */}
        <div className="py-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
            <Star size={20} className="text-white/10" />
          </div>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Aucun favori pour le moment</p>
        </div>
      </div>
    </Drawer>
  );
};
