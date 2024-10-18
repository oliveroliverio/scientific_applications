/** @format */

'use client'

import { LayoutComponent } from './layout'

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<LayoutComponent>{children}</LayoutComponent>
			</body>
		</html>
	)
}
