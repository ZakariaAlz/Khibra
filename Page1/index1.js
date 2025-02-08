const words = ["easier", "faster"];
  let index = 0;
  let letterIndex = 0;
  let isDeleting = false;
  const speed = 150; // Typing/deleting speed
  const wordElement = document.getElementById("changing-word");

  function typeEffect() {
    const currentWord = words[index];

    if (isDeleting) {
      wordElement.textContent = currentWord.substring(0, letterIndex--);
    } else {
      wordElement.textContent = currentWord.substring(0, letterIndex++);
    }

    if (!isDeleting && letterIndex === currentWord.length + 1) {
      isDeleting = true;
      setTimeout(typeEffect, 1000); // Pause before deleting
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      index = (index + 1) % words.length;
      setTimeout(typeEffect, 500); // Pause before typing next word
    } else {
      setTimeout(typeEffect, speed);
    }
  }

  typeEffect();