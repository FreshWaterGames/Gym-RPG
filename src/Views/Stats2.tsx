import { Image } from "expo-image";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { MuscleGroup, MuscleGroupXP, User } from "../Classes/user.types";
import { muscleXPMax } from "../Helper/userHelper";
import { enhancedStatsStyles } from "../styles";

export const Stats2 = ({
  curUser,
  setCurUser,
}: {
  curUser: User;
  setCurUser: (curUser: User) => void;
}) => {
  const xpPercentage = (curUser.xpToLevel / curUser.xpMax) * 100;

  return (
    <View style={enhancedStatsStyles.container}>
      {/* Header Card */}
      <View style={enhancedStatsStyles.headerCard}>
        <View style={enhancedStatsStyles.profileSection}>
          <View style={enhancedStatsStyles.avatarContainer}>
            <Image
              source={require("../assets/images/pfp.png")}
              style={enhancedStatsStyles.avatar}
            />
            <View style={enhancedStatsStyles.levelBadge}>
              <Text style={enhancedStatsStyles.levelBadgeText}>{curUser.level}</Text>
            </View>
          </View>

          <View style={enhancedStatsStyles.userInfo}>
            <Text style={enhancedStatsStyles.username}>{curUser.username}</Text>
            
            <View style={enhancedStatsStyles.statsRow}>
              <View style={enhancedStatsStyles.statPill}>
                <Text style={enhancedStatsStyles.statLabel}>ATK</Text>
                <Text style={enhancedStatsStyles.statValue}>{curUser.attackStat}</Text>
              </View>
              
              <View style={enhancedStatsStyles.statPill}>
                <Image 
                  source={require("../assets/images/coin.png")}
                  style={enhancedStatsStyles.coinIcon}
                />
                <Text style={enhancedStatsStyles.statValue}>{curUser.gold}</Text>
              </View>
            </View>

            {/* XP Bar */}
            <View style={enhancedStatsStyles.xpBarContainer}>
              <Text style={enhancedStatsStyles.xpLabel}>Experience</Text>
              <View style={enhancedStatsStyles.xpBarOuter}>
                <View 
                  style={[
                    enhancedStatsStyles.xpBarInner,
                    { width: `${Math.min(100, xpPercentage)}%` }
                  ]}
                />
                <Text style={enhancedStatsStyles.xpText}>
                  {curUser.xpToLevel} / {curUser.xpMax}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Muscle Stats Section */}
      <View style={enhancedStatsStyles.muscleStatsContainer}>
        <Text style={enhancedStatsStyles.sectionTitle}>Muscle Stats</Text>
        
        <ScrollView 
          style={enhancedStatsStyles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {Object.entries(curUser.stats).map(([muscleName, lvl]) => {
            const curMuscleXPMax = muscleXPMax(curUser.stats[muscleName as keyof MuscleGroup]);
            const muscleXPStr = muscleName + "XP";
            const curXP = curUser.statsXP[muscleXPStr as keyof MuscleGroupXP];
            const xpWidth = (curXP / curMuscleXPMax) * 100; // gets percentage

            return (
              <View key={muscleName} style={enhancedStatsStyles.muscleCard}>
                <View style={enhancedStatsStyles.muscleHeader}>
                  <Text style={enhancedStatsStyles.muscleName}>
                    {muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}
                  </Text>
                  <View style={enhancedStatsStyles.muscleLevelBadge}>
                    <Text style={enhancedStatsStyles.muscleLevelText}>Lv. {lvl}</Text>
                  </View>
                </View>

                <View style={enhancedStatsStyles.muscleXPContainer}>
                  <View style={enhancedStatsStyles.muscleXPBar}>
                    <View 
                      style={[
                        enhancedStatsStyles.muscleXPFill,
                        { width: `${Math.min(100, xpWidth)}%` }
                      ]}
                    />
                    <Text style={enhancedStatsStyles.muscleXPText}>
                      {curXP} / {curMuscleXPMax} XP
                    </Text>
                  </View>
                  
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

