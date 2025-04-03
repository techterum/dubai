// import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>
  );
};

export default LoadingSpinner;

// import React from 'react';
// import loaderGif from '../assets/loader.gif'; // Adjust the path as necessary

// const LoadingSpinner: React.FC = () => {
//   return (
//     <div className="flex justify-center items-center h-full">
//       <img src={loaderGif} alt="Loading..." className="h-[100px] w-[100px]" />
//     </div>
//   );
// };

// export default LoadingSpinner;

// import React from 'react';

// const LoadingSpinner: React.FC = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
//       <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
//     </div>
//   );
// };

// export default LoadingSpinner;
