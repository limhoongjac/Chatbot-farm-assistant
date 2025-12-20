// Smart Farm Assistant - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
      // Initialize all components
    initMobileMenu();
    initCharts();
    initControlSystems();
    initNotifications();
    initChatbot();
    initLocationSettings();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header').prepend(menuToggle);

    menuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.querySelector('.main-content').addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('active');
        }
    });

    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .menu-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background-color: var(--primary-color);
                color: white;
                border-radius: 50%;
                cursor: pointer;
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 101;
                box-shadow: var(--box-shadow);
            }
            .main-content {
                padding-top: 4rem;
            }
        }
        @media (min-width: 769px) {
            .menu-toggle {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize Charts
function initCharts() {
    // Temperature Chart
    const tempCtx = document.createElement('canvas');
    tempCtx.id = 'temperatureChart';
    document.querySelector('.chart-placeholder:first-child').innerHTML = '';
    document.querySelector('.chart-placeholder:first-child').appendChild(tempCtx);

    const tempChart = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [22, 23, 25, 24, 22, 23, 24],
                borderColor: '#F44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 15,
                    max: 30
                }
            }
        }
    });

    // Resource Usage Chart
    const resourceCtx = document.createElement('canvas');
    resourceCtx.id = 'resourceChart';
    document.querySelector('.chart-placeholder:last-child').innerHTML = '';
    document.querySelector('.chart-placeholder:last-child').appendChild(resourceCtx);

    const resourceChart = new Chart(resourceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Water', 'Electricity', 'Fertilizer', 'Labor'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                    '#2196F3',
                    '#FF9800',
                    '#4CAF50',
                    '#9C27B0'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            cutout: '70%'
        }
    });
}

// Initialize Control Systems
function initControlSystems() {
    // Toggle switches
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const controlCard = this.closest('.control-card');
            const statusEl = controlCard.querySelector('.control-status');
            const statusDot = statusEl.querySelector('.status-dot');
            const statusText = statusEl.querySelector('span');
            
            if (this.checked) {
                statusEl.classList.remove('inactive');
                statusEl.classList.add('active');
                statusText.textContent = 'Active';
            } else {
                statusEl.classList.remove('active');
                statusEl.classList.add('inactive');
                statusText.textContent = 'Inactive';
            }
        });
    });

    // Run Now buttons
    const runButtons = document.querySelectorAll('.btn-secondary');
    
    runButtons.forEach(button => {
        button.addEventListener('click', function() {
            const controlCard = this.closest('.control-card');
            const controlName = controlCard.querySelector('h3').textContent;
            const switchEl = controlCard.querySelector('.switch input[type="checkbox"]');
            
            // Activate the system
            if (!switchEl.checked) {
                switchEl.checked = true;
                // Trigger the change event
                const event = new Event('change');
                switchEl.dispatchEvent(event);
            }
            
            // Show feedback
            this.textContent = 'Running...';
            setTimeout(() => {
                this.textContent = 'Run Now';
                showNotification(`${controlName} activated manually`);
            }, 2000);
        });
    });

    // Schedule buttons
    const scheduleButtons = document.querySelectorAll('.btn-outline');
    
    scheduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const controlCard = this.closest('.control-card');
            const controlName = controlCard.querySelector('h3').textContent;
            
            // In a real app, this would open a scheduling modal
            alert(`Schedule ${controlName} - This would open a scheduling interface in a real application`);
        });
    });
}

// Notifications System
function initNotifications() {
    // Notification bell click handler
    const notificationBell = document.querySelector('.notifications');
    
    notificationBell.addEventListener('click', function() {
        alert('Notifications - This would open the notifications panel in a real application');
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'toast-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add styles for the notification
    const style = document.createElement('style');
    style.textContent = `
        .toast-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s, fadeOut 0.5s 2.5s;
            animation-fill-mode: forwards;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove after animation completes
    setTimeout(() => {
        notification.remove();
    }, 3000);
    
    // Update notification count
    const countEl = document.querySelector('.notification-count');
    let count = parseInt(countEl.textContent);
    countEl.textContent = count + 1;
}

// Simulate real-time data updates (in a real app, this would come from an API or WebSocket)
function simulateRealTimeUpdates() {
    // Update temperature every 30 seconds with slight variations
    setInterval(() => {
        const tempElements = document.querySelectorAll('.stat-value');
        if (tempElements && tempElements.length > 0) {
            const currentTemp = parseFloat(tempElements[0].textContent);
            const newTemp = (currentTemp + (Math.random() * 0.6 - 0.3)).toFixed(1);
            tempElements[0].textContent = newTemp + '°C';
        }
    }, 30000);
}

// Call simulation after a delay to let the page load completely
setTimeout(simulateRealTimeUpdates, 5000);

// Chatbot Functionality
function initChatbot() {
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const quickActions = document.querySelector('.quick-actions');
    const clearChatBtn = document.getElementById('clear-chat');
    if (!chatMessages || !chatInput || !sendButton) return;
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<div class="message-avatar"><i class="fas fa-seedling"></i></div><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    const chatbot = {
        chatHistory: [],
        isProcessing: false,
        init() {
            if (!chatMessages.querySelector('.message')) {
                this.addBotMessage('Welcome to Farm Chat! How can I help with your farming questions today?');
            }
            sendButton.addEventListener('click', () => this.sendFromInput());
            chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); this.sendFromInput(); } });
            const buttons = quickActions ? quickActions.querySelectorAll('.quick-action-btn') : [];
            if (buttons.length) {
                buttons.forEach(btn => {
                    const query = btn.getAttribute('data-query') || btn.textContent.trim();
                    btn.addEventListener('click', () => { chatInput.value = query; this.sendFromInput(); });
                });
            } else if (quickActions) {
                this.updateQuickActions(['Planting tips','Pest control','Soil health','Watering schedule']);
            }
            if (clearChatBtn) clearChatBtn.addEventListener('click', () => this.clearChat());
            if (typeof knowledgeBase !== 'undefined' && knowledgeBase.getFollowUpSuggestions) this.updateQuickActions(knowledgeBase.getFollowUpSuggestions('help'));
        },
        sendFromInput() {
            if (this.isProcessing) return;
            const message = chatInput.value.trim();
            if (!message) return;
            this.addUserMessage(message);
            chatInput.value = '';
            this.processMessage(message);
        },
        processMessage(message) {
            this.isProcessing = true;
            this.showTypingIndicator();
            setTimeout(() => {
                this.hideTypingIndicator();
                const response = this.generateResponse(message);
                this.addBotMessage(response);
                if (typeof knowledgeBase !== 'undefined' && knowledgeBase.getFollowUpSuggestions) this.updateQuickActions(knowledgeBase.getFollowUpSuggestions(message));
                this.isProcessing = false;
            }, 1000 + Math.random() * 1000);
        },
        generateResponse(message) {
            const q = message.toLowerCase();
            const general = ['hello','hi','hey','greetings','how are you','what can you do','help','who are you','what is this'];
            if (general.some(t => q.includes(t))) {
                if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings')) return "Hello! I'm your Smart Farm Assistant. How can I help with your farming needs today?";
                if (q.includes('how are you')) return "I'm functioning well and ready to help with your farming questions!";
                if (q.includes('what can you do') || q.includes('help')) return "I can help with crop selection, planting schedules, pest control, soil management, irrigation, and more.";
                if (q.includes('who are you') || q.includes('what is this')) return "I'm your Smart Farm Assistant chatbot for agricultural guidance.";
                return "I'm here to help with your farming questions.";
            }
            if (typeof knowledgeBase !== 'undefined' && knowledgeBase.generateResponse) return knowledgeBase.generateResponse(q);
            if (q.includes('tomato')) return "Tomatoes need full sun, well-drained soil, and consistent watering. Plant them deeply and provide support.";
            if (q.includes('pest')) return "Use integrated pest management: rotation, beneficial insects, barriers, and approved sprays like neem oil.";
            if (q.includes('water') || q.includes('irrigation')) return "Water deeply and infrequently, preferably in the morning. Drip irrigation is efficient.";
            if (q.includes('soil')) return "Maintain well-drained soil with pH 6.0–7.0 and add organic matter like compost.";
            if (typeof farmingTopics !== 'undefined') {
                for (const k in farmingTopics) {
                    const d = farmingTopics[k];
                    for (const kw of d.keywords) {
                        if (q.includes(kw.toLowerCase())) {
                            const r = d.responses;
                            if (Array.isArray(r)) return r[Math.floor(Math.random()*r.length)];
                            return r.general || r.planting || r.care || "I found information that may help. Specify the aspect you need.";
                        }
                    }
                }
            }
            return "I can help with many farming topics. Try asking about tomatoes, pest control, watering, soil health, or specific crops.";
        },
        addUserMessage(message) {
            const el = document.createElement('div');
            el.className = 'message user-message';
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.innerHTML = '<i class="fas fa-user"></i>';
            const content = document.createElement('div');
            content.className = 'message-content';
            content.innerHTML = `<p>${this.escapeHTML(message)}</p>`;
            el.appendChild(avatar);
            el.appendChild(content);
            chatMessages.appendChild(el);
            this.scrollToBottom();
            this.chatHistory.push({ type: 'user', message });
        },
        addBotMessage(message) {
            const el = document.createElement('div');
            el.className = 'message bot-message';
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.innerHTML = '<i class="fas fa-seedling"></i>';
            const content = document.createElement('div');
            content.className = 'message-content';
            content.innerHTML = this.formatMessageHTML(message);
            el.appendChild(avatar);
            el.appendChild(content);
            chatMessages.appendChild(el);
            this.scrollToBottom();
            this.chatHistory.push({ type: 'bot', message });
        },
        formatMessageHTML(message) {
            let m = message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
            m = m.replace(/\n/g, '<br>');
            if (m.includes('\n- ') || m.includes('\n* ')) {
                const lines = m.split('<br>');
                let inList = false;
                const out = [];
                for (const line of lines) {
                    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                        if (!inList) { out.push('<ul>'); inList = true; }
                        out.push(`<li>${line.trim().substring(2)}</li>`);
                    } else {
                        if (inList) { out.push('</ul>'); inList = false; }
                        out.push(line);
                    }
                }
                if (inList) out.push('</ul>');
                m = out.join('');
            }
            return m;
        },
        showTypingIndicator() { chatMessages.appendChild(typingIndicator); this.scrollToBottom(); },
        hideTypingIndicator() { if (typingIndicator.parentNode === chatMessages) chatMessages.removeChild(typingIndicator); },
        scrollToBottom() { chatMessages.scrollTop = chatMessages.scrollHeight; },
        escapeHTML(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; },
        updateQuickActions(items) {
            if (!quickActions) return;
            quickActions.innerHTML = '';
            items.forEach(t => {
                const b = document.createElement('button');
                b.className = 'quick-action-btn';
                b.textContent = t;
                b.addEventListener('click', () => { chatInput.value = t; this.sendFromInput(); });
                quickActions.appendChild(b);
            });
        },
        clearChat() {
            chatMessages.innerHTML = '';
            this.chatHistory = [];
            this.addBotMessage('Chat cleared. How can I help with your farming questions?');
            if (typeof knowledgeBase !== 'undefined' && knowledgeBase.getFollowUpSuggestions) this.updateQuickActions(knowledgeBase.getFollowUpSuggestions('help'));
        }
    };
    chatbot.init();
}

// Location Settings Functionality
function initLocationSettings() {
    const locationForm = document.querySelector('.location-form');
    const regionSelect = document.getElementById('region');
    const climateSelect = document.getElementById('climate');
    const seasonSelect = document.getElementById('season');
    const saveLocationBtn = document.getElementById('save-location');
    const userLocationDisplay = document.querySelector('.user-location');
    const seasonIndicator = document.querySelector('.season-indicator');
    
    if (!locationForm || !regionSelect || !climateSelect || !seasonSelect || !saveLocationBtn) return;
    
    // Load saved location settings from localStorage
    loadLocationSettings();
    
    // Save location settings
    saveLocationBtn.addEventListener('click', () => {
        const region = regionSelect.value;
        const climate = climateSelect.value;
        const season = seasonSelect.value;
        
        if (region && climate && season) {
            // Save to localStorage
            const locationSettings = { region, climate, season };
            localStorage.setItem('farmLocationSettings', JSON.stringify(locationSettings));
            
            // Update UI
            updateLocationDisplay(region, climate, season);
            
            // Show notification
            showNotification(`Location settings updated: ${region}, ${climate}, ${season}`);
            
            // Update recommendations based on location
            updateRecommendations(locationSettings);
        } else {
            showNotification('Please select all location options', 'error');
        }
    });
    
    // Function to load saved location settings
    function loadLocationSettings() {
        const savedSettings = localStorage.getItem('farmLocationSettings');
        
        if (savedSettings) {
            const { region, climate, season } = JSON.parse(savedSettings);
            
            // Set select values
            if (regionSelect) regionSelect.value = region;
            if (climateSelect) climateSelect.value = climate;
            if (seasonSelect) seasonSelect.value = season;
            
            // Update UI
            updateLocationDisplay(region, climate, season);
            
            // Update recommendations
            updateRecommendations({ region, climate, season });
        }
    }
    
    // Function to update location display
    function updateLocationDisplay(region, climate, season) {
        if (userLocationDisplay) {
            userLocationDisplay.textContent = `${region}, ${climate}`;
        }
        
        if (seasonIndicator) {
            // Update season icon
            let seasonIcon = 'fa-sun';
            
            switch (season.toLowerCase()) {
                case 'spring':
                    seasonIcon = 'fa-seedling';
                    break;
                case 'summer':
                    seasonIcon = 'fa-sun';
                    break;
                case 'fall':
                case 'autumn':
                    seasonIcon = 'fa-leaf';
                    break;
                case 'winter':
                    seasonIcon = 'fa-snowflake';
                    break;
            }
            
            seasonIndicator.innerHTML = `<i class="fas ${seasonIcon}"></i> Current Season: ${season}`;
        }
    }
    
    // Function to update crop recommendations based on location
    function updateRecommendations(settings) {
        const { region, climate, season } = settings;
        
        // Get recommended crops based on location and season
        const recommendations = getRecommendedCrops(region, climate, season);
        
        // Update the recommendations in the UI
        const recommendationsContainer = document.querySelector('.crop-recommendations');
        
        if (recommendationsContainer) {
            recommendationsContainer.innerHTML = '';
            
            const heading = document.createElement('h3');
            heading.textContent = `Recommended Crops for ${region} (${climate}) - ${season}`;
            recommendationsContainer.appendChild(heading);
            
            const cropList = document.createElement('ul');
            cropList.className = 'recommended-crops-list';
            
            recommendations.forEach(crop => {
                const cropItem = document.createElement('li');
                cropItem.innerHTML = `<i class="fas fa-check-circle"></i> ${crop}`;
                cropList.appendChild(cropItem);
            });
            
            recommendationsContainer.appendChild(cropList);
        }
    }
    
    // Function to get recommended crops based on location and season
    function getRecommendedCrops(region, climate, season) {
        // This is a simplified version - in a real app, this would be more comprehensive
        // and potentially fetch from an API or database
        
        const recommendations = {
            'North America': {
                'Temperate': {
                    'Spring': ['Lettuce', 'Peas', 'Radishes', 'Spinach', 'Carrots'],
                    'Summer': ['Tomatoes', 'Peppers', 'Corn', 'Cucumbers', 'Zucchini'],
                    'Fall': ['Kale', 'Brussels Sprouts', 'Cabbage', 'Cauliflower', 'Broccoli'],
                    'Winter': ['Winter Squash', 'Garlic', 'Onions', 'Leeks', 'Cover Crops']
                },
                'Tropical': {
                    'Rainy': ['Rice', 'Taro', 'Sweet Potatoes', 'Cassava', 'Bananas'],
                    'Dry': ['Okra', 'Eggplant', 'Peppers', 'Melons', 'Beans']
                },
                'Arid': {
                    'Spring': ['Drought-resistant Beans', 'Peppers', 'Melons', 'Squash', 'Sunflowers'],
                    'Summer': ['Okra', 'Amaranth', 'Cowpeas', 'Millet', 'Sorghum'],
                    'Fall': ['Carrots', 'Beets', 'Turnips', 'Radishes', 'Garlic'],
                    'Winter': ['Cover Crops', 'Garlic', 'Onions', 'Herbs', 'Cold-hardy Greens']
                }
            },
            'Europe': {
                'Temperate': {
                    'Spring': ['Potatoes', 'Carrots', 'Peas', 'Lettuce', 'Spinach'],
                    'Summer': ['Tomatoes', 'Cucumbers', 'Beans', 'Zucchini', 'Corn'],
                    'Fall': ['Kale', 'Brussels Sprouts', 'Leeks', 'Cabbage', 'Beets'],
                    'Winter': ['Winter Squash', 'Garlic', 'Onions', 'Leeks', 'Cover Crops']
                },
                'Mediterranean': {
                    'Spring': ['Artichokes', 'Fava Beans', 'Peas', 'Lettuce', 'Fennel'],
                    'Summer': ['Tomatoes', 'Eggplant', 'Peppers', 'Zucchini', 'Basil'],
                    'Fall': ['Broccoli', 'Cauliflower', 'Cabbage', 'Spinach', 'Chard'],
                    'Winter': ['Citrus Fruits', 'Olives', 'Garlic', 'Onions', 'Winter Greens']
                }
            },
            'Asia': {
                'Temperate': {
                    'Spring': ['Bok Choy', 'Chinese Cabbage', 'Peas', 'Radishes', 'Spinach'],
                    'Summer': ['Rice', 'Soybeans', 'Eggplant', 'Cucumbers', 'Bitter Melon'],
                    'Fall': ['Daikon Radish', 'Chinese Broccoli', 'Cabbage', 'Carrots', 'Turnips'],
                    'Winter': ['Winter Squash', 'Garlic', 'Onions', 'Leeks', 'Cover Crops']
                },
                'Tropical': {
                    'Rainy': ['Rice', 'Taro', 'Sweet Potatoes', 'Cassava', 'Bananas'],
                    'Dry': ['Okra', 'Eggplant', 'Peppers', 'Melons', 'Beans']
                }
            },
            'Africa': {
                'Tropical': {
                    'Rainy': ['Cassava', 'Yams', 'Plantains', 'Taro', 'Rice'],
                    'Dry': ['Millet', 'Sorghum', 'Cowpeas', 'Okra', 'Drought-resistant Beans']
                },
                'Arid': {
                    'Spring': ['Drought-resistant Beans', 'Peppers', 'Melons', 'Squash', 'Sunflowers'],
                    'Summer': ['Okra', 'Amaranth', 'Cowpeas', 'Millet', 'Sorghum'],
                    'Fall': ['Carrots', 'Beets', 'Turnips', 'Radishes', 'Garlic'],
                    'Winter': ['Cover Crops', 'Garlic', 'Onions', 'Herbs', 'Cold-hardy Greens']
                }
            },
            'Australia': {
                'Temperate': {
                    'Spring': ['Lettuce', 'Peas', 'Radishes', 'Spinach', 'Carrots'],
                    'Summer': ['Tomatoes', 'Peppers', 'Corn', 'Cucumbers', 'Zucchini'],
                    'Fall': ['Kale', 'Brussels Sprouts', 'Cabbage', 'Cauliflower', 'Broccoli'],
                    'Winter': ['Winter Squash', 'Garlic', 'Onions', 'Leeks', 'Cover Crops']
                },
                'Tropical': {
                    'Rainy': ['Rice', 'Taro', 'Sweet Potatoes', 'Cassava', 'Bananas'],
                    'Dry': ['Okra', 'Eggplant', 'Peppers', 'Melons', 'Beans']
                },
                'Arid': {
                    'Spring': ['Drought-resistant Beans', 'Peppers', 'Melons', 'Squash', 'Sunflowers'],
                    'Summer': ['Okra', 'Amaranth', 'Cowpeas', 'Millet', 'Sorghum'],
                    'Fall': ['Carrots', 'Beets', 'Turnips', 'Radishes', 'Garlic'],
                    'Winter': ['Cover Crops', 'Garlic', 'Onions', 'Herbs', 'Cold-hardy Greens']
                }
            },
            'South America': {
                'Temperate': {
                    'Spring': ['Lettuce', 'Peas', 'Radishes', 'Spinach', 'Carrots'],
                    'Summer': ['Tomatoes', 'Peppers', 'Corn', 'Cucumbers', 'Zucchini'],
                    'Fall': ['Kale', 'Brussels Sprouts', 'Cabbage', 'Cauliflower', 'Broccoli'],
                    'Winter': ['Winter Squash', 'Garlic', 'Onions', 'Leeks', 'Cover Crops']
                },
                'Tropical': {
                    'Rainy': ['Rice', 'Taro', 'Sweet Potatoes', 'Cassava', 'Bananas'],
                    'Dry': ['Okra', 'Eggplant', 'Peppers', 'Melons', 'Beans']
                }
            }
        };
        
        // Get recommendations for the selected region, climate, and season
        try {
            return recommendations[region][climate][season] || 
                   ['Lettuce', 'Spinach', 'Kale', 'Herbs', 'Root vegetables']; // Default recommendations
        } catch (error) {
            console.log('Error getting crop recommendations:', error);
            return ['Lettuce', 'Spinach', 'Kale', 'Herbs', 'Root vegetables']; // Default recommendations
        }
    }
}
    function updateQuickActions(items) {
        if (!quickActions) return;
        quickActions.innerHTML = '';
        items.forEach(topic => {
            const button = document.createElement('button');
            button.className = 'quick-action-btn';
            button.textContent = topic;
            button.addEventListener('click', () => {
                chatInput.value = topic;
                handleUserMessage();
            });
            quickActions.appendChild(button);
        });
    }

    function clearChat() {
        chatMessages.innerHTML = '';
        chatHistory = [];
        addBotMessage('Chat cleared. How can I help with your farming questions?');
        if (typeof knowledgeBase !== 'undefined' && knowledgeBase.getFollowUpSuggestions) {
            updateQuickActions(knowledgeBase.getFollowUpSuggestions('help'));
        }
    }
