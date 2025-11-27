# User Manual
## CoughTest - Medical Research Data Collection Platform

### Document Information
- **Version**: 1.0
- **Date**: November 2024
- **Audience**: Researchers, Participants, System Administrators
- **Platform**: Web-based application

---

## 1. Getting Started

### 1.1 System Requirements
```yaml
Supported Browsers:
  - Google Chrome 90+ (Recommended)
  - Mozilla Firefox 88+
  - Safari 14+
  - Microsoft Edge 90+

Hardware Requirements:
  - Microphone (for recording)
  - Speakers/Headphones (for playback)
  - Internet connection
  - Minimum 4GB RAM
  - 1GB available storage

Operating Systems:
  - Windows 10/11
  - macOS 10.15+
  - Linux (Ubuntu 18.04+)
  - Mobile devices (iOS 14+, Android 10+)
```

### 1.2 Accessing the Platform
1. **Open your web browser**
2. **Navigate to**: `http://localhost:3000` (development) or your deployed URL
3. **Homepage Overview**:
   - Navigation menu at the top
   - Quick start guide
   - Platform statistics
   - Recent activity

### 1.3 Platform Overview
```
┌─────────────────────────────────────────────────────────┐
│                    CoughTest Platform                   │
├─────────────────────────────────────────────────────────┤
│  🏠 Home  │  🎤 Record  │  📊 Browse  │  📈 Stats  │  ℹ️ About  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   Main Content Area                     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                      Footer                             │
└─────────────────────────────────────────────────────────┘
```

---

## 2. User Registration and Login

### 2.1 Creating an Account (Optional)
**Note**: Registration is optional. You can contribute anonymously.

1. **Click "Register"** in the navigation menu
2. **Fill in the registration form**:
   ```
   Username: [Choose a unique username]
   Email: [Your email address]
   Password: [Secure password]
   First Name: [Optional]
   Last Name: [Optional]
   ```
3. **Click "Create Account"**
4. **Confirmation**: You'll be automatically logged in

### 2.2 Logging In
1. **Click "Login"** in the navigation menu
2. **Enter credentials**:
   ```
   Username: [Your username]
   Password: [Your password]
   ```
3. **Click "Sign In"**
4. **Success**: You'll be redirected to the dashboard

### 2.3 Account Benefits
```yaml
Registered Users Can:
  - Track their contributions
  - View personal recording history
  - Delete their own recordings
  - Access advanced statistics

Anonymous Users Can:
  - Submit recordings with identifier
  - Contribute to research
  - Upload files
  - View public statistics
```

---

## 3. Recording Cough Samples

### 3.1 Browser Recording (Recommended)
1. **Navigate to "Record Cough"** page
2. **Grant microphone permission** when prompted
3. **Recording Process**:
   ```
   Step 1: Click "Start Recording"
   Step 2: Cough naturally for 10 seconds
   Step 3: Recording stops automatically
   Step 4: Review your recording
   Step 5: Submit or re-record
   ```

### 3.2 Recording Best Practices
```yaml
Environment:
  - Quiet room with minimal background noise
  - Close microphone distance (6-12 inches)
  - Avoid echo-prone spaces
  - Turn off fans, air conditioning if possible

Recording Technique:
  - Natural cough (don't force it)
  - Single cough or cough sequence
  - Speak clearly if adding voice notes
  - Maintain consistent volume

Quality Tips:
  - Test your microphone first
  - Use headphones to monitor
  - Record multiple takes if needed
  - Check audio levels
```

### 3.3 Recording Interface
```
┌─────────────────────────────────────────────────────────┐
│                 🎤 Record Cough Sample                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Microphone Status: ✅ Connected                        │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              🔴 [Start Recording]               │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Duration: 00:00 / 10:00                               │
│  ████████████████████████████████████████████████████   │
│                                                         │
│  Anonymous Name: [Optional identifier]                 │
│                                                         │
│  [🎵 Play] [🔄 Re-record] [📤 Submit]                   │
└─────────────────────────────────────────────────────────┘
```

---

## 4. File Upload

### 4.1 Uploading Audio Files
1. **Navigate to "Record Cough"** page
2. **Click "Upload File" tab**
3. **Select your audio file**:
   ```yaml
   Supported Formats:
     - WAV (recommended for quality)
     - MP3 (widely compatible)
     - WebM (modern web format)
     - OGG (open source)
     - M4A (Apple format)
   
   File Requirements:
     - Maximum size: 50MB
     - Duration: 8-12 seconds preferred
     - Quality: 44.1kHz sample rate recommended
   ```

### 4.2 Upload Process
```
Step 1: Click "Choose File"
   ↓
Step 2: Select audio file from computer
   ↓
Step 3: File validation (automatic)
   ↓
Step 4: Preview and verify
   ↓
Step 5: Add anonymous name (optional)
   ↓
Step 6: Click "Upload"
   ↓
Step 7: Confirmation and success message
```

### 4.3 Upload Interface
```
┌─────────────────────────────────────────────────────────┐
│                 📁 Upload Audio File                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  📎 Drag & drop file here or click to browse   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Selected File: cough_sample.wav                       │
│  Size: 2.3 MB | Duration: 10.5s | Format: WAV         │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              🎵 Audio Preview                   │   │
│  │  ▶️ [Play] ⏸️ [Pause] ⏹️ [Stop]                    │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Anonymous Name: [Optional identifier]                 │
│                                                         │
│  [📤 Upload Recording]                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Browsing Recordings

### 5.1 Viewing All Recordings
1. **Navigate to "Browse Recordings"**
2. **Browse features**:
   ```yaml
   Filtering Options:
     - Recording method (Browser/Upload)
     - File format (WAV, MP3, WebM, etc.)
     - Date range
     - User type (Registered/Anonymous)
   
   Search Functionality:
     - Search by username
     - Search by filename
     - Search by anonymous name
   
   Sorting Options:
     - Creation date (newest/oldest)
     - Duration (longest/shortest)
     - File size (largest/smallest)
   ```

### 5.2 Recording List Interface
```
┌─────────────────────────────────────────────────────────┐
│                 📊 Browse Recordings                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🔍 Search: [____________] 🔽 Filter: [All Methods]     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🎵 Recording #001                               │   │
│  │ User: researcher01 | Duration: 10.5s           │   │
│  │ Format: WebM | Method: Browser                  │   │
│  │ Created: 2024-11-28 10:30:45                   │   │
│  │ [▶️ Play] [📥 Download] [ℹ️ Details]             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🎵 Recording #002                               │   │
│  │ User: Anonymous_001 | Duration: 9.8s           │   │
│  │ Format: WAV | Method: Upload                    │   │
│  │ Created: 2024-11-28 09:15:22                   │   │
│  │ [▶️ Play] [📥 Download] [ℹ️ Details]             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  📄 Page 1 of 8 | [Previous] [1] [2] [3] [Next]       │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Audio Playback
```yaml
Playback Features:
  - Built-in audio player
  - Volume control
  - Playback speed adjustment
  - Waveform visualization (if available)
  - Download option for researchers

Playback Controls:
  - Play/Pause button
  - Progress bar with seeking
  - Volume slider
  - Mute toggle
  - Full-screen mode (for detailed analysis)
```

---

## 6. Statistics and Analytics

### 6.1 Platform Statistics
1. **Navigate to "Statistics"** page
2. **Available metrics**:
   ```yaml
   Overview Statistics:
     - Total recordings collected
     - Total registered users
     - Total anonymous contributions
     - Total audio duration
     - Total data size
   
   Quality Metrics:
     - Average recording duration
     - File format distribution
     - Recording method usage
     - Upload success rate
   
   Time-based Analytics:
     - Recordings per day/week/month
     - User engagement trends
     - Peak usage times
     - Growth statistics
   ```

### 6.2 Statistics Dashboard
```
┌─────────────────────────────────────────────────────────┐
│                 📈 Platform Statistics                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📊 Overview                                            │
│  ┌─────────────┬─────────────┬─────────────┬─────────┐ │
│  │Total Records│Total Users  │Anonymous    │Duration │ │
│  │     150     │     45      │     105     │ 26.2h   │ │
│  └─────────────┴─────────────┴─────────────┴─────────┘ │
│                                                         │
│  📈 Recording Methods        📊 File Formats            │
│  ┌─────────────────────┐    ┌─────────────────────┐   │
│  │ Browser: 80% (120)  │    │ WebM: 80% (120)     │   │
│  │ Upload:  20% (30)   │    │ WAV:  13% (20)      │   │
│  └─────────────────────┘    │ MP3:   7% (10)      │   │
│                             └─────────────────────┘   │
│                                                         │
│  📅 Recent Activity                                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Today: 12 recordings | This week: 45 recordings│   │
│  │ Most active hour: 2-3 PM | Peak day: Tuesday   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 6.3 Personal Statistics (Registered Users)
```yaml
User Dashboard:
  - Personal contribution count
  - Total duration contributed
  - Recording quality metrics
  - Contribution timeline
  - Achievement badges (if implemented)

My Recordings:
  - List of all user recordings
  - Individual recording statistics
  - Download/delete options
  - Quality assessment
```

---

## 7. Data Export (For Researchers)

### 7.1 Export Options
1. **Navigate to "Statistics"** page
2. **Scroll to "Data Export"** section
3. **Choose export format**:
   ```yaml
   CSV Export:
     - Complete metadata in spreadsheet format
     - Compatible with R, Python, SPSS, Excel
     - Includes all technical specifications
     - Research-ready format
   
   HTML Export:
     - Visual report with embedded audio players
     - Suitable for presentations and reviews
     - Interactive data exploration
     - Print-friendly format
   
   ZIP Export:
     - Complete dataset package
     - Includes all audio files
     - CSV metadata file
     - README documentation
   ```

### 7.2 Export Process
```
Step 1: Choose export format
   ↓
Step 2: Click export button
   ↓
Step 3: Processing notification
   ↓
Step 4: Download starts automatically
   ↓
Step 5: File saved to Downloads folder
```

### 7.3 Export Interface
```
┌─────────────────────────────────────────────────────────┐
│                 📥 Data Export                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Export complete dataset for research analysis:         │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 📊 CSV Export                                   │   │
│  │ Spreadsheet format for statistical analysis     │   │
│  │ [📥 Download CSV]                               │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🌐 HTML Export                                  │   │
│  │ Interactive report with audio players           │   │
│  │ [📥 Download HTML]                              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 📦 ZIP Export                                   │   │
│  │ Complete package with audio files & metadata    │   │
│  │ [📥 Download ZIP] (⚠️ Large file ~50MB)         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 8. Troubleshooting

### 8.1 Common Issues and Solutions

#### Microphone Problems
```yaml
Issue: "Microphone not detected"
Solutions:
  - Check browser permissions (click lock icon in address bar)
  - Ensure microphone is connected and working
  - Try refreshing the page
  - Check system audio settings
  - Try a different browser

Issue: "Poor audio quality"
Solutions:
  - Move closer to microphone
  - Reduce background noise
  - Check microphone settings
  - Use external microphone if available
  - Test in quiet environment
```

#### Upload Problems
```yaml
Issue: "File upload failed"
Solutions:
  - Check file format (WAV, MP3, WebM, OGG, M4A)
  - Verify file size (<50MB)
  - Check internet connection
  - Try a different browser
  - Clear browser cache

Issue: "File format not supported"
Solutions:
  - Convert file to supported format
  - Use audio conversion software
  - Record directly in browser instead
  - Check file extension matches content
```

#### Browser Issues
```yaml
Issue: "Page not loading"
Solutions:
  - Check internet connection
  - Clear browser cache and cookies
  - Disable browser extensions
  - Try incognito/private mode
  - Update browser to latest version

Issue: "Features not working"
Solutions:
  - Enable JavaScript
  - Allow cookies
  - Disable ad blockers
  - Check browser compatibility
  - Try different browser
```

### 8.2 Error Messages
```yaml
"Authentication required":
  - Log in to your account
  - Register if you don't have an account
  - Check username/password

"File too large":
  - Compress audio file
  - Use shorter recording
  - Convert to more efficient format

"Invalid file format":
  - Use supported audio formats only
  - Check file extension
  - Convert file if necessary

"Network error":
  - Check internet connection
  - Try again later
  - Contact system administrator
```

### 8.3 Performance Optimization
```yaml
For Better Performance:
  - Use Chrome or Firefox browsers
  - Close unnecessary browser tabs
  - Ensure stable internet connection
  - Clear browser cache regularly
  - Use wired internet when possible

For Mobile Users:
  - Use landscape orientation for better interface
  - Ensure good cellular/WiFi signal
  - Close other apps to free memory
  - Use latest mobile browser version
```

---

## 9. Privacy and Security

### 9.1 Data Privacy
```yaml
What We Collect:
  - Audio recordings (cough samples)
  - Technical metadata (file specs, timestamps)
  - System information (browser, IP address)
  - Optional user information (if registered)

What We Don't Collect:
  - Personal health information
  - Identifying voice characteristics
  - Location data (beyond IP geolocation)
  - Sensitive personal data

Data Usage:
  - Research purposes only
  - Academic analysis and validation
  - Platform improvement
  - Statistical reporting (anonymized)
```

### 9.2 User Rights
```yaml
Your Rights:
  - Submit recordings anonymously
  - Delete your own recordings
  - Request data export
  - Withdraw consent (contact admin)

Data Security:
  - Encrypted data transmission (HTTPS)
  - Secure file storage
  - Access controls and authentication
  - Regular security updates
```

### 9.3 Anonymous Participation
```yaml
Anonymous Features:
  - No registration required
  - Optional identifier only
  - No personal information collected
  - IP address anonymization
  - Secure data handling

Benefits:
  - Complete privacy protection
  - Easy participation
  - Research contribution
  - No long-term commitment
```

---

## 10. Research Participation Guidelines

### 10.1 Ethical Participation
```yaml
Informed Consent:
  - Understand research purpose
  - Know data usage policies
  - Voluntary participation
  - Right to withdraw

Quality Contribution:
  - Natural cough samples
  - Follow recording guidelines
  - Honest metadata
  - Report technical issues
```

### 10.2 Best Practices for Researchers
```yaml
Data Collection:
  - Consistent methodology
  - Quality control procedures
  - Regular data backups
  - Documentation of procedures

Data Analysis:
  - Use exported CSV for statistics
  - Validate data integrity
  - Follow research ethics
  - Cite platform appropriately
```

### 10.3 Academic Use
```yaml
Citation Format:
  "CoughTest Research Platform. (2024). 
   Medical Research Data Collection Platform. 
   Version 1.0. [Software]"

Research Applications:
  - Acoustic analysis of cough sounds
  - Machine learning model training
  - Medical diagnostic research
  - Public health studies
```

---

## 11. Support and Contact

### 11.1 Getting Help
```yaml
Technical Support:
  - Check this user manual first
  - Review troubleshooting section
  - Contact system administrator
  - Report bugs through proper channels

Research Support:
  - Contact research team
  - Review methodology documentation
  - Access API documentation
  - Join research community forums
```

### 11.2 Feedback and Suggestions
```yaml
We Welcome:
  - User experience feedback
  - Feature suggestions
  - Bug reports
  - Research collaboration ideas

How to Provide Feedback:
  - Use contact form on website
  - Email research team
  - Submit GitHub issues
  - Participate in user surveys
```

---

**User Manual Version**: 1.0  
**Last Updated**: November 2024  
**Platform Version**: CoughTest 1.0  
**Support**: Available through research team contact