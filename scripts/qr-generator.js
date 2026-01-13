class QRGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.textInput = document.getElementById('textInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.qrResult = document.getElementById('qrResult');
        this.qrCodeContainer = document.getElementById('qrcode');
        this.shareResult = document.getElementById('shareResult');
        this.shareUrl = document.getElementById('shareUrl');

        this.bindEvents();
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateQR());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.downloadBtn.addEventListener('click', () => this.downloadQR());
        this.shareBtn.addEventListener('click', () => this.generateShareableLink());
        
        this.textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateQR();
            }
        });

        // Handle copyable URL click
        this.shareUrl.addEventListener('click', () => this.copyToClipboard(this.shareUrl.textContent));
    }

    generateQR() {
        const text = this.textInput.value.trim();
        
        if (!text) {
            this.showAlert('Please enter some text to generate QR code', 'error');
            return;
        }

        // Clear previous QR code
        this.qrCodeContainer.innerHTML = '';
        this.shareResult.classList.add('hidden');

        // Check if QRCode library is loaded
        if (typeof QRCode === 'undefined') {
            this.showAlert('QR Code library failed to load. Please refresh the page and try again.', 'error');
            return;
        }

        // Show loading state
        this.qrCodeContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i><br>Generating QR Code...</div>';

        // Use a timeout to ensure the loading message displays
        setTimeout(() => {
            try {
                // Create canvas element
                const canvas = document.createElement('canvas');
                
                // Generate QR Code
                QRCode.toCanvas(canvas, text, {
                    width: 256,
                    height: 256,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    },
                    errorCorrectionLevel: 'M'
                }, (error) => {
                    if (error) {
                        this.showAlert('Error generating QR code: ' + error.message, 'error');
                        this.qrCodeContainer.innerHTML = '';
                        return;
                    }

                    // Clear loading state and show QR code
                    this.qrCodeContainer.innerHTML = '';
                    this.qrCodeContainer.appendChild(canvas);
                    this.qrResult.classList.remove('hidden');
                    this.showAlert('QR code generated successfully!', 'success');
                });
            } catch (error) {
                console.error('QRCode.js failed:', error);
                this.showAlert('Primary QR generator failed, trying fallback method...', 'info');
                
                // Use fallback method
                try {
                    window.generateQRFallback(text, this.qrCodeContainer);
                    this.qrResult.classList.remove('hidden');
                    this.showAlert('QR code generated using fallback method!', 'success');
                } catch (fallbackError) {
                    this.showAlert('Failed to generate QR code: ' + fallbackError.message, 'error');
                    this.qrCodeContainer.innerHTML = '';
                }
            }
        }, 100);
    }

    clearAll() {
        this.textInput.value = '';
        this.qrCodeContainer.innerHTML = '';
        this.qrResult.classList.add('hidden');
        this.shareResult.classList.add('hidden');
        this.removeAlerts();
    }

    downloadQR() {
        const canvas = this.qrCodeContainer.querySelector('canvas');
        const img = this.qrCodeContainer.querySelector('img');
        
        if (canvas) {
            // Download from canvas
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL();
            link.click();
            this.showAlert('QR code downloaded!', 'success');
        } else if (img) {
            // Download from image (fallback method)
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = img.src;
            link.target = '_blank';
            link.click();
            this.showAlert('QR code download started!', 'success');
        } else {
            this.showAlert('No QR code to download', 'error');
            return;
        }
    }

    generateShareableLink() {
        const text = this.textInput.value.trim();
        if (!text) {
            this.showAlert('Please generate a QR code first', 'error');
            return;
        }

        // Create a shareable URL that will display the content
        const encodedText = encodeURIComponent(text);
        const baseUrl = window.location.origin + window.location.pathname.replace('qr-generator.html', '');
        const shareableUrl = `${baseUrl}viewer.html?content=${encodedText}`;

        this.shareUrl.textContent = shareableUrl;
        this.shareResult.classList.remove('hidden');
        
        this.showAlert('Shareable link generated! The QR code will open this URL.', 'info');
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showAlert('URL copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showAlert('URL copied to clipboard!', 'success');
        }
    }

    showAlert(message, type = 'info') {
        this.removeAlerts();
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `<i class="fas fa-${this.getAlertIcon(type)}"></i> ${message}`;
        
        this.qrResult.insertBefore(alert, this.qrResult.firstChild);
        
        // Auto-remove success/info alerts after 3 seconds
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, 3000);
        }
    }

    removeAlerts() {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => alert.remove());
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
    new QRGenerator();
});