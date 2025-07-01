// File: script.js

document.addEventListener('DOMContentLoaded', () => {
  const muteToggle = document.getElementById('mute-toggle');
  const iframe = document.getElementById('lofi-stream');
  const bgSelector = document.getElementById('bg-selector');
  const ambience = document.getElementById('ambience');
  const themeToggle = document.getElementById('theme-toggle');
  const rainSlider = document.getElementById('rain-audio');
  const cafeSlider = document.getElementById('cafe-audio');
  const forestSlider = document.getElementById('forest-audio');
  const audioRain = document.getElementById('audio-rain');
  const audioCafe = document.getElementById('audio-cafe');
  const audioForest = document.getElementById('audio-forest');
  const quoteEl = document.getElementById('quote');
  const focusMin = document.getElementById('focus-minutes');
  const timerEl = document.getElementById('timer');
  const startPomo = document.getElementById('start-pomo');
  const resetPomo = document.getElementById('reset-pomo');

  let muted = true;
  let pomoTime = 1500;
  let pomoInterval = null;
  let focusTime = 0;
  let theme = localStorage.getItem('theme') || 'light';

  // Mute toggle
  muteToggle.addEventListener('click', () => {
    muted = !muted;
    const src = iframe.src.replace(/(&|\?)mute=\d/, `$1mute=${muted ? 1 : 0}`);
    iframe.src = src;
    muteToggle.textContent = muted ? '🔇' : '🔊';
  });

  // Background selector
  bgSelector.addEventListener('change', (e) => {
    const bg = e.target.value;
    localStorage.setItem('bg', bg);
    switch(bg) {
      case 'forest':
        ambience.style.backgroundImage = "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1950&q=80')";
        break;
      case 'cafe':
        ambience.style.backgroundImage = "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80')";
        break;
      case 'rain':
        ambience.style.backgroundImage = "url('https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1950&q=80')";
        break;
    }
  });

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', theme);
  });

  // Load saved theme/bg
  if (theme === 'dark') document.body.classList.add('dark');
  const savedBg = localStorage.getItem('bg');
  if (savedBg) bgSelector.value = savedBg;
  bgSelector.dispatchEvent(new Event('change'));

  // Ambient audio sliders
  rainSlider.addEventListener('input', () => audioRain.volume = rainSlider.value);
  cafeSlider.addEventListener('input', () => audioCafe.volume = cafeSlider.value);
  forestSlider.addEventListener('input', () => audioForest.volume = forestSlider.value);

  [audioRain, audioCafe, audioForest].forEach(a => a.play());

  // Quotes
  const quotes = [
    "Stay focused and never give up.",
    "Vibe with your vision.",
    "Every minute counts.",
    "Flow state activated.",
    "One task at a time."
  ];
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  // Pomodoro
  function updateTimerDisplay() {
    let m = Math.floor(pomoTime / 60);
    let s = pomoTime % 60;
    timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  startPomo.addEventListener('click', () => {
    if (!pomoInterval) {
      pomoInterval = setInterval(() => {
        if (pomoTime > 0) {
          pomoTime--;
          focusTime++;
          updateTimerDisplay();
          focusMin.textContent = Math.floor(focusTime / 60);
        } else {
          clearInterval(pomoInterval);
          pomoInterval = null;
          alert("Pomodoro complete!");
        }
      }, 1000);
    }
  });

  resetPomo.addEventListener('click', () => {
    clearInterval(pomoInterval);
    pomoInterval = null;
    pomoTime = 1500;
    focusTime = 0;
    updateTimerDisplay();
    focusMin.textContent = '0';
  });

  updateTimerDisplay();

  // Particles
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedY: Math.random() * 0.5 + 0.2
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.y += p.speedY;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = '#fff3';
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
});
