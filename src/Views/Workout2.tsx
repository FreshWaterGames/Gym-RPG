import React, { useEffect, useState } from "react";
import { Animated, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { WorkoutData } from '../Classes/calender.types';
import { MuscleGroup, User } from '../Classes/user.types';
import { setWorkoutData, updateCalender } from '../Helper/calenderHelper';
import { updateStats } from "../Helper/userHelper";
import { darkStyles } from "../styles";

export const Workout2 = ({curUser, setCurUser}: {curUser : User, setCurUser : (user: User) => void}) => {
    const [currView, setCurrView] = useState<number>(0);
    const [slideAnim] = useState(new Animated.Value(0));
    
    // Workout form states
    const [selectedMuscle, setSelectedMuscle] = useState<string>('');
    const [setsVal, setSetsVal] = useState('');
    const [repsVal, setRepVal] = useState('');
    const [weightVal, setWeightVal] = useState('');

    // Calendar states
    const [selectedDate, setSelectedDate] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    });
    const [markedDates, setMarkedDates] = useState<{[key: string]: any}>({});
    const [workoutsByDate, setWorkoutsByDate] = useState<{[key: string]: WorkoutData[]}>({});

    useEffect(() => {
        const loadData = async () => {
          await setWorkoutData(workoutsByDate, setWorkoutsByDate, markedDates, setMarkedDates, selectedDate);
        };
        loadData();
    }, [selectedDate]);

    useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: currView,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
        }).start();
    }, [currView]);

    const isFormValid = selectedMuscle && setsVal && repsVal && weightVal;

    const handleUpdate = () => {
        if (!isFormValid) return;

        const finalVal = finalCalc(setsVal, repsVal, weightVal);
        const newMuscleValue = Number(curUser.stats[selectedMuscle as keyof MuscleGroup] + finalVal);

        updateStats(curUser, setCurUser, newMuscleValue, selectedMuscle);
        updateCalender(selectedMuscle, setsVal, repsVal, weightVal, workoutsByDate, setWorkoutsByDate, markedDates, setMarkedDates);
        
        // Clear form
        setSetsVal('');
        setRepVal('');
        setWeightVal('');
        setSelectedMuscle('');
    };

    const renderWorkoutView = () => (
        <View style={darkStyles.workoutContainer}>
            {/* Muscle Selection */}
            <View style={darkStyles.section}>
                <Text style={darkStyles.sectionTitle}>Select Muscle Group</Text>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={darkStyles.muscleScrollView}
                >
                    {Object.entries(curUser.stats).map(([muscleName]) => (
                        <TouchableOpacity
                            key={muscleName}
                            style={[
                                darkStyles.muscleChip,
                                selectedMuscle === muscleName && darkStyles.muscleChipSelected
                            ]}
                            onPress={() => setSelectedMuscle(muscleName)}
                        >
                            <Text style={[
                                darkStyles.muscleChipText,
                                selectedMuscle === muscleName && darkStyles.muscleChipTextSelected
                            ]}>
                                {muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Workout Inputs */}
            <View style={darkStyles.section}>
                <Text style={darkStyles.sectionTitle}>Workout Details</Text>
                
                <View style={darkStyles.inputRow}>
                    <View style={darkStyles.inputGroup}>
                        <Text style={darkStyles.inputLabel}>Sets</Text>
                        <View style={darkStyles.inputWrapper}>
                            <TextInput 
                                style={darkStyles.input}
                                placeholder="0"
                                placeholderTextColor="#6B7280"
                                keyboardType="numeric"
                                value={setsVal}
                                onChangeText={setSetsVal}
                            />
                        </View>
                    </View>

                    <View style={darkStyles.inputGroup}>
                        <Text style={darkStyles.inputLabel}>Reps</Text>
                        <View style={darkStyles.inputWrapper}>
                            <TextInput 
                                style={darkStyles.input}
                                placeholder="0"
                                placeholderTextColor="#6B7280"
                                keyboardType="numeric"
                                value={repsVal}
                                onChangeText={setRepVal}
                            />
                        </View>
                    </View>

                    <View style={darkStyles.inputGroup}>
                        <Text style={darkStyles.inputLabel}>Weight</Text>
                        <View style={darkStyles.inputWrapper}>
                            <TextInput 
                                style={darkStyles.input}
                                placeholder="0"
                                placeholderTextColor="#6B7280"
                                keyboardType="numeric"
                                value={weightVal}
                                onChangeText={setWeightVal}
                            />
                        </View>
                        <Text style={darkStyles.unitLabel}>lbs</Text>
                    </View>
                </View>
            </View>

            {/* Update Button */}
            <TouchableOpacity 
                style={[
                    darkStyles.updateButton,
                    !isFormValid && darkStyles.updateButtonDisabled
                ]}
                onPress={handleUpdate}
                disabled={!isFormValid}
            >
                <Text style={darkStyles.updateButtonText}>
                    {isFormValid ? '✓ Log Workout' : 'Fill All Fields'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderCalendarView = () => (
        <View style={darkStyles.calendarContainer}>
            <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{
                    ...markedDates,
                    [selectedDate]: { 
                        selected: true, 
                        selectedColor: '#4A90E2'
                    }
                }}
                theme={{
                    backgroundColor: '#0a0e1a',
                    calendarBackground: '#1a1f35',
                    textSectionTitleColor: '#9CA3AF',
                    selectedDayBackgroundColor: '#4A90E2',
                    selectedDayTextColor: '#fff',
                    todayTextColor: '#FF6B35',
                    dayTextColor: '#fff',
                    textDisabledColor: '#4B5563',
                    arrowColor: '#4A90E2',
                    monthTextColor: '#fff',
                    textMonthFontWeight: '700',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                }}
                style={darkStyles.calendar}
            />
            
            <View style={darkStyles.workoutListContainer}>
                <Text style={darkStyles.dateHeader}>{selectedDate}</Text>
                
                {workoutsByDate[selectedDate] && workoutsByDate[selectedDate].length > 0 ? (
                    <ScrollView 
                        style={darkStyles.workoutList}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                    >
                        {workoutsByDate[selectedDate].map((workout, index) => (
                            <View key={index} style={darkStyles.workoutCard}>
                                <View style={darkStyles.workoutHeader}>
                                    <Text style={darkStyles.workoutMuscle}>
                                        {workout.muscle.charAt(0).toUpperCase() + workout.muscle.slice(1)}
                                    </Text>
                                    <View style={darkStyles.workoutBadge}>
                                        <Text style={darkStyles.workoutBadgeText}>Completed</Text>
                                    </View>
                                </View>
                                <View style={darkStyles.workoutStats}>
                                    <View style={darkStyles.statItem}>
                                        <Text style={darkStyles.statValue}>{workout.sets}</Text>
                                        <Text style={darkStyles.statLabel}>Sets</Text>
                                    </View>
                                    <View style={darkStyles.statDivider} />
                                    <View style={darkStyles.statItem}>
                                        <Text style={darkStyles.statValue}>{workout.reps}</Text>
                                        <Text style={darkStyles.statLabel}>Reps</Text>
                                    </View>
                                    <View style={darkStyles.statDivider} />
                                    <View style={darkStyles.statItem}>
                                        <Text style={darkStyles.statValue}>{workout.weight}</Text>
                                        <Text style={darkStyles.statLabel}>lbs</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <View style={darkStyles.emptyState}>
                        <Text style={darkStyles.emptyStateIcon}>📊</Text>
                        <Text style={darkStyles.emptyStateText}>No workouts recorded</Text>
                        <Text style={darkStyles.emptyStateSubtext}>Start logging to track your progress!</Text>
                    </View>
                )}
            </View>
        </View>
    );

    const renderCurrentView = () => {
        switch (currView) {
            case 0:
                return renderWorkoutView();
            case 1:
                return renderCalendarView();
            default:
                return renderWorkoutView();
        }
    };

    const renderNavigationButtons = () => (
        <View style={darkStyles.tabBar}>
            <TouchableOpacity 
                style={[darkStyles.tab, currView === 0 && darkStyles.tabActive]} 
                onPress={() => setCurrView(0)}
            >
                <Text style={[darkStyles.tabText, currView === 0 && darkStyles.tabTextActive]}>
                    💪 Workout
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[darkStyles.tab, currView === 1 && darkStyles.tabActive]} 
                onPress={() => setCurrView(1)}
            >
                <Text style={[darkStyles.tabText, currView === 1 && darkStyles.tabTextActive]}>
                    📅 Calendar
                </Text>
            </TouchableOpacity>
        </View>
    );
    
    return (
            <View style={darkStyles.container}>
                {renderNavigationButtons()}
                <View style={darkStyles.content}>
                    {renderCurrentView()}
                </View>
            </View>
    );
};

const finalCalc = (sets: string, reps: string, weight: string) => {
    const setsValue = Number(sets);
    const repsValue = Number(reps);
    const weightValue = Number(weight);
    const xpMultiplier = 0.2;
    return setsValue * repsValue * weightValue * xpMultiplier;
};
