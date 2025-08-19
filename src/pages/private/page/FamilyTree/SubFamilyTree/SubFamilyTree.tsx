import { CustomerModel } from 'context/entities/customer.model';
import Person from '../Person';

const SubFamilyTree = ({
  level,
  treeData,
  addChildren,
  parentId,
}: CustomerModel.SubFamilyTreeProps) => {
  console.log(treeData, 'level');

  const renderCouple = () => (
    <div className="border-solid border-gray-300 border p-2 rounded-md inline-block">
      <Person member={treeData} addChildren={addChildren} parentId={parentId} />
      <Person
        member={treeData?.wife ?? treeData?.husband}
        isDescendant={level === 0 && true}
        parentId={parentId}
        addChildren={addChildren}
      />
    </div>
  );

  const levelParentId = (
    member: CustomerModel.ParentDto,
    memberLevel: number
  ): number[] => {
    if (memberLevel === 0) {
      return parentId;
    } else {
      return [...parentId, member.id];
    }
  };

  const renderChildren = () => (
    <ul
      key={treeData.id}
      className="pt-14 relative flex flex-row items-baseline justify-center"
    >
      {treeData.children &&
        treeData.children.map((member) => (
          <SubFamilyTree
            level={level + 1}
            key={member.id}
            treeData={member}
            addChildren={addChildren}
            parentId={levelParentId(member, level + 1)}
          />
        ))}
    </ul>
  );

  return (
    <li className="float-left list-none relative pt-14 px-2">
      {renderCouple()}
      {treeData.children && treeData.children.length > 0 && renderChildren()}
    </li>
  );
};

export default SubFamilyTree;
