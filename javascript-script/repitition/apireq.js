const API_BASE_URL = 'https://api.example.com';

// Cliente HTTP reutilizável com tratamento de erros
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers: { ...defaultHeaders, ...options.headers }
            });

            if (!response.ok) {
                throw new ApiError(response.status, `API error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, `Network error: ${error.message}`);
        }
    }

    // Métodos HTTP comuns
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Erro customizado para API
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}

// Serviços específicos que usam o cliente API
class UserService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.endpoint = '/users';
    }

    async getAll() {
        return this.apiClient.get(this.endpoint);
    }

    async getById(id) {
        return this.apiClient.get(`${this.endpoint}/${id}`);
    }

    async create(userData) {
        return this.apiClient.post(this.endpoint, userData);
    }

    async update(id, userData) {
        return this.apiClient.put(`${this.endpoint}/${id}`, userData);
    }

    async delete(id) {
        return this.apiClient.delete(`${this.endpoint}/${id}`);
    }
}

class ProductService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.endpoint = '/products';
    }

    async getAll() {
        return this.apiClient.get(this.endpoint);
    }

    async getById(id) {
        return this.apiClient.get(`${this.endpoint}/${id}`);
    }

    async create(productData) {
        return this.apiClient.post(this.endpoint, productData);
    }

    async update(id, productData) {
        return this.apiClient.put(`${this.endpoint}/${id}`, productData);
    }

    async delete(id) {
        return this.apiClient.delete(`${this.endpoint}/${id}`);
    }
}

class OrderService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.endpoint = '/orders';
    }

    async getAll() {
        return this.apiClient.get(this.endpoint);
    }

    async getById(id) {
        return this.apiClient.get(`${this.endpoint}/${id}`);
    }

    async create(orderData) {
        return this.apiClient.post(this.endpoint, orderData);
    }

    async update(id, orderData) {
        return this.apiClient.put(`${this.endpoint}/${id}`, orderData);
    }

    async delete(id) {
        return this.apiClient.delete(`${this.endpoint}/${id}`);
    }
}

// Uso dos serviços
const apiClient = new ApiClient(API_BASE_URL);
const userService = new UserService(apiClient);
const productService = new ProductService(apiClient);
const orderService = new OrderService(apiClient);

// Exemplo de uso
async function example() {
    try {
        // Usuários
        const users = await userService.getAll();
        const user = await userService.getById(1);
        
        // Produtos
        const products = await productService.getAll();
        const newProduct = await productService.create({
            name: 'New Product',
            price: 99.99
        });
        
        // Pedidos
        const order = await orderService.create({
            userId: user.id,
            products: [newProduct.id],
            total: 99.99
        });
        
        console.log({ users, products, order });
    } catch (error) {
        console.error('Error:', error.message);
        // Tratamento de erro apropriado
    }
}

module.exports = {
    ApiClient,
    UserService,
    ProductService,
    OrderService,
    ApiError
};