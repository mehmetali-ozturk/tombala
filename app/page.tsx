'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [players, setPlayers] = useState<{ id: number, name: string, numbers: number[], markedNumbers: number[] }[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [playerNumbers, setPlayerNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [numberInput, setNumberInput] = useState('');
  const [drawnNumberInput, setDrawnNumberInput] = useState('');

  // Add a player with their numbers
  const addPlayer = () => {
    if (playerName.trim() === '') {
      alert('Please enter a player name');
      return;
    }

    if (playerNumbers.length !== 5) {
      alert('Please enter exactly 5 numbers');
      return;
    }

    const newPlayer = {
      id: Date.now(),
      name: playerName,
      numbers: playerNumbers,
      markedNumbers: []
    };

    setPlayers([...players, newPlayer]);
    setPlayerName('');
    setPlayerNumbers([]);
    setNumberInput('');
  };

  // Handle player number input
  const handleNumberInput = () => {
    const num = parseInt(numberInput);
    if (isNaN(num) || num < 1 || num > 90) {
      alert('Please enter a valid number between 1 and 90');
      return;
    }

    if (playerNumbers.includes(num)) {
      alert('This number is already added');
      return;
    }

    if (playerNumbers.length >= 5) {
      alert('You can only select 5 numbers');
      return;
    }

    setPlayerNumbers([...playerNumbers, num]);
    setNumberInput('');
  };

  // Manually enter a drawn number
  const handleDrawnNumberInput = () => {
    const num = parseInt(drawnNumberInput);
    if (isNaN(num) || num < 1 || num > 90) {
      alert('Please enter a valid number between 1 and 90');
      return;
    }

    if (drawnNumbers.includes(num)) {
      alert('This number has already been drawn');
      return;
    }

    setCurrentNumber(num);
    setDrawnNumbers([...drawnNumbers, num]);

    // Mark the number for each player if they have it
    const updatedPlayers = players.map(player => {
      if (player.numbers.includes(num)) {
        return {
          ...player,
          markedNumbers: [...player.markedNumbers, num]
        };
      }
      return player;
    });

    setPlayers(updatedPlayers);

    // Check for winner(s)
    updatedPlayers.forEach(player => {
      if (player.markedNumbers.length === 5) {
        setWinner(player.name);
      }
    });

    setDrawnNumberInput('');
  };

  // Remove a player
  const removePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  // Reset the game
  const resetGame = () => {
    setPlayers([]);
    setCurrentNumber(null);
    setDrawnNumbers([]);
    setWinner(null);
  };





  return (
    <>

      {/* Main content */}
      <div className="relative z-10 items-center justify-center flex flex-col">
       <p className="text-7xl font-bold text-center gold-text animate-shimmer mb-8">777</p>

        {winner && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 w-full max-w-3xl backdrop-blur-md">
            <p className="text-xl font-bold">Kazanan: {winner} 🎉</p>
            <button onClick={resetGame} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              Tekrar Oyna
            </button>
          </div>
        )}

        <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg backdrop-blur-md bg-opacity-10 mb-4 border-2 border-black">
          <h2 className="text-xl font-bold mb-4 text-white">Oyuncu Ekle</h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Oyuncu Adı"
              className="border p-2 rounded bg-white/70 backdrop-blur-md bg-opacity-50 text-black"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="50"
                placeholder="Sayı Ekle (1-50)"
                className="border p-2 rounded w-full bg-white/70 backdrop-blur-md bg-opacity-50 text-black"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
              />
              <button
                onClick={handleNumberInput}
                className="bg-blue-500/70 text-white px-4 py-2 rounded hover:bg-blue-600/70 transition-colors"
              >
                Sayı Ekle
              </button>
            </div>
            
            <div className="mt-2 text-white">
              <p>Seçilmiş Sayılar: <span className="font-bold">{playerNumbers.join(', ')}</span></p>
            </div>
            
            <button
              onClick={addPlayer}
              className="mt-2 bg-green-500/70 text-white px-4 py-2 rounded hover:bg-green-600/70 transition-colors"
            >
              Oyuncu Ekle
            </button>
          </div>
        </div>

        <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg backdrop-blur-md bg-opacity-10 mb-4 border-2 border-black">
          <h2 className="text-xl font-bold mb-2 text-white drop-shadow-lg">Oyuncular</h2>
          {players.length === 0 ? (
            <p className="bg-white p-4 rounded-lg shadow-lg bg-opacity-10 text-white">Henüz oyuncu yok! Oynamak için oyuncu ekle.</p>
          ) : (
            <div className="space-y-4 ">
              {players.map((player) => (
                <div key={player.id} className="border p-4 rounded-lg bg-white shadow-lg bg-opacity-20">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{player.name}</h3>
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      Kaldır
                    </button>
                  </div>
                  <div className="mt-2">
                    <p>Sayılar: <span className="font-medium">{player.numbers.join(', ')}</span></p>
                    <p>
                      İşaretli Sayılar: 
                      <span className="text-green-600 font-semibold"> {player.markedNumbers.join(', ')}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg backdrop-blur-md bg-opacity-10 mb-4 border-2 border-black">
          <h2 className="text-xl font-bold mb-2 text-white drop-shadow-lg ">Oyun Kontrolleri</h2>
          <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg bg-opacity-10">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="90"
                placeholder="Çıkmış sayıyı girin (1-50)"
                className="border p-2 rounded w-full bg-white/70 backdrop-blur-md bg-opacity-50 text-black"
                value={drawnNumberInput}
                onChange={(e) => setDrawnNumberInput(e.target.value)}
                disabled={winner !== null}
              />
              <button
                onClick={handleDrawnNumberInput}
                disabled={players.length === 0 || winner !== null}
                className={`px-4 py-2 rounded ${
                  players.length === 0 || winner !== null
                    ? 'bg-gray-300/50 cursor-not-allowed text-white'
                    : 'bg-blue-500/50 text-white hover:bg-blue-600/50 transition-colors text-w'
                }`}
              >
                Sayıyı Çek
              </button>
            </div>

            {currentNumber && (
              <div className="text-center p-4 bg-yellow-100 rounded-lg border border-yellow-200   ">
                <p className="text-lg">Şuanki Sayı:</p>
                <p className="text-4xl font-bold">{currentNumber}</p>
              </div>
            )}

            <div>
              <h3 className="font-bold text-white">Çekilmiş Sayılar:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {drawnNumbers.map((num) => (
                  <span
                    key={num}
                    className="inline-block w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}