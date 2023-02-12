export interface EditTaskData {
	answerFormat: string;
	description: string;
	correctAnswer: string | number;
	hints: HintData[];
	endTime: string | Date;
}

interface HintData {
	hintDescription: string;
	timeAppear: string | Date;
}

export interface TaskData extends EditTaskData {
	id: string;
}
