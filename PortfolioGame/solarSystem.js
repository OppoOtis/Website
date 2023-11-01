const canvas = document.getElementById('solarSystem');
const context = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the sun and planets
const sun = { x: canvas.width / 2, y: canvas.height / 2, radius: 50, color: 'yellow' };

const planets = [
    {
        name: 'Mercury',
        radius: sun.radius * 0.2,
        distance: sun.radius * 5,
        angle: 0,
        color: 'gray',
        speed: 0.02,
    },
    {
        name: 'Venus',
        radius: sun.radius * 0.3,
        distance: sun.radius * 7,
        angle: 0,
        color: 'orange',
        speed: 0.015,
    },
    {
        name: 'Earth',
        radius: sun.radius * 0.3,
        distance: sun.radius * 10,
        angle: 0,
        color: 'blue',
        speed: 0.01,
    },
    // Add more planets here
];

// Define a variable to track the hovered planet (initialize it as null)
let hoveredPlanet = null;

// Function to draw a planet
function drawPlanet(planet) {
    context.beginPath();
    context.arc(
        sun.x + planet.distance * Math.cos(planet.angle),
        sun.y + planet.distance * Math.sin(planet.angle),
        planet.radius,
        0,
        2 * Math.PI
    );
    context.fillStyle = planet.color;
    context.fill();
}

// Function to render the tooltip
function renderTooltip(x, y, text) {
    const tooltipWidth = 100;
    const tooltipHeight = 30;

    context.beginPath();
    context.rect(x, y, tooltipWidth, tooltipHeight);
    context.fillStyle = 'rgba(255, 255, 255, 0.8)';
    context.fill();

    context.font = '14px Arial';
    context.fillStyle = 'black';
    context.fillText(text, x + 10, y + 20);
}

// Add an event listener to track mouse movement over the canvas
canvas.addEventListener('mousemove', (e) => {
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;

    // Check if the mouse is over a planet
    for (const planet of planets) {
        const planetX = sun.x + planet.distance * Math.cos(planet.angle);
        const planetY = sun.y + planet.distance * Math.sin(planet.angle);
        const distance = Math.sqrt((x - planetX) ** 2 + (y - planetY) ** 2);

        if (distance <= planet.radius) {
            hoveredPlanet = planet;
            return;
        }
    }

    // If the mouse is not over any planet, reset the hovered planet
    hoveredPlanet = null;
});

// Add an event listener to render the tooltip
canvas.addEventListener('mousemove', (e) => {
    if (hoveredPlanet) {
        const x = e.clientX + 10;
        const y = e.clientY + 10;

        renderTooltip(x, y, hoveredPlanet.name);
    }
});

// Add an event listener to hide the tooltip when the mouse leaves the canvas
canvas.addEventListener('mouseleave', () => {
    hoveredPlanet = null;
    context.clearRect(0, 0, canvas.width, canvas.height);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the sun
    context.beginPath();
    context.arc(sun.x, sun.y, sun.radius, 0, 2 * Math.PI);
    context.fillStyle = sun.color;
    context.fill();

    // Update and draw the planets
    planets.forEach((planet) => {
        planet.angle += planet.speed;
        planet.radius = sun.radius * 0.2;
        drawPlanet(planet);
    });
}

animate();
