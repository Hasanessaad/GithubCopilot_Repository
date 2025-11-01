// Utilitário para aplicar estilos de forma reutilizável
class StyleManager {
    // Aplica múltiplos estilos a um elemento
    static applyStyles(element, styles) {
        Object.assign(element.style, styles);
        return element;
    }

    // Aplica estilos a múltiplos elementos
    static applyToAll(elements, styles) {
        if (elements instanceof NodeList || Array.isArray(elements)) {
            elements.forEach(el => this.applyStyles(el, styles));
        } else {
            this.applyStyles(elements, styles);
        }
    }

    // Aplica estilos comuns com temas predefinidos
    static applyTheme(elements, themeName) {
        const themes = {
            primary: {
                backgroundColor: '#007bff',
                color: '#ffffff',
                padding: '10px',
                borderRadius: '4px'
            },
            secondary: {
                backgroundColor: '#6c757d',
                color: '#ffffff',
                padding: '8px',
                borderRadius: '3px'
            },
            success: {
                backgroundColor: '#28a745',
                color: '#ffffff',
                padding: '10px',
                borderRadius: '4px'
            }
        };

        const theme = themes[themeName];
        if (!theme) {
            throw new Error(`Theme "${themeName}" not found`);
        }

        this.applyToAll(elements, theme);
    }
}

// Exemplo de uso
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar estilos individuais
    const buttons = document.querySelectorAll('.btn');
    StyleManager.applyToAll(buttons, {
        margin: '5px',
        cursor: 'pointer',
        border: 'none',
        fontWeight: 'bold'
    });

    // Aplicar temas predefinidos
    const primaryButtons = document.querySelectorAll('.btn-primary');
    StyleManager.applyTheme(primaryButtons, 'primary');

    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    StyleManager.applyTheme(secondaryButtons, 'secondary');

    // Aplicar estilos específicos a um elemento
    const header = document.querySelector('header');
    StyleManager.applyStyles(header, {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    });
});

// Exemplo de HTML para testar
/*
<!DOCTYPE html>
<html>
<head>
    <title>Style Manager Demo</title>
</head>
<body>
    <header>
        <h1>Style Manager Demo</h1>
    </header>
    <div>
        <button class="btn btn-primary">Primary Button</button>
        <button class="btn btn-secondary">Secondary Button</button>
        <button class="btn btn-primary">Another Primary</button>
    </div>
</body>
</html>
*/

module.exports = StyleManager;