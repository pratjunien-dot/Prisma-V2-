import { useState, useEffect } from "react";
import { Newspaper, ExternalLink, Loader2 } from "lucide-react";
import { Glass } from "../../../ui/Glass";

export const NewsWidget = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://news.google.com/rss?hl=fr&gl=FR&ceid=FR:fr'));
        const data = await res.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const items = Array.from(xml.querySelectorAll("item")).slice(0, 5);
        
        setNews(items.map(item => ({
          id: item.querySelector("guid")?.textContent || Math.random().toString(),
          title: item.querySelector("title")?.textContent,
          link: item.querySelector("link")?.textContent,
          source: item.querySelector("source")?.textContent || "Google News",
          time: new Date(item.querySelector("pubDate")?.textContent || "").toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        })));
      } catch (e) {
        console.error("Failed to fetch news", e);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <Glass level={2} className="p-6 flex flex-col h-full group hover:border-accent/50 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Newspaper className="text-accent" size={20} />
          <span className="text-white font-black uppercase tracking-widest text-sm">Actualités IA</span>
        </div>
        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Live</span>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-accent" size={24} />
          </div>
        ) : (
          news.map((item) => (
            <a 
              key={item.id} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group/item block cursor-pointer"
            >
              <h4 className="text-white text-sm font-medium leading-snug group-hover/item:text-accent transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2 text-[10px] text-white/40">
                  <span>{item.source}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
                <ExternalLink size={12} className="text-white/0 group-hover/item:text-white/40 transition-colors" />
              </div>
            </a>
          ))
        )}
      </div>
    </Glass>
  );
};
