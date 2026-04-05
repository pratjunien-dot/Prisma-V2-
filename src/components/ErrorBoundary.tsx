import React, { Component, ErrorInfo, ReactNode } from "react";
import { Glass } from "../ui/Glass";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-black">
          <Glass level={4} className="max-w-md w-full p-8 text-center space-y-6 border-red-500/20">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
              <AlertTriangle size={32} className="text-red-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-white text-xl font-black uppercase tracking-tighter">Erreur Système Critique</h2>
              <p className="text-white/40 text-xs leading-relaxed">
                Le pipeline S1 a rencontré une anomalie structurelle. Une réinitialisation du module est nécessaire.
              </p>
            </div>
            <div className="bg-red-500/5 p-4 rounded-lg border border-red-500/10">
              <code className="text-red-500/60 text-[10px] font-mono break-all">
                {this.state.error?.message || "Unknown anomaly detected"}
              </code>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              Réinitialiser le Système
            </button>
          </Glass>
        </div>
      );
    }

    return this.props.children;
  }
}
