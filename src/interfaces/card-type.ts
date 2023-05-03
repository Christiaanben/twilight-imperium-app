export const CARD_TYPE = [
    'action',
    'stage_1',
    'stage_2',
    'secret',
    'agenda',
    'promissory',
] as const
export type CardType = typeof CARD_TYPE[number]
