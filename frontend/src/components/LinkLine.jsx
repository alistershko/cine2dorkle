// LINE AS FILM REEL IMAGE - DOESN'T SIT BETWEEN FILM BOXES

import { useEffect, useState } from 'react';
import FilmreelImage from '../assets/Filmreel.png'; // Import your image

const LinkLine = ({ fromRef, toRef }) => {
  const [lineProps, setLineProps] = useState(null);

  useEffect(() => {
    if (fromRef.current && toRef.current) {
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      // Get the common offset container (the parent div with position: relative)
      const container = fromRef.current.offsetParent;
      const containerRect = container.getBoundingClientRect();

      // Make coordinates relative to the container
      const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
      const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
      const x2 = toRect.left + toRect.width / 2 - containerRect.left;
      const y2 = toRect.top + toRect.height / 2 - containerRect.top;

      const length = Math.hypot(x2 - x1, y2 - y1);
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

      setLineProps({ x1, y1, length, angle });
    }
  }, [fromRef, toRef]);


  return (
    <>
      {lineProps && (
        <img
          src={FilmreelImage} // Image source
          alt="Film Reel"
          style={{
            position: 'absolute',
            top: lineProps.y1,
            left: lineProps.x1,
            width: `${lineProps.length}px`, // Stretch the width to the calculated length
            height: 'auto', // Height adjusts based on the image aspect ratio
            transform: `rotate(${lineProps.angle + 90}deg)`, // Rotate the image by 90 degrees to make it vertical
            transformOrigin: '0 0', // Keep the origin point anchored at the start
            zIndex: 1000,
            objectFit: 'contain', // Preserve the aspect ratio
          }}
        />
      )}
    </>
  );
};

export default LinkLine;












// CSS FILM LINE - SITS BETWEEN BOXES

// import { useEffect, useState } from 'react';

// const LinkLine = ({ fromRef, toRef }) => {
//   const [lineStyle, setLineStyle] = useState({});

//   useEffect(() => {
//     if (fromRef.current && toRef.current) {
//       const fromRect = fromRef.current.getBoundingClientRect();
//       const toRect = toRef.current.getBoundingClientRect();

//       const container = fromRef.current.offsetParent;
//       const containerRect = container.getBoundingClientRect();

//       // Get center points relative to container
//       const x1 = fromRect.left - containerRect.left + fromRect.width / 2;
//       const y1 = fromRect.top - containerRect.top + fromRect.height / 2;
//       const x2 = toRect.left - containerRect.left + toRect.width / 2;
//       const y2 = toRect.top - containerRect.top + toRect.height / 2;

//       const length = Math.hypot(x2 - x1, y2 - y1);
//       const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

//       setLineStyle({
//         position: "absolute",
//         top: y1,
//         left: x1,
//         width: `${length}px`,
//         height: "24px", // thicker to show sprockets
//         background: "black",
//         borderRadius: "4px",
//         transform: `rotate(${angle}deg)`,
//         transformOrigin: "0 0",
//         zIndex: 1000,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "0 4px",
//         boxSizing: "border-box",
//       }); 
//     }
//   }, [fromRef, toRef]);

//   return (
//     <>
//       <div style={lineStyle}>
//         {/* Render "sprocket holes" */}
//         {Array.from({ length: 6 }).map((_, index) => (
//           <div
//             key={index}
//             style={{
//               width: "4px",
//               height: "12px",
//               background: "#ccc",
//               borderRadius: "2px",
//               margin: "0 2px",
//             }}
//           />
//         ))}
//       </div>
//     </>
//   );
// };
  

// export default LinkLine;