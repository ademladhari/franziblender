import React, { useState } from 'react';
import concepts from "../assets/Concepts.png"
import scripts from "../assets/scripts.png"
import Procedural_PBR_Textures from "../assets/Procedural_PBR_Textures.png"
import Low_Poly_Models from "../assets/Low_Poly_Models.png"
import High_Poly from "../assets/High_Poly.png"

const PortfolioHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      images: [
        {
          src: concepts,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.'
        },
        {
          src: scripts,
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
        },
        {
          src: Procedural_PBR_Textures,
          description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.'
        }
      ]
    },
    {
     
      images: [
        {
          src: Low_Poly_Models,
          description: 'Second set - Image 1 description'
        },
        {
          src: High_Poly,
          description: 'Second set - Image 2 description'
        },
       
      ]
    },
    {
      description: "Final series exploring the intersection of light, shadow, and architectural forms.",
      images: [
        {
          src: '/api/placeholder/300/300',
          description: 'Third set - Image 1 description'
        },
        {
          src: '/api/placeholder/300/400',
          description: 'Third set - Image 2 description'
        },
        {
          src: '/api/placeholder/300/300',
          description: 'Third set - Image 3 description'
        }
      ]
    }
  ];

  const numberOfSlides = slides.length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      {/* Content wrapper with padding */}
      <div className="flex-1 flex flex-col items-center pt-8 sm:pt-12 md:pt-20 px-4">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="mb-4">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" viewBox="0 0 24 24">
              <path 
                fill="currentColor" 
                d="M7 18C7 16.8954 7.89543 16 9 16H15C16.1046 16 17 16.8954 17 18C17 19.1046 16.1046 20 15 20H9C7.89543 20 7 19.1046 7 18Z"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wider mb-3 sm:mb-4">VYAN1 TOUM</h1>
          <h2 className="text-lg sm:text-xl tracking-widest text-gray-600 mb-6">LIGHT NEOLOGISM</h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {slides[1].description}
          </p>
        </div>

        {/* Image Gallery */}
        <div className="w-full max-w-7xl mb-20 px-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex justify-center gap-4 lg:gap-8 items-end">
            {slides[currentSlide].images.map((item, index) => (
              <div 
                key={index} 
                className={`transform transition-transform duration-500 flex flex-col items-center ${
                  index === 1 ? '-translate-y-8' : 'translate-y-0'
                }`}
              >
                <img
                  src={item.src}
                  alt={`Gallery image ${index + 1}`}
                  className={`rounded-lg shadow-lg mb-6 transition-all duration-300 ${
                    index === 1 
                      ? 'md:w-52 md:h-72 lg:w-80 lg:h-96' // Center image
                      : 'md:w-44 md:h-60 lg:w-64 lg:h-80'  // Side images
                  }`}
                />
                <p className="text-gray-600 text-sm text-center max-w-xs leading-relaxed px-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center">
              <img
                src={slides[currentSlide].images[1].src}
                alt="Gallery image"
                className="rounded-lg shadow-lg mb-6 w-64 sm:w-72 h-72 sm:h-80"
              />
              <p className="text-gray-600 text-sm text-center max-w-xs leading-relaxed px-4">
                {slides[currentSlide].images[1].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots - Fixed at bottom */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex gap-3 sm:gap-4 justify-center">
          {Array.from({ length: numberOfSlides }).map((_, index) => (
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