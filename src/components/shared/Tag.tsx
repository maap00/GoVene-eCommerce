type Tagtype = 'nuevo' | 'agotado';

interface Props {
    contentTag: Tagtype;
}

const getTagColor = (contentTag: Tagtype) => {
    const lowerContent = contentTag.toLowerCase();
    if(lowerContent === 'nuevo') return 'bg-blue-500';
    if(lowerContent === 'agotado') return 'bg-black';
    return 'bg-gray-500';
}

export const Tag = ({contentTag}: Props) => {
  return (
    <div className={`text-white w-fit px-2 ${getTagColor(contentTag)} rounded-full py-1`}>
        <p className="uppercase text-xs font-medium">
            {contentTag}
        </p>
    </div> 
)}
