document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quoteForm');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // evita el refresh

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      service: form.service.value,
      stage: form.stage.value,
      message: form.message.value.trim(),
    };

    if (!formData.name || !formData.email || !formData.message) {
      Toastify({
        text: 'Please fill out all required fields.',
        duration: 4000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#cd314e',
        stopOnFocus: true,
      }).showToast();
      return;
    }

    // ⏳ Activar spinner
    submitBtn.classList.add('loading');

    try {
      const response = await fetch('https://tu-servidor.com/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Toastify({
          text: '✅ Your quote was sent successfully!',
          duration: 4000,
          gravity: 'top',
          position: 'right',
          backgroundColor: '#2e9e60',
          stopOnFocus: true,
        }).showToast();
        form.reset();
      } else {
        Toastify({
          text: '⚠️ Something went wrong. Please try again.',
          duration: 4000,
          gravity: 'top',
          position: 'right',
          backgroundColor: '#f9893b',
          stopOnFocus: true,
        }).showToast();
      }
    } catch (err) {
      console.error('Error sending quote:', err);
      Toastify({
        text: '🚨 Error connecting to the server.',
        duration: 4000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#cd314e',
        stopOnFocus: true,
      }).showToast();
    } finally {
      // ✅ Desactivar spinner
      submitBtn.classList.remove('loading');
    }
  });
});
