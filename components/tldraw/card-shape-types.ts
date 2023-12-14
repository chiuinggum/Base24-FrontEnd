import { TLBaseShape, TLDefaultColorStyle } from '@tldraw/tldraw'

export type IWeightStyle = 'regular' | 'bold'

export type ICardShape = TLBaseShape<
    'card',
    {
        w: number
        h: number
        color: TLDefaultColorStyle
        weight: IWeightStyle,
        lat: number,
        lng: number,
        zoom: number
    }
>