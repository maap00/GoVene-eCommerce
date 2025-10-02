interface Props {
    totalItems: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ totalItems, page, setPage }: Props) => {

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
        <div className="flex items-center justify-between">
            <p className="text-xs font-medium">
                Showing{' '}
                <span className="font-bold">
                    {startItem} - {endItem}
                </span>{' '}
                de <span className="font-bold"> {totalItems} </span> products
            </p>
            <div className="flex gap-3">
                <button
                    className="border border-slate-700 rounded-md font-semibold text-xs py-1 px-3 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-800 disable:hover:bg-white disabled:hover:text-slate-700"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    Previous
                </button>


                  <button
                    className="border border-slate-700 rounded-md font-semibold text-xs py-1 px-3 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-800 disable:hover:bg-white disabled:hover:text-slate-700"
                    onClick={handleNextPage}
                    disabled={isLastPage}
                >
                    Next
                </button>
            </div>
        </div>
    );

    }