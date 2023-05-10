import { CardResponse } from '../services/web-service/interfaces'
import { CardType } from '../interfaces/card-type'

export class Card {
  name: string
  type: string
  subtitle: string
  body: string
  flavor: string
  victoryPoints: number
  ownedById: number | null

  constructor({
    name = '',
    type = 'stage_1' as CardType,
    subtitle = '',
    body = '',
    flavor = '',
    victoryPoints = 0,
    ownedById = null as number | null,
  } = {}) {
    this.name = name
    this.type = type
    this.subtitle = subtitle
    this.body = body
    this.flavor = flavor
    this.victoryPoints = victoryPoints
    this.ownedById = ownedById
  }

  static fromJson(cardResponse: CardResponse): Card {
    return new Card({
      name: cardResponse.name,
      type: cardResponse.type,
      subtitle: cardResponse.subtitle,
      body: cardResponse.body,
      flavor: cardResponse.flavor,
      victoryPoints: cardResponse.victory_points,
      ownedById: cardResponse.owned_by,
    })
  }
}
