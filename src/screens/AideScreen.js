import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from 'react-native';

const AideScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Guide du Jeu</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Comment jouer?</Text>
        <Text style={styles.text}>
          1. Choisissez un mode de jeu (Terrain, Joueur, Logo, Drapeau){'\n'}
          2. Sélectionnez un niveau (10 niveaux disponibles){'\n'}
          3. Répondez aux questions en 30 secondes{'\n'}
          4. Obtenez 15/20 pour débloquer le niveau suivant{'\n'}
          5. Progressez jusqu'au niveau 10!
        </Text>

        <Text style={styles.sectionTitle}>Règles du jeu</Text>
        <Text style={styles.text}>
          • Chaque niveau contient 10 questions{'\n'}
          • Chaque question rapporte 2 points{'\n'}
          • Score maximum par niveau: 20 points{'\n'}
          • Nécessite 15 points pour débloquer le niveau suivant{'\n'}
          • Timer de 30 secondes par question{'\n'}
          • Pas de connexion internet nécessaire
        </Text>

        <Text style={styles.sectionTitle}>Conseils</Text>
        <Text style={styles.text}>
          • Prenez votre temps pour répondre{'\n'}
          • Lisez bien les explications{'\n'}
          • Entraînez-vous régulièrement{'\n'}
          • Revoyez les questions ratées{'\n'}
          • Amusez-vous en apprenant!
        </Text>

        <Text style={styles.goodLuck}>Bon jeu et bonne chance! ⚽</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  goodLuck: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e90ff',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
});

export default AideScreen;