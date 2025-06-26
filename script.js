document.addEventListener('DOMContentLoaded', () => {

    const startScreen = document.getElementById('start-screen');
    const categorySelectionScreen = document.getElementById('category-selection');
    const questionScreen = document.getElementById('question-screen');
    const finalScoreScreen = document.getElementById('final-score-screen');

    const startGameBtn = document.getElementById('startGameBtn');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const optionButtons = document.querySelectorAll('.option-btn');
    const restartGameBtn = document.getElementById('restartGameBtn');

    const scorePlayer1Span = document.getElementById('scorePlayer1');
    const scorePlayer2Span = document.getElementById('scorePlayer2');
    const currentPlayerTurnSpan = document.getElementById('currentPlayerTurn');
    const currentCategoryTitle = document.getElementById('currentCategoryTitle');
    const questionText = document.getElementById('questionText');
    const finalScoreText = document.getElementById('finalScoreText');
    const winnerText = document.getElementById('winnerText');
    const feedbackMessage = document.getElementById('feedbackMessage'); 


    let currentPlayer = 1;
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    let currentCategory = '';
    let currentQuestionIndex = 0;
    let questionsAnsweredInCurrentCategory = 0;
    const questionsPerCategory = 3; 
    let answeredCategories = new Set(); 

    const allQuestions = {
        historia: [
            {
                question: "¿Quién fue el emperador azteca durante la llegada de los españoles?",
                options: { a: "Moctezuma II", b: "Cuauhtémoc", c: "Itzcóatl", d: "Axayácatl" },
                answer: "a"
            },
            {
                question: "¿En qué año se consumó la Independencia de México?",
                options: { a: "1810", b: "1821", c: "1824", d: "1808" },
                answer: "b"
            },
            {
                question: "¿Cuál fue la batalla donde el ejército mexicano derrotó a los franceses el 5 de mayo?",
                options: { a: "Batalla de Chapultepec", b: "Batalla de Puebla", c: "Batalla de Veracruz", d: "Batalla del Molino del Rey" },
                answer: "b"
            },
            {
                question: "¿Qué presidente mexicano nacionalizó la industria petrolera en 1938?",
                options: { a: "Venustiano Carranza", b: "Álvaro Obregón", c: "Lázaro Cárdenas", d: "Plutarco Elías Calles" },
                answer: "c"
            },
            {
                question: "¿Quién es conocido como 'El Padre de la Patria' en México?",
                options: { a: "José María Morelos", b: "Vicente Guerrero", c: "Miguel Hidalgo y Costilla", d: "Agustín de Iturbide" },
                answer: "c"
            }
        ],
        ciencia: [
            {
                question: "¿Cuál es el gas más abundante en la atmósfera terrestre?",
                options: { a: "Oxígeno", b: "Dióxido de carbono", c: "Nitrógeno", d: "Argón" },
                answer: "c"
            },
            {
                question: "¿Qué planeta es conocido como el 'Planeta Rojo'?",
                options: { a: "Júpiter", b: "Marte", c: "Venus", d: "Saturno" },
                answer: "b"
            },
            {
                question: "¿Cuál es el elemento químico con el símbolo 'Au'?",
                options: { a: "Plata", b: "Oro", c: "Cobre", d: "Aluminio" },
                answer: "b"
            },
            {
                question: "¿Qué rama de la ciencia estudia los seres vivos?",
                options: { a: "Física", b: "Química", c: "Biología", d: "Geología" },
                answer: "c"
            },
            {
                question: "¿Cuál es la velocidad de la luz en el vacío (aproximadamente)?",
                options: { a: "300,000 km/s", b: "150,000 km/s", c: "500,000 km/s", d: "1,000,000 km/s" },
                answer: "a"
            }
        ],
        geografia: [
            {
                question: "¿Cuál es la capital de México?",
                options: { a: "Guadalajara", b: "Monterrey", c: "Ciudad de México", d: "Puebla" },
                answer: "c"
            },
            {
                question: "¿Qué desierto se extiende por gran parte del norte de México y el suroeste de Estados Unidos?",
                options: { a: "Desierto de Sonora", b: "Desierto de Atacama", c: "Desierto del Sahara", d: "Desierto de Gobi" },
                answer: "a"
            },
            {
                question: "¿Cuál es la cadena montañosa más importante de México?",
                options: { a: "Sierra Nevada", b: "Montañas Rocosas", c: "Sierra Madre Oriental y Occidental", d: "Los Andes" },
                answer: "c"
            },
            {
                question: "¿Qué estado mexicano es famoso por sus playas como Cancún y Tulum?",
                options: { a: "Oaxaca", b: "Jalisco", c: "Yucatán", d: "Quintana Roo" },
                answer: "d"
            },
            {
                question: "¿Cuál es el volcán más alto de México?",
                options: { a: "Popocatépetl", b: "Iztaccíhuatl", c: "Pico de Orizaba", d: "Nevado de Toluca" },
                answer: "c"
            }
        ],
        arte: [
            {
                question: "¿Qué artista mexicana es famosa por sus autorretratos y su estilo surrealista?",
                options: { a: "Remedios Varo", b: "Leonora Carrington", c: "Frida Kahlo", d: "María Izquierdo" },
                answer: "c"
            },
            {
                question: "¿Qué tipo de arte tradicional mexicano se caracteriza por figuras de animales fantásticos y colores vibrantes?",
                options: { a: "Talavera", b: "Alebrijes", c: "Árbol de la Vida", d: "Huichol" },
                answer: "b"
            },
            {
            question: "¿Quién fue un muralista mexicano famoso por obras como 'Epopeya del pueblo mexicano'?",
                options: { a: "José Clemente Orozco", b: "David Alfaro Siqueiros", c: "Diego Rivera", d: "Rufino Tamayo" },
                answer: "c"
            },
            {
                question: "¿Qué civilización prehispánica construyó las pirámides del Sol y la Luna en Teotihuacán?",
                options: { a: "Mayas", b: "Aztecas", c: "Teotihuacanos", d: "Olmecas" },
                answer: "c"
            },
            {
                question: "¿Qué género musical tradicional mexicano es conocido por sus trompetas, violines y guitarrones?",
                options: { a: "Cumbia", b: "Salsa", c: "Mariachi", d: "Banda" },
                answer: "c"
            }
        ],
        deportes: [
            {
                question: "¿Qué deporte es el más popular en México?",
                options: { a: "Béisbol", b: "Fútbol", c: "Boxeo", d: "Básquetbol" },
                answer: "b"
            },
            {
                question: "¿En qué deporte es famoso el luchador 'El Santo'?",
                options: { a: "Boxeo", b: "Lucha Libre", c: "Judo", d: "Karate" },
                answer: "b"
            },
            {
                question: "¿Qué equipo de fútbol mexicano tiene más títulos de liga?",
                options: { a: "Club América", b: "Chivas de Guadalajara", c: "Cruz Azul", d: "Pumas UNAM" },
                answer: "a"
            },
            {
                question: "¿Quién es considerado el mejor boxeador mexicano de todos los tiempos?",
                options: { a: "Canelo Álvarez", b: "Juan Manuel Márquez", c: "Julio César Chávez", d: "Erik Morales" },
                answer: "c"
            },
            {
                question: "¿Qué deporte se practica en el Estadio Azteca?",
                options: { a: "Béisbol", b: "Fútbol Americano", c: "Fútbol Soccer", d: "Atletismo" },
                answer: "c"
            }
        ]
    };

    let shuffledQuestions = {}; 

    function showScreen(screenToShow, screenToHide = null) {
        if (screenToHide && screenToHide.classList.contains('active')) {
            screenToHide.classList.add('fade-out'); 
            screenToHide.addEventListener('animationend', function handler() {
                screenToHide.classList.remove('active', 'fade-out');
                screenToHide.removeEventListener('animationend', handler); 
                screenToShow.classList.add('active'); 
            }, { once: true });
        } else {
            screenToShow.classList.add('active');
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initializeGame() {
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        currentPlayer = 1;
        currentCategory = '';
        currentQuestionIndex = 0;
        questionsAnsweredInCurrentCategory = 0;
        answeredCategories.clear(); 
        updateScores();
        updatePlayerTurnDisplay();
        resetCategoryButtons();
        showScreen(startScreen, finalScoreScreen); 
        feedbackMessage.textContent = ''; 
    }

    function updateScores() {
        scorePlayer1Span.textContent = scorePlayer1;
        scorePlayer2Span.textContent = scorePlayer2;
    }

    function updatePlayerTurnDisplay() {
        currentPlayerTurnSpan.textContent = currentPlayer;
    }

    function resetCategoryButtons() {
        categoryButtons.forEach(button => {
            button.classList.remove('completed');
            button.disabled = false;
        });
    }

    function loadCategory(category) {
        currentCategory = category;
        currentQuestionIndex = 0;
        questionsAnsweredInCurrentCategory = 0;
        currentCategoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

        shuffledQuestions[category] = shuffleArray([...allQuestions[category]]).slice(0, questionsPerCategory);

        showScreen(questionScreen, categorySelectionScreen);
        displayQuestion();
        feedbackMessage.textContent = ''; 
    }

    function displayQuestion() {
        optionButtons.forEach(button => {
            button.classList.remove('correct', 'wrong');
            button.disabled = false;
        });

        const questionData = shuffledQuestions[currentCategory][currentQuestionIndex];
        questionText.textContent = questionData.question;

        optionButtons[0].textContent = questionData.options.a;
        optionButtons[1].textContent = questionData.options.b;
        optionButtons[2].textContent = questionData.options.c;
        optionButtons[3].textContent = questionData.options.d;
    }

    function checkAnswer(selectedOption) {
        optionButtons.forEach(button => button.disabled = true); 

        const questionData = shuffledQuestions[currentCategory][currentQuestionIndex];
        const correctAnswer = questionData.answer;
        let isCorrect = false;

        optionButtons.forEach(button => {
            if (button.dataset.option === correctAnswer) {
                button.classList.add('correct');
            } else if (button.dataset.option === selectedOption) {
                button.classList.add('wrong');
            }
        });

        if (selectedOption === correctAnswer) {
            if (currentPlayer === 1) {
                scorePlayer1 += 10;
            } else {
                scorePlayer2 += 10;
            }
            isCorrect = true;
          
        } else {
     
            feedbackMessage.textContent = `¡Incorrecto! Turno del Jugador ${currentPlayer === 1 ? '2' : '1'}.`;
            feedbackMessage.style.color = '#FF3333'; 
         
            currentPlayer = currentPlayer === 1 ? 2 : 1; 
            updatePlayerTurnDisplay();
        }

        updateScores();

        setTimeout(() => {
            if (isCorrect) {
                currentQuestionIndex++;
                questionsAnsweredInCurrentCategory++;
                feedbackMessage.textContent = ''; 
            } else {
                currentQuestionIndex++; 
                questionsAnsweredInCurrentCategory++;
            }

            if (questionsAnsweredInCurrentCategory < questionsPerCategory) {
                displayQuestion(); 
            } else {
                answeredCategories.add(currentCategory);
                markCategoryAsCompleted(currentCategory);
                endTurnLogic(); 
            }
        }, 1500); 
    }

    function markCategoryAsCompleted(category) {
        const btn = document.querySelector(`.category-btn[data-category="${category}"]`);
        if (btn) {
            btn.classList.add('completed');
            btn.disabled = true;
        }
    }

    function endTurnLogic() {
        if (answeredCategories.size === Object.keys(allQuestions).length) {
            endGame();
        } else {
            setTimeout(() => {
                showScreen(categorySelectionScreen, questionScreen); 
                updatePlayerTurnDisplay(); 
                feedbackMessage.textContent = ''; 
            }, 800); 
        }
    }

    function endGame() {
        let finalMessage = `Jugador 1: ${scorePlayer1} puntos | Jugador 2: ${scorePlayer2} puntos`;
        let winnerMessage = '';

        if (scorePlayer1 > scorePlayer2) {
            winnerMessage = "¡El Jugador 1 ha ganado!";
            winnerText.style.color = '#FFD700'; 
        } else if (scorePlayer2 > scorePlayer1) {
            winnerMessage = "¡El Jugador 2 ha ganado!";
            winnerText.style.color = '#FFD700';
        } else {
            winnerMessage = "¡Es un empate!";
            winnerText.style.color = '#00BFFF';
        }

        finalScoreText.textContent = finalMessage;
        winnerText.textContent = winnerMessage;
        showScreen(finalScoreScreen, questionScreen); 
    }

    startGameBtn.addEventListener('click', () => {
        showScreen(categorySelectionScreen, startScreen); 
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('completed')) {
                loadCategory(button.dataset.category);
            }
        });
    });

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            checkAnswer(button.dataset.option);
        });
    });

    restartGameBtn.addEventListener('click', initializeGame);

    initializeGame();
});