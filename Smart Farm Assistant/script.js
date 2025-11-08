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
    console.log('initChatbot function called');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const quickActions = document.querySelector('.quick-actions');
    
    console.log('Chatbot elements:', { 
        chatMessages, 
        chatInput, 
        sendButton, 
        quickActions 
    });
    
    if (!chatMessages || !chatInput || !sendButton) {
        console.log('Chatbot elements not found');
        alert('Chatbot elements not found! Check console for details.');
        return;
    }
    
    console.log('All chatbot elements found, proceeding with setup');
    
    // Add a test to verify the chatbot is working
    setTimeout(() => {
        console.log('Running chatbot test...');
        if (chatInput && sendButton) {
            chatInput.value = "Hello, testing chatbot";
            sendButton.click();
            console.log('Test message sent');
        }
    }, 3000);
    
    // Create typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-seedling"></i>
        </div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    
    // Chat history
    let chatHistory = [];
    let isProcessing = false;
    
    // Add welcome message
    addBotMessage('Welcome to Farm Chat! How can I help with your farming questions today?');
    
    // Alert to show chatbot is working
    alert('Chatbot initialized successfully! Try typing a message like "tomato" or "pest control"');
    
    // Test the knowledge base
    console.log('Testing knowledge base...');
    if (typeof farmingTopics !== 'undefined') {
        console.log('Knowledge base loaded:', Object.keys(farmingTopics));
        console.log('Available topics:', Object.keys(farmingTopics).join(', '));
    } else {
        console.error('Knowledge base not loaded!');
        alert('Error: Knowledge base not loaded. Chatbot may not work properly.');
    }
    
    // Setup event listeners
    console.log('Setting up event listeners');
    sendButton.addEventListener('click', function() {
        console.log('Send button clicked');
        handleUserMessage();
    });
    
    chatInput.addEventListener('keypress', (e) => {
        console.log('Key pressed:', e.key);
        if (e.key === 'Enter') {
            console.log('Enter key pressed');
            e.preventDefault();
            handleUserMessage();
        }
    });
    
    // Setup quick action buttons
    setupQuickActions();
    
    function setupQuickActions() {
        const quickTopics = [
            'Planting tips', 
            'Pest control', 
            'Soil health', 
            'Watering schedule',
            'Organic farming',
            'Seasonal crops'
        ];
        
        quickTopics.forEach(topic => {
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
    
    function handleUserMessage() {
        console.log('handleUserMessage called');
        if (isProcessing) {
            console.log('Message processing blocked - already processing');
            return;
        }
        
        const message = chatInput.value.trim();
        console.log('Message from input:', message);
        if (!message) {
            console.log('Empty message, returning');
            return;
        }
        
        // Add user message to chat
        console.log('Adding user message:', message);
        addUserMessage(message);
        chatInput.value = '';
        
        // Process the message
        console.log('Processing message');
        processUserMessage(message);
    }
    
    function processUserMessage(message) {
        isProcessing = true;
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate processing delay
        setTimeout(() => {
            // Hide typing indicator
            hideTypingIndicator();
            
            // Get response from knowledge base
            const response = getResponseFromKnowledgeBase(message);
            
            // Add bot response
            addBotMessage(response);
            
            isProcessing = false;
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
    
    function getResponseFromKnowledgeBase(message) {
        // Convert message to lowercase for case-insensitive matching
        const query = message.toLowerCase();
        
        console.log('Processing message:', query);
        
        // Simple keyword matching for common topics
        if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
            return "Hello! I'm your Farm Assistant. I can help with farming questions about crops, soil, pests, irrigation, and more. What would you like to know?";
        }
        
        if (query.includes('tomato')) {
            return "Tomatoes need full sun, well-drained soil, and consistent watering. Plant them deeply, burying 2/3 of the stem for strong roots. Provide support with stakes or cages and remove suckers for indeterminate varieties.";
        }
        
        if (query.includes('pest')) {
            return "For pest control, try integrated pest management (IPM). This includes crop rotation, beneficial insects, physical barriers, and organic sprays like neem oil. For specific pests like aphids, spray with strong water or use insecticidal soap.";
        }
        
        if (query.includes('water') || query.includes('irrigation')) {
            return "Water deeply and infrequently to encourage deep root growth. Most plants need 1-2 inches of water per week. Morning watering reduces evaporation and disease risk. Drip irrigation is most efficient for many crops.";
        }
        
        if (query.includes('soil')) {
            return "Healthy soil is the foundation of successful farming. Most plants prefer well-drained soil with a pH between 6.0-7.0. Add organic matter through compost and practice crop rotation to maintain soil health.";
        }
        
        // Check knowledge base if available
        if (typeof farmingTopics !== 'undefined') {
            for (const category in farmingTopics) {
                const topicData = farmingTopics[category];
                for (const keyword of topicData.keywords) {
                    if (query.includes(keyword.toLowerCase())) {
                        const responses = topicData.responses;
                        if (Array.isArray(responses)) {
                            return responses[Math.floor(Math.random() * responses.length)];
                        }
                        return responses.general || responses.planting || responses.care || "I found information about " + keyword + ". Let me know what specific aspect you'd like to know about.";
                    }
                }
            }
        }
        
        // Default response
        return "I can help with many farming topics! Try asking about tomatoes, pest control, watering, soil health, or specific crops. What would you like to know?";
    }
    
    function calculateRelevanceScore(query, keyword, allKeywords) {
        // Basic relevance scoring
        let score = 0;
        
        // Direct keyword match
        if (query.includes(keyword.toLowerCase())) {
            score += 0.5;
            
            // Exact match or question about the keyword
            if (query === keyword.toLowerCase() || 
                query === `what is ${keyword.toLowerCase()}` || 
                query === `how to ${keyword.toLowerCase()}`) {
                score += 0.3;
            }
        }
        
        // Check for related keywords
        allKeywords.forEach(relatedKeyword => {
            if (relatedKeyword !== keyword && query.includes(relatedKeyword.toLowerCase())) {
                score += 0.2;
            }
        });
        
        return score;
    }
    
    function isGeneralQuestion(query) {
        const generalPatterns = [
            'hello', 'hi', 'hey', 'greetings',
            'how are you', 'what can you do',
            'help', 'who are you', 'what is this'
        ];
        
        return generalPatterns.some(pattern => query.includes(pattern));
    }
    
    function handleGeneralQuestion(query) {
        if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('greetings')) {
            return "Hello! I'm your Smart Farm Assistant. How can I help with your farming needs today?";
        }
        
        if (query.includes('how are you')) {
            return "I'm functioning well and ready to help with your farming questions!";
        }
        
        if (query.includes('what can you do') || query.includes('help')) {
            return "I can help with various farming topics like crop selection, planting schedules, pest control, soil management, and more. Just ask me a specific question or click one of the quick action buttons below!";
        }
        
        if (query.includes('who are you') || query.includes('what is this')) {
            return "I'm your Smart Farm Assistant chatbot, designed to provide information and advice on agricultural topics. I can help with planting guidance, pest management, and other farming questions.";
        }
        
        return "I'm here to help with your farming questions. Feel free to ask about crops, planting, pest control, or other agricultural topics!";
    }
    
    function formatResponse(responses) {
        // If responses is an array, pick a random one
        if (Array.isArray(responses)) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // If it's a string, return it directly
        if (typeof responses === 'string') {
            return responses;
        }
        
        // If it's an object with specific response types, format accordingly
        if (responses.general) {
            return responses.general;
        }
        
        return "Here's some information that might help with your farming question.";
    }
    
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${escapeHTML(message)}</p>`;
        
        messageElement.appendChild(avatar);
        messageElement.appendChild(content);
        
        chatMessages.appendChild(messageElement);
        scrollToBottom();
        
        // Add to chat history
        chatHistory.push({ type: 'user', message });
    }
    
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-seedling"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = formatMessageHTML(message);
        
        messageElement.appendChild(avatar);
        messageElement.appendChild(content);
        
        chatMessages.appendChild(messageElement);
        scrollToBottom();
        
        // Add to chat history
        chatHistory.push({ type: 'bot', message });
    }
    
    function formatMessageHTML(message) {
        // Convert URLs to links
        let formattedMessage = message.replace(
            /(https?:\/\/[^\s]+)/g, 
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        
        // Convert line breaks to <br>
        formattedMessage = formattedMessage.replace(/\n/g, '<br>');
        
        // Format lists (lines starting with - or *)
        if (formattedMessage.includes('\n- ') || formattedMessage.includes('\n* ')) {
            const lines = formattedMessage.split('<br>');
            let inList = false;
            let formattedLines = [];
            
            for (const line of lines) {
                if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                    if (!inList) {
                        formattedLines.push('<ul>');
                        inList = true;
                    }
                    formattedLines.push(`<li>${line.trim().substring(2)}</li>`);
                } else {
                    if (inList) {
                        formattedLines.push('</ul>');
                        inList = false;
                    }
                    formattedLines.push(line);
                }
            }
            
            if (inList) {
                formattedLines.push('</ul>');
            }
            
            formattedMessage = formattedLines.join('');
        }
        
        return formattedMessage;
    }
    
    function showTypingIndicator() {
        chatMessages.appendChild(typingIndicator);
        scrollToBottom();
    }
    
    function hideTypingIndicator() {
        if (typingIndicator.parentNode === chatMessages) {
            chatMessages.removeChild(typingIndicator);
        }
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
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