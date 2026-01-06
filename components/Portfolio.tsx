import React, { useEffect, useRef, useState, useMemo } from 'react';
import { X, Tag, MonitorPlay, RotateCcw, Check, Play, Pause, Volume2, VolumeX, Info, Subtitles, Linkedin, Twitter, Share2, ImageIcon, Maximize, Minimize, AlertTriangle, Layers, FilterX } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Button } from './ui/Button';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';

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
  <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
    <div className="aspect-[4/3] shimmer"></div>
    <div className="p-8 space-y-4">
      <div className="h-6 w-3/4 shimmer rounded-lg"></div>
      <div className="h-20 w-full shimmer rounded-2xl"></div>
      <div className="flex gap-2">
        <div className="h-6 w-16 shimmer rounded-lg"></div>
        <div className="h-6 w-16 shimmer rounded-lg"></div>
      </div>
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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const updateProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setVideoError("The video could not be loaded. Please check your connection or try again later.");
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('progress', updateProgress);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    video.play().catch(() => setIsPlaying(false));

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('progress', updateProgress);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black flex flex-col justify-center group overflow-hidden outline-none"
      onMouseMove={() => {
        setShowControls(true);
        window.clearTimeout((window as any)._controlsTimeout);
        (window as any)._controlsTimeout = window.setTimeout(() => setShowControls(false), 3000);
      }}
    >
      {videoError ? (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950 p-6 text-center">
          <AlertTriangle size={48} className="text-yellow-500 mb-4 animate-pulse" />
          <h3 className="text-xl font-black text-white mb-2">Oops! Something went wrong</h3>
          <p className="text-slate-400 max-w-xs mb-6 text-sm">{videoError}</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Retry Loading</Button>
        </div>
      ) : (
        <video 
          ref={videoRef} 
          src={src} 
          poster={poster} 
          className="w-full h-full object-contain cursor-pointer" 
          onClick={togglePlay} 
          playsInline 
          crossOrigin="anonymous"
          aria-hidden="true"
        >
          {captionsUrl && <track kind="captions" src={captionsUrl} srcLang="en" label="English" default={true} />}
        </video>
      )}

      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-6 pb-6 pt-16 transition-all duration-500 z-10 ${showControls || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-90 hover:scale-110">
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="translate-x-0.5" />}
            </button>
            <span className="text-sm font-mono tracking-tight text-slate-300">
              {formatTime(currentTime)} <span className="text-white/40">/</span> {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleFullscreen} className="p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-90">
              {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
            </button>
            <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest px-5 py-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/20 active:scale-95">
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
          src={project.imageUrl || FALLBACK_IMAGE} 
          alt={project.title} 
          loading="lazy"
          onLoad={() => setImageLoaded(true)} 
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-4 items-center justify-center bg-slate-900/60 backdrop-blur-sm z-10">
          <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-blue-600 hover:text-white active:scale-95" onClick={(e) => { e.stopPropagation(); onClick(); }}>
            Case Study
          </button>
          {project.demoVideoUrl && (
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-blue-700 hover:scale-105 flex items-center gap-2 active:scale-95" onClick={(e) => { e.stopPropagation(); onViewDemo(); }}>
              <MonitorPlay size={18} /> Demo
            </button>
          )}
        </div>
      </div>
      <div className="p-8">
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors leading-tight">{project.title}</h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech: string) => (
            <span 
              key={tech} 
              className={`text-[11px] px-3 py-1 rounded-lg border transition-all duration-300 font-bold tracking-tight ${
                highlightedTags.includes(tech) 
                  ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg shadow-blue-500/20' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TAGS);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState<{ project: Project; autoPlay: boolean } | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(selectedCategories));
    localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(selectedTags));
  }, [selectedCategories, selectedTags]);

  useEffect(() => { 
    const timer = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))], []);
  const allTags = useMemo(() => Array.from(new Set(PROJECTS.flatMap(p => p.technologies || []))).sort(), []);

  const dynamicCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PROJECTS.forEach(p => {
      const matchTags = selectedTags.length === 0 || (p.technologies && selectedTags.some(tag => p.technologies?.includes(tag)));
      if (matchTags) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [selectedTags]);

  const dynamicTagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PROJECTS.forEach(p => {
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      if (matchCat) {
        p.technologies?.forEach(t => {
          counts[t] = (counts[t] || 0) + 1;
        });
      }
    });
    return counts;
  }, [selectedCategories]);

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

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  const shareProject = (platform: 'linkedin' | 'twitter') => {
    if (!modalState) return;
    const url = window.location.href;
    const text = `Check out this project by OITS Dhaka: ${modalState.project.title}`;
    const links = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    };
    window.open(links[platform], '_blank');
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {!limit && (
          <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-[0.3em] border-b border-slate-200 dark:border-slate-800 pb-6 mb-12">
             <Layers size={14} className="text-blue-600" />
             <span>Active Filters</span>
             <span className="ml-auto text-[10px] text-slate-400">Total: {filteredProjects.length}</span>
          </div>
        )}

        <div className="mb-16 flex flex-col lg:flex-row gap-12">
           {!limit && (
             <aside className="w-full lg:w-80 space-y-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Verticals</h4>
                <nav className="flex lg:flex-col gap-3 overflow-x-auto no-scrollbar pb-2" role="group" aria-label="Vertical Filter Navigation">
                  {categories.map(cat => {
                    const active = cat === ALL_CATEGORY ? selectedCategories.length === 0 : selectedCategories.includes(cat);
                    const count = cat === ALL_CATEGORY ? PROJECTS.length : (dynamicCategoryCounts[cat] || 0);
                    return (
                      <button 
                        key={cat} 
                        onClick={() => toggleCategory(cat)} 
                        aria-pressed={active} 
                        className={`flex items-center justify-between px-5 py-3 rounded-2xl text-sm font-bold text-left transition-all border outline-none active:scale-[0.97] hover:scale-105 ${active ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xl border-transparent' : 'bg-white dark:bg-slate-900 text-slate-600 border-slate-200 dark:border-slate-800 hover:border-blue-300'}`}
                      >
                        <span className="flex items-center gap-2">
                           {cat}
                           {active && cat !== ALL_CATEGORY && <Check size={14} />}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-black ${active ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                           {count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
             </aside>
           )}
           <div className="flex-1">
              {!limit && (
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 mb-12 shadow-sm relative overflow-hidden group/filter">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                        <Tag size={20}/>
                      </div>
                      <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">Technologies</span>
                    </div>
                    {(selectedTags.length > 0 || selectedCategories.length > 0) && (
                      <button onClick={handleResetFilters} className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2 font-black uppercase tracking-widest hover:underline px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full transition-all">
                        <RotateCcw size={14}/> Reset
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3" role="group" aria-label="Technology Filter Chips">
                    {allTags.map(tag => {
                      const active = selectedTags.includes(tag);
                      const count = dynamicTagCounts[tag] || 0;
                      return (
                        <button 
                          key={tag} 
                          onClick={() => toggleTag(tag)} 
                          aria-pressed={active} 
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border transition-all active:scale-90 outline-none hover:scale-105 ${active ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'}`}
                        >
                          {tag}
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                             {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div 
                key={selectedCategories.join('-') + selectedTags.join('-')}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 min-h-[500px] animate-in fade-in zoom-in-95 duration-700"
              >
                {loading ? [1,2,3].map(i => <ProjectSkeleton key={i}/>) : filteredProjects.map((p, i) => (
                  <ProjectCard 
                    key={p.id} 
                    project={p} 
                    index={i} 
                    highlightedTags={selectedTags} 
                    onClick={() => setModalState({ project: p, autoPlay: false })} 
                    onViewDemo={() => setModalState({ project: p, autoPlay: true })} 
                  />
                ))}
                {!loading && filteredProjects.length === 0 && (
                   <div className="col-span-full py-40 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-500">
                      <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <FilterX className="text-slate-300 dark:text-slate-600" size={40} />
                      </div>
                      <h5 className="text-2xl font-black text-slate-900 dark:text-white mb-4">No projects found matching your criteria</h5>
                      <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                        Try adjusting your filters or search terms to find what you're looking for.
                      </p>
                      <button 
                        onClick={handleResetFilters} 
                        className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
                      >
                        <RotateCcw size={16}/> Reset Filters
                      </button>
                   </div>
                )}
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
                  poster={modalState.project.imageUrl} 
                  onClose={() => setModalState({ ...modalState, autoPlay: false })} 
                />
              ) : (
                <div className="relative w-full h-full group/modal-img">
                  <img src={modalState.project.imageUrl || FALLBACK_IMAGE} alt={modalState.project.title} className="w-full h-full object-cover"/>
                  <button onClick={() => setModalState(null)} className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all active:scale-90 z-20">
                    <X size={24}/>
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 md:p-16">
                    <h3 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">{modalState.project.title}</h3>
                    <div className="flex gap-4">
                      {modalState.project.demoVideoUrl && (
                        <Button onClick={() => setModalState({ ...modalState, autoPlay: true })} variant="primary" className="rounded-full shadow-2xl shadow-blue-500/40">
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
                 <div className="flex items-center justify-between mb-10">
                    <h4 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em]">Case Study Overview</h4>
                    <div className="flex items-center gap-4">
                      <button onClick={() => shareProject('linkedin')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <Linkedin size={18} />
                      </button>
                      <button onClick={() => shareProject('twitter')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-blue-400 hover:text-white transition-all shadow-sm">
                        <Twitter size={18} />
                      </button>
                    </div>
                 </div>
                 <p className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed mb-10 font-medium">
                   {modalState.project.fullDescription || modalState.project.description}
                 </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};