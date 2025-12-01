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

const QuizJoueurScreen = ({ route, navigation }) => {
  const { niveau, onQuizFinish } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Données des questions pour les joueurs - 10 questions par niveau
  const questionsData = {
    1: [ // Niveau 1 - Débutant (Joueurs célèbres)
      {
        id: 1,
        question: "Quel joueur est surnommé 'La Pulga'?",
        image: require('../../assets/images/joueurs/messi.jpeg'),
        options: ["Cristiano Ronaldo", "Lionel Messi", "Neymar", "Kylian Mbappé"],
        correctAnswer: 1,
        explanation: "Lionel Messi est surnommé 'La Pulga' (La Puce)."
      },
      {
        id: 2,
        question: "Quel joueur est surnommé 'CR7'?",
        image: require('../../assets/images/joueurs/ronaldo.jpeg'),
        options: ["Cristiano Ronaldo", "Karim Benzema", "Robert Lewandowski", "Mohamed Salah"],
        correctAnswer: 0,
        explanation: "Cristiano Ronaldo est surnommé 'CR7' (Cristiano Ronaldo 7)."
      },
      {
        id: 3,
        question: "Quel joueur français a remporté la Coupe du Monde 2018?",
        image: require('../../assets/images/joueurs/mbappe.jpeg'),
        options: ["Kylian Mbappé", "Antoine Griezmann", "Paul Pogba", "Tous ces joueurs"],
        correctAnswer: 3,
        explanation: "Tous ces joueurs français ont remporté la Coupe du Monde 2018."
      },
      {
        id: 4,
        question: "Quel joueur brésilien est surnommé 'Ney'?",
        image: require('../../assets/images/joueurs/neymar.jpeg'),
        options: ["Neymar Jr", "Ronaldinho", "Ronaldo", "Kaká"],
        correctAnswer: 0,
        explanation: "Neymar Jr est simplement surnommé 'Ney'."
      },
      {
        id: 5,
        question: "Quel joueur a remporté 8 Ballons d'Or?",
        image: require('../../assets/images/joueurs/messi_ballon_dor.jpeg'),
        options: ["Cristiano Ronaldo", "Lionel Messi", "Zinedine Zidane", "Michel Platini"],
        correctAnswer: 1,
        explanation: "Lionel Messi a remporté 8 Ballons d'Or (record)."
      },
      {
        id: 6,
        question: "Quel joueur est le meilleur buteur de l'histoire du football?",
        image: require('../../assets/images/joueurs/ronaldo_goals.jpeg'),
        options: ["Pele", "Cristiano Ronaldo", "Lionel Messi", "Romário"],
        correctAnswer: 1,
        explanation: "Cristiano Ronaldo est le meilleur buteur de l'histoire (plus de 850 buts)."
      },
      {
        id: 7,
        question: "Quel joueur est surnommé 'The Egyptian King'?",
        image: require('../../assets/images/joueurs/salah.jpeg'),
        options: ["Mohamed Salah", "Sadio Mané", "Riyad Mahrez", "Pierre-Emerick Aubameyang"],
        correctAnswer: 0,
        explanation: "Mohamed Salah est surnommé 'The Egyptian King'."
      },
      {
        id: 8,
        question: "Quel joueur a remporté la Coupe du Monde 2022 comme capitaine?",
        image: require('../../assets/images/joueurs/messi_captain.jpeg'),
        options: ["Kylian Mbappé", "Lionel Messi", "Luka Modrić", "Emiliano Martínez"],
        correctAnswer: 1,
        explanation: "Lionel Messi a remporté la Coupe du Monde 2022 comme capitaine de l'Argentine."
      },
      {
        id: 9,
        question: "Quel joueur est surnommé 'Lewa'?",
        image: require('../../assets/images/joueurs/lewandowski.jpeg'),
        options: ["Robert Lewandowski", "Erling Haaland", "Harry Kane", "Karim Benzema"],
        correctAnswer: 0,
        explanation: "Robert Lewandowski est surnommé 'Lewa'."
      },
      {
        id: 10,
        question: "Quel joueur a le plus de buts en Ligue des Champions?",
        image: require('../../assets/images/joueurs/ronaldo_champions.jpeg'),
        options: ["Lionel Messi", "Raúl", "Cristiano Ronaldo", "Karim Benzema"],
        correctAnswer: 2,
        explanation: "Cristiano Ronaldo a le plus de buts en Ligue des Champions (140 buts)."
      }
    ],
    2: [ // Niveau 2 - Amateur (Joueurs actuels)
      {
        id: 1,
        question: "Quel joueur norvégien joue à Manchester City?",
        image: require('../../assets/images/joueurs/haaland.jpeg'),
        options: ["Erling Haaland", "Martin Ødegaard", "Joshua King", "Sander Berge"],
        correctAnswer: 0,
        explanation: "Erling Haaland joue à Manchester City."
      },
      {
        id: 2,
        question: "Quel joueur français est surnommé 'Titi'?",
        image: require('../../assets/images/joueurs/griezmann.jpeg'),
        options: ["Kylian Mbappé", "Antoine Griezmann", "Olivier Giroud", "N'Golo Kanté"],
        correctAnswer: 1,
        explanation: "Antoine Griezmann est surnommé 'Titi' (comme le petit oiseau)."
      },
      {
        id: 3,
        question: "Quel joueur anglais est le capitaine de Tottenham?",
        image: require('../../assets/images/joueurs/kane.jpeg'),
        options: ["Harry Kane", "Raheem Sterling", "Phil Foden", "Jude Bellingham"],
        correctAnswer: 0,
        explanation: "Harry Kane est le capitaine de Tottenham."
      },
      {
        id: 4,
        question: "Quel joueur belge est surnommé 'The Red Devil'?",
        image: require('../../assets/images/joueurs/de_bruyne.jpeg'),
        options: ["Kevin De Bruyne", "Eden Hazard", "Romelu Lukaku", "Thibaut Courtois"],
        correctAnswer: 0,
        explanation: "Kevin De Bruyne est surnommé 'The Red Devil'."
      },
      {
        id: 5,
        question: "Quel joueur a remporté le Ballon d'Or 2022?",
        image: require('../../assets/images/joueurs/benzema_ballon.jpeg'),
        options: ["Karim Benzema", "Lionel Messi", "Robert Lewandowski", "Sadio Mané"],
        correctAnswer: 0,
        explanation: "Karim Benzema a remporté le Ballon d'Or 2022."
      },
      {
        id: 6,
        question: "Quel joueur croate a remporté le Ballon d'Or 2018?",
        image: require('../../assets/images/joueurs/modric.jpeg'),
        options: ["Luka Modrić", "Ivan Rakitić", "Mateo Kovačić", "Mario Mandžukić"],
        correctAnswer: 0,
        explanation: "Luka Modrić a remporté le Ballon d'Or 2018."
      },
      {
        id: 7,
        question: "Quel joueur a le plus de passes décisives en Premier League?",
        image: require('../../assets/images/joueurs/de_bruyne_assists.jpeg'),
        options: ["Ryan Giggs", "Cesc Fàbregas", "Kevin De Bruyne", "Frank Lampard"],
        correctAnswer: 2,
        explanation: "Kevin De Bruyne a le record de passes décisives en Premier League."
      },
      {
        id: 8,
        question: "Quel joueur est surnommé 'The Spider'?",
        image: require('../../assets/images/joueurs/courtois.jpeg'),
        options: ["Thibaut Courtois", "Jan Oblak", "Manuel Neuer", "Alisson Becker"],
        correctAnswer: 0,
        explanation: "Thibaut Courtois est surnommé 'The Spider' pour son envergure."
      },
      {
        id: 9,
        question: "Quel joueur a remporté 5 Ligues des Champions?",
        image: require('../../assets/images/joueurs/marcelo.jpeg'),
        options: ["Cristiano Ronaldo", "Sergio Ramos", "Marcelo", "Karim Benzema"],
        correctAnswer: 2,
        explanation: "Marcelo a remporté 5 Ligues des Champions avec le Real Madrid."
      },
      {
        id: 10,
        question: "Quel joueur a le plus de sélections en équipe nationale?",
        image: require('../../assets/images/joueurs/ramos.jpeg'),
        options: ["Sergio Ramos", "Cristiano Ronaldo", "Lionel Messi", "Gianluigi Buffon"],
        correctAnswer: 0,
        explanation: "Sergio Ramos a plus de 180 sélections avec l'Espagne."
      }
    ],
    3: [ // Niveau 3 - Intermédiaire (Légendes européennes)
      {
        id: 1,
        question: "Quel joueur est surnommé 'Il Fenomeno'?",
        image: require('../../assets/images/joueurs/ronaldo_brazil.jpeg'),
        options: ["Ronaldo Nazário", "Ronaldinho", "Rivaldo", "Romário"],
        correctAnswer: 0,
        explanation: "Ronaldo Nazário est surnommé 'Il Fenomeno' (Le Phénomène)."
      },
      {
        id: 2,
        question: "Quel joueur français a marqué un coup du chapeau en finale de Coupe du Monde?",
        image: require('../../assets/images/joueurs/fontaine.jpeg'),
        options: ["Just Fontaine", "Zinedine Zidane", "Michel Platini", "Thierry Henry"],
        correctAnswer: 0,
        explanation: "Just Fontaine a marqué 13 buts en 1958 (record)."
      },
      {
        id: 3,
        question: "Quel joueur a remporté 3 Coupes du Monde?",
        image: require('../../assets/images/joueurs/pele.jpeg'),
        options: ["Pelé", "Diego Maradona", "Zinedine Zidane", "Franz Beckenbauer"],
        correctAnswer: 0,
        explanation: "Pelé a remporté 3 Coupes du Monde (1958, 1962, 1970)."
      },
      {
        id: 4,
        question: "Quel joueur est surnommé 'Der Kaiser'?",
        image: require('../../assets/images/joueurs/beckenbauer.jpeg'),
        options: ["Franz Beckenbauer", "Gerd Müller", "Lothar Matthäus", "Karl-Heinz Rummenigge"],
        correctAnswer: 0,
        explanation: "Franz Beckenbauer est surnommé 'Der Kaiser' (L'Empereur)."
      },
      {
        id: 5,
        question: "Quel joueur a marqué le 'But du Siècle' en 1986?",
        image: require('../../assets/images/joueurs/maradona.jpeg'),
        options: ["Diego Maradona", "Pelé", "Johan Cruyff", "Michel Platini"],
        correctAnswer: 0,
        explanation: "Diego Maradona a marqué le 'But du Siècle' contre l'Angleterre en 1986."
      },
      {
        id: 6,
        question: "Quel joueur hollandais est connu pour son 'retourné'?",
        image: require('../../assets/images/joueurs/van_basten.jpeg'),
        options: ["Marco van Basten", "Johan Cruyff", "Dennis Bergkamp", "Ruud Gullit"],
        correctAnswer: 0,
        explanation: "Marco van Basten a marqué un retourné légendaire en finale d'Euro 1988."
      },
      {
        id: 7,
        question: "Quel joueur italien est surnommé 'Il Divin Codino'?",
        image: require('../../assets/images/joueurs/baggio.jpeg'),
        options: ["Roberto Baggio", "Paolo Maldini", "Franco Baresi", "Alessandro Del Piero"],
        correctAnswer: 0,
        explanation: "Roberto Baggio est surnommé 'Il Divin Codino' (La Divine Queue de Cheval)."
      },
      {
        id: 8,
        question: "Quel joueur a remporté 7 Ballons d'Or?",
        image: require('../../assets/images/joueurs/platini.jpeg'),
        options: ["Michel Platini", "Johan Cruyff", "Marco van Basten", "Lionel Messi"],
        correctAnswer: 3,
        explanation: "Lionel Messi a remporté 7 Ballons d'Or."
      },
      {
        id: 9,
        question: "Quel joueur anglais a remporté la Coupe du Monde 1966?",
        image: require('../../assets/images/joueurs/charlton.jpeg'),
        options: ["Bobby Charlton", "Geoff Hurst", "Gordon Banks", "Bobby Moore"],
        correctAnswer: 0,
        explanation: "Bobby Charlton a remporté la Coupe du Monde 1966 avec l'Angleterre."
      },
      {
        id: 10,
        question: "Quel joueur est surnommé 'The Black Pearl'?",
        image: require('../../assets/images/joueurs/eusebio.jpeg'),
        options: ["Eusébio", "Pelé", "George Weah", "Roger Milla"],
        correctAnswer: 0,
        explanation: "Eusébio est surnommé 'The Black Pearl'."
      }
    ],
    4: [ // Niveau 4 - Avancé (Gardiens de but)
      {
        id: 1,
        question: "Quel gardien est surnommé 'El Gato'?",
        image: require('../../assets/images/joueurs/casillas.jpeg'),
        options: ["Iker Casillas", "Gianluigi Buffon", "Manuel Neuer", "Petr Čech"],
        correctAnswer: 0,
        explanation: "Iker Casillas est surnommé 'El Gato' (Le Chat)."
      },
      {
        id: 2,
        question: "Quel gardien a le plus de clean sheets en Premier League?",
        image: require('../../assets/images/joueurs/cech.jpeg'),
        options: ["Petr Čech", "David de Gea", "Edwin van der Sar", "Joe Hart"],
        correctAnswer: 0,
        explanation: "Petr Čech a 202 clean sheets en Premier League (record)."
      },
      {
        id: 3,
        question: "Quel gardien a remporté le Ballon d'Or?",
        image: require('../../assets/images/joueurs/yashin.jpeg'),
        options: ["Lev Yashin", "Gianluigi Buffon", "Manuel Neuer", "Iker Casillas"],
        correctAnswer: 0,
        explanation: "Lev Yashin est le seul gardien à avoir remporté le Ballon d'Or (1963)."
      },
      {
        id: 4,
        question: "Quel gardien est surnommé 'Superman'?",
        image: require('../../assets/images/joueurs/neuer.jpeg'),
        options: ["Manuel Neuer", "Alisson Becker", "Jan Oblak", "Thibaut Courtois"],
        correctAnswer: 0,
        explanation: "Manuel Neuer est surnommé 'Superman' pour ses arrêts spectaculaires."
      },
      {
        id: 5,
        question: "Quel gardien italien a joué plus de 1,000 matches?",
        image: require('../../assets/images/joueurs/buffon.jpeg'),
        options: ["Gianluigi Buffon", "Walter Zenga", "Dino Zoff", "Francesco Toldo"],
        correctAnswer: 0,
        explanation: "Gianluigi Buffon a joué plus de 1,000 matches professionnels."
      },
      {
        id: 6,
        question: "Quel gardien a marqué un but en Coupe du Monde?",
        image: require('../../assets/images/joueurs/campos.jpeg'),
        options: ["Jorge Campos", "René Higuita", "José Luis Chilavert", "Rogerio Ceni"],
        correctAnswer: 1,
        explanation: "René Higuita a marqué pour la Colombie (but le plus célèbre d'un gardien)."
      },
      {
        id: 7,
        question: "Quel gardien a le plus de sélections en équipe d'Italie?",
        image: require('../../assets/images/joueurs/buffon_caps.jpeg'),
        options: ["Gianluigi Buffon", "Paolo Maldini", "Fabio Cannavaro", "Dino Zoff"],
        correctAnswer: 0,
        explanation: "Gianluigi Buffon a 176 sélections avec l'Italie (record)."
      },
      {
        id: 8,
        question: "Quel gardien brésilien a marqué plus de 100 buts?",
        image: require('../../assets/images/joueurs/ceni.jpeg'),
        options: ["Rogerio Ceni", "Júlio César", "Alisson", "Ederson"],
        correctAnswer: 0,
        explanation: "Rogerio Ceni a marqué 131 buts (record pour un gardien)."
      },
      {
        id: 9,
        question: "Quel gardien est surnommé 'The Wall'?",
        image: require('../../assets/images/joueurs/kahn.jpeg'),
        options: ["Oliver Kahn", "Edwin van der Sar", "Peter Schmeichel", "David Seaman"],
        correctAnswer: 0,
        explanation: "Oliver Kahn est surnommé 'The Wall' (Le Mur)."
      },
      {
        id: 10,
        question: "Quel gardien a remporté la Copa América 2021?",
        image: require('../../assets/images/joueurs/martinez.jpeg'),
        options: ["Emiliano Martínez", "Alisson Becker", "Claudio Bravo", "David Ospina"],
        correctAnswer: 0,
        explanation: "Emiliano Martínez a remporté la Copa América 2021 avec l'Argentine."
      }
    ],
    5: [ // Niveau 5 - Expert (Jeunes talents)
      {
        id: 1,
        question: "Quel jeune joueur a remporté le Trophée Kopa 2023?",
        image: require('../../assets/images/joueurs/bellingham.jpeg'),
        options: ["Jude Bellingham", "Pedri", "Gavi", "Jamal Musiala"],
        correctAnswer: 0,
        explanation: "Jude Bellingham a remporté le Trophée Kopa 2023."
      },
      {
        id: 2,
        question: "Quel joueur a remporté le Golden Boy 2022?",
        image: require('../../assets/images/joueurs/gavi.jpeg'),
        options: ["Gavi", "Jude Bellingham", "Eduardo Camavinga", "Ansu Fati"],
        correctAnswer: 0,
        explanation: "Gavi a remporté le Golden Boy 2022."
      },
      {
        id: 3,
        question: "Quel joueur est surnommé 'The Diamond'?",
        image: require('../../assets/images/joueurs/musiala.jpeg'),
        options: ["Jamal Musiala", "Florian Wirtz", "Youssoufa Moukoko", "Karim Adeyemi"],
        correctAnswer: 0,
        explanation: "Jamal Musiala est surnommé 'The Diamond' (Le Diamant)."
      },
      {
        id: 4,
        question: "Quel joueur a fait ses débuts à 16 ans au Barça?",
        image: require('../../assets/images/joueurs/yamal.jpeg'),
        options: ["Lamine Yamal", "Ansu Fati", "Gavi", "Pedri"],
        correctAnswer: 0,
        explanation: "Lamine Yamal a fait ses débuts à 16 ans avec le FC Barcelone."
      },
      {
        id: 5,
        question: "Quel joueur français est surnommé 'The Prince'?",
        image: require('../../assets/images/joueurs/camavinga.jpeg'),
        options: ["Eduardo Camavinga", "Aurélien Tchouaméni", "William Saliba", "Khéphren Thuram"],
        correctAnswer: 0,
        explanation: "Eduardo Camavinga est surnommé 'The Prince' (Le Prince)."
      },
      {
        id: 6,
        question: "Quel joueur a remporté la Coupe du Monde U-20 2023?",
        image: require('../../assets/images/joueurs/alvarez.jpeg'),
        options: ["Cesare Casadei", "Alan Varela", "Matías Soulé", "Luka Romero"],
        correctAnswer: 0,
        explanation: "Cesare Casadei a remporté la Coupe du Monde U-20 2023 avec l'Italie."
      },
      {
        id: 7,
        question: "Quel joueur est le plus jeune buteur de la Bundesliga?",
        image: require('../../assets/images/joueurs/moukoko.jpeg'),
        options: ["Youssoufa Moukoko", "Jamal Musiala", "Florian Wirtz", "Karim Adeyemi"],
        correctAnswer: 0,
        explanation: "Youssoufa Moukoko est le plus jeune buteur de la Bundesliga (16 ans)."
      },
      {
        id: 8,
        question: "Quel joueur a remporté l'Euro U-21 2023?",
        image: require('../../assets/images/joueurs/ruiz.jpeg'),
        options: ["Abel Ruiz", "Bryan Gil", "Nico Williams", "Pedri"],
        correctAnswer: 0,
        explanation: "Abel Ruiz a remporté l'Euro U-21 2023 avec l'Espagne."
      },
      {
        id: 9,
        question: "Quel joueur est surnommé 'The Norwegian Haaland'?",
        image: require('../../assets/images/joueurs/odegaard.jpeg'),
        options: ["Martin Ødegaard", "Erling Haaland", "Joshua King", "Sander Berge"],
        correctAnswer: 0,
        explanation: "Martin Ødegaard est surnommé 'The Norwegian Haaland' (bien qu'il soit plus vieux)."
      },
      {
        id: 10,
        question: "Quel joueur a remporté le Championnat d'Europe U-19 2023?",
        image: require('../../assets/images/joueurs/simic.jpeg'),
        options: ["Luka Sučić", "Josip Šutalo", "Martin Baturina", "Roko Šimić"],
        correctAnswer: 3,
        explanation: "Roko Šimić a remporté l'Euro U-19 2023 avec la Croatie."
      }
    ],

    6: [ // Niveau 6 - Légendes (Attaquants légendaires)
      {
        id: 1,
        question: "Quel attaquant est surnommé 'Le Roi'?",
        image: require('../../assets/images/joueurs/henry.jpeg'),
        options: ["Thierry Henry", "Eric Cantona", "Didier Drogba", "Samuel Eto'o"],
        correctAnswer: 0,
        explanation: "Thierry Henry est surnommé 'Le Roi' (The King)."
      },
      {
        id: 2,
        question: "Quel attaquant brésilien est surnommé 'O Fenômeno'?",
        image: require('../../assets/images/joueurs/ronaldo_phenomeno.jpeg'),
        options: ["Ronaldo Nazário", "Ronaldinho", "Romário", "Bebeto"],
        correctAnswer: 0,
        explanation: "Ronaldo Nazário est surnommé 'O Fenômeno' (Le Phénomène)."
      },
      {
        id: 3,
        question: "Quel attaquant italien est surnommé 'Il Bomber'?",
        image: require('../../assets/images/joueurs/totti.jpeg'),
        options: ["Francesco Totti", "Alessandro Del Piero", "Filippo Inzaghi", "Christian Vieri"],
        correctAnswer: 2,
        explanation: "Filippo Inzaghi est surnommé 'Il Bomber' pour ses qualités de buteur."
      },
      {
        id: 4,
        question: "Quel attaquant allemand est surnommé 'Der Bomber'?",
        image: require('../../assets/images/joueurs/muller.jpeg'),
        options: ["Gerd Müller", "Miroslav Klose", "Jürgen Klinsmann", "Karl-Heinz Rummenigge"],
        correctAnswer: 0,
        explanation: "Gerd Müller est surnommé 'Der Bomber' pour son incroyable capacité à marquer."
      },
      {
        id: 5,
        question: "Quel attaquant portugais est surnommé 'The Black Panther'?",
        image: require('../../assets/images/joueurs/eusebio_black.jpeg'),
        options: ["Eusébio", "Luís Figo", "Cristiano Ronaldo", "Rui Costa"],
        correctAnswer: 0,
        explanation: "Eusébio est surnommé 'The Black Panther' (La Panthère Noire)."
      },
      {
        id: 6,
        question: "Quel attaquant est le meilleur buteur de l'histoire de la Premier League?",
        image: require('../../assets/images/joueurs/shearer.jpeg'),
        options: ["Alan Shearer", "Wayne Rooney", "Andy Cole", "Thierry Henry"],
        correctAnswer: 0,
        explanation: "Alan Shearer a marqué 260 buts en Premier League (record)."
      },
      {
        id: 7,
        question: "Quel attaquant hollandais est surnommé 'The Flying Dutchman'?",
        image: require('../../assets/images/joueurs/van_persie.jpeg'),
        options: ["Marco van Basten", "Dennis Bergkamp", "Robin van Persie", "Ruud van Nistelrooy"],
        correctAnswer: 1,
        explanation: "Dennis Bergkamp est surnommé 'The Flying Dutchman' (Le Hollandais Volant)."
      },
      {
        id: 8,
        question: "Quel attaquant est le meilleur buteur de l'histoire du Real Madrid?",
        image: require('../../assets/images/joueurs/di_stefano.jpeg'),
        options: ["Alfredo Di Stéfano", "Cristiano Ronaldo", "Raúl", "Karim Benzema"],
        correctAnswer: 1,
        explanation: "Cristiano Ronaldo est le meilleur buteur du Real Madrid avec 450 buts."
      },
      {
        id: 9,
        question: "Quel attaquant argentin est surnommé 'El Apache'?",
        image: require('../../assets/images/joueurs/tevez.jpeg'),
        options: ["Carlos Tevez", "Gabriel Batistuta", "Diego Maradona", "Sergio Agüero"],
        correctAnswer: 0,
        explanation: "Carlos Tevez est surnommé 'El Apache'."
      },
      {
        id: 10,
        question: "Quel attaquant a remporté 6 fois le titre de meilleur buteur de Ligue 1?",
        image: require('../../assets/images/joueurs/paulo_dias.jpeg'),
        options: ["Jean-Pierre Papin", "Carlos Bianchi", "Delio Onnis", "José Touré"],
        correctAnswer: 2,
        explanation: "Delio Onnis a remporté 6 fois le titre de meilleur buteur de Ligue 1."
      }
    ],
    7: [ // Niveau 7 - Milieux de terrain
      {
        id: 1,
        question: "Quel milieu est surnommé 'The Maestro'?",
        image: require('../../assets/images/joueurs/pirlo.jpeg'),
        options: ["Andrea Pirlo", "Xavi Hernández", "Andrés Iniesta", "Luka Modrić"],
        correctAnswer: 0,
        explanation: "Andrea Pirlo est surnommé 'The Maestro' (Le Maître)."
      },
      {
        id: 2,
        question: "Quel milieu français est surnommé 'Le Président'?",
        image: require('../../assets/images/joueurs/vieira.jpeg'),
        options: ["Patrick Vieira", "Zinedine Zidane", "Michel Platini", "Didier Deschamps"],
        correctAnswer: 0,
        explanation: "Patrick Vieira est surnommé 'Le Président' pour son leadership."
      },
      {
        id: 3,
        question: "Quel milieu anglais est surnommé 'Stevie G'?",
        image: require('../../assets/images/joueurs/gerrard.jpeg'),
        options: ["Steven Gerrard", "Frank Lampard", "Paul Scholes", "David Beckham"],
        correctAnswer: 0,
        explanation: "Steven Gerrard est surnommé 'Stevie G'."
      },
      {
        id: 4,
        question: "Quel milieu brésilien est surnommé 'The Little Canary'?",
        image: require('../../assets/images/joueurs/ronaldinho.jpeg'),
        options: ["Ronaldinho", "Kaká", "Rivaldo", "Juninho"],
        correctAnswer: 0,
        explanation: "Ronaldinho est surnommé 'The Little Canary' (Le Petit Canari)."
      },
      {
        id: 5,
        question: "Quel milieu espagnol a remporté la Coupe du Monde 2010?",
        image: require('../../assets/images/joueurs/xavi_iniesta.jpeg'),
        options: ["Xavi et Iniesta", "Busquets et Xabi Alonso", "Cesc Fàbregas", "David Silva"],
        correctAnswer: 0,
        explanation: "Xavi et Iniesta ont remporté la Coupe du Monde 2010 avec l'Espagne."
      },
      {
        id: 6,
        question: "Quel milieu est le meilleur passeur de l'histoire de la Premier League?",
        image: require('../../assets/images/joueurs/giggs.jpeg'),
        options: ["Ryan Giggs", "Cesc Fàbregas", "Frank Lampard", "Steven Gerrard"],
        correctAnswer: 0,
        explanation: "Ryan Giggs a 162 passes décisives en Premier League (record)."
      },
      {
        id: 7,
        question: "Quel milieu est surnommé 'Il Genio'?",
        image: require('../../assets/images/joueurs/baggio_genius.jpeg'),
        options: ["Roberto Baggio", "Francesco Totti", "Alessandro Del Piero", "Gianfranco Zola"],
        correctAnswer: 0,
        explanation: "Roberto Baggio est surnommé 'Il Genio' (Le Génie)."
      },
      {
        id: 8,
        question: "Quel milieu français a remporté le Ballon d'Or 1998?",
        image: require('../../assets/images/joueurs/zidane_ballon.jpeg'),
        options: ["Zinedine Zidane", "Michel Platini", "Raymond Kopa", "Just Fontaine"],
        correctAnswer: 0,
        explanation: "Zinedine Zidane a remporté le Ballon d'Or 1998."
      },
      {
        id: 9,
        question: "Quel milieu tchèque est surnommé 'The Little Mozart'?",
        image: require('../../assets/images/joueurs/rosicky.jpeg'),
        options: ["Tomáš Rosický", "Pavel Nedvěd", "Jan Koller", "Milan Baroš"],
        correctAnswer: 0,
        explanation: "Tomáš Rosický est surnommé 'The Little Mozart' (Le Petit Mozart)."
      },
      {
        id: 10,
        question: "Quel milieu a remporté 4 Ligues des Champions consécutives?",
        image: require('../../assets/images/joueurs/kroos_modric.jpeg'),
        options: ["Luka Modrić", "Toni Kroos", "Casemiro", "Les trois"],
        correctAnswer: 3,
        explanation: "Modrić, Kroos et Casemiro ont remporté 4 Ligues des Champions consécutives avec le Real Madrid."
      }
    ],
    8: [ // Niveau 8 - Défenseurs
      {
        id: 1,
        question: "Quel défenseur est surnommé 'Il Capitano'?",
        image: require('../../assets/images/joueurs/maldini.jpeg'),
        options: ["Paolo Maldini", "Franco Baresi", "Alessandro Nesta", "Fabio Cannavaro"],
        correctAnswer: 0,
        explanation: "Paolo Maldini est surnommé 'Il Capitano' (Le Capitaine)."
      },
      {
        id: 2,
        question: "Quel défenseur italien a remporté le Ballon d'Or 2006?",
        image: require('../../assets/images/joueurs/cannavaro_ballon.jpeg'),
        options: ["Fabio Cannavaro", "Paolo Maldini", "Gianluigi Buffon", "Alessandro Del Piero"],
        correctAnswer: 0,
        explanation: "Fabio Cannavaro a remporté le Ballon d'Or 2006."
      },
      {
        id: 3,
        question: "Quel défenseur est surnommé 'The Rock'?",
        image: require('../../assets/images/joueurs/ferdinand.jpeg'),
        options: ["Rio Ferdinand", "John Terry", "Nemanja Vidić", "Sergio Ramos"],
        correctAnswer: 2,
        explanation: "Nemanja Vidić est surnommé 'The Rock' (Le Rocher)."
      },
      {
        id: 4,
        question: "Quel défenseur brésilien est surnommé 'O Monstro'?",
        image: require('../../assets/images/joueurs/lucio.jpeg'),
        options: ["Lúcio", "Thiago Silva", "David Luiz", "Marcelo"],
        correctAnswer: 0,
        explanation: "Lúcio est surnommé 'O Monstro' (Le Monstre)."
      },
      {
        id: 5,
        question: "Quel défenseur français est surnommé 'La Roche'?",
        image: require('../../assets/images/joueurs/desailly.jpeg'),
        options: ["Marcel Desailly", "Laurent Blanc", "Lilian Thuram", "Bixente Lizarazu"],
        correctAnswer: 0,
        explanation: "Marcel Desailly est surnommé 'La Roche' (Le Rocher)."
      },
      {
        id: 6,
        question: "Quel défenseur a marqué le plus de buts en Premier League?",
        image: require('../../assets/images/joueurs/terry.jpeg'),
        options: ["John Terry", "Gary Neville", "Jamie Carragher", "Rio Ferdinand"],
        correctAnswer: 0,
        explanation: "John Terry a marqué 41 buts en Premier League (record pour un défenseur)."
      },
      {
        id: 7,
        question: "Quel défenseur espagnol est surnommé 'El Muro'?",
        image: require('../../assets/images/joueurs/ramos_wall.jpeg'),
        options: ["Sergio Ramos", "Carles Puyol", "Gerard Piqué", "Fernando Hierro"],
        correctAnswer: 1,
        explanation: "Carles Puyol est surnommé 'El Muro' (Le Mur)."
      },
      {
        id: 8,
        question: "Quel défenseur hollandais est surnommé 'The Terminator'?",
        image: require('../../assets/images/joueurs/stam.jpeg'),
        options: ["Jaap Stam", "Frank de Boer", "Ruud Krol", "Danny Blind"],
        correctAnswer: 0,
        explanation: "Jaap Stam est surnommé 'The Terminator'."
      },
      {
        id: 9,
        question: "Quel défenseur allemand est surnommé 'Der Libero'?",
        image: require('../../assets/images/joueurs/beckenbauer_libero.jpeg'),
        options: ["Franz Beckenbauer", "Matthias Sammer", "Jürgen Kohler", "Karl-Heinz Förster"],
        correctAnswer: 0,
        explanation: "Franz Beckenbauer est surnommé 'Der Libero' pour son rôle de libéro."
      },
      {
        id: 10,
        question: "Quel défenseur a remporté 5 Ligues des Champions?",
        image: require('../../assets/images/joueurs/marcelo_defender.jpeg'),
        options: ["Paolo Maldini", "Sergio Ramos", "Cafu", "Les trois"],
        correctAnswer: 3,
        explanation: "Maldini, Ramos et Cafu ont tous remporté 5 Ligues des Champions."
      }
    ],
    9: [ // Niveau 9 - Champions (Joueurs africains)
      {
        id: 1,
        question: "Quel joueur africain a remporté le Ballon d'Or 1995?",
        image: require('../../assets/images/joueurs/weah_ballon.jpeg'),
        options: ["George Weah", "Samuel Eto'o", "Didier Drogba", "Yaya Touré"],
        correctAnswer: 0,
        explanation: "George Weah a remporté le Ballon d'Or 1995 (premier et seul Africain)."
      },
      {
        id: 2,
        question: "Quel joueur ivoirien est surnommé 'The Drog'?",
        image: require('../../assets/images/joueurs/drogba.jpeg'),
        options: ["Didier Drogba", "Yaya Touré", "Salomon Kalou", "Gervinho"],
        correctAnswer: 0,
        explanation: "Didier Drogba est surnommé 'The Drog'."
      },
      {
        id: 3,
        question: "Quel joueur camerounais est surnommé 'Le Lion Indomptable'?",
        image: require('../../assets/images/joueurs/etoo_lion.jpeg'),
        options: ["Samuel Eto'o", "Roger Milla", "Patrick Mboma", "Rigobert Song"],
        correctAnswer: 0,
        explanation: "Samuel Eto'o est surnommé 'Le Lion Indomptable'."
      },
      {
        id: 4,
        question: "Quel joueur ghanéen est surnommé 'The Baby Jet'?",
        image: require('../../assets/images/joueurs/essien.jpeg'),
        options: ["Michael Essien", "Asamoah Gyan", "Sulley Muntari", "Kevin-Prince Boateng"],
        correctAnswer: 1,
        explanation: "Asamoah Gyan est surnommé 'The Baby Jet'."
      },
      {
        id: 5,
        question: "Quel joueur sénégalais est surnommé 'The Lion of Teranga'?",
        image: require('../../assets/images/joueurs/mane_lion.jpeg'),
        options: ["Sadio Mané", "El Hadji Diouf", "Papiss Cissé", "Kalidou Koulibaly"],
        correctAnswer: 0,
        explanation: "Sadio Mané est surnommé 'The Lion of Teranga'."
      },
      {
        id: 6,
        question: "Quel joueur égyptien est surnommé 'The Pharaoh'?",
        image: require('../../assets/images/joueurs/salah_pharaoh.jpeg'),
        options: ["Mohamed Salah", "Mohamed Aboutrika", "Ahmed Hassan", "Mido"],
        correctAnswer: 0,
        explanation: "Mohamed Salah est surnommé 'The Pharaoh' (Le Pharaon)."
      },
      {
        id: 7,
        question: "Quel joueur nigérian a remporté la médaille d'or olympique 1996?",
        image: require('../../assets/images/joueurs/kanu_olympics.jpeg'),
        options: ["Nwankwo Kanu", "Jay-Jay Okocha", "Daniel Amokachi", "Sunday Oliseh"],
        correctAnswer: 0,
        explanation: "Nwankwo Kanu a remporté la médaille d'or aux JO 1996 avec le Nigeria."
      },
      {
        id: 8,
        question: "Quel joueur algérien est surnommé 'The Wizard of Algiers'?",
        image: require('../../assets/images/joueurs/mahrez_wizard.jpeg'),
        options: ["Riyad Mahrez", "Islam Slimani", "Sofiane Feghouli", "Abdelmoumene Djabou"],
        correctAnswer: 0,
        explanation: "Riyad Mahrez est surnommé 'The Wizard of Algiers' (Le Magicien d'Alger)."
      },
      {
        id: 9,
        question: "Quel joueur marocain est surnommé 'The Moroccan Magician'?",
        image: require('../../assets/images/joueurs/hakimi_magician.jpeg'),
        options: ["Achraf Hakimi", "Hakim Ziyech", "Youssef En-Nesyri", "Noussair Mazraoui"],
        correctAnswer: 1,
        explanation: "Hakim Ziyech est surnommé 'The Moroccan Magician' (Le Magicien Marocain)."
      },
      {
        id: 10,
        question: "Quel joueur sud-africain est surnommé 'Benni'?",
        image: require('../../assets/images/joueurs/mccarthy_benni.jpeg'),
        options: ["Benni McCarthy", "Steven Pienaar", "Lucas Radebe", "Quinton Fortune"],
        correctAnswer: 0,
        explanation: "Benni McCarthy est le meilleur buteur sud-africain de l'histoire."
      }
    ],
    10: [ // Niveau 10 - Maître (Joueurs asiatiques et records)
      {
        id: 1,
        question: "Quel joueur japonais est surnommé 'The Samurai'?",
        image: require('../../assets/images/joueurs/kagawa_samurai.jpeg'),
        options: ["Shinji Kagawa", "Keisuke Honda", "Hidetoshi Nakata", "Yuto Nagatomo"],
        correctAnswer: 2,
        explanation: "Hidetoshi Nakata est surnommé 'The Samurai'."
      },
      {
        id: 2,
        question: "Quel joueur sud-coréen est surnommé 'Sonny'?",
        image: require('../../assets/images/joueurs/son_heung_min.jpeg'),
        options: ["Son Heung-min", "Park Ji-sung", "Lee Young-pyo", "Kim Min-jae"],
        correctAnswer: 0,
        explanation: "Son Heung-min est surnommé 'Sonny'."
      },
      {
        id: 3,
        question: "Quel joueur australien est surnommé 'The Wizard of Oz'?",
        image: require('../../assets/images/joueurs/cahill_wizard.jpeg'),
        options: ["Tim Cahill", "Mark Viduka", "Harry Kewell", "Mark Schwarzer"],
        correctAnswer: 2,
        explanation: "Harry Kewell est surnommé 'The Wizard of Oz'."
      },
      {
        id: 4,
        question: "Quel joueur chinois a joué en Premier League?",
        image: require('../../assets/images/joueurs/sun_jihai.jpeg'),
        options: ["Sun Jihai", "Li Tie", "Fan Zhiyi", "Tous ces joueurs"],
        correctAnswer: 3,
        explanation: "Sun Jihai, Li Tie et Fan Zhiyi ont tous joué en Premier League."
      },
      {
        id: 5,
        question: "Quel joueur iranien est surnommé 'The Iranian Messi'?",
        image: require('../../assets/images/joueurs/azmoun_messi.jpeg'),
        options: ["Sardar Azmoun", "Ali Daei", "Mehdi Taremi", "Karim Ansarifard"],
        correctAnswer: 0,
        explanation: "Sardar Azmoun est surnommé 'The Iranian Messi'."
      },
      {
        id: 6,
        question: "Quel joueur saoudien est surnommé 'The Desert Maradona'?",
        image: require('../../assets/images/joueurs/al_jaber_maradona.jpeg'),
        options: ["Sammy Al-Jaber", "Yasser Al-Qahtani", "Mohamed Al-Deayea", "Nawaf Al-Temyat"],
        correctAnswer: 0,
        explanation: "Sammy Al-Jaber est surnommé 'The Desert Maradona'."
      },
      {
        id: 7,
        question: "Quel joueur ouzbek est surnommé 'The Asian Ronaldo'?",
        image: require('../../assets/images/joueurs/shakhavov_ronaldo.jpeg'),
        options: ["Server Djeparov", "Odil Ahmedov", "Igor Sergeev", "Maksim Shatskikh"],
        correctAnswer: 0,
        explanation: "Server Djeparov est surnommé 'The Asian Ronaldo'."
      },
      {
        id: 8,
        question: "Quel joueur qatari a remporté la Coupe d'Asie 2019?",
        image: require('../../assets/images/joueurs/ali_asien_cup.jpeg'),
        options: ["Almoez Ali", "Akram Afif", "Hassan Al-Haydos", "Boualem Khoukhi"],
        correctAnswer: 0,
        explanation: "Almoez Ali a remporté la Coupe d'Asie 2019 avec le Qatar."
      },
      {
        id: 9,
        question: "Quel joueur a le plus de sélections en équipe nationale?",
        image: require('../../assets/images/joueurs/al_mutawa_caps.jpeg'),
        options: ["Bader Al-Mutawa", "Cristiano Ronaldo", "Ahmed Hassan", "Sergio Ramos"],
        correctAnswer: 0,
        explanation: "Bader Al-Mutawa a 196 sélections avec le Koweït (record mondial)."
      },
      {
        id: 10,
        question: "Quel joueur asiatique a remporté la Ligue des Champions?",
        image: require('../../assets/images/joueurs/park_champions.jpeg'),
        options: ["Park Ji-sung", "Shinji Kagawa", "Son Heung-min", "Les trois"],
        correctAnswer: 3,
        explanation: "Park Ji-sung, Shinji Kagawa et Son Heung-min ont tous remporté la Ligue des Champions."
      }
    ]
  };

  // Si le niveau n'existe pas encore, utiliser le niveau 1
  const questions = questionsData[niveau.id] || questionsData[1];
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
    
    // Appeler le callback pour mettre à jour le parent
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
      
      {/* Header avec progression et timer */}
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
      <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
        {/* Image du joueur */}
        <View style={styles.imageContainer}>
          <Image 
            source={currentQ.image || require('../../assets/images/joueurs/default_joueur.jpeg')}
            style={styles.questionImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.questionNumber}>Question {currentQuestion + 1}</Text>
          </View>
        </View>

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
    color: '#ff6b6b',
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
    backgroundColor: '#ff6b6b',
  },
  questionContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  imageContainer: {
    height: 200,
    marginBottom: 20,
    position: 'relative',
  },
  questionImage: {
    width: '100%',
    height: '100%',
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
    backgroundColor: '#ffeaea',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
    marginHorizontal: 20,
    marginTop: 10,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4757',
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
    backgroundColor: '#ff6b6b',
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
    borderColor: '#ff6b6b',
    marginBottom: 20,
    flexDirection: 'row',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff6b6b',
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
    backgroundColor: '#ff6b6b',
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

export default QuizJoueurScreen;