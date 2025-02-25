// src/components/dashboard/SkillStrength.tsx
import React, { useEffect, useRef } from 'react';

export const SkillStrength = () => {
  const canvasRef = useRef(null);
  
  const skills = [
    { name: 'Technical', value: 82, target: 80 },
    { name: 'Communication', value: 75, target: 85 },
    { name: 'Problem Solving', value: 88, target: 75 },
    { name: 'Teamwork', value: 90, target: 80 },
    { name: 'Leadership', value: 65, target: 70 }
  ];
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 40;
    
    // Draw radar background
    const angleStep = (2 * Math.PI) / skills.length;
    
    // Draw radar grid
    for (let r = 0.2; r <= 1; r += 0.2) {
      ctx.beginPath();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2; // Start from top
        const x = centerX + maxRadius * r * Math.cos(angle);
        const y = centerY + maxRadius * r * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.stroke();
      
      // Add percentage labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(r * 100)}%`, centerX, centerY - r * maxRadius);
    }
    
    // Draw axes
    for (let i = 0; i < skills.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + maxRadius * Math.cos(angle),
        centerY + maxRadius * Math.sin(angle)
      );
      ctx.strokeStyle = '#cbd5e1';
      ctx.stroke();
      
      // Add skill labels
      const labelRadius = maxRadius + 20;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);
      
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skills[i].name, labelX, labelY);
    }
    
    // Animate the radar chart
    let progress = 0;
    const animationDuration = 1500; // ms
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(1, elapsed / animationDuration);
      
      // Draw current values
      ctx.beginPath();
      ctx.fillStyle = 'rgba(26, 54, 93, 0.2)'; // Navy with transparency
      
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = skills[i].value / 100 * progress;
        const x = centerX + maxRadius * value * Math.cos(angle);
        const y = centerY + maxRadius * value * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.fill();
      
      // Draw the outline
      ctx.beginPath();
      ctx.strokeStyle = '#1A365D'; // Navy
      ctx.lineWidth = 2;
      
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = skills[i].value / 100 * progress;
        const x = centerX + maxRadius * value * Math.cos(angle);
        const y = centerY + maxRadius * value * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.stroke();
      
      // Draw target values
      ctx.beginPath();
      ctx.strokeStyle = '#FFD700'; // Gold
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = skills[i].target / 100;
        const x = centerX + maxRadius * value * Math.cos(angle);
        const y = centerY + maxRadius * value * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw points
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = skills[i].value / 100 * progress;
        const x = centerX + maxRadius * value * Math.cos(angle);
        const y = centerY + maxRadius * value * Math.sin(angle);
        
        ctx.fillStyle = '#1A365D';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
    
    // Add legend
    const legendY = height - 25;
    
    // Current skills legend
    ctx.fillStyle = '#1A365D';
    ctx.beginPath();
    ctx.arc(width / 2 - 80, legendY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#1e293b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Your Skills', width / 2 - 70, legendY);
    
    // Target skills legend
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(width / 2 + 10, legendY);
    ctx.lineTo(width / 2 + 30, legendY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.fillStyle = '#1e293b';
    ctx.fillText('Target Level', width / 2 + 35, legendY);
    
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Skill Strength</h2>
      <div className="w-full h-72 relative">
        <canvas ref={canvasRef} width="500" height="350" className="w-full h-full"></canvas>
      </div>
    </div>
  );
};