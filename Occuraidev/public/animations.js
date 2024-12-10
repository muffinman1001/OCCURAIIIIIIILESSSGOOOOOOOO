// Update API calls to use relative paths
const API_BASE = '/api';

async function fetchAgents() {
    const response = await fetch(`${API_BASE}/agents`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
} 