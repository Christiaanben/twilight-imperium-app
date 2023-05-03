import {CardResponse} from '../services/web-service/interfaces'
import {CardType} from "../interfaces/card-type";

export class Card {
    name: string
    type: string
    victoryPoints: number

    constructor({ name = '', type = 'stage_1' as CardType, victoryPoints = 0 } = {}) {
        this.name = name
        this.type = type
        this.victoryPoints = victoryPoints
    }

    static fromJson(cardResponse: CardResponse): Card {
        return new Card({
            name: cardResponse.name,
            type: cardResponse.type,
            victoryPoints: cardResponse.victory_points,
        })
    }
}
