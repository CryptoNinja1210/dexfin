import React from "react"
import Head from 'next/head';
import styled from 'styled-components';
import ThemeProvider, { GlobalStyle } from '~/Theme';
import CryptoContext from "~/utils/Crypto"
// import { Phishing } from './Phishing';

const PageWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin: 16px;
	isolation: isolate;

	@media screen and (min-width: ${({ theme }) => theme.bpLg}) {
		margin: 28px;
	}
`;

const Center = styled.main`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 28px;
	width: 100%;
	min-height: 100%;
	margin: 0 auto;
	color: ${({ theme }) => theme.text1};
`;

interface ILayoutProps {
	title: string;
	children: React.ReactNode;
	defaultSEO?: boolean;
	backgroundColor?: string;
	style?: React.CSSProperties;
}

export default function Layout({ title, children, ...props }: ILayoutProps) {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<ThemeProvider>
				<CryptoContext>
					<GlobalStyle />
					<PageWrapper>
						<Center {...props}>{children}</Center>
					</PageWrapper>
				</CryptoContext>
			</ThemeProvider>
		</>
	);
}
