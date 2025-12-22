import { StyleSheet } from 'react-native';


//#007AFF Light Blue Color
//#0f172a Dark Blue

export const styles = StyleSheet.create({
    userInfo: {
        flex: 1,
        flexDirection: 'column',
        color: 'black',
    },

    nameTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 8,
    },

    statsInfo: {
        flex: 1,
        padding: 30,
        borderRadius: 40,
        borderWidth: 20,
        borderColor: '#0f172a',
        borderBlockColor: '#0f172a',
        backgroundColor: 'white',
        height: '60%'
    },

    statsTxt: {
        fontSize: 24,
        padding: 5,
        fontWeight: 'bold',
        color: '#0f172a'
    },
    
    tabs: {
        position: 'absolute',
        bottom: '5%',
        backgroundColor: '#0f172a',
        flexDirection: "row",
        padding: 13,
        borderColor: 'white',
        borderRadius: 50,
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'space-around'
    },
    
    tabsButton: {
        margin: 5,
        padding: 5,
        backgroundColor: '#007AFF',
        borderRadius: 12
        
    },

    tabsButtonTxt: {
    color: 'white',
    fontSize: 18,
    padding: 1
    },

    updateButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
    
    },

    updateButtonTxt: {
    color: 'white',
    fontSize: 40,
    padding: 1
    },

    pfp: {
        width: 75, 
        height: 75 ,      
        borderRadius: 50, 
        borderWidth: 2,       
        borderColor: 'white'
    },

    coin: {
        top: 5,
        left: 5,
        width: 30, 
        height: 30 ,      
        borderRadius: 50, 
        borderWidth: 2,       
        borderColor: 'white'
    },

    xpBar:{
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 10,
        height: 25,
        width: '90%',        // Full width of parent
        maxWidth: 300,
        zIndex: 0,
        position: 'relative'
    },
    xpText:{
        color: 'white',
        fontSize: 15,
        fontStyle: 'italic',
        position: 'relative',
        right: '0%',
        left: '45%',
        bottom: '90%'
    },
    xpText2:{
        color: 'black',
        fontSize: 15,
        fontStyle: 'italic',
        position: 'relative',
        right: '0%',
        left: '45%',
        bottom: '90%'
    },
    input: {
        height: 40,
        width: '22.22%',
        margin: 20,
        borderWidth: 5,
        padding: 10,
    },
    
    checkBox: {
        flexDirection: 'row',
        padding: 3, 
        width: '33.33%',
        alignItems: 'center'
    },

    checkboxTxt: {
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold',
        color: '#0f172a'
    },

    fadeView: {
        alignSelf: 'center',
        borderRadius: 20,
        color: 'white',
        backgroundColor: 'white'
    },

    fadeText: {
        fontSize: 15,
        padding: 10
    },

    LargeWorkoutButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 100
    },

    workoutEntires: {
        backgroundColor: '#f0f0f0', 
        padding: 15, 
        marginBottom: 10, 
        borderRadius: 8 
    },

    statXPbackground: {
        width: "60%",
        height: 25,
        zIndex: 0,
        borderWidth: 1,
    },

});

export const tabBarStyles = StyleSheet.create({
    container: {
      position: 'absolute' as const,
      bottom: 20,
      left: 0,
      right: 0,
      alignItems: 'center' as const,
      paddingHorizontal: 20,
      flex: 1,
    },
    tabBar: {
      flexDirection: 'row' as const,
      backgroundColor: '#1a1f35',
      borderRadius: 28,
      padding: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      width: '100%',
      maxWidth: 500,
    },
    tab: {
      flex: 1,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 20,
      gap: 4,
    },
    tabActive: {
      backgroundColor: '#4A90E2',
      shadowColor: '#4A90E2',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 6,
    },
    tabIcon: {
      fontSize: 20,
    },
    tabText: {
      fontSize: 12,
      fontWeight: '600' as const,
      color: '#6B7280',
    },
    tabTextActive: {
      color: '#fff',
      fontWeight: '700' as const,
    },
  });
  

  export const enhancedStatsStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0a0e1a',
    },
  
    // Header Card
    headerCard: {
      backgroundColor: '#1a1f35',
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      paddingTop: 16,
      paddingBottom: 24,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  
    profileSection: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    },
  
    avatarContainer: {
      position: 'relative' as const,
      marginRight: 16,
    },
  
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      borderWidth: 4,
      borderColor: '#4A90E2',
    },
  
    levelBadge: {
      position: 'absolute' as const,
      bottom: -4,
      right: -4,
      backgroundColor: '#FF6B35',
      borderRadius: 16,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 3,
      borderColor: '#1a1f35',
    },
  
    levelBadgeText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '800' as const,
    },
  
    userInfo: {
      flex: 1,
    },
  
    username: {
      color: '#fff',
      fontSize: 26,
      fontWeight: '700' as const,
      marginBottom: 12,
    },
  
    statsRow: {
      flexDirection: 'row' as const,
      marginBottom: 12,
      gap: 12,
    },
  
    statPill: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      backgroundColor: 'rgba(74, 144, 226, 0.15)',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(74, 144, 226, 0.3)',
      gap: 6,
    },
  
    statLabel: {
      color: '#4A90E2',
      fontSize: 13,
      fontWeight: '700' as const,
      letterSpacing: 0.5,
    },
  
    statValue: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700' as const,
    },
  
    coinIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
    },
  
    // XP Bar
    xpBarContainer: {
      marginTop: 4,
    },
  
    xpLabel: {
      color: '#9CA3AF',
      fontSize: 12,
      fontWeight: '600' as const,
      marginBottom: 6,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.5,
    },
  
    xpBarOuter: {
      height: 28,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: 14,
      overflow: 'hidden' as const,
      position: 'relative' as const,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
  
    xpBarInner: {
      position: 'absolute' as const,
      top: 0,
      bottom: 0,
      left: 0,
      backgroundColor: '#FF6B35',
      borderRadius: 14,
      shadowColor: '#FF6B35',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 8,
    },
  
    xpText: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      textAlign: 'center' as const,
      lineHeight: 28,
      color: '#fff',
      fontSize: 13,
      fontWeight: '700' as const,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
  
    // Muscle Stats
    muscleStatsContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 24,
    },
  
    sectionTitle: {
      color: '#fff',
      fontSize: 22,
      fontWeight: '700' as const,
      marginBottom: 16,
    },
  
    scrollView: {
      flex: 1,
    },
  
    muscleCard: {
      backgroundColor: '#1a1f35',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
  
    muscleHeader: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      marginBottom: 12,
    },
  
    muscleName: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600' as const,
    },
  
    muscleLevelBadge: {
      backgroundColor: 'rgba(74, 144, 226, 0.2)',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(74, 144, 226, 0.4)',
    },
  
    muscleLevelText: {
      color: '#4A90E2',
      fontSize: 14,
      fontWeight: '700' as const,
    },
  
    muscleXPContainer: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 12,
    },
  
    muscleXPBar: {
      flex: 1,
      height: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: 12,
      overflow: 'hidden' as const,
      position: 'relative' as const,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
  
    muscleXPFill: {
      position: 'absolute' as const,
      top: 0,
      bottom: 0,
      left: 0,
      backgroundColor: '#4CAF50',
      borderRadius: 12,
    },
  
    muscleXPText: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      textAlign: 'center' as const,
      lineHeight: 24,
      color: '#fff',
      fontSize: 11,
      fontWeight: '600' as const,
      textShadowColor: 'rgba(0, 0, 0, 0.7)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
  
    progressIndicator: {
      alignItems: 'center' as const,
      gap: 2,
    },
  
    progressDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#4CAF50',
      shadowColor: '#4CAF50',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
    },
  
    progressPercent: {
      color: '#9CA3AF',
      fontSize: 11,
      fontWeight: '600' as const,
    },
  });

  export const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0e1a',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    
    // Tab Bar
    tabBar: {
        flexDirection: 'row' as const,
        backgroundColor: '#1a1f35',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        paddingTop: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center' as const,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    tabActive: {
        borderBottomColor: '#4A90E2',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#6B7280',
    },
    tabTextActive: {
        color: '#fff',
        fontWeight: '700' as const,
    },

    // Workout View
    workoutContainer: {
        flex: 1,
    },
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#fff',
        marginBottom: 16,
    },
    
    // Muscle Selection
    muscleScrollView: {
        flexGrow: 0,
    },
    muscleChip: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    muscleChipSelected: {
        backgroundColor: '#4A90E2',
        borderColor: '#4A90E2',
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 4,
    },
    muscleChipText: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#9CA3AF',
    },
    muscleChipTextSelected: {
        color: '#fff',
        fontWeight: '700' as const,
    },

    // Inputs
    inputRow: {
        flexDirection: 'row' as const,
        gap: 12,
    },
    inputGroup: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#9CA3AF',
        marginBottom: 8,
        textTransform: 'uppercase' as const,
        letterSpacing: 0.5,
    },
    inputWrapper: {
        backgroundColor: '#1a1f35',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 24,
        fontWeight: '700' as const,
        color: '#fff',
        textAlign: 'center' as const,
    },
    unitLabel: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center' as const,
        marginTop: 4,
    },

    // Update Button
    updateButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: 'center' as const,
        marginTop: 12,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    updateButtonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(255, 255, 255, 0.05)',
        shadowOpacity: 0,
        elevation: 0,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700' as const,
        letterSpacing: 0.5,
    },

    // Calendar View
    calendarContainer: {
        flexGrow: 0,
    },
    calendar: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden' as const,
    },
    workoutListContainer: {
        flex: 0,
        marginTop: 5
    },
    dateHeader: {
        fontSize: 22,
        fontWeight: '700' as const,
        color: '#fff',
        textAlign: 'center' as const,
        marginBottom: 16,
    },
    workoutList: {
        flex: 1,
        paddingBottom: 300,
    },
    workoutCard: {
        backgroundColor: '#1a1f35',
        borderRadius: 16,
        padding: 18,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    workoutHeader: {
        flexDirection: 'row' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center' as const,
        marginBottom: 16,
    },
    workoutMuscle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#fff',
    },
    workoutBadge: {
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.3)',
    },
    workoutBadgeText: {
        color: '#4CAF50',
        fontSize: 12,
        fontWeight: '700' as const,
    },
    workoutStats: {
        flexDirection: 'row' as const,
        justifyContent: 'space-around' as const,
        alignItems: 'center' as const,
    },
    statItem: {
        alignItems: 'center' as const,
        flex: 1,
    },
    statValue: {
        fontSize: 28,
        fontWeight: '800' as const,
        color: '#4A90E2',
    },
    statLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 4,
        fontWeight: '600' as const,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        paddingVertical: 60,
    },
    emptyStateIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    emptyStateText: {
        fontSize: 18,
        color: '#9CA3AF',
        fontWeight: '600' as const,
        marginBottom: 6,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#6B7280',
    },
});