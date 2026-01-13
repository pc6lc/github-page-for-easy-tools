# Easy Tools Collection 🛠️

A comprehensive collection of web-based developer tools that can be accessed via GitHub Pages. This project provides various utilities commonly needed by developers, including encoding/decoding tools, generators, formatters, and a special QR code tool with mobile-friendly viewing.

## 🌟 Features

### Available Tools

1. **Base64 Encoder/Decoder** 🔐
   - Encode text to Base64 format
   - Decode Base64 back to readable text
   - Copy results with one click

2. **UUID Generator** 🆔
   - Generate UUID v4 (Random) and UUID v1 (Timestamp)
   - Bulk generation (up to 100 UUIDs)
   - Individual and bulk copy functionality

3. **QR Code Generator** 📱
   - Generate QR codes from any text or URL
   - Download QR codes as PNG images
   - **Special Feature**: Create shareable URLs that display content on mobile devices
   - Mobile-optimized viewer with tap-to-copy functionality

4. **URL Encoder/Decoder** 🔗
   - URL encode text for safe transmission
   - Decode URL-encoded strings
   - Perfect for query parameters and special characters

5. **Hash Generator** #️⃣
   - Generate MD5, SHA1, SHA256, and SHA512 hashes
   - Copy individual hashes
   - Support for any input text

6. **JSON Formatter** 📄
   - Format/prettify JSON with proper indentation
   - Minify JSON for production use
   - Validate JSON syntax with detailed error messages
   - Analyze JSON structure (type, properties count, etc.)

## 🚀 QR Code Tool Special Functionality

The QR Code tool has a unique feature that allows you to:

1. **Input any text or content**
2. **Generate a QR code**
3. **Create a shareable URL** that, when scanned:
   - Opens a mobile-friendly viewer page
   - Displays your content in a readable format
   - Provides a "tap to copy" interface
   - Works perfectly on smartphones and tablets

### How it Works:
1. Enter your content in the QR Code Generator
2. Click "Generate QR Code"
3. Click "Get Shareable Link"
4. The QR code will contain a URL that opens your content in a mobile viewer
5. Anyone scanning the QR code can view and copy your content instantly

## 🌐 Live Demo

Access the tools at: `https://[your-username].github.io/github-page-for-easy-tools`

## 🛠️ Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/github-page-for-easy-tools.git
   cd github-page-for-easy-tools
   ```

2. Open in a local server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have serve installed)
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open `http://localhost:8000` in your browser

## 📁 Project Structure

```
├── index.html              # Main page with tool navigation
├── styles/
│   └── main.css            # Comprehensive styles for all tools
├── scripts/
│   ├── qr-generator.js     # QR code generation logic
│   ├── base64.js           # Base64 encoding/decoding
│   └── uuid-generator.js   # UUID generation
├── tools/
│   ├── qr-generator.html   # QR code tool
│   ├── viewer.html         # Mobile-friendly content viewer
│   ├── base64.html         # Base64 tool
│   ├── uuid-generator.html # UUID generator
│   ├── url-encoder.html    # URL encoding tool
│   ├── hash-generator.html # Hash generation tool
│   └── json-formatter.html # JSON formatter
├── .github/
│   └── workflows/
│       └── pages.yml       # GitHub Pages deployment
└── README.md               # This file
```

## 🚀 Deployment to GitHub Pages

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "GitHub Actions" as the source

2. **Push your changes**:
   ```bash
   git add .
   git commit -m "Initial commit: Easy Tools Collection"
   git push origin main
   ```

3. **Access your live site**:
   - Your tools will be available at: `https://[your-username].github.io/[repository-name]`

## 🎨 Features & Technologies

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with Font Awesome icons
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Fast Loading**: Optimized assets and minimal dependencies
- **Offline Capable**: Most tools work without internet connection

### External Dependencies
- Font Awesome 6.0.0 (for icons)
- QRCode.js 1.5.3 (for QR code generation)
- CryptoJS 4.1.1 (for hash generation)

## 📱 Mobile Optimization

The QR Code viewer is specifically optimized for mobile devices with:
- Touch-friendly interface
- Large tap targets
- Automatic text selection
- Native share API integration
- Responsive typography
- Minimal bandwidth usage

## 🔧 Customization

### Adding New Tools

1. Create a new HTML file in the `tools/` directory
2. Include the main CSS: `../styles/main.css`
3. Follow the existing tool structure with:
   - Navigation header with back button
   - Form inputs
   - Result section
   - Footer
4. Add the tool card to `index.html`

### Styling

The project uses CSS custom properties (variables) for consistent theming. Main colors can be changed in the `:root` selector in `main.css`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new tools
- Improve existing functionality
- Fix bugs
- Enhance mobile experience
- Improve accessibility

## 📞 Support

If you find these tools useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting issues
- 💡 Suggesting new features
- 🔄 Sharing with others

---

Built with ❤️ for the developer community