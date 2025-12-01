import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';

const QuizDrapeauScreen = ({ route, navigation }) => {
  const { niveau, onQuizFinish } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Données des questions pour les drapeaux - 10 questions par niveau
  const questionsData = {
    1: [ // Niveau 1 - Europe de l'Ouest
      {
        id: 1,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/france.png'),
        options: [ "Italie","France", "Belgique", "Pays-Bas"],
        correctAnswer: 1,
        explanation: "Ce drapeau bleu-blanc-rouge est celui de la France."
      },
      {
        id: 2,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/allemagne.png'),
        options: [ "Belgique", "Italie", "France", "Allemagne"],
        correctAnswer: 3,
        explanation: "Ce drapeau noir-rouge-jaune est celui de l'Allemagne."
      },
      {
        id: 3,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/royaume_uni.png'),
        options: [ "Australie", "Nouvelle-Zélande","Royaume-Uni", "États-Unis"],
        correctAnswer: 2,
        explanation: "Ce drapeau est l'Union Jack du Royaume-Uni."
      },
      {
        id: 4,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/espagne.png'),
        options: [ "Portugal", "Italie", "Grèce", "Espagne",],
        correctAnswer: 3,
        explanation: "Ce drapeau rouge-jaune-rouge est celui de l'Espagne."
      },
      {
        id: 5,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/italie.png'),
        options: ["France", "Irlande","Italie",  "Mexique"],
        correctAnswer: 2,
        explanation: "Ce drapeau vert-blanc-rouge est celui de l'Italie."
      },
      {
        id: 6,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/portugal.png'),
        options: ["Portugal", "Espagne", "Brésil", "Argentine"],
        correctAnswer: 0,
        explanation: "Ce drapeau vert-rouge avec les armoiries est celui du Portugal."
      },
      {
        id: 7,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/belgique.png'),
        options: ["Belgique", "Allemagne", "France", "Pays-Bas"],
        correctAnswer: 0,
        explanation: "Ce drapeau noir-jaune-rouge vertical est celui de la Belgique."
      },
      {
        id: 8,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/pays_bas.png'),
        options: [ "Russie","Pays-Bas", "France", "Luxembourg"],
        correctAnswer: 1,
        explanation: "Ce drapeau rouge-blanc-bleu est celui des Pays-Bas."
      },
      {
        id: 9,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/suisse.png'),
        options: [ "Danemark", "Suède", "Autriche", "Suisse"],
        correctAnswer: 3,
        explanation: "Ce drapeau rouge avec croix blanche est celui de la Suisse."
      },
      {
        id: 10,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/autriche.png'),
        options: ["Autriche", "Pologne", "Lettonie", "Monaco"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-blanc-rouge est celui de l'Autriche."
      }
    ],
    2: [ // Niveau 2 - Europe du Sud
      {
        id: 1,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/grece.png'),
        options: [ "Finlande","Grèce", "Norvège", "Islande"],
        correctAnswer: 1,
        explanation: "Ce drapeau bleu et blanc avec croix est celui de la Grèce."
      },
      {
        id: 2,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/turquie.png'),
        options: ["Tunisie","Turquie", "Algérie", "Maroc"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge avec étoile et croissant est celui de la Turquie."
      },
      {
        id: 3,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/croatie.png'),
        options: ["Croatie", "Serbie", "Slovénie", "Bosnie"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-blanc-bleu avec échiquier est celui de la Croatie."
      },
      {
        id: 4,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/serbie.png'),
        options: ["Serbie", "Russie", "Bulgarie", "Monténégro"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-bleu-blanc avec armoiries est celui de la Serbie."
      },
      {
        id: 5,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/albanie.png'),
        options: ["Albanie", "Kosovo", "Macédoine", "Monténégro"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge avec aigle noir est celui de l'Albanie."
      },
      {
        id: 6,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/bulgarie.png'),
        options: [ "Russie", "Pays-Bas", "Luxembourg", "Bulgarie",],
        correctAnswer: 3,
        explanation: "Ce drapeau blanc-vert-rouge est celui de la Bulgarie."
      },
      {
        id: 7,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/roumanie.png'),
        options: [ "Moldavie", "Tchad","Roumanie", "Andorre"],
        correctAnswer: 2,
        explanation: "Ce drapeau bleu-jaune-rouge est celui de la Roumanie."
      },
      {
        id: 8,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/hongrie.png'),
        options: ["Hongrie", "Italie", "Bulgarie", "Iran"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-blanc-vert est celui de la Hongrie."
      },
      {
        id: 9,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/slovenie.png'),
        options: ["Slovénie", "Slovaquie", "Russie", "Serbie"],
        correctAnswer: 0,
        explanation: "Ce drapeau blanc-bleu-rouge avec montagnes est celui de la Slovénie."
      },
      {
        id: 10,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/bosnie.png'),
        options: ["Croatie","Bosnie-Herzégovine",  "Serbie", "Monténégro"],
        correctAnswer: 1,
        explanation: "Ce drapeau bleu avec triangle jaune est celui de la Bosnie-Herzégovine."
      }
    ],
    3: [ // Niveau 3 - Europe du Nord
      {
        id: 1,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/suede.png'),
        options: ["Suède", "Danemark", "Norvège", "Finlande"],
        correctAnswer: 0,
        explanation: "Ce drapeau bleu avec croix jaune est celui de la Suède."
      },
      {
        id: 2,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/norvege.png'),
        options: ["Norvège", "Islande", "Finlande", "Danemark"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge avec croix bleue bordée de blanc est celui de la Norvège."
      },
      {
        id: 3,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/danemark.png'),
        options: [ "Suisse","Danemark", "Autriche", "Lettonie"],
        correctAnswer: 1,
        explanation: "Ce drapeau rouge avec croix blanche est celui du Danemark."
      },
      {
        id: 4,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/finlande.png'),
        options: [ "Islande", "Norvège", "Suède", "Finlande"],
        correctAnswer: 3,
        explanation: "Ce drapeau blanc avec croix bleue est celui de la Finlande."
      },
      {
        id: 5,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/islande.png'),
        options: [ "Norvège","Islande", "Danemark", "Suède"],
        correctAnswer: 1,
        explanation: "Ce drapeau bleu avec croix rouge bordée de blanc est celui de l'Islande."
      },
      {
        id: 6,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/estonie.png'),
        options: [ "Lettonie", "Lituanie", "Estonie","Finlande"],
        correctAnswer: 2,
        explanation: "Ce drapeau bleu-noir-blanc est celui de l'Estonie."
      },
      {
        id: 7,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/lettonie.png'),
        options: ["Lettonie", "Autriche", "Pologne", "Lituanie"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-blanc-rouge est celui de la Lettonie."
      },
      {
        id: 8,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/lituanie.png'),
        options: ["Hongrie", "Bulgarie", "Lituanie", "Italie"],
        correctAnswer: 2,
        explanation: "Ce drapeau jaune-vert-rouge est celui de la Lituanie."
      },
      {
        id: 9,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/pologne.png'),
        options: ["Pologne", "Indonésie", "Monaco", "Singapour"],
        correctAnswer: 0,
        explanation: "Ce drapeau blanc-rouge est celui de la Pologne."
      },
      {
        id: 10,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/republique_tcheque.png'),
        options: ["République Tchèque", "Slovaquie", "Autriche", "Hongrie"],
        correctAnswer: 0,
        explanation: "Ce drapeau bleu-rouge-blanc avec triangle bleu est celui de la République Tchèque."
      }
    ],
    4: [ // Niveau 4 - Amérique du Nord
      {
        id: 1,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/etats_unis.png'),
        options: ["États-Unis", "Royaume-Uni", "Australie", "Nouvelle-Zélande"],
        correctAnswer: 0,
        explanation: "Ce drapeau avec 50 étoiles et 13 bandes est celui des États-Unis."
      },
      {
        id: 2,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/canada.png'),
        options: ["Canada", "Pérou", "Suisse", "Géorgie"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge avec feuille d'érable est celui du Canada."
      },
      {
        id: 3,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/mexique.png'),
        options: ["Mexique", "Italie", "Hongrie", "Iran"],
        correctAnswer: 0,
        explanation: "Ce drapeau vert-blanc-rouge avec aigle est celui du Mexique."
      },
      {
        id: 4,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/cuba.png'),
        options: [ "Porto Rico", "Philippines","Cuba", "Chili"],
        correctAnswer: 2,
        explanation: "Ce drapeau bleu-blanc-rouge avec étoile est celui de Cuba."
      },
      {
        id: 5,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/jamaique.png'),
        options: [ "Bahamas", "Barbade", "Trinité-et-Tobago", "Jamaïque",],
        correctAnswer: 3,
        explanation: "Ce drapeau avec croix diagonale jaune et noir-vert est celui de la Jamaïque."
      },
      {
        id: 6,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/republique_dominicaine.png'),
        options: [ "Dominique", "Haïti", "Costa Rica", "République Dominicaine",],
        correctAnswer: 3,
        explanation: "Ce drapeau avec croix blanche et quartiers bleu-rouge est celui de la République Dominicaine."
      },
      {
        id: 7,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/porto_rico.png'),
        options: ["Porto Rico", "Cuba", "République Dominicaine", "Philippines"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-blanc-bleu avec étoile est celui de Porto Rico."
      },
      {
        id: 8,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/costa_rica.png'),
        options: ["Costa Rica", "Thaïlande", "Pays-Bas", "France"],
        correctAnswer: 0,
        explanation: "Ce drapeau bleu-blanc-rouge-blanc-bleu est celui du Costa Rica."
      },
      {
        id: 9,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/panama.png'),
        options: ["Panama", "Cuba", "Tchéquie", "Philippines"],
        correctAnswer: 0,
        explanation: "Ce drapeau avec quartiers blanc-rouge-bleu et étoiles est celui du Panama."
      },
      {
        id: 10,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/guatemala.jpeg'),
        options: [ "Nicaragua","Guatemala", "Honduras", "Salvador"],
        correctAnswer: 1,
        explanation: "Ce drapeau bleu-blanc-bleu avec armoiries est celui du Guatemala."
      }
    ],
    5: [ // Niveau 5 - Amérique du Sud
      {
        id: 1,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/argentine.png'),
        options: [ "Uruguay", "Paraguay", "Salvador", "Argentine",],
        correctAnswer: 3,
        explanation: "Ce drapeau bleu-blanc-bleu avec soleil est celui de l'Argentine."
      },
      {
        id: 2,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/bresil.png'),
        options: ["Brésil", "Portugal", "Thaïlande", "Liban"],
        correctAnswer: 0,
        explanation: "Ce drapeau vert-jaune avec globe bleu est celui du Brésil."
      },
      {
        id: 3,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/uruguay.png'),
        options: ["Uruguay", "Argentine", "Grèce", "États-Unis"],
        correctAnswer: 0,
        explanation: "Ce drapeau avec bandes blanches et bleues et soleil est celui de l'Uruguay."
      },
      {
        id: 4,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/chili.png'),
        options: [ "Texas", "Cuba","Chili", "Porto Rico"],
        correctAnswer: 2,
        explanation: "Ce drapeau bleu-blanc-rouge avec étoile est celui du Chili."
      },
      {
        id: 5,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/colombie.png'),
        options: ["Colombie", "Équateur", "Venezuela", "Pologne"],
        correctAnswer: 0,
        explanation: "Ce drapeau jaune-bleu-rouge est celui de la Colombie."
      },
      {
        id: 6,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/perou.png'),
        options: [ "Canada", "Autriche", "Lettonie", "Pérou"],
        correctAnswer: 3,
        explanation: "Ce drapeau rouge-blanc-rouge est celui du Pérou."
      },
      {
        id: 7,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/venezuela.png'),
        options: [ "Colombie", "Équateur","Venezuela", "Roumanie"],
        correctAnswer: 2,
        explanation: "Ce drapeau jaune-bleu-rouge avec étoiles est celui du Venezuela."
      },
      {
        id: 8,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/equateur.png'),
        options: ["Équateur", "Colombie", "Venezuela", "Mexique"],
        correctAnswer: 0,
        explanation: "Ce drapeau jaune-bleu-rouge avec armoiries est celui de l'Équateur."
      },
      {
        id: 9,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/paraguay.png'),
        options: ["Paraguay", "Pays-Bas", "France", "Russie"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-blanc-bleu avec sceaux différents est celui du Paraguay."
      },
      {
        id: 10,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/bolivie.png'),
        options: ["Bolivie", "Ghana", "Éthiopie", "Mali"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-jaune-vert est celui de la Bolivie."
      }
    ],
    // Ajoutez ces données aux questionsData existantes dans QuizDrapeauScreen.js

    6: [ // Niveau 6 - Afrique du Nord
      {
        id: 1,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/maroc.jpeg'),
        options: [ "Turquie", "Algérie","Maroc", "Tunisie"],
        correctAnswer: 2,
        explanation: "Ce drapeau rouge avec étoile verte est celui du Maroc."
      },
      {
        id: 2,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/algerie.png'),
        options: [ "Pakistan", "Turquie", "Algérie", "Tunisie"],
        correctAnswer: 2,
        explanation: "Ce drapeau vert-blanc-rouge avec croissant et étoile est celui de l'Algérie."
      },
      {
        id: 3,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/tunisie.png'),
        options: ["Tunisie", "Turquie", "Maroc", "Algérie"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge avec disque blanc et croissant/étoile est celui de la Tunisie."
      },
      {
        id: 4,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/egypte.png'),
        options: ["Égypte", "Irak", "Syrie", "Yémen"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-blanc-noir avec aigle est celui de l'Égypte."
      },
      {
        id: 5,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/libye.png'),
        options: [ "Koweït","Libye", "Émirats Arabes Unis", "Arabie Saoudite"],
        correctAnswer: 1,
        explanation: "Ce drapeau rouge-noir-vert avec croissant/étoile est celui de la Libye."
      },
      {
        id: 6,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/soudan.png'),
        options: [ "Jordanie", "Soudan","Palestine", "Koweït"],
        correctAnswer: 1,
        explanation: "Ce drapeau rouge-blanc-noir avec triangle vert est celui du Soudan."
      },
      {
        id: 7,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/mauritanie.png'),
        options: [ "Pakistan","Mauritanie", "Algérie", "Turquie"],
        correctAnswer: 1,
        explanation: "Ce drapeau vert avec croissant et étoile jaunes est celui de la Mauritanie."
      },
      {
        id: 8,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/liban.png'),
        options: [ "Qatar","Liban", "Bahreïn", "Koweït"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-blanc-rouge avec cèdre vert est celui du Liban."
      },
      {
        id: 9,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/jordanie.png'),
        options: ["Jordanie", "Soudan", "Palestine", "Koweït"],
        correctAnswer: 0,
        explanation: "Ce drapeau avec triangle rouge et bandes noire-blanc-vert est celui de la Jordanie."
      },
      {
        id: 10,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/syrie.png'),
        options: [ "Égypte", "Yémen", "Irak", "Syrie",],
        correctAnswer: 3,
        explanation: "Ce drapeau rouge-blanc-noir avec deux étoiles est celui de la Syrie."
      }
    ],
    7: [ // Niveau 7 - Afrique subsaharienne
      {
        id: 1,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/afrique_du_sud.png'),
        options: [ "Mali", "Ghana", "Kenya", "Afrique du Sud",],
        correctAnswer: 3,
        explanation: "Ce drapeau arc-en-ciel avec Y vert est celui de l'Afrique du Sud."
      },
      {
        id: 2,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/nigeria.png'),
        options: ["Nigeria", "Cameroun", "Côte d'Ivoire", "Ghana"],
        correctAnswer: 0,
        explanation: "Ce drapeau vert-blanc-vert est celui du Nigeria."
      },
      {
        id: 3,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/cote_ivoire.png'),
        options: ["Côte d'Ivoire", "Irlande", "Italie", "Hongrie"],
        correctAnswer: 0,
        explanation: "Ce drapeau orange-blanc-vert est celui de la Côte d'Ivoire."
      },
      {
        id: 4,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/senegal.png'),
        options: ["Sénégal", "Mali", "Guinée", "Cameroun"],
        correctAnswer: 0,
        explanation: "Ce drapeau vert-jaune-rouge avec étoile verte est celui du Sénégal."
      },
      {
        id: 5,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/cameroun.png'),
        options: ["Cameroun", "Sénégal", "Ghana", "Mali"],
        correctAnswer: 0,
        explanation: "Ce drapeau vert-rouge-jaune avec étoile est celui du Cameroun."
      },
      {
        id: 6,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/ghana.png'),
        options: [ "Éthiopie", "Mali","Ghana","Burkina Faso"],
        correctAnswer: 2,
        explanation: "Ce drapeau rouge-jaune-vert avec étoile noire est celui du Ghana."
      },
      {
        id: 7,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/kenya.png'),
        options: [ "Soudan du Sud","Kenya", "Tanzanie", "Ouganda"],
        correctAnswer: 1,
        explanation: "Ce drapeau noir-rouge-vert avec bouclier Masai est celui du Kenya."
      },
      {
        id: 8,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/ethiopie.png'),
        options: [ "Bolivie","Éthiopie", "Lituanie", "Colombie"],
        correctAnswer: 1,
        explanation: "Ce drapeau vert-jaune-rouge avec emblème bleu est celui de l'Éthiopie."
      },
      {
        id: 9,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/rdc.png'),
        options: ["RD Congo", "Angola", "Zambie", "Tanzanie"],
        correctAnswer: 0,
        explanation: "Ce drapeau bleu avec diagonale rouge et étoile jaune est celui de la RD Congo."
      },
      {
        id: 10,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/madagascar.png'),
        options: [ "Pologne", "Indonésie", "Madagascar","Monaco"],
        correctAnswer: 2,
        explanation: "Ce drapeau blanc-rouge-vert est celui de Madagascar."
      }
    ],
    8: [ // Niveau 8 - Asie de l'Est
      {
        id: 1,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/japon.png'),
        options: ["Japon", "Bangladesh", "Palau", "Laos"],
        correctAnswer: 0,
        explanation: "Ce drapeau blanc avec cercle rouge est celui du Japon."
      },
      {
        id: 2,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/chine.png'),
        options: ["Chine", "Vietnam", "Corée du Nord", "Maroc"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge avec étoiles jaunes est celui de la Chine."
      },
      {
        id: 3,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/coree_sud.png'),
        options: ["Corée du Sud", "Thaïlande", "Gréce", "Argentine"],
        correctAnswer: 0,
        explanation: "Ce drapeau blanc avec yin-yang et trigrammes est celui de la Corée du Sud."
      },
      {
        id: 4,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/coree_nord.png'),
        options: [ "Philippines", "Chili","Corée du Nord", "Porto Rico"],
        correctAnswer: 2,
        explanation: "Ce drapeau bleu-rouge-bleu avec étoile rouge est celui de la Corée du Nord."
      },
      {
        id: 5,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/taiwan.png'),
        options: [ "Samoa", "Taïwan", "Chine", "Vietnam"],
        correctAnswer: 1,
        explanation: "Ce drapeau rouge avec soleil blanc est celui de Taïwan."
      },
      {
        id: 6,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/vietnam.png'),
        options: ["Chine", "Maroc","Vietnam",  "Turquie"],
        correctAnswer: 2,
        explanation: "Ce drapeau rouge avec étoile jaune est celui du Vietnam."
      },
      {
        id: 7,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/laos.png'),
        options: ["Laos", "Thaïlande", "Cambodge", "Birmanie"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-bleu-rouge avec cercle blanc est celui du Laos."
      },
      {
        id: 8,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/cambodge.png'),
        options: ["Cambodge", "Thaïlande", "Laos", "Vietnam"],
        correctAnswer: 0,
        explanation: "Ce drapeau bleu-rouge-bleu avec temple d'Angkor est celui du Cambodge."
      },
      {
        id: 9,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/birmanie.png'),
        options: [ "Taïwan", "Laos", "Singapour", "Birmanie (Myanmar)",],
        correctAnswer: 3,
        explanation: "Ce drapeau jaune-vert-rouge avec étoile blanche est celui de la Birmanie."
      },
      {
        id: 10,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/thailande.png'),
        options: ["Thaïlande", "Costa Rica", "Pays-Bas", "Russie"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-blanc-bleu-blanc-rouge est celui de la Thaïlande."
      }
    ],
    9: [ // Niveau 9 - Moyen-Orient
      {
        id: 1,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/arabie_saoudite.png'),
        options: [ "Irak","Arabie Saoudite", "Syrie", "Émirats Arabes Unis"],
        correctAnswer: 1,
        explanation: "Ce drapeau vert avec épée et shahada est celui de l'Arabie Saoudite."
      },
      {
        id: 2,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/iran.png'),
        options: ["Hongrie", "Iran", "Italie", "Mexique"],
        correctAnswer: 1,
        explanation: "Ce drapeau vert-blanc-rouge avec emblème au centre est celui de l'Iran."
      },
      {
        id: 3,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/irak.png'),
        options: ["Syrie", "Égypte","Irak",  "Soudan"],
        correctAnswer: 2,
        explanation: "Ce drapeau rouge-blanc-noir avec takbir est celui de l'Irak."
      },
      {
        id: 4,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/israel.png'),
        options: ["Israël", "Finlande", "Grèce", "Suède"],
        correctAnswer: 0,
        explanation: "Ce drapeau blanc avec étoile de David bleue est celui d'Israël."
      },
      {
        id: 5,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/qatar.png'),
        options: ["Qatar", "Bahreïn", "Émirats Arabes Unis", "Koweït"],
        correctAnswer: 0,
        explanation: "Ce drapeau bordeaux avec bande blanche et triangles est celui du Qatar."
      },
      {
        id: 6,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/emirats_arabes_unis.png'),
        options: [ "Jordanie", "Koweït", "Oman","Émirats Arabes Unis",],
        correctAnswer: 3,
        explanation: "Ce drapeau rouge-vert-blanc-noir est celui des Émirats Arabes Unis."
      },
      {
        id: 7,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/koweit.png'),
        options: ["Palestine", "Koweït", "Jordanie", "Émirats Arabes Unis"],
        correctAnswer: 1,
        explanation: "Ce drapeau vert-blanc-rouge avec trapèze noir est celui du Koweït."
      },
      {
        id: 8,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/oman.png'),
        options: ["Oman", "Émirats Arabes Unis", "Qatar", "Arabie Saoudite"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-vert-blanc avec emblème est celui d'Oman."
      },
      {
        id: 9,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/yemen.png'),
        options: ["Yémen", "Égypte", "Syrie", "Irak"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge-blanc-noir est celui du Yémen."
      },
      {
        id: 10,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/bahrein.png'),
        options: [ "Qatar", "Bahreïn","Émirats Arabes Unis", "Koweït"],
        correctAnswer: 1,
        explanation: "Ce drapeau blanc-rouge avec triangles est celui de Bahreïn."
      }
    ],
    10: [ // Niveau 10 - Océanie & Caraïbes
      {
        id: 1,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/australie.png'),
        options: [ "Nouvelle-Zélande", "Fidji", "Papouasie-Nouvelle-Guinée", "Australie",],
        correctAnswer: 3,
        explanation: "Ce drapeau bleu avec Union Jack et étoiles est celui de l'Australie."
      },
      {
        id: 2,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/nouvelle_zelande.png'),
        options: ["Nouvelle-Zélande", "Australie", "Fidji", "Tonga"],
        correctAnswer: 0,
        explanation: "Ce drapeau bleu avec Union Jack et étoiles rouges est celui de la Nouvelle-Zélande."
      },
      {
        id: 3,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/fidji.png'),
        options: ["Tuvalu","Fidji",  "Kiribati", "Vanuatu"],
        correctAnswer: 1,
        explanation: "Ce drapeau bleu clair avec Union Jack et armoiries est celui des Fidji."
      },
      {
        id: 4,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/papouasie_nouvelle_guinee.png'),
        options: ["Papouasie-Nouvelle-Guinée", "Îles Salomon", "Vanuatu", "Samoa"],
        correctAnswer: 0,
        explanation: "Ce drapeau noir-rouge avec oiseau de paradis est celui de la Papouasie-Nouvelle-Guinée."
      },
      {
        id: 5,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/tonga.png'),
        options: [ "Géorgie","Tonga", "Suisse", "Angleterre"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge avec canton blanc et croix rouge est celui des Tonga."
      },
      {
        id: 6,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/samoa.png'),
        options: ["Taïwan", "Samoa", "Chine", "Corée du Sud"],
        correctAnswer: 1,
        explanation: "Ce drapeau rouge avec canton bleu et étoiles est celui des Samoa."
      },
      {
        id: 7,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/haiti.png'),
        options: ["Liechtenstein", "Haïti", "Pologne", "Monaco"],
        correctAnswer: 1,
        explanation: "Ce drapeau bleu-rouge avec armoiries est celui d'Haïti."
      },
      {
        id: 8,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/barbade.png'),
        options: ["Barbade", "Trinité-et-Tobago", "Jamaïque", "Bahamas"],
        correctAnswer: 0,
        explanation: "Ce drapeau bleu-jaune-bleu avec trident est celui de la Barbade."
      },
      {
        id: 9,
        question: "À quel pays appartient ce drapeau?",
        image: require('../../assets/images/drapeaux/bahamas.png'),
        options: [ "Cuba", "Taïwan", "Philippines", "Bahamas",],
        correctAnswer: 3,
        explanation: "Ce drapeau bleu-jaune-bleu avec triangle noir est celui des Bahamas."
      },
      {
        id: 10,
        question: "Quel pays a ce drapeau?",
        image: require('../../assets/images/drapeaux/trinite_tobago.png'),
        options: ["Trinité-et-Tobago", "Guyana", "Suriname", "Barbade"],
        correctAnswer: 0,
        explanation: "Ce drapeau rouge avec diagonale noire bordée de blanc est celui de Trinité-et-Tobago."
      }
    ]
  };

  const questions = questionsData[niveau.id] || questionsData[1];
  const currentQ = questions[currentQuestion];

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
    
    if (onQuizFinish) {
      onQuizFinish(finalScore >= 15 ? Math.round(finalScore) : score);
    }

    if (finalScore >= 15) {
      Alert.alert(
        "Félicitations! 🎉",
        `Vous avez obtenu ${Math.round(finalScore)}/20!\nNiveau suivant débloqué!`,
        [
          {
            text: "Retour aux niveaux",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else {
      Alert.alert(
        "Quiz Terminé",
        `Score: ${Math.round(finalScore)}/20\nIl vous faut 15/20 pour débloquer le niveau suivant.`,
        [
          {
            text: "Réessayer",
            onPress: () => restartQuiz()
          },
          {
            text: "Retour",
            onPress: () => navigation.goBack()
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
    const finalScore = (score / questions.length) * 20;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.completedContainer}>
          <Text style={styles.completedTitle}>Quiz Terminé! 🏆</Text>
          
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>{Math.round(finalScore)}</Text>
            <Text style={styles.scoreMax}>/20</Text>
          </View>
          
          <Text style={styles.detailText}>
            {score} bonnes réponses sur {questions.length}
          </Text>
          
          <View style={styles.resultStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{questions.length}</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{score}</Text>
              <Text style={styles.statLabel}>Correctes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{questions.length - score}</Text>
              <Text style={styles.statLabel}>Erreurs</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.restartButton}
              onPress={restartQuiz}
            >
              <Text style={styles.restartButtonText}>Recommencer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Retour aux niveaux</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View style={styles.progressInfo}>
          <Text style={styles.levelText}>{niveau.nom}</Text>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1}/{questions.length}
          </Text>
        </View>
        
        <View style={styles.scoreTimerContainer}>
          <Text style={styles.scoreText}>Score: {score}/{questions.length}</Text>
          <View style={styles.timerContainer}>
            <Text style={[styles.timer, timeLeft <= 10 && styles.timerCritical]}>
              ⏱️ {timeLeft}s
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
          ]} 
        />
      </View>

      <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={currentQ.image || require('../../assets/images/drapeaux/default_drapeau.png')}
            style={styles.questionImage}
            resizeMode="contain"
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.questionNumber}>Question {currentQuestion + 1}</Text>
          </View>
        </View>

        <Text style={styles.questionText}>{currentQ.question}</Text>

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

        {showExplanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Explication:</Text>
            <Text style={styles.explanationText}>{currentQ.explanation}</Text>
          </View>
        )}
      </ScrollView>

      {showExplanation && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion < questions.length - 1 ? 'Question Suivante →' : 'Terminer le Quiz'}
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
    backgroundColor: '#f8f9fa',
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
  levelText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  scoreTimerContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  timerContainer: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  timer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  timerCritical: {
    color: '#ff6b6b',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  questionContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  imageContainer: {
    height: 150,
    marginBottom: 20,
    position: 'relative',
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
  },
  questionImage: {
    width: 200,
    height: 120,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  questionNumber: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 25,
    lineHeight: 28,
  },
  optionsContainer: {
    paddingHorizontal: 20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
    fontWeight: '500',
  },
  correctMark: {
    color: '#28a745',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  wrongMark: {
    color: '#dc3545',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  explanationContainer: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
    marginHorizontal: 20,
    marginTop: 10,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  nextButton: {
    backgroundColor: '#4caf50',
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
    padding: 30,
    backgroundColor: 'white',
  },
  completedTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#4caf50',
    marginBottom: 20,
    flexDirection: 'row',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  scoreMax: {
    fontSize: 24,
    color: '#666',
    marginLeft: 5,
  },
  detailText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  restartButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 10,
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
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizDrapeauScreen;