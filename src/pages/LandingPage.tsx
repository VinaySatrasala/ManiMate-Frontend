import React from 'react';
import { ArrowRight, Code, Sparkles, Zap, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="floating-blob blob-1"></div>
      <div className="floating-blob blob-2"></div>
      <div className="floating-blob blob-3"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-24">
            {/* Logo with glassmorphism */}
            <div className="w-24 h-24 rounded-3xl glass mx-auto mb-8 flex items-center justify-center neo-shadow smooth-hover pulse-glow">
              <span className="text-white font-bold text-4xl">M</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-7xl font-bold mb-8 text-white leading-tight">
              Mani<span className="gradient-text">Mate</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Your AI companion for creating stunning mathematical animations with Manim. 
              Transform complex concepts into beautiful visualizations.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/chat"
                className="group inline-flex items-center gap-3 glass px-10 py-4 rounded-2xl font-medium text-white hover:bg-white/20 transition-all duration-300 text-lg neo-shadow smooth-hover"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Start Creating 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/signup"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-10 py-4 rounded-2xl font-medium text-white hover:bg-white/20 transition-all duration-300 text-lg border border-white/20 smooth-hover"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="glass-dark p-8 rounded-3xl neo-shadow smooth-hover card-float" style={{ animationDelay: '0s' }}>
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8 mx-auto">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Smart Code Generation</h3>
              <p className="text-white/70 text-center leading-relaxed">
                Describe your animation in plain English and let ManiMate generate the perfect Manim code for you.
              </p>
            </div>

            <div className="glass-dark p-8 rounded-3xl neo-shadow smooth-hover card-float" style={{ animationDelay: '2s' }}>
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8 mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Beautiful Animations</h3>
              <p className="text-white/70 text-center leading-relaxed">
                Create professional-grade mathematical animations with smooth transitions and elegant effects.
              </p>
            </div>

            <div className="glass-dark p-8 rounded-3xl neo-shadow smooth-hover card-float" style={{ animationDelay: '4s' }}>
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8 mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Instant Results</h3>
              <p className="text-white/70 text-center leading-relaxed">
                Get your animation code instantly and iterate quickly with real-time suggestions and improvements.
              </p>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-24 text-center">
            <div className="glass-dark rounded-3xl p-12 max-w-4xl mx-auto neo-shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">10K+</div>
                  <div className="text-white/70">Animations Created</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">500+</div>
                  <div className="text-white/70">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">99%</div>
                  <div className="text-white/70">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;