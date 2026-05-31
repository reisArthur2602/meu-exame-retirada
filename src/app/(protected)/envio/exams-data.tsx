import { getExams } from './actions/get-exams';
import ExamesTable from './exams-table';

export const PER_PAGE = 5;

interface ExameDataProps {
    page: number;
    search: string;
}

export type ExameMeta = {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
};

export default async function ExameData({ page, search }: ExameDataProps) {
    const exams = await getExams({ page, perPage: PER_PAGE, search });

    return <ExamesTable data={exams.data} meta={exams.meta} />;
}
