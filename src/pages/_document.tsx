import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<meta charSet="utf-8" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="title" content="FYP Marketplace" />
				<meta name="theme-color" content="#000000" />
				<meta
					name="description"
					content="Decentralized Marketplace with native cryptocurrency"
				/>
			</Head>
			<title>FYP MarketPlace</title>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
