type Tagtype = 'nuevo' | 'agotado' | 'out of stock';

interface Props {
    contentTag: Tagtype;
}

const getTagColor = (contentTag: Tagtype) => {
    const lowerContent = contentTag.toLowerCase();
    if(lowerContent === 'nuevo') return 'bg-blue-500';
    if(lowerContent === 'agotado' || lowerContent === 'out of stock') return 'bg-black';
    return 'bg-gray-500';
}

export const Tag = ({contentTag}: Props) => {
  return (
    <div className={`text-white w-fit px-2 ${getTagColor(contentTag)} rounded-full py-1`}>
        <p className="uppercase text-xs font-medium">
            {contentTag === 'out of stock' ? 'Agotado' : contentTag}
        </p>
    </div> 
)}
