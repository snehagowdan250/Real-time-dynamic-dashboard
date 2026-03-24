// 1. INITIALIZE THE CHART
const ctx = document.getElementById('mainBusinessChart').getContext('2d');

let mainChart = new Chart(ctx, {
    type: 'line', // Line charts look more "financial" and professional
    data: {
        labels: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'],
        datasets: [{
            label: 'Revenue Growth (Billions)',
            data: [2.1, 3.4, 4.1, 5.8, 7.2, 8.5],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4 // Makes the line curvy and modern
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false } // Hide legend for a cleaner look
        },
        scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } }
        }
    }
});

// 2. THE DATA FETCHING ENGINE
// 2. THE ADVANCED DATA ENGINE (V2)
async function fetchBusinessData() {
    try {
        // Simulating the API call
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        // --- 1. LIVE REVENUE CALCULATION ---
        // Generates a number between 8.2 and 9.8 to simulate billions
        const currentRevenue = (8 + Math.random() * 1.8).toFixed(2); 

        // --- 2. LIVE USER FLUCTUATION ---
        // We take the base user count (10) and add a random swing of +/- 50 users
        const baseUsers = users.length * 150; 
        const userSwing = Math.floor(Math.random() * 100) - 50; 
        const activeUsers = baseUsers + userSwing;

        // --- 3. DYNAMIC RISK ASSESSMENT ---
        // If revenue drops below 8.5B, risk becomes "High" automatically
        let riskLevel = "Low";
        let riskColor = "#27ae60"; // Green

        if (currentRevenue < 8.6) {
            riskLevel = "High";
            riskColor = "#e74c3c"; // Red
        } else if (currentRevenue < 9.0) {
            riskLevel = "Medium";
            riskColor = "#f1c40f"; // Yellow
        }

        // --- 4. UPDATE THE UI ---
        document.getElementById('revenue-val').innerText = currentRevenue;
        document.getElementById('user-val').innerText = activeUsers.toLocaleString();

        const riskElement = document.getElementById('risk-val');
        riskElement.innerText = riskLevel;
        riskElement.style.color = riskColor;

        // --- 5. UPDATE THE CHART ---
        // Add the new revenue point to the end
        mainChart.data.datasets[0].data.push(currentRevenue);

        // Remove the first point so the chart "slides" to the left
        if (mainChart.data.datasets[0].data.length > 7) {
            mainChart.data.datasets[0].data.shift();
        }

        mainChart.update();

        // Update System Status
        document.getElementById('status-dot').style.backgroundColor = "#27ae60";
        document.getElementById('status-text').innerText = "Live Stream: " + new Date().toLocaleTimeString();

    } catch (error) {
        console.error("Connection Lost:", error);
        document.getElementById('status-dot').style.backgroundColor = "#e74c3c";
        document.getElementById('status-text').innerText = "Reconnecting to VMS Techs...";
    }
}

// 5. EVENT LISTENERS
document.querySelector('.btn-refresh').addEventListener('click', () => {
    document.getElementById('status-text').innerText = "Syncing...";
    fetchBusinessData();
});

// Run automatically every 4 seconds
setInterval(fetchBusinessData, 4000);

// Initial run
fetchBusinessData();
