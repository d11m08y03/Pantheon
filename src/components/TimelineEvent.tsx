import React, { useState } from 'react';

interface TimelineEventProps {
  year: number;
  title: string;
  description: string;
  isVisible: boolean;
  index: number; 
  imageUrls?: string[];
  date?: string;
  category?: string;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ 
  year, 
  title, 
  description, 
  isVisible, 
  imageUrls = [], 
  date, 
  category 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div 
      className={`transition-all duration-500 opacity-${isVisible ? '100' : '0'} transform ${isVisible ? 'translate-y-0' : 'translate-y-5'}`}
    >
      <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 w-full md:w-4/5 mx-auto">
        
        {imageUrls.length > 0 && (
          <div className="relative mb-4">
            <img
              src={imageUrls[currentImageIndex]}
              alt={title}
              className="w-full h-64 md:h-72 object-cover rounded-2xl"
            />
          
            {imageUrls.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                  &#10094;
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <span className="text-sm font-semibold text-gray-500">{category}</span>
          <span className="text-sm font-semibold text-gray-500">{date}</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">{title}</h3>  
        <p className="text-md md:text-lg text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default TimelineEvent;
