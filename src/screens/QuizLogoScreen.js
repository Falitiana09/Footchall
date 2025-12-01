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

const QuizLogoScreen = ({ route, navigation }) => {
  const { niveau, onQuizFinish } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Données des questions pour les logos - 10 questions par niveau
  const questionsData = {
    1: [ // Niveau 1 - Clubs européens célèbres
      {
        id: 1,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/real_madrid.png'),
        options: ["FC Barcelone", "Real Madrid", "Manchester United", "Bayern Munich"],
        correctAnswer: 1,
        explanation: "Ce logo est celui du Real Madrid, club espagnol."
      },
      {
        id: 2,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/fc_barcelona.png'),
        options: ["FC Barcelone", "Paris Saint-Germain", "Juventus", "Liverpool"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du FC Barcelone."
      },
      {
        id: 3,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/manchester_united.png'),
        options: ["Chelsea", "Manchester United", "Arsenal", "Manchester City"],
        correctAnswer: 1,
        explanation: "Ce logo est celui de Manchester United."
      },
      {
        id: 4,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/bayern_munich.png'),
        options: ["Borussia Dortmund", "Bayern Munich", "Schalke 04", "Bayer Leverkusen"],
        correctAnswer: 1,
        explanation: "Ce logo est celui du Bayern Munich."
      },
      {
        id: 5,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/juventus.png'),
        options: ["AC Milan", "Inter Milan", "Juventus", "AS Roma"],
        correctAnswer: 2,
        explanation: "Ce logo est celui de la Juventus."
      },
      {
        id: 6,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/paris_sg.png'),
        options: ["Olympique de Marseille", "Paris Saint-Germain", "Lyon", "Monaco"],
        correctAnswer: 1,
        explanation: "Ce logo est celui du Paris Saint-Germain."
      },
      {
        id: 7,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/liverpool.png'),
        options: ["Liverpool", "Chelsea", "Tottenham", "Everton"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de Liverpool FC."
      },
      {
        id: 8,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/ac_milan.png'),
        options: ["Inter Milan", "AC Milan", "Napoli", "Fiorentina"],
        correctAnswer: 1,
        explanation: "Ce logo est celui de l'AC Milan."
      },
      {
        id: 9,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/chelsea.png'),
        options: ["Arsenal", "Chelsea", "Manchester City", "Tottenham"],
        correctAnswer: 1,
        explanation: "Ce logo est celui de Chelsea FC."
      },
      {
        id: 10,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/borussia_dortmund.png'),
        options: ["Borussia Dortmund", "Bayern Munich", "RB Leipzig", "Wolfsburg"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Borussia Dortmund."
      }
    ],
    2: [ // Niveau 2 - Clubs anglais
      {
        id: 1,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/arsenal.png'),
        options: ["Arsenal", "Tottenham", "West Ham", "Chelsea"],
        correctAnswer: 0,
        explanation: "Ce logo est celui d'Arsenal FC."
      },
      {
        id: 2,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/manchester_city.png'),
        options: ["Manchester United", "Manchester City", "Liverpool", "Everton"],
        correctAnswer: 1,
        explanation: "Ce logo est celui de Manchester City."
      },
      {
        id: 3,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/tottenham.png'),
        options: ["Chelsea", "Tottenham Hotspur", "Arsenal", "West Ham"],
        correctAnswer: 1,
        explanation: "Ce logo est celui de Tottenham Hotspur."
      },
      {
        id: 4,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/everton.png'),
        options: ["Liverpool", "Everton", "Aston Villa", "Newcastle"],
        correctAnswer: 1,
        explanation: "Ce logo est celui d'Everton FC."
      },
      {
        id: 5,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/leicester.png'),
        options: ["Leicester City", "Southampton", "Crystal Palace", "Burnley"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de Leicester City."
      },
      {
        id: 6,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/aston_villa.png'),
        options: ["Aston Villa", "Wolverhampton", "Birmingham City", "West Bromwich"],
        correctAnswer: 0,
        explanation: "Ce logo est celui d'Aston Villa."
      },
      {
        id: 7,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/newcastle.png'),
        options: ["Newcastle United", "Sunderland", "Middlesbrough", "Leeds United"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de Newcastle United."
      },
      {
        id: 8,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/west_ham.png'),
        options: ["West Ham United", "Crystal Palace", "Fulham", "Watford"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de West Ham United."
      },
      {
        id: 9,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/leeds_united.png'),
        options: ["Leeds United", "Sheffield United", "Nottingham Forest", "Derby County"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de Leeds United."
      },
      {
        id: 10,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/wolverhampton.png'),
        options: ["Wolverhampton", "Norwich City", "Brighton", "Bournemouth"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de Wolverhampton Wanderers."
      }
    ],
    3: [ // Niveau 3 - Clubs espagnols
      {
        id: 1,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/atletico_madrid.png'),
        options: ["Real Madrid", "Atlético Madrid", "Sevilla", "Valencia"],
        correctAnswer: 1,
        explanation: "Ce logo est celui de l'Atlético Madrid."
      },
      {
        id: 2,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/valencia.png'),
        options: ["Valencia", "Villarreal", "Real Betis", "Real Sociedad"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de Valencia CF."
      },
      {
        id: 3,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/sevilla.png'),
        options: ["Sevilla", "Real Betis", "Málaga", "Celta Vigo"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Sevilla FC."
      },
      {
        id: 4,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/villarreal.png'),
        options: ["Villarreal", "Valencia", "Levante", "Elche"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Villarreal CF."
      },
      {
        id: 5,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/real_betis.png'),
        options: ["Real Betis", "Sevilla", "Granada", "Osasuna"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Real Betis."
      },
      {
        id: 6,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/athletic_bilbao.png'),
        options: ["Athletic Bilbao", "Real Sociedad", "Eibar", "Alavés"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'Athletic Bilbao."
      },
      {
        id: 7,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/real_sociedad.png'),
        options: ["Real Sociedad", "Osasuna", "Celta Vigo", "Rayo Vallecano"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de la Real Sociedad."
      },
      {
        id: 8,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/celta_vigo.png'),
        options: ["Celta Vigo", "Deportivo La Coruña", "Sporting Gijón", "Las Palmas"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Celta Vigo."
      },
      {
        id: 9,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/getafe.jpeg'),
        options: ["Getafe", "Leganés", "Almería", "Valladolid"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Getafe CF."
      },
      {
        id: 10,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/osasuna.png'),
        options: ["Osasuna", "Mallorca", "Espanyol", "Zaragoza"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du CA Osasuna."
      }
    ],
    4: [ // Niveau 4 - Clubs italiens
      {
        id: 1,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/inter_milan.png'),
        options: ["AC Milan", "Inter Milan", "Juventus", "Napoli"],
        correctAnswer: 1,
        explanation: "Ce logo est celui de l'Inter Milan."
      },
      {
        id: 2,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/as_roma.png'),
        options: ["AS Roma", "Lazio", "Fiorentina", "Napoli"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'AS Roma."
      },
      {
        id: 3,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/napoli.png'),
        options: ["Napoli", "Fiorentina", "Udinese", "Bologna"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du SSC Napoli."
      },
      {
        id: 4,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/lazio.png'),
        options: ["Lazio", "AS Roma", "Genoa", "Sampdoria"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de la Lazio."
      },
      {
        id: 5,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/fiorentina.png'),
        options: ["Fiorentina", "Atalanta", "Torino", "Bologna"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de la Fiorentina."
      },
      {
        id: 6,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/atalanta.png'),
        options: ["Atalanta", "Udinese", "Sassuolo", "Cagliari"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'Atalanta Bergame."
      },
      {
        id: 7,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/torino.png'),
        options: ["Torino", "Genoa", "Verona", "Empoli"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Torino FC."
      },
      {
        id: 8,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/sampdoria.png'),
        options: ["Sampdoria", "Genoa", "Bologna", "Parma"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de la Sampdoria."
      },
      {
        id: 9,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/bologna.png'),
        options: ["Bologna", "Cagliari", "Sassuolo", "Lecce"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Bologna FC."
      },
      {
        id: 10,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/udinese.png'),
        options: ["Udinese", "Verona", "Spezia", "Salernitana"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'Udinese Calcio."
      }
    ],
    5: [ // Niveau 5 - Clubs allemands
      {
        id: 1,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/schalke_04.png'),
        options: ["Schalke 04", "Borussia Dortmund", "Bayer Leverkusen", "Wolfsburg"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Schalke 04."
      },
      {
        id: 2,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/bayer_leverkusen.png'),
        options: ["Bayer Leverkusen", "Borussia Mönchengladbach", "Eintracht Frankfurt", "Hoffenheim"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Bayer Leverkusen."
      },
      {
        id: 3,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/rb_leipzig.png'),
        options: ["RB Leipzig", "Hertha Berlin", "Stuttgart", "Hannover"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du RB Leipzig."
      },
      {
        id: 4,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/borussia_monchengladbach.png'),
        options: ["Borussia Mönchengladbach", "Werder Bremen", "Hamburg", "Köln"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Borussia Mönchengladbach."
      },
      {
        id: 5,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/eintracht_frankfurt.png'),
        options: ["Eintracht Frankfurt", "Mainz", "Augsburg", "Freiburg"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'Eintracht Frankfurt."
      },
      {
        id: 6,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/werder_bremen.png'),
        options: ["Werder Bremen", "Hamburg", "Stuttgart", "Nürnberg"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Werder Bremen."
      },
      {
        id: 7,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/wolfsburg.png'),
        options: ["Wolfsburg", "Hannover", "Kaiserslautern", "Duisburg"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du VfL Wolfsburg."
      },
      {
        id: 8,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/hoffenheim.png'),
        options: ["Hoffenheim", "Freiburg", "Augsburg", "Mainz"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du TSG Hoffenheim."
      },
      {
        id: 9,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/freiburg.png'),
        options: ["Freiburg", "Stuttgart", "Nürnberg", "Darmstadt"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du SC Freiburg."
      },
      {
        id: 10,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/hertha_berlin.png'),
        options: ["Hertha Berlin", "Union Berlin", "Energie Cottbus", "Dynamo Dresden"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Hertha Berlin."
      }
    ],
    // Ajoutez ces données aux questionsData existantes dans QuizLogoScreen.js

    6: [ // Niveau 6 - Clubs français
      {
        id: 1,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/olympique_lyon.png'),
        options: ["Olympique Lyonnais", "Olympique de Marseille", "AS Monaco", "Lille OSC"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'Olympique Lyonnais."
      },
      {
        id: 2,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/olympique_marseille.png'),
        options: ["Olympique de Marseille", "Paris Saint-Germain", "AS Saint-Étienne", "FC Nantes"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'Olympique de Marseille."
      },
      {
        id: 3,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/as_monaco.png'),
        options: ["AS Monaco", "OGC Nice", "Stade Rennais", "FC Lorient"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'AS Monaco."
      },
      {
        id: 4,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/lille_osc.png'),
        options: ["Lille OSC", "RC Lens", "Stade de Reims", "Montpellier HSC"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Lille OSC."
      },
      {
        id: 5,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/as_saint_etienne.png'),
        options: ["AS Saint-Étienne", "FC Metz", "Toulouse FC", "Angers SCO"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'AS Saint-Étienne."
      },
      {
        id: 6,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/stade_rennais.png'),
        options: ["Stade Rennais", "FC Nantes", "Girondins de Bordeaux", "Strasbourg"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Stade Rennais FC."
      },
      {
        id: 7,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/fc_nantes.png'),
        options: ["FC Nantes", "Angers SCO", "Le Havre AC", "Amiens SC"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du FC Nantes."
      },
      {
        id: 8,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/montpellier_hsc.png'),
        options: ["Montpellier HSC", "Toulouse FC", "Clermont Foot", "Lorient"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Montpellier Hérault SC."
      },
      {
        id: 9,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/ogc_nice.jpeg'),
        options: ["OGC Nice", "RC Strasbourg", "Stade Brestois", "Troyes"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'OGC Nice."
      },
      {
        id: 10,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/rc_lens.png'),
        options: ["RC Lens", "Lille OSC", "Valenciennes", "Le Havre"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du RC Lens."
      }
    ],
    7: [ // Niveau 7 - Clubs sud-américains
      {
        id: 1,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/boca_juniors.png'),
        options: ["Boca Juniors", "River Plate", "San Lorenzo", "Independiente"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du CA Boca Juniors (Argentine)."
      },
      {
        id: 2,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/river_plate.png'),
        options: ["River Plate", "Boca Juniors", "Racing Club", "Vélez Sarsfield"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du CA River Plate (Argentine)."
      },
      {
        id: 3,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/flamengo.png'),
        options: ["Flamengo", "São Paulo", "Santos", "Palmeiras"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du CR Flamengo (Brésil)."
      },
      {
        id: 4,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/sao_paulo.png'),
        options: ["São Paulo FC", "Corinthians", "Internacional", "Grêmio"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du São Paulo FC (Brésil)."
      },
      {
        id: 5,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/penarol.png'),
        options: ["Peñarol", "Nacional", "Danubio", "Defensor Sporting"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du CA Peñarol (Uruguay)."
      },
      {
        id: 6,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/colocolo.png'),
        options: ["Colo-Colo", "Universidad de Chile", "Universidad Católica", "Cobreloa"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du CSD Colo-Colo (Chili)."
      },
      {
        id: 7,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/alianza_lima.png'),
        options: ["Alianza Lima", "Universitario", "Sporting Cristal", "Melgar"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Club Alianza Lima (Pérou)."
      },
      {
        id: 8,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/america_cali.png'),
        options: ["América de Cali", "Deportivo Cali", "Millonarios", "Santa Fe"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'América de Cali (Colombie)."
      },
      {
        id: 9,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/cerro_porteno.jpeg'),
        options: ["Cerro Porteño", "Olimpia", "Libertad", "Guaraní"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Cerro Porteño (Paraguay)."
      },
      {
        id: 10,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/independiente.png'),
        options: ["Independiente", "Racing Club", "San Lorenzo", "Estudiantes"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du CA Independiente (Argentine)."
      }
    ],
    8: [ // Niveau 8 - Clubs asiatiques
      {
        id: 1,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/al_hilal.png'),
        options: ["Al-Hilal", "Al-Nassr", "Al-Ahli", "Al-Ittihad"],
        correctAnswer: 0,
        explanation: "Ce logo est celui d'Al-Hilal FC (Arabie Saoudite)."
      },
      {
        id: 2,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/al_nassr.png'),
        options: ["Al-Nassr", "Al-Hilal", "Al-Shabab", "Al-Fateh"],
        correctAnswer: 0,
        explanation: "Ce logo est celui d'Al-Nassr FC (Arabie Saoudite)."
      },
      {
        id: 3,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/esteglal_tehran.png'),
        options: ["Esteghlal", "Persepolis", "Sepahan", "Tractor"],
        correctAnswer: 0,
        explanation: "Ce logo est celui d'Esteghlal FC (Iran)."
      },
      {
        id: 4,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/persepolis.png'),
        options: ["Persepolis", "Esteghlal", "Zob Ahan", "Foolad"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Persepolis FC (Iran)."
      },
      {
        id: 5,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/kawasaki_frontale.png'),
        options: ["Kawasaki Frontale", "Urawa Red Diamonds", "Yokohama F. Marinos", "Gamba Osaka"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Kawasaki Frontale (Japon)."
      },
      {
        id: 6,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/urawa_reds.png'),
        options: ["Urawa Red Diamonds", "FC Tokyo", "Nagoya Grampus", "Kashiwa Reysol"],
        correctAnswer: 0,
        explanation: "Ce logo est celui des Urawa Red Diamonds (Japon)."
      },
      {
        id: 7,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/jeonbuk_hyundai.png'),
        options: ["Jeonbuk Hyundai Motors", "FC Seoul", "Suwon Samsung", "Pohang Steelers"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Jeonbuk Hyundai Motors (Corée du Sud)."
      },
      {
        id: 8,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/guangzhou_evergrande.jpeg'),
        options: ["Guangzhou Evergrande", "Beijing Guoan", "Shanghai SIPG", "Shandong Luneng"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Guangzhou Evergrande (Chine)."
      },
      {
        id: 9,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/bangkok_united.jpeg'),
        options: ["Bangkok United", "Buriram United", "Muangkan United", "Chonburi FC"],
        correctAnswer: 1,
        explanation: "Ce logo est celui du Buriram United (Thaïlande)."
      },
      {
        id: 10,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/melbourne_city.png'),
        options: ["Melbourne City", "Sydney FC", "Melbourne Victory", "Western Sydney"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Melbourne City FC (Australie)."
      }
    ],
    9: [ // Niveau 9 - Clubs africains
      {
        id: 1,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/al_ahly.png'),
        options: ["Al Ahly", "Zamalek", "Ismaily", "Pyramids FC"],
        correctAnswer: 0,
        explanation: "Ce logo est celui d'Al Ahly SC (Égypte)."
      },
      {
        id: 2,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/zamalek.png'),
        options: ["Zamalek", "Al Ahly", "Al Masry", "ENPPI"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Zamalek SC (Égypte)."
      },
      {
        id: 3,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/esperance_tunis.png'),
        options: ["Espérance de Tunis", "Club Africain", "Étoile du Sahel", "CS Sfaxien"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'Espérance Sportive de Tunis (Tunisie)."
      },
      {
        id: 4,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/wydad_casablanca.png'),
        options: ["Wydad Casablanca", "Raja Casablanca", "FAR Rabat", "MAS Fès"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Wydad Athletic Club (Maroc)."
      },
      {
        id: 5,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/raja_casablanca.jpeg'),
        options: ["Raja Casablanca", "Wydad Casablanca", "ASFAR", "Ittihad Tanger"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Raja Club Athletic (Maroc)."
      },
      {
        id: 6,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/mamelodi_sundowns.png'),
        options: ["Mamelodi Sundowns", "Kaizer Chiefs", "Orlando Pirates", "Bidvest Wits"],
        correctAnswer: 0,
        explanation: "Ce logo est celui des Mamelodi Sundowns FC (Afrique du Sud)."
      },
      {
        id: 7,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/kaizer_chiefs.png'),
        options: ["Kaizer Chiefs", "Orlando Pirates", "SuperSport United", "Bloemfontein Celtic"],
        correctAnswer: 0,
        explanation: "Ce logo est celui des Kaizer Chiefs (Afrique du Sud)."
      },
      {
        id: 8,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/tp_mazembe.png'),
        options: ["TP Mazembe", "AS Vita Club", "DC Motema Pembe", "Saint-Éloi Lupopo"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du TP Mazembe (RD Congo)."
      },
      {
        id: 9,
        question: "À quel club appartient ce logo?",
        image: require('../../assets/images/logos/etoile_sahel.png'),
        options: ["Étoile du Sahel", "Espérance de Tunis", "Club Africain", "CA Bizertin"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'Étoile Sportive du Sahel (Tunisie)."
      },
      {
        id: 10,
        question: "Quel club a ce logo?",
        image: require('../../assets/images/logos/horoya_ac.png'),
        options: ["Horoya AC", "Hafia FC", "AS Kaloum", "CI Kamsar"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Horoya Athletic Club (Guinée)."
      }
    ],
    10: [ // Niveau 10 - Clubs historiques
      {
        id: 1,
        question: "À quel club historique appartient ce logo?",
        image: require('../../assets/images/logos/honved_budapest.png'),
        options: ["Honvéd Budapest", "Ferencváros", "MTK Budapest", "Újpest FC"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Budapest Honvéd, club hongrois historique."
      },
      {
        id: 2,
        question: "Quel club historique a ce logo?",
        image: require('../../assets/images/logos/red_star_belgrade.png'),
        options: ["Étoile Rouge de Belgrade", "Partizan Belgrade", "Dinamo Zagreb", "Hajduk Split"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'Étoile Rouge de Belgrade, club serbe historique."
      },
      {
        id: 3,
        question: "À quel club historique appartient ce logo?",
        image: require('../../assets/images/logos/steaua_bucarest.png'),
        options: ["Steaua Bucarest", "Dinamo Bucarest", "Rapid Bucarest", "Universitatea Craiova"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Steaua Bucarest, club roumain historique."
      },
      {
        id: 4,
        question: "Quel club historique a ce logo?",
        image: require('../../assets/images/logos/dynamo_kyiv.png'),
        options: ["Dynamo Kyiv", "Shakhtar Donetsk", "Dnipro", "Metalist Kharkiv"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Dynamo Kyiv, club ukrainien historique."
      },
      {
        id: 5,
        question: "À quel club historique appartient ce logo?",
        image: require('../../assets/images/logos/spartak_moscow.png'),
        options: ["Spartak Moscou", "CSKA Moscou", "Lokomotiv Moscou", "Dinamo Moscou"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Spartak Moscou, club russe historique."
      },
      {
        id: 6,
        question: "Quel club historique a ce logo?",
        image: require('../../assets/images/logos/benfica_historic.png'),
        options: ["Benfica Lisbonne", "Sporting CP", "Porto", "Belenenses"],
        correctAnswer: 0,
        explanation: "Ce logo historique est celui du SL Benfica, club portugais légendaire."
      },
      {
        id: 7,
        question: "À quel club historique appartient ce logo?",
        image: require('../../assets/images/logos/ajax_historic.png'),
        options: ["Ajax Amsterdam", "Feyenoord", "PSV Eindhoven", "FC Utrecht"],
        correctAnswer: 0,
        explanation: "Ce logo historique est celui de l'Ajax Amsterdam, célèbre pour son football total."
      },
      {
        id: 8,
        question: "Quel club historique a ce logo?",
        image: require('../../assets/images/logos/celtic_historic.png'),
        options: ["Celtic Glasgow", "Rangers", "Aberdeen", "Heart of Midlothian"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Celtic Glasgow, club écossais historique."
      },
      {
        id: 9,
        question: "À quel club historique appartient ce logo?",
        image: require('../../assets/images/logos/olympiakos_historic.png'),
        options: ["Olympiakos", "Panathinaïkos", "AEK Athènes", "PAOK Salonique"],
        correctAnswer: 0,
        explanation: "Ce logo est celui de l'Olympiakos, club grec historique."
      },
      {
        id: 10,
        question: "Quel club historique a ce logo?",
        image: require('../../assets/images/logos/galatasaray_historic.png'),
        options: ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor"],
        correctAnswer: 0,
        explanation: "Ce logo est celui du Galatasaray SK, club turc historique."
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
            source={currentQ.image || require('../../assets/images/logos/default_logo.jpeg')}
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
    color: '#ffa500',
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
    backgroundColor: '#ffa500',
  },
  questionContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  imageContainer: {
    height: 200,
    marginBottom: 20,
    position: 'relative',
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionImage: {
    width: 180,
    height: 180,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
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
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffa500',
    marginHorizontal: 20,
    marginTop: 10,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
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
    backgroundColor: '#ffa500',
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
    borderColor: '#ffa500',
    marginBottom: 20,
    flexDirection: 'row',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffa500',
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
    backgroundColor: '#ffa500',
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

export default QuizLogoScreen;