import { useState } from 'react';
import useGameState from '../utils/gameState';

// Define mission types
type MissionType = 'easy' | 'medium' | 'hard';

interface MissionConfig {
  name: string;
  description: string;
  fuel: number;
  gravity: number;
  initialAltitude: number;
}

const missions: Record<MissionType, MissionConfig> = {
  easy: {
    name: 'Training Mission',
    description: 'Perfect for beginners. More fuel, less gravity, and a clear path to orbit.',
    fuel: 150,
    gravity: 0.03,
    initialAltitude: 0,
  },
  medium: {
    name: 'Standard Mission',
    description: 'Balanced challenge. Normal fuel and gravity for a realistic launch experience.',
    fuel: 100,
    gravity: 0.05,
    initialAltitude: 0,
  },
  hard: {
    name: 'Expert Mission',
    description: 'For experienced pilots. Less fuel, more gravity, and a challenging orbit path.',
    fuel: 70,
    gravity: 0.07,
    initialAltitude: 0,
  },
};

const StartMenu = () => {
  const { resetGame, updateShowMenu } = useGameState();
  const [activeScreen, setActiveScreen] = useState<'main' | 'missions' | 'instructions' | 'credits'>('main');
  const [selectedMission, setSelectedMission] = useState<MissionType>('medium');
  
  const handlePlay = () => {
    setActiveScreen('missions');
  };
  
  const handleStartMission = () => {
    // Apply mission settings
    const mission = missions[selectedMission];
    resetGame();
    updateShowMenu(false);
  };
  
  const renderMainMenu = () => (
    <div className="menu-container">
      <h1 className="game-title">RETRO LUNAR LANDER</h1>
      <div className="menu-options">
        <button className="menu-button" onClick={handlePlay}>PLAY</button>
        <button className="menu-button" onClick={() => setActiveScreen('instructions')}>INSTRUCTIONS</button>
        <button className="menu-button" onClick={() => setActiveScreen('credits')}>CREDITS</button>
      </div>
      <style jsx>{`
        .menu-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 1000;
        }
        
        .game-title {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          color: #00ff00;
          font-size: 36px;
          margin-bottom: 50px;
          text-align: center;
          text-shadow: 0 0 10px #00ff00;
          animation: pulse 2s infinite;
        }
        
        .menu-options {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .menu-button {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          background-color: transparent;
          color: #00ff00;
          border: 2px solid #00ff00;
          padding: 15px 30px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .menu-button:hover {
          background-color: #00ff00;
          color: #000000;
        }
        
        @keyframes pulse {
          0% { text-shadow: 0 0 10px #00ff00; }
          50% { text-shadow: 0 0 20px #00ff00; }
          100% { text-shadow: 0 0 10px #00ff00; }
        }
      `}</style>
    </div>
  );
  
  const renderMissionSelector = () => (
    <div className="menu-container">
      <h2 className="screen-title">SELECT MISSION</h2>
      <div className="mission-options">
        {Object.entries(missions).map(([key, mission]) => (
          <div 
            key={key} 
            className={`mission-card ${selectedMission === key ? 'selected' : ''}`}
            onClick={() => setSelectedMission(key as MissionType)}
          >
            <h3>{mission.name}</h3>
            <p>{mission.description}</p>
            <div className="mission-stats">
              <div>FUEL: {mission.fuel}</div>
              <div>GRAVITY: {mission.gravity.toFixed(2)}</div>
              <div>ALTITUDE: {mission.initialAltitude}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="button-group">
        <button className="back-button" onClick={() => setActiveScreen('main')}>BACK</button>
        <button className="start-button" onClick={handleStartMission}>START MISSION</button>
      </div>
      <style jsx>{`
        .menu-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          padding: 20px;
        }
        
        .screen-title {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          color: #00ff00;
          font-size: 24px;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .mission-options {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
          max-width: 600px;
          margin-bottom: 30px;
        }
        
        .mission-card {
          background-color: rgba(0, 0, 0, 0.7);
          border: 2px solid #00ff00;
          padding: 15px;
          color: #00ff00;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .mission-card:hover {
          background-color: rgba(0, 255, 0, 0.1);
        }
        
        .mission-card.selected {
          background-color: rgba(0, 255, 0, 0.2);
          border-color: #ffff00;
          box-shadow: 0 0 10px #ffff00;
        }
        
        .mission-card h3 {
          margin: 0 0 10px 0;
          font-size: 16px;
          font-weight: bold;
        }
        
        .mission-card p {
          margin: 0 0 10px 0;
          font-size: 14px;
        }
        
        .mission-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          border-top: 1px solid #00ff00;
          padding-top: 10px;
        }
        
        .button-group {
          display: flex;
          gap: 20px;
        }
        
        .back-button, .start-button {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          background-color: transparent;
          color: #00ff00;
          border: 2px solid #00ff00;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .start-button {
          background-color: #00ff00;
          color: #000000;
        }
        
        .back-button:hover, .start-button:hover {
          background-color: #00ff00;
          color: #000000;
        }
      `}</style>
    </div>
  );
  
  const renderInstructions = () => (
    <div className="menu-container">
      <h2 className="screen-title">INSTRUCTIONS</h2>
      <div className="content-box">
        <h3>CONTROLS:</h3>
        <p>SPACE - Thrust</p>
        <p>LEFT/RIGHT ARROWS - Rotate</p>
        <p>R - Reset Game</p>
        
        <h3>OBJECTIVE:</h3>
        <p>1. Launch from Earth</p>
        <p>2. Achieve orbit</p>
        <p>3. Transfer to the Moon</p>
        <p>4. Land safely on the landing pad</p>
        
        <h3>TIPS:</h3>
        <p>- Conserve fuel</p>
        <p>- Watch your velocity</p>
        <p>- Align with the landing pad</p>
      </div>
      <button className="back-button" onClick={() => setActiveScreen('main')}>BACK</button>
      <style jsx>{`
        .menu-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          padding: 20px;
        }
        
        .screen-title {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          color: #00ff00;
          font-size: 24px;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .content-box {
          background-color: rgba(0, 0, 0, 0.7);
          border: 2px solid #00ff00;
          padding: 20px;
          max-width: 600px;
          width: 100%;
          color: #00ff00;
          font-family: 'Courier New', monospace;
          margin-bottom: 30px;
        }
        
        .content-box h3 {
          margin-top: 20px;
          margin-bottom: 10px;
          font-size: 16px;
        }
        
        .content-box p {
          margin: 5px 0;
          font-size: 14px;
        }
        
        .back-button {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          background-color: transparent;
          color: #00ff00;
          border: 2px solid #00ff00;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .back-button:hover {
          background-color: #00ff00;
          color: #000000;
        }
      `}</style>
    </div>
  );
  
  const renderCredits = () => (
    <div className="menu-container">
      <h2 className="screen-title">CREDITS</h2>
      <div className="content-box">
        <h3>DEVELOPED BY:</h3>
        <p>Your Name</p>
        
        <h3>USING:</h3>
        <p>Next.js</p>
        <p>TypeScript</p>
        <p>Three.js</p>
        <p>React Three Fiber</p>
        
        <h3>INSPIRED BY:</h3>
        <p>Classic Lunar Lander (1979)</p>
        <p>Retro gaming aesthetics</p>
      </div>
      <button className="back-button" onClick={() => setActiveScreen('main')}>BACK</button>
      <style jsx>{`
        .menu-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          padding: 20px;
        }
        
        .screen-title {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          color: #00ff00;
          font-size: 24px;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .content-box {
          background-color: rgba(0, 0, 0, 0.7);
          border: 2px solid #00ff00;
          padding: 20px;
          max-width: 600px;
          width: 100%;
          color: #00ff00;
          font-family: 'Courier New', monospace;
          margin-bottom: 30px;
        }
        
        .content-box h3 {
          margin-top: 20px;
          margin-bottom: 10px;
          font-size: 16px;
        }
        
        .content-box p {
          margin: 5px 0;
          font-size: 14px;
        }
        
        .back-button {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          background-color: transparent;
          color: #00ff00;
          border: 2px solid #00ff00;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .back-button:hover {
          background-color: #00ff00;
          color: #000000;
        }
      `}</style>
    </div>
  );
  
  return (
    <>
      {activeScreen === 'main' && renderMainMenu()}
      {activeScreen === 'missions' && renderMissionSelector()}
      {activeScreen === 'instructions' && renderInstructions()}
      {activeScreen === 'credits' && renderCredits()}
    </>
  );
};

export default StartMenu; 