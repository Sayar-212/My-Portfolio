import { useAuth } from "@/hooks/useAuth";

interface AboutProps {
  onOpenAuthModal: () => void;
}

export default function About({ onOpenAuthModal }: AboutProps) {
  const { currentUser } = useAuth();
  
  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-gray-600 dark:text-gray-400">Get to know more about my background and expertise</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/3 relative">
              {/* Preview version for non-authenticated users */}
              {!currentUser && (
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <div className="w-full h-96 md:h-auto aspect-[3/4] bg-gray-300 filter blur-sm"></div>
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                    <i className="ri-lock-line text-white text-3xl mb-2"></i>
                    <p className="text-white text-center font-medium">Sign in to view full profile details</p>
                  </div>
                </div>
              )}
              
              {/* Full version for authenticated users */}
              {currentUser && (
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <div className="w-full h-96 md:h-auto aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Available for projects</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-full md:w-2/3">
              {/* Preview content for non-authenticated users */}
              {!currentUser && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sayar Basu</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    AI/ML Engineer specializing in GenAI and LLMs. Passionate about building intelligent solutions that solve real-world problems.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <i className="ri-lock-line text-gray-500 dark:text-gray-400 mr-2"></i>
                      <span className="text-gray-500 dark:text-gray-400">Full background and expertise locked</span>
                    </div>
                    <button 
                      onClick={onOpenAuthModal}
                      className="px-4 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      Sign in
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 text-sm">AI</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 text-sm">Machine Learning</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 text-sm">GenAI</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 text-sm">LLMs</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 text-sm">Python</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 text-sm">More...</span>
                  </div>
                </div>
              )}
              
              {/* Full content for authenticated users */}
              {currentUser && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sayar Basu</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    AI/ML Engineer with 5+ years of experience specializing in GenAI and Large Language Models. I combine technical expertise with strategic thinking to deliver cutting-edge AI solutions that drive business impact.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    My journey in AI began with a strong foundation in computer science and mathematics, which I've applied to solve complex problems across various domains including healthcare, finance, and e-commerce.
                  </p>
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-lg p-4">
                    <h4 className="font-medium text-primary-700 dark:text-primary-400 mb-2">Current Focus Areas</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Large Language Model fine-tuning and deployment</li>
                      <li>Multimodal AI systems for enterprise applications</li>
                      <li>Efficient prompt engineering and RAG implementations</li>
                      <li>Ethical AI and responsible deployment frameworks</li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">AI</span>
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">Machine Learning</span>
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">GenAI</span>
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">LLMs</span>
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">Python</span>
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">TensorFlow</span>
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">PyTorch</span>
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">HuggingFace</span>
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm">LangChain</span>
                  </div>
                  
                  <div className="mt-4 flex space-x-4">
                    <a href="#" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center">
                      <i className="ri-file-text-line mr-1"></i> View Resume
                    </a>
                    <a href="#contact" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center">
                      <i className="ri-mail-line mr-1"></i> Contact Me
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
