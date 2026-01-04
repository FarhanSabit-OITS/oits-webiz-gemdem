import React, { useEffect, useRef, useState, useMemo } from 'react';
import { X, Tag, MonitorPlay, RotateCcw, Check, Play, Pause, Volume2, VolumeX, Info, Subtitles, Linkedin, Twitter, Share2 } from 'lucide-react';
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
        if (e.key === 'Escape') onClose();
      }}
      tabIndex={0}
      role="region"
      aria-label="Video Player"
    >
      <video ref={videoRef} src={src} poster={poster} className="w-full h-full object-contain" onClick={togglePlay} playsInline crossOrigin="anonymous">
        {captionsUrl && <track kind="captions" src={captionsUrl} srcLang="en" label="English" default={captionsEnabled} />}
      </video>

      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 px-6 pb-6 pt-12 transition-opacity duration-300 z-10 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <input 
          type="range" 
          min="0" 
          max={duration || 0} 
          value={currentTime} 
          onChange={handleSeek} 
          className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-6" 
          aria-label="Seek Video" 
        />
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-90" aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>
            <div className="flex items-center gap-3 group/vol">
              <button onClick={toggleMute} className="p-1 hover:bg-white/10 rounded" aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange} 
                className="w-24 h-1 bg-white/30 rounded appearance-none accent-blue-500 cursor-pointer" 
                aria-label="Volume Slider" 
              />
            </div>
            <span className="text-sm font-mono tracking-tight">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <div className="flex items-center gap-4">
            {captionsUrl && (
              <button 
                onClick={() => setCaptionsEnabled(!captionsEnabled)} 
                className={`p-2 rounded-lg transition-all ${captionsEnabled ? 'text-blue-400 bg-white/10' : 'text-white/50 hover:text-white'}`} 
                aria-label="Toggle Captions" 
                aria-pressed={captionsEnabled}
              >
                <Subtitles size={20} />
              </button>
            )}
            <button 
              onClick={onClose} 
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              aria-label="Exit Player"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onClick, onViewDemo, highlightedTags, index }: any) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer" onClick={onClick}>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          loading="lazy"
          onLoad={() => setImageLoaded(true)} 
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
        {/* Hover-only buttons */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-4 items-center justify-center bg-slate-900/60 backdrop-blur-sm z-10">
          <button 
            className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-blue-600 hover:text-white active:scale-95" 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            Explore Case Study
          </button>
          {project.demoVideoUrl && (
            <button 
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-blue-700 hover:scale-105 hover:shadow-blue-500/50 flex items-center gap-2 active:scale-95" 
              onClick={(e) => { e.stopPropagation(); onViewDemo(); }}
            >
              <MonitorPlay size={18} /> View Demo
            </button>
          )}
        </div>
      </div>
      <div className="p-8">
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors leading-tight">{project.title}</h4>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl mb-6 border border-slate-100 dark:border-slate-700/50 min-h-[100px] flex items-center">
           <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium italic">
             {project.fullDescription || project.description}
           </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech: string) => (
            <span 
              key={tech} 
              className={`text-[11px] px-3 py-1 rounded-lg border transition-all duration-300 font-bold tracking-tight shadow-sm ${
                highlightedTags.includes(tech) 
                  ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-blue-500/20 ring-2 ring-blue-500/10' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              {tech}
            </span>
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

  const shareProject = (platform: 'linkedin' | 'twitter') => {
    if (!modalState) return;
    const url = window.location.href;
    const text = `Check out this amazing project by OITS Dhaka: ${modalState.project.title}`;
    const links = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    };
    window.open(links[platform], '_blank');
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col lg:flex-row gap-12">
           {!limit && (
             <aside className="w-full lg:w-80 space-y-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Verticals</h4>
                <nav className="flex lg:flex-col gap-3 overflow-x-auto no-scrollbar pb-2" role="group" aria-label="Vertical Filter">
                  {categories.map(cat => {
                    const active = cat === ALL_CATEGORY ? selectedCategories.length === 0 : selectedCategories.includes(cat);
                    return (
                      <button 
                        key={cat} 
                        onClick={() => toggleCategory(cat)} 
                        aria-pressed={active} 
                        className={`px-5 py-3 rounded-2xl text-sm font-bold text-left whitespace-nowrap transition-all border outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 active:scale-[0.97] ${active ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xl border-transparent translate-x-1' : 'bg-white dark:bg-slate-900 text-slate-600 border-slate-200 dark:border-slate-800 hover:border-blue-300'}`}
                      >
                        {cat}
                        {active && cat !== ALL_CATEGORY && <Check size={16} className="ml-auto inline-block align-middle" />}
                      </button>
                    );
                  })}
                </nav>
             </aside>
           )}
           <div className="flex-1">
              {!limit && (
                <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-200 dark:border-slate-800 mb-12 shadow-sm relative overflow-hidden group/filter">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                        <Tag size={20}/>
                      </div>
                      <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">Technology Filters</span>
                    </div>
                    {(selectedTags.length > 0 || selectedCategories.length > 0) && (
                      <button 
                        onClick={() => { setSelectedCategories([]); setSelectedTags([]); }} 
                        className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2 font-black uppercase tracking-widest hover:underline px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full"
                      >
                        <RotateCcw size={14}/> Reset Filters
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3" role="group" aria-label="Tech Stack Filter">
                    {allTags.map(tag => {
                      const active = selectedTags.includes(tag);
                      return (
                        <button 
                          key={tag} 
                          onClick={() => toggleTag(tag)} 
                          aria-pressed={active} 
                          className={`px-5 py-2 rounded-full text-xs font-black border transition-all active:scale-90 outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 ${active ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'}`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div key={limit ? 'home' : 'page'} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 min-h-[500px]">
                {loading ? [1,2,3].map(i => <ProjectSkeleton key={i}/>) : filteredProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} highlightedTags={selectedTags} onClick={() => setModalState({ project: p, autoPlay: false })} onViewDemo={() => setModalState({ project: p, autoPlay: true })} />)}
              </div>
           </div>
        </div>
      </div>
      {modalState && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setModalState(null)}/>
          <div className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col pointer-events-auto">
            <div className="relative aspect-video bg-black flex-shrink-0">
              {modalState.autoPlay && modalState.project.demoVideoUrl ? (
                <CustomVideoPlayer 
                  src={modalState.project.demoVideoUrl} 
                  captionsUrl={modalState.project.captionsUrl} 
                  poster={modalState.project.imageUrl} 
                  onClose={() => setModalState({ ...modalState, autoPlay: false })} 
                />
              ) : (
                <div className="relative w-full h-full group/modal-img">
                  <img src={modalState.project.imageUrl} alt={modalState.project.title} className="w-full h-full object-cover"/>
                  <button 
                    onClick={() => setModalState(null)} 
                    className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all active:scale-90 z-20"
                    aria-label="Close Case Study"
                  >
                    <X size={24}/>
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 md:p-16">
                    <h3 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">{modalState.project.title}</h3>
                    <div className="flex gap-4">
                      {modalState.project.demoVideoUrl && (
                        <Button 
                          onClick={() => setModalState({ ...modalState, autoPlay: true })} 
                          variant="primary" 
                          className="rounded-full shadow-2xl shadow-blue-500/40"
                        >
                          <Play size={18} className="mr-2" /> Play Showreel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-10 md:p-16 overflow-y-auto">
              <div className="max-w-4xl">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <h4 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Info size={16} /> Detailed Case Study
                    </h4>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Share Project:</span>
                      <button onClick={() => shareProject('linkedin')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                        <Linkedin size={18} />
                      </button>
                      <button onClick={() => shareProject('twitter')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-blue-400 hover:text-white transition-all">
                        <Twitter size={18} />
                      </button>
                    </div>
                 </div>

                 <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed mb-10 font-medium">
                   {modalState.project.fullDescription || modalState.project.description}
                 </p>
                 <div className="flex flex-wrap gap-3">
                    {modalState.project.technologies?.map(tech => (
                      <span key={tech} className="px-5 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700">
                        {tech}
                      </span>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};