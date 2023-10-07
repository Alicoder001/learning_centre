import styled from 'styled-components';

export const TeachersStyled = styled.div`
	.teachers {
		background-color: var(--card-wrap);
		padding: 2.8rem 0 0;
		box-shadow: var(--box-shadow);
		border-radius: 2rem;
		width: 100%;
		margin-bottom: 3rem;
		display: flex;
		flex-direction: column;
		&-title {
			font-size: 3rem;
			padding: 0 2rem;
		}
		&-list {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			padding: 0 0.4rem;
			overflow-y: scroll;
			height: 100%;
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
