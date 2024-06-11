import React, { useState } from 'react';
import { formations } from './data/formations';
import { players } from './data/players';
import FormationDisplay from './components/FormationDisplay';

const App = () => {
  const [formation, setFormation] = useState('4-4-2');
  const [playerAssignments, setPlayerAssignments] = useState(() => {
    const initialAssignments = {};
    formations['4-4-2'].forEach((pos, i) => {
      initialAssignments[`${pos.position}_${i}`] = players[i % players.length];
    });
    return initialAssignments;
  });

  const handlePlayerSelect = (position, player) => {
    setPlayerAssignments(prev => ({ ...prev, [position]: player }));
  };

  return (
    <div>
      <h1>31 よくばりフェス イレブン</h1>
      <select onChange={(e) => setFormation(e.target.value)} value={formation}>
        {Object.keys(formations).map(f => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
      {formations[formation].map((pos, i) => (
        <div key={`${pos.position}_${i}`}>
          <label>{pos.position}</label>
          <select 
            onChange={(e) => handlePlayerSelect(`${pos.position}_${i}`, i === 0 ? 'Fixed Player' : e.target.value)} 
            value={i === 0 ? 'Fixed Player' : playerAssignments[`${pos.position}_${i}`]}
            disabled={i === 0}  // Disable the dropdown for the fixed player
          >
            {players.map(player => (
              <option key={player} value={player}>{player}</option>
            ))}
          </select>
        </div>
      ))}
      <FormationDisplay formation={formations[formation]} playerAssignments={playerAssignments} />
    </div>
  );
};

export default App;