import { getExams } from './actions/get-exams';
import ExamesTable from './exames-table';

export const PER_PAGE = 10;

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
    const result = await getExams({ page, perPage: PER_PAGE, search });

    return <ExamesTable data={result.data} meta={result.meta} />;
}
