// Gerenciador de eventos para botões
class ButtonEventManager {
    constructor() {
        this.handlers = new Map();
    }

    // Adiciona listeners a múltiplos botões usando seletor
    addListenersToButtons(selector, eventType, handler) {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(button => {
            this.addButtonListener(button, eventType, handler);
        });
    }

    // Adiciona listener a um botão individual
    addButtonListener(button, eventType, handler) {
        if (!(button instanceof Element)) {
            throw new Error('Button deve ser um elemento DOM');
        }

        // Guarda referência do handler para poder remover depois
        const boundHandler = (event) => {
            handler(event, button);
        };
        this.handlers.set(button, boundHandler);
        
        button.addEventListener(eventType, boundHandler);
    }

    // Remove listeners de todos os botões
    removeAllListeners(selector, eventType) {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(button => {
            const handler = this.handlers.get(button);
            if (handler) {
                button.removeEventListener(eventType, handler);
                this.handlers.delete(button);
            }
        });
    }
}

// Exemplo de uso
document.addEventListener('DOMContentLoaded', () => {
    const eventManager = new ButtonEventManager();

    // Handler comum para todos os botões
    const handleClick = (event, button) => {
        console.log(`Botão clicado: ${button.textContent}`);
        button.classList.toggle('active');
    };

    // Adiciona listeners a todos os botões com classe .btn
    eventManager.addListenersToButtons('.btn', 'click', handleClick);

    // Adiciona listeners específicos para botões de ação
    eventManager.addListenersToButtons('.btn-action', 'click', (event, button) => {
        console.log(`Ação executada: ${button.dataset.action}`);
    });

    // Remove listeners quando necessário
    // eventManager.removeAllListeners('.btn', 'click');
});

/* Exemplo de HTML para testar
<!DOCTYPE html>
<html>
<head>
    <title>Button Event Manager Demo</title>
    <style>
        .btn { margin: 5px; padding: 10px; }
        .active { background-color: #007bff; color: white; }
    </style>
</head>
<body>
    <button class="btn">Botão 1</button>
    <button class="btn">Botão 2</button>
    <button class="btn btn-action" data-action="save">Salvar</button>
    <button class="btn btn-action" data-action="delete">Deletar</button>
</body>
</html>
*/