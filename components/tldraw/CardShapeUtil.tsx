import {
	HTMLContainer,
	Rectangle2d,
	ShapeUtil,
	TLOnResizeHandler,
	getDefaultColorTheme,
	resizeBox,
} from '@tldraw/tldraw'
import { useState } from 'react'
import { cardShapeMigrations } from './card-shape-migrations'
import { cardShapeProps } from './card-shape-props'
import { ICardShape } from './card-shape-types'
import {
	APIProvider,
	Map
} from '@vis.gl/react-google-maps'

export class CardShapeUtil extends ShapeUtil<ICardShape> {
	static override type = 'card' as const
	static override props = cardShapeProps
	static override migrations = cardShapeMigrations

	override isAspectRatioLocked = (_shape: ICardShape) => false
	override canResize = (_shape: ICardShape) => true
	override canBind = (_shape: ICardShape) => true

	getDefaultProps(): ICardShape['props'] {
		return {
			w: 300,
			h: 300,
			color: 'black',
			weight: 'regular',
			lat: 53.54992,
			lng: 10.00678,
			zoom: 13
		}
	}

	getGeometry(shape: ICardShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	component(shape: ICardShape) {
		const bounds = this.editor.getShapeGeometry(shape).bounds
		const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.isDarkMode })

		return (
			<HTMLContainer
				id={shape.id}
				style={{
					border: '1px solid black',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					pointerEvents: 'all',
					backgroundColor: theme[shape.props.color].semi,
					fontWeight: shape.props.weight,
					color: theme[shape.props.color].solid,
					overflow: 'stretch',
				}}
			>
				{/* <h1>hi</h1>
				<APIProvider
					apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
				>
					<div style={{ height: "100%", width: "100%"}}>
						<Map
							zoom={shape.props.zoom}
							center={{lat: shape.props.lat, lng: shape.props.lng}}
						/>
					</div>
				</APIProvider> */}
			</HTMLContainer>
		)
	}

	indicator(shape: ICardShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}

	// Events
	override onResize: TLOnResizeHandler<ICardShape> = (shape, info) => {
		return resizeBox(shape, info)
	}
}