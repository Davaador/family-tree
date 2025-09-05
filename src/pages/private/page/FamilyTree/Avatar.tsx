import clsx from 'clsx';
import { CustomerModel } from 'context/entities/customer.model';
import { CustomImage } from 'pages/components';

interface AvatarProps {
  color?: string;
  title?: string;
  onClick?: () => void;
  size?: number;
  isDescendant?: boolean;
  member?: CustomerModel.ParentDto;
}

const Avatar = ({
  color,
  title,
  onClick,
  isDescendant = true,
  member,
}: AvatarProps) => {
  return (
    <div className='relative group'>
      <span
        role='img'
        aria-label={title ?? 'Avatar'}
        title={title ?? 'Avatar'}
        onClick={onClick}
        className={clsx(
          'inline-block relative h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 border-solid transition-all duration-300 hover:scale-105 hover:shadow-lg',
          !color && 'bg-gray-500 border-gray-400',
          color && `${color} border-gray-300`,
          isDescendant && 'ring-2 ring-blue-200 ring-offset-2',
          'hover:border-blue-400'
        )}
      >
        {member?.profileImage ? (
          <CustomImage
            src={member?.profileImage?.url}
            height={'100%'}
            width={'100%'}
            preview={false}
            onClick={onClick}
            className='object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200'>
            <svg
              className='w-6 h-6 text-gray-600'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        )}
      </span>

      {/* Hover tooltip */}
      <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10'>
        {title}
        <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800'></div>
      </div>
    </div>
  );
};

export default Avatar;
