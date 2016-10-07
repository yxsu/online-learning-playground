
import {Example2D} from "./dataset"

let weight_0: number = 0;
let weight_x: number = 0;
let weight_y: number = 0;


export function adjust(input: Example2D) {
    if(input.label != predict(input.x, input.y)) {
        weight_0 = weight_0 + input.label;
        weight_x = weight_x + input.label * input.x;
        weight_y = weight_y + input.label * input.y;
    }
}

export function predict(x: number, y: number): number {
    let value = weight_0 + weight_x * x + weight_y * y;
    if(value >= 0) {
        return 1;
    } else {
        return -1;
    }
}

export function getLoss(inputs: Example2D[]): number {
    let loss = 0;
    for(let i = 0; i < inputs.length; i++) {
        let data = inputs[i];
        if(data.label != predict(data.x, data.y)) {
            loss += 2;
        }
    }
    return loss;
}