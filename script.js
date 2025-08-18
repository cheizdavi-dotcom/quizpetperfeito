document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const quizScreens = document.querySelectorAll(".quiz-screen");
    const optionBtns = document.querySelectorAll(".option-btn");
    let currentQuestionIndex = 0;
    let score = 0;
    const progressBarFill = document.querySelector(".progress-bar-fill");
    const totalQuestions = 5;

    function updateProgressBar() {
        const progress = (currentQuestionIndex / totalQuestions) * 100;
        progressBarFill.style.width = `${progress}%`;
    }

    const questionFeedback = {
        1: {
            "10": { type: "correct", message: "✅ Boa! Entendido! Sua reação faz a diferença. Continue para o próximo desafio!" },
            "-10": { type: "incorrect", message: "❌ Reação Ineficaz! Brigar só causa medo e ansiedade, não ensina. Mas há solução!" },
            "5": { type: "correct", message: "✅ Boa! Entendido! Sua reação faz a diferença. Continue para o próximo desafio!" },
            "0": { type: "correct", message: "✅ Boa! Entendido! Sua frustração é o primeiro passo para a solução. Vamos adiante!" }
        },
        2: {
            "15": { type: "correct", message: "✅ Perfeito! Essa sensação é o que nos move. Vamos adiante!" },
            "10": { type: "correct", message: "✅ Perfeito! Essa sensação é o que nos move. Vamos adiante!" },
            "5": { type: "correct", message: "✅ Perfeito! Essa sensação é o que nos move. Vamos adiante!" },
            "0": { type: "incorrect", message: "❌ Entendo a dúvida! Mas a solução existe e está ao seu alcance. Vamos descobrir!" }
        },
        3: {
            "10": { type: "correct", message: "✅ Exato! A rotina é fundamental. Você está no caminho certo!" },
            "-10": { type: "incorrect", message: "❌ Atenção! A comunicação é chave. Precisamos melhorar isso!" },
            "5": { type: "correct", message: "✅ Importante! Problemas de saúde ou estresse/ansiedade podem ser a causa. Vamos investigar!" },
            "20": { type: "incorrect", message: "❌ Entendido! A falta de treinamento ou um ambiente inadequado são causas comuns. Vamos te ajudar a resolver isso!" }
        },
        4: {
            "-5": { type: "correct", message: "✅ Entendido! Sua frustração é válida. Vamos descobrir como resolver isso!" },
            "0": { type: "correct", message: "✅ Entendido! O medo é um sinal de que você se importa. Vamos te ajudar a superá-lo!" },
            "5": { type: "correct", message: "✅ Entendido! A paz no lar é essencial. Vamos trabalhar para restaurá-la!" },
            "20": { type: "correct", message: "✅ Entendido! A incerteza é o primeiro passo para a clareza. Vamos te guiar!" }
        },
        5: {
            "10": { type: "correct", message: "✅ Ótimo! Acreditar na solução é o primeiro passo. Vamos te guiar!" },
            "0": { type: "correct", message: "✅ Entendido! A curiosidade é o caminho para a descoberta. Vamos te ajudar!" },
            "-10": { type: "incorrect", message: "❌ Não desista! Existem soluções eficazes. Vamos te mostrar o caminho!" },
            "-15": { type: "incorrect", message: "❌ Não perca a esperança! Ainda há muito a ser feito. Vamos te provar!" }
        }
    };

    function showScreen(id) {
        console.log("Mostrando tela:", id);
        quizScreens.forEach(screen => {
            screen.classList.remove("active");
        });
        const targetScreen = document.getElementById(id);
        if (targetScreen) {
            targetScreen.classList.add("active");
            console.log("Tela ativada:", id);
        } else {
            console.error("Tela não encontrada:", id);
        }
        updateProgressBar();
    }

    function showResult() {
        showScreen("diagnosis-screen");
    }

    // Event listener para o botão de início
    console.log("Configurando event listener para o botão de início");
    if (startBtn) {
        console.log("Botão de início encontrado");
        startBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Botão de início clicado!");
            currentQuestionIndex = 1;
            score = 0;
            showScreen("question-1");
        });
    } else {
        console.error("Botão de início não encontrado!");
    }

    // Event listeners para os botões de opção
    optionBtns.forEach(button => {
        button.addEventListener("click", (e) => {
            const selectedButton = e.target;
            const currentQuestionScreen = selectedButton.closest(".quiz-screen");
            const questionId = currentQuestionScreen.id;
            const questionNumber = parseInt(questionId.split("-")[1]);
            const scoreValue = parseInt(selectedButton.dataset.value);

            if (currentQuestionScreen.classList.contains("answered")) {
                return;
            }
            currentQuestionScreen.classList.add("answered");

            score += scoreValue;

            const feedbackContainer = currentQuestionScreen.querySelector(".feedback-container");
            const feedbackData = questionFeedback[questionNumber][scoreValue.toString()];
            if (feedbackData && feedbackContainer) {
                let feedbackHtml = `<p class="feedback ${feedbackData.type}">${feedbackData.message}</p>`;
                feedbackContainer.innerHTML = feedbackHtml;
            }

            setTimeout(() => {
                if (questionNumber === 2 && scoreValue === 15) {
                    showScreen("bonus-screen");
                } else if (questionNumber === 2 && scoreValue === 10) {
                    showScreen("bonus-screen-q2b");
                } else if (questionNumber === 2 && scoreValue === 5) {
                    showScreen("bonus-screen-q2c");
                } else if (questionNumber === 2 && scoreValue === 0) {
                    showScreen("bonus-screen-q2d");
                } else if (questionNumber === 4 && scoreValue === -5) {
                    showScreen("bonus-screen-q4a");
                } else if (questionNumber === 4 && scoreValue === 0) {
                    showScreen("bonus-screen-q4b");
                } else if (questionNumber === 4 && scoreValue === 5) {
                    showScreen("bonus-screen-q4c");
                } else if (questionNumber === 4 && scoreValue === 20) {
                    showScreen("bonus-screen-q4d");
                } else if (questionNumber === 5) {
                    showResult();
                } else {
                    console.log("currentQuestionIndex antes do incremento:", currentQuestionIndex);
                    currentQuestionIndex++;
                    console.log("currentQuestionIndex depois do incremento:", currentQuestionIndex);
                    console.log("totalQuestions:", totalQuestions);
                    if (currentQuestionIndex <= totalQuestions) {
                        showScreen(`question-${currentQuestionIndex}`);
                    } else {
                        showResult();
                    }
                }
            }, 2000);
        });
    });

    // Event listeners para botões de bônus
    const nextChallengeBtn = document.getElementById("next-challenge-btn");
    if (nextChallengeBtn) {
        nextChallengeBtn.addEventListener("click", () => {
            currentQuestionIndex = 3; // Definir explicitamente para a pergunta 3
            showScreen(`question-${currentQuestionIndex}`);
        });
    }

    const continueBonusQ2bBtn = document.getElementById("continue-bonus-q2b-btn");
    if (continueBonusQ2bBtn) {
        continueBonusQ2bBtn.addEventListener("click", () => {
            currentQuestionIndex = 3; // Definir explicitamente para a pergunta 3
            showScreen(`question-${currentQuestionIndex}`);
        });
    }

    const continueBonusQ2cBtn = document.getElementById("continue-bonus-q2c-btn");
    if (continueBonusQ2cBtn) {
        continueBonusQ2cBtn.addEventListener("click", () => {
            currentQuestionIndex = 3; // Definir explicitamente para a pergunta 3
            showScreen(`question-${currentQuestionIndex}`);
        });
    }

    const continueBonusQ2dBtn = document.getElementById("continue-bonus-q2d-btn");
    if (continueBonusQ2dBtn) {
        continueBonusQ2dBtn.addEventListener("click", () => {
            currentQuestionIndex = 3; // Definir explicitamente para a pergunta 3
            showScreen(`question-${currentQuestionIndex}`);
        });
    }

    const continueBonusQ4aBtn = document.getElementById("continue-bonus-q4a-btn");
    if (continueBonusQ4aBtn) {
        continueBonusQ4aBtn.addEventListener("click", () => {
            currentQuestionIndex = 5; // Definir explicitamente para a pergunta 5
            showScreen(`question-${currentQuestionIndex}`);
        });
    }

    const continueBonusQ4bBtn = document.getElementById("continue-bonus-q4b-btn");
    if (continueBonusQ4bBtn) {
        continueBonusQ4bBtn.addEventListener("click", () => {
            currentQuestionIndex = 5; // Definir explicitamente para a pergunta 5
            showScreen(`question-${currentQuestionIndex}`);
        });
    }

    const continueBonusQ4cBtn = document.getElementById("continue-bonus-q4c-btn");
    if (continueBonusQ4cBtn) {
        continueBonusQ4cBtn.addEventListener("click", () => {
            currentQuestionIndex = 5; // Definir explicitamente para a pergunta 5
            showScreen(`question-${currentQuestionIndex}`);
        });
    }

    const continueBonusQ4dBtn = document.getElementById("continue-bonus-q4d-btn");
    if (continueBonusQ4dBtn) {
        continueBonusQ4dBtn.addEventListener("click", () => {
            currentQuestionIndex = 5; // Definir explicitamente para a pergunta 5
            showScreen(`question-${currentQuestionIndex}`);
        });
    }

    // Event listener para o botão da tela de diagnóstico
    const vslCtaBtn = document.getElementById("vsl-cta-btn");
    if (vslCtaBtn) {
        vslCtaBtn.addEventListener("click", () => {
            showScreen("sales-page");
            startNewCountdown(); // Iniciar cronômetro quando entrar na página de vendas
        });
    }

    // Event listener para o botão final da página de vendas
    const finalCtaNew = document.getElementById("final-cta-new");
    if (finalCtaNew) {
        finalCtaNew.addEventListener("click", () => {
            window.location.href = "https://seusite.com/checkout"; // Substitua pelo seu URL de checkout
        });
    }

    // Função do novo cronômetro
    function startNewCountdown() {
        let minutes = 14;
        let seconds = 59;
        
        const minutesElement = document.getElementById("minutes-new");
        const secondsElement = document.getElementById("seconds-new");
        
        if (!minutesElement || !secondsElement) return;
        
        const countdown = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(countdown);
                    // Quando o tempo acabar, você pode redirecionar ou mostrar uma mensagem
                    minutesElement.textContent = "00";
                    secondsElement.textContent = "00";
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }

    console.log("Script carregado com sucesso!");
});

