import { PlanetResponse } from '../services/web-service/interfaces'

export class Planet {
  id: string
  name: string
  influence: number
  resource: number

  constructor({ id = '', name = '', influence = 0, resource = 0 } = {}) {
    this.id = id
    this.name = name
    this.influence = influence
    this.resource = resource
  }

  static fromJson(planetResponse: PlanetResponse): Planet {
    return new Planet({
      id: planetResponse.id,
      name: planetResponse.name,
      influence: planetResponse.influence,
      resource: planetResponse.resource,
    })
  }
}
