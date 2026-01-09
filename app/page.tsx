'use client'

import { useState } from 'react';

export default function Home() {
  const [players, setPlayers] = useState<{ id: number, name: string, numbers: number[], markedNumbers: number[] }[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [playerNumbers, setPlayerNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [numberInput, setNumberInput] = useState('');
  const [drawnNumberInput, setDrawnNumberInput] = useState('');
  const [bulkNumberInput, setBulkNumberInput] = useState('');

  // Add a player with their numbers
  const addPlayer = () => {
    if (playerName.trim() === '') {
      alert('Lütfen oyuncu adı girin');
      return;
    }

    if (playerNumbers.length !== 5) {
      alert('Lütfen tam olarak 5 sayı girin');
      return;
    }

    const newPlayer = {
      id: Date.now(),
      name: playerName,
      numbers: [...playerNumbers].sort((a, b) => a - b),
      markedNumbers: []
    };

    setPlayers([...players, newPlayer]);
    setPlayerName('');
    setPlayerNumbers([]);
    setNumberInput('');
    setBulkNumberInput('');
  };

  // Handle bulk number input (comma separated)
  const handleBulkNumberInput = () => {
    const numbersText = bulkNumberInput.trim();
    if (!numbersText) {
      alert('Lütfen sayıları girin');
      return;
    }

    const numbers = numbersText
      .split(/[,\s]+/)
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n) && n >= 1 && n <= 50);

    if (numbers.length !== 5) {
      alert('Lütfen 1-50 arasında tam olarak 5 geçerli sayı girin');
      return;
    }

    const uniqueNumbers = [...new Set(numbers)];
    if (uniqueNumbers.length !== 5) {
      alert('Lütfen 5 farklı sayı girin');
      return;
    }

    setPlayerNumbers(uniqueNumbers.sort((a, b) => a - b));
    setBulkNumberInput('');
  };

  // Handle player number input
  const handleNumberInput = () => {
    const num = parseInt(numberInput);
    if (isNaN(num) || num < 1 || num > 50) {
      alert('Lütfen 1-50 arasında geçerli bir sayı girin');
      return;
    }

    if (playerNumbers.includes(num)) {
      alert('Bu sayı zaten eklenmiş');
      return;
    }

    if (playerNumbers.length >= 5) {
      alert('En fazla 5 sayı seçebilirsiniz');
      return;
    }

    setPlayerNumbers([...playerNumbers, num].sort((a, b) => a - b));
    setNumberInput('');
  };

  // Manually enter a drawn number
  const handleDrawnNumberInput = () => {
    const num = parseInt(drawnNumberInput);
    if (isNaN(num) || num < 1 || num > 50) {
      alert('Lütfen 1-50 arasında geçerli bir sayı girin');
      return;
    }

    if (drawnNumbers.includes(num)) {
      alert('Bu sayı zaten çekilmiş');
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
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-7xl font-bold gold-text animate-shimmer">🎰 TOMBALA 🎰</p>
      </div>

      {/* Winner Banner */}
      {winner && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 border-2 border-green-300 text-white px-6 py-4 rounded-xl mb-6 shadow-2xl">
          <p className="text-2xl font-bold text-center">🏆 Kazanan: {winner} 🏆</p>
          <div className="flex justify-center mt-3">
            <button onClick={resetGame} className="bg-white text-green-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Tekrar Oyna
            </button>
          </div>
        </div>
      )}

      {/* Main Layout - Two Columns */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column - Controls */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          
          {/* Oyuncu Ekle */}
          <div className="p-5 bg-white/10 rounded-xl shadow-xl backdrop-blur-md border border-white/20">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="text-2xl">👤</span> Oyuncu Ekle
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Oyuncu Adı"
                className="border-0 p-3 rounded-lg bg-white/80 text-black placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              
              {/* Toplu Sayı Ekleme */}
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-white/80 text-sm mb-2">📦 Toplu Sayı Girişi</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Örnek: 5, 12, 23, 34, 45"
                    className="border-0 p-2 rounded-lg w-full bg-white/80 text-black placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    value={bulkNumberInput}
                    onChange={(e) => setBulkNumberInput(e.target.value)}
                  />
                  <button
                    onClick={handleBulkNumberInput}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap text-sm font-medium"
                  >
                    Ekle
                  </button>
                </div>
              </div>

              {/* Tek Tek Sayı Ekleme */}
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-white/80 text-sm mb-2">➕ Tek Tek Sayı Girişi</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    placeholder="1-50"
                    className="border-0 p-2 rounded-lg w-full bg-white/80 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                  />
                  <button
                    onClick={handleNumberInput}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Ekle
                  </button>
                </div>
              </div>
              
              {/* Seçilmiş Sayılar */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white/80 text-sm">Seçilmiş ({playerNumbers.length}/5):</span>
                {playerNumbers.map((num) => (
                  <span key={num} className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                    {num}
                  </span>
                ))}
                {playerNumbers.length === 0 && <span className="text-white/50 text-sm">-</span>}
              </div>
              
              <button
                onClick={addPlayer}
                disabled={playerNumbers.length !== 5}
                className={`mt-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  playerNumbers.length !== 5
                    ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg'
                }`}
              >
                ✓ Oyuncu Ekle
              </button>
            </div>
          </div>

          {/* Oyun Kontrolleri */}
          <div className="p-5 bg-white/10 rounded-xl shadow-xl backdrop-blur-md border border-white/20">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="text-2xl">🎮</span> Oyun Kontrolleri
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Çekilen sayıyı girin (1-50)"
                  className="border-0 p-3 rounded-lg w-full bg-white/80 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={drawnNumberInput}
                  onChange={(e) => setDrawnNumberInput(e.target.value)}
                  disabled={winner !== null}
                />
                <button
                  onClick={handleDrawnNumberInput}
                  disabled={players.length === 0 || winner !== null}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    players.length === 0 || winner !== null
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700'
                  }`}
                >
                  Çek
                </button>
              </div>

              {/* Şuanki Sayı */}
              {currentNumber && (
                <div className="text-center p-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                  <p className="text-sm text-black/70 font-medium">Çekilen Sayı</p>
                  <p className="text-5xl font-bold text-black">{currentNumber}</p>
                </div>
              )}

              {/* Çekilmiş Sayılar */}
              <div>
                <h3 className="font-semibold text-white/80 mb-2">Çekilmiş Sayılar ({drawnNumbers.length}/50)</h3>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-white/5 rounded-lg">
                  {drawnNumbers.length === 0 ? (
                    <span className="text-white/40 text-sm">Henüz sayı çekilmedi</span>
                  ) : (
                    drawnNumbers.map((num) => (
                      <span
                        key={num}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          num === currentNumber 
                            ? 'bg-yellow-400 text-black' 
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {num}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Players */}
        <div className="lg:w-1/2">
          <div className="p-5 bg-white/10 rounded-xl shadow-xl backdrop-blur-md border border-white/20 h-full">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="text-2xl">👥</span> Oyuncular 
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{players.length}</span>
            </h2>
            
            {players.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="text-6xl mb-4">🎯</span>
                <p className="text-white/60">Henüz oyuncu yok!</p>
                <p className="text-white/40 text-sm">Sol taraftan oyuncu ekleyin</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {[...players]
                  .sort((a, b) => {
                    // En az kalan sayısı olan (en çok işaretlenen) üstte
                    const remainingA = a.numbers.length - a.markedNumbers.length;
                    const remainingB = b.numbers.length - b.markedNumbers.length;
                    return remainingA - remainingB;
                  })
                  .map((player, index) => {
                  const remainingCount = player.numbers.length - player.markedNumbers.length;
                  const isWinner = remainingCount === 0;
                  return (
                    <div 
                      key={player.id} 
                      className={`p-4 rounded-xl transition-all ${
                        isWinner 
                          ? 'bg-gradient-to-r from-green-500/30 to-emerald-600/30 border-2 border-green-400' 
                          : 'bg-white/10 border border-white/10 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-white flex items-center gap-2">
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs mr-1">#{index + 1}</span>
                            {player.name}
                            {isWinner && <span className="text-xl">🏆</span>}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                                style={{ width: `${(player.markedNumbers.length / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-white/60 text-xs">{player.markedNumbers.length}/5</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removePlayer(player.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-1 rounded transition-all text-sm"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {player.numbers.map((num) => (
                          <span
                            key={num}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                              player.markedNumbers.includes(num)
                                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 scale-105'
                                : 'bg-white/20 text-white/80'
                            }`}
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                      
                      {remainingCount > 0 && (
                        <p className="text-white/40 text-xs mt-2">
                          Kalan: {player.numbers.filter(n => !player.markedNumbers.includes(n)).join(', ')}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}