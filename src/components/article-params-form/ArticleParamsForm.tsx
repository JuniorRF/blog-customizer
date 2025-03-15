import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
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
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

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

	const [selctedOption, setSelectedOption] =
		useState<ArticleStateType>(appSettings);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectedOption({ ...selctedOption, [key]: value });
	};

	const handleSubmitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		setAppSettings(selctedOption);
	};

	const handleResetForm = () => {
		setSelectedOption({ ...appSettings });
	};
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<aside
					ref={rootRef}
					className={`${styles.container} ${
						isOpen ? styles.container_open : ''
					}`}>
					<form
						className={styles.form}
						onSubmit={handleSubmitForm}
						onReset={handleResetForm}>
						<Text uppercase={true} weight={800} size={31}>
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
			)}
		</>
	);
};
