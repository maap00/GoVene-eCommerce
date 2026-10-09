interface Props {
	content: string;
	className?: string;
}

export const CellTableProduct = ({ content, className = '' }: Props) => {
	return (
		<td className={`px-3 py-3 font-medium ${className}`}>{content}</td>
	);
};
