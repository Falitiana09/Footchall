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

const QuizTerrainScreen = ({ route, navigation }) => {
  const { niveau, onQuizFinish } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Données des questions pour les terrains - 10 questions par niveau
  const questionsData = {
    1: [ // Niveau 1 - Terrains faciles
      {
        id: 1,
        question: "Dans quel stade se joue la finale de la Ligue des Champions?",
        image: require('../../assets/images/terrains/stade1.jpeg'),
        options: ["Stade de France", "Camp Nou", "Stade Santiago Bernabéu", "Allianz Arena"],
        correctAnswer: 0,
        explanation: "La finale de la Ligue des Champions se joue au Stade de France."
      },
      {
        id: 2,
        question: "Quel est le stade du FC Barcelone?",
        image: require('../../assets/images/terrains/stade2.jpeg'),
        options: ["Old Trafford", "Camp Nou", "San Siro", "Signal Iduna Park"],
        correctAnswer: 1,
        explanation: "Le FC Barcelone joue au Camp Nou."
      },
      {
        id: 3,
        question: "Où joue le Real Madrid?",
        image: require('../../assets/images/terrains/stade3.jpeg'),
        options: ["Stade Santiago Bernabéu", "Anfield", "Emirates Stadium", "Parc des Princes"],
        correctAnswer: 0,
        explanation: "Le Real Madrid joue au Stade Santiago Bernabéu."
      },
      {
        id: 4,
        question: "Quel est le stade de l'équipe de France?",
        image: require('../../assets/images/terrains/stade4.jpeg'),
        options: ["Parc des Princes", "Stade Vélodrome", "Stade de France", "Allianz Riviera"],
        correctAnswer: 2,
        explanation: "L'équipe de France joue au Stade de France."
      },
      {
        id: 5,
        question: "Dans quel stade joue le Bayern Munich?",
        image: require('../../assets/images/terrains/stade5.jpeg'),
        options: ["Signal Iduna Park", "Allianz Arena", "Red Bull Arena", "Volksparkstadion"],
        correctAnswer: 1,
        explanation: "Le Bayern Munich joue à l'Allianz Arena."
      },
      {
        id: 6,
        question: "Où joue Liverpool FC?",
        image: require('../../assets/images/terrains/stade6.jpeg'),
        options: ["Old Trafford", "Anfield", "Etihad Stadium", "Stamford Bridge"],
        correctAnswer: 1,
        explanation: "Liverpool FC joue à Anfield."
      },
      {
        id: 7,
        question: "Quel est le stade de l'AC Milan et de l'Inter Milan?",
        image: require('../../assets/images/terrains/stade7.jpeg'),
        options: ["San Siro", "Stadio Olimpico", "Allianz Stadium", "Juventus Stadium"],
        correctAnswer: 0,
        explanation: "L'AC Milan et l'Inter Milan partagent le San Siro."
      },
      {
        id: 8,
        question: "Où joue Arsenal FC?",
        image: require('../../assets/images/terrains/stade8.jpeg'),
        options: ["Emirates Stadium", "White Hart Lane", "Old Trafford", "Anfield"],
        correctAnswer: 0,
        explanation: "Arsenal FC joue à l'Emirates Stadium."
      },
      {
        id: 9,
        question: "Quel est le stade du Paris Saint-Germain?",
        image: require('../../assets/images/terrains/stade9.jpeg'),
        options: ["Stade de France", "Parc des Princes", "Stade Vélodrome", "Groupama Stadium"],
        correctAnswer: 1,
        explanation: "Le Paris Saint-Germain joue au Parc des Princes."
      },
      {
        id: 10,
        question: "Dans quel stade joue Borussia Dortmund?",
        image: require('../../assets/images/terrains/stade10.jpeg'),
        options: ["Allianz Arena", "Signal Iduna Park", "Volkswagen Arena", "BayArena"],
        correctAnswer: 1,
        explanation: "Borussia Dortmund joue au Signal Iduna Park."
      }
    ],
    2: [ // Niveau 2 - Terrains européens
      {
        id: 1,
        question: "Quel est le stade le plus grand d'Angleterre?",
        image: require('../../assets/images/terrains/wembley.jpeg'),
        options: ["Old Trafford", "Wembley", "Emirates Stadium", "Anfield"],
        correctAnswer: 1,
        explanation: "Wembley est le plus grand stade d'Angleterre avec 90,000 places."
      },
      {
        id: 2,
        question: "Où joue Manchester United?",
        image: require('../../assets/images/terrains/old_trafford.jpeg'),
        options: ["Etihad Stadium", "Old Trafford", "Anfield", "Stamford Bridge"],
        correctAnswer: 1,
        explanation: "Manchester United joue à Old Trafford."
      },
      {
        id: 3,
        question: "Quel stade est surnommé 'La Bombonera'?",
        image: require('../../assets/images/terrains/bombonera.jpeg'),
        options: ["Estadio Monumental", "Estadio La Bombonera", "Estadio Maracanã", "Estadio Centenario"],
        correctAnswer: 1,
        explanation: "La Bombonera est le stade du club argentin Boca Juniors."
      },
      {
        id: 4,
        question: "Où se trouve le stade Maracanã?",
        image: require('../../assets/images/terrains/maracana.jpeg'),
        options: ["Buenos Aires", "Rio de Janeiro", "São Paulo", "Brasilia"],
        correctAnswer: 1,
        explanation: "Le stade Maracanã se trouve à Rio de Janeiro, Brésil."
      },
      {
        id: 5,
        question: "Quel est le stade de la Juventus?",
        image: require('../../assets/images/terrains/juventus_stadium.jpeg'),
        options: ["San Siro", "Allianz Stadium", "Stadio Olimpico", "Stadio Artemio Franchi"],
        correctAnswer: 1,
        explanation: "La Juventus joue à l'Allianz Stadium."
      },
      {
        id: 6,
        question: "Dans quel stade joue l'Ajax Amsterdam?",
        image: require('../../assets/images/terrains/johan_cruijff.jpeg'),
        options: ["De Kuip", "Philips Stadion", "Johan Cruijff Arena", "GelreDome"],
        correctAnswer: 2,
        explanation: "L'Ajax Amsterdam joue à la Johan Cruijff Arena."
      },
      {
        id: 7,
        question: "Où joue le Celtic Glasgow?",
        image: require('../../assets/images/terrains/celtic_park.jpeg'),
        options: ["Ibrox Stadium", "Celtic Park", "Hampden Park", "Tynecastle Park"],
        correctAnswer: 1,
        explanation: "Le Celtic Glasgow joue à Celtic Park."
      },
      {
        id: 8,
        question: "Quel stade est situé à Istanbul?",
        image: require('../../assets/images/terrains/besiktas_park.jpeg'),
        options: ["Ali Sami Yen", "Şükrü Saracoğlu", "Türk Telekom", "Vodafone Park"],
        correctAnswer: 3,
        explanation: "Vodafone Park est le stade de Beşiktaş à Istanbul."
      },
      {
        id: 9,
        question: "Où joue le Benfica Lisbonne?",
        image: require('../../assets/images/terrains/estadio_da_luz.jpeg'),
        options: ["Estádio do Dragão", "Estádio José Alvalade", "Estádio da Luz", "Estádio Municipal de Braga"],
        correctAnswer: 2,
        explanation: "Le Benfica Lisbonne joue à l'Estádio da Luz."
      },
      {
        id: 10,
        question: "Quel est le stade du FC Porto?",
        image: require('../../assets/images/terrains/estadio_do_dragao.jpeg'),
        options: ["Estádio da Luz", "Estádio do Dragão", "Estádio José Alvalade", "Estádio Municipal de Aveiro"],
        correctAnswer: 1,
        explanation: "Le FC Porto joue à l'Estádio do Dragão."
      }
    ],
    3: [ // Niveau 3 - Terrains mondiaux
      {
        id: 1,
        question: "Dans quel stade s'est jouée la finale de la Coupe du Monde 2014?",
        image: require('../../assets/images/terrains/maracana_2014.jpeg'),
        options: ["Stade Maracanã", "Arena Corinthians", "Estadio Mineirão", "Estadio Nacional"],
        correctAnswer: 0,
        explanation: "La finale de la Coupe du Monde 2014 s'est jouée au Maracanã."
      },
      {
        id: 2,
        question: "Où s'est déroulée la finale de la Coupe du Monde 2018?",
        image: require('../../assets/images/terrains/luzhniki.jpeg'),
        options: ["Stade Krestovsky", "Stade Loujniki", "Otkrytie Arena", "Kazan Arena"],
        correctAnswer: 1,
        explanation: "La finale de 2018 s'est jouée au Stade Loujniki à Moscou."
      },
      {
        id: 3,
        question: "Quel stade a accueilli la finale de l'Euro 2016?",
        image: require('../../assets/images/terrains/stade_france_euro.jpeg'),
        options: ["Parc des Princes", "Stade Vélodrome", "Stade de France", "Allianz Riviera"],
        correctAnswer: 2,
        explanation: "La finale de l'Euro 2016 s'est jouée au Stade de France."
      },
      {
        id: 4,
        question: "Où s'est déroulée la finale de la Ligue des Champions 2019?",
        image: require('../../assets/images/terrains/wanda_metropolitano.jpeg'),
        options: ["Stade de France", "Wanda Metropolitano", "Allianz Arena", "Camp Nou"],
        correctAnswer: 1,
        explanation: "La finale 2019 s'est jouée au Wanda Metropolitano à Madrid."
      },
      {
        id: 5,
        question: "Quel stade a accueilli la 'Finale des Centenaires' de la Copa Libertadores?",
        image: require('../../assets/images/terrains/estadio_monumental.jpeg'),
        options: ["Estadio Maracanã", "Estadio Monumental", "Estadio Alberto J. Armando", "Estadio Nacional"],
        correctAnswer: 1,
        explanation: "La finale 2018 s'est jouée à l'Estadio Monumental de Buenos Aires."
      },
      {
        id: 6,
        question: "Dans quel stade se joue le Super Bowl?",
        image: require('../../assets/images/terrains/super_bowl_stadium.jpeg'),
        options: ["Rose Bowl", "Michigan Stadium", "AT&T Stadium", "Le stade change chaque année"],
        correctAnswer: 3,
        explanation: "Le Super Bowl change de stade chaque année aux États-Unis."
      },
      {
        id: 7,
        question: "Où se trouve le stade 'Soccer City'?",
        image: require('../../assets/images/terrains/soccer_city.jpeg'),
        options: ["Le Caire", "Johannesburg", "Casablanca", "Abidjan"],
        correctAnswer: 1,
        explanation: "Soccer City (FNB Stadium) se trouve à Johannesburg, Afrique du Sud."
      },
      {
        id: 8,
        question: "Quel stade est surnommé 'Le Nid d'Oiseau'?",
        image: require('../../assets/images/terrains/birds_nest.jpeg'),
        options: ["Stade National de Pékin", "Stade de Tokyo", "Stade de Séoul", "Stade de Bangkok"],
        correctAnswer: 0,
        explanation: "Le Stade National de Pékin est surnommé 'Le Nid d'Oiseau'."
      },
      {
        id: 9,
        question: "Où se trouve le stade Azteca?",
        image: require('../../assets/images/terrains/estadio_azteca.jpeg'),
        options: ["Bogota", "Mexico", "Lima", "Santiago"],
        correctAnswer: 1,
        explanation: "L'Estadio Azteca se trouve à Mexico, Mexique."
      },
      {
        id: 10,
        question: "Quel stade a la plus grande capacité au monde?",
        image: require('../../assets/images/terrains/largest_stadium.jpeg'),
        options: ["Camp Nou", "Maracanã", "Stade Rungrado 1er-Mai", "Michigan Stadium"],
        correctAnswer: 2,
        explanation: "Le stade Rungrado 1er-Mai en Corée du Nord a 114,000 places."
      }
    ],
    4: [ // Niveau 4 - Terrains historiques
      {
        id: 1,
        question: "Quel stade était surnommé 'Le Chaudron'?",
        image: require('../../assets/images/terrains/stade_geoffroy_guichard.jpeg'),
        options: ["Stade Vélodrome", "Stade Geoffroy-Guichard", "Parc des Princes", "Stade de la Meinau"],
        correctAnswer: 1,
        explanation: "Le Stade Geoffroy-Guichard de Saint-Étienne était surnommé 'Le Chaudron'."
      },
      {
        id: 2,
        question: "Où se jouait la finale de la Coupe du Monde 1930?",
        image: require('../../assets/images/terrains/estadio_centenario.jpeg'),
        options: ["Estadio Centenario", "Estadio Maracanã", "Wembley", "Rose Bowl"],
        correctAnswer: 0,
        explanation: "La première finale en 1930 s'est jouée à l'Estadio Centenario en Uruguay."
      },
      {
        id: 3,
        question: "Quel stade a accueilli le 'Match du Siècle' en 1953?",
        image: require('../../assets/images/terrains/wembley_1953.jpeg'),
        options: ["Hampden Park", "Wembley", "Highbury", "Old Trafford"],
        correctAnswer: 1,
        explanation: "Le 'Match du Siècle' (Angleterre-Hongrie) s'est joué à Wembley en 1953."
      },
      {
        id: 4,
        question: "Où s'est déroulé le 'Miracle de Berne' en 1954?",
        image: require('../../assets/images/terrains/wankdorf_stadium.jpeg'),
        options: ["Stade Olympique de Berlin", "Stade Wankdorf", "Stade Saint-Jacques", "Stade de la Pontaise"],
        correctAnswer: 1,
        explanation: "La finale de 1954 s'est jouée au Stade Wankdorf à Berne."
      },
      {
        id: 5,
        question: "Quel stade a accueilli la 'Finale des 120 000' en 1960?",
        image: require('../../assets/images/terrains/hampden_park_1960.jpeg'),
        options: ["San Siro", "Hampden Park", "Bernabéu", "Camp Nou"],
        correctAnswer: 1,
        explanation: "La finale de la Coupe d'Europe 1960 à Hampden Park avait 120,000 spectateurs."
      },
      {
        id: 6,
        question: "Où s'est joué le 'Match de la Honte' en 1969?",
        image: require('../../assets/images/terrains/azteca_1969.jpeg'),
        options: ["Estadio Azteca", "Estadio Nacional", "Estadio Monumental", "Estadio Morumbi"],
        correctAnswer: 0,
        explanation: "Le match éliminatoire Mexique-Honduras en 1969 s'est joué à l'Azteca."
      },
      {
        id: 7,
        question: "Quel stade a vu la 'Main de Dieu' en 1986?",
        image: require('../../assets/images/terrains/azteca_1986.jpeg'),
        options: ["Estadio Azteca", "Estadio Monumental", "Rose Bowl", "Stadio Olimpico"],
        correctAnswer: 0,
        explanation: "Le quart de finale Argentine-Angleterre en 1986 s'est joué à l'Azteca."
      },
      {
        id: 8,
        question: "Où s'est déroulé le 'Drame du Heysel' en 1985?",
        image: require('../../assets/images/terrains/heysel_stadium.jpeg'),
        options: ["Anfield", "Heysel Stadium", "San Siro", "Wembley"],
        correctAnswer: 1,
        explanation: "La tragédie du Heysel s'est produite au stade du Heysel à Bruxelles."
      },
      {
        id: 9,
        question: "Quel stade a accueilli le 'Match du Siècle' Brésil-Italie en 1970?",
        image: require('../../assets/images/terrains/azteca_1970.jpeg'),
        options: ["Estadio Maracanã", "Estadio Azteca", "Rose Bowl", "Estadio Nacional"],
        correctAnswer: 1,
        explanation: "La finale de 1970 entre Brésil et Italie s'est jouée à l'Azteca."
      },
      {
        id: 10,
        question: "Où s'est déroulée la finale de l'Euro 1992?",
        image: require('../../assets/images/terrains/ullevi_stadium.jpeg'),
        options: ["Stade Råsunda", "Stade Ullevi", "Parken Stadium", "Stade Olympique d'Helsinki"],
        correctAnswer: 1,
        explanation: "La finale de l'Euro 1992 s'est jouée au Stade Ullevi à Göteborg."
      }
    ],
    5: [ // Niveau 5 - Terrains modernes
      {
        id: 1,
        question: "Quel stade a ouvert en 2006 pour la Coupe du Monde?",
        image: require('../../assets/images/terrains/allianz_arena_2006.jpeg'),
        options: ["Allianz Arena", "Signal Iduna Park", "Veltins-Arena", "Commerzbank-Arena"],
        correctAnswer: 0,
        explanation: "L'Allianz Arena a ouvert en 2005 juste avant la Coupe du Monde 2006."
      },
      {
        id: 2,
        question: "Quel stade a coûté le plus cher à construire?",
        image: require('../../assets/images/terrains/sofi_stadium.jpeg'),
        options: ["SoFi Stadium", "MetLife Stadium", "AT&T Stadium", "Mercedes-Benz Stadium"],
        correctAnswer: 0,
        explanation: "Le SoFi Stadium à Los Angeles a coûté environ 5 milliards de dollars."
      },
      {
        id: 3,
        question: "Quel stade a un toit rétractable?",
        image: require('../../assets/images/terrains/tottenham_stadium.jpeg'),
        options: ["Emirates Stadium", "Tottenham Hotspur Stadium", "Anfield", "Etihad Stadium"],
        correctAnswer: 1,
        explanation: "Le Tottenham Hotspur Stadium a un toit rétractable."
      },
      {
        id: 4,
        question: "Où se trouve le 'Stade aux Toiles d'Araignée'?",
        image: require('../../assets/images/terrains/kaohsiung_stadium.jpeg'),
        options: ["Taïwan", "Japon", "Corée du Sud", "Chine"],
        correctAnswer: 0,
        explanation: "Le stade national de Kaohsiung à Taïwan a une structure en toile d'araignée."
      },
      {
        id: 5,
        question: "Quel stade a été construit pour les Jeux Olympiques 2008?",
        image: require('../../assets/images/terrains/beijing_national.jpeg'),
        options: ["Stade National de Pékin", "Stade Olympique de Tokyo", "Stade de Séoul", "Stade de Sydney"],
        correctAnswer: 0,
        explanation: "Le Stade National de Pékin a été construit pour les JO 2008."
      },
      {
        id: 6,
        question: "Quel stade a une capacité de 100,000 places?",
        image: require('../../assets/images/terrains/michigan_stadium.jpeg'),
        options: ["Michigan Stadium", "Ohio Stadium", "Beaver Stadium", "Neyland Stadium"],
        correctAnswer: 0,
        explanation: "Le Michigan Stadium a une capacité officielle de 107,601 places."
      },
      {
        id: 7,
        question: "Quel stade a été le premier avec un gazon hybride?",
        image: require('../../assets/images/terrains/turf_moor.jpeg'),
        options: ["Wembley", "Emirates Stadium", "Turf Moor", "John Smith's Stadium"],
        correctAnswer: 2,
        explanation: "Turf Moor, stade de Burnley, fut le premier avec gazon hybride en 2001."
      },
      {
        id: 8,
        question: "Quel stade a le plus grand écran vidéo?",
        image: require('../../assets/images/terrains/at_t_stadium.jpeg'),
        options: ["AT&T Stadium", "SoFi Stadium", "Mercedes-Benz Stadium", "Allegiant Stadium"],
        correctAnswer: 0,
        explanation: "L'AT&T Stadium a deux écrans de 55 mètres de long."
      },
      {
        id: 9,
        question: "Quel stade est entièrement couvert?",
        image: require('../../assets/images/terrains/allegiant_stadium.jpeg'),
        options: ["Allegiant Stadium", "Lambeau Field", "Soldier Field", "Arrowhead Stadium"],
        correctAnswer: 0,
        explanation: "L'Allegiant Stadium à Las Vegas est entièrement couvert."
      },
      {
        id: 10,
        question: "Quel stade a été construit sur une île artificielle?",
        image: require('../../assets/images/terrains/aspire_dome.jpeg'),
        options: ["Aspire Dome", "Khalifa Stadium", "Education City Stadium", "Al Janoub Stadium"],
        correctAnswer: 3,
        explanation: "L'Al Janoub Stadium au Qatar est sur une île artificielle."
      }
    ],
    6: [ // Niveau 6 - Terrains d'Asie
      {
        id: 1,
        question: "Où se trouve le Stade International de Yokohama?",
        image: require('../../assets/images/terrains/yokohama_stadium.jpeg'),
        options: ["Osaka", "Yokohama", "Tokyo", "Kyoto"],
        correctAnswer: 1,
        explanation: "Le Stade International de Yokohama se trouve à Yokohama, Japon."
      },
      {
        id: 2,
        question: "Quel stade a accueilli la finale de la Coupe du Monde 2002?",
        image: require('../../assets/images/terrains/yokohama_final.jpeg'),
        options: ["Stade de Saitama", "Stade de Séoul", "Stade International de Yokohama", "Stade de Busan"],
        correctAnswer: 2,
        explanation: "La finale de 2002 s'est jouée au Stade International de Yokohama."
      },
      {
        id: 3,
        question: "Où se trouve le Stade National de Pékin?",
        image: require('../../assets/images/terrains/beijing_national2.jpeg'),
        options: ["Shanghai", "Pékin", "Hong Kong", "Canton"],
        correctAnswer: 1,
        explanation: "Le Stade National de Pékin se trouve à Pékin, Chine."
      },
      {
        id: 4,
        question: "Quel stade est surnommé 'Le Vaisseau Spatial'?",
        image: require('../../assets/images/terrains/ali_sami_yen.jpeg'),
        options: ["Stade de Séoul", "Stade Ali Sami Yen", "Stade Jawaharlal Nehru", "Stade Bukit Jalil"],
        correctAnswer: 1,
        explanation: "L'Ali Sami Yen Stadium en Turquie est surnommé 'Le Vaisseau Spatial'."
      },
      {
        id: 5,
        question: "Où se trouve le Stade Rajamangala?",
        image: require('../../assets/images/terrains/rajamangala_stadium.jpeg'),
        options: ["Bangkok", "Manille", "Jakarta", "Kuala Lumpur"],
        correctAnswer: 0,
        explanation: "Le Stade Rajamangala se trouve à Bangkok, Thaïlande."
      },
      {
        id: 6,
        question: "Quel stade a accueilli les Jeux Asiatiques de 2018?",
        image: require('../../assets/images/terrains/gbk_stadium.jpeg'),
        options: ["Stade Gelora Bung Karno", "Stade Jawaharlal Nehru", "Stade National de Kaohsiung", "Stade de Jakarta"],
        correctAnswer: 0,
        explanation: "Le Stade Gelora Bung Karno à Jakarta a accueilli les Jeux Asiatiques 2018."
      },
      {
        id: 7,
        question: "Où se trouve le Stade Sultan Qaboos?",
        image: require('../../assets/images/terrains/sultan_qaboos.jpeg'),
        options: ["Mascate", "Doha", "Abu Dhabi", "Riyad"],
        correctAnswer: 0,
        explanation: "Le Stade Sultan Qaboos se trouve à Mascate, Oman."
      },
      {
        id: 8,
        question: "Quel stade a la plus grande capacité en Asie?",
        image: require('../../assets/images/terrains/rungrado_stadium.jpeg'),
        options: ["Stade Rungrado 1er-Mai", "Stade National de Pékin", "Stade Salt Lake", "Stade Jawaharlal Nehru"],
        correctAnswer: 0,
        explanation: "Le Stade Rungrado 1er-Mai en Corée du Nord a 114,000 places."
      },
      {
        id: 9,
        question: "Où se trouve le Stade Nagai?",
        image: require('../../assets/images/terrains/nagai_stadium.jpeg'),
        options: ["Osaka", "Nagoya", "Fukuoka", "Sapporo"],
        correctAnswer: 0,
        explanation: "Le Stade Nagai se trouve à Osaka, Japon."
      },
      {
        id: 10,
        question: "Quel stade a accueilli la finale de l'AFC Asian Cup 2019?",
        image: require('../../assets/images/terrains/zayed_sports_city.jpeg'),
        options: ["Stade Zayed Sports City", "Stade Jassim bin Hamad", "Stade Mohammed bin Zayed", "Stade Khalifa International"],
        correctAnswer: 0,
        explanation: "La finale de l'Asian Cup 2019 s'est jouée au Stade Zayed Sports City à Abu Dhabi."
      }
    ],
    7: [ // Niveau 7 - Terrains d'Afrique
      {
        id: 1,
        question: "Où se trouve le Stade du 5 Juillet 1962?",
        image: require('../../assets/images/terrains/5_juillet_stadium.jpeg'),
        options: ["Alger", "Le Caire", "Casablanca", "Tunis"],
        correctAnswer: 0,
        explanation: "Le Stade du 5 Juillet 1962 se trouve à Alger, Algérie."
      },
      {
        id: 2,
        question: "Quel stade a accueilli la finale de la CAN 2019?",
        image: require('../../assets/images/terrains/cairo_stadium.jpeg'),
        options: ["Stade International du Caire", "Stade Borg El Arab", "Stade Mohammed V", "Stade du 26 Mars"],
        correctAnswer: 0,
        explanation: "La finale de la CAN 2019 s'est jouée au Stade International du Caire."
      },
      {
        id: 3,
        question: "Où se trouve le Stade Moses Mabhida?",
        image: require('../../assets/images/terrains/moses_mabhida.jpeg'),
        options: ["Johannesburg", "Durban", "Le Cap", "Pretoria"],
        correctAnswer: 1,
        explanation: "Le Stade Moses Mabhida se trouve à Durban, Afrique du Sud."
      },
      {
        id: 4,
        question: "Quel stade a accueilli la finale de la Coupe du Monde 2010?",
        image: require('../../assets/images/terrains/soccer_city_2010.jpeg'),
        options: ["Stade Moses Mabhida", "Soccer City", "Stade Green Point", "Stade Loftus Versfeld"],
        correctAnswer: 1,
        explanation: "La finale de 2010 s'est jouée à Soccer City (FNB Stadium) à Johannesburg."
      },
      {
        id: 5,
        question: "Où se trouve le Stade Mohammed V?",
        image: require('../../assets/images/terrains/mohammed_v_stadium.jpeg'),
        options: ["Rabat", "Casablanca", "Marrakech", "Fès"],
        correctAnswer: 1,
        explanation: "Le Stade Mohammed V se trouve à Casablanca, Maroc."
      },
      {
        id: 6,
        question: "Quel stade est surnommé 'Le Stade des Lumières'?",
        image: require('../../assets/images/terrains/borg_el_arab.jpeg'),
        options: ["Stade Borg El Arab", "Stade du 5 Juillet", "Stade Samuel Kanyon Doe", "Stade Ahmadou Ahidjo"],
        correctAnswer: 0,
        explanation: "Le Stade Borg El Arab en Égypte est surnommé 'Le Stade des Lumières'."
      },
      {
        id: 7,
        question: "Où se trouve le Stade d'Addis-Abeba?",
        image: require('../../assets/images/terrains/addis_ababa_stadium.jpeg'),
        options: ["Addis-Abeba", "Nairobi", "Kampala", "Dar es Salaam"],
        correctAnswer: 0,
        explanation: "Le Stade d'Addis-Abeba se trouve à Addis-Abeba, Éthiopie."
      },
      {
        id: 8,
        question: "Quel stade a la plus grande capacité en Afrique?",
        image: require('../../assets/images/terrains/borg_el_arab_capacity.jpeg'),
        options: ["Stade Borg El Arab", "Stade du 5 Juillet", "Soccer City", "Stade Mohammed V"],
        correctAnswer: 0,
        explanation: "Le Stade Borg El Arab en Égypte a 86,000 places."
      },
      {
        id: 9,
        question: "Où se trouve le Stade Samuel Kanyon Doe?",
        image: require('../../assets/images/terrains/skd_stadium.jpeg'),
        options: ["Monrovia", "Abidjan", "Accra", "Lagos"],
        correctAnswer: 0,
        explanation: "Le Stade Samuel Kanyon Doe se trouve à Monrovia, Liberia."
      },
      {
        id: 10,
        question: "Quel stade a accueilli la finale de la CAN 2021?",
        image: require('../../assets/images/terrains/oudon_stadium.jpeg'),
        options: ["Stade d'Oudon", "Stade Paul Biya", "Stade Ahmadou Ahidjo", "Stade de la Réunification"],
        correctAnswer: 0,
        explanation: "La finale de la CAN 2021 s'est jouée au Stade d'Oudon à Yaoundé, Cameroun."
      }
    ],
    8: [ // Niveau 8 - Terrains d'Amérique du Sud
      {
        id: 1,
        question: "Où se trouve l'Estadio Monumental?",
        image: require('../../assets/images/terrains/estadio_monumental_bsas.jpeg'),
        options: ["Buenos Aires", "Santiago", "Lima", "Bogota"],
        correctAnswer: 0,
        explanation: "L'Estadio Monumental se trouve à Buenos Aires, Argentine."
      },
      {
        id: 2,
        question: "Quel stade est surnommé 'Le Monstre'?",
        image: require('../../assets/images/terrains/estadio_monstruo.jpeg'),
        options: ["Estadio Monumental", "Estadio Maracanã", "Estadio Morumbi", "Estadio Centenario"],
        correctAnswer: 2,
        explanation: "L'Estadio Morumbi à São Paulo est surnommé 'Le Monstre'."
      },
      {
        id: 3,
        question: "Où se trouve l'Estadio Nacional du Chili?",
        image: require('../../assets/images/terrains/estadio_nacional_chile.jpeg'),
        options: ["Santiago", "Valparaíso", "Concepción", "Antofagasta"],
        correctAnswer: 0,
        explanation: "L'Estadio Nacional du Chili se trouve à Santiago."
      },
      {
        id: 4,
        question: "Quel stade a accueilli la finale de la Copa América 2011?",
        image: require('../../assets/images/terrains/estadio_monumental_2011.jpeg'),
        options: ["Estadio Monumental", "Estadio Nacional", "Estadio Mario Alberto Kempes", "Estadio Antonio Vespucio Liberti"],
        correctAnswer: 0,
        explanation: "La finale de la Copa América 2011 s'est jouée à l'Estadio Monumental."
      },
      {
        id: 5,
        question: "Où se trouve l'Estadio Atanasio Girardot?",
        image: require('../../assets/images/terrains/atanasio_girardot.jpeg'),
        options: ["Medellín", "Bogota", "Cali", "Barranquilla"],
        correctAnswer: 0,
        explanation: "L'Estadio Atanasio Girardot se trouve à Medellín, Colombie."
      },
      {
        id: 6,
        question: "Quel stade est le plus grand du Pérou?",
        image: require('../../assets/images/terrains/estadio_nacional_peru.jpeg'),
        options: ["Estadio Monumental", "Estadio Nacional", "Estadio Alejandro Villanueva", "Estadio Universidad San Marcos"],
        correctAnswer: 1,
        explanation: "L'Estadio Nacional du Pérou à Lima est le plus grand avec 50,000 places."
      },
      {
        id: 7,
        question: "Où se trouve l'Estadio Centenario?",
        image: require('../../assets/images/terrains/estadio_centenario_uruguay.jpeg'),
        options: ["Montevideo", "Asunción", "La Paz", "Quito"],
        correctAnswer: 0,
        explanation: "L'Estadio Centenario se trouve à Montevideo, Uruguay."
      },
      {
        id: 8,
        question: "Quel stade a la plus haute altitude au monde?",
        image: require('../../assets/images/terrains/estadio_hernando_siles.jpeg'),
        options: ["Estadio Hernando Siles", "Estadio Olímpico de la UCV", "Estadio Monumental", "Estadio Defensores del Chaco"],
        correctAnswer: 0,
        explanation: "L'Estadio Hernando Siles à La Paz est à 3,637 m d'altitude."
      },
      {
        id: 9,
        question: "Où se trouve l'Estadio Monumental de Maturín?",
        image: require('../../assets/images/terrains/estadio_monumental_maturin.jpeg'),
        options: ["Maturín", "Caracas", "Maracaibo", "Valencia"],
        correctAnswer: 0,
        explanation: "L'Estadio Monumental de Maturín se trouve à Maturín, Venezuela."
      },
      {
        id: 10,
        question: "Quel stade a accueilli la finale de la Copa Libertadores 2018?",
        image: require('../../assets/images/terrains/estadio_monumental_libertadores.jpeg'),
        options: ["Estadio Monumental", "Estadio Maracanã", "Estadio Nacional", "Estadio Mineirão"],
        correctAnswer: 0,
        explanation: "La finale de la Copa Libertadores 2018 s'est jouée à l'Estadio Monumental."
      }
    ],
    9: [ // Niveau 9 - Terrains d'Amérique du Nord
      {
        id: 1,
        question: "Où se trouve le SoFi Stadium?",
        image: require('../../assets/images/terrains/sofi_stadium_la.jpeg'),
        options: ["Los Angeles", "Las Vegas", "Miami", "New York"],
        correctAnswer: 0,
        explanation: "Le SoFi Stadium se trouve à Inglewood, près de Los Angeles."
      },
      {
        id: 2,
        question: "Quel stade a accueilli le Super Bowl LIV?",
        image: require('../../assets/images/terrains/hard_rock_stadium.jpeg'),
        options: ["Hard Rock Stadium", "Mercedes-Benz Stadium", "AT&T Stadium", "Allegiant Stadium"],
        correctAnswer: 0,
        explanation: "Le Super Bowl LIV s'est joué au Hard Rock Stadium à Miami."
      },
      {
        id: 3,
        question: "Où se trouve le Stade Olympique de Montréal?",
        image: require('../../assets/images/terrains/olympic_stadium_montreal.jpeg'),
        options: ["Montréal", "Toronto", "Vancouver", "Calgary"],
        correctAnswer: 0,
        explanation: "Le Stade Olympique se trouve à Montréal, Canada."
      },
      {
        id: 4,
        question: "Quel stade est surnommé 'The Big House'?",
        image: require('../../assets/images/terrains/michigan_big_house.jpeg'),
        options: ["Michigan Stadium", "Ohio Stadium", "Beaver Stadium", "Neyland Stadium"],
        correctAnswer: 0,
        explanation: "Le Michigan Stadium est surnommé 'The Big House'."
      },
      {
        id: 5,
        question: "Où se trouve l'AT&T Stadium?",
        image: require('../../assets/images/terrains/at_t_stadium_texas.jpeg'),
        options: ["Arlington", "Dallas", "Houston", "Austin"],
        correctAnswer: 0,
        explanation: "L'AT&T Stadium se trouve à Arlington, Texas."
      },
      {
        id: 6,
        question: "Quel stade a un toit rétractable en 8 panneaux?",
        image: require('../../assets/images/terrains/mercedes_benz_stadium.jpeg'),
        options: ["Mercedes-Benz Stadium", "SoFi Stadium", "Allegiant Stadium", "U.S. Bank Stadium"],
        correctAnswer: 0,
        explanation: "Le Mercedes-Benz Stadium à Atlanta a un toit rétractable à 8 panneaux."
      },
      {
        id: 7,
        question: "Où se trouve le Stade Azteca?",
        image: require('../../assets/images/terrains/estadio_azteca_mexico.jpeg'),
        options: ["Mexico", "Guadalajara", "Monterrey", "Puebla"],
        correctAnswer: 0,
        explanation: "L'Estadio Azteca se trouve à Mexico, Mexique."
      },
      {
        id: 8,
        question: "Quel stade a accueilli la finale de la Gold Cup 2019?",
        image: require('../../assets/images/terrains/soldier_field_gold_cup.jpeg'),
        options: ["Soldier Field", "Rose Bowl", "MetLife Stadium", "Lincoln Financial Field"],
        correctAnswer: 0,
        explanation: "La finale de la Gold Cup 2019 s'est jouée au Soldier Field à Chicago."
      },
      {
        id: 9,
        question: "Où se trouve le BMO Field?",
        image: require('../../assets/images/terrains/bmo_field.jpeg'),
        options: ["Toronto", "Montréal", "Vancouver", "Ottawa"],
        correctAnswer: 0,
        explanation: "Le BMO Field se trouve à Toronto, Canada."
      },
      {
        id: 10,
        question: "Quel stade a la plus grande capacité aux États-Unis?",
        image: require('../../assets/images/terrains/michigan_largest.jpeg'),
        options: ["Michigan Stadium", "Beaver Stadium", "Ohio Stadium", "Kyle Field"],
        correctAnswer: 0,
        explanation: "Le Michigan Stadium a 107,601 places, la plus grande capacité aux USA."
      }
    ],
    10: [ // Niveau 10 - Terrains spéciaux/insolites
      {
        id: 1,
        question: "Quel stade est construit sur une île flottante?",
        image: require('../../assets/images/terrains/floating_stadium.jpeg'),
        options: ["Stade Marina Bay", "Stade de Singapour", "Stade flottant de Bangkok", "Stade de Dubaï Marina"],
        correctAnswer: 0,
        explanation: "Le Stade Marina Bay à Singapour est sur une île flottante."
      },
      {
        id: 2,
        question: "Où se trouve le stade avec vue sur les Alpes?",
        image: require('../../assets/images/terrains/allianz_alps_view.jpeg'),
        options: ["Allianz Arena", "Red Bull Arena", "Stade de Salzbourg", "Stade du Tivoli"],
        correctAnswer: 1,
        explanation: "La Red Bull Arena à Salzbourg a une vue spectaculaire sur les Alpes."
      },
      {
        id: 3,
        question: "Quel stade est construit dans une carrière?",
        image: require('../../assets/images/terrains/braga_stadium.jpeg'),
        options: ["Estádio Municipal de Braga", "Estadio de la Cerámica", "Stade Geoffroy-Guichard", "Stade de la Mosson"],
        correctAnswer: 0,
        explanation: "L'Estádio Municipal de Braga au Portugal est construit dans une carrière."
      },
      {
        id: 4,
        question: "Où se trouve le stade avec piscine?",
        image: require('../../assets/images/terrains/stadium_with_pool.jpeg'),
        options: ["Stade de Wrocław", "Stade de Brisbane", "Stade de Singapour", "Stade de Dubaï"],
        correctAnswer: 0,
        explanation: "Le Stade Municipal de Wrocław en Pologne a une piscine sur le toit."
      },
      {
        id: 5,
        question: "Quel stade a une forme de vaisseau spatial?",
        image: require('../../assets/images/terrains/spaceship_stadium.jpeg'),
        options: ["Stade Al Janoub", "Stade Education City", "Stade Khalifa International", "Stade Lusail"],
        correctAnswer: 0,
        explanation: "Le Stade Al Janoub au Qatar a la forme d'un vaisseau spatial."
      },
      {
        id: 6,
        question: "Où se trouve le stade avec toit en toile?",
        image: require('../../assets/images/terrains/fabric_roof_stadium.jpeg'),
        options: ["Stade de Munich", "Stade de Denver", "Stade de Minneapolis", "Stade d'Atlanta"],
        correctAnswer: 2,
        explanation: "L'U.S. Bank Stadium à Minneapolis a un toit en toile translucide."
      },
      {
        id: 7,
        question: "Quel stade est construit sur un ancien dépotoir?",
        image: require('../../assets/images/terrains/landfill_stadium.jpeg'),
        options: ["Stade Emirates", "Stade Tottenham", "Stade de l'Arsenal", "Stade de Manchester City"],
        correctAnswer: 1,
        explanation: "Le Tottenham Hotspur Stadium est construit sur un ancien dépotoir."
      },
      {
        id: 8,
        question: "Où se trouve le stade avec piste de ski?",
        image: require('../../assets/images/terrains/ski_jump_stadium.jpeg'),
        options: ["Bergisel", "Holmenkollen", "Stade de Lillehammer", "Stade de Vancouver"],
        correctAnswer: 0,
        explanation: "Le Bergisel en Autriche combine un tremplin de ski et un stade."
      },
      {
        id: 9,
        question: "Quel stade a la forme d'un diamant?",
        image: require('../../assets/images/terrains/diamond_stadium.jpeg'),
        options: ["Miner Park", "Dodger Stadium", "Coors Field", "Petco Park"],
        correctAnswer: 0,
        explanation: "Le Miner Park au Colorado a la forme d'un diamant de baseball."
      },
      {
        id: 10,
        question: "Quel stade a jouer le barea de Madagascard?",
        image: require('../../assets/images/terrains/mahamasina_stade.jpeg'),
        options: ["Tromsø", "Barika Dimy", "Mahamasina", "Ampasambazaha"],
        correctAnswer: 0,
        explanation: "Le stade de barea est Mahamasina."
      }
    ]
  };

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
        {/* Image du terrain */}
        <View style={styles.imageContainer}>
          <Image 
            source={currentQ.image || require('../../assets/images/default_terrain.jpeg')}
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
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
    marginHorizontal: 20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
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
    borderColor: '#1e90ff',
    marginBottom: 20,
    flexDirection: 'row',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e90ff',
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
    backgroundColor: '#1e90ff',
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

export default QuizTerrainScreen;