// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
      hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
    }
    
    // Carousel/Slider Functionality
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      const carouselContainer = carousel.querySelector('.carousel-container');
      const slides = carousel.querySelectorAll('.carousel-slide');
      const prevBtn = carousel.querySelector('.prev-btn');
      const nextBtn = carousel.querySelector('.next-btn');
      const carouselBtns = carousel.querySelectorAll('.carousel-btn');
      
      let currentIndex = 0;
      
      // Set up initial state
      function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active button
        carouselBtns.forEach((btn, index) => {
          if (index === currentIndex) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
      
      // Next slide
      function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }
      
      // Previous slide
      function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      }
      
      // Button click handlers
      if (prevBtn) prevBtn.addEventListener('click', prevSlide);
      if (nextBtn) nextBtn.addEventListener('click', nextSlide);
      
      // Dot navigation
      carouselBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
          currentIndex = index;
          updateCarousel();
        });
      });
      
      // Auto slide (optional)
      let interval = setInterval(nextSlide, 5000);
      
      // Pause on hover
      carousel.addEventListener('mouseenter', function() {
        clearInterval(interval);
      });
      
      carousel.addEventListener('mouseleave', function() {
        interval = setInterval(nextSlide, 5000);
      });
    }
    
    // Plant Catalog Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const plantCards = document.querySelectorAll('.plant-card');
    
    if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // Remove active class from all buttons
          filterBtns.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Get filter value
          const filter = this.getAttribute('data-filter');
          
          // Filter plants
          plantCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
              card.style.display = 'block';
              // Add fade in animation
              card.classList.add('fade-in');
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
      const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
      
      elementsToAnimate.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
          element.classList.add('fade-in');
        }
      });
    };
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    animateOnScroll();
    
    // Subscription toggle (monthly/yearly)
    const subscriptionToggle = document.querySelector('.subscription-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    
    if (subscriptionToggle) {
      subscriptionToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
          // Show yearly prices
          monthlyPrices.forEach(price => price.style.display = 'none');
          yearlyPrices.forEach(price => price.style.display = 'block');
        } else {
          // Show monthly prices
          monthlyPrices.forEach(price => price.style.display = 'block');
          yearlyPrices.forEach(price => price.style.display = 'none');
        }
      });
    }
    
    // Leaf animation for icons
    const leafIcons = document.querySelectorAll('.leaf-icon');
    leafIcons.forEach(icon => {
      icon.style.animationDelay = `${Math.random() * 2}s`;
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form validation for subscription form
  const subscriptionForm = document.getElementById('subscription-form');
  if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const planSelect = document.getElementById('plan');
      
      let isValid = true;
      
      // Simple validation
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        isValid = false;
      } else {
        removeError(nameInput);
      }
      
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
      } else {
        removeError(emailInput);
      }
      
      if (planSelect.value === '') {
        showError(planSelect, 'Please select a plan');
        isValid = false;
      } else {
        removeError(planSelect);
      }
      
      if (isValid) {
        // Here you would normally submit the form or make an AJAX request
        // For demo purposes, show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for subscribing! We will contact you soon.';
        
        subscriptionForm.innerHTML = '';
        subscriptionForm.appendChild(successMessage);
      }
    });
    
    function showError(input, message) {
      const formGroup = input.parentElement;
      const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
      
      errorMessage.className = 'error-message';
      errorMessage.textContent = message;
      
      if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorMessage);
      }
      
      input.classList.add('error');
    }
    
    function removeError(input) {
      const formGroup = input.parentElement;
      const errorMessage = formGroup.querySelector('.error-message');
      
      if (errorMessage) {
        formGroup.removeChild(errorMessage);
      }
      
      input.classList.remove('error');
    }
    
    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  }
  
  // Growing plant animation
  class GrowingPlant {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.width = canvas.width;
      this.height = canvas.height;
      this.stemHeight = 0;
      this.maxStemHeight = this.height * 0.7;
      this.stemWidth = 5;
      this.leafSize = 0;
      this.maxLeafSize = 30;
      this.growthSpeed = 0.5;
      this.animate = this.animate.bind(this);
      
      this.init();
    }
    
    init() {
      this.animate();
    }
    
    draw() {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.width, this.height);
      
      // Draw stem
      this.ctx.beginPath();
      this.ctx.moveTo(this.width / 2, this.height);
      this.ctx.lineTo(this.width / 2, this.height - this.stemHeight);
      this.ctx.lineWidth = this.stemWidth;
      this.ctx.strokeStyle = '#4a7c59';
      this.ctx.stroke();
      
      // Draw leaves if stem is tall enough
      if (this.stemHeight > this.maxStemHeight * 0.3) {
        // Left leaf
        this.ctx.beginPath();
        this.ctx.ellipse(
          this.width / 2 - 15, 
          this.height - this.stemHeight * 0.5, 
          this.leafSize, this.leafSize / 2, 
          Math.PI / 4, 0, 2 * Math.PI
        );
        this.ctx.fillStyle = '#8cb369';
        this.ctx.fill();
        
        // Right leaf
        this.ctx.beginPath();
        this.ctx.ellipse(
          this.width / 2 + 15, 
          this.height - this.stemHeight * 0.6, 
          this.leafSize, this.leafSize / 2, 
          -Math.PI / 4, 0, 2 * Math.PI
        );
        this.ctx.fillStyle = '#8cb369';
        this.ctx.fill();
      }
      
      // Draw flower if plant is fully grown
      if (this.stemHeight >= this.maxStemHeight) {
        this.ctx.beginPath();
        this.ctx.arc(
          this.width / 2, 
          this.height - this.stemHeight, 
          15, 0, 2 * Math.PI
        );
        this.ctx.fillStyle = '#f4a259';
        this.ctx.fill();
        
        // Flower center
        this.ctx.beginPath();
        this.ctx.arc(
          this.width / 2, 
          this.height - this.stemHeight, 
          5, 0, 2 * Math.PI
        );
        this.ctx.fillStyle = '#8d6346';
        this.ctx.fill();
      }
    }
    
    animate() {
      if (this.stemHeight < this.maxStemHeight) {
        this.stemHeight += this.growthSpeed;
      }
      
      if (this.stemHeight > this.maxStemHeight * 0.3 && this.leafSize < this.maxLeafSize) {
        this.leafSize += this.growthSpeed * 0.5;
      }
      
      this.draw();
      requestAnimationFrame(this.animate);
    }
  }
  
  // Initialize growing plants on canvases
  const plantCanvases = document.querySelectorAll('.growing-plant-canvas');
  if (plantCanvases.length > 0) {
    plantCanvases.forEach(canvas => {
      new GrowingPlant(canvas);
    });
  }