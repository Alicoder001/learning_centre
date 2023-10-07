import styled from 'styled-components';

export const StudentStyled = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	.students {
		background-color: var(--card-wrap);
		padding: 2.8rem 0 0;
		box-shadow: var(--box-shadow);
		border-radius: 2rem;
		width: 100%;
		margin-bottom: 3rem;
		height: 100%;
		padding-bottom: 3rem;
		&-title {
			font-size: 3rem;
			padding: 0 2rem;
		}
		&-list {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			padding: 0 0.4rem;
			height: 100%;
			overflow-y: scroll;
			/* height: 100%; */
			margin-bottom: 2rem;
			background-color: transparent;
			padding: 2rem 2.4rem 2.8rem;
		}
		&-item {
			background-color: var(--card-bg);
			box-shadow: var(--box-shadow);
			border-radius: 1.5rem;
			padding: 1.8rem 2.4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
`;
