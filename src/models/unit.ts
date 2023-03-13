import { UnitResponse } from '../services/web-service/interfaces'

export class Unit {
  systemId: number

  constructor({ systemId = 0 } = {}) {
    this.systemId = systemId
  }

  static fromJson(unitResponse: UnitResponse): Unit {
    return new Unit({
      systemId: unitResponse.system,
    })
  }
}
