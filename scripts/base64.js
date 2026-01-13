class Base64Tool {
    constructor() {
        this.init();
    }

    init() {
        this.inputText = document.getElementById('inputText');
        this.encodeBtn = document.getElementById('encodeBtn');
        this.decodeBtn = document.getElementById('decodeBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.resultSection = document.getElementById('resultSection');
        this.resultText = document.getElementById('resultText');
        this.alertContainer = document.getElementById('alertContainer');

        this.bindEvents();
    }

    bindEvents() {
        this.encodeBtn.addEventListener('click', () => this.encodeText());
        this.decodeBtn.addEventListener('click', () => this.decodeText());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.copyBtn.addEventListener('click', () => this.copyResult());
        
        this.inputText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.encodeText();
            }
        });
    }

    encodeText() {
        const text = this.inputText.value;
        
        if (!text.trim()) {
            this.showAlert('Please enter some text to encode', 'error');
            return;
        }

        try {
            const encoded = btoa(unescape(encodeURIComponent(text)));
            this.displayResult(encoded, 'Text encoded to Base64 successfully!');
        } catch (error) {
            this.showAlert('Error encoding text: ' + error.message, 'error');
        }
    }

    decodeText() {
        const text = this.inputText.value.trim();
        
        if (!text) {
            this.showAlert('Please enter Base64 text to decode', 'error');
            return;
        }

        try {
            const decoded = decodeURIComponent(escape(atob(text)));
            this.displayResult(decoded, 'Base64 decoded successfully!');
        } catch (error) {
            this.showAlert('Error decoding Base64: Invalid Base64 string', 'error');
        }
    }

    displayResult(result, message) {
        this.resultText.value = result;
        this.resultSection.classList.remove('hidden');
        this.showAlert(message, 'success');
        
        // Scroll to result
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    clearAll() {
        this.inputText.value = '';
        this.resultText.value = '';
        this.resultSection.classList.add('hidden');
        this.clearAlerts();
    }

    async copyResult() {
        try {
            await navigator.clipboard.writeText(this.resultText.value);
            this.showAlert('Result copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            this.resultText.select();
            document.execCommand('copy');
            this.showAlert('Result copied to clipboard!', 'success');
        }
    }

    showAlert(message, type = 'info') {
        this.clearAlerts();
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `<i class="fas fa-${this.getAlertIcon(type)}"></i> ${message}`;
        
        this.alertContainer.appendChild(alert);
        
        // Auto-remove success/info alerts after 3 seconds
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, 3000);
        }
    }

    clearAlerts() {
        this.alertContainer.innerHTML = '';
    }

    getAlertIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Base64Tool();
});