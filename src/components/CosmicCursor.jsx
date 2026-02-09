import React, { useEffect, useRef, useState } from 'react';

const CosmicCursor = () => {
    const canvasRef = useRef(null);
    const [color, setColor] = useState('#FFD700'); // Default Gold

    // Zodiac Colors Configuration
    const zodiacColors = {
        'aries': '#FF4500',
        'taurus': '#32CD32',
        'gemini': '#FFD700',
        'cancer': '#C0C0C0',
        'leo': '#FFA500',
        'virgo': '#8B4513',
        'libra': '#FFB6C1',
        'scorpio': '#800080',
        'sagittarius': '#4169E1',
        'capricorn': '#2F4F4F',
        'aquarius': '#00FFFF',
        'pisces': '#1E90FF'
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Resize Canvas
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Particle System
        const particles = [];
        const mouse = { x: -100, y: -100 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Create new particles on move
            for (let i = 0; i < 3; i++) {
                particles.push({
                    x: mouse.x,
                    y: mouse.y,
                    size: Math.random() * 3 + 1,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1,
                    life: 100,
                    color: color
                });
            }
        };

        const handleHover = (e) => {
            // Find closest zodiac card or element with data-sign attribute
            const target = e.target.closest('[class*="zodiac-card"]');

            if (target) {
                // Try to identify sign from class or content (simplified for visual effect)
                // Assuming the component structure has some identifier. 
                // We'll search for the sign name in the text content for now as a robust fallback.
                const text = target.innerText.toLowerCase();

                let foundSign = Object.keys(zodiacColors).find(sign => {
                    const italianName = {
                        'aries': 'ariete', 'taurus': 'toro', 'gemini': 'gemelli', 'cancer': 'cancro',
                        'leo': 'leone', 'virgo': 'vergine', 'libra': 'bilancia', 'scorpio': 'scorpione',
                        'sagittarius': 'sagittario', 'capricorn': 'capricorno', 'aquarius': 'acquario', 'pisces': 'pesci'
                    }[sign];
                    return text.includes(italianName);
                });

                if (foundSign) {
                    setColor(zodiacColors[foundSign]);
                }
            } else {
                setColor('#FFD700'); // Reset to Gold
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleHover); // Use mouseover for event delegation

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear but keep slight trail? No, clear fully for crisp particles.

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= 2;
                p.size *= 0.95; // Shrink

                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }

            // Draw "Tube" connecting particles? Or just glowing trail?
            // "Tube" implied smooth path. Let's add simple connecting line for the "Tube" effect
            if (particles.length > 2) {
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particles[0].x, particles[0].y);
                for (let i = 1; i < particles.length - 1; i += 2) { // Skip some for smoother curve
                    const xc = (particles[i].x + particles[i + 1].x) / 2;
                    const yc = (particles[i].y + particles[i + 1].y) / 2;
                    ctx.quadraticCurveTo(particles[i].x, particles[i].y, xc, yc);
                }
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleHover);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color]); // Re-bind when color changes to update particle generation color

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
};

export default CosmicCursor;
