import React, { useEffect, useRef } from 'react';
import { TimeSeriesData } from '../../types';

interface LineChartProps {
  data: TimeSeriesData[];
  color?: string;
  height?: number;
  showAxis?: boolean;
  animated?: boolean;
  className?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  color = '#3B82F6',
  height = 200,
  showAxis = true,
  animated = true,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    // Clear SVG
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }

    // Chart dimensions
    const width = svgRef.current.clientWidth;
    const chartHeight = height;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    // Create scales
    const xValues = data.map(d => new Date(d.date));
    const yValues = data.map(d => d.value);

    const xMin = Math.min(...xValues.map(d => d.getTime()));
    const xMax = Math.max(...xValues.map(d => d.getTime()));
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xScale = (x: number) => 
      margin.left + (x - xMin) / (xMax - xMin) * innerWidth;
    
    const yScale = (y: number) => 
      margin.top + innerHeight - (y - yMin) / (yMax - yMin) * innerHeight;

    // Create group element
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svgRef.current.appendChild(g);

    // Create axes if showAxis is true
    if (showAxis) {
      // X axis
      const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      xAxis.setAttribute('x1', `${margin.left}`);
      xAxis.setAttribute('y1', `${margin.top + innerHeight}`);
      xAxis.setAttribute('x2', `${margin.left + innerWidth}`);
      xAxis.setAttribute('y2', `${margin.top + innerHeight}`);
      xAxis.setAttribute('stroke', '#e5e7eb');
      xAxis.setAttribute('stroke-width', '1');
      g.appendChild(xAxis);

      // X axis ticks and labels
      const tickCount = Math.min(data.length, 5);
      const tickStep = Math.floor(data.length / tickCount);
      
      for (let i = 0; i < data.length; i += tickStep) {
        if (i === 0 || i === data.length - 1 || i % tickStep === 0) {
          const x = xScale(xValues[i].getTime());
          const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          tick.setAttribute('x1', `${x}`);
          tick.setAttribute('y1', `${margin.top + innerHeight}`);
          tick.setAttribute('x2', `${x}`);
          tick.setAttribute('y2', `${margin.top + innerHeight + 5}`);
          tick.setAttribute('stroke', '#9ca3af');
          g.appendChild(tick);

          const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          label.setAttribute('x', `${x}`);
          label.setAttribute('y', `${margin.top + innerHeight + 20}`);
          label.setAttribute('text-anchor', 'middle');
          label.setAttribute('font-size', '10');
          label.setAttribute('fill', '#6b7280');
          const formattedDate = new Date(data[i].date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
          label.textContent = formattedDate;
          g.appendChild(label);
        }
      }

      // Y axis
      const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      yAxis.setAttribute('x1', `${margin.left}`);
      yAxis.setAttribute('y1', `${margin.top}`);
      yAxis.setAttribute('x2', `${margin.left}`);
      yAxis.setAttribute('y2', `${margin.top + innerHeight}`);
      yAxis.setAttribute('stroke', '#e5e7eb');
      yAxis.setAttribute('stroke-width', '1');
      g.appendChild(yAxis);

      // Y axis ticks and labels
      const yTickCount = 5;
      const yTickStep = (yMax - yMin) / yTickCount;
      
      for (let i = 0; i <= yTickCount; i++) {
        const value = yMin + i * yTickStep;
        const y = yScale(value);
        
        const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick.setAttribute('x1', `${margin.left}`);
        tick.setAttribute('y1', `${y}`);
        tick.setAttribute('x2', `${margin.left - 5}`);
        tick.setAttribute('y2', `${y}`);
        tick.setAttribute('stroke', '#9ca3af');
        g.appendChild(tick);

        // Horizontal grid line
        const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        gridLine.setAttribute('x1', `${margin.left}`);
        gridLine.setAttribute('y1', `${y}`);
        gridLine.setAttribute('x2', `${margin.left + innerWidth}`);
        gridLine.setAttribute('y2', `${y}`);
        gridLine.setAttribute('stroke', '#f3f4f6');
        gridLine.setAttribute('stroke-width', '1');
        g.appendChild(gridLine);

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', `${margin.left - 10}`);
        label.setAttribute('y', `${y + 3}`);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '10');
        label.setAttribute('fill', '#6b7280');
        
        // Format large numbers
        let formattedValue;
        if (value >= 1000000) {
          formattedValue = `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
          formattedValue = `${(value / 1000).toFixed(1)}K`;
        } else {
          formattedValue = value.toFixed(0);
        }
        
        label.textContent = formattedValue;
        g.appendChild(label);
      }
    }

    // Create line path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    
    data.forEach((item, i) => {
      const x = xScale(xValues[i].getTime());
      const y = yScale(item.value);
      if (i === 0) {
        d += `M ${x} ${y}`;
      } else {
        d += ` L ${x} ${y}`;
      }
    });
    
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    
    if (animated) {
      const length = path.getTotalLength();
      path.setAttribute('stroke-dasharray', `${length}`);
      path.setAttribute('stroke-dashoffset', `${length}`);
      path.setAttribute('opacity', '0');
      
      // SMIL animation
      const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animate.setAttribute('attributeName', 'stroke-dashoffset');
      animate.setAttribute('from', `${length}`);
      animate.setAttribute('to', '0');
      animate.setAttribute('dur', '1s');
      animate.setAttribute('fill', 'freeze');
      path.appendChild(animate);
      
      const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animateOpacity.setAttribute('attributeName', 'opacity');
      animateOpacity.setAttribute('from', '0');
      animateOpacity.setAttribute('to', '1');
      animateOpacity.setAttribute('dur', '0.3s');
      animateOpacity.setAttribute('fill', 'freeze');
      path.appendChild(animateOpacity);
    }
    
    g.appendChild(path);

    // Add area fill below the line
    const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let areaD = d;
    
    // Add points to complete the area
    areaD += ` L ${xScale(xValues[data.length - 1].getTime())} ${yScale(yMin)}`;
    areaD += ` L ${xScale(xValues[0].getTime())} ${yScale(yMin)}`;
    areaD += ' Z';
    
    areaPath.setAttribute('d', areaD);
    areaPath.setAttribute('fill', color);
    areaPath.setAttribute('fill-opacity', '0.1');
    areaPath.setAttribute('stroke', 'none');
    
    if (animated) {
      areaPath.setAttribute('opacity', '0');
      
      const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animateOpacity.setAttribute('attributeName', 'opacity');
      animateOpacity.setAttribute('from', '0');
      animateOpacity.setAttribute('to', '1');
      animateOpacity.setAttribute('dur', '1s');
      animateOpacity.setAttribute('fill', 'freeze');
      areaPath.appendChild(animateOpacity);
    }
    
    g.insertBefore(areaPath, path); // Insert area before line to be behind it
    
    // Add dots for each data point
    data.forEach((item, i) => {
      const x = xScale(xValues[i].getTime());
      const y = yScale(item.value);
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', `${x}`);
      circle.setAttribute('cy', `${y}`);
      circle.setAttribute('r', '3');
      circle.setAttribute('fill', 'white');
      circle.setAttribute('stroke', color);
      circle.setAttribute('stroke-width', '1.5');
      
      if (animated) {
        circle.setAttribute('opacity', '0');
        
        const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateOpacity.setAttribute('attributeName', 'opacity');
        animateOpacity.setAttribute('from', '0');
        animateOpacity.setAttribute('to', '1');
        animateOpacity.setAttribute('dur', '1s');
        animateOpacity.setAttribute('fill', 'freeze');
        animateOpacity.setAttribute('begin', '0.7s');
        circle.appendChild(animateOpacity);
      }
      
      g.appendChild(circle);
    });
    
  }, [data, color, height, showAxis, animated]);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        style={{ overflow: 'visible' }}
      ></svg>
    </div>
  );
};

export default LineChart;