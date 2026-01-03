import React, { useEffect, useRef, useState, useMemo } from 'react';
import { X, Tag, MonitorPlay, RotateCcw, Check, Play, Pause, Volume2, VolumeX, Info, Subtitles } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Button } from './ui/Button';

const ALL_CATEGORY = 'All Categories';
const STORAGE_KEY_CATEGORIES = 'portfolio-filter-categories';
const STORAGE_KEY_TAGS = 'portfolio-filter-tags';

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const ProjectSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse">
    <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800"></div>
    <div className="p-6 space-y-4">
      <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="space-y-2"><div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded"></div></div>
    </div>
  </div>
);

interface CustomVideoPlayerProps {
  src: string;
  captionsUrl?: string;
  poster?: string;
  onClose: () => void;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, captionsUrl, poster, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.play().catch(() => setIsPlaying(false));
    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.textTracks && video.textTracks.length > 0) {
      video.textTracks[0].mode = captionsEnabled ? 'showing' : 'hidden';
    }
  }, [captionsEnabled]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else if (isMuted) { videoRef.current.muted = false; setIsMuted(false); }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = time;
  };

  return (
    <div 
      className="relative w-full h-full bg-black flex flex-col justify-center group"
      onKeyDown={(e) => {
        if (e.key === ' ') { e.preventDefault(); togglePlay(); }
        if (e.key === 'm') { e.preventDefault(); toggleMute(); }
        if (e.key === 'c') { e.preventDefault(); setCaptionsEnabled(!captionsEnabled); }
      }}
      tabIndex={0}
      role="region"
      aria-label="Video Player"
    >
      <video ref={videoRef} src={src} poster={poster} className="w-full h-full object-contain" onClick={togglePlay} playsInline crossOrigin="anonymous">
        {captionsUrl && <track kind="captions" src={captionsUrl} srcLang="en" label="English" default={captionsEnabled} />}
      </video>

      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeek} className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-4" aria-label="Seek Video" />
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="p-1 hover:bg-white/10 rounded" aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>
            <div className="flex items-center gap-2 group/vol">
              <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-0 group-hover/vol:w-16 transition-all duration-300 h-1 bg-white/30 rounded appearance-none accent-blue-500" aria-label="Volume" />
            </div>
            <span className="text-xs font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <div className="flex items-center gap-3">
            {captionsUrl && (
              <button onClick={() => setCaptionsEnabled(!captionsEnabled)} className={`p-1 rounded ${captionsEnabled ? 'text-blue-400' : 'text-white/50'}`} aria-label="Toggle Captions" aria-pressed={captionsEnabled}>
                <Subtitles size={18} />
              </button>
            )}
            <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onClick, onViewDemo, highlightedTags, index }: any) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 animate-in fade-in zoom-in-95 fill-mode-forwards" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer" onClick={onClick}>
        <img src={project.imageUrl} alt={project.title} onLoad={() => setImageLoaded(true)} className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-3 items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <button className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-blue-600 hover:text-white" onClick={(e) => { e.stopPropagation(); onClick(); }}>Explore Case Study</button>
          {project.demoVideoUrl && (
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-blue-700 hover:scale-105 hover:shadow-blue-500/50 flex items-center gap-2" onClick={(e) => { e.stopPropagation(); onViewDemo(); }}>
              <MonitorPlay size={16} /> Watch Demo
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h4>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl mb-6 border border-slate-100 dark:border-slate-700/50 min-h-[96px]">
           <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 font-medium italic">{project.fullDescription || project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech: string) => (
            <span key={tech} className={`text-[10px] px-2.5 py-1 rounded-md border transition-all duration-300 font-bold tracking-tight shadow-sm ${highlightedTags.includes(tech) ? 'bg-blue-600 border-blue-600 text-white scale-110' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

interface PortfolioProps {
  limit?: number;
}

export const Portfolio: React.FC<PortfolioProps> = ({ limit }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_CATEGORIES) || '[]'));
  const [selectedTags, setSelectedTags] = useState<string[]>(() => JSON.parse(localStorage.getItem(STORAGE_KEY_TAGS) || '[]'));
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState<{ project: Project; autoPlay: boolean } | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(selectedCategories));
    localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(selectedTags));
  }, [selectedCategories, selectedTags]);

  useEffect(() => { setTimeout(() => setLoading(false), 500); }, []);

  const categories = useMemo(() => [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))], []);
  const allTags = useMemo(() => Array.from(new Set(PROJECTS.flatMap(p => p.technologies || []))).sort(), []);

  const filteredProjects = useMemo(() => {
    let projs = PROJECTS.filter(p => {
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchTags = selectedTags.length === 0 || (p.technologies && selectedTags.some(tag => p.technologies?.includes(tag)));
      return matchCat && matchTags;
    });
    return limit ? projs.slice(0, limit) : projs;
  }, [selectedCategories, selectedTags, limit]);

  const toggleCategory = (cat: string) => {
    if (cat === ALL_CATEGORY) setSelectedCategories([]);
    else setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const toggleTag = (tag: string) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col lg:flex-row gap-8">
           {!limit && (
             <aside className="w-full lg:w-72 space-y-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Verticals</h4>
                <nav className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2">
                  {categories.map(cat => {
                    const active = cat === ALL_CATEGORY ? selectedCategories.length === 0 : selectedCategories.includes(cat);
                    return (
                      <button key={cat} onClick={() => toggleCategory(cat)} aria-pressed={active} className={`px-4 py-2.5 rounded-xl text-sm font-semibold text-left whitespace-nowrap transition-all border ${active ? 'bg-slate-900 dark:bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 border-slate-200 dark:border-slate-800'}`}>
                        {cat}
                        {active && cat !== ALL_CATEGORY && <Check size={14} className="ml-2 inline" />}
                      </button>
                    );
                  })}
                </nav>
             </aside>
           )}
           <div className="flex-1">
              {!limit && (
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 mb-10 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2"><Tag size={18} className="text-blue-500"/><span className="font-bold text-lg">Tech Filters</span></div>
                    {(selectedTags.length > 0 || selectedCategories.length > 0) && <button onClick={() => { setSelectedCategories([]); setSelectedTags([]); }} className="text-xs text-blue-600 flex items-center gap-2 font-bold"><RotateCcw size={12}/> Reset</button>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => {
                      const active = selectedTags.includes(tag);
                      return <button key={tag} onClick={() => toggleTag(tag)} aria-pressed={active} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${active ? 'bg-blue-600 border-blue-600 text-white scale-110' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600'}`}>{tag}</button>
                    })}
                  </div>
                </div>
              )}
              <div key={limit ? 'home' : 'page'} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                {loading ? [1,2,3].map(i => <ProjectSkeleton key={i}/>) : filteredProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} highlightedTags={selectedTags} onClick={() => setModalState({ project: p, autoPlay: false })} onViewDemo={() => setModalState({ project: p, autoPlay: true })} />)}
              </div>
           </div>
        </div>
      </div>
      {modalState && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setModalState(null)}/>
          <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="relative aspect-video bg-black">
              {modalState.autoPlay && modalState.project.demoVideoUrl ? (
                <CustomVideoPlayer src={modalState.project.demoVideoUrl} captionsUrl={modalState.project.captionsUrl} poster={modalState.project.imageUrl} onClose={() => setModalState({ ...modalState, autoPlay: false })} />
              ) : (
                <div className="relative w-full h-full">
                  <img src={modalState.project.imageUrl} className="w-full h-full object-cover"/>
                  <button onClick={() => setModalState(null)} className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white"><X/></button>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-slate-900">
                    <h3 className="text-3xl font-bold">{modalState.project.title}</h3>
                  </div>
                </div>
              )}
            </div>
            <div className="p-8"><p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">{modalState.project.fullDescription || modalState.project.description}</p></div>
          </div>
        </div>
      )}
    </section>
  );
};