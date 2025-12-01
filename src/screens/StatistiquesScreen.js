import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from 'react-native';

const StatistiquesScreen = ({ navigation }) => {
  const stats = {
    totalPoints: 0,
    niveauxCompletes: 0,
    meilleurScore: 0,
    tempsJoue: "0h 00min",
    questionsRepondues: 0,
    tauxReussite: "0%"
  };

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
        <Text style={styles.title}>Statistiques</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalPoints}</Text>
            <Text style={styles.statLabel}>Points totaux</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.niveauxCompletes}</Text>
            <Text style={styles.statLabel}>Niveaux complétés</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.meilleurScore}</Text>
            <Text style={styles.statLabel}>Meilleur score</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.tempsJoue}</Text>
            <Text style={styles.statLabel}>Temps joué</Text>
          </View>
        </View>

        <View style={styles.detailedStats}>
          <Text style={styles.detailedTitle}>Détails par mode</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Terrain</Text>
            <Text style={styles.detailValue}>0/10 niveaux</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Joueur</Text>
            <Text style={styles.detailValue}>0/10 niveaux</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Logo de Club</Text>
            <Text style={styles.detailValue}>0/10 niveaux</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Drapeau du Pays</Text>
            <Text style={styles.detailValue}>0/10 niveaux</Text>
          </View>
        </View>

        <Text style={styles.encouragement}>
          Commencez à jouer pour remplir vos statistiques! ⚽
        </Text>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  detailedStats: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  detailedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e90ff',
  },
  encouragement: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    fontStyle: 'italic',
  },
});

export default StatistiquesScreen;