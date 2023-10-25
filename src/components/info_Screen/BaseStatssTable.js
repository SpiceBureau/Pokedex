import React from 'react';
import '../../css/style.css';

const BaseStatsTable = (stats) => {
    const maxStatValue = 255;
    const baseStats = stats.stats

    const colorGradient = (value) => {
        if (value <= 25) {
            return "#f34444"
        }
        if (value <= 55) {
            return "#ff7f0f"
        }
        if (value <= 85) {
            return "#ffdd57"
        }
        if (value <= 115) {
            return "#a0e515"
        }
        return "#23cd5e"
    }

    
  return (
    <>
        <h2>Base Stats</h2>
        <table className="stats-cells">
        <tbody>
            {baseStats.map((stat, index) => (
            <tr key={index}>
                <td className='stats-cells-stat'><b>{stat.stat}</b></td>
                <td className='stats-cells-value'>{stat.value}</td>
                {index !== baseStats.length - 1 && (
                    <td className='stats-cells-bar'>
                        <div className="stat-bar" style={{
                            width: `${(stat.value / maxStatValue) * 400}px`,
                            backgroundColor: colorGradient(stat.value)
                            }}>
                        </div>
                    </td>
                )}
            </tr>
            ))}
        </tbody>
        </table>
    </>
  );
};

export default BaseStatsTable;
