import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  SafeAreaView
} from 'react-native';

const QuizScreen = ({ route, navigation }) => {
  const { typeJeu } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Données des questions (à remplacer par votre base de données complète)
  const questionsData = {
    1: [
      {
        id: 1,
        question: "En quelle année a été fondée la FIFA?",
        options: ["1904", "1920", "1930", "1950"],
        correctAnswer: 0,
        explanation: "La FIFA a été fondée le 21 mai 1904 à Paris."
      },
      {
        id: 2,
        question: "Qui a inventé le football moderne?",
        options: ["Les Français", "Les Anglais", "Les Brésiliens", "Les Italiens"],
        correctAnswer: 1,
        explanation: "Le football moderne a été codifié en Angleterre en 1863."
      },
      {
        id: 3,
        question: "Quel pays a remporté la première Coupe du Monde?",
        options: ["Brésil", "Uruguay", "Italie", "Allemagne"],
        correctAnswer: 1,
        explanation: "L'Uruguay a remporté la première Coupe du Monde en 1930."
      },
      {
        id: 4,
        question: "Combien de joueurs dans une équipe de football?",
        options: ["10", "11", "12", "9"],
        correctAnswer: 1,
        explanation: "Une équipe de football compte 11 joueurs sur le terrain."
      },
      {
        id: 5,
        question: "Quel est la durée d'un match de football?",
        options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
        correctAnswer: 1,
        explanation: "Un match de football dure 90 minutes (2 mi-temps de 45 minutes)."
      }
    ],
    2: [
      {
        id: 1,
        question: "Quel joueur a remporté le plus de Ballons d'Or?",
        options: ["Cristiano Ronaldo", "Lionel Messi", "Michel Platini", "Johann Cruyff"],
        correctAnswer: 1,
        explanation: "Lionel Messi a remporté 8 Ballons d'Or."
      },
      {
        id: 2,
        question: "Quel est le plus grand buteur de l'histoire du football?",
        options: ["Pele", "Cristiano Ronaldo", "Lionel Messi", "Romario"],
        correctAnswer: 1,
        explanation: "Cristiano Ronaldo est le plus grand buteur de l'histoire."
      }
    ]
  };

  const questions = questionsData[typeJeu.niveau] || questionsData[1];
  const currentQ = questions[currentQuestion];

  // Timer pour chaque question
  useEffect(() => {
    if (timeLeft > 0 && !showExplanation && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleTimeUp();
    }
  }, [timeLeft, showExplanation]);

  const handleTimeUp = () => {
    setShowExplanation(true);
    Alert.alert("Temps écoulé!", `La bonne réponse était: ${currentQ.options[currentQ.correctAnswer]}`);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showExplanation) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === currentQ.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    const finalScore = (score / questions.length) * 20;
    
    if (finalScore >= 15) {
      Alert.alert(
        "Félicitations! 🎉",
        `Vous avez obtenu ${finalScore.toFixed(1)}/20!\nNiveau suivant débloqué!`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('TypeJeu')
          }
        ]
      );
    } else {
      Alert.alert(
        "Quiz Terminé",
        `Score: ${finalScore.toFixed(1)}/20\nIl vous faut 15/20 pour débloquer le niveau suivant.`,
        [
          {
            text: "Réessayer",
            onPress: () => restartQuiz()
          },
          {
            text: "Retour",
            onPress: () => navigation.navigate('TypeJeu')
          }
        ]
      );
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(30);
    setQuizCompleted(false);
  };

  const getOptionStyle = (index) => {
    if (!showExplanation) {
      return styles.option;
    }

    if (index === currentQ.correctAnswer) {
      return styles.correctOption;
    } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
      return styles.wrongOption;
    } else {
      return styles.option;
    }
  };

  if (quizCompleted) {
    return (
      <View style={styles.container}>
        <View style={styles.completedContainer}>
          <Text style={styles.completedTitle}>Quiz Terminé! 🏆</Text>
          <Text style={styles.scoreText}>
            Score: {((score / questions.length) * 20).toFixed(1)}/20
          </Text>
          <Text style={styles.detailText}>
            Bonnes réponses: {score}/{questions.length}
          </Text>
          
          <TouchableOpacity 
            style={styles.restartButton}
            onPress={restartQuiz}
          >
            <Text style={styles.restartButtonText}>Recommencer</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('TypeJeu')}
          >
            <Text style={styles.backButtonText}>Retour aux types de jeu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec progression et timer */}
      <View style={styles.header}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1}/{questions.length}
          </Text>
          <Text style={styles.scoreText}>Score: {((score / questions.length) * 20).toFixed(1)}/20</Text>
        </View>
        
        <View style={styles.timerContainer}>
          <Text style={[styles.timer, timeLeft <= 10 && styles.timerCritical]}>
            ⏱️ {timeLeft}s
          </Text>
        </View>
      </View>

      {/* Barre de progression */}
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
          ]} 
        />
      </View>

      {/* Question */}
      <ScrollView style={styles.questionContainer}>
        <Text style={styles.categoryText}>{typeJeu.name} - Niveau {typeJeu.niveau}</Text>
        <Text style={styles.questionText}>{currentQ.question}</Text>

        {/* Options de réponse */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(index)}
              onPress={() => handleAnswerSelect(index)}
              disabled={showExplanation}
            >
              <Text style={styles.optionText}>{option}</Text>
              {showExplanation && index === currentQ.correctAnswer && (
                <Text style={styles.correctMark}>✓</Text>
              )}
              {showExplanation && index === selectedAnswer && index !== currentQ.correctAnswer && (
                <Text style={styles.wrongMark}>✗</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Explication */}
        {showExplanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Explication:</Text>
            <Text style={styles.explanationText}>{currentQ.explanation}</Text>
          </View>
        )}
      </ScrollView>

      {/* Bouton Suivant */}
      {showExplanation && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion < questions.length - 1 ? 'Question Suivante' : 'Terminer le Quiz'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  progressInfo: {
    flex: 1,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  scoreText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  timerContainer: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  timerCritical: {
    color: '#ff4757',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1e90ff',
  },
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  correctOption: {
    backgroundColor: '#d4edda',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#28a745',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrongOption: {
    backgroundColor: '#f8d7da',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#dc3545',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  correctMark: {
    color: '#28a745',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wrongMark: {
    color: '#dc3545',
    fontSize: 18,
    fontWeight: 'bold',
  },
  explanationContainer: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
    marginTop: 10,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  nextButton: {
    backgroundColor: '#1e90ff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  completedTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  restartButton: {
    backgroundColor: '#1e90ff',
    padding: 16,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#6c757d',
    padding: 16,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizScreen;