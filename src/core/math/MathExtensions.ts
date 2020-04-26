interface Math {
    clamp(value: number, min: number, max: number): number;
    degToRad(degress: number): number;
    radToDeg(radian: number): number;
    getRandomInInterval(min: number, max: number): number;
}

(Math as any).clamp = (value: number, min: number, max: number): number => {
    if(value < min) { return min; }
    if(value > max) { return max; }
    return value;
}

(Math as any).degToRad = (degress: number): number => {
    return degress * Math.PI / 180.0;
}

(Math as any).radToDeg = (radians: number): number => {
    return radians * 180.0 / Math.PI;
}

(Math as any).getRandomInInterval = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}