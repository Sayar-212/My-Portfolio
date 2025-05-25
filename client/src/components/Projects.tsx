import { useAuth } from "@/hooks/useAuth";

interface ProjectsProps {
  onOpenAuthModal: () => void;
}

export default function Projects({ onOpenAuthModal }: ProjectsProps) {
  const { currentUser } = useAuth();
  
  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI/ML Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">Showcasing my work in artificial intelligence and machine learning</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 (Preview) */}
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
            <div className="h-48 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                <i className="ri-brain-line text-4xl text-primary-600 dark:text-primary-400"></i>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-medium">LLM Application</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">2023</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Conversational AI Platform</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                An advanced chatbot platform leveraging large language models with custom knowledge base integration.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 text-xs">GPT-4</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 text-xs">LangChain</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 text-xs">Python</span>
              </div>
              <div className="flex justify-between items-center">
                <a href="#" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                  Project Overview
                </a>
                {!currentUser && (
                  <div className="relative group">
                    <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                      <i className="ri-lock-line"></i>
                    </button>
                    <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2 text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                      Sign in to view detailed project information
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Project 2 (Preview) */}
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
            <div className="h-48 bg-gradient-to-r from-secondary-500/30 to-green-500/30 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                <i className="ri-microscope-line text-4xl text-secondary-600 dark:text-secondary-400"></i>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 rounded-full text-xs font-medium">Computer Vision</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">2022</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Medical Image Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                AI-powered system for detecting anomalies in medical imaging with high precision and recall.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 text-xs">PyTorch</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 text-xs">CNNs</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 text-xs">Python</span>
              </div>
              <div className="flex justify-between items-center">
                <a href="#" className="text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300 text-sm font-medium">
                  Project Overview
                </a>
                {!currentUser && (
                  <div className="relative group">
                    <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                      <i className="ri-lock-line"></i>
                    </button>
                    <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2 text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                      Sign in to view detailed project information
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Project 3 (Preview) */}
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
            <div className="h-48 bg-gradient-to-r from-purple-500/30 to-primary-500/30 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                <i className="ri-line-chart-line text-4xl text-purple-600 dark:text-purple-400"></i>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">Reinforcement Learning</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">2022</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Autonomous Trading System</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                RL-based algorithmic trading system for financial markets with risk management capabilities.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 text-xs">TensorFlow</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 text-xs">RL</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 text-xs">Python</span>
              </div>
              <div className="flex justify-between items-center">
                <a href="#" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium">
                  Project Overview
                </a>
                {!currentUser && (
                  <div className="relative group">
                    <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                      <i className="ri-lock-line"></i>
                    </button>
                    <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2 text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                      Sign in to view detailed project information
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {!currentUser && (
          <div className="text-center mt-12">
            <button 
              onClick={onOpenAuthModal}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow inline-flex items-center"
            >
              <span>Sign in to view all projects</span>
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
          </div>
        )}
        
        {currentUser && (
          <div className="text-center mt-12">
            <a href="#" className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow inline-flex items-center">
              <span>View all projects</span>
              <i className="ri-arrow-right-line ml-2"></i>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
