document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const activityName = urlParams.get('activity');

    const activities = JSON.parse(localStorage.getItem('activities'));
    const activity = activities.find(act => act.name === activityName);

    if (activity) {
        document.getElementById('activityName').value = activity.name;
        document.getElementById('equipment').value = activity.equipment.join(', ');
    }

    document.getElementById('updateForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const updatedEquipment = document.getElementById('equipment').value.split(',').map(item => item.trim());
        activity.equipment = updatedEquipment;

        localStorage.setItem('activities', JSON.stringify(activities));
        alert('Activity updated successfully!');
        window.location.href = 'listactivities.html'; // Redirect back to the list
    });

    document.getElementById('backButton').addEventListener('click', () => {
        window.location.href = 'listactivities.html';
    });
});
