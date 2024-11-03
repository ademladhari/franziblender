import { useState, useEffect } from 'react';

const PortfolioHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allImages = [
    {
      url: 'https://res.cloudinary.com/dkgzqkiot/image/upload/v1730645677/Procedural_PBR_Textures_qvgcoc.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      url: 'https://res.cloudinary.com/dkgzqkiot/image/upload/v1730645673/High_Poly_rnbwfd.jpg',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation.'
    },
    {
      url: 'https://res.cloudinary.com/dkgzqkiot/image/upload/v1730645658/Low_Poly_Models_uzifzx.png',
      description: 'Duis aute irure dolor in reprehenderit.'
    },
    {
      url: 'https://res.cloudinary.com/dkgzqkiot/image/upload/v1730651316/Concepts_1_iexw99.png',
      description: 'Excepteur sint occaecat cupidatat non proident.',
      isWidthBigger: true
    },
    {
      url: 'https://res.cloudinary.com/dkgzqkiot/image/upload/v1730645660/scripts_dedbwr.png',
      description: 'Sed ut perspiciatis unde omnis iste natus error.'
    }
  ];

  const getAdjacentImages = (currentIndex) => {
    const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
    
    return {
      prev: allImages[prevIndex],
      current: allImages[currentIndex],
      next: allImages[nextIndex]
    };
  };

  const getOptimizedUrl = (baseUrl, options = {}) => {
    const {
      width = 1300,
      height = 600,
      blur = false,
      quality = 100
    } = options;

    let transformations = `c_limit,w_${width},h_${height},q_${quality}`;
    if (blur) {
      transformations += ',e_blur:1000';
    }

    const urlParts = baseUrl.split('/upload/');
    return `${urlParts[0]}/upload/${transformations}/${urlParts[1]}`;
  };

  const { prev, current, next } = getAdjacentImages(currentSlide);

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentSlide(currentSlide === allImages.length - 1 ? 0 : currentSlide + 1);
    } else {
      setCurrentSlide(currentSlide === 0 ? allImages.length - 1 : currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <div className="flex-1 flex flex-col items-center pt-4 sm:pt-8 md:pt-16 px-2 sm:px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="mb-3 sm:mb-4">
            <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto" viewBox="0 0 24 24">
              <path 
                fill="currentColor" 
                d="M7 18C7 16.8954 7.89543 16 9 16H15C16.1046 16 17 16.8954 17 18C17 19.1046 16.1046 20 15 20H9C7.89543 20 7 19.1046 7 18Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider mb-2 sm:mb-3">VYAN1 TOUM</h1>
          <h2 className="text-base sm:text-lg md:text-xl tracking-widest text-gray-600 mb-4 sm:mb-6">LIGHT NEOLOGISM</h2>
        </div>

        {/* Gallery Section */}
        <div className="w-full mb-12 sm:mb-16 md:mb-20">
          {/* Desktop Layout */}
          <div className="hidden md:block relative">
            <div className="max-w-7xl mx-auto relative h-[40vh] lg:h-[60vh] xl:h-[70vh]">
              <div className="absolute inset-0 flex justify-center items-center">
                {/* Previous Image */}
                <div className="absolute right-1/2 md:-translate-x-[40%] lg:-translate-x-[20%] -translate-x-[20%]-translate-x-[20%] z-10 transition-all duration-300">
                  <div className="w-[30vw] h-[35vh] overflow-hidden rounded-lg shadow-lg mb-4">
                    <img
                      src={getOptimizedUrl(prev.url, { width: 600, height: 450, blur: true, quality: 60 })}
                      alt="Previous image"
                      className="w-full h-full blur-[2px] object-cover opacity-80 transition-all duration-500"
                    />
                  </div>
                
                </div>

                {/* Current Image */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-300">
                  <div className={`h-[40vh] lg:h-[50vh] bg-black/5 rounded-lg shadow-xl overflow-hidden mb-4 
                    ${current.isWidthBigger ? "w-[80vw] lg:w-[60vw]" : "w-[80vw] lg:w-[50vw] xl:w-[40vw]"}`}>
                    <img
                      src={getOptimizedUrl(current.url, { width: 1200, height: 500, quality: 100 })}
                      alt="Current image"
                      className="w-full h-full  transition-all duration-500"
                    />
                  </div>
                  <p className="text-gray-600 text-sm text-center max-w-xs mx-auto leading-relaxed px-4">
                    {current.description}
                  </p>
                </div>

                {/* Next Image */}
                <div className="absolute left-1/2 md:translate-x-[40%] lg:translate-x-[20%] translate-x-[20%] z-10 transition-all duration-300">
                  <div className="w-[30vw] h-[35vh] overflow-hidden rounded-lg shadow-lg mb-4">
                    <img
                      src={getOptimizedUrl(next.url, { width: 600, height: 450, blur: true, quality: 60 })}
                      alt="Next image"
                      className="w-full h-full blur-[2px] object-cover opacity-80 transition-all duration-500"
                    />
                  </div>
               
                </div>
              </div>
            </div>

            {/* Desktop Navigation Arrows */}
            <button 
              onClick={() => handleSwipe('right')}
              className="absolute -left-[2%] lg:left-[4%] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => handleSwipe('left')}
              className="absolute -right-[2%] lg:right-[4%] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center my-auto">
              <div className="w-[85vw] sm:w-[70vw] h-[40vh] sm:h-[60vh] bg-black/5  rounded-lg shadow-lg overflow-hidden mb-4">
                <img
                  src={getOptimizedUrl(current.url, { width: 600, height: 400, quality: 100 })}
                  alt="Gallery image"
                  className="w-full h-full "
                />
              </div>
              <p className="text-gray-600 text-sm text-center max-w-[85vw] sm:max-w-[80vw] leading-relaxed px-4">
                {current.description}
              </p>
              
              {/* Mobile Navigation Arrows */}
              <div className="flex justify-between w-full px-4 mt-6">
                <button 
                  onClick={() => handleSwipe('right')}
                  className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleSwipe('left')}
                  className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex gap-3 sm:gap-4 justify-center">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 sm:w-4 p-0 sm:h-4 rounded-full transition-all duration-300 border-2 ${
                currentSlide === index 
                  ? 'bg-gray-800 border-gray-800' 
                  : 'bg-transparent border-gray-400 hover:border-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioHero;