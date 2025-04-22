// My Events JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Filter events based on status
    const statusFilter = document.getElementById('event-status-filter');
    const filterButton = document.querySelector('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (filterButton && statusFilter && eventCards.length > 0) {
        filterButton.addEventListener('click', function() {
            const selectedStatus = statusFilter.value;
            
            eventCards.forEach(card => {
                const cardStatus = card.querySelector('.event-status').classList;
                
                if (selectedStatus === 'all') {
                    card.style.display = 'block';
                } else if (cardStatus.contains(selectedStatus)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Delete event confirmation
    const deleteButtons = document.querySelectorAll('.btn-action.delete');
    
    if (deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const eventTitle = this.closest('.event-details').querySelector('h3').textContent;
                
                if (confirm(`Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`)) {
                    this.closest('.event-card').remove();
                    
                    const messagesContainer = document.createElement('div');
                    messagesContainer.className = 'messages-container';
                    messagesContainer.innerHTML = `
                        <div class="message success">
                            <i class="fas fa-check-circle"></i>
                            <span>Event "${eventTitle}" has been successfully deleted.</span>
                            <button class="close-message"><i class="fas fa-times"></i></button>
                        </div>
                    `;
                    
                    document.querySelector('.dashboard-main').prepend(messagesContainer);
                    
                    setTimeout(() => {
                        messagesContainer.remove();
                    }, 5000);
                    
                    const closeButton = messagesContainer.querySelector('.close-message');
                    if (closeButton) {
                        closeButton.addEventListener('click', function() {
                            messagesContainer.remove();
                        });
                    }
                }
            });
        });
    }
    
    // Publish event functionality
    const publishButtons = document.querySelectorAll('.btn-action.publish');
    
    if (publishButtons) {
        publishButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const eventCard = this.closest('.event-card');
                const eventStatus = eventCard.querySelector('.event-status');
                const eventTitle = eventCard.querySelector('h3').textContent;
                
                eventStatus.classList.remove('draft');
                eventStatus.classList.add('active');
                eventStatus.textContent = 'Active';
                
                this.innerHTML = '<i class="fas fa-users"></i> Participants';
                this.classList.remove('publish');
                this.href = 'event-participants.html';
                
                const messagesContainer = document.createElement('div');
                messagesContainer.className = 'messages-container';
                messagesContainer.innerHTML = `
                    <div class="message success">
                        <i class="fas fa-check-circle"></i>
                        <span>Event "${eventTitle}" has been published successfully.</span>
                        <button class="close-message"><i class="fas fa-times"></i></button>
                    </div>
                `;
                
                document.querySelector('.dashboard-main').prepend(messagesContainer);
                
                setTimeout(() => {
                    messagesContainer.remove();
                }, 5000);
                
                const closeButton = messagesContainer.querySelector('.close-message');
                if (closeButton) {
                    closeButton.addEventListener('click', function() {
                        messagesContainer.remove();
                    });
                }
            });
        });
    }
    
    // Duplicate event functionality
    const duplicateButtons = document.querySelectorAll('.btn-action.duplicate');
    
    if (duplicateButtons) {
        duplicateButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const eventCard = this.closest('.event-card');
                const eventTitle = eventCard.querySelector('h3').textContent;
                
                const messagesContainer = document.createElement('div');
                messagesContainer.className = 'messages-container';
                messagesContainer.innerHTML = `
                    <div class="message success">
                        <i class="fas fa-check-circle"></i>
                        <span>Event "${eventTitle}" has been duplicated. You can now edit the new draft.</span>
                        <button class="close-message"><i class="fas fa-times"></i></button>
                    </div>
                `;
                
                document.querySelector('.dashboard-main').prepend(messagesContainer);
                
                setTimeout(() => {
                    messagesContainer.remove();
                }, 5000);
                
                const closeButton = messagesContainer.querySelector('.close-message');
                if (closeButton) {
                    closeButton.addEventListener('click', function() {
                        messagesContainer.remove();
                    });
                }
            });
        });
    }
});
