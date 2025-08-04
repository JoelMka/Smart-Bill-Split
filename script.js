// Global variables
let people = [];
let personCounter = 0;
let sharedItems = [];
let sharedItemCounter = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Auto-calculate total when subtotal or tax changes
    document.getElementById('subtotal').addEventListener('input', calculateTotal);
    document.getElementById('tax').addEventListener('input', calculateTotal);
    
    // Allow Enter key to add person
    document.getElementById('personName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addPerson();
        }
    });
    
    // Allow Enter key to add shared item
    document.getElementById('sharedItemName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSharedItem();
        }
    });
    
    document.getElementById('sharedItemPrice').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSharedItem();
        }
    });
});

// Calculate total automatically
function calculateTotal() {
    const subtotal = parseFloat(document.getElementById('subtotal').value) || 0;
    const tax = parseFloat(document.getElementById('tax').value) || 0;
    const total = subtotal + tax;
    document.getElementById('total').value = total.toFixed(2);
}

// Add a new person
function addPerson() {
    const personNameInput = document.getElementById('personName');
    const name = personNameInput.value.trim();
    
    if (!name) {
        showNotification('Please enter a person\'s name', 'error');
        return;
    }
    
    // Check if person already exists
    if (people.some(person => person.name.toLowerCase() === name.toLowerCase())) {
        showNotification('A person with this name already exists', 'error');
        return;
    }
    
    personCounter++;
    const person = {
        id: personCounter,
        name: name,
        items: []
    };
    
    people.push(person);
    personNameInput.value = '';
    renderPeople();
    updateSharedItemsSection();
    showNotification(`${name} added successfully!`, 'success');
}

// Remove a person
function removePerson(personId) {
    people = people.filter(person => person.id !== personId);
    
    // Remove person from shared items
    sharedItems.forEach(item => {
        item.people = item.people.filter(id => id !== personId);
    });
    
    // Remove shared items with no people
    sharedItems = sharedItems.filter(item => item.people.length > 0);
    
    renderPeople();
    renderSharedItems();
    updateSharedItemsSection();
    showNotification('Person removed successfully!', 'success');
}

// Add food item to a person
function addItem(personId) {
    const itemNameInput = document.getElementById(`itemName-${personId}`);
    const itemPriceInput = document.getElementById(`itemPrice-${personId}`);
    
    const itemName = itemNameInput.value.trim();
    const itemPrice = parseFloat(itemPriceInput.value);
    
    if (!itemName) {
        showNotification('Please enter an item name', 'error');
        return;
    }
    
    if (!itemPrice || itemPrice <= 0) {
        showNotification('Please enter a valid price', 'error');
        return;
    }
    
    const person = people.find(p => p.id === personId);
    if (person) {
        person.items.push({
            name: itemName,
            price: itemPrice
        });
        
        itemNameInput.value = '';
        itemPriceInput.value = '';
        renderPeople();
        showNotification(`${itemName} added to ${person.name}`, 'success');
    }
}

// Remove an item from a person
function removeItem(personId, itemIndex) {
    const person = people.find(p => p.id === personId);
    if (person && person.items[itemIndex]) {
        const itemName = person.items[itemIndex].name;
        person.items.splice(itemIndex, 1);
        renderPeople();
        showNotification(`${itemName} removed successfully!`, 'success');
    }
}

// Update shared items section visibility
function updateSharedItemsSection() {
    const sharedItemsSection = document.getElementById('sharedItemsSection');
    if (people.length >= 2) {
        sharedItemsSection.style.display = 'block';
        renderSharedPeopleCheckboxes();
    } else {
        sharedItemsSection.style.display = 'none';
    }
}

// Render shared people checkboxes
function renderSharedPeopleCheckboxes() {
    const checkboxesContainer = document.getElementById('sharedPeopleCheckboxes');
    
    checkboxesContainer.innerHTML = people.map(person => `
        <div class="checkbox-item">
            <input type="checkbox" id="shared-${person.id}" value="${person.id}">
            <label for="shared-${person.id}">${person.name}</label>
        </div>
    `).join('');
}

// Add shared item
function addSharedItem() {
    const itemNameInput = document.getElementById('sharedItemName');
    const itemPriceInput = document.getElementById('sharedItemPrice');
    
    const itemName = itemNameInput.value.trim();
    const itemPrice = parseFloat(itemPriceInput.value);
    
    if (!itemName) {
        showNotification('Please enter a shared item name', 'error');
        return;
    }
    
    if (!itemPrice || itemPrice <= 0) {
        showNotification('Please enter a valid price', 'error');
        return;
    }
    
    // Get selected people
    const selectedPeople = [];
    people.forEach(person => {
        const checkbox = document.getElementById(`shared-${person.id}`);
        if (checkbox && checkbox.checked) {
            selectedPeople.push(person.id);
        }
    });
    
    if (selectedPeople.length < 2) {
        showNotification('Please select at least 2 people to share this item', 'error');
        return;
    }
    
    sharedItemCounter++;
    const sharedItem = {
        id: sharedItemCounter,
        name: itemName,
        price: itemPrice,
        people: selectedPeople
    };
    
    sharedItems.push(sharedItem);
    
    // Clear form
    itemNameInput.value = '';
    itemPriceInput.value = '';
    
    // Uncheck all checkboxes
    people.forEach(person => {
        const checkbox = document.getElementById(`shared-${person.id}`);
        if (checkbox) {
            checkbox.checked = false;
        }
    });
    
    renderSharedItems();
    showNotification(`${itemName} added as shared item!`, 'success');
}

// Remove shared item
function removeSharedItem(itemId) {
    const item = sharedItems.find(item => item.id === itemId);
    if (item) {
        const itemName = item.name;
        sharedItems = sharedItems.filter(item => item.id !== itemId);
        renderSharedItems();
        showNotification(`${itemName} removed from shared items!`, 'success');
    }
}

// Render shared items
function renderSharedItems() {
    const sharedItemsList = document.getElementById('sharedItemsList');
    
    if (sharedItems.length === 0) {
        sharedItemsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-share-alt" style="font-size: 2rem; color: #cbd5e0; margin-bottom: 10px;"></i>
                <p style="color: #718096; text-align: center;">No shared items yet. Add items that multiple people are sharing!</p>
            </div>
        `;
        return;
    }
    
    sharedItemsList.innerHTML = sharedItems.map(item => {
        const sharedPeopleNames = item.people.map(personId => {
            const person = people.find(p => p.id === personId);
            return person ? person.name : 'Unknown';
        });
        
        const costPerPerson = item.price / item.people.length;
        
        return `
            <div class="shared-item-card">
                <div class="shared-item-header">
                    <div class="shared-item-name">${item.name}</div>
                    <div class="shared-item-price">₹${item.price.toFixed(2)}</div>
                </div>
                <div class="shared-item-people">
                    ${sharedPeopleNames.map(name => `
                        <span class="shared-person-tag">${name}</span>
                    `).join('')}
                </div>
                <div class="shared-item-cost">
                    Cost per person: ₹${costPerPerson.toFixed(2)} (${item.people.length} people sharing)
                </div>
                <button onclick="removeSharedItem(${item.id})" class="btn btn-danger" style="margin-top: 10px; padding: 6px 12px; font-size: 0.8rem;">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
    }).join('');
}

// Render all people and their items
function renderPeople() {
    const peopleList = document.getElementById('peopleList');
    
    if (people.length === 0) {
        peopleList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users" style="font-size: 3rem; color: #cbd5e0; margin-bottom: 15px;"></i>
                <p style="color: #718096; text-align: center;">No people added yet. Add the first person to get started!</p>
            </div>
        `;
        return;
    }
    
    peopleList.innerHTML = people.map(person => `
        <div class="person-card" data-person-id="${person.id}">
            <div class="person-header">
                <div class="person-name">${person.name}</div>
                <button onclick="removePerson(${person.id})" class="btn btn-danger">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            
            <div class="person-items">
                ${person.items.map((item, index) => `
                    <div class="item-card">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">₹${item.price.toFixed(2)}</span>
                        <button onclick="removeItem(${person.id}, ${index})" class="btn btn-danger" style="padding: 4px 8px; font-size: 0.8rem;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
            
            <div class="add-item-form">
                <input type="text" id="itemName-${person.id}" placeholder="Food item name" maxlength="30">
                <input type="number" id="itemPrice-${person.id}" placeholder="Price" step="0.01" min="0">
                <button onclick="addItem(${person.id})" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Add Item
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners for Enter key on new inputs
    people.forEach(person => {
        const itemNameInput = document.getElementById(`itemName-${person.id}`);
        const itemPriceInput = document.getElementById(`itemPrice-${person.id}`);
        
        if (itemNameInput) {
            itemNameInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addItem(person.id);
                }
            });
        }
        
        if (itemPriceInput) {
            itemPriceInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addItem(person.id);
                }
            });
        }
    });
}

// Calculate the bill split
function calculateBill() {
    if (people.length === 0) {
        showNotification('Please add at least one person first', 'error');
        return;
    }
    
    const subtotal = parseFloat(document.getElementById('subtotal').value) || 0;
    const tax = parseFloat(document.getElementById('tax').value) || 0;
    const total = subtotal + tax;
    
    if (total <= 0) {
        showNotification('Please enter valid bill amounts', 'error');
        return;
    }
    
    // Calculate total food cost from all items (individual + shared)
    const totalIndividualFoodCost = people.reduce((sum, person) => {
        return sum + person.items.reduce((personSum, item) => personSum + item.price, 0);
    }, 0);
    
    const totalSharedFoodCost = sharedItems.reduce((sum, item) => sum + item.price, 0);
    const totalFoodCost = totalIndividualFoodCost + totalSharedFoodCost;
    
    if (totalFoodCost === 0) {
        showNotification('Please add food items for at least one person', 'error');
        return;
    }
    
    // Calculate tax per person (split equally)
    const taxPerPerson = tax / people.length;
    
    // Calculate each person's share
    const results = people.map(person => {
        // Individual food cost
        const individualFoodCost = person.items.reduce((sum, item) => sum + item.price, 0);
        
        // Shared food cost (items this person is sharing)
        const sharedFoodCost = sharedItems.reduce((sum, item) => {
            if (item.people.includes(person.id)) {
                return sum + (item.price / item.people.length);
            }
            return sum;
        }, 0);
        
        const totalFoodCost = individualFoodCost + sharedFoodCost;
        const personShare = totalFoodCost + taxPerPerson;
        
        return {
            name: person.name,
            individualItems: person.items,
            sharedItems: sharedItems.filter(item => item.people.includes(person.id)),
            individualFoodCost: individualFoodCost,
            sharedFoodCost: sharedFoodCost,
            totalFoodCost: totalFoodCost,
            taxShare: taxPerPerson,
            totalShare: personShare
        };
    });
    
    // Display results
    displayResults(results, total, taxPerPerson);
    
    // Add success animation
    document.getElementById('resultsSection').classList.add('success');
    setTimeout(() => {
        document.getElementById('resultsSection').classList.remove('success');
    }, 500);
}

// Display the calculation results
function displayResults(results, totalBill, taxPerPerson) {
    const resultsSection = document.getElementById('resultsSection');
    const totalBillDisplay = document.getElementById('totalBillDisplay');
    const taxPerPersonDisplay = document.getElementById('taxPerPerson');
    const participantCount = document.getElementById('participantCount');
    const resultsTable = document.getElementById('resultsTable');
    
    // Update summary cards
    totalBillDisplay.textContent = `₹${totalBill.toFixed(2)}`;
    taxPerPersonDisplay.textContent = `₹${taxPerPerson.toFixed(2)}`;
    participantCount.textContent = people.length;
    
    // Generate results table
    resultsTable.innerHTML = results.map(result => {
        const individualItemsText = result.individualItems.map(item => 
            `${item.name} (₹${item.price.toFixed(2)})`
        ).join(', ');
        
        const sharedItemsText = result.sharedItems.map(item => 
            `${item.name} (₹${(item.price / item.people.length).toFixed(2)} each)`
        ).join(', ');
        
        let itemsText = '';
        if (individualItemsText && sharedItemsText) {
            itemsText = `${individualItemsText} + Shared: ${sharedItemsText}`;
        } else if (individualItemsText) {
            itemsText = individualItemsText;
        } else if (sharedItemsText) {
            itemsText = `Shared: ${sharedItemsText}`;
        }
        
        return `
            <div class="person-result">
                <div class="person-result-info">
                    <div class="person-result-name">${result.name}</div>
                    <div class="person-result-items">
                        ${itemsText}
                    </div>
                </div>
                <div class="person-result-amount">
                    ₹${result.totalShare.toFixed(2)}
                </div>
            </div>
        `;
    }).join('');
    
    // Show results section
    resultsSection.style.display = 'block';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Show notification messages
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            font-size: 1rem;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Reset the entire application
function resetApp() {
    people = [];
    personCounter = 0;
    sharedItems = [];
    sharedItemCounter = 0;
    document.getElementById('subtotal').value = '';
    document.getElementById('tax').value = '';
    document.getElementById('total').value = '';
    document.getElementById('personName').value = '';
    document.getElementById('sharedItemName').value = '';
    document.getElementById('sharedItemPrice').value = '';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('sharedItemsSection').style.display = 'none';
    renderPeople();
    renderSharedItems();
    showNotification('Application reset successfully!', 'success');
}

// Add reset button functionality (can be called from console or added to UI)
window.resetApp = resetApp; 