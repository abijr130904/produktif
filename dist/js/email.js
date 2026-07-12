// ============================================
// EMAILJS CONFIGURATION
// ============================================

// Konfigurasi EmailJS - Ganti dengan data Anda
const EMAILJS_CONFIG = {
    USER_ID: 'a9ZIsIviDQfwNsk26', // Ganti dengan User ID dari EmailJS
    SERVICE_ID: 'service_rs2bslh', // Ganti dengan Service ID dari EmailJS
    TEMPLATE_ID: 'template_ckhu9ze' // Ganti dengan Template ID dari EmailJS
};

// ============================================
// INISIALISASI EMAILJS
// ============================================

(function() {
    'use strict';

    // Inisialisasi EmailJS
    emailjs.init(EMAILJS_CONFIG.USER_ID);

    // Ambil elemen form
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const statusDiv = document.getElementById('status');

    // Jika form tidak ditemukan, hentikan
    if (!form) {
        console.warn('Form dengan ID "contact-form" tidak ditemukan');
        return;
    }

    // ============================================
    // EVENT LISTENER SUBMIT FORM
    // ============================================

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Ambil data dari form
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validasi
        if (!name || !email || !message) {
            showStatus('⚠️ Semua field harus diisi!', 'error');
            return;
        }

        // Validasi email
        if (!isValidEmail(email)) {
            showStatus('⚠️ Email tidak valid!', 'error');
            return;
        }

        // Kirim email
        sendEmail(name, email, message);
    });

    // ============================================
    // FUNGSI KIRIM EMAIL
    // ============================================

    function sendEmail(name, email, message) {
        // Set loading state
        setLoading(true);

        // Kirim via EmailJS
        emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            {
                from_name: name,
                from_email: email,
                message: message,
                to_name: 'Moh.Habiburrohman',
                to_email: 'abijr130904@gmail.com'
            }
        )
        .then(function(response) {
            console.log('✅ Email berhasil dikirim!', response);
            showStatus('✅ Pesan berhasil dikirim! Saya akan segera merespon.', 'success');
            form.reset();
        })
        .catch(function(error) {
            console.error('❌ Gagal mengirim email:', error);
            // Tampilkan error detail
            let detail = '❌ Gagal mengirim pesan. ';
            if (error.text) {
                detail += 'Error: ' + error.text;
            } else if (error.message) {
                detail += 'Error: ' + error.message;
            } else {
                detail += 'Silakan coba lagi.';
            }
            showStatus(detail, 'error');
        })
        .finally(function() {
            setLoading(false);
        });
    }

    // ============================================
    // FUNGSI UTILITY
    // ============================================

    // Set loading state
    function setLoading(isLoading) {
        if (isLoading) {
            btnText.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
        } else {
            btnText.textContent = 'Kirim Pesan';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }

    // Show status message
    function showStatus(message, type) {
        statusDiv.innerHTML = `<span class="font-semibold ${type === 'success' ? 'text-green-500' : 'text-red-500'}">${message}</span>`;
        
        // Auto hide after 5 seconds for success
        if (type === 'success') {
            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 5000);
        }
    }

    // Validasi email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================
    // AUTO INIT (Opsional)
    // ============================================

    console.log('📧 EmailJS siap digunakan!');

})();   