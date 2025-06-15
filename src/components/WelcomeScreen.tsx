import React from 'react';
import FeatureCard from './FeatureCard';
import { Code, Wand2, Sparkles, Play } from 'lucide-react';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-5xl mx-auto -mt-16">
      {/* Logo */}
      <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center mb-8 neo-shadow pulse-glow">
        <span className="text-white font-bold text-3xl">M</span>
      </div>
      
      {/* Main heading */}
      <h1 className="text-5xl font-bold mb-6 text-center text-white leading-tight">
        Welcome to <span className="gradient-text">ManiMate</span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-white/70 text-xl text-center mb-16 max-w-2xl leading-relaxed">
        Your AI-powered assistant for creating beautiful mathematical animations with Manim. 
        Start a conversation to generate Python scripts for your visualizations.
      </p>
      
      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
        <FeatureCard 
          title="Smart Templates" 
          description="Access a library of pre-built animation templates for common mathematical concepts" 
          icon={<Code className="w-7 h-7" />} 
        />
        
        <FeatureCard 
          title="Intelligent Suggestions" 
          description="Get real-time suggestions to enhance your animations and make them more engaging" 
          icon={<Wand2 className="w-7 h-7" />} 
        />
        
        <FeatureCard 
          title="Custom Animations" 
          description="Create unique animations tailored to your specific mathematical concepts" 
          icon={<Sparkles className="w-7 h-7" />} 
        />
      </div>

      {/* Getting started prompt */}
      <div className="glass-dark p-8 rounded-3xl text-center max-w-2xl neo-shadow">
        <div className="flex items-center justify-center mb-4">
          <Play className="w-6 h-6 text-white mr-2" />
          <span className="text-lg font-semibold text-white">Ready to get started?</span>
        </div>
        <p className="text-white/70 mb-6">
          Type your animation idea below and watch ManiMate bring it to life with beautiful Python code.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="glass px-4 py-2 rounded-xl text-sm text-white/80">
            "Create a sine wave animation"
          </span>
          <span className="glass px-4 py-2 rounded-xl text-sm text-white/80">
            "Show quadratic function graph"
          </span>
          <span className="glass px-4 py-2 rounded-xl text-sm text-white/80">
            "Animate matrix multiplication"
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;