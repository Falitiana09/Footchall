import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
  Image
} from 'react-native';

const AccueilScreen = ({ navigation }) => {
  const gameModes = [
    {
      id: 1,
      title: "Terrain",
      description: "Deviner les stades de football",
      image: require('../../assets/images/terrain_icon.jpeg'), // Sary terrain
      niveaux: 10,
      questions: 20
    },
    {
      id: 2,
      title: "Joueur",
      description: "Reconnaître les joueurs de football",
      image: require('../../assets/images/joueur_icon.jpeg'), // Sary joueur
      niveaux: 10,
      questions: 20
    },
    {
      id: 3,
      title: "Logo de Club",
      description: "Identifier les logos des clubs",
      image: require('../../assets/images/logo_icon.jpeg'), // Sary logo
      niveaux: 10,
      questions: 20
    },
    {
      id: 4,
      title: "Drapeau du Pays",
      description: "Reconnaître les drapeaux des nations",
      image: require('../../assets/images/drapeau_icon.jpeg'), // Sary drapeau
      niveaux: 10,
      questions: 20
    }
  ];

  return (
    <ImageBackground 
      source={require('../../assets/images/football_terrain.jpeg')}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <View style={styles.container}>
        {/* Header avec le titre du jeu */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/logo_app.jpg')} 
            style={styles.logoImage}
          />
          <Text style={styles.gameTitle}>FootEmilGame</Text>
          <Text style={styles.gameSubtitle}>Challenge Football</Text>
        </View>

        {/* Section principale avec les modes de jeu */}
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>CHOISISSEZ UN MODE</Text>
          
          <ScrollView 
            style={styles.gamesScroll}
            showsVerticalScrollIndicator={false}
          >
            {gameModes.map((game) => (
              <TouchableOpacity 
                key={game.id}
                style={styles.gameCard}
                onPress={() => {
                  if (game.id === 1) { // Terrain
                    navigation.navigate('TerrainScreen', { gameMode: game });
                  } else if (game.id === 2) { // Joueur
                    navigation.navigate('JouerScreen', { gameMode: game });
                  } else if (game.id === 3) { // Logo de Club
                    navigation.navigate('LogoScreen', { gameMode: game });
                  } else if (game.id === 4) { // Drapeau du Pays
                    navigation.navigate('DrapeauScreen', { gameMode: game });
                  }
                }}
              >
                <View style={styles.gameHeader}>
                  <Image 
                    source={game.image} 
                    style={styles.gameImage}
                  />
                  <View style={styles.gameTextContainer}>
                    <Text style={styles.gameTitleText}>{game.title}</Text>
                    <Text style={styles.gameDescription}>{game.description}</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Niv. {game.niveaux}</Text>
                  </View>
                </View>
                
                <View style={styles.gameInfo}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{game.questions} questions</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>Difficulté progressive</Text>
                  </View>
                </View>
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '0%' }]} />
                  </View>
                  <Text style={styles.progressText}>Non commencé</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Footer avec Paramètres */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Parametres')}
          >
            <Image 
              source={require('../../assets/images/settings_icon.png')} 
              style={styles.settingsIcon}
            />
            <Text style={styles.settingsText}>Paramètres</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  gameTitle: {
    fontSize: 32,
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  gameSubtitle: {
    fontSize: 16,
    color: '#1e90ff',
    fontWeight: '600',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
    opacity: 0.9,
  },
  gamesScroll: {
    flex: 1,
  },
  gameCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  gameImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  gameTextContainer: {
    flex: 1,
  },
  gameTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  gameDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 16,
  },
  badge: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  settingsIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 100,
  },
  settingsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AccueilScreen;