import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import Test4 from './Test4'

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, { ssr: false })

function Test() {
    return (
        <div>
            test
        </div>
    )
}

const components = {
    OnTheCanvas: Test,
    // InFrontOfTheCanvas: MyComponentInFront,
    SnapLine: null
}

export default function WhiteBoard() {
    return (
        <div
            style={{ position: 'fixed', inset: 0}}
        >
            <Tldraw
                components={{components}}
            />
        </div>
    )
}