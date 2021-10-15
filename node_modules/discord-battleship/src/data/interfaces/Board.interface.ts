export default interface Board {
    data: string;
    ship: string;
    cords: { 
        letter: string;
        number: number;
        cord: string;
    }
}