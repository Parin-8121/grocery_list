const boxes = document.querySelectorAll('.photo-box');
const resetBtn = document.getElementById('resetBtn');
const doneImage = document.getElementById('doneImage');
const photoGrid = document.querySelector('.photo-grid');
const heading = document.querySelector('h1');

// Create item counter display
const counter = document.createElement('p');
counter.id = 'itemStatus';
counter.style.marginTop = '20px';
counter.style.fontSize = '1rem';
counter.style.textAlign = 'center';
resetBtn.before(counter);

let itemCount = 0;
const totalItems = boxes.length;

// Initialize
updateCounter();

// Box click logic
boxes.forEach(box => {
  box.addEventListener('click', () => {
    box.classList.toggle('checked');
    itemCount = document.querySelectorAll('.photo-box.checked').length;
    updateCounter();

    if (itemCount === totalItems) {
      resetBtn.innerText = 'Done';
    } else {
      resetBtn.innerText = 'Reset';
    }
  });
});

// Reset or Done logic
resetBtn.addEventListener('click', () => {
  if (resetBtn.innerText === 'Done') {
    photoGrid.style.display = 'none';
    resetBtn.style.display = 'none';
    heading.style.display = 'none';
    counter.style.display = 'none';
    doneImage.style.display = 'block';
    launchConfetti();
  } else {
    boxes.forEach(box => box.classList.remove('checked'));
    itemCount = 0;
    updateCounter();
    resetBtn.innerText = 'Reset';
  }
});

function updateCounter() {
  counter.innerText = `${itemCount} of ${totalItems} items clicked`;
}

// Confetti
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  const particles = [];
  const colors = ['#00ffcc', '#ffffff', '#ff00aa', '#00bfff', '#ffcc00'];
  const numParticles = 150;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      speed: Math.random() * 3 + 2,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 2 * Math.PI
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
      ctx.fill();
      p.y += p.speed;
      p.x += Math.sin(p.angle);
      if (p.y > canvas.height) p.y = 0;
    }
    requestAnimationFrame(draw);
  }

  draw();
}
