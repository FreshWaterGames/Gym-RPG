export interface MuscleGroup{
    chest: number;
    bicep: number;
    tricep: number;
    delts: number;
    lats: number;
    traps: number;
    quads: number;
    glutes: number;
    calfs: number;
    hamstring: number;
    abs: number;
    obliques: number;
}

export interface MuscleGroupXP {
    chestXP: number;
    bicepXP: number;
    tricepXP: number;
    deltsXP: number;
    latsXP: number;
    trapsXP: number;
    quadsXP: number;
    glutesXP: number;
    calfsXP: number;
    hamstringXP: number;
    absXP: number;
    obliquesXP: number;
}

export interface User {
    id: string;
    username: string;
    stats: MuscleGroup;
    statsXP: MuscleGroupXP;
    level: number,
    heatlh: number,
    xpToLevel: number,
    xpMax: number,
    attackStat: number,
    curMuscleXP: number,
    gold: number
    
}