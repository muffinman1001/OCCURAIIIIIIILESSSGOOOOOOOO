const axios = require('axios');

class VMService {
    constructor() {
        this.apiKey = process.env.VM_API_KEY;
        this.baseURL = 'https://your-vm-provider-api.com';
    }

    async createVM(configuration) {
        try {
            const response = await axios.post(`${this.baseURL}/vms`, {
                ...configuration,
                apiKey: this.apiKey
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to create VM');
        }
    }

    async startVM(vmId) {
        try {
            await axios.post(`${this.baseURL}/vms/${vmId}/start`, {
                apiKey: this.apiKey
            });
        } catch (error) {
            throw new Error('Failed to start VM');
        }
    }

    async pauseVM(vmId) {
        try {
            await axios.post(`${this.baseURL}/vms/${vmId}/pause`, {
                apiKey: this.apiKey
            });
        } catch (error) {
            throw new Error('Failed to pause VM');
        }
    }

    async stopVM(vmId) {
        try {
            await axios.post(`${this.baseURL}/vms/${vmId}/stop`, {
                apiKey: this.apiKey
            });
        } catch (error) {
            throw new Error('Failed to stop VM');
        }
    }
}

module.exports = new VMService(); 