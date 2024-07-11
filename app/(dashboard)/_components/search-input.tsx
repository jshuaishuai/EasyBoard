"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { type ChangeEvent, useState, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from 'next/navigation';
import qs from 'query-string';
const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState('');

    const [defaultValue, setDefaultValue] = useDebounceValue('', 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const curValue = e.target.value;
        setValue(curValue);
        setDefaultValue(curValue);
    }

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: '/',
            query: {
                search: defaultValue
            }
        })
        router.push(url);
    }, [defaultValue]);

    return (
        <div className="relative w-full">
            <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground h-4 w-4" />
            <Input
                placeholder="Search board"
                className="max-w-[516px] pl-9"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchInput;
