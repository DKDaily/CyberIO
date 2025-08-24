/* File Path: /assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selections ---
    const themeToggle = document.getElementById('themeToggle');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeNavBtn = document.getElementById('close-nav-btn');
    const bodyOverlay = document.getElementById('body-overlay');
    const submenuToggle = document.getElementById('wazuh-submenu-toggle');
    const rotatingText = document.getElementById("rotatingText");
    const linkedinLink = document.getElementById("linkedinLink");

    // --- Theme Toggle Functionality ---
    const isLightTheme = document.documentElement.hasAttribute('data-theme');
    themeToggle.checked = !isLightTheme;

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });

    // --- Side Navigation Toggle ---
    function toggleNav() {
        document.body.classList.toggle('nav-open');
    }

    hamburgerBtn.addEventListener('click', toggleNav);
    closeNavBtn.addEventListener('click', toggleNav);
    bodyOverlay.addEventListener('click', toggleNav);

    // --- Submenu Toggle ---
    if (submenuToggle) {
        submenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = document.getElementById('wazuh-submenu');
            submenuToggle.classList.toggle('active');
            submenu.classList.toggle('open');
        });
    }

    // --- App Loading Logic ---
    async function loadApp(appName) {
        console.log(`Loading app: ${appName}`);
        const contentArea = document.getElementById('app-content');
        
        if (document.body.classList.contains('nav-open')) {
            toggleNav();
        }

        contentArea.innerHTML = `<div style="font-size: 1.5rem;">Loading ${appName}...</div>`;

        try {
            // This fetch path is constructed dynamically and handles nested folders
            const response = await fetch(`tools/${appName}.html`);
            if (!response.ok) {
                throw new Error(`Could not load tool. Status: ${response.status}`);
            }
            const appHtml = await response.text();
            contentArea.innerHTML = appHtml;
        } catch (error) {
            console.error('Error loading app:', error);
            contentArea.innerHTML = `<div style="font-size: 1.2rem; color: var(--error);">Failed to load the tool. Please check the console for details.</div>`;
        }
    }

    // Add click listeners to all tool links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const appName = event.target.dataset.app;
            
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            event.target.classList.add('active');

            if (appName) {
                loadApp(appName);
            }
        });
    });

    // --- Footer Animation Logic ---
    if (rotatingText && linkedinLink) {
        const itemHeight = 24;
        const originalItemsCount = rotatingText.children.length;
        let index = 0;

        const firstItemClone = rotatingText.children[0].cloneNode(true);
        rotatingText.appendChild(firstItemClone);

        setInterval(() => {
            index++;
            rotatingText.style.transition = "transform 0.5s ease-in-out";
            rotatingText.style.transform = `translateY(-${index * itemHeight}px)`;
            linkedinLink.classList.add('linkedin-glow');

            setTimeout(() => {
                linkedinLink.classList.remove('linkedin-glow');
            }, 1500);

            if (index === originalItemsCount) {
                setTimeout(() => {
                    rotatingText.style.transition = 'none';
                    index = 0;
                    rotatingText.style.transform = `translateY(0px)`;
                }, 500);
            }
        }, 2000);
    }
    
    // --- Dynamic Welcome Message ---
    function setWelcomeMessage() {
        const welcomeElement = document.getElementById('welcome-message');
        if (!welcomeElement) return; // Exit if the element isn't on the page

        const currentHour = new Date().getHours();
        let greeting;

        if (currentHour < 12) {
            greeting = 'Good morning.';
        } else if (currentHour < 18) {
            greeting = 'Good afternoon.';
        } else {
            greeting = 'Good evening.';
        }

        welcomeElement.textContent = `${greeting} Welcome to CyberIO Hub`;
    }

    // --- Initial Setup ---
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    setWelcomeMessage(); // Set the dynamic greeting on page load
});
