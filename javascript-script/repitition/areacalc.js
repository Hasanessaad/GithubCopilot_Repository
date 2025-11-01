class Shape {
    constructor(name) {
        this.name = name;
    }

    // Método para validar se um número é positivo
    validatePositive(...numbers) {
        for (const num of numbers) {
            if (typeof num !== 'number' || num <= 0) {
                throw new Error(`${this.name}: Todas as dimensões devem ser números positivos`);
            }
        }
    }

    // Método para arredondar resultado
    roundTo(number, decimals = 2) {
        return Number(number.toFixed(decimals));
    }

    // Método abstrato para cálculo de área
    calculateArea() {
        throw new Error('Método calculateArea deve ser implementado');
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super('Retângulo');
        this.validatePositive(width, height);
        this.width = width;
        this.height = height;
    }

    calculateArea() {
        return this.roundTo(this.width * this.height);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Círculo');
        this.validatePositive(radius);
        this.radius = radius;
    }

    calculateArea() {
        return this.roundTo(Math.PI * this.radius ** 2);
    }
}

class Triangle extends Shape {
    constructor(base, height) {
        super('Triângulo');
        this.validatePositive(base, height);
        this.base = base;
        this.height = height;
    }

    calculateArea() {
        return this.roundTo((this.base * this.height) / 2);
    }
}

// Factory para criar formas
const ShapeFactory = {
    createRectangle(width, height) {
        return new Rectangle(width, height);
    },
    createCircle(radius) {
        return new Circle(radius);
    },
    createTriangle(base, height) {
        return new Triangle(base, height);
    }
};

// Testes
try {
    const rectangle = ShapeFactory.createRectangle(5, 3);
    console.log('Área do retângulo:', rectangle.calculateArea()); // 15.00

    const circle = ShapeFactory.createCircle(2);
    console.log('Área do círculo:', circle.calculateArea()); // 12.57

    const triangle = ShapeFactory.createTriangle(4, 3);
    console.log('Área do triângulo:', triangle.calculateArea()); // 6.00

    // Teste de erro
    const invalidRectangle = ShapeFactory.createRectangle(-1, 3);
} catch (error) {
    console.error('Erro:', error.message);
}

module.exports = { ShapeFactory, Shape, Rectangle, Circle, Triangle };