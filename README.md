# Smart Bill Splitter 🍽️

A modern, user-friendly web application for splitting restaurant bills fairly based on what each person ate, with tax split equally among all participants. **Now with shared items support!**

## Features ✨

- **Fair Bill Splitting**: Calculate individual costs based on what each person actually ate
- **Shared Items Support**: Split costs for items shared between multiple people (appetizers, desserts, etc.)
- **Equal Tax Distribution**: Tax is split equally among all participants
- **Modern UI**: Beautiful, responsive design that works on all devices
- **Real-time Calculations**: Automatic total calculation and validation
- **Easy Management**: Add/remove people and food items with simple clicks
- **Detailed Breakdown**: See exactly what each person owes with itemized lists

## How It Works 🧮

1. **Add People**: Enter names of all participants
2. **Add Individual Food Items**: For each person, add what they ate and the price
3. **Add Shared Items**: Add items that multiple people are sharing (optional)
4. **Enter Bill Details**: Input the subtotal and tax from the restaurant bill
5. **Calculate**: Get a fair breakdown showing what each person should pay

### Example Scenario 📝

Let's say 5 people went to a restaurant:
- **Person 1**: Biryani (₹200)
- **Person 2**: Fried Rice (₹150) + Pepsi (₹50)
- **Person 3**: Fried Rice (₹150)
- **Person 4**: Chapati (₹80)
- **Person 5**: Noodles (₹120)
- **Shared**: Garlic Bread (₹100) - shared by Person 1, 2, and 3

**Bill Details**:
- Subtotal: ₹850 (₹750 individual + ₹100 shared)
- Tax: ₹85
- Total: ₹935

**Fair Split**:
- Person 1: ₹200 (food) + ₹33.33 (shared) + ₹17 (tax) = ₹250.33
- Person 2: ₹200 (food) + ₹33.33 (shared) + ₹17 (tax) = ₹250.33
- Person 3: ₹150 (food) + ₹33.33 (shared) + ₹17 (tax) = ₹200.33
- Person 4: ₹80 (food) + ₹17 (tax) = ₹97
- Person 5: ₹120 (food) + ₹17 (tax) = ₹137

## How to Use 🚀

1. **Open the Application**: Simply open `index.html` in any modern web browser
2. **Add Participants**: 
   - Type a person's name in the input field
   - Click "Add Person" or press Enter
3. **Add Individual Food Items**:
   - For each person, enter the food item name and price
   - Click "Add Item" or press Enter
4. **Add Shared Items** (optional):
   - Once you have at least 2 people, the "Shared Items" section appears
   - Enter the shared item name and price
   - Select which people are sharing the item using checkboxes
   - Click "Add Shared Item"
5. **Enter Bill Details**:
   - Input the subtotal (food cost before tax)
   - Input the tax amount
   - The total will be calculated automatically
6. **Calculate Split**: Click "Calculate Fair Split" to see the results

## Features in Detail 🔍

### Adding People
- Enter names up to 20 characters
- Duplicate names are not allowed
- Remove people with the trash button

### Adding Individual Food Items
- Enter item names up to 30 characters
- Prices must be positive numbers
- Remove individual items with the X button
- Support for decimal prices (e.g., ₹99.50)

### Adding Shared Items
- **When Available**: Only appears when you have 2 or more people
- **Item Details**: Enter name and total price of the shared item
- **People Selection**: Use checkboxes to select which people are sharing
- **Automatic Split**: Cost is automatically divided equally among selected people
- **Visual Feedback**: Shows who is sharing each item and cost per person

### Bill Calculation
- **Subtotal**: Total food cost before tax (individual + shared items)
- **Tax**: Tax amount (split equally among all participants)
- **Total**: Automatically calculated (subtotal + tax)

### Results Display
- **Summary Cards**: Show total bill, tax per person, and participant count
- **Individual Breakdown**: Each person's items (individual + shared) and final amount
- **Fair Calculation**: Individual food cost + shared food cost + equal tax share

## Perfect for These Scenarios 🎯

### Appetizers & Starters
- Garlic bread shared by 3 people
- Nachos shared by 4 people
- Soup shared by 2 people

### Main Course Sharing
- Large pizza shared by multiple people
- Family-style dishes
- Platters and combos

### Desserts & Drinks
- Ice cream sundae shared by 2 people
- Large milkshake shared by 3 people
- Cake or dessert platter

### Special Occasions
- Birthday cake shared by all attendees
- Anniversary champagne shared by the couple
- Group celebrations with shared items

## Technical Details 💻

- **Frontend**: Pure HTML, CSS, and JavaScript
- **No Dependencies**: Works offline, no external libraries required
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Gradient backgrounds, smooth animations, and intuitive design
- **Accessibility**: Keyboard navigation and clear visual feedback

## Browser Compatibility 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with JavaScript enabled

## File Structure 📁

```
Fund Sharing/
├── index.html      # Main HTML file
├── styles.css      # CSS styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Tips for Best Results 💡

1. **Be Accurate**: Enter exact prices from the menu
2. **Include Everything**: Don't forget drinks, desserts, or shared items
3. **Use Shared Items**: For any item consumed by multiple people, use the shared items feature
4. **Check Your Math**: The app will validate that food costs match the subtotal
5. **Use Clear Names**: Use descriptive food item names for easy reference
6. **Save Results**: Take a screenshot of the final breakdown for reference

## Troubleshooting 🔧

**"Please add at least one person first"**
- Make sure you've added at least one person before calculating

**"Please add food items for at least one person"**
- Each person needs at least one food item to calculate the split

**"Please enter valid bill amounts"**
- Ensure subtotal and tax are positive numbers

**"A person with this name already exists"**
- Use different names for each participant

**"Please select at least 2 people to share this item"**
- Shared items require at least 2 people to be selected

**Shared Items section not appearing**
- You need at least 2 people added before shared items become available

## Future Enhancements 🚀

- Save/load bill configurations
- Export results to PDF
- Multiple currency support
- Custom sharing ratios (not just equal splits)
- Tip calculation options
- Bill history
- Split by percentage or custom amounts

---

**Made with ❤️ for fair bill splitting!**

Open `index.html` in your browser to get started! 