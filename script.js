// INICIALIZAÇÃO
AOS.init({ duration: 800, once: true });
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), { max: 10, speed: 400, glare: true, "max-glare": 0.1 });

// 1. LOADER SIMULATION
window.addEventListener('load', () => {
    const progress = document.getElementById('progress');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            document.getElementById('loader').style.display = 'none';
        } else {
            width += 5;
            progress.style.width = width + '%';
        }
    }, 50);
});

// 2. CURSOR CUSTOMIZADO
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    outline.animate({ left: e.clientX + 'px', top: e.clientY + 'px' }, { duration: 400, fill: "forwards" });
});

// 3. TERMINAL INTERATIVO (COMPACTO)
const termInput = document.getElementById('terminal-input');
const termContent = document.getElementById('terminal-content');

const commands = {
    'help': 'Comandos: precos, skills, zap, about, clear',
    'precos': 'LP: R$ 200 | Site+Python: R$ 350. Digite "zap" para contratar.',
    'skills': 'Python (Scripts/Bots), JavaScript, Automação Web, UI Design.',
    'zap': 'Abrindo WhatsApp...',
    'about': 'Dev de 12 anos. Foco em soluções que geram lucro e economizam tempo.',
    'clear': 'CLEAR'
};

termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = termInput.value.toLowerCase().trim();
        printTerminal(`λ guest: ${input}`, 'prompt-text');

        if (commands[input]) {
            if (input === 'clear') { termContent.innerHTML = ''; }
            else if (input === 'zap') {
                printTerminal('Redirecionando para o WhatsApp...');
                setTimeout(() => window.open('https://wa.link/8lgusv', '_blank'), 1000);
            } else { printTerminal(commands[input]); }
        } else if (input !== '') {
            printTerminal(`Comando não reconhecido. Digite "help".`, 'error-text');
        }
        termInput.value = '';
        termContent.scrollTop = termContent.scrollHeight;
    }
});

function printTerminal(text, className = '') {
    const div = document.createElement('div');
    div.className = `output ${className}`;
    div.innerText = text;
    termContent.appendChild(div);
}

// 4. MINI-GAME DE AGILIDADE (60+ PALAVRAS)
const words = [
    'python', 'javascript', 'automation', 'backend', 'frontend', 'database', 'algorithm', 'react', 'django', 'api',
    'deployment', 'server', 'logic', 'developer', 'syntax', 'function', 'variable', 'object', 'array', 'loop',
    'git', 'github', 'vscode', 'terminal', 'coding', 'script', 'web', 'design', 'interface', 'responsive',
    'performance', 'speed', 'optimization', 'security', 'data', 'cloud', 'hosting', 'domain', 'protocol', 'request',
    'json', 'xml', 'scrapping', 'crawler', 'bot', 'intelligence', 'artificial', 'machine', 'learning', 'prodigio',
    'creative', 'startup', 'business', 'success', 'money', 'code', 'future', 'link', 'click', 'system'
];

let score = 0;
let timeLeft = 15;
let currentWord;
let gameActive = false;

const wordDisplay = document.getElementById('word-to-type');
const gameInput = document.getElementById('game-input');
const startBtn = document.getElementById('start-game');

function startGame() {
    gameActive = true;
    score = 0;
    timeLeft = 15;
    gameInput.disabled = false;
    gameInput.value = '';
    gameInput.focus();
    document.getElementById('score').innerText = '0';
    nextWord();

    const interval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            gameActive = false;
            gameInput.disabled = true;
            wordDisplay.innerText = "FIM! SCORE: " + score;
            startBtn.innerText = "TENTAR NOVAMENTE";
        }
    }, 1000);
}

function nextWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordDisplay.innerText = currentWord;
}

gameInput.addEventListener('input', () => {
    if (gameInput.value.trim().toLowerCase() === currentWord) {
        score++;
        document.getElementById('score').innerText = score;
        gameInput.value = '';
        nextWord();
    }
});

startBtn.addEventListener('click', startGame);

// 5. FAQ INTERATIVO
document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        trigger.parentElement.classList.toggle('active');
    });
});