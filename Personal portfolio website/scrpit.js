const typingText = document.querySelector('.typing-text');
const phrases = [
  'Web Developer',
  'Tech Enthusiast',
  'Problem Solver',
];
let index = 0;
let charIndex = 0;
let currentPhrase = '';
let isDeleting = false;

function type() {
  if (index >= phrases.length) index = 0;
  currentPhrase = phrases[index];

  if (!isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex++);
    if (charIndex > currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      index++;
    }
  }
  setTimeout(type, isDeleting ? 50 : 100);
}

type();
