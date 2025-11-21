document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clusterForm');
    const submitBtn = document.getElementById('clusterSubmitBtn');
    const resultCard = document.getElementById('clusterResultCard');
    const errorCard = document.getElementById('clusterErrorCard');
    const resultValue = document.getElementById('clusterResultValue');
    const resultDesc = document.getElementById('clusterResultDesc');
    const errorMessage = document.getElementById('clusterErrorMessage');
    const sampleSelect = document.getElementById('sampleClusterSelect');

    // Cluster descriptions & samples
    const clusterInfo = {
        0: {
            name: 'Careful Spenders',
            desc: 'Low-Medium income, Low-Medium spending',
            color: '#6366f1',
            sample: { Age: 45, AnnualIncome: 40, SpendingScore: 35 }
        },
        1: {
            name: 'Target (VIP)',
            desc: 'High income, High spending',
            color: '#22c55e',
            sample: { Age: 32, AnnualIncome: 85, SpendingScore: 90 }
        },
        2: {
            name: 'Sensible',
            desc: 'Low-Medium income, High spending',
            color: '#0ea5e9',
            sample: { Age: 28, AnnualIncome: 35, SpendingScore: 75 }
        },
        3: {
            name: 'Potential',
            desc: 'High income, Low spending',
            color: '#f59e0b',
            sample: { Age: 40, AnnualIncome: 90, SpendingScore: 25 }
        }
    };

    // Load sample from dropdown
    sampleSelect.addEventListener('change', function() {
        const val = this.value;
        if (val === '') return;

        const cluster = clusterInfo[val];
        if (!cluster) return;

        for (const key in cluster.sample) {
            const input = document.getElementById(key);
            if (input) {
                input.value = cluster.sample[key];
                input.classList.add('filled');
            }
        }

        // Reset dropdown after selection
        setTimeout(() => { this.value = ''; }, 100);
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
            const response = await fetch('/api/cluster/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const text = await response.text();
            let result;

            try {
                result = JSON.parse(text);
            } catch (_) {
                errorMessage.textContent = 'Server did not return JSON.';
                errorCard.classList.remove('d-none');
                return;
            }

            if (response.ok && result.success && result.cluster !== undefined) {
                const clusterId = result.cluster;
                const info = clusterInfo[clusterId] || { name: 'Unknown', desc: '', color: '#6b7280' };
                
                resultValue.textContent = clusterId;
                resultDesc.textContent = `${info.name} — ${info.desc}`;
                resultDesc.style.color = info.color;
                resultCard.classList.remove('d-none');
            } else {
                throw new Error(result.error || 'Failed to find cluster');
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

    document.querySelectorAll('#clusterForm .form-control').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value) this.classList.add('filled');
            else this.classList.remove('filled');
        });
    });
});