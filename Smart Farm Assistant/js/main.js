document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    if (typeof Dashboard !== 'undefined') {
        const dashboard = new Dashboard();
    }

    if (typeof Chatbot !== 'undefined') {
        const chatbot = new Chatbot();
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                !sidebar.contains(e.target) &&
                !menuToggle.contains(e.target) &&
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Add global notification helper
    window.showNotification = function (message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--bg-card);
            color: var(--text-main);
            padding: 12px 24px;
            border-radius: var(--radius-md);
            border: 1px solid var(--primary-color);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        toast.innerHTML = `<i class="fas fa-info-circle" style="color: var(--primary-color)"></i> ${message}`;
        document.body.appendChild(toast);

        // Slide in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
});
