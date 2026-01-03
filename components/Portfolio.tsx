
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ArrowDown, X, ExternalLink, Calendar, Code2, ArrowUpRight, Play, Film, Tag, Volume2, VolumeX, Pause, Subtitles, MonitorPlay, Search as SearchIcon, RotateCcw } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionId, Project } from '../types';
import { Button } from './ui/Button';

// --- Types & Constants ---
const ALL_CATEGORY = 'All Categories';

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

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
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
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

    if (containerRef.current) {
      containerRef.current.focus();
    }

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
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => setShowControls(false), 2500);
    }
  };

  const handleInteraction = () => {
    resetControlsTimeout();
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  const handleFocus = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
  };

  const handleBlur = () => {
      if(isPlaying) resetControlsTimeout();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleInteraction();
    
    switch(e.key) {
      case ' ':
      case 'Enter':
      case 'k':
      case 'K':
        e.preventDefault();
        togglePlay();
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        toggleMute();
        break;
      case 'c':
      case 'C':
        if(captionsUrl) {
           e.preventDefault();
           setCaptionsEnabled(prev => !prev);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(prev => Math.min(1, prev + 0.1));
        if (videoRef.current) {
           videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
           setIsMuted(false);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(prev => Math.max(0, prev - 0.1));
        if (videoRef.current) {
           videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
        }
        break;
    }
  };

  const stopPropagation = (e: React.KeyboardEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black group overflow-hidden flex flex-col justify-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
      onMouseMove={handleInteraction}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="region"
      aria-label="Video Player"
    >
      <div 
        className={`absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          backgroundImage: poster ? `url(${poster})` : 'none',
          filter: 'blur(20px) brightness(0.4)',
          transform: 'scale(1.1)' 
        }}
        aria-hidden="true"
      />

      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
           <div className="w-16 h-16 border-4 border-white/20 border-t-white/90 rounded-full animate-spin"></div>
        </div>
      )}

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

      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-4 pt-20 transition-all duration-300 ease-in-out z-20 flex flex-col gap-4 ${showControls || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          onKeyDown={stopPropagation}
          aria-label="Seek video"
          className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:h-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={togglePlay} 
              className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            <div className="flex items-center gap-3 group/vol">
              <button 
                onClick={toggleMute} 
                className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                onKeyDown={stopPropagation}
                aria-label="Volume"
                className="w-20 sm:w-24 h-1.5 bg-white/30 rounded-lg accent-white cursor-pointer focus:outline-none"
              />
            </div>

            <span className="text-xs sm:text-sm font-mono font-medium opacity-80 select-none hidden sm:block">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {captionsUrl && (
              <button
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                className={`p-2 rounded-full transition-colors focus:outline-none ${captionsEnabled ? 'text-blue-400 bg-white/20' : 'text-white/70 hover:bg-white/20 hover:text-white'}`}
                aria-label={captionsEnabled ? "Disable Captions" : "Enable Captions"}
              >
                <Subtitles size={24} />
              </button>
            )}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-95 focus:outline-none"
              aria-label="Exit full screen video"
            >
              <ArrowDown size={16} className="rotate-90" /> <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </div>

      {!isPlaying && isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
          <div className="w-20 h-20 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/90 border border-white/20 shadow-xl">
            <Play size={40} fill="currentColor" className="ml-2" />
          </div>
        </div>
      )}
    </div>
  );
};

// --- Modal Component ---
interface ProjectModalProps {
  project: Project | null;
  autoPlay?: boolean;
  onClose: () => void;
  onProjectSelect: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, autoPlay = false, onClose, onProjectSelect }) => {
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
      if (contentRef.current) contentRef.current.scrollTop = 0;
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!isVisible || !activeProject) return null;

  const relatedProjects = PROJECTS.filter(
    p => p.category === activeProject.category && p.id !== activeProject.id
  ).slice(0, 3);

  const backdropClass = `fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] transition-opacity duration-300 ease-in-out ${isClosing ? 'opacity-0' : 'opacity-100'}`;
  const modalContainerClass = `fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none`;
  const modalContentClass = `relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto transform transition-all duration-300 ease-in-out ${
    isClosing ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
  }`;

  return (
    <>
      <div className={backdropClass} onClick={handleClose} aria-hidden="true" />
      <div className={modalContainerClass} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={modalContentClass}>
          <div ref={contentRef} className="overflow-y-auto custom-scrollbar scroll-smooth">
            <div key={activeProject.id} className="animate-fade-in">
              <div className={`relative w-full shrink-0 bg-slate-900 ${isPlayingVideo ? 'aspect-video' : 'h-64 md:h-96'}`}>
                 {isPlayingVideo && activeProject.demoVideoUrl ? (
                   <CustomVideoPlayer 
                      src={activeProject.demoVideoUrl}
                      captionsUrl={activeProject.captionsUrl}
                      poster={activeProject.imageUrl}
                      onClose={() => setIsPlayingVideo(false)}
                   />
                 ) : (
                   <div className="relative w-full h-full group">
                    <img 
                      src={activeProject.imageUrl} 
                      alt={activeProject.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" aria-hidden="true" />
                    
                    <button 
                      onClick={handleClose}
                      className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all z-30 active:scale-95"
                      aria-label="Close modal"
                    >
                      <X size={24} />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20 pointer-events-none">
                      <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm border border-blue-500/50">
                        {activeProject.category}
                      </span>
                      <h3 id="modal-title" className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">{activeProject.title}</h3>
                    </div>

                    {activeProject.demoVideoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                         <button 
                           onClick={() => setIsPlayingVideo(true)}
                           className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 rounded-full text-white font-bold transition-all hover:scale-105 active:scale-95 group/play shadow-xl"
                           aria-label="Watch demo video"
                         >
                           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 group-hover/play:scale-110 transition-transform">
                             <Play size={16} fill="currentColor" />
                           </div>
                           Watch Demo
                         </button>
                      </div>
                    )}
                   </div>
                 )}
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Project Overview</h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                        {activeProject.fullDescription || activeProject.description}
                      </p>
                    </div>
                    {activeProject.technologies && (
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <Code2 size={20} className="text-blue-500" aria-hidden="true" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 hover:border-blue-300 transition-colors cursor-default">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 sticky top-6">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">At a Glance</h4>
                        <ul className="space-y-4 text-sm">
                          <li className="flex flex-col pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                            <span className="text-slate-500 dark:text-slate-400 mb-1">Client</span>
                            <span className="font-semibold text-slate-900 dark:text-white">Confidential Partner</span>
                          </li>
                          <li className="flex flex-col pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                            <span className="text-slate-500 dark:text-slate-400 mb-1">Timeline</span>
                            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                               <Calendar size={14} className="text-blue-500" aria-hidden="true"/> 3 Months
                            </span>
                          </li>
                          <li className="flex flex-col pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                            <span className="text-slate-500 dark:text-slate-400 mb-1">Services</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{activeProject.category}</span>
                          </li>
                        </ul>
                        <Button className="w-full mt-8 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 group" variant="primary" onClick={() => window.open(activeProject.link || '#', '_blank')} aria-label="Visit the live project website">
                          Visit Live Site <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                     </div>
                  </div>
                </div>

                {relatedProjects.length > 0 && (
                  <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Projects</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {relatedProjects.map((relProject) => (
                        <div 
                          key={relProject.id} 
                          className="group cursor-pointer"
                          onClick={() => onProjectSelect(relProject)}
                        >
                          <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-slate-100 dark:border-slate-700">
                            <img 
                              src={relProject.imageUrl} 
                              alt={relProject.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 backdrop-blur-[1px]" aria-hidden="true">
                              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-1">
                                View Project <ArrowUpRight size={14} />
                              </div>
                            </div>
                          </div>
                          <h5 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{relProject.title}</h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{relProject.category}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Project Card Component ---
interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  onViewDemo: () => void;
  highlightedTags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick, onViewDemo, highlightedTags }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.disconnect(); };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl dark:hover:shadow-blue-900/10 transition-all duration-500 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer" onClick={onClick}>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {project.demoVideoUrl && (
          <div className="absolute top-3 right-3 z-10 bg-slate-900/60 backdrop-blur-md p-1.5 rounded-full text-white/90 border border-white/10 shadow-lg" aria-hidden="true">
             <Film size={14} />
          </div>
        )}
        
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 bg-slate-900/50 backdrop-blur-[2px]`} aria-hidden="true">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 flex flex-col gap-3 items-center">
            <button 
              className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-blue-600 hover:text-white flex items-center gap-2 transition-all active:scale-95"
              onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
              Case Study <ArrowUpRight size={16} />
            </button>
            {project.demoVideoUrl && (
              <button 
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-blue-700 flex items-center gap-2 transition-all active:scale-95"
                onClick={(e) => { e.stopPropagation(); onViewDemo(); }}
              >
                Watch Demo <MonitorPlay size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
           <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-[10px] font-bold uppercase tracking-wider">{project.category}</span>
        </div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={onClick}>{project.title}</h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4">{project.description}</p>
        
        {project.technologies && (
            <div className="flex flex-wrap gap-1.5">
                {project.technologies.map(tech => {
                    const isHighlighted = highlightedTags.includes(tech);
                    return (
                        <span key={tech} className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                          isHighlighted 
                            ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-bold scale-105' 
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                        }`}>
                            {tech}
                        </span>
                    );
                })}
            </div>
        )}
      </div>
    </div>
  );
};

// --- Main Portfolio Component ---
export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState('');
  const [selectedProjectState, setSelectedProjectState] = useState<{ project: Project; autoPlay: boolean } | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isVisible, setIsVisible] = useState(false);
  const [isFilterAnimating, setIsFilterAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.disconnect(); };
  }, []);

  // Filter Logic
  const categories = useMemo(() => [ALL_CATEGORY, ...Array.from(new Set(PROJECTS.map(p => p.category)))], []);
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach(p => p.technologies?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredTags = useMemo(() => {
    if (!tagSearch) return allTags;
    return allTags.filter(tag => tag.toLowerCase().includes(tagSearch.toLowerCase()));
  }, [allTags, tagSearch]);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchCat = activeCategory === ALL_CATEGORY || p.category === activeCategory;
      const matchTags = selectedTags.length === 0 || (p.technologies && selectedTags.some(tag => p.technologies?.includes(tag)));
      return matchCat && matchTags;
    });
  }, [activeCategory, selectedTags]);

  const displayedProjects = useMemo(() => filteredProjects.slice(0, visibleCount), [filteredProjects, visibleCount]);

  const handleCategoryChange = (cat: string) => {
    if (activeCategory === cat) return;
    setIsFilterAnimating(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setVisibleCount(6);
      requestAnimationFrame(() => setIsFilterAnimating(false));
    }, 300);
  };

  const toggleTag = (tag: string) => {
    setIsFilterAnimating(true);
    setTimeout(() => {
      setSelectedTags(prev => 
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      );
      setVisibleCount(6);
      requestAnimationFrame(() => setIsFilterAnimating(false));
    }, 200);
  };

  const resetFilters = () => {
    setIsFilterAnimating(true);
    setTimeout(() => {
      setActiveCategory(ALL_CATEGORY);
      setSelectedTags([]);
      setTagSearch('');
      setVisibleCount(6);
      requestAnimationFrame(() => setIsFilterAnimating(false));
    }, 300);
  };

  const isAnyFilterActive = activeCategory !== ALL_CATEGORY || selectedTags.length > 0;

  return (
    <section ref={sectionRef} id={SectionId.PORTFOLIO} className="py-24 pt-32 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Our Work</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            Showcasing our success stories.
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A curated selection of software solutions we've built for industry leaders and visionary startups.
          </p>
        </div>

        {/* Filters Grid */}
        <div className={`mb-12 transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Category Sidebar */}
            <div className="w-full lg:w-64 shrink-0 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                  Categories
                  {activeCategory !== ALL_CATEGORY && (
                    <button onClick={() => handleCategoryChange(ALL_CATEGORY)} className="text-blue-500 hover:underline lowercase normal-case">reset</button>
                  )}
                </h4>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left flex items-center justify-between ${
                        activeCategory === cat
                          ? 'bg-slate-900 text-white shadow-lg shadow-black/10'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ml-2 ${activeCategory === cat ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                        {PROJECTS.filter(p => cat === ALL_CATEGORY || p.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tag Search & Pills */}
            <div className="flex-1 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                      <Tag size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Filter by Technology</h4>
                      <p className="text-xs text-slate-500">Select tags to narrow down results</p>
                    </div>
                  </div>

                  <div className="relative w-full md:w-64">
                    <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search tech stack..."
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-blue-500/50 dark:text-white"
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                    />
                    {tagSearch && (
                      <button onClick={() => setTagSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"><X size={12}/></button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto no-scrollbar pr-2">
                  {filteredTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`group px-3 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400'
                      }`}
                    >
                      {tag}
                      {selectedTags.includes(tag) && <X size={10} className="text-blue-200 group-hover:text-white transition-colors" />}
                    </button>
                  ))}
                  {filteredTags.length === 0 && (
                    <div className="text-slate-400 text-xs italic py-2">No technology found matching "{tagSearch}"</div>
                  )}
                </div>
                
                {isAnyFilterActive && (
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      Showing <span className="font-bold text-slate-900 dark:text-white">{filteredProjects.length}</span> projects
                    </div>
                    <button 
                      onClick={resetFilters}
                      className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw size={12} /> Reset all filters
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Project Grid */}
        <div className={`transition-all duration-500 ease-in-out ${isFilterAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {displayedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                index={index}
                project={project} 
                onClick={() => setSelectedProjectState({ project, autoPlay: false })} 
                onViewDemo={() => setSelectedProjectState({ project, autoPlay: true })}
                highlightedTags={selectedTags}
              />
            ))}
            {displayedProjects.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-24 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                 <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <SearchIcon size={32} className="text-slate-300" />
                 </div>
                 <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No projects found.</h4>
                 <p className="max-w-xs text-center text-sm mb-6">We couldn't find any projects matching your selected criteria. Try adjusting your filters.</p>
                 <Button onClick={resetFilters} variant="outline" size="sm">Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
        
        {visibleCount < filteredProjects.length && (
          <div className="mt-20 text-center">
            <Button variant="outline" onClick={() => setVisibleCount(p => p + 3)} className="group px-12 rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900">
              Load More Projects <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        )}
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
