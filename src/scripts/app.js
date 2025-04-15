document.addEventListener("DOMContentLoaded", () => {
  // Typing effect for dynamic text in the hero section
  const words = ["Applied/Data Scientist", "Cybersecurity Specialist", "Software Engineer", "Full-Stack Developer"];
  const changingWords = document.getElementById("changing-words");
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function typeEffect() {
    // Dynamically type and delete words
    const currentWord = words[wordIndex];
    changingWords.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting) {
      charIndex++; // Increment character index while typing
      if (charIndex === currentWord.length + 1) {
        // Pause after fully typing the word
        isDeleting = true;
        setTimeout(typeEffect, 1500); // Increased pause before deleting
        return;
      }
    } else {
      charIndex--; // Decrement character index while deleting
      if (charIndex === 0) {
        // Move to the next word after deleting
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500); // Pause before typing the next word
        return;
      }
    }

    // Continue typing or deleting
    setTimeout(typeEffect, isDeleting ? 50 : 100); // Faster typing and deleting speeds
  }

  typeEffect(); // Start the typing effect

  // Wireshark simulation
  const wiresharkBody = document.querySelector(".wireshark-window .window-body");

  function generateRandomIP() {
    // Generate a random IP address for Wireshark simulation
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  }

  function generateRandomPort() {
    // Generate a random port number
    return Math.floor(Math.random() * 65535) + 1;
  }

  function generatePacketInfo() {
    // Generate a random packet information string
    const sourceIP = generateRandomIP();
    const destIP = generateRandomIP();
    const sourcePort = generateRandomPort();
    const destPort = generateRandomPort();
    return `Packet: ${sourceIP}:${sourcePort} → ${destIP}:${destPort}`;
  }

  function runWireshark() {
    // Simulate Wireshark packet capture
    wiresharkBody.innerHTML = ""; // Clear the Wireshark output
    setInterval(() => {
      const packetInfo = generatePacketInfo();
      const packetElement = document.createElement("p");
      packetElement.textContent = packetInfo;
      wiresharkBody.appendChild(packetElement);

      // Limit the number of displayed packets to prevent overflow
      if (wiresharkBody.childElementCount > 10) {
        wiresharkBody.innerHTML = ""; // Clear all packets every few seconds
      }
    }, 300); // Add a new packet every 300ms
  }

  runWireshark(); // Start Wireshark simulation

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const offset = -128;
        const topPosition = targetSection.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: topPosition, behavior: "smooth" });
      }
    });
  });

  // EmailJS form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    emailjs.init("sXjJ9pc_xVmMkzVYv"); // Initialize EmailJS with user ID
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      emailjs.sendForm("service_utz0ock", "YOUR_TEMPLATE_ID", contactForm)
        .then(() => {
          alert("Message sent successfully!");
          contactForm.reset();
        })
        .catch(error => {
          console.error("Error sending message:", error);
          alert("Failed to send message. Please try again later.");
        });
    });
  }

  // Tab switching functionality for the "About Me" section
  const tabs = document.querySelectorAll(".tab");
  const tabPanes = document.querySelectorAll(".tab-pane");

  function switchTab(tabId) {
    // Ensure a valid tabId is provided
    if (!tabId) return;

    // Hide all tab panes and remove active class from tabs
    tabPanes.forEach(pane => pane.classList.remove("active"));
    tabs.forEach(tab => tab.classList.remove("active"));

    // Show the selected tab pane and add active class to the corresponding tab
    const selectedPane = document.getElementById(tabId);
    const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);

    if (selectedPane) {
      selectedPane.classList.add("active");
    }
    if (selectedTab) {
      selectedTab.classList.add("active");
    }
  }

  // Add click event listeners to all tabs
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Ensure the first tab is active by default
  if (tabs.length > 0 && tabPanes.length > 0) {
    const firstTabId = tabs[0].getAttribute("data-tab");
    switchTab(firstTabId);
  }
});

// Tab switching logic for the "About Me" section
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".about-navigation .tab");
  const tabPanes = document.querySelectorAll(".about-navigation .tab-pane");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove 'active' class from all tabs and tab panes
      tabs.forEach((t) => t.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Add 'active' class to the clicked tab and corresponding tab pane
      tab.classList.add("active");
      const targetPane = document.getElementById(tab.dataset.tab);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
});