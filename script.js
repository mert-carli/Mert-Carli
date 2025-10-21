document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Initial check
  updateNavbar();
  
  // Listen to scroll events
  window.addEventListener('scroll', updateNavbar);
  
  // Typewriter Effect
  const typewriterText = document.getElementById('typewriterText');
  const fullText = `Kendinizi güvende hissetmenizi sağlayacak yenilikçi teknoloji çözümleri,
profesyonel yazılımlar ve modern tasarımlar üretiyorum.

Dijital dünyada sadece estetik değil, aynı zamanda güvenilir ve işlevsel projelere imza atıyor,
ihtiyaçlarınıza tam anlamıyla karşılık veren çözümler sunuyorum.

Hedefim; teknolojiyle hayatı kolaylaştıran,
güven veren ve iz bırakan işler ortaya koymak.`;

  let currentIndex = 0;
  const typingSpeed = 40; // milliseconds per character
  const startDelay = 2000; // delay before typing starts

  function typeWriter() {
    if (currentIndex < fullText.length) {
      const currentChar = fullText[currentIndex];
      if (currentChar === '\n') {
        typewriterText.innerHTML += '<br>';
      } else {
        typewriterText.innerHTML += currentChar;
      }
      currentIndex++;
      setTimeout(typeWriter, typingSpeed);
    } else {
      // Hide cursor when typing is complete
      setTimeout(() => {
        const cursor = document.querySelector('.typewriter-cursor');
        if (cursor) {
          cursor.style.display = 'none';
        }
      }, 2000);
    }
  }

  // Start typewriter effect after delay
  setTimeout(typeWriter, startDelay);

  // Canvas background animation
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // Star objects for dark theme
  let stars = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.8 + 0.5,
    speed: Math.random() * 0.2 + 0.05,
    twinkle: Math.random() * 2 * Math.PI
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Animated starfield with parallax
    for (let star of stars) {
      star.x += star.speed;
      if (star.x > canvas.width) star.x = 0;
      // Twinkle effect
      let alpha = 0.7 + 0.3 * Math.sin(Date.now() / 400 + star.twinkle);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
    // Occasional shooting star
    if (Math.random() < 0.008) {
      let sx = Math.random() * canvas.width * 0.8 + 60;
      let sy = Math.random() * canvas.height * 0.5 + 40;
      for (let t = 0; t < 18; t++) {
        ctx.save();
        ctx.globalAlpha = 0.12 + 0.08 * (1 - t / 18);
        ctx.beginPath();
        ctx.moveTo(sx - t * 8, sy - t * 2);
        ctx.lineTo(sx - (t - 1) * 8, sy - (t - 1) * 2);
        ctx.lineWidth = 2.5 - t * 0.12;
        ctx.strokeStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
      }
    }
    
    requestAnimationFrame(animate);
  }
  animate();

  // Logo Gallery Modal
  const logoImages = [
    'img/6Erengunes.png',
    'img/carliinslogo.png',
    'img/M.png',
    'img/maipmusic.png',
    'img/Mercan27.png',
    'img/petasoft.png',
    'img/RamazanToz.png',
    'img/Adsız tasarım.png',
    'img/hepsıonda.png'
  ];

  let currentImageIndex = 0;
  const modal = document.getElementById('logoModal');
  const modalImage = document.getElementById('modalImage');
  const currentImageSpan = document.getElementById('currentImage');
  const totalImagesSpan = document.getElementById('totalImages');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const closeBtn = document.querySelector('.close');

  // Set total images count
  totalImagesSpan.textContent = logoImages.length;

  // Open modal when logo card is clicked
  const logoCard = document.querySelector('[data-gallery="logo"]');
  logoCard.addEventListener('click', function() {
    currentImageIndex = 0;
    showImage(currentImageIndex);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  // Close modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  closeBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Show image function
  function showImage(index) {
    modalImage.style.opacity = '0';
    modalImage.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      modalImage.src = logoImages[index];
      currentImageSpan.textContent = index + 1;
      modalImage.style.opacity = '1';
      modalImage.style.transform = 'scale(1)';
    }, 150);
  }

  // Previous image
  prevBtn.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex - 1 + logoImages.length) % logoImages.length;
    showImage(currentImageIndex);
  });

  // Next image
  nextBtn.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex + 1) % logoImages.length;
    showImage(currentImageIndex);
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'block') {
      if (e.key === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        nextBtn.click();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    }
  });

  // Business Card Gallery Modal
  const cardPairs = [
    {
      front: 'img/ahmetcaldirana.png',
      back: 'img/Ahmetcaldiran o.png'
    },
    {
      front: 'img/Athan GSM Ön Yüz.png',
      back: 'img/Ayhan GSM Arka Yüz.png'
    },
    {
      front: 'img/carliinsaatonyuz.png',
      back: 'img/carliins.png'
    },
    {
      front: 'img/5.png',
      back: 'img/2.png'
    }
  ];

  // Music AI Modal
  const musicModal = document.getElementById('musicModal');
  const musicCard = document.querySelector('[data-gallery="music"]');
  const musicCloseBtn = document.querySelector('.music-close');

  // Open music modal when music card is clicked
  musicCard.addEventListener('click', function() {
    musicModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  // Close music modal
  function closeMusicModal() {
    musicModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  musicCloseBtn.addEventListener('click', closeMusicModal);

  // Close music modal when clicking outside
  musicModal.addEventListener('click', function(e) {
    if (e.target === musicModal) {
      closeMusicModal();
    }
  });

  // Card Design Gallery
  let currentCardIndex = 0;
  let isCardFlipped = false;
  const cardModal = document.getElementById('cardModal');
  const businessCard = document.getElementById('businessCard');
  const cardFrontImage = document.getElementById('cardFrontImage');
  const cardBackImage = document.getElementById('cardBackImage');
  const currentCardSpan = document.getElementById('currentCard');
  const totalCardsSpan = document.getElementById('totalCards');
  const cardPrevBtn = document.getElementById('cardPrevBtn');
  const cardNextBtn = document.getElementById('cardNextBtn');
  const cardCloseBtn = document.querySelector('.card-close');

  // Debug: Check if buttons are found
  console.log('cardPrevBtn:', cardPrevBtn);
  console.log('cardNextBtn:', cardNextBtn);

  // Set total cards count
  totalCardsSpan.textContent = cardPairs.length;

  // Open card modal when card design card is clicked
  const cardDesignCard = document.querySelector('[data-gallery="cards"]');
  cardDesignCard.addEventListener('click', function() {
    currentCardIndex = 0;
    isCardFlipped = false;
    showCard(currentCardIndex);
    cardModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  // Close card modal
  function closeCardModal() {
    cardModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    isCardFlipped = false;
    businessCard.classList.remove('flipped');
  }

  cardCloseBtn.addEventListener('click', closeCardModal);
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === cardModal) {
      closeCardModal();
    }
  });

  // Show card function
  function showCard(index) {
    // Reset flip state
    isCardFlipped = false;
    businessCard.classList.remove('flipped');
    
    // Fade out
    businessCard.style.opacity = '0';
    businessCard.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      cardFrontImage.src = cardPairs[index].front;
      cardBackImage.src = cardPairs[index].back;
      currentCardSpan.textContent = index + 1;
      
      // Fade in - remove inline transform to allow CSS classes to work
      businessCard.style.opacity = '1';
      businessCard.style.transform = 'scale(1)';
    }, 200);
  }

  // Card flip functionality
  businessCard.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event bubbling
    isCardFlipped = !isCardFlipped;
    
    if (isCardFlipped) {
      businessCard.classList.add('flipped');
    } else {
      businessCard.classList.remove('flipped');
    }
    
    console.log('Card flipped:', isCardFlipped); // Debug log
  });

  // Previous card
  cardPrevBtn.addEventListener('click', function() {
    console.log('Previous card clicked!'); // Debug log
    currentCardIndex = (currentCardIndex - 1 + cardPairs.length) % cardPairs.length;
    showCard(currentCardIndex);
  });

  // Next card
  cardNextBtn.addEventListener('click', function() {
    currentCardIndex = (currentCardIndex + 1) % cardPairs.length;
    showCard(currentCardIndex);
  });

  // CMD Poster Modal with Zoom
  let currentZoom = 1;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  
  const cmdModal = document.getElementById('cmdModal');
  const posterWrapper = document.getElementById('posterWrapper');
  const posterImage = document.getElementById('posterImage');
  const zoomLevel = document.getElementById('zoomLevel');
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  const resetZoomBtn = document.getElementById('resetZoom');
  const cmdCloseBtn = document.querySelector('.cmd-close');
  const posterContainer = document.querySelector('.poster-container');

  // Open CMD modal when CMD card is clicked
  const cmdCard = document.querySelector('[data-gallery="cmd"]');
  if (cmdCard) {
    cmdCard.addEventListener('click', function() {
      console.log('CMD card clicked'); // Debug
      resetPosterView();
      cmdModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  }

  // Close CMD modal
  function closeCmdModal() {
    cmdModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetPosterView();
  }

  if (cmdCloseBtn) {
    cmdCloseBtn.addEventListener('click', closeCmdModal);
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === cmdModal) {
      closeCmdModal();
    }
  });

  // Reset poster view
  function resetPosterView() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    updatePosterTransform();
    updateZoomLevel();
    console.log('Poster view reset'); // Debug
  }

  // Update poster transform with simple boundaries
  function updatePosterTransform() {
    if (posterWrapper) {
      posterWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
      console.log('Transform updated:', translateX, translateY, currentZoom); // Debug
    }
  }

  // Update zoom level display and cursor
  function updateZoomLevel() {
    if (zoomLevel) {
      zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
    }
    // Always show grab cursor in poster modal
    if (posterContainer) {
      posterContainer.style.cursor = 'grab';
    }
  }

  // Zoom functionality
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', function() {
      console.log('Zoom in clicked'); // Debug
      if (currentZoom < 3) {
        currentZoom += 0.25;
        // Recalculate boundaries when zooming
        updatePosterTransform();
        updateZoomLevel();
        console.log('Zoomed in to:', currentZoom); // Debug
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', function() {
      console.log('Zoom out clicked'); // Debug
      if (currentZoom > 0.5) {
        currentZoom -= 0.25;
        // Recalculate boundaries when zooming
        updatePosterTransform();
        updateZoomLevel();
        console.log('Zoomed out to:', currentZoom); // Debug
      }
    });
  }

  if (resetZoomBtn) {
    resetZoomBtn.addEventListener('click', function() {
      console.log('Reset clicked'); // Debug
      resetPosterView();
    });
  }

  // Enhanced drag functionality
  if (posterContainer) {
    posterContainer.addEventListener('mousedown', function(e) {
      console.log('Mouse down event, zoom:', currentZoom); // Debug
      e.preventDefault();
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      posterContainer.style.cursor = 'grabbing';
      console.log('Drag started at:', startX, startY); // Debug
    });
  }

  // Global mouse events for better drag handling
  document.addEventListener('mousemove', function(e) {
    if (isDragging && cmdModal.style.display === 'block') {
      e.preventDefault();
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updatePosterTransform();
      console.log('Dragging to:', translateX, translateY); // Debug
    }
  });

  document.addEventListener('mouseup', function() {
    if (isDragging) {
      console.log('Drag ended'); // Debug
      isDragging = false;
      if (posterContainer) {
        posterContainer.style.cursor = 'grab';
      }
    }
  });

  // Touch events for mobile support
  if (posterContainer) {
    posterContainer.addEventListener('touchstart', function(e) {
      console.log('Touch start event'); // Debug
      e.preventDefault();
      isDragging = true;
      const touch = e.touches[0];
      startX = touch.clientX - translateX;
      startY = touch.clientY - translateY;
      console.log('Touch drag started at:', startX, startY); // Debug
    });

    posterContainer.addEventListener('touchmove', function(e) {
      if (isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        translateX = touch.clientX - startX;
        translateY = touch.clientY - startY;
        updatePosterTransform();
        console.log('Touch dragging to:', translateX, translateY); // Debug
      }
    });

    posterContainer.addEventListener('touchend', function() {
      if (isDragging) {
        console.log('Touch drag ended'); // Debug
        isDragging = false;
      }
    });
  }

  // Generic zoom/drag system for all project modals
  function createZoomDragSystem(modalId, wrapperId, imageId, zoomLevelId, zoomInId, zoomOutId, resetZoomId, closeClass, cardSelector) {
    let currentZoom = 1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    
    const modal = document.getElementById(modalId);
    const wrapper = document.getElementById(wrapperId);
    const image = document.getElementById(imageId);
    const zoomLevel = document.getElementById(zoomLevelId);
    const zoomInBtn = document.getElementById(zoomInId);
    const zoomOutBtn = document.getElementById(zoomOutId);
    const resetZoomBtn = document.getElementById(resetZoomId);
    const closeBtn = document.querySelector('.' + closeClass);
    const container = wrapper?.parentElement;
    const card = document.querySelector(cardSelector);

    // Open modal when card is clicked
    if (card) {
      card.addEventListener('click', function() {
        console.log(modalId + ' card clicked'); // Debug
        resetView();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    }

    // Close modal
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      resetView();
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Reset view
    function resetView() {
      currentZoom = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
      updateZoomDisplay();
      console.log(modalId + ' view reset'); // Debug
    }

    // Update transform
    function updateTransform() {
      if (wrapper) {
        wrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
        console.log(modalId + ' transform updated:', translateX, translateY, currentZoom); // Debug
      }
    }

    // Update zoom level display
    function updateZoomDisplay() {
      if (zoomLevel) {
        zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
      }
      if (container) {
        container.style.cursor = 'grab';
      }
    }

    // Zoom functionality
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', function() {
        console.log(modalId + ' zoom in clicked'); // Debug
        if (currentZoom < 3) {
          currentZoom += 0.25;
          updateTransform();
          updateZoomDisplay();
          console.log(modalId + ' zoomed in to:', currentZoom); // Debug
        }
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', function() {
        console.log(modalId + ' zoom out clicked'); // Debug
        if (currentZoom > 0.5) {
          currentZoom -= 0.25;
          updateTransform();
          updateZoomDisplay();
          console.log(modalId + ' zoomed out to:', currentZoom); // Debug
        }
      });
    }

    if (resetZoomBtn) {
      resetZoomBtn.addEventListener('click', function() {
        console.log(modalId + ' reset clicked'); // Debug
        resetView();
      });
    }

    // Drag functionality
    if (container) {
      container.addEventListener('mousedown', function(e) {
        console.log(modalId + ' mouse down event, zoom:', currentZoom); // Debug
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        container.style.cursor = 'grabbing';
        console.log(modalId + ' drag started at:', startX, startY); // Debug
      });
    }

    // Global mouse events for this modal
    document.addEventListener('mousemove', function(e) {
      if (isDragging && modal.style.display === 'block') {
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
        console.log(modalId + ' dragging to:', translateX, translateY); // Debug
      }
    });

    document.addEventListener('mouseup', function() {
      if (isDragging && modal.style.display === 'block') {
        console.log(modalId + ' drag ended'); // Debug
        isDragging = false;
        if (container) {
          container.style.cursor = 'grab';
        }
      }
    });
  }

  // Create all zoom/drag systems
  createZoomDragSystem('powershellModal', 'powershellWrapper', 'powershellImage', 'powershellZoomLevel', 'powershellZoomIn', 'powershellZoomOut', 'powershellResetZoom', 'powershell-close', '[data-gallery="powershell"]');
  
  createZoomDragSystem('csharpGameModal', 'csharpGameWrapper', 'csharpGameImage', 'csharpGameZoomLevel', 'csharpGameZoomIn', 'csharpGameZoomOut', 'csharpGameResetZoom', 'csharp-game-close', '[data-gallery="csharp-game"]');
  
  createZoomDragSystem('csharpPasswordModal', 'csharpPasswordWrapper', 'csharpPasswordImage', 'csharpPasswordZoomLevel', 'csharpPasswordZoomIn', 'csharpPasswordZoomOut', 'csharpPasswordResetZoom', 'csharp-password-close', '[data-gallery="csharp-password"]');
  
  createZoomDragSystem('cosmicModal', 'cosmicWrapper', 'cosmicImage', 'cosmicZoomLevel', 'cosmicZoomIn', 'cosmicZoomOut', 'cosmicResetZoom', 'cosmic-close', '[data-gallery="cosmic"]');
  
  createZoomDragSystem('posterModal', 'posterDesignWrapper', 'posterDesignImage', 'posterDesignZoomLevel', 'posterDesignZoomIn', 'posterDesignZoomOut', 'posterDesignResetZoom', 'poster-close', '[data-gallery="poster"]');
  
  createZoomDragSystem('engelsizModal', 'engelsizWrapper', 'engelsizImage', 'engelsizZoomLevel', 'engelsizZoomIn', 'engelsizZoomOut', 'engelsizResetZoom', 'engelsiz-close', '[data-gallery="engelsiz"]');
  
  createZoomDragSystem('pythonPasswordModal', 'pythonPasswordWrapper', 'pythonPasswordImage', 'pythonPasswordZoomLevel', 'pythonPasswordZoomIn', 'pythonPasswordZoomOut', 'pythonPasswordResetZoom', 'python-password-close', '[data-gallery="python-password"]');

  // Touch events for mobile
  posterContainer.addEventListener('touchstart', function(e) {
    console.log('Touch start, current zoom:', currentZoom); // Debug
    if (currentZoom > 1 && e.touches.length === 1) {
      e.preventDefault();
      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
      console.log('Touch drag started'); // Debug
    }
  });

  posterContainer.addEventListener('touchmove', function(e) {
    if (isDragging && currentZoom > 1 && e.touches.length === 1) {
      e.preventDefault();
      translateX = e.touches[0].clientX - startX;
      translateY = e.touches[0].clientY - startY;
      updatePosterTransform();
      console.log('Touch dragging:', translateX, translateY); // Debug
    }
  });

  posterContainer.addEventListener('touchend', function(e) {
    if (isDragging) {
      console.log('Touch drag ended'); // Debug
    }
    isDragging = false;
    e.preventDefault();
  });

  // Wheel zoom
  posterContainer.addEventListener('wheel', function(e) {
    e.preventDefault();
    const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(3, currentZoom + zoomDelta));
    
    if (newZoom !== currentZoom) {
      currentZoom = newZoom;
      updatePosterTransform();
      updateZoomLevel();
    }
  });

  // Enhanced keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'block') {
      if (e.key === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        nextBtn.click();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    } else if (cardModal.style.display === 'block') {
      if (e.key === 'ArrowLeft') {
        cardPrevBtn.click();
      } else if (e.key === 'ArrowRight') {
        cardNextBtn.click();
      } else if (e.key === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        businessCard.click();
      } else if (e.key === 'Escape') {
        closeCardModal();
      }
    } else if (cmdModal.style.display === 'block') {
      if (e.key === '+' || e.key === '=') {
        zoomInBtn.click();
      } else if (e.key === '-') {
        zoomOutBtn.click();
      } else if (e.key === '0' || e.key === 'r') {
        resetZoomBtn.click();
      } else if (e.key === 'Escape') {
        closeCmdModal();
      }
    }
  });

  // Contact form handling with Formspree
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Gönderiliyor...</span>';
    submitBtn.disabled = true;
    
    // Send to Formspree
    fetch('https://formspree.io/f/xjkrdlrz', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Success
        submitBtn.innerHTML = '<span>✓ Gönderildi!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        
        setTimeout(() => {
          alert('✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.');
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 2000);
      } else {
        // Error handling
        response.json().then(data => {
          if (Object.hasOwnProperty.call(data, 'errors')) {
            alert('❌ Hata: ' + data["errors"].map(error => error["message"]).join(", "));
          } else {
            alert('❌ Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
          }
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
      }
    }).catch(error => {
      // Network error
      console.error('Form submission error:', error);
      alert('❌ Bağlantı hatası. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // Code Rain Effect
  const codeRainCanvas = document.getElementById('code-rain');
  const backgroundCanvas = document.getElementById('background');
  const codeRainToggle = document.getElementById('code-rain-toggle');
  let codeRainActive = false;
  let animationId = null;
  
  const codeRainCtx = codeRainCanvas.getContext('2d');
  
  // Code characters to display
  const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]()<>/\\|~`!@#$%^&*+=?abcdefghijklmnopqrstuvwxyz';
  const charArray = characters.split('');
  
  let drops = [];
  
  function initCodeRain() {
    codeRainCanvas.width = window.innerWidth;
    codeRainCanvas.height = window.innerHeight;
    
    const columns = Math.floor(codeRainCanvas.width / 20);
    drops = Array(columns).fill(0);
  }
  
  function drawCodeRain() {
    // Semi-transparent black background for trail effect
    codeRainCtx.fillStyle = 'rgba(13, 20, 33, 0.1)';
    codeRainCtx.fillRect(0, 0, codeRainCanvas.width, codeRainCanvas.height);
    
    // Green text
    codeRainCtx.fillStyle = '#00ff41';
    codeRainCtx.font = '16px Courier New';
    
    for (let i = 0; i < drops.length; i++) {
      // Random character
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      
      // Draw character
      codeRainCtx.fillText(char, i * 20, drops[i] * 20);
      
      // Reset drop to top randomly or when it reaches bottom
      if (drops[i] * 20 > codeRainCanvas.height && Math.random() > 0.95) {
        drops[i] = 0;
      }
      
      // Move drop down
      drops[i]++;
    }
    
    if (codeRainActive) {
      animationId = requestAnimationFrame(drawCodeRain);
    }
  }
  
  function toggleCodeRain() {
    codeRainActive = !codeRainActive;
    
    if (codeRainActive) {
      // Start code rain
      backgroundCanvas.style.display = 'none';
      codeRainCanvas.style.display = 'block';
      codeRainToggle.classList.add('active');
      
      initCodeRain();
      drawCodeRain();
    } else {
      // Stop code rain
      backgroundCanvas.style.display = 'block';
      codeRainCanvas.style.display = 'none';
      codeRainToggle.classList.remove('active');
      
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
  }
  
  // Handle window resize for code rain
  window.addEventListener('resize', () => {
    if (codeRainActive) {
      initCodeRain();
    }
  });
  
  // Code rain toggle event
  codeRainToggle.addEventListener('click', toggleCodeRain);

  // Meteor Shower Effect

  // Meteor Shower Effect
  const meteorShowerContainer = document.getElementById('meteor-shower-container');
  const meteorShowerToggle = document.getElementById('meteor-shower-toggle');
  const meteorContainer = document.querySelector('.meteor-container');
  const starsContainer = document.querySelector('.stars-container');
  let meteorShowerActive = false;
  let meteorInterval = null;
  let starsCreated = false;

  function createMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    
    // Random size
    const size = Math.random() * 4 + 2; // 2-6px
    meteor.style.width = size + 'px';
    meteor.style.height = size + 'px';
    
    // Random starting position (üstten ve soldan)
    const startX = Math.random() * 30 - 10; // -10% to 20%
    const startY = Math.random() * 30 - 10; // -10% to 20%
    meteor.style.left = startX + '%';
    meteor.style.top = startY + '%';
    
    // Random animation duration (speed)
    const duration = Math.random() * 2 + 1; // 1-3 seconds
    meteor.style.animationDuration = duration + 's';
    
    // Random delay
    meteor.style.animationDelay = Math.random() * 0.5 + 's';
    
    meteorContainer.appendChild(meteor);
    
    // Remove meteor after animation
    setTimeout(() => {
      if (meteor.parentNode) {
        meteor.parentNode.removeChild(meteor);
      }
    }, (duration + 0.5) * 1000);
  }

  function createStars() {
    if (starsCreated) return;
    
    // Create 50 twinkling stars
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random size
      const size = Math.random() * 3 + 1; // 1-4px
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      
      // Random position
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      
      // Random animation duration
      const duration = Math.random() * 3 + 2; // 2-5 seconds
      star.style.animationDuration = duration + 's';
      
      // Random delay
      star.style.animationDelay = Math.random() * 2 + 's';
      
      starsContainer.appendChild(star);
    }
    starsCreated = true;
  }

  function toggleMeteorShower() {
    meteorShowerActive = !meteorShowerActive;
    
    if (meteorShowerActive) {
      // Start meteor shower
      backgroundCanvas.style.display = 'none';
      codeRainCanvas.style.display = 'none';
      meteorShowerContainer.style.display = 'block';
      meteorShowerToggle.classList.add('active');
      
      // Deactivate other effects
      if (codeRainActive) {
        codeRainActive = false;
        codeRainToggle.classList.remove('active');
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
      
      // Create stars background
      createStars();
      
      // Create meteors continuously
      meteorInterval = setInterval(() => {
        if (meteorShowerActive) {
          // Create 1-3 meteors at once
          const meteorCount = Math.random() * 3 + 1;
          for (let i = 0; i < meteorCount; i++) {
            setTimeout(() => createMeteor(), i * 200);
          }
        }
      }, 800);
    } else {
      // Stop meteor shower
      backgroundCanvas.style.display = 'block';
      meteorShowerContainer.style.display = 'none';
      meteorShowerToggle.classList.remove('active');
      
      if (meteorInterval) {
        clearInterval(meteorInterval);
        meteorInterval = null;
      }
      
      // Clear existing meteors
      meteorContainer.innerHTML = '';
    }
  }

  // Meteor shower toggle event
  meteorShowerToggle.addEventListener('click', toggleMeteorShower);

  // Update other toggles to handle meteor shower conflict
  function toggleCodeRain() {
    codeRainActive = !codeRainActive;
    
    if (codeRainActive) {
      // Deactivate other effects
      if (meteorShowerActive) {
        meteorShowerActive = false;
        meteorShowerToggle.classList.remove('active');
        meteorShowerContainer.style.display = 'none';
        if (meteorInterval) {
          clearInterval(meteorInterval);
          meteorInterval = null;
        }
        meteorContainer.innerHTML = '';
      }
      
      // Start code rain
      backgroundCanvas.style.display = 'none';
      codeRainCanvas.style.display = 'block';
      codeRainToggle.classList.add('active');
      
      initCodeRain();
      drawCodeRain();
    } else {
      // Stop code rain
      backgroundCanvas.style.display = 'block';
      codeRainCanvas.style.display = 'none';
      codeRainToggle.classList.remove('active');
      
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
  }
});
