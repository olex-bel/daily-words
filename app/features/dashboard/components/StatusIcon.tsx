
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { RiPlayCircleLine } from 'react-icons/ri';
import { RiTrophyLine } from 'react-icons/ri';
import type { ReviewStatus } from '../utils/review';

type StatusIconProps = {
    status: ReviewStatus;
}

export default function StatusIcon({ status }: StatusIconProps) {
    const iconClass = 'inline-block mr-2 text-primary';
    
    switch (status) {
        case 'COMPLETED_TODAY': return <RiCheckboxCircleLine size={20} className={iconClass} />;
        case 'CONTINUE': return <RiPlayCircleLine size={20} className={iconClass} />;
        case 'ALL_LEARNED': return <RiTrophyLine size={20} className={iconClass} />;
        default: return null;
    }
}