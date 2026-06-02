import { getTeam, type RoleFilter } from './actions/get-usuarios';
import UsuariosTable from './usuarios-table';

export const PER_PAGE = 5;

interface UsuariosDataProps {
    page: number;
    search: string;
    role: RoleFilter;
}

export default async function UsuariosData({ page, search, role }: UsuariosDataProps) {
    const result = await getTeam({ page, perPage: PER_PAGE, search, role });
    return <UsuariosTable data={result.data} meta={result.meta} />;
}
