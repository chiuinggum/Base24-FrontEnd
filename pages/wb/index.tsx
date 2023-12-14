import dynamic from 'next/dynamic'
const WB1 = dynamic(async () => (await import('../../components/tldraw/WB1')), { ssr: false })

export default function WBPage() {
	return (
		<div className='flex flex-row'>
			<div style={{ height: "100vh", width: "20vw", zIndex: "2"}} className='border'>
				<h1>hi</h1>
				<button>hi</button>
			</div>
			<div style={{ height: "100vh", width: "80vw"}}>
				<WB1 />
			</div>
		</div>
	)
}