import { cn } from "@/lib/utils";
import { Star } from "lucide-react";


interface FooterProps {
    title: string;
    authorLabel: string;
    createAtLabel: string;
    isFavorite: boolean;
    onClick: () => void;
    disabled?: boolean;
}

const Footer = ({
    title,
    authorLabel,
    createAtLabel,
    isFavorite,
    onClick,
    disabled,
}: FooterProps) => {


    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        onClick();
    }


    return (
        <div className="relative bg-white p-3">
            <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">{authorLabel}, {createAtLabel}</p>
            <button
                onClick={handleClick}
                disabled={disabled}
                className={
                    cn(
                        "opacity-0 group-hover:opacity-100 transition-opacity absolute right-3 top-3 text-muted-foreground hover:text-blue-600",
                        disabled && "cursor-not-allowed opacity-75"
                    )
                }
            >
                <Star className={cn("h-4 w-4", isFavorite && 'fill-blue-600 text-blue-600')} />
            </button>
        </div>
    );
};

export default Footer;
