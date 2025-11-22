document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictForm');
    const submitBtn = document.getElementById('submitBtn');
    const resultCard = document.getElementById('result');
    const errorCard = document.getElementById('errorResult');
    const resultValue = document.getElementById('resultValue');
    const errorMessage = document.getElementById('errorMessage');
    const sampleBtn = document.getElementById('loadSample');

    const priceCategories = {
        low: {
            max: 150000,
            label: 'Budget-Friendly',
            color: '#22c55e',
            icon: 'bi-house',
            tips: [
                'Great for first-time home buyers',
                'Consider renovation potential for value increase',
                'Check neighborhood development plans'
            ]
        },
        medium: {
            max: 350000,
            label: 'Mid-Range',
            color: '#f59e0b',
            icon: 'bi-house-fill',
            tips: [
                'Good balance of value and amenities',
                'Research school districts for family appeal',
                'Compare with similar properties nearby'
            ]
        },
        high: {
            max: Infinity,
            label: 'Premium',
            color: '#8b5cf6',
            icon: 'bi-building',
            tips: [
                'Prime location with high appreciation potential',
                'Consider long-term investment value',
                'Verify luxury amenities and finishes'
            ]
        }
    };

    function getPriceCategory(price) {
        if (price <= priceCategories.low.max) return priceCategories.low;
        if (price <= priceCategories.medium.max) return priceCategories.medium;
        return priceCategories.high;
    }

    function getGaugePercentage(price) {
        const maxPrice = 500000;
        return Math.min((price / maxPrice) * 100, 100);
    }

    function updateResultDisplay(price) {
        const category = getPriceCategory(price);
        const percentage = getGaugePercentage(price);

        resultValue.textContent = `$${price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;

        const gaugeBar = document.getElementById('gaugeBar');
        const gaugeLabel = document.getElementById('gaugeLabel');
        if (gaugeBar && gaugeLabel) {
            gaugeBar.style.width = `${percentage}%`;
            gaugeBar.style.background = `linear-gradient(90deg, #22c55e, ${category.color})`;
            gaugeLabel.textContent = category.label;
            gaugeLabel.style.color = category.color;
        }

        const categoryBadge = document.getElementById('categoryBadge');
        if (categoryBadge) {
            categoryBadge.innerHTML = `<i class="bi ${category.icon} me-1"></i>${category.label}`;
            categoryBadge.style.background = `${category.color}20`;
            categoryBadge.style.color = category.color;
        }

        const tipsList = document.getElementById('tipsList');
        if (tipsList) {
            tipsList.innerHTML = category.tips
                .map(
                    tip =>
                        `<li><i class="bi bi-check-circle-fill me-2" style="color: ${category.color}"></i>${tip}</li>`
                )
                .join('');
        }
    }

    function validateInput(input) {
        const val = parseFloat(input.value);
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);
        const wrapper = input.closest('.input-group-custom');
        let errorEl = wrapper.querySelector('.validation-error');

        if (errorEl) errorEl.remove();
        input.classList.remove('is-invalid', 'is-valid');

        if (input.value === '') return false;

        if (isNaN(val)) {
            showValidationError(input, wrapper, 'Please enter a valid number');
            return false;
        }
        if (min !== undefined && val < min) {
            showValidationError(input, wrapper, `Minimum value is ${min}`);
            return false;
        }
        if (max !== undefined && val > max) {
            showValidationError(input, wrapper, `Maximum value is ${max}`);
            return false;
        }

        input.classList.add('is-valid');
        return true;
    }

    function showValidationError(input, wrapper, message) {
        input.classList.add('is-invalid');
        const errorEl = document.createElement('div');
        errorEl.className = 'validation-error';
        errorEl.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i>${message}`;
        wrapper.appendChild(errorEl);
    }

    document.querySelectorAll('#predictForm .form-control').forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', function() {
            if (this.value) this.classList.add('filled');
            else this.classList.remove('filled');
            const wrapper = this.closest('.input-group-custom');
            const errorEl = wrapper.querySelector('.validation-error');
            if (errorEl) errorEl.remove();
            this.classList.remove('is-invalid');
        });
    });

    sampleBtn.addEventListener('click', function() {
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
                input.classList.add('filled', 'is-valid');
            }
        }

        this.classList.add('btn-success');
        this.innerHTML = '<i class="bi bi-check-lg me-1"></i>Sample Loaded';
        setTimeout(() => {
            this.classList.remove('btn-success');
            this.innerHTML = '<i class="bi bi-lightning-fill me-1"></i>Load Sample Input';
        }, 1500);
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        let isValid = true;
        document.querySelectorAll('#predictForm .form-control').forEach(input => {
            if (!validateInput(input)) isValid = false;
        });

        if (!isValid) {
            errorMessage.textContent = 'Please fix the validation errors above';
            errorCard.classList.remove('d-none');
            resultCard.classList.add('d-none');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').classList.add('d-none');
        submitBtn.querySelector('.btn-loading').classList.remove('d-none');

        resultCard.classList.add('d-none');
        errorCard.classList.add('d-none');

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = parseFloat(String(value).replace(',', '.'));
        });

        try {
            const response = await fetch('/api/predict/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success && result.data !== undefined) {
                const medVal = Number(result.data);
                if (isNaN(medVal)) {
                    throw new Error('Prediction is not a number');
                }

                const actualPrice = medVal * 100000;

                updateResultDisplay(actualPrice);

                resultCard.classList.remove('d-none');
                setTimeout(() => {
                    resultCard.classList.add('show');
                }, 10);

                resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                throw new Error(result.error || 'Prediction failed');
            }
        } catch (err) {
            errorMessage.textContent = err.message;
            errorCard.classList.remove('d-none');
            errorCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').classList.remove('d-none');
            submitBtn.querySelector('.btn-loading').classList.add('d-none');
        }
    });
});
