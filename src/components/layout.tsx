/** @format */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	ChevronDown,
	X,
} from 'lucide-react'

const LeftPanelComponent = () => (
	<div className='p-4'>
		<h2 className='text-lg font-semibold mb-2'>Left Panel</h2>
		<p>
			This is the content of the left panel. You can add your custom
			components here.
		</p>
	</div>
)

const RightPanelComponent = () => (
	<div className='p-4'>
		<h2 className='text-lg font-semibold mb-2'>Right Panel</h2>
		<p>
			This is the content of the right panel. You can add your custom
			components here.
		</p>
	</div>
)

const BottomPanelComponent = ({
	onSelectEntry,
}: {
	onSelectEntry: (index: number) => void
}) => (
	<div className='flex space-x-2 p-2'>
		{[...Array(5)].map((_, i) => (
			<Button
				key={i}
				onClick={() => onSelectEntry(i)}
				className='flex-col items-start p-2 h-auto'>
				<div className='text-xs'>{`Date ${i + 1}`}</div>
				<div>{`Entry ${i + 1}`}</div>
			</Button>
		))}
	</div>
)

export function LayoutComponent({ children }: { children: React.ReactNode }) {
	const [leftPanelVisible, setLeftPanelVisible] = useState(true)
	const [rightPanelVisible, setRightPanelVisible] = useState(true)
	const [bottomPanelVisible, setBottomPanelVisible] = useState(true)
	const [expandedEntry, setExpandedEntry] = useState<number | null>(null)

	const toggleLeftPanel = () => setLeftPanelVisible(!leftPanelVisible)
	const toggleRightPanel = () => setRightPanelVisible(!rightPanelVisible)
	const toggleBottomPanel = () => setBottomPanelVisible(!bottomPanelVisible)

	const handleSelectEntry = (index: number) => {
		setExpandedEntry(index)
	}

	if (expandedEntry !== null) {
		return (
			<div className='fixed inset-0 bg-background flex items-center justify-center'>
				<div className='text-4xl'>
					Expanded Entry {expandedEntry + 1}
				</div>
				<Button
					className='absolute top-4 right-4'
					onClick={() => setExpandedEntry(null)}>
					<X className='h-4 w-4' />
				</Button>
			</div>
		)
	}

	return (
		<div className='h-screen flex flex-col'>
			<div className='flex-1 flex'>
				{/* Left Panel */}
				{leftPanelVisible && (
					<div className='w-64 border-r'>
						<ScrollArea className='h-full'>
							<LeftPanelComponent />
						</ScrollArea>
					</div>
				)}
				<Button
					className='absolute top-2 left-2'
					variant='outline'
					size='icon'
					onClick={toggleLeftPanel}>
					{leftPanelVisible ? (
						<ChevronLeft className='h-4 w-4' />
					) : (
						<ChevronRight className='h-4 w-4' />
					)}
				</Button>

				{/* Main Content Area */}
				<div className='flex-1 p-4'>{children}</div>

				{/* Right Panel */}
				{rightPanelVisible && (
					<div className='w-64 border-l'>
						<ScrollArea className='h-full'>
							<RightPanelComponent />
						</ScrollArea>
					</div>
				)}
				<Button
					className='absolute top-2 right-2'
					variant='outline'
					size='icon'
					onClick={toggleRightPanel}>
					{rightPanelVisible ? (
						<ChevronRight className='h-4 w-4' />
					) : (
						<ChevronLeft className='h-4 w-4' />
					)}
				</Button>
			</div>

			{/* Bottom Panel */}
			{bottomPanelVisible && (
				<div className='h-32 border-t'>
					<ScrollArea className='h-full'>
						<BottomPanelComponent
							onSelectEntry={handleSelectEntry}
						/>
					</ScrollArea>
				</div>
			)}
			<Button
				className='absolute bottom-2 right-2'
				variant='outline'
				size='icon'
				onClick={toggleBottomPanel}>
				{bottomPanelVisible ? (
					<ChevronDown className='h-4 w-4' />
				) : (
					<ChevronUp className='h-4 w-4' />
				)}
			</Button>
		</div>
	)
}
