function toggleMenu() {
	const menuIcon = document.querySelector('.menu-icon');
	const navMenu = document.querySelector('.nav-menu');
	
	menuIcon.classList.toggle('active');
	navMenu.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
	const menuIcon = document.querySelector('.menu-icon');
	const navMenu = document.querySelector('.nav-menu');
	
	if (!menuIcon.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
		menuIcon.classList.remove('active');
		navMenu.classList.remove('active');
	}
});

// Create floating music notes
function createMusicNotes() {
    const notes = ['♪', '♫', '♬', '♩'];
    const notesContainer = document.querySelector('.login-music-notes');
    
    setInterval(() => {
        const note = document.createElement('div');
        note.className = 'login-note';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.left = Math.random() * 100 + '%';
        note.style.animationDuration = (3 + Math.random() * 4) + 's';
        notesContainer.appendChild(note);
        
        setTimeout(() => {
            note.remove();
        }, 7000);
    }, 300);
}

// Animate logo and container on load
document.addEventListener('DOMContentLoaded', () => {
    createMusicNotes();
    
    gsap.from('.login-logo', {
        duration: 1.5,
        y: -100,
        opacity: 0,
        scale: 0.5,
        ease: 'elastic.out(1, 0.5)'
    });

    gsap.from('.login-container', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: 'power2.out'
    });
});

// Form submission handling
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.login-submit-btn');
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    // Validate credentials
    if (email === 'test@example.com' && password === 'password123') {
        // Success animation and redirect
        gsap.to(btn, {
            duration: 0.1,
            scale: 0.95,
            backgroundColor: '#4CAF50',
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                window.location.replace("home.html");
            }
        });
    } else {
        // Error animation and feedback
        gsap.to(btn, {
            duration: 0.1,
            scale: 0.95,
            backgroundColor: '#FF4444',
            yoyo: true,
            repeat: 3,
            onComplete: () => {
                btn.style.backgroundColor = '#FFD700';
                alert('Invalid credentials!\nUse:\nEmail: test@example.com\nPassword: password123');
            }
        });
    }
});

// Input animations
document.querySelectorAll('.login-input').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            duration: 0.3,
            scale: 1.02,
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', () => {
        gsap.to(input, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.out'
        });
    });
});

function toggleMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    
    menuIcon.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function redirectToCart() {
    window.location.href = 'cart.html';
}
