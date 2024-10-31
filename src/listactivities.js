document.addEventListener('DOMContentLoaded', () => {
  const createButton = document.getElementById('createButton');
  const activityTableBody = document.getElementById('activityTableBody');

  // Predefined activities
  const predefinedActivities = [ 
      { name: 'Hiking', equipment: ['Hiking boots', 'Backpack', 'Water bottle', 'First aid kit', 'Trail map'] },
      { name: 'Picnicking', equipment: ['Picnic blanket', 'Cooler', 'Reusable plates and utensils', 'Snacks', 'Sunscreen'] },
      { name: 'Cycling', equipment: ['Bicycle', 'Helmet', 'Water bottle', 'Bike lock', 'Repair kit'] },
      { name: 'Fishing', equipment: ['Fishing rod and reel', 'Tackle box', 'Bait', 'Fishing license', 'Cooler for catch'] },
      { name: 'Camping', equipment: ['Tent', 'Sleeping bag', 'Camp stove', 'Lantern', 'Camping chair'] },
      { name: 'Skiing', equipment: ['Skis and poles', 'Ski boots', 'Helmet', 'Goggles', 'Ski pass'] },
      { name: 'Snowshoeing', equipment: ['Snowshoes', 'Waterproof boots', 'Warm clothing', 'Trekking poles', 'Backpack'] },
      { name: 'Ice Skating', equipment: ['Ice skates', 'Helmet', 'Warm clothing', 'Gloves', 'Water bottle'] },
      { name: 'Sledding', equipment: ['Sled', 'Warm clothing', 'Helmet', 'Gloves', 'Hot drinks in a thermos'] },
      { name: 'Walking or Jogging', equipment: ['Comfortable shoes', 'Lightweight jacket', 'Water bottle', 'Fitness tracker (optional)', 'Hat'] },
      { name: 'Outdoor Yoga', equipment: ['Yoga mat', 'Comfortable clothing', 'Water bottle', 'Towel', 'Sunscreen'] },
      { name: 'Gardening', equipment: ['Gardening gloves', 'Hand trowel', 'Pruning shears', 'Watering can', 'Seeds or plants'] },
      { name: 'Outdoor Painting or Sketching', equipment: ['Canvas or sketchbook', 'Paints or pencils', 'Easel', 'Brush set', 'Water container'] },
      { name: 'Nature Photography', equipment: ['Camera', 'Tripod', 'Extra batteries', 'Lens cleaning kit'] },
      { name: 'Indoor Rock Climbing', equipment: ['Climbing shoes', 'Harness', 'Chalk bag', 'Climbing guidebook (if needed)', 'Water bottle'] },
      { name: 'Swimming', equipment: ['Swimwear', 'Towel', 'Flip-flops or water shoes', 'Goggles', 'Waterproof bag for wet items'] },
      { name: 'Try a Cooking Class', equipment: ['Apron', 'Notepad for recipes', 'Chef\'s knife (if allowed)', 'Storage containers for leftovers', 'Comfortable shoes'] },
      { name: 'Attend a Local Event or Fair', equipment: ['Comfortable clothing', 'Umbrella or rain jacket', 'Cash for vendors', 'Backpack for personal items', 'Camera (optional)'] }
  ];

  // Check if `localStorage` has the `activities` key; if not, initialize it with predefined activities
  if (!localStorage.getItem('activities')) {
      localStorage.setItem('activities', JSON.stringify(predefinedActivities));
  }

  // Load activities from `localStorage` (predefined + user-added)
  const activities = JSON.parse(localStorage.getItem('activities'));

  // Clear any existing rows in the activity table
  activityTableBody.innerHTML = '';

  // Populate the activity table
  activities.forEach(activity => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><a href="checklist.html?activity=${encodeURIComponent(activity.name)}">${activity.name}</a></td>
          <td>${activity.equipment.join(', ')}</td>
          <td>
              <button class="updateButton" data-name="${activity.name}">Update</button>
              <button class="deleteButton" data-name="${activity.name}">Delete</button>
          </td>
      `;
      activityTableBody.appendChild(row);
  });

  // Create button functionality
  createButton.addEventListener('click', () => {
      window.location.href = 'createactivity.html';
  });

  // Event delegation for update and delete buttons
  activityTableBody.addEventListener('click', (event) => {
      if (event.target.classList.contains('deleteButton')) {
          const activityName = event.target.getAttribute('data-name');
          const confirmDelete = confirm(`Are you sure you want to delete ${activityName}?`);
          if (confirmDelete) {
              // Remove the activity from localStorage
              const updatedActivities = activities.filter(activity => activity.name !== activityName);
              localStorage.setItem('activities', JSON.stringify(updatedActivities));
              // Reload the activity list
              location.reload();
          }
      } else if (event.target.classList.contains('updateButton')) {
          const activityName = event.target.getAttribute('data-name');
          window.location.href = `updateactivity.html?activity=${encodeURIComponent(activityName)}`;
      }
  });

  // Back button functionality
  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', () => {
      window.location.href = 'index.html';
  });
});
