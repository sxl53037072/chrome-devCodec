# DevCodec - Developer Encoding/Decoding Tool

A Chrome browser extension providing all-in-one encoding/decoding tools for developers.

## Features

- **Base64** - Encode/decode text with Unicode support
- **URL** - Encode/decode URLs and query parameters
- **JWT** - Decode JWT tokens with Header, Payload, and expiry display
- **HTML** - Encode/decode HTML entities
- **Timestamp** - Convert between timestamp and datetime (seconds/milliseconds)
- **Hash** - Generate MD5 and SHA-256 hashes

## Installation

### Development
1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the extension folder

### Chrome Web Store (Coming Soon)
- Search for "DevCodec" in Chrome Web Store
- Click "Add to Chrome"

## Usage

1. Click the extension icon in Chrome toolbar
2. Select a tool from the left sidebar
3. Enter your text in the input field
4. Click Encode/Decode/Generate button
5. Copy the result with one click

## Screenshots

![Base64 Tool](screenshots/base64.png)
![JWT Decoder](screenshots/jwt.png)

## Technologies

- Manifest V3
- Vanilla JavaScript (no dependencies)
- CSS3 with dark/light theme support
- Web Crypto API for hash generation

## Privacy

- No data collection
- No network requests
- All processing happens locally in your browser
- No external APIs or services

## License

MIT License - See [LICENSE](LICENSE) file

## Contributing

Issues and pull requests are welcome!

## Changelog

### v1.0.0 (2026-03-26)
- Initial release
- Base64, URL, JWT, HTML, Timestamp, Hash tools
- Dark/Light theme support
- English/Chinese language support
