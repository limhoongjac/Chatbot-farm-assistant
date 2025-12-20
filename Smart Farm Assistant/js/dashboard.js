class Dashboard {
    constructor() {
        this.initChart();
        this.startRealtimeUpdates();
        this.initToggles();
    }

    initChart() {
        const ctx = document.getElementById('mainChart');
        if (!ctx) return;

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'Temperature (°C)',
                    data: [22, 21, 23, 26, 25, 23],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Humidity (%)',
                    data: [65, 68, 70, 60, 58, 62],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#9ca3af' }
                    }
                },
                scales: {
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#9ca3af' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#9ca3af' }
                    }
                }
            }
        });
    }

    startRealtimeUpdates() {
        // Simulate sensor data updates
        setInterval(() => {
            this.updateStats();
        }, 3000);
    }

    updateStats() {
        const temp = (22 + Math.random() * 5).toFixed(1);
        const humidity = Math.floor(55 + Math.random() * 20);

        const tempEl = document.getElementById('temp-value');
        const humidityEl = document.getElementById('humidity-value');

        if (tempEl) tempEl.textContent = `${temp}°C`;
        if (humidityEl) humidityEl.textContent = `${humidity}%`;
    }

    initToggles() {
        const toggles = document.querySelectorAll('input[type="checkbox"]');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const state = e.target.checked ? 'ON' : 'OFF';
                const controlName = e.target.closest('.control-item').querySelector('h4').textContent;

                if (window.showNotification) {
                    window.showNotification(`${controlName} turned ${state}`);
                }
            });
        });
    }
}
