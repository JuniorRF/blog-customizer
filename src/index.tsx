import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentAppSettins, setCurrentAppSettins] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentAppSettins.fontFamilyOption.value,
					'--font-size': currentAppSettins.fontSizeOption.value,
					'--font-color': currentAppSettins.fontColor.value,
					'--container-width': currentAppSettins.contentWidth.value,
					'--bg-color': currentAppSettins.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				appSettings={currentAppSettins}
				setAppSettings={setCurrentAppSettins}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
