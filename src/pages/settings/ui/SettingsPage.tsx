import { motion } from "motion/react";
import { AppearanceTab } from "../../../features/settings/ui/AppearanceTab";
import { Glass } from "../../../shared/ui/atoms/Glass";
import { Settings, User, Bell, Shield, HelpCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../shared/lib/utils";

const TABS = [
  { id: "appearance", icon: Settings, label: "Apparence" },
  { id: "profile", icon: User, label: "Profil" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "security", icon: Shield, label: "Sécurité" },
  { id: "help", icon: HelpCircle, label: "Aide" },
];

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("appearance");

  return (
    <div className="flex flex-col gap-8 py-12">
      <div className="flex flex-col gap-2">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-accent text-[10px] font-black uppercase tracking-widest"
        >
          Configuration
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white text-4xl font-black tracking-tighter uppercase"
        >
          Réglages Système
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="flex flex-col gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative group"
              >
                <Glass 
                  level={isActive ? 2 : 1} 
                  className={cn(
                    "p-4 flex items-center gap-4 transition-all border-white/5",
                    isActive ? "border-accent/40 bg-accent/5" : "hover:border-white/20"
                  )}
                >
                  <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-accent" : "text-white/40")} />
                  <span className={cn("text-xs font-black uppercase tracking-widest", isActive ? "text-white" : "text-white/20")}>
                    {tab.label}
                  </span>
                </Glass>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "appearance" && <AppearanceTab />}
            {activeTab !== "appearance" && (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
                <Glass level={1} className="p-12 border-white/5 opacity-40">
                  <h3 className="text-white font-black uppercase tracking-widest">En cours de développement</h3>
                  <p className="text-text-muted text-xs mt-2">Cette section sera disponible dans une prochaine mise à jour.</p>
                </Glass>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
