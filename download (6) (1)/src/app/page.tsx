'use client';

import Link from 'next/link';
import { Palette, Pen, Eraser, Sparkles, Star, Heart, GitCommit, Bot, Ghost, Bone, Pizza, Plane, Github, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';

const doodleTemplates = [
    { icon: Pen, color: '#39FF14' },
    { icon: Eraser, color: '#FF5733' },
    { icon: Palette, color: '#A020F0' },
    { icon: Sparkles, color: '#FFFF00' },
    { icon: Star, color: '#FFD700' },
    { icon: Heart, color: '#FF007F' },
    { icon: GitCommit, color: '#00FFFF' },
    { icon: Bot, color: '#7DF9FF' },
    { icon: Ghost, color: '#F8F8FF' },
    { icon: Bone, color: '#E0BBAA' },
    { icon: Pizza, color: '#FFC300' },
    { icon: Plane, color: '#00BFFF' },
    { icon: (props: any) => ( <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24"> <path d="M20,50 C20,20 80,20 80,50 C80,80 20,80 20,50 Z" strokeWidth="5" fill="none" /> </svg>), color: '#FF00FF' },
    { icon: (props: any) => ( <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20"> <path d="M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z" strokeWidth="5" fill="none" /> </svg>), color: '#00FFFF' },
    { icon: (props: any) => ( <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16"> <path d="M20 20 L80 80 M80 20 L20 80" strokeWidth="5" fill="none" /> </svg>), color: '#FFFF00' },
    { icon: (props: any) => ( <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20"> <circle cx="50" cy="50" r="30" strokeWidth="5" fill="none" /> </svg>), color: '#FF69B4' },
    { icon: (props: any) => ( <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20"> <path d="M20,80 Q50,20 80,80" strokeWidth="5" fill="none" /> </svg>), color: '#7CFC00' },
    { icon: (props: any) => ( <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20"> <rect x="20" y="20" width="60" height="60" strokeWidth="5" fill="none" /> </svg>), color: '#1E90FF' },
    { icon: (props: any) => ( <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20"> <polygon points="50,10 90,90 10,90" strokeWidth="5" fill="none" /> </svg>), color: '#FF4500' },
    { icon: (props: any) => ( <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20"> <path d="M10,50 L90,50" strokeWidth="5" fill="none" /> </svg>), color: '#ADFF2F' },
    { icon: (props: any) => ( <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20"> <path d="M20,20 C40,60 60,0 80,80" strokeWidth="5" fill="none" /> </svg>), color: '#DA70D6' },
];

interface Doodle {
  icon: React.ElementType;
  color: string;
  style: React.CSSProperties;
}

export default function IntroPage() {
  const [doodles, setDoodles] = useState<Doodle[]>([]);

  useEffect(() => {
    const generateDoodles = () => {
      const newDoodles = doodleTemplates.map((doodle, index) => {
        const animationDuration = Math.random() * 8 + 10; // 10s to 18s
        const animationDelay = Math.random() * 5;
        const animationDirection = index % 2 === 0 ? 'normal' : 'reverse';
        
        return {
          ...doodle,
          style: {
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            animation: `float${(index % 4) + 1} ${animationDuration}s ease-in-out ${animationDelay}s infinite ${animationDirection}`,
          },
        };
      });
      setDoodles(newDoodles);
    };
    generateDoodles();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#111] overflow-hidden flex flex-col items-center justify-center p-4">
      <style jsx global>{`
        @keyframes float1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20vw, 30vh) rotate(90deg); }
          50% { transform: translate(-15vw, 40vh) rotate(180deg); }
          75% { transform: translate(10vw, -20vh) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-30vw, -20vh) rotate(-70deg); }
          50% { transform: translate(25vw, -30vh) rotate(-140deg); }
          75% { transform: translate(-10vw, 15vh) rotate(-210deg); }
          100% { transform: translate(0, 0) rotate(-360deg); }
        }
        @keyframes float3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30vw, -10vh) rotate(120deg); }
          50% { transform: translate(-25vw, 10vh) rotate(240deg); }
          75% { transform: translate(20vw, 30vh) rotate(360deg); }
          100% { transform: translate(0, 0) rotate(480deg); }
        }
         @keyframes float4 {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-10vw, 25vh) rotate(-100deg); }
          50% { transform: translate(20vw, -15vh) rotate(-200deg); }
          75% { transform: translate(-15vw, -25vh) rotate(-300deg); }
          100% { transform: translate(0, 0) rotate(-360deg); }
        }
        @keyframes textShine {
          from {
            filter: hue-rotate(0deg);
          }
          to {
            filter: hue-rotate(360deg);
          }
        }
        @keyframes buttonBlink {
          0%, 100% { 
            box-shadow: 0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 30px #ff00ff, 0 0 60px #ff00ff;
            transform: scale(1.0);
          }
          50% { 
            box-shadow: 0 0 10px #ff00ff, 0 0 30px #ff00ff, 0 0 60px #ff00ff, 0 0 120px #ff00ff;
            transform: scale(1.05);
          }
        }
      `}</style>

      {doodles.map((doodle, index) => {
        const Icon = doodle.icon;
        return (
          <div
            key={index}
            className="absolute"
            style={doodle.style}
          >
            <Icon
              style={{
                color: doodle.color,
                stroke: doodle.color,
                filter: `drop-shadow(0 0 5px ${doodle.color}) drop-shadow(0 0 15px ${doodle.color})`,
              }}
              className="w-16 h-16 sm:w-24 sm:h-24 opacity-70"
            />
          </div>
        );
      })}

      <div className="relative z-10 text-center bg-[#11111199] p-8 rounded-2xl border border-gray-700 backdrop-blur-sm">
        <h1
          className="text-6xl md:text-8xl font-bold font-headline"
          style={{
            background: 'linear-gradient(90deg, #FF00FF, #00FFFF, #FFFF00, #39FF14)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'textShine 8s ease-in-out infinite alternate',
          }}
        >
          DoodleSpark
        </h1>
        <Link href="/draw">
          <button 
            className="mt-10 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full transition-transform duration-300 ease-in-out"
            style={{
              animation: 'buttonBlink 2s infinite'
            }}
          >
            Start Doodling
          </button>
        </Link>
      </div>

      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-4 text-gray-400 font-code">
        <span className="font-semibold text-lg">Made by Hadia Yasir</span>
        <a href="https://github.com/Hadia-codes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
          <Github className="h-6 w-6" />
        </a>
        <a href="https://www.linkedin.com/in/hadia-yasir-19194a340/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
          <Linkedin className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
