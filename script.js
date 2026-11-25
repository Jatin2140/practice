// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Interactive Treasury Yield Calculator
  const depositSlider = document.getElementById('deposit-slider');
  const depositDisplay = document.getElementById('deposit-display');
  const annualEarnings = document.getElementById('annual-earnings');
  const monthlyEarnings = document.getElementById('monthly-earnings');
  const traditionalBank = document.getElementById('traditional-bank');
  const presetButtons = document.querySelectorAll('.preset-btn');

  const APY_RATE = 0.0530; // 5.30%
  const TRADITIONAL_RATE = 0.0001; // 0.01%

  function formatCurrency(val) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  }

  function updateCalculator(val) {
    const deposit = Number(val);
    const annualApro = deposit * APY_RATE;
    const monthlyApro = annualApro / 12;
    const annualTrad = deposit * TRADITIONAL_RATE;

    if (depositDisplay) depositDisplay.textContent = formatCurrency(deposit);
    if (annualEarnings) annualEarnings.textContent = formatCurrency(annualApro);
    if (monthlyEarnings) monthlyEarnings.textContent = `≈ ${formatCurrency(monthlyApro)} / month`;
    if (traditionalBank) traditionalBank.textContent = `${formatCurrency(annualTrad)}/yr`;
  }

  if (depositSlider) {
    depositSlider.addEventListener('input', (e) => {
      updateCalculator(e.target.value);
    });

    presetButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        depositSlider.value = val;
        updateCalculator(val);
      });
    });

    // Initialize with default value
    updateCalculator(depositSlider.value);
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-btn');
    const content = item.querySelector('.faq-content');

    if (btn && content) {
      btn.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');

        // Close all other items
        faqItems.forEach((other) => {
          const otherContent = other.querySelector('.faq-content');
          const otherBtn = other.querySelector('.faq-btn');
          if (otherContent && otherContent !== content) {
            otherContent.classList.add('hidden');
            otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          content.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          content.classList.remove('hidden');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
});
