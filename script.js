// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form (Web3Forms)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    statusEl.className = 'form-status';
    statusEl.textContent = '';

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const data = await res.json();

        if (res.ok && data.success) {
            statusEl.textContent = 'Message sent! I will get back to you soon.';
            statusEl.classList.add('success');
            form.reset();
        } else {
            throw new Error(data.message || 'Something went wrong.');
        }
    } catch (err) {
        statusEl.textContent = 'Could not send your message. Please try again or email me directly.';
        statusEl.classList.add('error');
    } finally {
        btn.textContent = 'Send Message';
        btn.disabled = false;
    }
});