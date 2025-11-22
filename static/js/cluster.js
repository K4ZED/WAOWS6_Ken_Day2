document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clusterForm');
    const submitBtn = document.getElementById('clusterSubmitBtn');
    const resultCard = document.getElementById('clusterResultCard');
    const errorCard = document.getElementById('clusterErrorCard');
    const resultValue = document.getElementById('clusterResultValue');
    const resultDesc = document.getElementById('clusterResultDesc');
    const errorMessage = document.getElementById('clusterErrorMessage');
    const sampleSelect = document.getElementById('sampleClusterSelect');

    const clusterInfo = {
        0: {
            name: 'Careful Spenders',
            desc: 'Low-Medium income, Low-Medium spending',
            color: '#6366f1',
            icon: 'bi-piggy-bank-fill',
            sample: { Age: 45, AnnualIncome: 40, SpendingScore: 35 },
            profile: {
                behavior: 'Conservative with purchases, value-conscious',
                preference: 'Quality over quantity, seeks discounts',
                demographic: 'Often middle-aged, stable income'
            },
            strategies: [
                { icon: 'bi-tag-fill', text: 'Offer loyalty discounts and rewards' },
                { icon: 'bi-cash-coin', text: 'Promote value bundles and savings' },
                { icon: 'bi-envelope-fill', text: 'Send personalized deal alerts' },
                { icon: 'bi-clock-fill', text: 'Limited-time offers to encourage action' }
            ],
            avgValues: { age: 45, income: 40, spending: 35 }
        },
        1: {
            name: 'Target (VIP)',
            desc: 'High income, High spending',
            color: '#22c55e',
            icon: 'bi-gem',
            sample: { Age: 32, AnnualIncome: 85, SpendingScore: 90 },
            profile: {
                behavior: 'Premium shoppers, brand loyal',
                preference: 'Exclusive products, personalized service',
                demographic: 'Young professionals, high disposable income'
            },
            strategies: [
                { icon: 'bi-star-fill', text: 'VIP membership with exclusive perks' },
                { icon: 'bi-gift-fill', text: 'Early access to new products' },
                { icon: 'bi-person-heart', text: 'Personal shopping assistant' },
                { icon: 'bi-award-fill', text: 'Premium tier rewards program' }
            ],
            avgValues: { age: 32, income: 85, spending: 90 }
        },
        2: {
            name: 'Sensible',
            desc: 'Low-Medium income, High spending',
            color: '#0ea5e9',
            icon: 'bi-cart-check-fill',
            sample: { Age: 28, AnnualIncome: 35, SpendingScore: 75 },
            profile: {
                behavior: 'Enthusiastic shoppers, trend followers',
                preference: 'Latest trends, social proof matters',
                demographic: 'Younger age group, lifestyle-focused'
            },
            strategies: [
                { icon: 'bi-credit-card-fill', text: 'Flexible payment plans (Buy Now Pay Later)' },
                { icon: 'bi-phone-fill', text: 'Mobile-first engagement & app deals' },
                { icon: 'bi-people-fill', text: 'Referral bonuses and social sharing' },
                { icon: 'bi-lightning-fill', text: 'Flash sales and trending items alerts' }
            ],
            avgValues: { age: 28, income: 35, spending: 75 }
        },
        3: {
            name: 'Potential',
            desc: 'High income, Low spending',
            color: '#f59e0b',
            icon: 'bi-graph-up-arrow',
            sample: { Age: 40, AnnualIncome: 90, SpendingScore: 25 },
            profile: {
                behavior: 'Selective buyers, research-oriented',
                preference: 'High-quality, needs justification to buy',
                demographic: 'Established professionals, wealth builders'
            },
            strategies: [
                { icon: 'bi-shield-check', text: 'Highlight product quality & warranties' },
                { icon: 'bi-bar-chart-fill', text: 'Show ROI and long-term value' },
                { icon: 'bi-chat-quote-fill', text: 'Expert reviews and testimonials' },
                { icon: 'bi-unlock-fill', text: 'Exclusive previews without pressure' }
            ],
            avgValues: { age: 40, income: 90, spending: 25 }
        }
    };

    function drawComparisonChart(clusterId, inputData) {
        const canvas = document.getElementById('comparisonChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const info = clusterInfo[clusterId];
        
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);
        
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        
        ctx.clearRect(0, 0, width, height);
        
        const padding = { top: 30, right: 20, bottom: 40, left: 50 };
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;
        
        const categories = ['Age', 'Income', 'Spending'];
        const userValues = [
            inputData.Age,
            inputData.AnnualIncome,
            inputData.SpendingScore
        ];
        const clusterAvg = [
            info.avgValues.age,
            info.avgValues.income,
            info.avgValues.spending
        ];
        
        const maxValues = [100, 150, 100];
        
        const barWidth = chartWidth / categories.length / 3;
        const groupWidth = chartWidth / categories.length;
        
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
            
            ctx.fillStyle = '#6b7280';
            ctx.font = '10px system-ui';
            ctx.textAlign = 'right';
            const labelVal = Math.round(100 - (i * 25));
            ctx.fillText(labelVal + '%', padding.left - 8, y + 4);
        }
        
        categories.forEach((cat, i) => {
            const groupX = padding.left + (groupWidth * i) + (groupWidth / 2);
            
            const userHeight = (userValues[i] / maxValues[i]) * chartHeight;
            const userX = groupX - barWidth - 4;
            const userY = padding.top + chartHeight - userHeight;
            
            ctx.fillStyle = '#4f46e5';
            ctx.beginPath();
            ctx.roundRect(userX, userY, barWidth, userHeight, 4);
            ctx.fill();
            
            const clusterHeight = (clusterAvg[i] / maxValues[i]) * chartHeight;
            const clusterX = groupX + 4;
            const clusterY = padding.top + chartHeight - clusterHeight;
            
            ctx.fillStyle = info.color;
            ctx.beginPath();
            ctx.roundRect(clusterX, clusterY, barWidth, clusterHeight, 4);
            ctx.fill();
            
            ctx.fillStyle = '#374151';
            ctx.font = '11px system-ui';
            ctx.textAlign = 'center';
            ctx.fillText(cat, groupX, height - padding.bottom + 20);
            
            ctx.font = 'bold 9px system-ui';
            ctx.fillStyle = '#4f46e5';
            ctx.fillText(Math.round(userValues[i]), userX + barWidth/2, userY - 5);
            ctx.fillStyle = info.color;
            ctx.fillText(Math.round(clusterAvg[i]), clusterX + barWidth/2, clusterY - 5);
        });
        
        const legendY = 12;
        ctx.fillStyle = '#4f46e5';
        ctx.beginPath();
        ctx.roundRect(padding.left, legendY - 8, 12, 12, 2);
        ctx.fill();
        ctx.fillStyle = '#374151';
        ctx.font = '10px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText('Your Input', padding.left + 16, legendY + 2);
        
        ctx.fillStyle = info.color;
        ctx.beginPath();
        ctx.roundRect(padding.left + 80, legendY - 8, 12, 12, 2);
        ctx.fill();
        ctx.fillStyle = '#374151';
        ctx.fillText('Cluster Avg', padding.left + 96, legendY + 2);
    }

    function updateResultDisplay(clusterId, inputData) {
        const info = clusterInfo[clusterId];
        if (!info) return;

        resultValue.textContent = clusterId;
        resultDesc.textContent = `${info.name} — ${info.desc}`;
        resultDesc.style.color = info.color;

        const resultIcon = document.querySelector('#clusterResultCard .result-icon i');
        if (resultIcon) {
            resultIcon.className = `bi ${info.icon}`;
        }

        const profileSection = document.getElementById('customerProfile');
        if (profileSection) {
            profileSection.innerHTML = `
                <div class="profile-item">
                    <span class="profile-label"><i class="bi bi-activity me-1"></i>Behavior</span>
                    <span class="profile-value">${info.profile.behavior}</span>
                </div>
                <div class="profile-item">
                    <span class="profile-label"><i class="bi bi-heart me-1"></i>Preference</span>
                    <span class="profile-value">${info.profile.preference}</span>
                </div>
                <div class="profile-item">
                    <span class="profile-label"><i class="bi bi-person me-1"></i>Demographic</span>
                    <span class="profile-value">${info.profile.demographic}</span>
                </div>
            `;
        }

        const strategiesSection = document.getElementById('marketingStrategies');
        if (strategiesSection) {
            strategiesSection.innerHTML = info.strategies.map(s => `
                <div class="strategy-item" style="--accent: ${info.color}">
                    <i class="bi ${s.icon}"></i>
                    <span>${s.text}</span>
                </div>
            `).join('');
        }

        const clusterBadge = document.getElementById('clusterBadge');
        if (clusterBadge) {
            clusterBadge.style.background = `${info.color}15`;
            clusterBadge.style.color = info.color;
            clusterBadge.style.borderColor = `${info.color}30`;
        }

        const chartCard = document.getElementById('comparisonChartCard');
        if (chartCard && inputData) {
            chartCard.classList.remove('d-none');
            setTimeout(() => {
                drawComparisonChart(clusterId, inputData);
            }, 100);
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
        if (!isNaN(min) && val < min) {
            showValidationError(input, wrapper, `Minimum value is ${min}`);
            return false;
        }
        if (!isNaN(max) && val > max) {
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

    document.querySelectorAll('#clusterForm .form-control').forEach(input => {
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

    sampleSelect.addEventListener('change', function() {
        const val = this.value;
        if (val === '') return;

        const cluster = clusterInfo[val];
        if (!cluster) return;

        for (const key in cluster.sample) {
            const input = document.getElementById(key);
            if (input) {
                input.value = cluster.sample[key];
                input.classList.add('filled', 'is-valid');
            }
        }

        this.classList.add('sample-loaded');
        const originalText = this.options[this.selectedIndex].text;
        this.options[this.selectedIndex].text = '✓ Sample Loaded';
        
        setTimeout(() => {
            this.options[this.selectedIndex].text = originalText;
            this.classList.remove('sample-loaded');
        }, 1500);
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        let isValid = true;
        document.querySelectorAll('#clusterForm .form-control').forEach(input => {
            if (!validateInput(input)) isValid = false;
        });

        if (!isValid) {
            errorMessage.textContent = 'Please fix the validation errors above';
            errorCard.classList.remove('d-none');
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
                updateResultDisplay(result.cluster, data);
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
});