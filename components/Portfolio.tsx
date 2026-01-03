import React, { useEffect, useRef, useState, useMemo } from 'react';
import { X, Tag, MonitorPlay, RotateCcw, Check, Play, Pause, Volume2, VolumeX, Info, Subtitles } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Button } from './ui/Button';

// --- Types & Constants ---
const ALL_CATEGORY = 'All Categories';
const STORAGE_KEY_CATEGORIES = 'portfolio-filter-categories';
const STORAGE_KEY_TAGS = 'portfolio-filter-tags';

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// --- Skeleton Component ---
const ProjectSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse">
    <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800"></div>
    <div className="p-6 space-y-4">
      <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
    </div>
  </div>
);

// --- Custom Video Player Component ---
interface CustomVideoPlayerProps {
  src: string;
  captionsUrl?: string;
  poster?: string;
  onClose: () => void;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src, captionsUrl, poster, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const onEnded = () => setIsPlaying(false);
    const onLoadedData = () => setIsVideoLoaded(true);
    const onWaiting = () => setIsVideoLoaded(false);
    const onPlaying = () => {
      setIsVideoLoaded(true);
      setIsPlaying(true);
    };
    const onPause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', onEnded);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);

    video.play().catch(err => console.error("Autoplay failed:", err));

    if (containerRef.current) containerRef.current.focus();

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.textTracks && video.textTracks.length > 0) {
      const track = video.textTracks[0];
      track.mode = captionsEnabled ? 'showing' : 'hidden';
    }
  }, [captionsEnabled]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
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
      if (val > 0) setIsMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) videoRef.current.currentTime = time;
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) controlsTimeoutRef.current = window.setTimeout(() => setShowControls(false), 2500);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black group overflow-hidden flex flex-col justify-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onKeyDown={(e) => {
        if (e.key === ' ') { e.preventDefault(); togglePlay(); }
        if (e.key === 'm') { e.preventDefault(); toggleMute(); }
        if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      }}
      tabIndex={0}
      role="region"
      aria-label="Video Demonstration Player"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster} 
        className={`relative z-10 w-full h-full object-contain transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        onClick={togglePlay}
        playsInline
        crossOrigin="anonymous"
      >
        {captionsUrl && <track kind="captions" src={captionsUrl} srcLang="en" label="English" default={captionsEnabled} />}
      </video>

      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 px-4 pb-4 pt-20 transition-all duration-300 z-20 flex flex-col gap-4 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <input 
          type="range" 
          min="0" 
          max={duration || 0} 
          value={currentTime} 
          onChange={handleSeek} 
          className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500"
          aria-label="Seek video playback"
        />
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay} 
              className="p-2 hover:bg-white/20 rounded-full transition-all active:scale-90"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>
            
            <div className="flex items-center gap-2 group/volume">
              <button 
                onClick={toggleMute}
                className="p-1 hover:bg-white/10 rounded-full"
                aria-label={isMuted || volume === 0 ? "Unmute audio" : "Mute audio"}
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-20 transition-all duration-300 h-1 bg-white/30 rounded-lg accent-blue-500 cursor-pointer"
                aria-label="Adjust volume"
              />
              <span className="text-xs font-mono tabular-nums" aria-live="polite">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {captionsUrl && (
              <button 
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                className={`p-2 rounded-full transition-all ${captionsEnabled ? 'text-blue-400 bg-white/10' : 'text-white/60 hover:text-white'}`}
                aria-label={captionsEnabled ? "Disable captions" : "Enable captions"}
                aria-pressed={captionsEnabled}
              >
                <Subtitles size={20} />
              </button>
            )}
            <button 
              onClick={onClose} 
              className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold transition-all active:scale-95 border border-white/20"
              aria-label="Exit full screen video"
            >
              Exit Player
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Project Modal ---
interface ProjectModalProps {
  project: Project | null;
  autoPlay?: boolean;
  onClose: () => void;
  onProjectSelect: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, autoPlay = false, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(project);
  const [isClosing, setIsClosing] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      setActiveProject(project);
      setIsVisible(true);
      setIsClosing(false);
      setIsPlayingVideo(autoPlay && !!project.demoVideoUrl);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project, autoPlay]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
      setIsClosing(false);
      setIsPlayingVideo(false);
    }, 300);
  };

  if (!isVisible || !activeProject) return null;

  return (
    <>
      <div className={`fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`} onClick={handleClose} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div className={`relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto transform transition-all duration-300 ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div ref={contentRef} className="overflow-y-auto scroll-smooth">
            <div className="relative aspect-video bg-slate-900">
               {isPlayingVideo && activeProject.demoVideoUrl ? (
                 <CustomVideoPlayer src={activeProject.demoVideoUrl} captionsUrl={activeProject.captionsUrl} poster={activeProject.imageUrl} onClose={() => setIsPlayingVideo(false)} />
               ) : (
                 <div className="relative w-full h-full">
                    <img src={activeProject.imageUrl} alt={activeProject.title} className="w-full h-full object-cover" />
                    <button onClick={handleClose} className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors" aria-label="Close project details"><X /></button>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-slate-900">
                      <h3 className="text-3xl font-bold">{activeProject.title}</h3>
                    </div>
                 </div>
               )}
            </div>
            <div className="p-8">
              <h4 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <Info size={14} /> Full Project Context
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 text-lg font-medium">{activeProject.fullDescription || activeProject.description}</p>
              
              <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-6" />
              
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies?.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 transition-colors hover:border-blue-500">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Card Component ---
const ProjectCard = ({ project, onClick, onViewDemo, highlightedTags, index }: any) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div 
      className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 animate-in fade-in zoom-in-95 fill-mode-forwards"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer" onClick={onClick}>
        {!imageLoaded && <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>}
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-3 items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <button 
            className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:text-white outline-none focus:ring-2 focus:ring-blue-400" 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            Explore Case Study
          </button>
          {project.demoVideoUrl && (
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-blue-700 flex items-center gap-2 outline-none focus:ring-2 focus:ring-blue-400" 
              onClick={(e) => { e.stopPropagation(); onViewDemo(); }}
            >
              <MonitorPlay size={16} /> Watch Demo
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h4>
        
        {/* Project Insight Section */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl mb-6 border border-slate-100 dark:border-slate-700/50 min-h-[96px]">
           <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 font-medium leading-relaxed">
             {project.fullDescription || project.description}
           </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech: string) => (
            <span 
              key={tech} 
              className={`text-[10px] px-2.5 py-1 rounded-md border transition-all duration-300 font-bold tracking-tight ${
                highlightedTags.includes(tech) 
                  ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg ring-2 ring-blue-500/20' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400 hover:text-blue-500'
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

// --- Portfolio ---
export const Portfolio: React.FC = () => {
  // Persistence Loading from localStorage
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TAGS);
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(true);
  const [selectedProjectState, setSelectedProjectState] = useState<{ project: Project; autoPlay: boolean } | null>(null);

  // Persistence Saving - updates localStorage immediately on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(selectedCategories));
  }, [selectedCategories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TAGS, JSON.stringify(selectedTags));
  }, [selectedTags]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))], []);
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach(p => p.technologies?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredProjects = useMemo(() => PROJECTS.filter(p => {
    const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchTags = selectedTags.length === 0 || (p.technologies && selectedTags.some(tag => p.technologies?.includes(tag)));
    return matchCat && matchTags;
  }), [selectedCategories, selectedTags]);

  const toggleCategory = (cat: string) => {
    if (cat === ALL_CATEGORY) {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  // We use a unique key for the results grid to trigger CSS entrance animations on filter change
  const filterKey = `${selectedCategories.join('-')}:${selectedTags.join('-')}`;

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col lg:flex-row gap-8">
           <aside className="w-full lg:w-72 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Verticals</h4>
                <nav className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0" role="group" aria-label="Project category filter">
                  {categories.map(cat => {
                    const isActive = (cat === ALL_CATEGORY ? selectedCategories.length === 0 : selectedCategories.includes(cat));
                    return (
                      <button 
                        key={cat} 
                        onClick={() => toggleCategory(cat)} 
                        aria-pressed={isActive}
                        aria-label={`Filter projects by vertical ${cat}`}
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold text-left whitespace-nowrap transition-all duration-300 relative group flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 border ${
                          isActive
                            ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-lg border-transparent scale-[1.02]' 
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {cat}
                        {(cat !== ALL_CATEGORY && isActive) && <Check size={14} className="ml-2 animate-in zoom-in-50 duration-300" />}
                      </button>
                    );
                  })}
                </nav>
              </div>
           </aside>
           
           <div className="flex-1">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 mb-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Tag size={120} />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <Tag size={18} />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-lg">Tech Stack Filter</span>
                  </div>
                  {(selectedTags.length > 0 || selectedCategories.length > 0) && (
                    <button 
                      onClick={clearFilters} 
                      className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-2 transition-all group bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800/50"
                      aria-label="Clear all active filters"
                    >
                      <RotateCcw size={12} className="group-hover:rotate-[-120deg] transition-transform duration-500" /> Reset Selection
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Technology tag filters">
                  {allTags.map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => toggleTag(tag)} 
                      aria-pressed={selectedTags.includes(tag)}
                      aria-label={`Technology filter: ${tag}`}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        selectedTags.includes(tag) 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-105' 
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div key={filterKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
                ) : filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      index={index}
                      highlightedTags={selectedTags} 
                      onClick={() => setSelectedProjectState({ project, autoPlay: false })} 
                      onViewDemo={() => setSelectedProjectState({ project, autoPlay: true })} 
                    />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-500 shadow-inner">
                    <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-600 mb-8 border border-slate-100 dark:border-slate-700">
                      <RotateCcw size={48} className="animate-pulse" />
                    </div>
                    <h5 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">No Matching Projects</h5>
                    <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm text-center leading-relaxed">Your current filter selection didn't return any results. Try broadening your criteria or reset the filters to see all our work.</p>
                    <Button 
                      variant="primary" 
                      size="lg" 
                      onClick={clearFilters} 
                      className="rounded-full px-12 shadow-xl shadow-blue-500/20"
                      aria-label="Reset filters to see all projects"
                    >
                      Show All Projects
                    </Button>
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>
      <ProjectModal 
        project={selectedProjectState?.project || null} 
        autoPlay={selectedProjectState?.autoPlay} 
        onClose={() => setSelectedProjectState(null)} 
        onProjectSelect={(p) => setSelectedProjectState({ project: p, autoPlay: false })} 
      />
    </section>
  );
};
