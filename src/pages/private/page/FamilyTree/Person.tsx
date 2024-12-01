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
      if (parentId.length === 0) {
        addChildren(parentId);
      } else {
        addChildren(parentId);
      }
    }
  };

  return (
    <div className="!border-none py-1 px-2 inline-block">
      <Avatar
        color={member?.gender === Gender.MALE ? 'bg-male' : 'bg-female'}
        title={`Avatar for ${member?.firstName}`}
        isDescendant={isDescendant}
        onClick={addItem}
        member={member}
      />
      <p className="m-0 text-gray-500">{member?.firstName}</p>
    </div>
  );
};

export default Person;
