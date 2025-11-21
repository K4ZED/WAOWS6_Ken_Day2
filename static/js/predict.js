document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictForm');
    const submitBtn = document.getElementById('submitBtn');
    const resultCard = document.getElementById('result');
    const errorCard = document.getElementById('errorResult');
    const resultValue = document.getElementById('resultValue');
    const errorMessage = document.getElementById('errorMessage');

    document.getElementById('loadSample').addEventListener('click', function() {
        const sample = {
            MedInc: 6.8,
            HouseAge: 27,
            AveRooms: 9.33,
            AveBedrms: 0.97,
            Population: 2401,
            AveOccup: 1.4,
            Latitude: 34.0,
            Longitude: -118.2
        };

        for (const key in sample) {
            const input = document.getElementById(key);
            if (input) {
                input.value = sample[key];
                input.classList.add('filled');
            }
        }

        this.classList.add('btn-success');
        this.innerHTML = '<i class="bi bi-check2 me-1"></i>Sample Loaded!';
        setTimeout(() => {
            this.classList.remove('btn-success');
            this.innerHTML = '<i class="bi bi-lightning-charge me-1"></i>Load Sample Input';
        }, 1300);
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').classList.add('d-none');
        submitBtn.querySelector('.btn-loading').classList.remove('d-none');

        resultCard.classList.add('d-none');
        errorCard.classList.add('d-none');

        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            const normalized = String(value).replace(",", ".");
            data[key] = parseFloat(normalized);
        });

        try {
            const response = await fetch('/api/predict/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch (_) {
                errorMessage.textContent = "Server did not return JSON.";
                errorCard.classList.remove('d-none');
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').classList.remove('d-none');
                submitBtn.querySelector('.btn-loading').classList.add('d-none');
                return;
            }

            if (response.ok && result.success && result.data !== undefined) {
                const price = Number(result.data).toFixed(3);
                resultValue.textContent = price;
                resultCard.classList.remove('d-none');
                resultCard.classList.add('show');
            } else {
                throw new Error(result.error || "Prediction failed");
            }
        } catch (err) {
            errorMessage.textContent = err.message;
            errorCard.classList.remove('d-none');
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').classList.remove('d-none');
            submitBtn.querySelector('.btn-loading').classList.add('d-none');
        }
    });

    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value) this.classList.add('filled');
            else this.classList.remove('filled');
        });
    });
});
