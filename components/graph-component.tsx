import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';


type AQIChartProps = {
    currentAqi: number; 
  };
  
const AQIChart = ({ currentAqi }: AQIChartProps) => {

  const defaultColor = '#CED4DA';
  const data = [
    { range: '0-50', impact: 'Air quality is considered satisfactory, and air pollution poses little or no risk. It is safe for everyone, including sensitive groups, to engage in outdoor activities.', aqiStart: 20, aqiEnd: 50, color: defaultColor },
    { range: '50-100', impact: 'Air quality is acceptable; however, some pollutants may pose a moderate health concern for sensitive individuals, such as those with respiratory conditions. Most people can still engage in outdoor activities without issues.', aqiStart: 51, aqiEnd: 100, color: defaultColor },
    { range: '100-150', impact: 'The air may affect sensitive individuals, including children, elderly people, and those with heart or lung conditions. General outdoor activities are safe for healthy people, but sensitive groups should limit prolonged exertion outdoors.', aqiStart: 101, aqiEnd: 150, color: defaultColor },
    { range: '150-200', impact: 'Health effects may begin to occur for everyone, and sensitive groups may experience more serious health effects. It is recommended that people limit outdoor exertion, especially for vulnerable groups.', aqiStart: 151, aqiEnd: 200, color: defaultColor },
    { range: '200-300', impact: 'Everyone may experience more significant health effects, and sensitive groups may suffer severe impacts. Prolonged outdoor activity should be minimized for all, and sensitive individuals should avoid outdoor exposure entirely.', aqiStart: 201, aqiEnd: 300, color: defaultColor },
    { range: '300+', impact: 'Health warnings of emergency conditions. The entire population is more likely to experience serious health effects. Outdoor activities should be avoided, and everyone should take precautions to limit exposure to the harmful air quality.', aqiStart: 301, aqiEnd: 2000, color: defaultColor },
  ];

  const getBarColor = (item: typeof data[0]) => {
    return currentAqi >= item.aqiStart && currentAqi <= item.aqiEnd
      ? '#FF746C'
      : item.color;
  };

  return (
    <ResponsiveContainer height={250} width={800}>
      <BarChart data={data}>
        <XAxis dataKey="range" />
        <YAxis hide />
        <Tooltip
          formatter={(value: any, name: string | undefined, props: any) => {
            const impact = props.payload?.impact || 'Unknown';
            return [impact];  // Only return the 'impact' value
          }}
          contentStyle={{
            backgroundColor: '#333',  // Dark background for the tooltip
            borderRadius: '5px',  // Rounded corners
            padding: '10px',  // Padding inside the tooltip
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Subtle shadow
            color: '#fff',  // Text color
            maxWidth: '300px',  // Restrict width of the tooltip
            whiteSpace: 'normal',  // Allow text to wrap
            overflow: 'hidden',  // Prevent text from overflowing the container
            textOverflow: 'ellipsis',  // Add ellipsis if text overflows
          }}
          
          itemStyle={{
            color: '#FFFFFF',  
            fontWeight: 'bold',  
          }}
        />
        <Bar dataKey="aqiStart" fill="#8884d8" barSize={300}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AQIChart;
