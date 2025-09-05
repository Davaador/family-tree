import { CustomerModel, Gender } from 'context/entities/customer.model';

import Avatar from './Avatar';

interface IPersonProps {
  member?: CustomerModel.ParentDto;
  isDescendant?: boolean;
  addChildren?: (id: number[]) => void;
  parentId: number[];
}

const Person = ({
  member,
  isDescendant = true,
  addChildren,
  parentId,
}: IPersonProps) => {
  if (member === null) {
    return null;
  }

  const addItem = () => {
    if (member && addChildren) {
      addChildren(parentId);
    }
  };

  const getFullName = () => {
    if (!member) return '';
    return `${member.firstName || ''} ${member.lastName || ''}`.trim();
  };

  const getAge = () => {
    if (!member?.birthDate) return '';
    const birthDate = new Date(member.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className='person-card group relative'>
      {member && (
        <div className='flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer'>
          <div className='relative'>
            <Avatar
              color={member.gender === Gender.MALE ? 'bg-male' : 'bg-female'}
              title={`Avatar for ${getFullName()}`}
              isDescendant={isDescendant}
              onClick={addItem}
              member={member}
            />

            {/* Add children button */}
            <button
              onClick={addItem}
              className='absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-600'
              title='Нэмэлт мэдээлэл нэмэх'
            >
              +
            </button>
          </div>

          <div className='text-center'>
            <p className='font-medium text-gray-800 text-sm leading-tight'>
              {getFullName()}
            </p>
            {member.birthDate && (
              <p className='text-xs text-gray-500 mt-1'>{getAge()} настай</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Person;
