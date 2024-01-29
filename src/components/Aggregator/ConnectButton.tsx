// import { ConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';
import { HistoryModal } from '../HistoryModal';
import { MyConnectButton } from './MyConnectButton'

const Wrapper = styled.div`
	position: absolute;
	right: 0px;
	z-index: 100;
	display: flex;
	gap: 8px;
 	height: 38px;
`;

const Connect = ({ tokenList = null, tokensUrlMap = {}, tokensSymbolsMap = {} }) => {
	return (
		<Wrapper>
			{/* <ConnectButton chainStatus={'none'} /> */}
			<MyConnectButton />
			{tokenList ? <HistoryModal tokensUrlMap={tokensUrlMap} tokensSymbolsMap={tokensSymbolsMap} /> : null}
		</Wrapper>
	);
};

export default Connect;
