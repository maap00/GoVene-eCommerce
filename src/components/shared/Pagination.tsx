interface Props {
    totalItems: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    appearance?: 'default' | 'catalog';
}

export const Pagination = ({ totalItems, page, setPage, appearance = 'default' }: Props) => {
    const isCatalog = appearance === 'catalog';

    const itemPerPage = 10;
    const totalPages = totalItems ? Math.ceil(totalItems / itemPerPage) : 1;
    const isLastPage = page >= totalPages;
    
    const startItem = (page - 1) * itemPerPage + 1;
    const endItem = Math.min(page * itemPerPage, totalItems);


    const handleNextPage = () => {
            setPage(page + 1);
        }

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));  
        
    };
    
    return (
        <div aria-label={isCatalog ? 'Paginación del catálogo' : undefined} className={`flex ${isCatalog ? 'flex-col gap-4 sm:flex-row sm:items-center sm:justify-between' : 'items-center justify-between'}`}>
            <p className={`${isCatalog ? 'text-xs font-medium text-slate-500 sm:text-sm' : 'text-xs font-medium'}`}>
                Mostrando{' '}
                <span className={isCatalog ? 'font-semibold text-slate-900' : 'font-bold'}>
                    {startItem} - {endItem}
                </span>{' '}
                de <span className={isCatalog ? 'font-semibold text-slate-900' : 'font-bold'}> {totalItems} </span> productos
            </p>
            <div className={`flex gap-2 ${isCatalog ? 'w-full sm:w-auto' : 'gap-3'}`}>
                <button
                    className={`${isCatalog ? 'min-h-10 flex-1 rounded-xl border border-slate-200 px-4 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none' : 'border border-slate-700 rounded-md font-semibold text-xs py-1 px-3 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-800 disable:hover:bg-white disabled:hover:text-slate-700'}`}
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    Anterior
                </button>


                  <button
                    className={`${isCatalog ? 'min-h-10 flex-1 rounded-xl bg-slate-950 px-4 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none' : 'border border-slate-700 rounded-md font-semibold text-xs py-1 px-3 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-800 disable:hover:bg-white disabled:hover:text-slate-700'}`}
                    onClick={handleNextPage}
                    disabled={isLastPage}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );

    }
