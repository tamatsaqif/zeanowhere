// ========================================
// CANVAS WAVES — OMBOK KELIHATAN + BUIH PUTIH
// ========================================

const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let time = 0;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawWaves() {
    ctx.clearRect(0, 0, width, height);
    
    const centerY = height / 2;
    const spread = height * 0.4;
    
    // ========================================
    // OMBOK 1 (PALING ATAS)
    // ========================================
    ctx.beginPath();
    ctx.moveTo(0, 0);
    let wave1Points = [];
    for (let x = 0; x <= width; x += 2) {
        const y = centerY - spread * 0.9 + 
                  Math.sin(x * 0.025 + time * 0.02) * 20 +
                  Math.sin(x * 0.015 + time * 0.015 + 1) * 15;
        wave1Points.push({x, y});
        ctx.lineTo(x, y);
    }
    ctx.lineTo(width, 0);
    ctx.closePath();
    
    const grad1 = ctx.createLinearGradient(0, centerY - spread, 0, centerY - spread * 0.5);
    grad1.addColorStop(0, 'rgba(227, 242, 253, 0.25)');
    grad1.addColorStop(0.5, 'rgba(144, 202, 249, 0.15)');
    grad1.addColorStop(1, 'rgba(33, 150, 243, 0.04)');
    ctx.fillStyle = grad1;
    ctx.fill();
    
    // ===== BUIH PUTIH OUTLINE OMBOK 1 =====
    ctx.beginPath();
    for (let i = 0; i < wave1Points.length; i++) {
        const p = wave1Points[i];
        if (i === 0) {
            ctx.moveTo(p.x, p.y);
        } else {
            ctx.lineTo(p.x, p.y);
        }
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.15)';
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // ===== BUIH TITIK-TITIK DI SEPANJANG OMBOK 1 =====
    for (let i = 0; i < wave1Points.length; i += 14) {
        const p = wave1Points[i];
        const size = 3.5 + Math.sin(time * 0.02 + i * 0.08) * 1.8 + 1.5;
        const alpha = 0.25 + Math.sin(time * 0.025 + i * 0.05) * 0.12 + 0.15;
        
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        
        // Titik buih putih
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        ctx.fill();
        
        // Buih kecil di sekitar
        for (let j = 0; j < 2; j++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = size * (0.6 + Math.random() * 0.6);
            const bx = p.x + Math.cos(angle) * dist;
            const by = p.y + Math.sin(angle) * dist * 0.5;
            ctx.beginPath();
            ctx.arc(bx, by, 1 + Math.random() * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
            ctx.fill();
        }
    }
    
    // ========================================
    // OMBOK 2 (TENGAH)
    // ========================================
    ctx.beginPath();
    ctx.moveTo(0, centerY - spread * 0.3);
    let wave2Points = [];
    for (let x = 0; x <= width; x += 2) {
        const y = centerY + spread * 0.05 + 
                  Math.sin(x * 0.02 + time * 0.018 + 2) * 25 +
                  Math.sin(x * 0.01 + time * 0.01 + 3) * 20;
        wave2Points.push({x, y});
        ctx.lineTo(x, y);
    }
    ctx.lineTo(width, centerY - spread * 0.3);
    ctx.closePath();
    
    const grad2 = ctx.createLinearGradient(0, centerY - spread * 0.2, 0, centerY + spread * 0.3);
    grad2.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
    grad2.addColorStop(0.5, 'rgba(144, 202, 249, 0.12)');
    grad2.addColorStop(1, 'rgba(33, 150, 243, 0.03)');
    ctx.fillStyle = grad2;
    ctx.fill();
    
    // ===== BUIH PUTIH OUTLINE OMBOK 2 =====
    ctx.beginPath();
    for (let i = 0; i < wave2Points.length; i++) {
        const p = wave2Points[i];
        if (i === 0) {
            ctx.moveTo(p.x, p.y);
        } else {
            ctx.lineTo(p.x, p.y);
        }
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.10)';
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // ===== BUIH TITIK-TITIK DI SEPANJANG OMBOK 2 =====
    for (let i = 0; i < wave2Points.length; i += 18) {
        const p = wave2Points[i];
        const size = 3 + Math.sin(time * 0.025 + i * 0.06) * 1.5 + 1;
        const alpha = 0.2 + Math.sin(time * 0.03 + i * 0.04) * 0.1 + 0.12;
        
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 1.8);
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.fill();
    }
    
    // ========================================
    // OMBOK 3 (PALING BAWAH)
    // ========================================
    ctx.beginPath();
    ctx.moveTo(0, centerY + spread * 0.2);
    let wave3Points = [];
    for (let x = 0; x <= width; x += 2) {
        const y = centerY + spread * 0.7 + 
                  Math.sin(x * 0.015 + time * 0.014 + 4) * 30 +
                  Math.sin(x * 0.008 + time * 0.012 + 5) * 25;
        wave3Points.push({x, y});
        ctx.lineTo(x, y);
    }
    ctx.lineTo(width, centerY + spread * 0.2);
    ctx.closePath();
    
    const grad3 = ctx.createLinearGradient(0, centerY + spread * 0.3, 0, centerY + spread * 0.9);
    grad3.addColorStop(0, 'rgba(144, 202, 249, 0.12)');
    grad3.addColorStop(0.5, 'rgba(33, 150, 243, 0.06)');
    grad3.addColorStop(1, 'rgba(13, 71, 161, 0.02)');
    ctx.fillStyle = grad3;
    ctx.fill();
    
    // ===== BUIH PUTIH OUTLINE OMBOK 3 =====
    ctx.beginPath();
    for (let i = 0; i < wave3Points.length; i++) {
        const p = wave3Points[i];
        if (i === 0) {
            ctx.moveTo(p.x, p.y);
        } else {
            ctx.lineTo(p.x, p.y);
        }
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.08)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // ===== BUIH TITIK-TITIK DI SEPANJANG OMBOK 3 =====
    for (let i = 0; i < wave3Points.length; i += 22) {
        const p = wave3Points[i];
        const size = 2.5 + Math.sin(time * 0.03 + i * 0.05) * 1.2 + 0.8;
        const alpha = 0.15 + Math.sin(time * 0.035 + i * 0.03) * 0.08 + 0.10;
        
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 1.5);
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
        ctx.fill();
    }
    
    time++;
    requestAnimationFrame(drawWaves);
}

drawWaves();

// ========================================
// RESIZE
// ========================================

window.addEventListener('resize', resizeCanvas);

// ========================================
// WAVE RIPPLE — MENGIKUTI CURSOR
// ========================================

const ripples = document.querySelectorAll('.wave-ripple');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    ripples.forEach((r, i) => {
        r.style.left = x + '%';
        r.style.top = y + '%';
        r.classList.add('active');
        r.style.transitionDelay = (i * 0.05) + 's';
    });
});

document.addEventListener('mouseleave', () => {
    ripples.forEach(r => r.classList.remove('active'));
});

console.log('🌊 Ombak + Buih siap!');