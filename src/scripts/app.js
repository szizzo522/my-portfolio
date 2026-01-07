document.addEventListener("DOMContentLoaded", () => {
  // Typing effect for dynamic text in the hero section
  const words = ["Threat Hunter", "Cybersecurity Analyst", "Content Developer", "Security Engineer"];
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
        let offset = -40; // default offset
        if (targetId === "contact") {
          offset = -120; // custom offset for contact section (move further down)
        }
        if (targetId === "portfolio") {
          offset = -155; // custom offset for portfolio section
        }
        const topPosition = targetSection.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: topPosition, behavior: "smooth" });
      }
    });
  });

  // EmailJS form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    // Set hidden fields
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        document.getElementById('user-ip').value = data.ip || '';
        document.getElementById('user-city').value = data.city || '';
        document.getElementById('user-region').value = data.region || '';
        document.getElementById('user-country').value = data.country_name || '';
        submitBtn.disabled = false;
      });

    document.getElementById('user-browser').value = navigator.userAgent;
    document.getElementById('user-os').value = navigator.platform;
    document.getElementById('user-language').value = navigator.language;
    document.getElementById('user-screen').value = `${window.screen.width}x${window.screen.height}`;
    document.getElementById('user-referrer').value = document.referrer || 'Direct';

    emailjs.init("sXjJ9pc_xVmMkzVYv");
    contactForm.addEventListener("submit", e => {
      e.preventDefault();

      // Clear previous error and reset color to red for errors
      const recaptchaErrorDiv = document.getElementById('recaptcha-error');
      recaptchaErrorDiv.textContent = "";
      recaptchaErrorDiv.style.color = "#ff4d4f";
      // Check if reCAPTCHA is completed
      if (typeof grecaptcha === "undefined") {
        recaptchaErrorDiv.textContent = "reCAPTCHA failed to load. Please refresh the page.";
        return;
      }
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        recaptchaErrorDiv.textContent = "Please complete the CAPTCHA.";
        return;
      }

      // Send main message to you
      emailjs.sendForm("service_ktmlvsa", "template_aot4jol", contactForm)
        .then(() => {
          // Send auto-reply to user
          emailjs.sendForm("service_ktmlvsa", "template_yo04b2i", contactForm);
          recaptchaErrorDiv.textContent = "Message sent successfully!";
          recaptchaErrorDiv.style.color = "#4BB543"; // green
          contactForm.reset();
          grecaptcha.reset();
        })
        .catch(error => {
          console.error("Error sending message:", error);
          alert("Failed to send message. Please try again later.");
        });
    });
  }

  // Tab switching functionality for the "About Me" section (merge both tab logics)
  const allTabs = document.querySelectorAll(".tab, .about-navigation .tab");
  const allTabPanes = document.querySelectorAll(".tab-pane, .about-navigation .tab-pane");

  allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      allTabs.forEach(t => t.classList.remove("active"));
      allTabPanes.forEach(pane => pane.classList.remove("active"));
      tab.classList.add("active");
      const tabId = tab.getAttribute("data-tab");
      const targetPane = document.getElementById(tabId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });

  // Optionally, activate the first tab by default
  if (allTabs.length > 0 && allTabPanes.length > 0) {
    const firstTabId = allTabs[0].getAttribute("data-tab");
    const firstPane = document.getElementById(firstTabId);
    allTabs[0].classList.add("active");
    if (firstPane) firstPane.classList.add("active");
  }
});