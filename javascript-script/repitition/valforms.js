// Regras de validação reutilizáveis
const ValidationRules = {
    required: (value) => ({
        isValid: value !== undefined && value.trim() !== '',
        message: 'Campo obrigatório'
    }),
    
    minLength: (min) => (value) => ({
        isValid: value && value.length >= min,
        message: `Mínimo de ${min} caracteres`
    }),
    
    maxLength: (max) => (value) => ({
        isValid: value && value.length <= max,
        message: `Máximo de ${max} caracteres`
    }),
    
    pattern: (regex, message) => (value) => ({
        isValid: regex.test(value),
        message
    }),
    
    email: (value) => ({
        isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Email inválido'
    }),
    
    password: (value) => ({
        isValid: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
        message: 'Senha deve ter pelo menos 8 caracteres, uma letra e um número'
    })
};

// Validador de campos
class FieldValidator {
    constructor(rules) {
        this.rules = rules;
    }

    validate(value) {
        for (const rule of this.rules) {
            const result = rule(value);
            if (!result.isValid) {
                return result;
            }
        }
        return { isValid: true, message: '' };
    }
}

// Validador de formulário
class FormValidator {
    constructor(config) {
        this.validators = {};
        for (const [field, rules] of Object.entries(config)) {
            this.validators[field] = new FieldValidator(rules);
        }
    }

    validateField(field, value) {
        const validator = this.validators[field];
        if (!validator) {
            throw new Error(`Campo não configurado: ${field}`);
        }
        return validator.validate(value);
    }

    validateForm(data) {
        const errors = {};
        let isValid = true;

        for (const [field, validator] of Object.entries(this.validators)) {
            const result = validator.validate(data[field]);
            if (!result.isValid) {
                errors[field] = result.message;
                isValid = false;
            }
        }

        return { isValid, errors };
    }
}

// Exemplo de uso
const formConfig = {
    name: [
        ValidationRules.required,
        ValidationRules.minLength(2),
        ValidationRules.maxLength(50),
        ValidationRules.pattern(/^[A-Za-z\s]+$/, 'Nome deve conter apenas letras')
    ],
    email: [
        ValidationRules.required,
        ValidationRules.email
    ],
    password: [
        ValidationRules.required,
        ValidationRules.password
    ]
};

const validator = new FormValidator(formConfig);

// Exemplo de validação
const formData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password123'
};

const result = validator.validateForm(formData);
console.log(result);

// Exemplo de validação de campo individual
const emailResult = validator.validateField('email', 'invalid-email');
console.log(emailResult);

module.exports = {
    ValidationRules,
    FieldValidator,
    FormValidator
};