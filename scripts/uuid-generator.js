class UUIDGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.versionSelect = document.getElementById('versionSelect');
        this.quantityInput = document.getElementById('quantityInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.copyAllBtn = document.getElementById('copyAllBtn');
        this.resultSection = document.getElementById('resultSection');
        this.uuidList = document.getElementById('uuidList');
        this.alertContainer = document.getElementById('alertContainer');

        this.bindEvents();
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateUUIDs());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.copyAllBtn.addEventListener('click', () => this.copyAllUUIDs());
    }

    generateUUIDs() {
        const version = parseInt(this.versionSelect.value);
        const quantity = parseInt(this.quantityInput.value);
        
        if (quantity < 1 || quantity > 100) {
            this.showAlert('Please enter a number between 1 and 100', 'error');
            return;
        }

        const uuids = [];
        for (let i = 0; i < quantity; i++) {
            uuids.push(version === 4 ? this.generateUUIDv4() : this.generateUUIDv1());
        }

        this.displayUUIDs(uuids);
        this.showAlert(`${quantity} UUID${quantity > 1 ? 's' : ''} generated successfully!`, 'success');
    }

    generateUUIDv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    generateUUIDv1() {
        // Simplified UUID v1 implementation
        const timestamp = Date.now();
        const clockSeq = Math.floor(Math.random() * 0x4000);
        const node = Math.floor(Math.random() * 0x1000000000000);
        
        const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0');
        const timeMid = ((timestamp >>> 32) & 0xffff).toString(16).padStart(4, '0');
        const timeHigh = (((timestamp >>> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, '0');
        const clockSeqHigh = ((clockSeq >>> 8) | 0x80).toString(16).padStart(2, '0');
        const clockSeqLow = (clockSeq & 0xff).toString(16).padStart(2, '0');
        const nodeHex = node.toString(16).padStart(12, '0');
        
        return `${timeLow}-${timeMid}-${timeHigh}-${clockSeqHigh}${clockSeqLow}-${nodeHex}`;
    }

    displayUUIDs(uuids) {
        this.uuidList.innerHTML = '';
        
        uuids.forEach((uuid, index) => {
            const uuidItem = document.createElement('div');
            uuidItem.className = 'uuid-item';
            uuidItem.innerHTML = `
                <div class="uuid-display">
                    <code class="uuid-text">${uuid}</code>
                    <button class="btn copy-btn" onclick="uuidGenerator.copyUUID('${uuid}', ${index})">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            `;
            this.uuidList.appendChild(uuidItem);
        });

        this.resultSection.classList.remove('hidden');
        
        // Add CSS for UUID items if not already added
        if (!document.getElementById('uuid-styles')) {
            const style = document.createElement('style');
            style.id = 'uuid-styles';
            style.textContent = `
                .uuid-item {
                    margin-bottom: 0.5rem;
                }
                .uuid-display {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.75rem;
                    background: #f8fafc;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                }
                .uuid-text {
                    flex: 1;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9rem;
                    color: var(--text-primary);
                    background: transparent;
                    user-select: all;
                }
                .uuid-display .copy-btn {
                    padding: 0.5rem;
                    font-size: 0.8rem;
                    min-width: auto;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Scroll to result
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    async copyUUID(uuid, index) {
        try {
            await navigator.clipboard.writeText(uuid);
            this.showAlert(`UUID ${index + 1} copied to clipboard!`, 'success');
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = uuid;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showAlert(`UUID ${index + 1} copied to clipboard!`, 'success');
        }
    }

    async copyAllUUIDs() {
        const uuidTexts = Array.from(document.querySelectorAll('.uuid-text')).map(el => el.textContent);
        const allUUIDs = uuidTexts.join('\n');
        
        try {
            await navigator.clipboard.writeText(allUUIDs);
            this.showAlert('All UUIDs copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = allUUIDs;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showAlert('All UUIDs copied to clipboard!', 'success');
        }
    }

    clearAll() {
        this.uuidList.innerHTML = '';
        this.resultSection.classList.add('hidden');
        this.quantityInput.value = '1';
        this.clearAlerts();
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
let uuidGenerator;
document.addEventListener('DOMContentLoaded', () => {
    uuidGenerator = new UUIDGenerator();
});