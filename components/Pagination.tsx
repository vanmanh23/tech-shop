import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    const handlePageChange = (page: number) => {
        onPageChange(page);
    }
    const minusPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }
    const plusPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }
    return (
        <div className="flex justify-center items-center mt-8 gap-2">
            <button className="text-black border border-gray-300 px-4 py-2 rounded-md" onClick={minusPage}>
                <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} className={`text-black border border-gray-300 px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`} onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                </button>
            ))}
            <button className=" text-black border border-gray-300 px-4 py-2 rounded-md" onClick={plusPage}>
                <ChevronRight size={20} />
            </button>
        </div>
    )
}

export default Pagination;
