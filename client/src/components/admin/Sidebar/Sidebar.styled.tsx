import styled from 'styled-components';

export const SidebarStyled = styled.div`
	height: 100%;
	header {
		width: 100%;
		padding: 3rem 5.5rem 0;
		margin-bottom: 3.3rem;
		position: relative;
		border-right: 1px solic var(--line-color);
		.back {
			position: absolute;
			top: 3rem;
			right: 1.5rem;
			padding: 0.5rem;
			border-radius: 50%;
			width: 2.9rem;
			height: 2.9rem;
			&:hover {
				cursor: pointer;
				transition: 0.3s;
			}
			@media screen and (min-width: 1600px) {
				display: none;
			}
		}
		.toggle {
			display: none;
			position: absolute;
			top: 3rem;
			left: 1.2rem;
			&:hover {
				cursor: pointer;
			}
		}
		h1 {
			h1 {
				font-size: 2.6rem;
				line-height: 1.2;
				font-weight: 700;
			}
		}
	}
	.sidebar {
		background-color: var(--bg);
		width: 25rem;
		flex-shrink: 0;
		overflow: hidden;
		transition: 0.3s;
		height: 100%;
		opacity: 0.99;
		&-list {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding-top: 1rem;
			border-top: 1px solid var(--line-color);
		}
		&-item {
			display: flex;
			transition: 0.3s;
			padding: 1.3rem 0 1.3rem 1.2rem;
			&:hover {
				cursor: pointer;
				background-color: var(--item-hover);
				.sidebar-item__title {
					color: var(--primary-btn-bg);
				}
				.icon {
					color: var(--primary-btn-bg);
				}
			}
			&__wrap {
				display: flex;
				overflow: hidden;
				width: 100%;
				gap: 1.2rem;
				align-items: center;
			}
			&__title {
				font-size: 1.6rem;
				font-weight: 700;
				line-height: 1.87;
			}
			&__line {
				width: 0.4rem;
				height: 3.6rem;
				border: none;
				border-radius: 2.5rem;
				background-color: transparent;
			}
		}
		.active {
			.sidebar-item__line {
				width: 0.4rem;
				height: 3.6rem;
				border: none;
				border-radius: 2.5rem;
				background-color: var(--primary-btn-bg);
			}
		}
	}
	.close {
		@media screen and (max-width: 1600px) {
			width: 5.2rem;
			header {
				margin-bottom: 5.86rem;
				h1 {
					display: none;
				}
				.back {
					display: none;
				}
				.toggle {
					display: block;
				}
			}
		}
	}
	@media screen and (max-width: 500px) {
		.sidebar {
			width: 100vw;
		}
	}
	@media screen and (max-width: 768px) {
		position: fixed;
		.close {
			width: 0;
			header {
				.toggle {
					display: none;
				}
			}
		}
	}
`;
