// L.U.M.I.A - Liability & Underwriting Management Insurance Assistant
// Main JavaScript functionality

// Global variables
let currentClients = [];
let currentPage = 'welcome';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Setup navigation
    setupNavigation();
    
    // Load saved clients
    loadClients();
    
    // Update dashboard
    updateDashboard();
    
    // Setup form handlers
    setupFormHandlers();
    
    // Setup modal handlers
    setupModal();
    
    // Show welcome page
    showPage('welcome');
}

function setupNavigation() {
    // Nav toggle for mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Update navigation active state
        updateNavigationActive(pageName);
        
        // Page-specific setup
        if (pageName === 'current-client') {
            loadClientSelects();
        } else if (pageName === 'dashboard') {
            updateDashboard();
        } else if (pageName === 'client-summary') {
            loadClientSelects();
        }
    }
}

function updateNavigationActive(activePage) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === activePage) {
            link.classList.add('active');
        }
    });
}

function setupFormHandlers() {
    // New Client Form
    const newClientForm = document.getElementById('new-client-form');
    if (newClientForm) {
        newClientForm.addEventListener('submit', handleNewClient);
    }
    
    // Update Client Form
    const updateClientForm = document.getElementById('update-client-form');
    if (updateClientForm) {
        updateClientForm.addEventListener('submit', handleUpdateClient);
    }
    
    // Asset Calculator Form
    const assetForm = document.getElementById('asset-calculator-form');
    if (assetForm) {
        assetForm.addEventListener('submit', handleAssetCalculation);
    }
    
    // Summary Client Select
    const summaryClientSelect = document.getElementById('summary-client-select');
    if (summaryClientSelect) {
        summaryClientSelect.addEventListener('change', loadSummaryClient);
    }
    
    // Current Client Select
    const clientSelect = document.getElementById('current-client-select');
    if (clientSelect) {
        clientSelect.addEventListener('change', handleClientSelect);
    }
}

function setupModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

function showModal(title, message) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    if (modal && modalTitle && modalMessage) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Client Management Functions
function handleNewClient(e) {
    e.preventDefault();
    
    try {
        const clientData = {
            name: document.getElementById('new-client-name')?.value || '',
            email: document.getElementById('new-client-email')?.value || '',
            phone: document.getElementById('new-client-phone')?.value || '',
            address: document.getElementById('new-client-address')?.value || '',
            homeValue: document.getElementById('new-home-value')?.value || '0',
            vehicleValue: document.getElementById('new-vehicle-value')?.value || '0',
            income: document.getElementById('new-income')?.value || '0',
            lifeInsurance: document.getElementById('new-life-insurance')?.value || '0',
            investments: document.getElementById('new-investments')?.value || '0',
            claimsHistory: document.getElementById('new-claims-history')?.value || '',
            safetyFeatures: getCheckedValues('new-client-form', 'checkbox-input')
        };
        
        // Validate required fields
        if (!clientData.name || !clientData.email || !clientData.phone || !clientData.address) {
            showModal('Error', 'Please fill in all required client information fields.');
            return;
        }
        
        if (!clientData.homeValue || !clientData.vehicleValue || !clientData.income || 
            !clientData.lifeInsurance || !clientData.investments) {
            showModal('Error', 'Please fill in all asset values.');
            return;
        }
        
        if (!clientData.claimsHistory) {
            showModal('Error', 'Please select the claims history.');
            return;
        }
        
        // Calculate liability exposure
        clientData.liabilityExposure = calculateLiabilityExposure(clientData);
        clientData.insuranceTier = getInsuranceTier(clientData.liabilityExposure);
        
        // Add timestamp and generate ID
        clientData.id = Date.now().toString();
        clientData.createdAt = new Date().toISOString();
        
        // Save client
        currentClients.push(clientData);
        saveClients();
        
        // Reset form and show success
        document.getElementById('new-client-form').reset();
        showModal('Success', `Client information saved successfully! Recommended insurance tier: ${clientData.insuranceTier}`);
        
        // Update dashboard
        updateDashboard();
        
    } catch (error) {
        console.error('Error saving client:', error);
        showModal('Error', 'Failed to save client information. Please try again.');
    }
}

function handleUpdateClient(e) {
    e.preventDefault();
    
    try {
        const clientName = document.getElementById('current-client-select')?.value;
        if (!clientName) {
            showModal('Error', 'Please select a client to update.');
            return;
        }
        
        const clientIndex = currentClients.findIndex(client => client.name === clientName);
        if (clientIndex === -1) {
            showModal('Error', 'Client not found.');
            return;
        }
        
        const updatedData = {
            ...currentClients[clientIndex],
            name: document.getElementById('update-client-name')?.value || '',
            email: document.getElementById('update-client-email')?.value || '',
            phone: document.getElementById('update-client-phone')?.value || '',
            address: document.getElementById('update-client-address')?.value || '',
            homeValue: document.getElementById('update-home-value')?.value || '0',
            vehicleValue: document.getElementById('update-vehicle-value')?.value || '0',
            income: document.getElementById('update-income')?.value || '0',
            lifeInsurance: document.getElementById('update-life-insurance')?.value || '0',
            investments: document.getElementById('update-investments')?.value || '0',
            claimsHistory: document.getElementById('update-claims-history')?.value || '',
            safetyFeatures: getCheckedValues('update-client-form', 'checkbox-input'),
            updatedAt: new Date().toISOString()
        };
        
        // Validate required fields
        if (!updatedData.name || !updatedData.email || !updatedData.phone || !updatedData.address) {
            showModal('Error', 'Please fill in all required client information fields.');
            return;
        }
        
        // Calculate new liability exposure
        updatedData.liabilityExposure = calculateLiabilityExposure(updatedData);
        updatedData.insuranceTier = getInsuranceTier(updatedData.liabilityExposure);
        
        // Update client
        currentClients[clientIndex] = updatedData;
        saveClients();
        
        showModal('Success', 'Client information updated successfully!');
        showPage('current-client');
        
    } catch (error) {
        console.error('Error updating client:', error);
        showModal('Error', 'Failed to update client information. Please try again.');
    }
}

function handleClientSelect(e) {
    const clientName = e.target.value;
    const updateForm = document.getElementById('update-client-form');
    const clientInfo = document.getElementById('client-info');
    
    if (!clientName) {
        if (updateForm) updateForm.style.display = 'none';
        if (clientInfo) clientInfo.style.display = 'none';
        return;
    }
    
    const client = currentClients.find(c => c.name === clientName);
    if (client) {
        // Populate update form
        document.getElementById('update-client-name').value = client.name || '';
        document.getElementById('update-client-email').value = client.email || '';
        document.getElementById('update-client-phone').value = client.phone || '';
        document.getElementById('update-client-address').value = client.address || '';
        document.getElementById('update-home-value').value = client.homeValue || '';
        document.getElementById('update-vehicle-value').value = client.vehicleValue || '';
        document.getElementById('update-income').value = client.income || '';
        document.getElementById('update-life-insurance').value = client.lifeInsurance || '';
        document.getElementById('update-investments').value = client.investments || '';
        document.getElementById('update-claims-history').value = client.claimsHistory || '';
        
        // Check safety features
        const safetyFeatures = client.safetyFeatures || [];
        document.getElementById('update-security').checked = safetyFeatures.includes('security-system');
        document.getElementById('update-fire').checked = safetyFeatures.includes('fire-alarm');
        document.getElementById('update-sprinklers').checked = safetyFeatures.includes('sprinklers');
        document.getElementById('update-storm').checked = safetyFeatures.includes('storm-resistant');
        
        // Show form
        if (updateForm) updateForm.style.display = 'block';
        if (clientInfo) {
            clientInfo.style.display = 'block';
            document.getElementById('client-details').innerHTML = `
                <p><strong>Email:</strong> ${client.email}</p>
                <p><strong>Phone:</strong> ${client.phone}</p>
                <p><strong>Home Value:</strong> $${parseInt(client.homeValue || '0').toLocaleString()}</p>
                <p><strong>Vehicle Value:</strong> $${parseInt(client.vehicleValue || '0').toLocaleString()}</p>
                <p><strong>Annual Income:</strong> $${parseInt(client.income || '0').toLocaleString()}</p>
                <p><strong>Life Insurance:</strong> $${parseInt(client.lifeInsurance || '0').toLocaleString()}</p>
                <p><strong>Investments:</strong> $${parseInt(client.investments || '0').toLocaleString()}</p>
                <p><strong>Claims History:</strong> ${client.claimsHistory}</p>
                <p><strong>Liability Exposure:</strong> $${client.liabilityExposure ? client.liabilityExposure.toLocaleString() : 'Not calculated'}</p>
                <p><strong>Insurance Tier:</strong> ${client.insuranceTier || 'Not assigned'}</p>
            `;
        }
    }
}

function loadClientSelects() {
    const selects = ['current-client-select', 'summary-client-select'];
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            // Clear existing options except first
            while (select.children.length > 1) {
                select.removeChild(select.lastChild);
            }
            
            // Add client options
            currentClients.forEach(client => {
                const option = document.createElement('option');
                option.value = client.name;
                option.textContent = client.name;
                select.appendChild(option);
            });
        }
    });
}

function loadClients() {
    try {
        const saved = localStorage.getItem('lumia-clients');
        if (saved) {
            currentClients = JSON.parse(saved);
        }
    } catch (error) {
        console.error('Error loading clients:', error);
        currentClients = [];
    }
}

function saveClients() {
    try {
        localStorage.setItem('lumia-clients', JSON.stringify(currentClients));
    } catch (error) {
        console.error('Error saving clients:', error);
        showModal('Error', 'Failed to save data. Please check your browser storage.');
    }
}

// Asset Calculator Functions
function handleAssetCalculation(e) {
    e.preventDefault();
    
    try {
        const homeValue = parseFloat(document.getElementById('calc-home-value').value) || 0;
        const vehicleValue = parseFloat(document.getElementById('calc-vehicle-value').value) || 0;
        const income = parseFloat(document.getElementById('calc-income').value) || 0;
        const lifeInsurance = parseFloat(document.getElementById('calc-life-insurance').value) || 0;
        const investments = parseFloat(document.getElementById('calc-investments').value) || 0;
        
        // Calculate individual components
        const incomeMultiplier = income * 10; // 10x annual income
        const lifeInsuranceGap = Math.max(0, incomeMultiplier - lifeInsurance);
        const investmentProtection = investments * 0.5; // 50% of investments need protection
        
        const totalExposure = homeValue + vehicleValue + incomeMultiplier + lifeInsuranceGap + investmentProtection;
        const insuranceTier = getInsuranceTier(totalExposure);
        
        // Display asset breakdown
        document.getElementById('home-value-display').textContent = `$${homeValue.toLocaleString()}`;
        document.getElementById('vehicle-value-display').textContent = `$${vehicleValue.toLocaleString()}`;
        document.getElementById('income-display').textContent = `$${incomeMultiplier.toLocaleString()}`;
        document.getElementById('life-insurance-display').textContent = `$${lifeInsuranceGap.toLocaleString()}`;
        document.getElementById('investment-display').textContent = `$${investmentProtection.toLocaleString()}`;
        document.getElementById('total-exposure').textContent = `$${totalExposure.toLocaleString()}`;
        
        // Display tier recommendation
        displayTierRecommendation(insuranceTier, totalExposure);
        
        document.getElementById('asset-results').style.display = 'block';
        
    } catch (error) {
        console.error('Error calculating assets:', error);
        showModal('Error', 'Failed to calculate assets. Please check your inputs.');
    }
}

function calculateLiabilityExposure(clientData) {
    const homeValue = parseFloat(clientData.homeValue) || 0;
    const vehicleValue = parseFloat(clientData.vehicleValue) || 0;
    const income = parseFloat(clientData.income) || 0;
    const lifeInsurance = parseFloat(clientData.lifeInsurance) || 0;
    const investments = parseFloat(clientData.investments) || 0;
    
    // Calculate individual components
    const incomeMultiplier = income * 10; // 10x annual income
    const lifeInsuranceGap = Math.max(0, incomeMultiplier - lifeInsurance);
    const investmentProtection = investments * 0.5; // 50% of investments need protection
    
    return homeValue + vehicleValue + incomeMultiplier + lifeInsuranceGap + investmentProtection;
}

function getInsuranceTier(totalExposure) {
    if (totalExposure <= 100000) {
        return 'Tier 1: Up to $100,000';
    } else if (totalExposure <= 300000) {
        return 'Tier 2: $100,000 - $300,000';
    } else if (totalExposure <= 500000) {
        return 'Tier 3: $300,000 - $500,000';
    } else {
        return 'Tier 4: $500,000+';
    }
}

function displayTierRecommendation(tier, exposure) {
    const tierElement = document.getElementById('tier-recommendation');
    const explanationElement = document.getElementById('tier-explanation');
    
    let tierClass = '';
    let explanation = '';
    
    switch(tier) {
        case 'Tier 1: Up to $100,000':
            tierClass = 'tier-basic';
            explanation = 'Basic coverage for minimal assets. Consider upgrading for better protection.';
            break;
        case 'Tier 2: $100,000 - $300,000':
            tierClass = 'tier-standard';
            explanation = 'Standard protection for moderate asset levels. Adequate but consider enhanced coverage.';
            break;
        case 'Tier 3: $300,000 - $500,000':
            tierClass = 'tier-enhanced';
            explanation = 'Enhanced protection recommended for your asset level. Strong coverage option.';
            break;
        case 'Tier 4: $500,000+':
            tierClass = 'tier-premium';
            explanation = 'Premium protection for high asset exposure. Maximum coverage recommended.';
            break;
    }
    
    tierElement.innerHTML = `<div class="tier-result ${tierClass}">${tier}</div>`;
    explanationElement.innerHTML = `<p>${explanation}</p><p><strong>Liability Exposure:</strong> $${exposure.toLocaleString()}</p>`;
}

// Dashboard Functions
function updateDashboard() {
    const totalClients = currentClients.length;
    const totalHomeValue = currentClients.reduce((sum, client) => {
        return sum + (parseInt(client.homeValue) || 0);
    }, 0);
    
    const highRiskClients = currentClients.filter(client => {
        const claims = client.claimsHistory || 'none';
        return claims === 'more' || claims === '3-5';
    }).length;
    
    const avgCoverage = currentClients.length > 0 
        ? currentClients.reduce((sum, client) => {
            return sum + (client.liabilityExposure || 0);
        }, 0) / currentClients.length
        : 0;
    
    // Update stats
    document.getElementById('total-clients').textContent = totalClients;
    document.getElementById('total-home-value').textContent = `$${totalHomeValue.toLocaleString()}`;
    document.getElementById('high-risk-count').textContent = highRiskClients;
    document.getElementById('avg-coverage').textContent = `$${Math.round(avgCoverage).toLocaleString()}`;
    
    // Update client grid
    const clientsGrid = document.getElementById('clients-grid');
    if (clientsGrid) {
        clientsGrid.innerHTML = '';
        
        if (currentClients.length === 0) {
            clientsGrid.innerHTML = '<p class="no-clients">No clients added yet. Create your first client to get started.</p>';
        } else {
            currentClients.forEach(client => {
                const clientCard = createClientCard(client);
                clientsGrid.appendChild(clientCard);
            });
        }
    }
}

function createClientCard(client) {
    const card = document.createElement('div');
    card.className = 'client-card';
    
    const claimsColor = client.claimsHistory === 'none' ? 'green' : 
                       client.claimsHistory === '1-2' ? 'orange' : 'red';
    
    card.innerHTML = `
        <h4>${client.name}</h4>
        <div class="client-details">
            <p><strong>Home:</strong> $${parseInt(client.homeValue || '0').toLocaleString()}</p>
            <p><strong>Vehicle:</strong> $${parseInt(client.vehicleValue || '0').toLocaleString()}</p>
            <p><strong>Income:</strong> $${parseInt(client.income || '0').toLocaleString()}</p>
            <p><strong>Liability Exposure:</strong> $${client.liabilityExposure ? client.liabilityExposure.toLocaleString() : 'N/A'}</p>
            <p><strong>Insurance Tier:</strong> <span class="tier-badge">${client.insuranceTier || 'N/A'}</span></p>
            <p><strong>Claims:</strong> <span class="claims-${claimsColor}">${client.claimsHistory}</span></p>
            <p class="client-date">Added: ${new Date(client.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="client-actions">
            <button class="btn btn-small" onclick="editClient('${client.name}')">Edit</button>
            <button class="btn btn-small" onclick="generateSummaryForClient('${client.name}')">Summary</button>
        </div>
    `;
    
    return card;
}

function editClient(clientName) {
    const client = currentClients.find(c => c.name === clientName);
    if (client) {
        showPage('current-client');
        setTimeout(() => {
            document.getElementById('current-client-select').value = clientName;
            handleClientSelect({ target: { value: clientName } });
        }, 100);
    }
}

// Summary Report Functions
function loadSummaryClient(e) {
    const clientName = e.target.value;
    if (!clientName) {
        document.getElementById('summary-report').style.display = 'none';
        return;
    }
}

function generateClientSummary() {
    const clientName = document.getElementById('summary-client-select').value;
    if (!clientName) {
        showModal('Error', 'Please select a client.');
        return;
    }
    
    const client = currentClients.find(c => c.name === clientName);
    if (!client) {
        showModal('Error', 'Client not found.');
        return;
    }
    
    // Populate report sections
    populateClientInfo(client);
    populateAssetSummary(client);
    populateLiabilitySection(client);
    populateRecommendations(client);
    populateNextSteps(client);
    
    // Show report
    document.getElementById('summary-report').style.display = 'block';
}

function populateClientInfo(client) {
    const infoGrid = document.getElementById('client-info-grid');
    infoGrid.innerHTML = `
        <div class="info-item">
            <label>Client Name:</label>
            <span>${client.name}</span>
        </div>
        <div class="info-item">
            <label>Email:</label>
            <span>${client.email}</span>
        </div>
        <div class="info-item">
            <label>Phone:</label>
            <span>${client.phone}</span>
        </div>
        <div class="info-item">
            <label>Address:</label>
            <span>${client.address}</span>
        </div>
        <div class="info-item">
            <label>Claims History:</label>
            <span>${client.claimsHistory}</span>
        </div>
        <div class="info-item">
            <label>Assessment Date:</label>
            <span>${new Date(client.createdAt).toLocaleDateString()}</span>
        </div>
    `;
}

function populateAssetSummary(client) {
    const assetBreakdown = document.getElementById('asset-breakdown');
    assetBreakdown.innerHTML = `
        <div class="asset-item">
            <label>Home Value:</label>
            <span>$${parseInt(client.homeValue || '0').toLocaleString()}</span>
        </div>
        <div class="asset-item">
            <label>Vehicle Value:</label>
            <span>$${parseInt(client.vehicleValue || '0').toLocaleString()}</span>
        </div>
        <div class="asset-item">
            <label>Annual Income:</label>
            <span>$${parseInt(client.income || '0').toLocaleString()}</span>
        </div>
        <div class="asset-item">
            <label>Life Insurance:</label>
            <span>$${parseInt(client.lifeInsurance || '0').toLocaleString()}</span>
        </div>
        <div class="asset-item">
            <label>Investment Accounts:</label>
            <span>$${parseInt(client.investments || '0').toLocaleString()}</span>
        </div>
        <div class="asset-item total">
            <label><strong>Total Assets:</strong></label>
            <span><strong>$${(
                parseInt(client.homeValue || '0') +
                parseInt(client.vehicleValue || '0') +
                parseInt(client.income || '0') +
                parseInt(client.lifeInsurance || '0') +
                parseInt(client.investments || '0')
            ).toLocaleString()}</strong></span>
        </div>
    `;
}

function populateLiabilitySection(client) {
    const exposureDetails = document.getElementById('exposure-details');
    const homeValue = parseInt(client.homeValue) || 0;
    const vehicleValue = parseInt(client.vehicleValue) || 0;
    const income = parseInt(client.income) || 0;
    const lifeInsurance = parseInt(client.lifeInsurance) || 0;
    const investments = parseInt(client.investments) || 0;
    
    const incomeMultiplier = income * 10;
    const lifeInsuranceGap = Math.max(0, incomeMultiplier - lifeInsurance);
    const investmentProtection = investments * 0.5;
    
    exposureDetails.innerHTML = `
        <div class="exposure-item">
            <label>Home Protection:</label>
            <span>$${homeValue.toLocaleString()}</span>
            <small>Full home value at risk in lawsuit</small>
        </div>
        <div class="exposure-item">
            <label>Vehicle Protection:</label>
            <span>$${vehicleValue.toLocaleString()}</span>
            <small>Vehicle value plus potential damages</small>
        </div>
        <div class="exposure-item">
            <label>Income Protection (10x):</label>
            <span>$${incomeMultiplier.toLocaleString()}</span>
            <small>10 times annual income for future earnings</small>
        </div>
        <div class="exposure-item">
            <label>Life Insurance Gap:</label>
            <span>$${lifeInsuranceGap.toLocaleString()}</span>
            <small>Additional life insurance needed</small>
        </div>
        <div class="exposure-item">
            <label>Investment Protection (50%):</label>
            <span>$${investmentProtection.toLocaleString()}</span>
            <small>Half of investment accounts at risk</small>
        </div>
        <div class="exposure-item total">
            <label><strong>Total Liability Exposure:</strong></label>
            <span><strong>$${client.liabilityExposure ? client.liabilityExposure.toLocaleString() : '0'}</strong></span>
            <small><strong>Minimum insurance coverage needed</strong></small>
        </div>
    `;
}

function populateRecommendations(client) {
    const tierRecommendation = document.getElementById('tier-recommendation-summary');
    const tierDetails = document.getElementById('tier-details-summary');
    
    let tierInfo = '';
    let details = '';
    
    switch(client.insuranceTier) {
        case 'Tier 1: Up to $100,000':
            tierInfo = 'Basic Coverage Recommended';
            details = 'Minimum coverage for limited assets. Consider upgrading for better protection.';
            break;
        case 'Tier 2: $100,000 - $300,000':
            tierInfo = 'Standard Coverage Recommended';
            details = 'Adequate coverage for moderate asset levels. Good starting point for most families.';
            break;
        case 'Tier 3: $300,000 - $500,000':
            tierInfo = 'Enhanced Coverage Recommended';
            details = 'Strong protection for your asset level. Recommended for established families.';
            break;
        case 'Tier 4: $500,000+':
            tierInfo = 'Premium Coverage Recommended';
            details = 'Maximum protection for high asset exposure. Peace of mind for high net worth individuals.';
            break;
        default:
            tierInfo = 'Coverage Assessment Needed';
            details = 'Please calculate liability exposure to determine appropriate coverage tier.';
    }
    
    tierRecommendation.innerHTML = `
        <div class="tier-result tier-${client.insuranceTier ? client.insuranceTier.toLowerCase().replace(/[^a-z]/g, '-') : 'basic'}">
            <h4>${client.insuranceTier}</h4>
            <p>${tierInfo}</p>
        </div>
    `;
    
    tierDetails.innerHTML = `
        <p><strong>Recommendation Rationale:</strong></p>
        <p>${details}</p>
        <p><strong>Liability Exposure:</strong> $${client.liabilityExposure ? client.liabilityExposure.toLocaleString() : 'Not calculated'}</p>
        <p><strong>Risk Factors:</strong> ${client.claimsHistory} claims history</p>
    `;
}

function populateNextSteps(client) {
    const nextStepsList = document.getElementById('next-steps-list');
    const steps = [
        `Schedule follow-up appointment to discuss ${client.insuranceTier} coverage options`,
        'Obtain quotes from multiple insurance carriers for best rates',
        'Review current policies for any gaps in coverage',
        'Consider bundling auto and home insurance for discounts',
        'Set up automatic premium payments to avoid lapses',
        'Schedule annual policy review to adjust coverage as needed',
        'Ensure all family members are properly covered',
        'Review umbrella policy options for additional protection'
    ];
    
    nextStepsList.innerHTML = steps.map(step => `<li>${step}</li>`).join('');
    
    // Set report date
    document.getElementById('report-date').textContent = `Report Date: ${new Date().toLocaleDateString()}`;
}

function generateSummaryForClient(clientName) {
    showPage('client-summary');
    setTimeout(() => {
        document.getElementById('summary-client-select').value = clientName;
        generateClientSummary();
    }, 100);
}

function printSummary() {
    if (document.getElementById('summary-report').style.display === 'none') {
        showModal('Error', 'Please generate a summary report first.');
        return;
    }
    
    // Create print-friendly version
    const reportContent = document.getElementById('summary-report').innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>L.U.M.I.A Client Summary Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .summary-report { max-width: 800px; margin: 0 auto; }
                .report-header { text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 20px; margin-bottom: 30px; }
                .info-grid, .asset-breakdown, .exposure-details { display: grid; gap: 10px; margin: 20px 0; }
                .info-item, .asset-item, .exposure-item { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; }
                .tier-result { background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #1e3a8a; }
                .total { background: #f8fafc; font-weight: bold; }
                .report-footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center; }
                @media print { body { margin: 0; } .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="summary-report">
                ${reportContent}
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function() {
                        window.close();
                    };
                };
            </script>
        </body>
        </html>
    `);
    
    printWindow.document.close();
}

// Utility Functions
function getCheckedValues(formId, checkboxClass) {
    const form = document.getElementById(formId);
    if (!form) return [];
    
    const checkboxes = form.querySelectorAll(`.${checkboxClass}:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

// Export functions for global access
window.showPage = showPage;
window.resetForm = resetForm;
window.generateClientSummary = generateClientSummary;
window.generateSummaryForClient = generateSummaryForClient;
window.printSummary = printSummary;