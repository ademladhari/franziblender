import { useState, useEffect, useCallback } from 'react';
import procedural_houdini from "../assets/Procedural_Houdini.mp4"
const PortfolioHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allImages = [
    {
      url: 'https://res.cloudinary.com/dkgzqkiot/image/upload/v1730645677/Procedural_PBR_Textures_qvgcoc.png',
      topic: 'PBR Textures',
      headline: 'Procedural PBR Textures',
      text: "Easily adjustable and detailed textures were always something that fascinated me. And learning slowly about the beauty of PBR textures I have explored how to achieve nice results in Maya, but also in Substance Designer, while currently still trying to learn and expand on that knowledge."    },
    {
      url: 'https://res.cloudinary.com/dkgzqkiot/image/upload/v1730645673/High_Poly_rnbwfd.jpg',
      topic: 'High Poly Models',
      headline: 'High Poly models with PBR Materials using SubD techniques.',
      text:"With a love for detail I enjoy using the possibilities that high poly modelling allows." 
    },
    {
      url: 'https://res.cloudinary.com/dkgzqkiot/image/upload/v1730645658/Low_Poly_Models_uzifzx.png',
      topic: 'Low Poly Models',
      headline: 'Low Poly models with basic photo- or hand-textures',
text: "I have created plenty low- and mid poly models, from more stylised ones to ones that mimic reality. While not being the best at photo- or hand painted textures, I also did learn to do those."     },
    {
      url: 'https://res.cloudinary.com/dkgzqkiot/image/upload/v1730651316/Concepts_1_iexw99.png',
      isWidthBigger: true,
      topic: 'Concepts',
      headline: 'Creating basic concepts based on the given guidelines',
      text: 'Whilst not a full-blown concept artist I can create basic concept art to explore the customer\'s ideas.'
    },
    {
      url: 'https://res.cloudinary.com/dkgzqkiot/image/upload/v1730645660/scripts_dedbwr.png',
      topic: 'Scripts',
      headline: 'Creating an easier work experience through scripts',
      text: "One of my focuses has been creating scripts to have easier work experiences and save time. Such as batch processing of huge data masses, transfer scripts from Substance Designer to Maya, etc. For that I have learned how to use python, as well as certain libraries such as the Maya Commands. "    }
    ,
    {
      url: procedural_houdini,
      topic: 'Proceduralism',
      isVideo:true,
      headline: "Creating easily adjustable tools for often created models",
      text: "Creating similar models over and over again can be quite tedious, therefore Houdini's possibility of creating easily adjustable or even randomised automatic generated models is something I personally found astonishing. From cars, buildings, landscapes, trees, I personally greatly enjoy creating uniqueness with automation."    }
  ];
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getOptimizedUrl = useCallback((baseUrl, options = {}) => {
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
  }, []);

  // Preload next and previous images
  useEffect(() => {
    const preloadImages = () => {
      const nextIndex = (currentSlide + 1) % allImages.length;
      const prevIndex = currentSlide === 0 ? allImages.length - 1 : currentSlide - 1;

      [prevIndex, currentSlide, nextIndex].forEach(index => {
        const imageUrl = allImages[index].url;
        if (!preloadedImages.has(imageUrl)) {
          const img = new Image();
          img.src = getOptimizedUrl(imageUrl, { 
            width: 1200, 
            height: 500, 
            quality: 100 
          });
          img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, imageUrl]));
          };

          // Also preload the blurred version for side images
          if (index !== currentSlide) {
            const blurredImg = new Image();
            blurredImg.src = getOptimizedUrl(imageUrl, { 
              width: 600, 
              height: 450, 
              blur: true, 
              quality: 60 
            });
          }
        }
      });
    };

    preloadImages();
  }, [currentSlide, allImages, getOptimizedUrl, preloadedImages]);

  const getAdjacentImages = useCallback((currentIndex) => {
    const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
    
    return {
      prev: allImages[prevIndex],
      current: allImages[currentIndex],
      next: allImages[nextIndex]
    };
  }, [allImages]);

  const handleSwipe = useCallback((direction) => {
    setCurrentSlide(current => {
      if (direction === 'left') {
        return current === allImages.length - 1 ? 0 : current + 1;
      }
      return current === 0 ? allImages.length - 1 : current - 1;
    });
  }, [allImages.length]);

  const { prev, current, next } = getAdjacentImages(currentSlide);

  // Your existing JSX remains exactly the same
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-black mb-2 sm:mb-3">Franziska Frieling</h1>
        </div>

        {/* Gallery Section */}
        <div className="w-full mb-12 sm:mb-16 md:mb-20 sm:mt-[10%] md:mt-0 ">
          {/* Desktop Layout */}
          <div className="hidden md:block relative">
            <div className="max-w-7xl mx-auto relative h-[40vh] lg:h-[60vh] xl:h-[70vh]">
            <div className="absolute inset-0 flex justify-center items-center">
      {/* Previous Media */}
      <div className="absolute right-1/2 md:-translate-x-[40%] lg:-translate-x-[20%]  md:-translate-y-[15%]  -translate-x-[20%] z-10 transition-all duration-300">
        <div className="w-[30vw] h-[35vh] overflow-hidden rounded-lg shadow-lg mb-4">
          {!prev.isVideo ? (
            <img
              src={getOptimizedUrl(prev.url, { width: 600, height: 450, blur: true, quality: 60 })}
              alt="Previous image"
              className="w-full h-full blur-[2px]  opacity-80 transition-all duration-500"
            />
          ) : (
            <video 
              src={prev.url} 
              className="w-full h-full blur-[2px] object-fill opacity-80 transition-all duration-500"
              muted
              playsInline
            ></video>
          )}
        </div>
      </div>

      {/* Current Media */}
      <div className="absolute left-1/2 -translate-x-1/2  z-20 transition-all duration-300">
        <h2 className="text-base sm:text-lg md:text-xl text-center tracking-widest text-gray-600 mb-2 sm:mb-2">
          {current.topic}
        </h2>
        <div className={`h-[40vh] lg:h-[50vh] bg-black/5 rounded-lg shadow-xl overflow-hidden mb-4
          ${current.isWidthBigger ? "w-[80vw] lg:w-[60vw]" : "w-[80vw] lg:w-[50vw] lg:h-[45vh] xl:w-[40vw]"}`}>
          {!current.isVideo ? (
            <img
              src={getOptimizedUrl(current.url, { width: 1200, height: 500, quality: 100 })}
              alt="Current image"
              className="w-full h-full transition-all duration-500"
            />
          ) : (
            <video 
              src={current.url} 
              controls 
              className="w-full object-fill h-full "
            ></video>
          )}
        </div>
        <p className="text-gray-600 font-bold text-base text-center max-w-3xl mx-auto leading-relaxed px-4">
          {current.headline}
        </p>
        <p className="text-gray-600 text-base text-center max-w-3xl mx-auto leading-relaxed px-4">
          {current.text}
        </p>
      </div>

      {/* Next Media */}
      <div className="absolute left-1/2 md:translate-x-[40%] lg:translate-x-[20%] md:-translate-y-[15%]  translate-x-[20%] z-10 transition-all duration-300">
        <div className="w-[30vw] h-[35vh] overflow-hidden rounded-lg shadow-lg mb-4">
          {!next.isVideo ? (
            <img
              src={getOptimizedUrl(next.url, { width: 600, height: 450, blur: true, quality: 60 })}
              alt="Next image"
              className="w-full h-full blur-[2px] object-cover opacity-80 transition-all duration-500"
            />
          ) : (
            <video 
              src={next.url} 
              className="w-full h-full blur-[2px] object-cover opacity-80 transition-all duration-500"
              muted
              playsInline
            ></video>
          )}
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
              <div className="w-[85vw] sm:w-[70vw] h-[40vh] sm:h-[60vh] bg-black/5 rounded-lg shadow-lg overflow-hidden mb-4">
              {!current.isVideo? (
                  <img
                    src={getOptimizedUrl(current.url, { width: 600, height: 400, quality: 100 })}
                    alt="Gallery image"
                    className="w-full h-full"
                  />
                ):(
                  <video src={current.url} controls className="w-full h-full object-contain"></video>
                )}
              </div>
              <p className="text-gray-600 text-sm text-center max-w-[85vw] sm:max-w-[80vw] leading-relaxed px-4">
                {current.headline}
              </p>
              <p className="text-gray-600 text-sm text-center max-w-[85vw] sm:max-w-[80vw] leading-relaxed px-4">
                {current.text}
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