import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';

const DrapeauScreen = ({ navigation }) => {
  const [niveaux, setNiveaux] = useState([
    { id: 1, nom: "Niveau 1 - Europe de l'Ouest", debloque: true, score: null, questions: 10 },
    { id: 2, nom: "Niveau 2 - Europe du Sud", debloque: false, score: null, questions: 10 },
    { id: 3, nom: "Niveau 3 - Europe du Nord", debloque: false, score: null, questions: 10 },
    { id: 4, nom: "Niveau 4 - Amérique du Nord", debloque: false, score: null, questions: 10 },
    { id: 5, nom: "Niveau 5 - Amérique du Sud", debloque: false, score: null, questions: 10 },
    { id: 6, nom: "Niveau 6 - Afrique du Nord", debloque: false, score: null, questions: 10 },
    { id: 7, nom: "Niveau 7 - Afrique subsaharienne", debloque: false, score: null, questions: 10 },
    { id: 8, nom: "Niveau 8 - Asie de l'Est", debloque: false, score: null, questions: 10 },
    { id: 9, nom: "Niveau 9 - Moyen-Orient", debloque: false, score: null, questions: 10 },
    { id: 10, nom: "Niveau 10 - Océanie & Caraïbes", debloque: false, score: null, questions: 10 }
  ]);

  const demarrerNiveau = (niveau) => {
    if (!niveau.debloque) {
      Alert.alert(
        "Niveau Verrouillé",
        "Vous devez obtenir au moins 15/20 au niveau précédent pour débloquer ce niveau.",
        [{ text: "OK" }]
      );
      return;
    }

    navigation.navigate('QuizDrapeau', { 
      niveau: niveau,
      onQuizFinish: (score) => handleQuizFinish(niveau.id, score)
    });
  };

  const handleQuizFinish = (niveauId, score) => {
    const nouveauNiveaux = [...niveaux];
    const niveauIndex = niveauId - 1;
    
    // Mettre à jour le score du niveau actuel
    nouveauNiveaux[niveauIndex].score = score;
    
    // Débloquer le niveau suivant si score >= 15/20
    if (score >= 15 && niveauId < 10) {
      nouveauNiveaux[niveauIndex + 1].debloque = true;
      Alert.alert(
        "Félicitations! 🎉",
        `Score: ${score}/20\nNiveau ${niveauId + 1} débloqué!`,
        [{ text: "Continuer" }]
      );
    } else if (score < 15 && niveauId < 10) {
      Alert.alert(
        "Quiz Terminé",
        `Score: ${score}/20\nIl vous faut 15/20 pour débloquer le niveau suivant.`,
        [{ text: "Réessayer" }]
      );
    }
    
    setNiveaux(nouveauNiveaux);
  };

  const getStatusNiveau = (niveau) => {
    if (!niveau.debloque) {
      return { text: "🔒 Verrouillé", color: "#999", bgColor: "#f0f0f0" };
    }
    if (niveau.score === null) {
      return { text: "📝 Commencer", color: "#4caf50", bgColor: "#e8f5e8" };
    }
    if (niveau.score >= 15) {
      return { text: `✅ ${niveau.score}/20`, color: "#4caf50", bgColor: "#e8f5e8" };
    }
    return { text: `❌ ${niveau.score}/20`, color: "#f44336", bgColor: "#ffebee" };
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/drapeau_bg.png')}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🇲🇬</Text>
          </View>
          <Text style={styles.title}>Drapeau du Pays</Text>
          <Text style={styles.subtitle}>Reconnaissez les drapeaux des nations</Text>
        </View>

        {/* Section principale */}
        <View style={styles.mainContent}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {niveaux.filter(n => n.score !== null).length}
              </Text>
              <Text style={styles.statLabel}>Niveaux complétés</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {niveaux.filter(n => n.score >= 15).length}
              </Text>
              <Text style={styles.statLabel}>Niveaux réussis</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {niveaux.reduce((total, n) => total + (n.score || 0), 0)}
              </Text>
              <Text style={styles.statLabel}>Points totaux</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>PROGRESSION DES NIVEAUX</Text>
          
          <ScrollView 
            style={styles.niveauxScroll}
            showsVerticalScrollIndicator={false}
          >
            {niveaux.map((niveau) => {
              const status = getStatusNiveau(niveau);
              return (
                <TouchableOpacity 
                  key={niveau.id}
                  style={[
                    styles.niveauCard,
                    { backgroundColor: status.bgColor }
                  ]}
                  onPress={() => demarrerNiveau(niveau)}
                >
                  <View style={styles.niveauHeader}>
                    <View style={styles.niveauInfo}>
                      <Text style={styles.niveauNom}>{niveau.nom}</Text>
                      <Text style={styles.niveauDetails}>
                        {niveau.questions} questions • Difficulté: {niveau.id}/10
                      </Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
                      <Text style={styles.statusText}>{status.text}</Text>
                    </View>
                  </View>
                  
                  {niveau.score !== null && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill,
                            { width: `${(niveau.score / 20) * 100}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {niveau.score >= 15 ? "✅ Niveau réussi" : "❌ Niveau échoué"}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Retour à l'accueil</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.39)',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4caf50',
    textAlign: 'center',
    opacity: 0.9,
  },
  mainContent: {
    flex: 1,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  niveauxScroll: {
    flex: 1,
  },
  niveauCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  niveauHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  niveauInfo: {
    flex: 1,
  },
  niveauNom: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  niveauDetails: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'right',
  },
  footer: {
    paddingTop: 10,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DrapeauScreen;