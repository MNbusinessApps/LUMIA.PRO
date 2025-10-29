# L.U.M.I.A - Liability & Underwriting Management Insurance Assistant v2.0

A comprehensive web-based insurance assessment tool designed for insurance professionals to manage client information, calculate liability exposure, and generate professional coverage recommendations with integrated sales training.

## 🚀 What's New in v2.0

### Enhanced Asset Calculator
- **Complete Asset Analysis**: Home value, vehicle value, income, life insurance, and investments
- **Liability Exposure Calculation**: Automatically calculates total risk exposure
- **Insurance Tier Recommendations**: 4-tier system based on exposure levels:
  - Tier 1: Up to $100,000
  - Tier 2: $100,000 - $300,000  
  - Tier 3: $300,000 - $500,000
  - Tier 4: $500,000+

### Script Training Module
- **Professional Sales Scripts**: Complete appointment training guide
- **Real-World Examples**: "Hitting a doctor" scenario with cost breakdowns
- **Closing Techniques**: Multiple proven closing strategies
- **Follow-Up Scripts**: Post-appointment communication templates
- **Pro Tips**: Advanced sales techniques and best practices

### Enhanced Features
- **Client Summary Reports**: Professional printable reports
- **Responsive Design**: Hamburger menu only on phones, full nav on desktop/tablet
- **Data Persistence**: All client data and page states saved locally
- **Professional Interface**: Insurance industry-appropriate design

## 📋 System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- No server required - runs entirely in the browser

## 🛠️ Installation & Setup

### Option 1: GitHub Pages (Recommended)
1. Create a new GitHub repository
2. Upload the following files to your repository:
   - `index.html`
   - `script.js`
   - `styles.css`
   - `README.md`
3. Enable GitHub Pages in repository settings
4. Access your app via the provided GitHub Pages URL

### Option 2: Local Development
1. Download all files to a local directory
2. Open `index.html` in your web browser
3. The application will run locally with all functionality

## 📖 How to Use

### 1. Getting Started
- The app opens to a welcome page with feature overview
- Use the navigation menu to access different sections
- All data is saved locally in your browser (localStorage)
- **Navigation**: Desktop/tablet shows full menu, mobile shows hamburger menu

### 2. Adding New Clients
1. Navigate to "New Client" page
2. Fill in client information:
   - Personal details (name, email, phone, address)
   - **Asset Information**:
     - Home value
     - Vehicle value  
     - Annual income
     - Life insurance coverage
     - Investment account value
   - Risk factors (claims history, safety features)
3. Click "Save Client" to store the information and get tier recommendation

### 3. Managing Current Clients
1. Go to "Current Client" page
2. Select a client from the dropdown
3. View current information and edit as needed
4. Update any fields and save changes
5. Liability exposure and tier will be recalculated automatically

### 4. Asset Calculator
1. Navigate to "Asset Calculator"
2. Enter asset values:
   - Home value
   - Vehicle value
   - Annual income (will be multiplied by 10x)
   - Life insurance coverage
   - Investment account value
3. Click "Calculate Liability Exposure" to see:
   - Individual component breakdown
   - Total liability exposure
   - Insurance tier recommendation with explanation

### 5. Script Training
1. Access "Script Training" page
2. Review comprehensive training modules:
   - **Opening Script**: Rapport building and introduction
   - **Liability Lesson**: "Hitting a doctor" scenario with cost analysis
   - **Asset Protection Logic**: Connecting assets to coverage needs
   - **Insurance Tier Explanations**: Why each tier matters
   - **Closing Techniques**: 4 proven closing methods
   - **Follow-Up Scripts**: Post-appointment communication
   - **Pro Tips**: Advanced sales techniques

### 6. Dashboard Overview
1. Visit the "Dashboard" page
2. View statistics:
   - Total number of clients
   - Combined home value
   - High-risk client count
   - Average recommended coverage
3. Browse client cards with key information and tier recommendations
4. Quick actions: Edit or generate summary for each client

### 7. Client Summary Reports
1. Go to "Client Summary" page
2. Select a client from dropdown
3. Click "Generate Summary" to create professional report including:
   - Client information
   - Complete asset breakdown
   - Liability exposure analysis
   - Insurance recommendations with rationale
   - Recommended next steps
4. Click "Print Summary" for printable version

## 💾 Data Storage

- All client data is stored locally in your browser's localStorage
- Data persists between sessions
- No server or database required
- To clear all data, use browser's localStorage clearing functionality

## 🧮 How Liability Exposure is Calculated

The application calculates liability exposure using this formula:

1. **Home Value**: Full home value at risk in lawsuit
2. **Vehicle Value**: Vehicle value plus potential damages
3. **Income Protection**: 10 times annual income for future earnings
4. **Life Insurance Gap**: Additional life insurance needed (10x income - current coverage)
5. **Investment Protection**: 50% of investment accounts at risk

**Total Liability Exposure** = Home + Vehicle + (Income × 10) + Life Insurance Gap + (Investments × 0.5)

## 🎯 Insurance Tier Recommendations

Based on total liability exposure:

- **Tier 1 (Up to $100,000)**: Basic coverage for minimal assets
- **Tier 2 ($100,000-$300,000)**: Standard coverage for moderate asset levels
- **Tier 3 ($300,000-$500,000)**: Enhanced coverage for established families
- **Tier 4 ($500,000+)**: Premium coverage for high net worth individuals

## 📱 Mobile Support

The application is fully responsive and optimized for:
- **Smartphones**: Hamburger menu navigation, touch-friendly interface
- **Tablets**: Full navigation menu, optimized layouts
- **Desktop**: Full navigation menu, multi-column layouts
- All layouts maintain full functionality across devices

## 🔧 Technical Details

### File Structure
```
lumia-v2/
├── index.html      # Main application file with all pages
├── script.js       # JavaScript functionality and calculations
├── styles.css      # Responsive CSS styling
└── README.md       # Documentation
```

### Browser Compatibility
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Dependencies
- Font Awesome 6.0.0 (for icons)
- No other external dependencies required

## 🛡️ Security & Privacy

- All data is stored locally in your browser
- No data is transmitted to external servers
- No personal information is collected or tracked
- Suitable for sensitive client information

## 🔄 Updates & Maintenance

To update the application:
1. Download the latest version files
2. Replace existing files in your repository
3. GitHub Pages will automatically update
4. All client data is preserved

## 📝 Script Training Content

The script training module includes:

### Opening Scripts
- Rapport building techniques
- Professional introductions
- Setting expectations

### The Liability Lesson
- "Hitting a doctor" scenario with detailed cost breakdown
- Why liability limits matter
- Real-world examples and calculations

### Closing Techniques
- **Assumption Close**: "How does Tuesday work for getting started?"
- **Summary Close**: Recap and confirm understanding
- **Choice Close**: Present options for decision
- **Urgency Close**: Ethical urgency creation

### Follow-Up Scripts
- Same-day follow-up calls
- Quote delivery conversations
- Closing follow-up techniques

## 🆘 Troubleshooting

### Common Issues

**Data not saving?**
- Ensure JavaScript is enabled in your browser
- Check if localStorage is available
- Try refreshing the page

**Navigation not working on mobile?**
- Try refreshing the page
- Ensure you're using a modern browser
- Check that the hamburger menu appears on smaller screens

**Asset calculations seem wrong?**
- Verify all input values are correct
- Check that income is entered as annual amount
- Remember: income is automatically multiplied by 10x for coverage calculation

**Summary report not printing correctly?**
- Try using the "Print Summary" button instead of browser print
- Ensure pop-up blockers are disabled
- Check browser console for error messages

### Browser Console Errors
Press F12 to open developer tools and check the Console tab for any error messages.

## 📞 Support

For technical support or feature requests:
1. Check this README for common solutions
2. Review the browser console for error messages
3. Ensure all files are properly uploaded

## 📄 License

This project is provided as-is for insurance professionals. Feel free to modify and customize for your specific needs.

---

**L.U.M.I.A v2.0** - Professional insurance assessment with integrated sales training for maximum effectiveness.

## 🎓 Training Integration

This application seamlessly integrates professional sales training with practical insurance assessment tools, providing insurance professionals with both the technical capabilities and the communication skills needed for successful client interactions.