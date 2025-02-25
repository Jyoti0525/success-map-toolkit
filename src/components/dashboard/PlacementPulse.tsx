// src/components/dashboard/PlacementPulse.tsx
import React, { useEffect, useRef } from 'react';

export const PlacementPulse = () => {
  const chartRef = useRef(null);
  
  const data = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    applications: [4, 3, 6, 8, 7.5],
    interviews: [3, 2, 5, 7, 6],
  };
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext('2d');
    const width = chartRef.current.width;
    const height = chartRef.current.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = height - (i * height / 4) - 30;
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
      
      // Add y-axis labels
      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(i * 2, 35, y + 5);
    }
    
    // Calculate x positions
    const xStep = (width - 60) / (data.months.length - 1);
    
    // Draw x-axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    data.months.forEach((month, i) => {
      const x = 40 + i * xStep;
      ctx.fillText(month, x, height - 10);
    });
    
    // Function to draw a line
    const drawLine = (dataPoints, color, animationDelay = 0) => {
      const points = dataPoints.map((point, i) => ({
        x: 40 + i * xStep,
        y: height - ((point * height / 8) + 30)
      }));
      
      // Animate drawing the line
      let drawLength = 0;
      const totalLength = points.length - 1;
      const animationDuration = 1500; // ms
      const startTime = Date.now() + animationDelay;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        drawLength = Math.min(totalLength, (elapsed / animationDuration) * totalLength);
        
        // Draw the line segment by segment
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i <= drawLength; i++) {
          // If we're on the last segment being drawn, interpolate
          if (Math.floor(drawLength) === i - 1) {
            const fraction = drawLength - Math.floor(drawLength);
            const curX = points[i-1].x + (points[i].x - points[i-1].x) * fraction;
            const curY = points[i-1].y + (points[i].y - points[i-1].y) * fraction;
            ctx.lineTo(curX, curY);
          } else {
            ctx.lineTo(points[i].x, points[i].y);
          }
        }
        
        ctx.stroke();
        
        // Draw points
        points.forEach((point, i) => {
          if (i <= drawLength) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        
        if (drawLength < totalLength) {
          requestAnimationFrame(animate);
        }
      };
      
      setTimeout(() => requestAnimationFrame(animate), animationDelay);
    };
    
    // Draw the lines with animation
    drawLine(data.applications, '#1A365D'); // Navy blue
    drawLine(data.interviews, '#FFD700', 300); // Gold
    
    // Add legend
    const legendY = height - 45;
    
    // Applications legend
    ctx.fillStyle = '#1A365D';
    ctx.beginPath();
    ctx.arc(width - 100, legendY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#1e293b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Applications', width - 90, legendY + 4);
    
    // Interviews legend
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(width - 100, legendY + 20, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#1e293b';
    ctx.fillText('Interviews', width - 90, legendY + 24);
    
  }, [data]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Placement Pulse</h2>
      <div className="w-full h-64 relative">
        <canvas ref={chartRef} width="500" height="250" className="w-full h-full"></canvas>
      </div>
    </div>
  );
};