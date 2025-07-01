<!-- File: index.php -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lo-Fi Lounge</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <header>
      <h1>Lo-Fi Lounge</h1>
      <p>Relax, focus, and vibe with ambient soundscapes.</p>
      <div class="quote" id="quote"></div>
    </header>

    <main>
      <div class="player glass">
        <iframe id="lofi-stream" src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>
        <div class="controls">
          <button id="mute-toggle">🔊</button>
          <select id="bg-selector">
            <option value="forest">Forest</option>
            <option value="cafe">Café</option>
            <option value="rain">Rain</option>
          </select>
          <button id="theme-toggle">🌙</button>
        </div>
        <div class="sliders">
          <label>Rain <input type="range" id="rain-audio" min="0" max="1" step="0.01" /></label>
          <label>Café <input type="range" id="cafe-audio" min="0" max="1" step="0.01" /></label>
          <label>Forest <input type="range" id="forest-audio" min="0" max="1" step="0.01" /></label>
        </div>
        <div class="pomodoro">
          <span id="timer">25:00</span>
          <button id="start-pomo">▶ Start</button>
          <button id="reset-pomo">🔄 Reset</button>
        </div>
      </div>

      <section class="ambience" id="ambience"></section>
    </main>

    <footer>
      <p><span id="focus-minutes">0</span> minutes focused • <span id="viewer-count">12,309</span> students vibing • Lo-Fi Lounge © 2025</p>
    </footer>
  </div>

  <audio id="audio-rain" src="rain.mp3" loop></audio>
  <audio id="audio-cafe" src="cafe.mp3" loop></audio>
  <audio id="audio-forest" src="forest.mp3" loop></audio>

  <canvas id="particles"></canvas>

  <script src="script.js"></script>
</body>
</html>
