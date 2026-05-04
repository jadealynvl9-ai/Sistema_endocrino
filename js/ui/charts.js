export function drawHormoneChart(canvas, niveles, labels) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    if (!niveles || niveles.length === 0) return;
    
    const barWidth = (w - 40) / niveles.length - 4;
    const maxVal = Math.max(...niveles, 1);
    ctx.fillStyle = '#3b82f6';
    for (let i = 0; i < niveles.length; i++) {
        let barHeight = (niveles[i] / maxVal) * (h - 30);
        let x = 20 + i * (barWidth + 5);
        let y = h - 10 - barHeight;
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.fillStyle = '#1e293b';
        ctx.font = '8px sans-serif';
        let shortLabel = labels[i] ? labels[i].substring(0, 6) : '';
        ctx.fillText(shortLabel, x, h - 2);
        ctx.fillStyle = '#3b82f6';
    }
    ctx.fillStyle = '#000';
    ctx.fillText("Hormonas (valores relativos)", 10, 12);
}