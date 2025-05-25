import { useAuth } from "@/hooks/useAuth";

interface HeroProps {
  onOpenAuthModal: () => void;
}

export default function Hero({ onOpenAuthModal }: HeroProps) {
  const { currentUser } = useAuth();

  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-animated clip-path-slant relative overflow-hidden">
      <div className="ai-pattern absolute inset-0 opacity-30"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            AI/ML Engineer & <span className="text-gradient">GenAI Enthusiast</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Building intelligent solutions at the intersection of artificial intelligence, machine learning, and data science.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button 
              onClick={onOpenAuthModal}
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {currentUser ? 'View Your Profile Badge' : 'Sign in to view full profile'}
            </button>
            <a 
              href="#projects" 
              className="px-8 py-3 bg-primary-700 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors shadow-lg"
            >
              Explore Projects
            </a>
          </div>
          
          {/* Protected Profile Preview Card */}
          <div className="flex items-center justify-center mt-12">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-16 -left-16 h-32 w-32 bg-secondary-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 h-24 w-24 bg-primary-500/20 rounded-full blur-xl"></div>
              
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl relative">
                <div className="flex items-center space-x-4">
                  {/* Headshot with locked overlay */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden filter blur-sm bg-gray-300">
                      {/* We're not using the placeholder image directly as per requirements */}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                      <i className="ri-lock-line text-white text-xl"></i>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg truncate">Sayar Basu</h3>
                    <p className="text-white/70 text-sm truncate">AI/ML Engineer | LLM & GenAI Specialist</p>
                    <div className="flex items-center mt-1">
                      <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-secondary-500"></div>
                      </div>
                      <span className="text-white/60 text-xs ml-2">Profile locked</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <span className="text-xs text-white/60">Experience</span>
                    <div className="flex items-center justify-center mt-1">
                      <i className="ri-lock-line text-white/40 mr-1"></i>
                      <span className="text-white/40 text-sm">Locked</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <span className="text-xs text-white/60">Projects</span>
                    <div className="flex items-center justify-center mt-1">
                      <i className="ri-lock-line text-white/40 mr-1"></i>
                      <span className="text-white/40 text-sm">Locked</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <span className="text-xs text-white/60">Contact</span>
                    <div className="flex items-center justify-center mt-1">
                      <i className="ri-lock-line text-white/40 mr-1"></i>
                      <span className="text-white/40 text-sm">Locked</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={onOpenAuthModal}
                  className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors flex items-center justify-center"
                >
                  <i className="ri-google-fill mr-2"></i>
                  <span>Sign in to unlock</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
