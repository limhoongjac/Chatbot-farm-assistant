class Chatbot {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-btn');
        this.quickActions = document.getElementById('quick-actions');
        this.clearChatBtn = document.getElementById('clear-chat');
        this.isProcessing = false;

        this.init();
    }

    init() {
        if (!this.chatMessages) return;

        // Event Listeners
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.handleUserMessage());
        }

        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleUserMessage();
            });
        }

        if (this.clearChatBtn) {
            this.clearChatBtn.addEventListener('click', () => this.clearChat());
        }

        // Initial Message
        this.addBotMessage("Hello! I'm your Smart Farm Assistant. How can I help you today?");
        this.updateQuickActions(['Planting tips', 'Pest control', 'Soil health', 'Watering schedule']);
    }

    handleUserMessage() {
        if (this.isProcessing) return;

        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message
        this.addUserMessage(message);
        this.chatInput.value = '';
        this.isProcessing = true;

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate processing delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processMessage(message);
            this.isProcessing = false;
        }, 1000 + Math.random() * 500);
    }

    processMessage(message) {
        const response = this.generateResponse(message);
        this.addBotMessage(response);

        // Update quick actions based on context
        if (typeof helperFunctions !== 'undefined') {
            const suggestions = helperFunctions.getFollowUpSuggestions(message);
            this.updateQuickActions(suggestions);
        }
    }

    generateResponse(message) {
        const q = message.toLowerCase();

        // Basic greetings
        if (q.match(/^(hi|hello|hey|greetings)/)) {
            return "Hello! Ready to grow something amazing today?";
        }

        // Use knowledge base
        if (typeof helperFunctions !== 'undefined') {
            return helperFunctions.generateResponse(message);
        }

        return "I'm having trouble accessing my knowledge base right now.";
    }

    addUserMessage(text) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message user';
        messageEl.innerHTML = `
            <div class="message-avatar"><i class="fas fa-user"></i></div>
            <div class="message-content">${this.escapeHtml(text)}</div>
        `;
        this.chatMessages.appendChild(messageEl);
        this.scrollToBottom();
    }

    addBotMessage(text) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message bot';
        messageEl.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">${this.formatMessage(text)}</div>
        `;
        this.chatMessages.appendChild(messageEl);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;

        const messageEl = document.createElement('div');
        messageEl.className = 'message bot';
        messageEl.id = 'typing-message';
        messageEl.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content"></div>
        `;
        messageEl.querySelector('.message-content').appendChild(indicator);

        this.chatMessages.appendChild(messageEl);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingMessage = document.getElementById('typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    updateQuickActions(actions) {
        if (!this.quickActions) return;

        this.quickActions.innerHTML = '';
        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'quick-btn';
            btn.textContent = action;
            btn.addEventListener('click', () => {
                this.chatInput.value = action;
                this.handleUserMessage();
            });
            this.quickActions.appendChild(btn);
        });
    }

    clearChat() {
        this.chatMessages.innerHTML = '';
        this.addBotMessage("Chat cleared. How can I help you?");
        this.updateQuickActions(['Planting tips', 'Pest control', 'Soil health']);
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatMessage(text) {
        // Convert URLs to links
        let formatted = text.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" style="color: var(--primary-color); text-decoration: underline;">$1</a>'
        );
        return formatted;
    }
}
