import { Search } from 'lucide-react';
import { forwardRef, type InputHTMLAttributes } from 'react';
import Input from './input';
interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className = '', ...props }, ref) => (
        <div className="relative">
            <Search className="absolute top-3 ml-2.5 text-slate-300" size={18} />
            <Input ref={ref} type="text" className={`pl-9 bg-slate-50 ${className}`} {...props} />
        </div>
    )
);
SearchInput.displayName = 'SearchInput';

export default SearchInput;
