document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.location.href = 'listactivities.html';
    });

    const activityForm = document.getElementById('activityForm');
    activityForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const activityName = document.getElementById('activityName').value.trim();
        const equipment = document.getElementById('equipment').value.split(',').map(item => item.trim());

        if (activityName && equipment.length > 0) {
            // Get the existing activities from `localStorage`
            const activities = JSON.parse(localStorage.getItem('activities')) || [];

            // Add new activity
            activities.push({ name: activityName, equipment });
            localStorage.setItem('activities', JSON.stringify(activities));

            // Redirect back to list of activities
            window.location.href = 'listactivities.html';
        }
    });
});
