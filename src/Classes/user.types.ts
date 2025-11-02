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

export interface User {
    id: string;
    username: string;
    stats: MuscleGroup;
    level: number,
    heatlh: number,
    xpToLevel: number,
    
}