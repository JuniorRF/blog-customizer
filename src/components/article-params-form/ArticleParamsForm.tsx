import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type TArticleParamsForm = {
	appSettings: ArticleStateType;
	setAppSettings: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	appSettings,
	setAppSettings,
}: TArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});
	const [selctedOption, setSelectedOption] =
		useState<ArticleStateType>(appSettings);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectedOption({ ...selctedOption, [key]: value });
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppSettings(selctedOption);
	};

	const handleResetForm = () => {
		setAppSettings({ ...defaultArticleState });
		setSelectedOption({ ...defaultArticleState });
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text as={'h2'} uppercase={true} weight={800} size={31}>
						задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						selected={selctedOption.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						name={'размер шрифта'}
						selected={selctedOption.fontSizeOption}
						options={fontSizeOptions}
						title={'размер шрифта'}
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>

					<Select
						title={'цвет шрифта'}
						selected={selctedOption.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						selected={selctedOption.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
					/>
					<Select
						title={'ширина контента'}
						selected={selctedOption.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
