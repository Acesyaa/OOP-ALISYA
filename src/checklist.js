document.addEventListener('DOMContentLoaded', () => {
  const activities = [
      { 
          name: 'Hiking', 
          equipment: [
              'Hiking boots', 'Backpack', 'Water bottle', 
              'First aid kit', 'Trail map'
          ] 
      },
      { 
          name: 'Picnicking', 
          equipment: [
              'Picnic blanket', 'Cooler', 'Reusable plates and utensils', 
              'Snacks', 'Sunscreen'
          ] 
      },
      { 
          name: 'Cycling', 
          equipment: [
              'Bicycle', 'Helmet', 'Water bottle', 
              'Bike lock', 'Repair kit'
          ] 
      },
      { 
          name: 'Fishing', 
          equipment: [
              'Fishing rod and reel', 'Tackle box', 'Bait', 
              'Fishing license', 'Cooler for catch'
          ] 
      },
      { 
          name: 'Camping', 
          equipment: [
              'Tent', 'Sleeping bag', 'Camp stove', 
              'Lantern', 'Camping chair'
          ] 
      },
      { 
          name: 'Skiing', 
          equipment: [
              'Skis and poles', 'Ski boots', 'Helmet', 
              'Goggles', 'Ski pass'
          ] 
      },
      { 
          name: 'Snowshoeing', 
          equipment: [
              'Snowshoes', 'Waterproof boots', 'Warm clothing', 
              'Trekking poles', 'Backpack'
          ] 
      },
      { 
          name: 'Ice Skating', 
          equipment: [
              'Ice skates', 'Helmet', 'Warm clothing', 
              'Gloves', 'Water bottle'
          ] 
      },
      { 
          name: 'Sledding', 
          equipment: [
              'Sled', 'Warm clothing', 'Helmet', 
              'Gloves', 'Hot drinks in a thermos'
          ] 
      },
      { 
          name: 'Walking or Jogging', 
          equipment: [
              'Comfortable shoes', 'Lightweight jacket', 'Water bottle', 
              'Fitness tracker (optional)', 'Hat'
          ] 
      },
      { 
          name: 'Outdoor Yoga', 
          equipment: [
              'Yoga mat', 'Comfortable clothing', 'Water bottle', 
              'Towel', 'Sunscreen'
          ] 
      },
      { 
          name: 'Gardening', 
          equipment: [
              'Gardening gloves', 'Hand trowel', 'Pruning shears', 
              'Watering can', 'Seeds or plants'
          ] 
      },
      { 
          name: 'Outdoor Painting or Sketching', 
          equipment: [
              'Canvas or sketchbook', 'Paints or pencils', 'Easel', 
              'Brush set', 'Water container'
          ] 
      },
      { 
          name: 'Nature Photography', 
          equipment: [
              'Camera', 'Tripod', 'Extra batteries', 
              'Lens cleaning kit'
          ] 
      },
      { 
          name: 'Indoor Rock Climbing', 
          equipment: [
              'Climbing shoes', 'Harness', 'Chalk bag', 
              'Climbing guidebook (if needed)', 'Water bottle'
          ] 
      },
      { 
          name: 'Swimming', 
          equipment: [
              'Swimwear', 'Towel', 'Flip-flops or water shoes', 
              'Goggles', 'Waterproof bag for wet items'
          ] 
      },
      { 
          name: 'Try a Cooking Class', 
          equipment: [
              'Apron', 'Notepad for recipes', 'Chef\'s knife (if allowed)', 
              'Storage containers for leftovers', 'Comfortable shoes'
          ] 
      },
      { 
          name: 'Attend a Local Event or Fair', 
          equipment: [
              'Comfortable clothing', 'Umbrella or rain jacket', 'Cash for vendors', 
              'Backpack for personal items', 'Camera (optional)'
          ] 
      }
  ];
  
  const params = new URLSearchParams(window.location.search);
    const activityName = params.get('activity');

    const activity = activities.find(act => act.name === activityName);
    const activityTitle = document.getElementById('activityTitle');
    const checklist = document.getElementById('checklist');

    // Local storage key based on activity name to keep separate checklists
    const storageKey = `checklist_${activityName}`;

    // Load saved checklist state
    const savedChecklist = JSON.parse(localStorage.getItem(storageKey)) || {};

    if (activity) {
        activityTitle.textContent = `${activity.name} Checklist`;
        activity.equipment.forEach((item, index) => {
            const row = document.createElement('tr');

            const itemCell = document.createElement('td');
            itemCell.textContent = item;

            const checkCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = savedChecklist[index] || false;  // Load saved state
            checkbox.addEventListener('change', () => {
                // Update the saved state in local storage
                savedChecklist[index] = checkbox.checked;
                localStorage.setItem(storageKey, JSON.stringify(savedChecklist));
            });

            checkCell.appendChild(checkbox);
            row.appendChild(itemCell);
            row.appendChild(checkCell);
            checklist.appendChild(row);
        });
    } else {
        activityTitle.textContent = 'Activity not found.';
    }

    // Back button functionality
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.location.href = 'listactivities.html';
    });
});