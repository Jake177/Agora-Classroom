# Agora Virtual Classroom

A real-time video conferencing and classroom application built with Agora.io SDK, supporting video/audio communication, screen sharing, and text messaging.

## Features

- 🎥 **Video Conferencing**: Real-time video and audio communication
- 🖥️ **Screen Sharing**: Share your screen with other participants
- 💬 **Real-time Messaging**: Text chat functionality
- 👥 **Participant Management**: See who's in the room
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎛️ **Media Controls**: Toggle camera and microphone on/off

## Prerequisites

Before you begin, ensure you have:

1. **Agora.io Account**: Sign up at [Agora Console](https://console.agora.io/)
2. **Web Server**: A local web server to serve the files (due to CORS restrictions)

## Quick Start

### 1. Get Your Agora App ID

1. Visit the [Agora Console](https://console.agora.io/)
2. Sign up or log in to your account
3. Create a new project or use an existing one
4. Copy your **App ID** from the project dashboard

### 2. Configure the Application

1. Navigate to the `js` folder
2. Open `config.js` file
3. Replace `"your_app_id_here"` with your actual Agora App ID:

```javascript
window.AGORA_CONFIG = {
    APP_ID: "your_actual_app_id_here"  // Replace with your Agora App ID
}
```

### 3. Run the Application

Since this is a web application that uses WebRTC, you need to serve it from a web server (not just open the HTML file directly).

#### Option 1: Using Python (if you have Python installed)

```bash
# Navigate to the project directory
cd path/to/Agora-Classroom

# For Python 3
python -m http.server 8000

# For Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser and go to `http://localhost:8000`

#### Option 2: Using Node.js (if you have Node.js installed)

```bash
# Install a simple HTTP server
npm install -g http-server

# Navigate to the project directory
cd path/to/Agora-Classroom

# Start the server
http-server -p 8000
```

Then open your browser and go to `http://localhost:8000`

#### Option 3: Using Live Server (VS Code Extension)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option 4: Using any other web server

You can use any web server of your choice (Apache, Nginx, IIS, etc.) to serve the files.

## How to Use

### Creating/Joining a Room

1. Open the application in your browser
2. Enter your display name
3. Enter a room ID (or leave blank for a random room)
4. Click "Join Meeting"

### In the Room

- **Join Stream**: Click the "Join" button to start your camera and microphone
- **Toggle Camera**: Click the camera button to turn your camera on/off
- **Toggle Microphone**: Click the microphone button to mute/unmute
- **Screen Share**: Click the screen share button to share your screen
- **Chat**: Click the chat button to open the messaging panel
- **Participants**: Click the participants button to see who's in the room
- **Leave**: Click the "Leave" button to exit the room

## File Structure

```
Agora-Classroom/
├── index.html              # Landing/lobby page
├── room.html              # Main classroom interface
├── js/
│   ├── config.js          # Configuration file (APP_ID)
│   ├── lobby.js           # Lobby page functionality
│   ├── room.js            # Room UI interactions
│   ├── room_rtc.js        # Video/audio functionality
│   ├── room_rtm.js        # Real-time messaging
│   ├── agora-rtm-sdk-1.5.1.js    # Agora RTM SDK
│   └── AgoraRTC_N-4.14.0.js      # Agora RTC SDK
├── styles/
│   ├── main.css           # Main styles
│   ├── lobby.css          # Lobby page styles
│   ├── room.css           # Room page styles
│   └── images/            # Image assets
└── README.md              # This file
```

## Configuration Options

### Environment Variables

The application uses a configuration file (`js/config.js`) to manage environment-specific settings:

- **APP_ID**: Your Agora App ID (required)

### Security Note

- Never commit your actual App ID to version control
- Consider using environment variables or separate config files for production
- The current setup is suitable for development and testing

## Browser Support

This application works in modern browsers that support WebRTC:

- Chrome 58+
- Firefox 56+
- Safari 11+
- Edge 12+

## Troubleshooting

### Common Issues

1. **"Please configure your Agora APP_ID" error**
   - Make sure you've updated `js/config.js` with your actual App ID
   - Ensure the config.js file is being loaded before other scripts

2. **Camera/Microphone not working**
   - Check browser permissions for camera and microphone access
   - Ensure you're serving the app over HTTPS or localhost

3. **Cannot connect to room**
   - Verify your Agora App ID is correct
   - Check your internet connection
   - Ensure you're using a supported browser

4. **Screen sharing not working**
   - Screen sharing requires HTTPS or localhost
   - Some browsers may block screen sharing on HTTP

### Browser Permissions

Make sure to allow the following permissions when prompted:
- Camera access
- Microphone access
- Screen sharing (when using that feature)

## Development

### Adding New Features

The codebase is modular:
- `room_rtc.js`: Handles video/audio streaming
- `room_rtm.js`: Handles text messaging
- `room.js`: Handles UI interactions
- `lobby.js`: Handles room joining logic

### Customization

You can customize:
- UI styles in the `styles/` folder
- Video quality settings in `room_rtc.js`
- Chat functionality in `room_rtm.js`

## Support

- [Agora Documentation](https://docs.agora.io/)
- [Agora Community](https://www.agora.io/en/community/)
- [GitHub Issues](../../issues) for this project

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This application is for educational and development purposes. For production use, consider implementing additional security measures, user authentication, and server-side token generation.