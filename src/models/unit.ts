import { UnitResponse } from '../services/web-service/interfaces'
import { UnitType } from '../interfaces/unit-type'

export class Unit {
  systemId: number
  type: UnitType

  constructor({ systemId = 0, type = 'flagship' as UnitType } = {}) {
    this.systemId = systemId
    this.type = type
  }

  static fromJson(unitResponse: UnitResponse): Unit {
    return new Unit({
      systemId: unitResponse.system,
      type: unitResponse.type,
    })
  }
}
